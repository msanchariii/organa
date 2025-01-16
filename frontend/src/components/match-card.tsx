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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import List from "./typography/List";

type MatchCardProps = {
    donorName: string;
};

const MatchCard = () => {
    return (
        <Card className="rounded-none border-x-0 border-b-2 border-t-0 bg-transparent shadow-none">
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
            <CardContent className="space-y-1">
                <p className="text-sm">
                    <strong>Recipient Name: </strong>Kankan Mondal
                </p>

                <p className="text-sm">
                    <strong>Organ Type: </strong> Kidney
                </p>
                <p className="text-sm">
                    <strong>Viable Time of Organ: </strong> 5 hours
                </p>

                <p className="text-sm">
                    <strong>Current Location:</strong> Kolkata
                </p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                    <Button variant={"default"}>Approve</Button>
                    <Button variant={"secondary"}>Dismiss</Button>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="" variant={"outline"}>
                            View Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Patient Name: Kankan Mondal
                            </DialogTitle>
                            <DialogDescription>
                                <strong className="capitalize">Heart </strong>
                                match Found for kankan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full justify-between gap-4 text-sm">
                            <List className="basis-1/2">
                                <li>
                                    <strong>Donor Name: </strong>
                                    Subha Mistry
                                </li>
                                <li>
                                    <strong>Age: </strong>
                                    67
                                </li>
                                <li>
                                    <strong>Gender: </strong>
                                    Female
                                </li>
                                <li>
                                    <strong>Organ needed: </strong>
                                    Brain
                                </li>
                            </List>
                            <List className="basis-1/2">
                                <li>
                                    <strong>Priority Status: </strong>
                                    100
                                </li>
                                <li>
                                    <strong>Organ Viability: </strong>5 hours
                                </li>
                                <li>
                                    <strong>Organ Size: </strong>
                                    25 cm
                                </li>
                                <li>
                                    <strong>Organ Condition: </strong>
                                    kharap
                                </li>
                            </List>
                        </div>
                        <div>
                            <Table>
                                {/* <TableCaption>Details</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]"></TableHead>
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
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA type3</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA type4</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA type5</TableCell>
                                        <TableCell>h1</TableCell>
                                        <TableCell>h2</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default MatchCard;
