import { useContext, useState } from "react"
import { Context } from "../../../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Lock, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Login() {
    const context = useContext(Context)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(field:string, value:string) {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    function handleSubmit() {

    }

    if (!context?.authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[#4CAF50] mb-2">KCALMA</h1>
                        <p className="text-gray-600">Entre na sua conta</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="pl-10"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password">Senha</Label>
                                <div className="relative mt-1">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        className="pl-10"
                                        placeholder="Digite sua senha"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full h-12 mt-6"
                            >
                                Entrar
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 flex justify-center gap-1.5">
                                Não tem uma conta?
                                <Link to="/signup" className="text-[#4CAF50] font-semibold hover:underline">
                                    Criar conta
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Navigate to="/" />
    }
}