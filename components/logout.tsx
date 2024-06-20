"use client"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdNearMeDisabled } from "react-icons/md";

function Logout() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const logout = async () => {
        setLoading(true);
        await signOut().then(() => {
            toast({ title: "Logging out...", description: "Please wait while we log you out", className: "text-white border-yellow-500" })
            console.log("Logged out successfully");
        }).catch((error) => {
            setLoading(false);
            toast({ title: "Failed to logout", description: "An error occurred while trying to log you out", className: "text-white border-red-500" })
            console.error("Failed to logout", error);
        });
    }

    return (
        <Button disabled={loading} variant="outline" className="w-full hover:bg-white hover:text-black transition duration-300 ease-in-out" onClick={logout}>
             {loading ? <MdNearMeDisabled className="mr-2 h-5 w-5" /> : <RiLogoutBoxRFill  className="mr-2 h-5 w-5" />} {loading ? "Logging out..." : "Logout"}
        </Button>
    )
}

export default Logout;