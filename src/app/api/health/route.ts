import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "sustainability-impact-logger",
    timestamp: new Date().toISOString(),
  });
}