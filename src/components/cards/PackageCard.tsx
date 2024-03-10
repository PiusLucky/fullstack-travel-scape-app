"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ellipsify } from "@/lib/utils";
import MainButton from "../common/MainButton";
import { apiClient } from "@/network";
import apiResources from "@/network/resources";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/network/atoms";

function PackageCard({
  _id,
  name,
  image,
  per_person_price_in_credit,
  total_people_allowed,
  location,
  total_days,
  average_rating,
  total_rating,
}: any) {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const setUser = useSetAtom(ATOMS.user);

  const refetchUser = async () => {
    const res = await apiClient.get<{
      name: string;
      email: string;
      credit: number;
    }>(apiResources.users, "/");
    // Set to global state
    setUser(res);
  };

  const handleOrder = (packageId: string) => {
    setLoading(true);

    apiClient
      .post(apiResources.orders, "/", { packageId })
      .then(() => {
        toast({
          title: "Order Creation",
          description: "Your order has been created successfully!",
          className: "success-toast",
        });

        setLoading(false);

        refetchUser();

        setTimeout(() => {
          router.replace("/dashboard/orders");
        }, 1000);
      })
      .catch(() => {
        toast({
          title: "Insufficient Balance",
          description: "Try topping up you balance and try again",
          className: "error-toast",
        });
        setLoading(false);
      });
  };
  return (
    <div className="shadow-md inline-block rounded-[4rem] max-w-[450px]">
      <div className="relative ">
        <img
          src={image}
          alt="package image"
          className="h-[338px] w-full object-cover  rounded-t-[4rem] z-10"
        />

        <div className="absolute -bottom-6 left-5 z-20">
          <div className="inline-flex rounded-full bg-white items-center gap-3  shadow-md px-4 py-3">
            <div>
              <img src="/images/star.png" alt="star image" />
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-black">{average_rating}</span>
              <span className="text-gray-500">({total_rating})</span>
            </div>
            <div>
              <img src="/images/laughing_emoji.png" alt="emoji image" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-b-[4rem]">
        <p className="text-[24px] font-bold">{ellipsify(name, 28)}</p>
        <div className="font-semibold text-gray-500 my-4">
          <span className="text-primary text-[18px]">
            cs. {per_person_price_in_credit}/-
          </span>
          <span className="ml-2">Per person</span>
        </div>
        <div className="my-4">
          <MainButton
            text="Book now"
            classes="w-[100px] h-[30px]"
            isLoading={loading}
            action={() => handleOrder(_id)}
            dataLoadingText="wait"
          />
        </div>

        <section className="flex gap-8 flex-col md:flex-row">
          <div className="flex gap-2 items-center text-gray-500">
            <Icon icon="bi:clock" color="#000" className="text-[24px]" />
            <span className="">{total_days} Days</span>
          </div>

          <div className="flex gap-2 items-center text-gray-500">
            <img src="/images/many_users_icon.png" alt="many users" />
            <span className="">{total_people_allowed}</span>
          </div>

          <div className="flex gap-2 items-center text-gray-500">
            <Icon icon="mdi:location" className="text-[24px]" />
            <span className="">{location}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PackageCard;
