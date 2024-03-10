"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import MainButton from "../common/MainButton";
import { apiClient } from "@/network";
import apiResources from "@/network/resources";
import { useToast } from "@/components/ui/use-toast";

function SignupForm({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (email && password && name) {
        setLoading(true);
        const res = await apiClient.post(
          apiResources.register,
          "/",
          {
            name,
            email,
            password,
          },
          toast
        );

        if (res?.response?.meta?.message) {
          toast({
            title: "User creation",
            description: res?.response?.meta?.message,
            className: "success-toast",
          });

          setLoading(false);
          setIsLogin(true);
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
          Register
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className=" gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            className="col-span-3"
            type="name"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
          />
        </div>

        <div className=" gap-4">
          <Label htmlFor="email" className="text-right">
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
          <Label htmlFor="password" className="text-right">
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
        className="text-primary text-right  cursor-pointer"
        onClick={() => setIsLogin(true)}
      >
        Sign in?
      </p>

      <DialogFooter className="my-8">
        <MainButton
          text="Register"
          isSubmitable
          width="w-full"
          isLoading={loading}
          action={handleRegister}
        />
      </DialogFooter>
    </div>
  );
}

export default SignupForm;
