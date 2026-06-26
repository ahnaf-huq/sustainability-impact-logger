import { NextResponse } from "next/server";

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
    console.error("GET impact items failed:", error);

    return NextResponse.json(
      { error: "Could not fetch impact items." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const validated = impactItemSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: validated.error.issues,
        },
        { status: 400 }
      );
    }

    const createdItem = await prisma.impactItem.create({
      data: validated.data,
    });

    return NextResponse.json(createdItem, {
      status: 201,
    });
  } catch (error) {
    console.error("POST impact item failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not create impact item.",
      },
      { status: 500 }
    );
  }
}