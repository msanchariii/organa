"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import H2 from "../typography/H2";

const organSchema = z.object({
    // Organ Information
    organType: z.enum([
        "heart",
        "kidney",
        "liver",
        "lung",
        "pancreas",
        "intestine",
        "eye",
    ]),
    recoveryDate: z.date(),
    expectedPreservationTime: z.coerce
        .number()
        .min(1, "Time must be at least 1 hour"), // in hours

    // Donor Information
    donorAge: z.coerce.number().min(1, "Age must be valid"),
    donorBloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    donorGender: z.enum(["Male", "Female", "Other"]),
    causeOfDeath: z.string().optional(),

    // Organ Condition
    organSize: z.string().optional(),
    organConditionRating: z
        .enum(["Excellent", "Good", "Fair", "Poor"])
        .optional(),

    // HLA Typing
    hlaTest: z
        .object({
            hlaA: z.string().optional(),
            hlaB: z.string().optional(),
            hlaC: z.string().optional(),
            hlaDRB1: z.string().optional(),
            hlaDQB1: z.string().optional(),
        })
        .optional(),

    // Location Details
    donorHospital: z.string().min(1, "Hospital name is required"),
    currentLocation: z.string().optional(),
    transportArrangements: z.string().optional(),

    // Additional Information
    medicalHistory: z.string().optional(),
    viralTestingStatus: z.enum(["Negative", "Positive", "Pending"]).optional(),
    organBiopsyResults: z.string().optional(),
});

const OrganForm = () => {
    const form = useForm<z.infer<typeof organSchema>>({
        resolver: zodResolver(organSchema),
        defaultValues: {
            organType: "heart",
            recoveryDate: new Date(),
            expectedPreservationTime: 6,
            donorAge: 25,
            donorBloodType: "A+",
            donorGender: "Male",
            causeOfDeath: "Car accident",
            organSize: "Medium",
            organConditionRating: "Good",
            hlaTest: {
                hlaA: "A*01:01",
                hlaB: "B*08:01",
                hlaC: "C*07:01",
                hlaDRB1: "DRB1*03:01",
                hlaDQB1: "DQB1*02:01",
            },
            donorHospital: "St. Mary's Hospital",
            currentLocation: "St. Mary's Hospital",
            transportArrangements: "Ambulance",
            medicalHistory: "No medical history",
            viralTestingStatus: "Negative",
            organBiopsyResults: "No biopsy results",
        },
    });

    const onSubmit = (values: z.infer<typeof organSchema>) => {
        console.log("Values: ", values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <H2>Organ Information</H2>

                {/* organ type */}
                <FormField
                    control={form.control}
                    name="organType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organ Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Organ Needed" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {organSchema.shape.organType.options.map(
                                        (organ) => {
                                            return (
                                                <SelectItem
                                                    key={organ}
                                                    value={organ}
                                                >
                                                    {organ}
                                                </SelectItem>
                                            );
                                        },
                                    )}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* recovery date */}

                {/* expected preservation time */}
                <FormField
                    control={form.control}
                    name="expectedPreservationTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Expected Preservation Time in Hours
                            </FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* donor information */}
                <H2>Donor Information</H2>
                <div className="grid grid-cols-3 gap-4">
                    {/* donor age */}
                    <FormField
                        control={form.control}
                        name="donorAge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Donor Age</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* donor blood type */}
                    <FormField
                        control={form.control}
                        name="donorBloodType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Donor Blood Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Blood Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {organSchema.shape.donorBloodType.options.map(
                                            (bloodType) => {
                                                return (
                                                    <SelectItem
                                                        key={bloodType}
                                                        value={bloodType}
                                                    >
                                                        {bloodType}
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* donor gender */}
                    <FormField
                        control={form.control}
                        name="donorGender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Donor Gender </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Donor Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {organSchema.shape.donorGender.options.map(
                                            (gender) => {
                                                return (
                                                    <SelectItem
                                                        key={gender}
                                                        value={gender}
                                                    >
                                                        {gender}
                                                    </SelectItem>
                                                );
                                            },
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* cause of death */}
                <FormField
                    control={form.control}
                    name="causeOfDeath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cause of Death</FormLabel>
                            <FormControl>
                                <Input placeholder="Car Accident" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default OrganForm;
