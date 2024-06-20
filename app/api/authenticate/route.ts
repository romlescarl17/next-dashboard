import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
    // Get the user data from mondoDB
    const id = request.nextUrl.searchParams.get("id");
    const client = await clientPromise;
    const db = client.db();
    let user = null;
    let token = '';

    try {
      if (!id) {
        return NextResponse.json({ status: "error", message: "No used id provided" });
      } else {
        user = await db.collection("accounts").findOne({ userId: new ObjectId(id) });
        if (!user) {
          return NextResponse.json({ status: "error", message: "No user found with provided id" });
        }
        token = user.access_token;
      }

    } catch (error) {
      console.log(error);
    }

  return NextResponse.json({ status: "success", token: token });
}