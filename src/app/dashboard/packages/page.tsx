"use client";

import PackageCard from "@/components/cards/PackageCard";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/network";
import apiResources from "@/network/resources";
import { IPackagesResponse } from "@/types";
import React, { useEffect, useState } from "react";

function Package() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<IPackagesResponse[]>();

  useEffect(() => {
    async function fetch() {
      // NOTE: Generate packages if non exists
      await apiClient.post(apiResources.packages, "/", {});

      const pkgs = await apiClient.get<IPackagesResponse[]>(
        apiResources.packages,
        "/"
      );
      setPackages(pkgs);
      setLoading(false);
    }

    fetch();
  }, []);

  return (
    <div
      className={
        loading
          ? "px-8 mt-8"
          : "px-8 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 grid-flow-dense pb-32"
      }
    >
      {loading ? (
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-16 ">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
            <Skeleton className="w-[300px] h-[338px]" key={index} />
          ))}
        </div>
      ) : (
        packages?.map((pkg) => <PackageCard {...pkg} key={pkg._id} />)
      )}
    </div>
  );
}

export default Package;
