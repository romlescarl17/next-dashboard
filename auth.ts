// Purpose: This file is used to configure the NextAuth.js authentication system. It uses the MongoDBAdapter to store user data in a MongoDB database. It also configures the Discord provider to allow users to sign in with their Discord accounts.
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { ObjectId } from "mongodb"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
    Discord({
            clientId: process.env.AUTH_DISCORD_ID,
            clientSecret: process.env.AUTH_DISCORD_SECRET,
            authorization: "https://discord.com/oauth2/authorize?scope=guilds.members.read+identify+email+guilds",
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async session({ session, user }) {
            const client = await clientPromise
            session.user.id = user.id
            const parts = session?.user?.image?.split('/') ?? []
            const userId = parts[parts.length - 2]
            session.user.userId = userId
            const db = client.db()

            // Get role from database
            const userRole = await db.collection("metadata").findOne({ userId: new ObjectId(session.user.id)})
            const userVerified = await db.collection("verification").findOne({ userId: new ObjectId(session.user.id), verified: true })


            if (userVerified && userRole && userRole.expiresAt > Date.now()) {
                session.user.verified = true
                session.user.role = userRole.role
                session.user.expiresAt = userRole.expiresAt
            } else {
                session.user.verified = false
                session.user.role = "expired"
            }

            return session
        },
    }
})
