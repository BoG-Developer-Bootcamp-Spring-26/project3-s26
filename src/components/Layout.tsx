//wrap dashboard pages with this layout to include the sidebar
import React from "react";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}


// to wrap a page with this layout: 
/* 

import Layout from "@/components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      {page content here}
    </Layout>
  );
}

*/