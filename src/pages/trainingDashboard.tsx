import React from "react";
import {useState} from 'react';
import SideBar from "../components/SideBar";


export default function TrainingDashboard() {



    return (
    <div className="flex h-screen w-screen items-end bg-gray-50">
      
      <SideBar />

      {/* Main Content Area */}
      <main className="flex-1 h-full bg-white">
        {/* Your page content here */}
      </main>
      
    </div>
    )
}