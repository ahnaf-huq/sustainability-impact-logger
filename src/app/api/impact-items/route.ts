import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { impactItemSchema } from "@/lib/validators";

export async function GET() {
  try {
    const items = await prisma.impactItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch impact items:", error);

    return NextResponse.json(
      { error: "Failed to fetch impact items." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = impactItemSchema.parse(body);

    const item = await prisma.impactItem.create({
      data: validated,
    });

    return NextResponse.json(item, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error:
            "Invalid or missing JSON request body. Send valid JSON with Content-Type: application/json.",
        },
        { status: 400 }
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Failed to create impact item:", error);

    return NextResponse.json(
      { error: "Failed to create impact item." },
      { status: 500 }
    );
  }
}