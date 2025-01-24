import { PrismaClient } from "@prisma/client";
import { createToken, verifyPassword } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    const token = createToken({ id: user.id, email: user.email });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error during login:", JSON.stringify(error));

    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects properly
  }
}
