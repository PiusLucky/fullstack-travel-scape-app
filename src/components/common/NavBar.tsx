"use client";

import { useState } from "react";
import { X } from "lucide-react";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between mx-[41px] items-center">
          <div>
            <img
              src="/images/landing_logo.png"
              alt="logo"
              className="object-cover w-[10rem]"
            />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            <p
              className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
            >
              Home
            </p>
            <p
              className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
            >
              Packages
            </p>
            <p
              className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
            >
              Contact
            </p>
          </div>
          <div className="flex items-center gap-[40px] select-none w-[24px] h-[24px]">
            <img src="/images/hamburger.png" alt="hamburger" className="" />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img
              src="/images/landing_logo.png"
              alt="logo"
              className="w-[7rem] object-cover"
            />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/images/hamburger.png"
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in w-[24px] h-[16px] object-cover"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              <p
                className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
              >
                Home
              </p>
              <p
                className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
              >
                Packages
              </p>
              <p
                className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
              >
                Contact
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
