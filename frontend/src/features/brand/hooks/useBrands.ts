import { useEffect, useState } from "react";
import type { IBrand } from "../types/brand.types";
import { brandApi } from "../api/brandApi";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {
    const { data, isLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: () => brandApi.fetchBrands()
    })    
    
    const [brands, setBrands] = useState<IBrand[] | undefined>([])

    useEffect(() => {
        setBrands(data)
    }, [data])
    return { brands, isLoading }
}