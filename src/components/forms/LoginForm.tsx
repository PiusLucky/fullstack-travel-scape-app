"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import MainButton from "../common/MainButton";
import { apiClient, cookieStorageManager } from "@/network";
import apiResources from "@/network/resources";
import { useToast } from "@/components/ui/use-toast";
import { storageKeys } from "@/network/storageKeys";
import { useRouter } from "next/navigation";

function LoginForm({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (email && password) {
        setLoading(true);
        const loginRes = await apiClient.post(
          apiResources.login,
          "/",
          {
            email,
            password,
          },
          toast
        );

        // NOTE: On login success
        // Save the user token to cookie
        // Redirect to Dashboard

        const userToken = loginRes?.response?.data?.token;
        if (userToken) {
          cookieStorageManager.addOrUpdateItem(
            storageKeys.token,
            loginRes?.response?.data?.token
          );

          setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
          }, 1000);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="flex justify-center my-4 font-semibold">
          Log in
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className=" gap-4">
          <Label htmlFor="name" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            className="col-span-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
        </div>
        <div className=" gap-4">
          <Label htmlFor="username" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            className="col-span-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
        </div>
      </div>

      <p
        className="text-primary text-right cursor-pointer"
        onClick={() => setIsLogin(false)}
      >
        Sign up?
      </p>

      <DialogFooter className="my-8">
        <MainButton
          text="Log in"
          isSubmitable
          width="w-full"
          isLoading={loading}
          action={handleLogin}
        />
      </DialogFooter>
    </div>
  );
}

export default LoginForm;
