"use client";

import { Icon } from "@iconify/react";
import { useHover } from "@uidotdev/usehooks";
import Link from "next/link";
import { sidebarItems } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";

import { ChangeEvent, useEffect, useState } from "react";
import { ATOMS } from "@/network/atoms";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Checkout from "./Checkout";
import { apiClient } from "@/network";
import apiResources from "@/network/resources";

interface ISidebarElementProps {
  icon: string;
  title: string;
  minimize: boolean;
  currentPath: string;
  link: string;
}

function SidebarElement({
  icon,
  title,
  minimize,
  currentPath,
  link,
}: ISidebarElementProps) {
  const [ref, hovering] = useHover();

  return (
    <div
      ref={ref}
      className={`
       flex gap-[0.5rem]  ${
         !minimize ? "w-[14.625rem]" : "w-[4.5rem]"
       } h-[2.75rem] cursor-pointer
     hover:bg-[#FAF6FE] ${
       currentPath === link
         ? "bg-[#FAF6FE] text-primary transition duration-300"
         : ""
     } rounded-[0.5rem] pt-[.6rem] pb-[.6rem] pr-4 pl-4
       ${hovering ? "text-primary" : "text-mildGray"}
       transition-opacity duration-300 font-[500]
    `}
    >
      <div className="text-red-400">
        <Icon
          icon={icon}
          color={hovering || currentPath === link ? "#FFA03F" : "#7C8DB5"}
          width="24"
          height="24"
        />
      </div>

      <p
        className={`text-[#7C8DB5] hover:text-primary ${
          minimize ? "min-[767px]:hidden" : "block"
        } ${currentPath === link ? "text-primary" : ""}`}
      >
        {title}
      </p>
    </div>
  );
}

function DashboardSidebar({
  excludeMinimize = false,
}: {
  excludeMinimize?: boolean;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);

  const [minimize, setMinimize] = useAtom(ATOMS.sidebarMinimized);

  const currentPath = usePathname();

  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e?.target?.value));
  };

  const signOut = () => {
    // NOTE: Clear storage & redirect user
    clearAllData();
    router.push("/");
  };

  function clearAllData() {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Clear local storage
    localStorage.clear();
  }

  function getCurrentDimension() {
    if (typeof window !== "undefined") {
      return window?.innerWidth;
    }
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    async function fetch() {
      const userRes = await apiClient.get<any>(apiResources.users, "/");
      setUser(userRes);
    }

    fetch();
  }, []);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    if (typeof window !== "undefined") {
      window?.addEventListener("resize", updateDimension);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateDimension);
      }
    };
  }, [screenSize]);
  return (
    <div
      className={`border border-r-[#F2F2F2] h-screen px-[1.56rem] ${
        !minimize ? "w-[16.6235rem]" : "w-[7rem] max-[767px]:w-[16.6235rem]"
      } pt-[2rem] bg-white transition-width duration-300 ease-in-out`}
    >
      <div
        className={`flex ${!minimize ? "justify-between" : "justify-center"}`}
      >
        <img
          src="/images/dashboard_logo.png"
          alt="socialforce logo"
          className={`${
            minimize ? "min-[767px]:hidden" : "block"
          } cursor-pointer`}
        />
        {!excludeMinimize && !minimize ? (
          <Icon
            icon="carbon:minimize"
            onClick={toggleMinimize}
            className="cursor-pointer"
            fontSize={20}
          />
        ) : (
          <Icon
            icon="carbon:maximize"
            onClick={toggleMinimize}
            className="cursor-pointer"
            fontSize={20}
          />
        )}
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-5rem)]">
        <section className="flex flex-col justify-between gap-6 mt-[2rem]">
          {sidebarItems.slice(0, 4).map((item, index) => (
            <Link href={item.link} key={index}>
              <SidebarElement
                icon={item.icon}
                title={item.title}
                minimize={minimize}
                currentPath={currentPath}
                link={item.link}
              />
            </Link>
          ))}
        </section>

        <section className="">
          <div className="flex flex-col gap-6 mt-[2rem]">
            <div>
              <Dialog>
                <DialogTrigger>
                  <SidebarElement
                    icon="mingcute:bank-card-fill"
                    title="Quick Topup"
                    minimize={minimize}
                    currentPath={currentPath}
                    link={"unknown"}
                  />
                </DialogTrigger>
                <DialogContent className="bg-[#303940] boder border-[#303940]">
                  <DialogHeader>
                    <DialogTitle className="text-white mb-3">
                      How much do you want to top up ($)?
                    </DialogTitle>

                    <DialogDescription>
                      <Input
                        id="username"
                        value={amount}
                        className="col-span-3 bg-[#000000] h-[50px] font-bold text-2xl"
                        onChange={handleAmountChange}
                      />
                      <div className="mt-8">
                        <Checkout
                          plan="TOP_UP"
                          amount={amount}
                          credits={amount}
                          //@ts-ignore
                          userId={user?._id}
                        />
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div onClick={signOut}>
              <SidebarElement
                icon="heroicons-outline:logout"
                title="Log out"
                minimize={minimize}
                currentPath={currentPath}
                link={"unknown"}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardSidebar;
