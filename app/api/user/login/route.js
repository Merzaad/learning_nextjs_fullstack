import { PrismaClient } from "@prisma/client";
import { createToken, verifyPassword } from "@/lib/auth";
import { verifyToken } from "../../../../lib/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }
    const token = createToken({ id: user.id, email: user.email });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req) {
  try {
    const authorization = req.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Token not found" }), {
        status: 401,
      });
    }
    const { userId } = verifyToken(token);
    console.log(JSON.stringify(userId));
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 401,
      });
    }
    delete user.password;

    return new Response(JSON.stringify({ user, profile }), { status: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
