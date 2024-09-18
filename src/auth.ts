import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials'
import { User } from "./models/userModel";
import { compare } from 'bcryptjs';


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
        name:'credentials',
        credentials:{
            email:{label:"email",type:"email"},
            password:{label:"password",type:"password"},
        },
        authorize: async(credentials)=>{
            const email = credentials.email as string|| undefined;
            const password = credentials.password as string|| undefined;

            if (! email || !password){
                throw new CredentialsSignin("please provide both email and password")
            }
            const user = await User.findOne({email}).select("+password");

            if(!user) throw new CredentialsSignin('Invalid Email or password');

            if (!user.password) throw new CredentialsSignin('Invalid Email or password')

            const isMatch =  await compare(password, user.password);

            if (!isMatch)  throw new CredentialsSignin("Invalid Email or password")

            return {name: user.name, email:user.email, id:user._id };
        }
    }),
  ],
  pages:{
    signIn: "/login",
    
  }
})

//class constructor //getter and setter//cretae constructor to copy the object