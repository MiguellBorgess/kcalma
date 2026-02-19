import type { UserDetailsData } from "@/interfaces/userDetails";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
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