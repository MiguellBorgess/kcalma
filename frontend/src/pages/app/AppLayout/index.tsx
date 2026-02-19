import { AppHeader } from "@/components/app/AppHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AppHeader />

            <Outlet />

            <BottomNav />
        </div>
    )
}