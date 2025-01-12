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

// * Remove all padding first. Read all the instructions then follow it. Add padding (if needed) at last.

const MatchCard = () => {
    return (
        // @kankanmondal22
        // ! Add time of notification in the card i.e. "1 hours ago"

        <Card className="bg-card/50 p-8">
            {/* 
                    // * Avatar component should be used inside CardHeader component (use flex, flex-row in CardHeader to align Avatar and CardTitle)
                    */}

            <CardHeader className="flex flex-row p-4 py-0">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Patient match found</CardTitle>
                <CardDescription>Organ id- 3000000</CardDescription>
                <p className="items-between flex justify-between">1 hour ago</p>
            </CardHeader>

            {/*
             */}
            <CardContent>
                {/*
                 */}
                <p> Approval need for dispatch</p>
            </CardContent>

            <CardFooter className="space-x-4 py-0">
                {/* 
                            // * Use primary(default) button for approve and secondary button for dismiss
                        */}
                <Button variant={"default"}>Approve</Button>
                <Button variant={"secondary"}>Dismiss</Button>
            </CardFooter>
        </Card>
    );
};

export default MatchCard;
