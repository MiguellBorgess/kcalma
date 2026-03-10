export interface MealData {
    id: number
    name: string
    description: string
    mealType: string
    totalCalories: number
    foods: MealItemData[]
}

export interface MealItemData {
    foodId: number
    name: string
    calories: number
    measureUnit: string
    amount: number
}

export interface RegisterMealData {
    name: string
    description: string
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "OTHER" | string
    mealFoods: RegisterMealItemData[]
}

export interface RegisterMealItemData {
    foodId: number
    amount: number
}

export interface MealItem {
    foodId: number
    name: string
    calories: number
    unit: string
    amount: number
}

export interface AverageCaloriesData {
    averageCalories: number
}

export interface DeleteMealData {
    id: number
}

export interface EditMealData {
    mealId: number
    name: string
    description: string
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "OTHER" | string
    mealFoods: RegisterMealItemData[]
}

export const UNITS = [
    { value: 'GRAM', label: 'Gramas (g)' },
    { value: 'KILOGRAM', label: 'Quilogramas (kg)' },
    { value: 'MILLILITER', label: 'Mililitros (ml)' },
]

export const MEAL_TYPES = [
    { value: 'BREAKFAST', label: 'Café da manhã' },
    { value: 'LUNCH', label: 'Almoço' },
    { value: 'DINNER', label: 'Jantar' },
    { value: 'SNACK', label: 'Lanche' },
    { value: 'OTHER', label: 'Outro' },
]