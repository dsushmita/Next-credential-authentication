import { hash } from 'bcryptjs';
import { User } from "@/models/userModel";
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from 'next/link'; // Import Link if you're using Next.js's Link component
import { connectToDatabase } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { CredentialsSignin } from 'next-auth';

const Page = () => {
  const loginHandler = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password )
      throw new Error("Please provide all fields");

    try{
      await signIn("credentials",{
        email,
        password,
        redirect:true,
        redirectTo:"/",
      });
    }catch(e){
      const err = e as CredentialsSignin;
      return err.message;
    }

    //Connect to Database:
     await connectToDatabase()

    const user = await User.findOne({ email });

    if (user) throw new Error("User already exists");

    const hashedPassword = await hash(password, 10);

    await User.create({

      email,
      password: hashedPassword
    });

    redirect('/login');
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form action={loginHandler} className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" name="email" required />
            <Input type="password" placeholder="Password" name="password" required />
            <Button type="submit" variant={"outline"}>Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form className="flex flex-col gap-2">
            <Button type="button">Login with Google</Button>
            <Link href="/signup" className="mt-2">Dont have an account? Signup</Link>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
