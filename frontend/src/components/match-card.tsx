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
    organ?: {
        organType?: string;
        priorityStatus?: number;
        organViability?: number;
        organSize?: string;
        organCondition?: string;
    };
    donor?: {
        name?: string;
        bloodGroup?: string;
        hlaA?: string;
        hlaB?: string;
        hlaC?: string;
        hlaD?: string;
        hlaDRB1?: string;
        hlaDQB1?: string;
    };
    recepient?: {
        name?: string;
        age?: number;
        gender?: string;
        location?: string;
        bloodGroup?: string;
        hlaA?: string;
        hlaB?: string;
        hlaC?: string;

        hlaDRB1?: string;
        hlaDQB1?: string;
    };
    notification?: {
        time?: string;
    };
    compatibility?: {
        score?: number | string;
        geminiSummary?: string;
    };
};

const MatchCard = ({
    organ,
    donor,
    recepient,
    notification,
}: MatchCardProps) => {
    const onClick = () => {
        console.log("Clicked");
    };

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
                    <div className="bg-primary h-2 w-2 rounded"></div>{" "}
                    {notification?.time || "2 hours ago"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
                <p className="text-sm">
                    <strong>Recipient Name: </strong>
                    {recepient?.name || "Kankan Mondal"}
                </p>

                <p className="text-sm">
                    <strong>Organ Type: </strong> {organ?.organType || "Heart"}
                </p>
                <p className="text-sm">
                    <strong>Viable Time of Organ: </strong>{" "}
                    {organ?.organViability || "5 hours"}
                </p>

                <p className="text-sm">
                    <strong>Current Location:</strong>{" "}
                    {recepient?.location || "Kolkata"}
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
                                Patient Name:{" "}
                                {recepient?.name || "Kankan Mondal"}
                            </DialogTitle>
                            <DialogDescription>
                                <strong className="capitalize">
                                    {organ?.organType}
                                </strong>
                                match Found for kankan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full justify-between gap-4 text-sm">
                            <List className="basis-1/2">
                                <li>
                                    <strong>Donor Name: </strong>
                                    {donor?.name || "Kankan Mondal"}
                                </li>
                                <li>
                                    <strong>Age: </strong>
                                    {recepient?.age || "25"}
                                </li>
                                <li>
                                    <strong>Gender: </strong>
                                    {recepient?.gender || "female"}
                                </li>
                                <li>
                                    <strong>Organ needed: </strong>
                                    {organ?.organType || "Heart"}
                                </li>
                            </List>
                            <List className="basis-1/2">
                                <li>
                                    <strong>Priority Status: </strong>
                                    {organ?.priorityStatus || "1"}
                                </li>
                                <li>
                                    <strong>Organ Viability: </strong>
                                    {organ?.organViability || "5 hours"}
                                </li>
                                <li>
                                    <strong>Organ Size: </strong>
                                    {organ?.organSize || "Large"}
                                </li>
                                <li>
                                    <strong>Organ Condition: </strong>
                                    {organ?.organCondition || "Good"}
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
                                        <TableCell>
                                            {donor?.bloodGroup || "A+"}
                                        </TableCell>
                                        <TableCell>
                                            {recepient?.bloodGroup || "B+"}{" "}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeA</TableCell>
                                        <TableCell>
                                            {donor?.hlaA || "h1asd"}
                                        </TableCell>
                                        <TableCell>
                                            {recepient?.hlaA || "h1"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeB</TableCell>
                                        <TableCell>
                                            {donor?.hlaB || "h1"}
                                        </TableCell>
                                        <TableCell>
                                            {recepient?.hlaB || "h2"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeC</TableCell>
                                        <TableCell>
                                            {donor?.hlaC || "h1"}
                                        </TableCell>
                                        <TableCell>
                                            {recepient?.hlaC || "h2"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeDRB1</TableCell>
                                        <TableCell>
                                            {donor?.hlaDRB1 || "h1"}
                                        </TableCell>
                                        <TableCell>
                                            {recepient?.hlaDRB1 || "h2"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeDQB1</TableCell>
                                        <TableCell>
                                            {donor?.hlaDQB1 || "h1"}
                                        </TableCell>
                                        <TableCell>
                                            {donor?.hlaDQB1 || "h2"}
                                        </TableCell>
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
