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
import axios from "axios";
import routes from "@/lib/routes";
import { ChevronsUpDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

const loginSchema = z.object({
  // email: z.string().email(),
  // password: z.string().min(6),
  hospital_id: z.coerce.number().min(3),
  password: z.string().min(6),
  staff_id: z.string().min(3  ),
});

const Login = () => {

  const router = useRouter()

  const logIn = useAuth((state) => state.login)
  const user = useAuth((state) => state.user)
  console.log(user);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      hospital_id: 0,
      staff_id: "",
      password: "",
    },
  });

  const [hospitalId, setHospitalId] = useState([
    {
      id: "1",
      name: "Cnmc",
    },
    {
      id: "2",
      name: "NRS",
    },
    {
      id: "3",
      name: "RGKar",
    },
    {
      id: "4",
      name: "Sskm",
    },
  ])

  useEffect(() => {
    const getHospital = async () => {
      try {
        const response = await axios.get(routes.getHospitals);
        console.log(response.data);

        setHospitalId(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getHospital();
  }, []);

  // useEffect(() => {
  //   const enteredHospital = hospitalId.find(
  //     (item) => item.id === form.getValues("hospital_id").toString()
  //   );
  //   if (!enteredHospital) {
  //     console.log("Unknown Hospital ID");
  //   }
  // }, [form.watch("hospital_id")]);
  


  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log("Values", values);
    // this will be sent by backend (send req using axios)
    // const newuserData = {
    //     email: values.email,
    //     staffId: "abcd",
    //     hospitalName: "albal",
    // }

    try {
      const newuserData = await axios.post(routes.login, values)
      logIn(newuserData.data)
      form.reset();
      router.push('/dashboard')
    } catch (error) {
      console.log(error);
    }
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




        {/* <FormField
          control={form.control}
          name="hospital_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Treating In hospital</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value &&
                        "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? hospitalId.find(
                          (item) =>
                            item.id ===
                            field.value,
                        )?.name
                        : "Select Hospital"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Hospital..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>
                        No Hospital Found.
                      </CommandEmpty>
                      <CommandGroup>
                        {hospitalId.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.id}
                            onSelect={() => {
                              form.setValue(
                                "treatingInHospital",
                                item.name,
                              );
                            }}
                          >
                            {item.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                item.name ===
                                  field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        /> */}


        <FormField
          control={form.control}
          name="hospital_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Treating In Hospital</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? `${field.value} - ${hospitalId.find((item) => item.id === field.value.toString())
                          ?.name || "Unknown Hospital"
                        }`
                        : "Select Hospital"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Hospital..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No Hospital Found.</CommandEmpty>
                      <CommandGroup>
                        {hospitalId.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.id}
                            onSelect={() => {
                              form.setValue("hospital_id", Number(item.id));
                            }}
                          >
                            {item.id} - {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
              {/* <FormDescription>
                                We will never share your email.
                            </FormDescription> */}
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
