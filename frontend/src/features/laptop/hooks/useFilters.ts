import { useEffect, useState } from "react"
import { laptopApi } from "../api/laptopApi"
import type { IFilters } from "../types/filters.types"
import { useQuery } from "@tanstack/react-query";

export const useFilters = () => {
    const [filters, setFilters] = useState<IFilters>();

    const { data } = useQuery({
        queryKey: ['filter_params'],
        queryFn: () => laptopApi.fetchFilters()
    })
    useEffect(() => {
        setFilters(data)
    }, [data])
    return filters;
}