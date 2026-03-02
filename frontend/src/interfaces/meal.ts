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