import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";
import { createToken } from "../../../../lib/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password, firstname, lastname } = await req.json();
    if (!email || !password || !firstname || !lastname) {
      return new Response(
        JSON.stringify({
          message: "Email, password, firstname, and lastname are required",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            firstname,
            lastname,
          },
        },
      },
    });
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    const token = createToken({ id: user.id, email: user.email });
    return new Response(JSON.stringify({ token, profile }), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", String(error));
    if (error.code === "P2002") {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 409,
      });
    }
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
