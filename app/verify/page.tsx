import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaDiscord, FaLock } from "react-icons/fa";
import { auth } from "@/auth"
import { FaCheck } from "react-icons/fa";
import VerifyButton from "@/components/verify"
import Head from "next/head";
import Link from "next/link";
import { MdCelebration } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";

const notifications = [
  {
    title: "Your username, avatar, and banner",
  },
  {
    title: "Your email address",
  },
  {
    title: "Your roles in Mirage MGUI server",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export default async function Verification({ className, ...props }: CardProps) {
  const session = await auth();
  console.log(session);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white mr-5 ml-5">
        <div className="text-center">
          <FaExclamationCircle className="h-20 m-2 w-20 text-red-500 mx-auto" />
          <h1 className="text-3xl font-bold">Unauthorized access!</h1>
          <p className="text-md text-muted-foreground">You need to be logged in to verify your account. Please login to continue.</p>
        </div>
      </div>
    )
  }

  if (session?.user.verified) {
    return (
      // Center content
      <div className="flex items-center justify-center min-h-screen text-white mr-5 ml-5">
        <div className="text-center">
          <MdCelebration className="h-20 w-20 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold">You're already verified!</h1>
          <p className="text-md text-muted-foreground">You're already verified in our system. If you encounter any issues, please contact us at our discord support server</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="grid place-items-center min-h-screen">
        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>Account Verification</CardTitle>
            <CardDescription className="text-xs">Please click the button below to verify your account. This step is only for verifying if you are a customer.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <FaDiscord className="h-12 w-12" />
              <div className="flex-1 space-y-1">
                <p className="text-md font-extrabold font-medium leading-none">
                  Discord OAuth2
                </p>
                <span className="text-xs text-muted-foreground">
                  Connected account: <p className="text-green-500 text-xs">{session?.user.userId ?? 'No connected account'}</p>
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs mb-3">By verifying your account, you agree to give us access to the following information:</p>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="pl-3 mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                >
                  <FaCheck className="h-4 w-4 text-green-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <VerifyButton session={session} />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}