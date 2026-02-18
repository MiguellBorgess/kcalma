import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/auth/Login";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PrivateRoute />}>
                {/* rotas protegidas por login */}
            </Route>

            {/* rotas desprotegidas */}
            <Route path="/login" element={<Login />}/>
        </>
    )
)