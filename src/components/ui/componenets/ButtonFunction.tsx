/* eslint-disable no-empty-pattern */
"use client";

import React from "react";
import { useFormStatus } from "react-dom";
interface BtnParams {
  btn: {
    name: string;
    icon: any;
    fn: () => void;
  };
}

const ButtonFunction = ({ btn }: BtnParams) => {
  const { pending } = useFormStatus();

  return (
    <button type="button" onClick={() => btn.fn()} className="btn-icon ">
      {" "}
      {btn.icon &&
        React.createElement(btn.icon, {
          className: "h-5 w-5 text-primary",
          "aria-hidden": "true",
        })}
      <span>{btn.name}</span>
      {pending && <span className="animate-pulse">...</span>}
    </button>
  );
};

export default ButtonFunction;
