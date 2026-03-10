import { Context } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useContext } from "react";

export function AppHeader() {
    const context = useContext(Context)

    function handleLogout() {
        context?.handleLogout()
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#4CAF50]">KCALMA</h1>
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Sair"
                >
                    <LogOut size={20} className="text-gray-600" />
                </button>
            </div>
        </header>
    )
}