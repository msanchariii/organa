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
        // ! The outermost div is not needed. DO NOT INCLUDE ANY ELEMENT IF IT IS NOT NEEDED
        // ! Add time of notification in the card i.e. "1 hours ago"
        <div>
            <Card className="bg-card/50 p-8">
                <div className="flex">
                    {/* 
                    //! Card component should not directly contain any other component other than CardHeader, CardContent, CardFooter (DO NOT USE div or Avatar directly inside Card)
                    // TODO: Remove div and Avatar from here
                    // TODO: Use only CardHeader, CardContent, CardFooter components instead of div
                    // * Avatar component should be used inside CardHeader component (use flex, flex-row in CardHeader to align Avatar and CardTitle)
                    */}
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
                {/* 
                //! Remove div
                */}
                <div className="px-10 py-4">
                    <CardContent>
                        <CardDescription>
                            {/* 
                            // ! CardDescription should be inside CardHeader
                            // * you can use any html element inside CardContent such as h1, h2, p etc. and add tailwind classes accordingly 
                            */}
                            Approval need for dispatch
                        </CardDescription>
                    </CardContent>

                    <CardFooter className="space-x-4 py-0">
                        {/* 
                            // * Use primary(default) button for approve and secondary button for dismiss
                        */}
                        <Button variant={"default"}>Approve</Button>
                        <Button variant={"secondary"}>Dismiss</Button>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};

export default MatchCard;
