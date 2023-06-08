import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number;
      email: string;
      image: string;
    };
  }
  interface Profile {
    picture: string;
  }
}
