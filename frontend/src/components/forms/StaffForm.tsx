"use client";
import routes from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "../ui/input";

// {
//     "email": "user@example.com",
//     "staff_id": "string",
//     "password": "string",
//     "role": "string"
//   }
const registerSchema = z.object({
    email: z.string().email(),
    staff_id: z.string().min(3),
    password: z.string().min(6),
    role: z.string().min(3),
    hospital_id: z.coerce.number().min(3),
});
const StaffForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            staff_id: "",
            password: "",
            role: "",
            hospital_id: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {

        try {
            const response = await axios.post(routes.addStaff, values);
            console.log("Registration Successful:", response.data);
            form.reset();
            router.push("/dashboard");
        } catch (error) {
            console.error("Registration Failed:", error);
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-4 p-4"
            >
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-muted-foreground text-sm">
                    Access ad free matching. Flexible and secure.
                </p>

                <FormField
                    control={form.control}
                    name="email"
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
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hospital_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hospital Id</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1234"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            {/* <FormDescription>
                            We will never share your email.
                        </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="staff_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Staff Id</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="staff1"
                                    type="string"
                                    {...field}
                                />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
};

export default StaffForm;
