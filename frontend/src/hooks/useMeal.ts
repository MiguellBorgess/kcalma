import type { RegisterMealData } from "@/interfaces/meal"
import { api } from "@/services/api"
import { useMutation } from "@tanstack/react-query"

const addMeal = async ({ name, description, mealType, mealFoods }: RegisterMealData) => {
    return await api.post("/meal/add", {
        name,
        description,
        meal_type: mealType,
        meal_foods: mealFoods.map(food => ({ 
            food_id: food.foodId,  
            amount: food.amount
        }))
    })
}

export function useAddMeal() {
    const mutate = useMutation({
        mutationFn: addMeal
    })

    return mutate
}