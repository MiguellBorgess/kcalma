import { Apple, Calendar, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-3 gap-1">
                    <NavLink
                        to="/app"
                        end
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center py-3 px-2 transition-colors ${isActive
                                ? 'text-[#4CAF50]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Apple size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-xs mt-1">Calorias</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/app/calendar"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center py-3 px-2 transition-colors ${isActive
                                ? 'text-[#4CAF50]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Calendar size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-xs mt-1">Calendário</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/app/profile"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center py-3 px-2 transition-colors ${isActive
                                ? 'text-[#4CAF50]'
                                : 'text-gray-500 hover:text-gray-700'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <User size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-xs mt-1">Perfil</span>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}