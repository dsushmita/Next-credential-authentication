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
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center  items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
        <form action = "" className="flex flex-col gap-4">
        <Input  type=" email" placeholder ="Email" />
         <Input  type=" password" placeholder ="Password" />
         <Button type ="submit" variant={"outline"}>Login</Button>
        </form>

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span> Or </span>
          <form action=' ' className="flex flex-col gap-2">
          <Button type ="submit" >Login with Google</Button>
          <Link href="/signup" className="mt-2" > Dont have an account? Signup </Link>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
