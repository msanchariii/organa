import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MatchCard = () => {
    return (
        <div>
            <Card className="p-8">
                <div className="flex">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <CardHeader className="py-0">
                        <CardTitle className="text-lg">
                            Patient match found
                        </CardTitle>
                        <CardDescription>Organ id- 3000000</CardDescription>
                    </CardHeader>
                </div>
                <div className="px-10 py-4">
                    <CardContent>
                        <CardDescription>
                            Approval need for dispatch
                        </CardDescription>
                    </CardContent>

                    <CardFooter className="space-x-4 py-0">
                        <Button variant={"outline"}>Approve</Button>
                        <Button>Dismiss</Button>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};

export default MatchCard;
