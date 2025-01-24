import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

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
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const token = createToken({ id: user.id, email: user.email });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", JSON.stringify(error));
    if (error.code === "P2002") {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
      });
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
