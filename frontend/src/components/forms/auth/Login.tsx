"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import useAuth from "@/store/AuthStore";
import { useRouter } from "next/navigation";




const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const Login = () => {

    const router = useRouter()

    const logIn = useAuth((state) => state.login)
    const user = useAuth((state)=> state.user)
    console.log(user);
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values);
        // this will be sent by backend (send req using axios)
        const newuserData = {
            email: values.email,
            staffId: "abcd",
            hospitalName: "albal",
        }
        logIn(newuserData)
        form.reset();
        router.push('/dashboard')
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-4 p-4"
            >
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-sm">
                    Access ad free matching. Flexible and secure.
                </p>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="harry@hogwarts.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                We will never share your email.
                            </FormDescription>
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
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
};
export default Login;
