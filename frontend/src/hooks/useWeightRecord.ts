import type { AddWeightData, DeleteWeightData, WeightRecordData } from "@/interfaces/weightRecords";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

const fetchData = async () => {
    const response = await api.get<WeightRecordData[]>("/user/weight-records")
    return camelcaseKeys(response.data, { deep: true }) as WeightRecordData[];
}

export function useWeightRecordsData() {
    const query = useQuery({
        queryFn: () => fetchData(),
        queryKey: ['weight-records-data']
    })

    return query
}

const addWeight = async ({ pesoKg }: AddWeightData) => {
    return await api.post("/user/add-weight", {
        peso_kg: pesoKg
    })
}

export function useAddWeight() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: addWeight,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weight-records-data'] })
        }
    })

    return mutate
}

const deleteWeight = async ({ id }: DeleteWeightData) => {
    return await api.delete("/user/del-weight", {
        data: { id }
    })
}

export function useDeleteWeight() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: deleteWeight,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weight-records-data'] })
        }
    })

    return mutate
}