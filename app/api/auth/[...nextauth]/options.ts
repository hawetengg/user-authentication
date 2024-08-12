import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

interface User {
  accessToken: any;
  id: string;
  email: string;
  name: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "email profile",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const user: User | null = await res.json();


          if (res.ok && user) {

            return user
          } else {
            return null;
          }
        } catch (error) {
          
          console.error("Error during authentication", error);
          return null;
        }
      },
    }),
  ],
  session:{
    strategy:'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        };
        session.user.accessToken = token.accessToken as string
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/verify-email",
  },
};

export default NextAuth(authOptions);