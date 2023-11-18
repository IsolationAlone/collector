"use client";

import Link from "next/link";
import Image from "next/image";
import {
  signOut,
  useSession,
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ModeToggle } from "@/components/mode-toogle";

const Profile = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setProvider = async () => {
      const reponse = await getProviders();
      setProviders(reponse);
    };

    setProvider();
  }, []);

  return (
    <div className="flex items-center gap-3">
      {session?.user && (
        <Image
          src={session?.user.image || ""}
          width={37}
          height={37}
          className="h-10 w-10 rounded-full object-cover"
          alt="profile"
        />
      )}
      <Button
        //@ts-ignore
        onClick={
          status == "unauthenticated"
            ? () => signIn(providers?.google.id)
            : signOut
        }
        disabled={status == "loading"}
        className="border"
        variant={"ghost"}
      >
        {status == "loading" && (
          <>
            <Icons.spinner className="animate-spin mr-2 h-4 w-4" />
            Loading...
          </>
        )}
        {status == "unauthenticated" && "Sign In"}
        {status == "authenticated" && "Sign Out"}
      </Button>
      <ModeToggle />
    </div>
  );
};

export default Profile;
