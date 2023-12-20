import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import UserCredentials from "@/app/models/user";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: `${req.method} method detected -- POST needed` },
        { status: 405 }
      );
    }

    const { email, name, password }: UserCredentials = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: `Email : "${email}" Already Taken` },
        { status: 422 }
      );
    }

    // Hash the password input
    const hashedPassword = await bcrypt.hash(password, 12);

    const user: Prisma.UserCreateInput = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      {
        status: 400,
      }
    );
  }
}
