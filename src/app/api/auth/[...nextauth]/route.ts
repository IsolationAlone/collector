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
    async signIn({ profile }) {
      try {
        if (!profile?.email) throw { status: 404 };
        if (!process.env.AUTH_USERS?.includes(profile.email))
          throw { message: "Unknown Account", status: 404 };
        // await connectToDB();

        // const userExists = await User.findOne({
        //   email: profile.email,
        // });

        // if (!userExists) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name.replace(" ", "").toLowerCase(),
        //     image: profile.picture,
        //   });
        // }

        return true;
      } catch (err) {
        // console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
