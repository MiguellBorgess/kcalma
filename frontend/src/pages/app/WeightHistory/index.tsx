import { WeightRecordCard } from "@/components/app/WeightRecordCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddWeight, useDeleteWeight, useWeightRecordsData } from "@/hooks/useWeightRecord";
import { Minus, Plus, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
                            <WeightRecordCard
                                id={entry.id}
                                bmi={bmi}
                                createdAt={entry.createdAt}
                                pesoKg={entry.pesoKg}
                                isExpanded={isExpanded}
                                trend={trend}
                                handleDeleteWeight={handleDeleteWeight}
                                toggleExpand={toggleExpand}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}