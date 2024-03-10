import React from "react";
interface IProps {
  title: string;
  description: string;
}
function Header({ title, description }: IProps) {
  return (
    <div>
      <p className="text-primary font-semibold text-[28px] mb-3 ">{title}</p>
      <p className="text-black text-3xl md:text-[58px] font-bold md:leading-[4.5rem]">
        {description}
      </p>
    </div>
  );
}

export default Header;
