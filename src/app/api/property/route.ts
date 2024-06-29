import { NextResponse } from "next/server";
import { responseSuccess } from "./mockResponse";

export async function GET() {
  return NextResponse.json(responseSuccess, { status: 200 });
}
