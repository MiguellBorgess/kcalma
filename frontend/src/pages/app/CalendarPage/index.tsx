import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFoodData } from "@/hooks/useFood";
import { useMonthCaloriesData } from "@/hooks/useGraph";
import { useAverageCaloriesData, useDeleteMeal, useMealByDateData, useUpdateMeal } from "@/hooks/useMeal";
import type { FoodData } from "@/interfaces/food";
import { MEAL_TYPES, UNITS, type MealData, type MealItem } from "@/interfaces/meal";
import { CalendarIcon, ChevronLeft, ChevronRight, Edit2, Plus, Save, Search, Trash2, TrendingUp, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

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

export function CalendarPage() {
  const mutateDeleteMeal = useDeleteMeal().mutate
  const mutateUpdateMeal = useUpdateMeal().mutate

  const foods = useFoodData().data

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [editingMeal, setEditingMeal] = useState<MealData | null>(null)
  const [editItems, setEditItems] = useState<MealItem[]>([])
  const [editMealType, setEditMealType] = useState('')

  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null)
  const [quantity, setQuantity] = useState('1')
  const [unit, setUnit] = useState('gramas')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const averageCalories = useAverageCaloriesData(year, month + 1).data?.averageCalories || 0
  const monthCalories = useMonthCaloriesData(year, month + 1).data


  const date = new Date().toISOString().split('T')[0]
  const todayCalories = useMealByDateData(date).data?.reduce((acc, meal) => acc + meal.totalCalories, 0) || 0

  const selectedMeals = useMealByDateData(selectedDate).data
  const selectedDateCalories = selectedMeals?.reduce((acc, meal) => acc + meal?.totalCalories, 0) || 0

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(dateStr)
    setEditingMeal(null)
  }

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isSelected = dateStr === selectedDate
    const isToday = dateStr === new Date().toISOString().split('T')[0]
    const calories = monthCalories?.find(d => d.date === dateStr)?.calories || 0
    console.log(monthCalories?.find(d => d.date === dateStr))
    const hasData = calories > 0

    days.push(
      <button
        key={day}
        onClick={() => { handleDateClick(day) }}
        className={`cursor-pointer aspect-square p-2 rounded-lg border transition-all ${isSelected
          ? 'bg-[#4CAF50] text-white border-[#4CAF50] font-semibold'
          : isToday
            ? 'border-[#4CAF50] text-[#4CAF50] font-semibold'
            : 'border-gray-200 hover:border-[#4CAF50] hover:bg-green-50'
          }`}
      >
        <div className="text-sm">{day}</div>
        {hasData && !isSelected && (
          <div className="mt-1 h-1 w-1 bg-[#4CAF50] rounded-full mx-auto" />
        )}
      </button>
    )
  }

  const getUnitTypeLabel = (type: string): string => {
    const unit = UNITS.find(mt => mt.value === type)
    return unit?.label || type
  }

  const handleEditMeal = (meal: MealData) => {
    setEditingMeal(meal)
    setEditItems(
      meal.foods.map(food => ({
        foodId: food.foodId,
        name: food.name,
        amount: food.amount,
        unit: food.measureUnit,
        calories: food.calories
      }))
    )
    setEditMealType(meal.mealType)

    setSelectedFood(null)
    setSearchQuery('')
    setQuantity('1')
    setUnit('gramas')
  }

  const handleDeleteMeal = (mealId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta refeição?')) {
      mutateDeleteMeal({ id: mealId })
      toast.success('Refeição excluída com sucesso!')
    }
  }

  const handleCancelEdit = () => {
    setEditingMeal(null)
    setEditItems([])
    setEditMealType('')

    setSelectedFood(null)
    setSearchQuery('')
    setQuantity('1')
    setUnit('gramas')
  }

  const handleSaveEdit = () => {
    if (!editingMeal) return

    if (editItems.length === 0) {
      toast.error('A refeição deve ter pelo menos um alimento')
      return
    }

    mutateUpdateMeal({
      mealId: editingMeal.id,
      name: editingMeal.name,
      description: editingMeal.description,
      mealType: editMealType,
      mealFoods: editItems
    })

    toast.success('Refeição atualizada!')
    handleCancelEdit()
  }

  const handleUpdateItemQuantity = (index: number, newQuantity: string) => {
    const qty = Number(newQuantity)
    if (qty <= 0) return

    const newItems = [...editItems]

    const calories = calculateCalories(
      foods?.find(f => f.id === newItems[index].foodId)!,
      qty,
      newItems[index].unit
    )

    newItems[index] = {
      ...newItems[index],
      amount: qty,
      calories
    }

    setEditItems(newItems)
  }

  const handleRemoveEditItem = (index: number) => {
    const newItems = editItems.filter((_, i) => i !== index)
    setEditItems(newItems)
  }

  const filteredFoods = foods?.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const handleSelectFood = (food: FoodData) => {
    setSelectedFood(food)
    setSearchQuery(food.name)
    setUnit(food.measureUnit)
    setShowDropdown(false)
  }

  const handleAddFoodToEdit = () => {
    if (!selectedFood) {
      toast.error('Selecione um alimento')
      return
    }

    const qty = Number(quantity)
    if (!qty || qty <= 0) {
      toast.error('Quantidade inválida')
      return
    }

    const calories = calculateCalories(selectedFood, qty, unit)

    const newItem: MealItem = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      amount: qty,
      unit: unit,
      calories,
    }

    setEditItems([...editItems, newItem])

    setSelectedFood(null)
    setSearchQuery('')
    setQuantity('1')
    setUnit('gramas')

    toast.success('Alimento adicionado!')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CalendarIcon className="text-[#4CAF50]" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Calendário Alimentar</h1>
          </div>
          <p className="text-gray-600">Acompanhe seu histórico</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-0">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-[#4CAF50]" />
                <span className="text-sm text-gray-600">Média Diária</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {averageCalories > 0 ? Math.round(averageCalories) : 0} <span className="text-sm font-normal">kcal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-1">
                <CalendarIcon size={18} className="text-[#4CAF50]" />
                <span className="text-sm text-gray-600">Hoje</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(todayCalories)} <span className="text-sm font-normal">kcal</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousMonth}
                className="hover:bg-green-50"
              >
                <ChevronLeft size={20} />
              </Button>
              <CardTitle className="text-lg">
                {monthNames[month]} {year}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextMonth}
                className="hover:bg-green-50"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#4CAF50]">
                  {Math.round(selectedDateCalories)} kcal
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedMeals?.length ? (
              <div className="space-y-3">
                {selectedMeals.map((meal: MealData) => (
                  <div
                    key={meal.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {editingMeal?.id === meal.id ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="editMealType" className="text-sm">Tipo de Refeição</Label>
                          <select
                            id="editMealType"
                            value={editMealType}
                            onChange={(e) => setEditMealType(e.target.value)}
                            className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none"
                          >
                            {MEAL_TYPES.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="p-3 bg-white rounded-lg border border-gray-300">
                          <div className="text-sm font-medium text-gray-700 mb-2">Adicionar Alimento</div>

                          <div className="relative mb-2" ref={dropdownRef}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowDropdown(true)
                              }}
                              onFocus={() => setShowDropdown(true)}
                              placeholder="Buscar alimento..."
                              className="pl-9 h-9 text-sm"
                            />
                            {showDropdown && searchQuery && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {filteredFoods.length > 0 ? (
                                  filteredFoods?.map(food => (
                                    <div
                                      key={food.id}
                                      onClick={() => handleSelectFood(food)}
                                      className="px-3 py-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    >
                                      <div className="font-medium text-sm">{food.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {food.calories} kcal / 100g
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="px-3 py-2 text-gray-500 text-xs">
                                    Nenhum alimento encontrado
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <Input
                              type="number"
                              min="0.1"
                              step="0.1"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="Qtd"
                              className="h-9 text-sm"
                            />
                            <select
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              className="h-9 px-2 rounded-lg border border-gray-300 focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none text-sm col-span-2"
                            >
                              {UNITS.map(u => (
                                <option key={u.value} value={u.value}>
                                  {u.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <Button
                            onClick={handleAddFoodToEdit}
                            size="sm"
                            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white h-9"
                          >
                            <Plus size={16} className="mr-1" />
                            Adicionar
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {editItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                              <div className="flex-1">
                                <div className="font-medium text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500">{getUnitTypeLabel(item.unit)}</div>
                              </div>
                              <Input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={item.amount}
                                onChange={(e) => handleUpdateItemQuantity(index, e.target.value)}
                                className="w-20 h-8 text-sm"
                              />
                              <span className="text-xs text-gray-600 w-16">
                                {(item.calories).toFixed(0)} kcal
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveEditItem(index)}
                                className="text-red-500 hover:text-red-600 h-8 w-8 p-0"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t">
                          <div className="text-sm font-semibold text-gray-700 mb-2">
                            Total: {editItems.reduce((acc, item) => acc + item.calories, 0).toFixed(0)} kcal
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSaveEdit}
                              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white h-9"
                            >
                              <Save size={16} className="mr-2" />
                              Salvar
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              className="flex-1 h-9"
                            >
                              <X size={16} className="mr-2" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-gray-800">
                              {meal.name}
                            </div>
                            <div className="text-sm text-[#4CAF50] font-medium">
                              {Math.round(meal.totalCalories)} kcal
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditMeal(meal)}
                              className="text-[#4CAF50] hover:text-[#45a049] hover:bg-green-50 h-8 w-8 p-0"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMeal(meal.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {meal.foods.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {item.name} ( {item.amount} {getUnitTypeLabel(item.measureUnit)} ) - {(item.calories).toFixed(0)} kcal
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>Nenhuma refeição registrada neste dia</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
