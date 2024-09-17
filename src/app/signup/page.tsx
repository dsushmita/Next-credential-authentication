import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { hash } from 'bcryptjs';
import { User } from "@/models/userModel";
import { redirect } from 'next/navigation';

import React from "react";
import { connectToDatabase } from "@/lib/utils";

const Page = () => {
  const signUp = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password || !name)
      throw new Error("Please provide all fields");

    //Connect to Database:
     await connectToDatabase()

    const user = await User.findOne({ email });

    if (user) throw new Error("User already exists");

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    redirect('/login');
  };
  return (
    <div className="flex justify-center  items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form action="" className="flex flex-col gap-4">
            <Input placeholder="Name" />
            <Input type=" email" placeholder="Email" />
            <Input type=" password" placeholder="Password" />
            <Button type="submit" variant={"outline"}>
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span> Or </span>
          <form action={signUp} className="flex flex-col gap-2">
            <Button type="submit">Login with Google</Button>
            <Link href="/login" className="mt-2" > Dont have an account? Login </Link>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
