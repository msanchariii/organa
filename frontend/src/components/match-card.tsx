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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// * Remove all padding first. Read all the instructions then follow it. Add padding (if needed) at last.

const MatchCard = () => {
    return (
        // @kankanmondal22
        // ! Add time of notification in the card i.e. "1 hours ago"

        <Card className="bg-card/50">
            {/* 
                    // * Avatar component should be used inside CardHeader component (use flex, flex-row in CardHeader to align Avatar and CardTitle)
                    */}

            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="flex flex-row items-center gap-4">
                    <Avatar className="h-8 w-8 text-sm">
                        <AvatarImage src="" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    Patient match found
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                    <div className="bg-primary h-2 w-2 rounded"></div> 1 hour
                    ago
                </CardDescription>
            </CardHeader>

            {/*
             */}
            <CardContent>
                {/*
                 */}
                <p className="text-sm">
                    <strong>Recipient Name:</strong>Kankan Mondal
                </p>
                <p className="text-sm">
                    <strong>Donor Name:</strong> Kankan Mondal
                </p>
                <p className="text-sm">
                    <strong>Organ Type:</strong> Kidney
                </p>
                <p className="text-sm">
                    <strong>Viable Time of Organ:</strong> 5 hours
                </p>

                <p className="text-sm">
                    <strong>Organ Conditon:</strong> Good
                </p>
            </CardContent>

            <CardFooter className="space-x-4">
                {/* 
                            // * Use primary(default) button for approve and secondary button for dismiss
                        */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Patient Name:Kankna MOndal
                            </DialogTitle>
                            <DialogDescription>
                                Kidney Found for kankna
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Table>
                                <TableCaption>Details</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]"></TableHead>
                                        <TableHead>Doner</TableHead>
                                        <TableHead>Recipient</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Blood group</TableCell>
                                        <TableCell>B+</TableCell>
                                        <TableCell>B+ </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Blood group</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant={"default"}>Approve</Button>
                <Button variant={"secondary"}>Dismiss</Button>
            </CardFooter>
        </Card>
    );
};

export default MatchCard;
