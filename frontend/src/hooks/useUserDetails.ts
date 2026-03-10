import type { UpdateWeightData, UserDetailsData } from "@/interfaces/userDetails";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

const fetchData = async () => {
    const response = await api.get<UserDetailsData>("/user/details")
    return camelcaseKeys(response.data, { deep: true }) as UserDetailsData;
}

export function useUserDetailsData() {
    const query = useQuery({
        queryFn: () => fetchData(),
        queryKey: ['user-details-data']
    })

    return query
}

const updateWeight = async ({ altura }: UpdateWeightData) => {
    return await api.patch("/user/update", {
        altura
    })
}

export function useUpdateWeight() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: updateWeight,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-details-data'] })
        }
    })

    return mutate
}