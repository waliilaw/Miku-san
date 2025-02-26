"use client"

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <img src="/loading.gif" alt="Loading..." className="w-72 h-72" />
    </div>
  );
};

export default Loading; 