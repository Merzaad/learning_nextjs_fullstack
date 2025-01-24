import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../../../lib/auth";

const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const { firstname, lastname } = await req.json();
    const authorization = req.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Token not found" }), {
        status: 401,
      });
    }
    const { userId } = verifyToken(token);

    // Use upsert to either create or update the profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { firstname, lastname },
      create: { firstname, lastname, userId },
    });

    return new Response(JSON.stringify({ profile }), {
      status: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(JSON.stringify({ message: "bad request" }), {
      status: 400,
    });
  }
}
