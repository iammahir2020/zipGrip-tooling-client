import React from "react";

const Updating = () => {
  return (
    <div className="h-screen flex flex-col gap-5 items-center justify-center">
      <div className="border-t-transparent w-20 h-20 border-4 border-blue-900 border-solid rounded-full animate-spin"></div>
      <div className="text-center">
        <p className="text-xl">Updating Image</p>
        <p className="text-gray-500">Sorry for the inconvenience</p>
      </div>
    </div>
  );
};

export default Updating;
