import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex max-md:flex-col gap-5">
      <div className="grid gap-2 h-fit min-w-[300px]">
        <span className="grid gap-3">
          <Skeleton className="rounded-md h-8 w-60" />
          <Skeleton className="rounded-md h-6 w-40" />
          <Skeleton className="rounded-md h-6 w-40" />
        </span>
        <Skeleton className="md:h-[400px] h-[200px] w-full relative border rounded-lg overflow-hidden" />
      </div>
      <div className={`w-full flex flex-col gap-3`}>
        <div className="flex w-full gap-2 items-center">
          <Skeleton className="flex-1 h-12 rounded-md" />
          <Skeleton className="w-16 h-12 rounded-md" />
        </div>
        <span className="flex justify-between">
          <Skeleton className="h-12 w-52 rounded-md" />
          <Skeleton className="w-16 h-12 rounded-md" />
        </span>
        <Skeleton className="rounded-md h-10" />
        <Skeleton className="rounded-md h-10" />
        <Skeleton className="rounded-md h-10" />
        <Skeleton className="rounded-md h-10" />
      </div>
    </div>
  );
};

export default loading;
