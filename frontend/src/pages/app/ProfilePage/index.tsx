import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Context } from "@/context/AuthContext";
import { useUpdateWeight } from "@/hooks/useUserDetails";
import { AlertCircle, Edit2, Mail, Ruler, Save, User, X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export function ProfilePage() {
    const user = useContext(Context)?.user
    const updateHeightMutation = useUpdateWeight()

    const [isEditingHeight, setIsEditingHeight] = useState(false);
    const [heightValue, setHeightValue] = useState(user?.altura?.toString() || '')

    const handleSaveHeight = () => {
        const height = Number(heightValue)

        if (!heightValue) {
            toast.error('Preencha a altura')
            return
        }

        if (height <= 0) {
            toast.error('Altura deve ser maior que zero')
            return
        }

        updateHeightMutation.mutate({ altura: height }, {
            onSuccess: () => {
                setIsEditingHeight(false)
                toast.success('Altura atualizada com sucesso!')
            }
        })
    }

    const handleCancelHeight = () => {
        setHeightValue(user?.altura?.toString() || '')
        setIsEditingHeight(false)
    }

    const handleStartEditingHeight = () => {
        setHeightValue(user?.altura?.toString() || '')
        setIsEditingHeight(true)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-[#4CAF50] to-[#45a049] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Nome</p>
                            <p className="font-medium text-gray-800">{user?.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Altura</span>
                        {!isEditingHeight && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleStartEditingHeight}
                                className="text-[#4CAF50] hover:text-[#45a049]"
                            >
                                <Edit2 size={18} className="mr-2" />
                                {user?.altura ? 'Editar' : 'Adicionar'}
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!user?.altura && !isEditingHeight && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-yellow-800 font-medium">Altura não cadastrada</p>
                                <p className="text-yellow-700 text-sm mt-1">
                                    Cadastre sua altura para calcular o IMC automaticamente nos seus registros de peso.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Ruler size={20} className="text-gray-500" />
                        <div className="flex-1">
                            <Label className="text-sm text-gray-500">Altura (cm)</Label>
                            {isEditingHeight ? (
                                <Input
                                    type="number"
                                    value={heightValue}
                                    onChange={(e) => setHeightValue(e.target.value)}
                                    className="mt-1"
                                    placeholder="Ex: 170"
                                />
                            ) : (
                                <p className="font-medium text-gray-800">
                                    {user?.altura ? `${user.altura} cm` : <span className="text-gray-400 italic">Não informado</span>}
                                </p>
                            )}
                        </div>
                    </div>

                    {isEditingHeight && (
                        <div className="flex gap-3 pt-2">
                            <Button
                                onClick={handleSaveHeight}
                                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white"
                            >
                                <Save size={18} className="mr-2" />
                                Salvar Altura
                            </Button>
                            <Button
                                onClick={handleCancelHeight}
                                variant="outline"
                                className="flex-1"
                            >
                                <X size={18} className="mr-2" />
                                Cancelar
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}