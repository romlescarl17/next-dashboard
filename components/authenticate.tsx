"use client"
import { FaGoogle } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { MdNearMeDisabled } from "react-icons/md";
import { redirect } from "next/navigation";

function LoginWithDiscord() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const login = async () => {
        setLoading(true);
        await signIn("discord", { callbackUrl:'/dashboard' }).then(() => {
            toast({ title: "Logging in...", description: "Please wait while we log you in. You will be redirected to Discord authentication page.", className: "text-white border-yellow-500" })
            console.log("Logged in");
        }).catch((error) => {
            setLoading(false);
            toast({ title: "Failed to login", description: "An error occurred while trying to login", className: "text-white border-red-500" })
            console.error("Failed to login", error);
        });
        redirect("/dashboard");
    }

    return (
        <Button disabled={loading} variant="outline" className="w-full hover:bg-white hover:text-black transition duration-300 ease-in-out" onClick={login}>
             {loading ? <MdNearMeDisabled className="mr-2 h-5 w-5" /> : <FaDiscord className="mr-2 h-5 w-5" />} {loading ? "Logging in..." : "Login with Discord"}
        </Button>
    )
}

export default LoginWithDiscord;