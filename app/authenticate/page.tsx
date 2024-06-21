import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { FaGoogle } from "react-icons/fa6";
import * as React from "react"
import { useRouter, redirect } from "next/navigation";
import { useToast } from "../../components/ui/use-toast"
import { FaClock, FaLock } from "react-icons/fa";
import { auth, signIn } from "../../auth";
import LoginWithDiscord from "../../components/authenticate";
import Logout from "../../components/logout";
import { useSession } from "next-auth/react";

export default async function Authenticate() {
  const session = await auth();
  const time = new Date();

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid place-items-center min-h-screen">
          <Card className="mx-auto max-w-sm border border-white text-white mt-25">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Logout</CardTitle>
              <CardDescription className="text-center">
                You are currently logged in as <strong className="text-green-400">{session.user.name}</strong>. You can logout by clicking the button below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Logout />
              <div className="mt-4 text-center text-xs">
                <Button disabled className="mt-3">
                  <FaClock className="mr-2 h-4 w-4" /> {time.toLocaleString()}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid place-items-center min-h-screen">
        <Card className="mx-auto max-w-sm border border-white text-white mt-25">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Authenticate</CardTitle>
            <CardDescription className="text-center">
              Access the app by authenticating with your Discord account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginWithDiscord />
            <div className="mt-4 text-center text-xs">
              You can safely authenticate using your Discord account. We do not store any of your personal information.
              <Button disabled className="mt-5 text-green-500">
                <FaLock className="mr-2 h-4 w-4" /> Secure connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}