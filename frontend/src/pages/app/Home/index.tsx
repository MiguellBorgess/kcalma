import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFoodData } from "@/hooks/useFood";
import { useAddMeal } from "@/hooks/useMeal";
import type { FoodData } from "@/interfaces/food";
import { MEAL_TYPES, UNITS, type MealItem } from "@/interfaces/meal";
import { Plus, Save, Search, Trash2, Utensils } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function Home() {
    const [selectedFood, setSelectedFood] = useState<FoodData | null>(null)
    const [items, setItems] = useState<MealItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showDropdown, setShowDropdown] = useState(true)

    const { mutate } = useAddMeal()

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const foods = useFoodData().data
    const filteredFoods = foods?.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const [formData, setFormData] = useState({
        mealType: 'BREAKFAST',
        name: '',
        description: '',
        quantity: 0,
        unit: 'GRAM'
    })

    const handleSelectFood = (food: FoodData) => {
        setSelectedFood(food)
        setSearchQuery(food.name)
        setFormData(prev => ({ ...prev, ['unit']: food.measureUnit }))
        setShowDropdown(false)
    }

    function handleChange(field: string, value: string) {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleAddItem = () => {
        if (!selectedFood) {
            toast.error('Selecione um alimento')
            return
        }

        const qty = Number(formData.quantity)
        if (!qty || qty <= 0) {
            toast.error('Quantidade inválida')
            return
        }

        const calories = calculateCalories(selectedFood, qty, formData.unit)

        const newItem: MealItem = {
            foodId: selectedFood.id,
            name: selectedFood.name,
            amount: qty,
            unit: formData.unit,
            calories,
        }

        setItems([...items, newItem])

        setFormData({
            ...formData, quantity: 0
        })

        setSelectedFood(null)

        toast.success('Alimento adicionado!')
    }

    function calculateCalories(food: FoodData, quantity: number, unit: string): number {
        let grams = quantity

        if (unit === 'GRAM') {
            grams = quantity
        } else if (unit === 'KILOGRAM') {
            grams = quantity * 1000
        } else if (unit === 'MILLILITER') {
            grams = quantity
        }
        return Number(((food.calories / 100) * grams).toFixed(0))
    }

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index))
        toast.success('Alimento removido')
    }

    const totalCalories = items.reduce((acc, item) => acc + item.calories, 0)

    const handleSaveMeal = () => {
        if (items.length === 0) {
            toast.error('Adicione pelo menos um alimento')
            return
        }

        mutate({
            name: formData.name,
            description: formData.description,
            mealType: formData.mealType,
            mealFoods: items
        }, {
            onSuccess: () => {
                toast.success('Refeição registrada com sucesso!')
                setFormData({
                    mealType: '',
                    name: '',
                    description: '',
                    quantity: 0,
                    unit: 'GRAM'
                })
                setItems([])
                setSelectedFood(null)
            },
            onError: () => {
                toast.error("Algo deu errado!")
                setItems([])
            }
        })


        toast.success('Refeição salva com sucesso!')
    }

    const getUnitTypeLabel = (type: string): string => {
        const unit = UNITS.find(mt => mt.value === type)
        return unit?.label || type
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="max-w-2xl mx-auto p-4 space-y-4">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Utensils className="text-[#4CAF50]" size={32} />
                        <h1 className="text-2xl font-bold text-gray-800">Registrar Refeição</h1>
                    </div>
                    <p className="text-gray-600">Adicione os alimentos consumidos</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Informações da Refeição</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="mealType">Tipo de Refeição</Label>
                                <select
                                    id="mealType"
                                    value={formData.mealType}
                                    onChange={(e) => handleChange("mealType", e.target.value)}
                                    className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none"
                                >
                                    {MEAL_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="mealName">Nome</Label>
                                <Input
                                    id="mealName"
                                    type="text"
                                    min="0.1"
                                    step="0.1"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    min="0.1"
                                    step="0.1"
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Adicionar Alimento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="food">Alimento</Label>
                            <div className="relative mt-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    id="food"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setShowDropdown(true)
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    placeholder="Buscar alimento..."
                                    className="pl-10"
                                />
                                {showDropdown && searchQuery && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto" ref={dropdownRef}>
                                        {filteredFoods && filteredFoods.length > 0 ? (
                                            filteredFoods.map(food => (
                                                <div
                                                    key={food.id}
                                                    onClick={() => handleSelectFood(food)}
                                                    className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="font-medium">{food.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {food.calories} kcal / 100g
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-500 text-sm">
                                                Nenhum alimento encontrado
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="quantity">Quantidade</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    value={formData.quantity}
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="unit">Unidade</Label>
                                <select
                                    id="unit"
                                    value={formData.unit}
                                    onChange={(e) => handleChange("unit", e.target.value)}
                                    className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none"
                                >
                                    {UNITS.map(u => (
                                        <option key={u.value} value={u.value}>
                                            {u.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button
                            onClick={handleAddItem}
                            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full"
                        >
                            <Plus size={20} className="mr-2" />
                            Adicionar Alimento
                        </Button>
                    </CardContent>
                </Card>

                {items.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Alimentos Adicionados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">{item.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {item.amount} {getUnitTypeLabel(item.unit)} • {item.calories} kcal
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveItem(index)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-800">Total</span>
                                    <span className="text-2xl font-bold text-[#4CAF50]">
                                        {totalCalories} kcal
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={handleSaveMeal}
                                className="w-full mt-4 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-full h-12"
                            >
                                <Save size={20} className="mr-2" />
                                Salvar Refeição
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}