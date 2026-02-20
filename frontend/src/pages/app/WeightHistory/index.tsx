import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddWeight, useDeleteWeight, useWeightRecordsData } from "@/hooks/useWeightRecord";
import { AlertCircle, ChevronDown, ChevronUp, Minus, Plus, Scale, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const getBMICategory = (bmi: number): { label: string; color: string; textColor: string } => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'bg-blue-100', textColor: 'text-blue-600' }
    if (bmi < 25) return { label: 'Peso normal', color: 'bg-green-100', textColor: 'text-green-600' }
    if (bmi < 30) return { label: 'Sobrepeso', color: 'bg-yellow-100', textColor: 'text-yellow-600' }
    return { label: 'Obesidade', color: 'bg-red-100', textColor: 'text-red-600' }
}

export default function WeightHistory() {
    const weightEntries = useWeightRecordsData().data || []
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [weight, setWeight] = useState('')
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [, forceUpdate] = useState({})

    const addWeightMutation = useAddWeight()
    const deleteWeightMutation = useDeleteWeight()

    const calculateBMI = (weight: number): number | null => {
        return Number((weight / (1.82 * 1.82)).toFixed(1))
    }

    async function handleAddWeight() {
        const weightNum = Number(weight)

        if (!weight) {
            toast.error('Preencha o peso')
            return
        }

        if (weightNum <= 0) {
            toast.error('Peso deve ser maior que zero')
            return
        }

        addWeightMutation.mutate({ pesoKg: weightNum }, {
            onSuccess: () => {
                toast.success('Peso registrado com sucesso!')
                setWeight('')
                setIsDialogOpen(false)
                forceUpdate({})
            },
            onError: () => {
                toast.error("Algo deu errado!")
                setWeight('')
                setIsDialogOpen(false)
                forceUpdate({})
            }
        })
    }

    function handleDeleteWeight(id: number) {
        if (window.confirm('Tem certeza que deseja excluir este registro de peso?')) {
            deleteWeightMutation.mutate({ id }, {
                onSuccess: () => {
                    toast.success('Registro de peso excluído com sucesso!')
                    if (expandedId === id) {
                        setExpandedId(null)
                    }
                    forceUpdate({})
                }
            })

        }

    }

    function toggleExpand(id: number) {
        setExpandedId(expandedId === id ? null : id)
    }

    function getWeightTrend(currentWeight: number, index: number) {
        if (index >= weightEntries.length - 1) return null
        const previousWeight = weightEntries[index + 1].pesoKg
        const diff = currentWeight - previousWeight

        if (diff > 0) return { icon: TrendingUp, text: `+${diff.toFixed(1)}kg`, color: 'text-red-600' }
        if (diff < 0) return { icon: TrendingDown, text: `${diff.toFixed(1)}kg`, color: 'text-green-600' }
        return { icon: Minus, text: '0kg', color: 'text-gray-600' }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex gap-10 items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Histórico de Peso</h2>
                    <p className="text-gray-600 mt-1">Acompanhe sua evolução ao longo do tempo</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                            <Plus size={20} className="mr-2" />
                            Adicionar Peso
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Peso</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div>
                                <Label htmlFor="weight">Peso (kg)</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    step="0.1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Ex: 70.5"
                                    className="mt-1"
                                />
                            </div>
                            <Button
                                onClick={handleAddWeight}
                                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                            >
                                Salvar Peso
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {weightEntries.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Scale size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum peso registrado</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-4">
                            Comece a registrar seu peso para acompanhar sua evolução e calcular seu IMC.
                        </p>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                        >
                            <Plus size={20} className="mr-2" />
                            Registrar Primeiro Peso
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 mb-3">Registros ({weightEntries.length})</h3>
                    {weightEntries.sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).map((entry, index) => {
                        const bmi = calculateBMI(entry.pesoKg)
                        const trend = getWeightTrend(entry.pesoKg, index)
                        const isExpanded = expandedId === entry.id

                        return (
                            <Card key={entry.id} className="overflow-hidden transition-all py-0">
                                <CardContent className="p-0">
                                    <button
                                        onClick={() => toggleExpand(entry.id)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <Scale size={24} className="text-[#4CAF50]" />
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-2xl font-bold text-gray-800">{entry.pesoKg} kg</p>
                                                    {trend && (
                                                        <span className={`flex items-center text-sm ${trend.color}`}>
                                                            <trend.icon size={16} className="mr-1" />
                                                            {trend.text}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500">{formatDate(entry.createdAt)}</p>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="text-gray-400" size={20} />
                                        ) : (
                                            <ChevronDown className="text-gray-400" size={20} />
                                        )}
                                    </button>

                                    {isExpanded && (
                                        <div className="px-4 pb-4 border-t border-gray-100">
                                            {bmi !== null ? (
                                                <div className="bg-linear-to-br from-green-50 to-white p-4 rounded-lg mt-4">
                                                    <div className="text-center">
                                                        <p className="text-sm text-gray-600 mb-2">IMC calculado com base neste peso</p>
                                                        <div className="text-4xl font-bold text-[#4CAF50] mb-2">{bmi}</div>
                                                        <div className={`inline-flex items-center px-3 py-1 rounded-full ${getBMICategory(bmi).color}`}>
                                                            <span className={`font-semibold ${getBMICategory(bmi).textColor}`}>
                                                                {getBMICategory(bmi).label}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-3">
                                                            Baseado na altura de {182} cm
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                                    <div className="flex items-start gap-3">
                                                        <AlertCircle className="text-yellow-600 mt-0.5 shrink-0" size={20} />
                                                        <div>
                                                            <p className="text-yellow-800 font-medium">IMC não disponível</p>
                                                            <p className="text-yellow-700 text-sm mt-1">
                                                                Cadastre sua altura na aba <strong>Perfil</strong> para calcular o IMC.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <Button
                                                onClick={() => handleDeleteWeight(entry.id)}
                                                className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
                                            >
                                                <Trash2 size={20} className="mr-2" />
                                                Excluir Registro
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}