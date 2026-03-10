import type { AverageCaloriesData, DeleteMealData, EditMealData, MealData, RegisterMealData } from "@/interfaces/meal"
import { api } from "@/services/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import camelcaseKeys from "camelcase-keys"

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
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: addMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meal-date-data', 'average-calories-data', 'month-calories-data'] })
        }
    })

    return mutate
}

const editMeal = async ({ mealId, name, description, mealType, mealFoods }: EditMealData) => {
    return await api.put("/meal/update-complete", {
        meal_id: mealId,
        name,
        description,
        meal_type: mealType,
        meal_foods: mealFoods.map(food => ({
            food_id: food.foodId,
            amount: food.amount
        }))
    })
}

export function useUpdateMeal() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: editMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meal-date-data', 'average-calories-data'] })
        }
    })

    return mutate
}

const deleteMeal = async ({ id }: DeleteMealData) => {
    return await api.delete("/meal/delete", {
        data: {
            id
        }
    })
}

export function useDeleteMeal() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: deleteMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meal-date-data', 'average-calories-data', 'month-calories-data'] })
        }
    })

    return mutate
}

const fetchData = async (date: string) => {
    const response = await api.get<MealData[]>("/meal/get-date", {
        params: {
            date
        }
    })

    return camelcaseKeys(response.data, { deep: true }) as MealData[];
}

export function useMealByDateData(date: string) {
    const query = useQuery({
        queryFn: () => fetchData(date),
        queryKey: ['meal-date-data', date]
    })

    return query
}

const fetchAverageData = async (year: number, month: number) => {
    const response = await api.get<AverageCaloriesData>("/meal/average-calories", {
        params: {
            month,
            year
        }
    })
    return camelcaseKeys(response.data, { deep: true }) as AverageCaloriesData;
}

export function useAverageCaloriesData(year: number, month: number) {
    const query = useQuery({
        queryFn: () => fetchAverageData(year, month),
        queryKey: ['average-calories-data', year, month]
    })

    return query
}