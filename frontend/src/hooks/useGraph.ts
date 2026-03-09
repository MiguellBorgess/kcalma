import type { MonthCaloriesData } from "@/interfaces/graphs";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

const fetchData = async (year: number, month: number) => {
    const response = await api.get<MonthCaloriesData[]>("/meal/month-calories",
        {
            params: {
                year,
                month
            }
        }
    )

    return camelcaseKeys(response.data, { deep: true }) as MonthCaloriesData[];
}

export function useMonthCaloriesData(year: number, month: number) {
    const query = useQuery({
        queryFn: () => fetchData(year, month),
        queryKey: ['month-calories-data', year, month]
    })

    return query
}