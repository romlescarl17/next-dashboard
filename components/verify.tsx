'use client';
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

function VerifyButton({ session }: { session: any }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Verify account using api
  const verifyAccount = async () => {
    setLoading(true);
    toast({ title: "Verifying account...", description: "Please wait while we verify your account", className: "text-white" })
    const response = await fetch(`/api/verify?id=${session?.user?.id}`);
    const data = await response.json();

    if (data.status === "success") {
      setLoading(false);
      toast({ title: "Account verified", description: "Your account has been verified", className: "text-white border-green-500" })
      console.log("Account verified");
    } else {
      toast({ title: "Failed to verify account", description: `${data.message}`, className: "text-white border-red-500" })
      console.error("Failed to verify account");
    }
  };
    return (
        <Button disabled={loading} onClick={verifyAccount} className="w-full bg-indigo-700 hover:bg-indigo-900 hover:text-white transition duration-300 ease-in-out">
                <FaDiscord className="mr-2 h-5 w-5" /> Verify Account
        </Button>
    );
}

export default VerifyButton;