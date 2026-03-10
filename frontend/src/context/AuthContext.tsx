import {  createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { api } from "../services/api";
import type { LoginData, SignupData } from "@/interfaces/auth";
import type { UserDetailsData } from "@/interfaces/userDetails";
import { useUserDetailsData } from "@/hooks/useUserDetails";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContext {
    authenticated: boolean
    loading: boolean
    user: UserDetailsData | undefined
    handleLogin: ({email, password}: LoginData) => Promise<void>
    handleSignup: ({name, email, password}: SignupData) => Promise<void>
    handleLogout: () => void
}

const Context = createContext<AuthContext | undefined>(undefined)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserDetailsData | undefined>(undefined)
    const BASE_URL = import.meta.env.VITE_API_URL
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const { data } = useUserDetailsData()

    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [data])

    useEffect(() => {
        const token = localStorage.getItem("@Auth:token")

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false)
    }, [])

    async function handleLogin({email, password}: LoginData) {
        const { data } = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        })

        localStorage.setItem("@Auth:token", JSON.stringify(data.token))
        localStorage.setItem("@Auth:refreshToken", JSON.stringify(data.refresh_token))
        
        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${data.token}`

        setAuthenticated(true)
    }

    async function handleSignup({name, email, password, altura}: SignupData) {
        await axios.post(`${BASE_URL}/auth/signup`, {
            name,
            email,
            password,
            role: "USER",
            altura: parseInt(altura)
        })
    }

    function handleLogout() {
        setAuthenticated(false)

        localStorage.removeItem("@Auth:token")
        localStorage.removeItem("@Auth:refreshToken")
        
        api.defaults.headers.common[
            "Authorization"
        ] = undefined
    }

    return (
        <Context.Provider value={{authenticated, loading, user, handleLogin, handleSignup, handleLogout}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }