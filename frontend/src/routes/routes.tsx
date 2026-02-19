import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { AppLayout } from "@/pages/app/AppLayout";
import { Home } from "@/pages/app/Home";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PrivateRoute />}>
                {/* rotas protegidas por login */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />}/>
                </Route>
            </Route>

            {/* rotas desprotegidas */}
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
        </>
    )
)