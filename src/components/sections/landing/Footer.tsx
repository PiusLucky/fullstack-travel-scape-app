import React from "react";

function Footer() {
  return (
    <div className="text-white bg-primary py-16 px-4">
      <div className=" flex flex-col md:flex-row justify-between gap-16">
        <div>
          <p className="text-[34px] font-bold">TravelScapeToor</p>
          <p className="mt-4 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex gap-4">
            <div>
              <img src="/images/facebook_app_symbol.png" alt="social icon" />
            </div>
            <div>
              <img src="/images/linkedin.png" alt="social icon" />
            </div>
            <div>
              <img src="/images/twitter.png" alt="social icon" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-32 w-full">
          <div>
            <p className="font-semibold text-[28px]">Services</p>
            <div className="flex flex-col gap-4 mt-4">
              <p>About Us</p>
              <p>Dentations</p>
              <p>Services</p>
              <p>Our Blog</p>
              <p>Contact Us</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-[28px]">Contact</p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-2 items-center">
                <div>
                  <img src="/images/maps_and_flags.png" alt="location icon" />
                </div>
                <p>Anyware, any rode, nr xyz, india</p>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  <img src="/images/call_icon.png" alt="location icon" />
                </div>
                <p>+91 9876543210</p>
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <img src="/images/envelop.png" alt="location icon" />
                </div>
                <p>support@travelscape.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="flex justify-center pt-32">
        travelscape©2024 all right reserve
      </p>
    </div>
  );
}

export default Footer;
