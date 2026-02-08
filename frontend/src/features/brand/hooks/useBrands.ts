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

export function useBrand(brandId: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['brand', brandId],
        queryFn: () => brandApi.fetchBrandById(brandId),
        enabled: !!brandId
    })
    
    return { brand: data, isLoading, error }
}

export function useBrandStats(brandId: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['brandStats', brandId],
        queryFn: () => brandApi.fetchBrandStats(brandId),
        enabled: !!brandId
    })
    
    return { stats: data, isLoading, error }
}