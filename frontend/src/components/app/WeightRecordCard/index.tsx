import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronDown, ChevronUp, Scale, Trash2, type LucideIcon } from "lucide-react";

interface WeightTrendData {
    icon: LucideIcon
    text: string
    color: string
}

interface WeightRecordCardProps {
    id: number
    pesoKg: number
    isExpanded: boolean
    bmi: number | null
    createdAt: string
    trend: WeightTrendData | null
    toggleExpand: (id: number) => void
    handleDeleteWeight: (id: number) => void
}

const getBMICategory = (bmi: number): { label: string; color: string; textColor: string } => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'bg-blue-100', textColor: 'text-blue-600' }
    if (bmi < 25) return { label: 'Peso normal', color: 'bg-green-100', textColor: 'text-green-600' }
    if (bmi < 30) return { label: 'Sobrepeso', color: 'bg-yellow-100', textColor: 'text-yellow-600' }
    return { label: 'Obesidade', color: 'bg-red-100', textColor: 'text-red-600' }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function WeightRecordCard({ id, pesoKg, toggleExpand, trend, isExpanded, bmi, createdAt, handleDeleteWeight }: WeightRecordCardProps) {
    return (
        <Card key={id} className="overflow-hidden transition-all py-0">
            <CardContent className="p-0">
                <button
                    onClick={() => toggleExpand(id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Scale size={24} className="text-[#4CAF50]" />
                        </div>
                        <div className="text-left">
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-gray-800">{pesoKg} kg</p>
                                {trend && (
                                    <span className={`flex items-center text-sm ${trend.color}`}>
                                        <trend.icon size={16} className="mr-1" />
                                        {trend.text}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
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
                            onClick={() => handleDeleteWeight(id)}
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
}