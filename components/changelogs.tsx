'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChangelogItems {
    version: string;
    description: string;
    status: string;
}

interface ChangelogData {
    _id: string;
    id: string;
    update: ChangelogItems;
}

function Changelogs() {
    const [user, setUser] = useState<ChangelogData[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/changelogs");
            const data = await response.json();
            console.log("Fetched data:", data?.data); // Add this line to check the fetched data
            setUser(data?.data);
            setLoading(false);
        }
        fetchData();
    }, []);
    
    console.log(user);

    // Skeleton loading
    if (loading) {
        return (
            <>
               <Card className="xl:col-span-2 text-white">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Update Changelog</CardTitle>
                        <CardDescription>
                            Recent updates and changes to the website.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">Description</TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Type
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Status
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Date
                                </TableHead>
                                <TableHead className="text-right text-white">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                          
                                <TableRow>
                                    <TableCell>
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="mt-2 h-4 w-[150px]" />
                                    </TableCell>
                                    <TableCell className="hidden xl:table-column">Sale</TableCell>
                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                        2023-06-23
                                    </TableCell>
                                    <TableCell className="text-right">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </>
        )
    }

    return (
        <>
            <Card className="xl:col-span-2 text-white">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Update Changelog</CardTitle>
                        <CardDescription>
                            Recent updates and changes to the website.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">Description</TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Type
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Status
                                </TableHead>
                                <TableHead className="hidden xl:table-column">
                                    Date
                                </TableHead>
                                <TableHead className="text-right text-white">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user?.map((changelog, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="font-medium">{changelog.update.version}</div>
                                        <div className="text-sm text-muted-foreground md:inline">
                                            {changelog.update.description}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-column">Sale</TableCell>
                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                        2023-06-23
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {changelog.update.status === "success" ? (
                                            <Badge className="text-xs text-white bg-green-500">
                                                Success
                                            </Badge>
                                        ) : (
                                            <Badge className="text-xs text-white bg-red-500">
                                                Failed
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

export default Changelogs;