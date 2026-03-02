import type { FoodData } from "@/interfaces/food";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

const fetchData = async () => {
    const response = await api.get<FoodData[]>("/food/get-all")
    return camelcaseKeys(response.data, { deep: true }) as FoodData[];
}

export function useFoodData() {
    const query = useQuery({
        queryFn: () => fetchData(),
        queryKey: ['food-data']
    })

    return query
}