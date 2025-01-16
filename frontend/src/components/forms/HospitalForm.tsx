"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
// import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import H2 from "../typography/H2";
import axios from "axios";

const hospitalSchema = z.object({
    name: z.string().nonempty().min(3),
    location: z.string().nonempty(),
    contact_phone: z.string().nonempty(),
    contact_email: z.string().nonempty(),
});

const HospitalForm = () => {

    const form = useForm<z.infer<typeof hospitalSchema>>({
        resolver: zodResolver(hospitalSchema),
        defaultValues: {
            name: "",
            location: "Kolkata",
            contact_phone: "1234556778",
            contact_email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof hospitalSchema>) => {
        console.log("Values: ", values);
        try {
            const response = await axios.post("http://localhost:8000/api/hospitals/", values);
            console.log("Response: ", response?.data);

        } catch (error) {
            console.log("Error: ", error);

        }
        form.reset();
    };
    return (
        <Form {...form}
        >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Hospital name */}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hospital Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Hospital location */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hospital Location</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Phone */}
                <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Email */}
                <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>

            </form>

        </Form>
    );
}

export default HospitalForm;
