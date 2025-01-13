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
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import List from "./typography/List";

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
                                Patient Name:Kankan Mondal
                            </DialogTitle>
                            <DialogDescription>
                                Kidney match Found for kankan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-[50vw] justify-between gap-4">
                            <List>
                                <li>
                                    <strong>Name:</strong>
                                    Kankan Mondal
                                </li>
                                <li>
                                    <strong>Age:</strong>
                                    67
                                </li>
                                <li>
                                    <strong>Gender:</strong>
                                    Female
                                </li>
                                <li>
                                    <strong>Organ needed:</strong>
                                    Brain
                                </li>
                            </List>
                            <List>
                                <li>
                                    <strong>Priority Status:</strong>
                                    100
                                </li>
                                <li>
                                    <strong>Organ Viability:</strong>5 hours
                                </li>
                                <li>
                                    <strong>Organ Size:</strong>
                                    25 cm
                                </li>
                                <li>
                                    <strong>Organ Condition:</strong>
                                    kharap
                                </li>
                            </List>
                        </div>
                        <div>
                            <Table>
                                {/* <TableCaption>Details</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[175px]"></TableHead>
                                        <TableHead>Donor</TableHead>
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
                                        <TableCell>HLA type1</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA type2</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>{" "}
                                    <TableRow>
                                        <TableCell>HLA type3</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>{" "}
                                    <TableRow>
                                        <TableCell>HLA type4</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>{" "}
                                    <TableRow>
                                        <TableCell>HLA type5</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        {/* <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter> */}
                    </DialogContent>
                </Dialog>
                <Button variant={"default"}>Approve</Button>
                <Button variant={"secondary"}>Dismiss</Button>
            </CardFooter>
        </Card>
    );
};

export default MatchCard;
