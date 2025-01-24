import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

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

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", JSON.stringify(error));

    if (error.code === "P2002") {
      // Handle unique constraint violation (e.g., duplicate email)
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect(); // Ensures the Prisma client disconnects after the request
  }
}
