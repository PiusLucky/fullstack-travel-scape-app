"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Drawer from "react-modern-drawer";
import numeral from "numeral";
import { ATOMS } from "@/network/atoms";
import { apiClient } from "@/network";
import apiResources from "@/network/resources";
import { Skeleton } from "../ui/skeleton";
import DashboardSidebar from "./DashboardSidebar";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DashboardNavigation() {
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useAtom(ATOMS.user);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiClient.get<{
          name: string;
          email: string;
          credit: number;
        }>(apiResources.users, "/");
        // Set to global state
        setUser(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sticky top-0 shadow-none z-20 ">
      {/* DESKTOP */}
      <div className="animate-in fade-in zoom-in bg-white p-4 border border-b-[#F2F2F2]">
        <div className=" flex justify-between items-center">
          <div className="md:hidden">
            <Icon
              icon="carbon:maximize"
              onClick={toggleDrawer}
              className="cursor-pointer"
              fontSize={20}
            />
          </div>
          <section className="md:flex md:w-full md:justify-between px-4 md:px-8">
            <div className="flex justify-between flex-col md:flex-row gap-[1.5rem] select-none w-full">
              <div>
                <p className="text-2xl md:text-[28px] font-bold">
                  Welcome Back, {user?.name}
                </p>
                <p className="text-secondary">
                  Here is the information about all your orders
                </p>
              </div>
              <div className="text-black font-[500] flex items-center gap-8">
                <div className="flex">
                  {!loading ? (
                    <div>
                      <img src="/images/coin.png" alt="coin" />
                    </div>
                  ) : (
                    <Skeleton className="w-[50px] h-[50px] rounded-full" />
                  )}

                  {!loading ? (
                    <span className="text-[32px] font-bold">
                      {numeral(user?.credit).format("0,0")}
                    </span>
                  ) : (
                    <Skeleton className="mx-4 h-[50px] w-[60px]" />
                  )}
                </div>
                {loading ? (
                  <Skeleton className="w-[50px] h-[50px] rounded-full" />
                ) : (
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-[16px]">{user?.name}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <Drawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          direction="left"
          lockBackgroundScroll={true}
          customIdSuffix="drawer-1"
        >
          <DashboardSidebar excludeMinimize />
        </Drawer>
      </div>
    </div>
  );
}

export default DashboardNavigation;
