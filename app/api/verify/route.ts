import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  // Get the user data from mondoDB
  const session = await auth();
  const id = request.nextUrl.searchParams.get("id");
  const client = await clientPromise;
  const db = client.db();
  let user = null;
  let verified = false;
  let uroles = [];
  let role = null;
  const date = new Date();
  
  const serverRoles = {
    "admin": "1129422819256696937",
    "customer": "1223893702594793494"
  }

  try {
    if (!id) {
      return NextResponse.json({ status: "error", message: "User ID not provided" });
    } else {
      user = await db.collection("accounts").findOne({ userId: new ObjectId(id) });
      if (!user) {
        return NextResponse.json({ status: "error", message: "User not found" });
      }
    }

    // Get user role from mirage discord server
    const response = await fetch(`https://discord.com/api/users/@me/guilds/129422819214770306/member`, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
    const data = await response.json();
    const roles = data.roles;

    // Get the data from serverRoles that matches the roles
    if (roles.includes("1129422819256696937")) {
      role = "admin";
    } else if (roles.includes("1223893702594793494")) {
      role = "customer";
    } else if (roles.includes("1129422819256696937") && roles.includes("1223893702594793494")) {
      role = "customer";
    } else {
      role = "unverified";
    }

    // Check if user has the required role
    if (!roles.includes("1223893702594793494")) {
      return NextResponse.json({ status: "error", message: "User does not have the required role" });
    } else {
      uroles = roles;
      const check = await db.collection("verification").findOne({ userId: new ObjectId(id), verified: true });

      if (!check) {
        const user = await db.collection("verification").insertOne({ userId: new ObjectId(id), verified: true, verifiedAt: new Date() });
        if (user) {
          const createUserData = await db.collection("metadata").insertOne({ userId: new ObjectId(session?.user?.id), name: session?.user?.name, email: session?.user?.email, role: role, level: "0", xp: "0", coins: "0", games: "0", profit: "0", maxGames: "10", robux: "0", lastupdated: new Date(), createdAt: date, expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 });
          if (createUserData) {
            verified = true;
          }
        } else {
          return NextResponse.json({ status: "error", message: "Failed to verify user" });
        }
      } else {
        return NextResponse.json({ status: "error", message: "User already verified" });
      }
    }

    // Update user session role based on the roles
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ status: "success", verified: verified, roles: uroles });
}