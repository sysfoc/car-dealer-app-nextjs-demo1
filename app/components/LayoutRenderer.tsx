"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components//Header";
import Footer from "@/app/components/Footerr";
import ScrolltoTop from "@/app/components//ScrolltoTop";
import Sidebar from "@/app/admin/AdminSidebar";

export default function LayoutRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    return (
      <>
        <main>
          <section>
            <div className="flex flex-wrap gap-y-5 md:flex-nowrap">
              <div className="min-h-screen">
                <Sidebar />
              </div>
              <div className="w-full px-4 dark:bg-gray-700 sm:px-12">
                {children}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <ScrolltoTop />
      <Footer />
    </>
  );
}
