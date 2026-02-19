import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Context } from "@/context/AuthContext";
import type { SignupData } from "@/interfaces/auth";
import { Lock, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Signup() {
    const context = useContext(Context)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const [formData, setFormData] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validate() {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.email = 'O nome é obrigatório'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirme sua senha';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleChange(field: string, value: string) {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            })
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault()

        if (!validate()) return

        setIsLoading(true)

        try {
            await context?.handleSignup(formData)
            toast.success("Conta criada com sucesso!")
            navigate("/login")
        } catch (error) {
            toast.error("Erro ao criar conta!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#4CAF50] mb-2">KCALMA</h1>
                    <p className="text-gray-600">Crie sua conta</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="seu@email.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                    className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    placeholder="Digite a senha novamente"
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full h-12 mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Criando conta...' : 'Criar Conta'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Já tem uma conta?{' '}
                            <Link to="/login" className="text-[#4CAF50] font-semibold hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}