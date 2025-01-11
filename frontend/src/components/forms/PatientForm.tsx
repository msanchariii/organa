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

const patientSchema = z.object({
    name: z.string().min(2),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    organNeeded: z.enum([
        "heart",
        "kidney",
        "liver",
        "lung",
        "pancreas",
        "cornea",
    ]),
    priorityStatus: z.number().min(1).max(10).step(0.1),
    location: z.string(),
    zipCode: z.coerce.number(),
    medicalHistory: z.string(),
});

const PatientForm = () => {
    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: "",
            bloodType: "A+",
            organNeeded: "heart",
            priorityStatus: 1,
            location: "",
            zipCode: 700001,
            medicalHistory: "",
        },
    });

    const priorityStatus = form.watch("priorityStatus");

    const onSubmit = (values: z.infer<typeof patientSchema>) => {
        console.log(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-4 p-4"
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Kankan Mondal"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Blood Grp */}
                <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Group</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Patient's Blood Group" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {patientSchema.shape.bloodType.options.map(
                                        (bloodGroup) => {
                                            return (
                                                <SelectItem
                                                    key={bloodGroup}
                                                    value={bloodGroup}
                                                >
                                                    {bloodGroup}
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
                {/* Organ Needed */}
                <FormField
                    control={form.control}
                    name="organNeeded"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organ Needed</FormLabel>
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
                                    {patientSchema.shape.organNeeded.options.map(
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
                {/* Priority Status */}
                <FormField
                    control={form.control}
                    name="priorityStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority Status</FormLabel>
                            <FormControl>
                                <Controller
                                    name="priorityStatus"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Slider
                                            min={1}
                                            max={10}
                                            value={[field.value]}
                                            onValueChange={(value) =>
                                                field.onChange(value[0])
                                            }
                                            step={0.1}
                                        />
                                    )}
                                ></Controller>
                            </FormControl>
                            <FormDescription>
                                1 being the lowest and 10 being the highest.{" "}
                                <strong>Current Value: {priorityStatus}</strong>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Location */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Kolkata, West Bengal"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Zip Code */}
                <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="700001"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Medical History */}
                <FormField
                    control={form.control}
                    name="medicalHistory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Type your medical history here"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default PatientForm;

// Patient Form:
// - Name (input)
// - Blood Type (select: A+, A-, B+, B-, AB+, AB-, O+, O-)
// - Organ Needed (select: heart, kidney, liver, etc.)
// - Priority Status (select: 1-10)
// - Location (input)
// - Medical History (textarea)
// - Submit Button
