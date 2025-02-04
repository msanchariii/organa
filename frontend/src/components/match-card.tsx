"use client";
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
import useAuth from "@/store/AuthStore";
import { matches, organs, patients } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function timeAgo(date: string | Date): string {
    const now = new Date();
    const timestamp = new Date(date);
    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return "Just now";
    } else if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (days < 7) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
        return timestamp.toLocaleDateString(); // fallback to a full date if more than a week ago
    }
}

const MatchCard = ({
    patient,
    organ,
    match,
    onApprove,
    onDismiss,
}: {
    patient: patients;
    organ: organs;
    match: matches;
    onApprove: () => void;
    onDismiss: () => void;
}) => {
    const removeNotification = useAuth((state) => state.removeNotification);
    const onClick = () => {
        console.log("Clicked");
    };
    const { toast } = useToast();
    const router = useRouter();

    // match created at to notification time
    const timeSinceNotification = timeAgo(match.created_at!);

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
                    {timeSinceNotification}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between space-y-1">
                <div>
                    <p className="text-sm">
                        <strong>Organ Type: </strong>{" "}
                        {organ?.organ_type || "Heart"}
                    </p>
                    <p className="text-sm">
                        <strong>Viable Time of Organ: </strong>{" "}
                        {organ?.expected_preservation_time || "5 hours"}
                    </p>

                    <p className="text-sm">
                        <strong>Current Location:</strong>{" "}
                        {patient.location || "Kolkata"}
                    </p>
                </div>
                <p className="flex aspect-square w-16 items-center justify-center rounded-full bg-green-500 text-center font-bold text-white">
                    {match.match_score}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <div className="flex gap-4">
                    <Button variant={"default"} onClick={onApprove}>
                        Approve
                    </Button>
                    <Button variant={"secondary"} onClick={onDismiss}>
                        Dismiss
                    </Button>
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
                                Patient Name:
                                {patient?.name}
                            </DialogTitle>
                            <DialogDescription>
                                <strong className="capitalize">
                                    {organ?.organ_type}
                                </strong>
                                match Found for kankan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full justify-between gap-4 text-sm">
                            <List className="basis-1/2">
                                <li>
                                    <strong>Age: </strong>
                                    {organ.donor_age}
                                </li>
                                <li>
                                    <strong>Gender: </strong>
                                    {organ.donor_gender || "female"}
                                </li>
                                <li>
                                    <strong>Organ needed: </strong>
                                    {organ?.organ_type || "Heart"}
                                </li>
                            </List>
                            <List className="basis-1/2">
                                <li>
                                    <strong>Priority Status: </strong>
                                    {patient.priority_status || "1"}
                                </li>
                                <li>
                                    <strong>Organ Viability: </strong>
                                    {organ?.expected_preservation_time ||
                                        "5 hours"}
                                </li>
                                <li>
                                    <strong>Organ Size: </strong>
                                    {organ?.organ_size || "Large"}
                                </li>
                                <li>
                                    <strong>Organ Condition: </strong>
                                    {organ?.organ_condition_rating || "Good"}
                                </li>
                            </List>
                        </div>
                        <div>
                            <Table>
                                {/* <TableCaption>Details</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]"></TableHead>
                                        <TableHead>Donor(Organ)</TableHead>
                                        <TableHead>Patient</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Blood group</TableCell>
                                        <TableCell>
                                            {organ?.donor_blood_type || "A+"}
                                        </TableCell>
                                        <TableCell>
                                            {patient.blood_type || "B+"}{" "}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeA</TableCell>
                                        <TableCell>
                                            {organ.hla_a || "h1asd"}
                                        </TableCell>
                                        <TableCell>
                                            {patient.hla_test?.hlaA || "NA"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeB</TableCell>
                                        <TableCell>{organ.hla_b}</TableCell>
                                        <TableCell>
                                            {patient.hla_test?.hlaA || "NA"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeC</TableCell>
                                        <TableCell>{organ.hla_c}</TableCell>
                                        <TableCell>
                                            {patient.hla_test?.hlaC || "NA"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA typeDQB1</TableCell>
                                        <TableCell>{organ.hla_dqb1}</TableCell>
                                        <TableCell>
                                            {patient.hla_test?.hlaDQB1 || "NA"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>HLA DRB1</TableCell>
                                        <TableCell>
                                            {organ.hla_drb1 || "h1"}
                                        </TableCell>
                                        <TableCell>
                                            {patient.hla_test?.hlaDRB1 || "NA"}
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
