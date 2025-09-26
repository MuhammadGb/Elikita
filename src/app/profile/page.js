"use client";

import Profiles from "../../components/Profile/index";
import React from "react";
import MainLayout from "../mainlayout";

const ProfilePage = () => {
  return (
    <div className="w-full ">
      <MainLayout
        navItems={[]}
        headerImage={"/assets/img/bg-image.png"}
        sidebarImage={"/assets/img/frontDesk.png"}
      >
        <Profiles />
      </MainLayout>
    </div>
  );
};

export default ProfilePage;
