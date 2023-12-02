// import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //   const sessionUser = await User.findOne({
      //     email: session?.user?.email,
      //   });
      //     if( session.user?.email )
      //   session

      return session;
    },
    // async signIn({ profile }) {
    //   try {
    //     await connectToDB();

    //     const userExists = await User.findOne({
    //       email: profile.email,
    //     });

    //     if (!userExists) {
    //       await User.create({
    //         email: profile.email,
    //         username: profile.name.replace(" ", "").toLowerCase(),
    //         image: profile.picture,
    //       });
    //     }

    //     return true;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
});

export { handler as GET, handler as POST };
