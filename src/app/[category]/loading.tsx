import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array(6)
        .fill(Math.random() * 100)
        .map((num) => (
          <Card className="overflow-hidden md:min-h-[274px]">
            <CardHeader className="relative ">
              <div className="absolute object-cover opacity-20" />
              <CardTitle className="z-10">
                <Skeleton className="h-6 w-40 rounded-lg" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-6 w-14 rounded-lg" />
              </CardDescription>
            </CardHeader>
            <CardContent>{/* <p>Card Content</p> */}</CardContent>
            <CardFooter className="flex gap-3">
              <Skeleton className="h-5 w-10 rounded-lg" />
              <Skeleton className="h-5 w-10 rounded-lg" />
              <Skeleton className="h-5 w-10 rounded-lg" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Loading;
