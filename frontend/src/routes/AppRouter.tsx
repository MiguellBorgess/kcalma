import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export function AppRouter() {
    return <RouterProvider router={routes} />
}