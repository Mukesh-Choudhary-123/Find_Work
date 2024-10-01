import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="ml-8 mr-8">
        <div className="grid-background"></div>
        <main className="min-h-screen container ">
          <Header />
          <Outlet />
        </main>
      </div>
      <div className="p-4 text-center bg-gray-800 mt-10">
        Made with ❤ by Find Work |💻
      </div>
    </>
  );
};

export default AppLayout;
