import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "../../../auth";

export async function GET(request: NextRequest) {
    // Get the user data from mondoDB
    const session = await auth();
    const client = await clientPromise;
    const db = client.db();
    let user = null;

    try {
      if (!session) {
        return NextResponse.json({ status: "error", message: "You are not authenticated" });
      } else {
        user = await db.collection("metadata").findOne({ userId: new ObjectId(session?.user?.id) });
        if (!user) {
          return NextResponse.json({ status: "error", message: "No user found with provided id" });
        }
      }

    } catch (error) {
      console.log(error);
    }

  return NextResponse.json({ status: "success", data: user });
}