import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Navbar } from "../../components/navbar"
import { auth } from "../../auth"
import { FaExclamationCircle } from "react-icons/fa";
import MainCards from "../../components/cards";
import Changelogs from "../../components/changelogs";

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white mr-5 ml-5">
        <div className="text-center">
          <FaExclamationCircle className="h-20 m-2 w-20 text-red-500 mx-auto" />
          <h1 className="text-3xl font-bold">Unauthorized access!</h1>
          <p className="text-md text-muted-foreground">You need to be logged in to accss thi page. Please login to continue.</p>
        </div>
      </div>
    )
  }

  if (session?.user.role !== "customer" && session?.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white mr-5 ml-5">
        <div className="text-center">
          <FaExclamationCircle className="h-20 m-2 w-20 text-red-500 mx-auto" />
          <h1 className="text-3xl font-bold">Unauthorized access!</h1>
          <p className="text-md text-muted-foreground">You need to be logged in as a customer to access this page. Please login as a customer to continue.</p>
        </div>
      </div>
    )
  }
  return (
   <>
    <Navbar />
    <div className="flex min-h-screen w-full flex-col text-white bg-black">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MainCards />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Changelogs Mdule */}
          <Changelogs />
          <Card>
            <CardHeader>
              <CardTitle>Top Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">1999</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">1998</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">1997</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">1996</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">1995</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
   </>
  )
}
