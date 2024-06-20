'use client';

import React, { useState, useEffect } from "react";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface UserData {
    profit: number;
    coins: number;
    games: number;
    robux: number;
    maxGames: number;
}

function MainCards() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/userdata");
                setUser(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    // Skeleton loading
    if (loading) {
        return (
            <>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="mt-2 h-4 w-[150px]" />
            </CardContent>
          </Card>
        </>
        )
    }

    return (
        <>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.profit}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Games
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.games} / {user?.maxGames}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coins</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.coins}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Robux</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.robux}</div>
            </CardContent>
          </Card>
        </>
    );
}

export default MainCards;