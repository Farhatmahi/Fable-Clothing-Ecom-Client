import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center py-20">
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#000000"
        barColor="#818181"
      />
    </div>
  );
};

export default Loader;
