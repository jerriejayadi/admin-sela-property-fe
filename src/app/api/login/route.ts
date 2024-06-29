// Import dependencies
import { NextRequest, NextResponse } from "next/server";
import {
  responseSuccess1,
  responseSuccess2,
  responseNotFound,
  responseInternalServerError,
  responseSuccess3,
} from "./mockResponse";

// To handle a POST request to /api
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Read the request body and parse it as JSON
    const body = await request.json();

    // Extract payload (token) from parsed body
    const { email, password } = body;
    // return NextResponse.json(responseSuccess, { status: 200 });
    if (
      body.email === responseSuccess1.result.profile.email &&
      password === "admin"
    ) {
      // Send response back to the client
      return NextResponse.json(responseSuccess1, { status: 200 });
    } else if (
      body.email === responseSuccess2.result.profile.email &&
      password === "admin"
    ) {
      return NextResponse.json(responseSuccess2, { status: 200 });
    } else if (
      body.email === responseSuccess3.result.profile.email &&
      password === "admin"
    ) {
      return NextResponse.json(responseSuccess3, { status: 200 });
    } else {
      return NextResponse.json(responseNotFound, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(responseInternalServerError, { status: 500 });
  }
}
