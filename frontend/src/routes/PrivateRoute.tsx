import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
    const context = useContext(Context)

    if (context?.loading) {
        return <p>carregando...</p>;
    }

    return context?.authenticated ? <Outlet /> : <Navigate to="/login" />
}