"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import MainButton from "@/components/common/MainButton";

function NewsLetter() {
  const [email, setEmail] = useState("");
  return (
    <div className="relative w-full">
      <p className="text-2xl md:text-[58px] font-semibold  text-center mb-6">
        Subscribe To Get The Latest News About Us
      </p>
      <p className="text-secondary text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="flex justify-center mt-12">
        <div className="relative w-full md:max-w-[600px]">
          <Input
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            type="email"
            className="bg-[#ffb6498a] h-[70px] text-white font-semibold text-2xl"
            placeholder="Enter Your Email"
          />
          <div className="block mt-3 md:mt-0 md:absolute md:top-3 right-3">
            <MainButton text="Subscribe" classes="w-[150px]" />
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute left-0 top-0">
        <img src="/images/plane_left.png" alt="plane left" />
      </div>

      <div className="hidden md:block absolute right-0 top-0">
        <img src="/images/plane_right.png" alt="plane right" />
      </div>
    </div>
  );
}

export default NewsLetter;
