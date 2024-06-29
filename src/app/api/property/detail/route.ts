import { NextRequest, NextResponse } from "next/server";
import { responseNotFound, responseSuccess } from "./mockResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("id");
  if (path === "a1b2c3") {
    return NextResponse.json(responseSuccess, { status: 200 });
  } else {
    return NextResponse.json(responseNotFound, { status: 404 });
  }
}
