import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { impactItemStatusSchema } from "@/lib/validators";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body: unknown = await request.json();

    const validated = impactItemStatusSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          details: validated.error.issues,
        },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.impactItem.update({
      where: { id },
      data: {
        status: validated.data.status,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("PATCH impact item failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not update impact item.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.impactItem.delete({
      where: { id },
    });

    // A 204 response intentionally has no body.
    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error("DELETE impact item failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not delete impact item.",
      },
      { status: 500 }
    );
  }
}