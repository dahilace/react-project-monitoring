import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header/AppHeader";
import { Footer } from "@/widgets/footer/AppFooter";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}