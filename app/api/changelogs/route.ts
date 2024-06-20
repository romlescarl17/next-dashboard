import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

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
        const changelogs = await db.collection("changelogs").find({}).toArray();
            if (changelogs) {
                user = JSON.parse(JSON.stringify(changelogs));
            } else {
                return NextResponse.json({ status: "error", message: "An error occured. Please try again later." })
            }
      }

    } catch (error) {
      console.log(error);
    }

  return NextResponse.json({ status: "success", data: user });
}