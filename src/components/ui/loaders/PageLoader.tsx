import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import TableLoaderSkeleton from "./TableLoaderSkeleton";

const PageLoader = () => (
  <div className="w-full animate-pulse">
    <div className="flex justify-between">
      <div className="flex flex-col my-2 space-y-1">
        <span className="bg-gray-300 w-48 rounded-lg h-7"></span>
        <div className="flex space-x-3 py-3">
          <div className="flex bg-gray-300  rounded-xl w-14 h-7 items-center"></div>
          <ChevronRightIcon
            className=" w-5 bg-gray-300     rounded-xl  text-gray-100  "
            aria-hidden="true"
          />
          <span className="ml-4 bg-gray-300 h-7  rounded-xl  w-14"></span>
          <ChevronRightIcon
            className=" w-5 bg-gray-300  rounded-xl text-gray-100   "
            aria-hidden="true"
          />
          <span className="ml-4 bg-gray-300   rounded-xl h-7  w-14"></span>
        </div>
      </div>
      <div className="flex space-x-3 ">
        <button className="btn-main w-32 h-10"></button>
      </div>
    </div>
    <hr className="mb-1" />
    <div className="flex space-x-3 py-3">
      <div className="w-32 h-7 rounded-xl bg-gray-300"></div>
      <div className="w-32 h-7  rounded-xl bg-gray-300"></div>
      <div className="w-32 h-7  rounded-xl bg-gray-300"></div>
    </div>
    <hr className="mb-1" />
    <TableLoaderSkeleton count={10} />
  </div>
);

export default PageLoader;
