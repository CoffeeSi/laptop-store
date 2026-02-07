import { useEffect, useState } from "react";
import { useQuery} from '@tanstack/react-query'
import type { ILaptop } from "../types/laptop.types";
import { laptopApi } from "../api/laptopApi";
import type { IFilters } from "../types/filters.types";

export function useLaptops(filters?: IFilters) {
    const queryFilter = new URLSearchParams();
    
    if (filters) {
        if (filters.brands?.length) {
            queryFilter.set('brands', filters.brands.join(','));
        }
        if (filters.cpus?.length) {
            queryFilter.set('cpus', filters.cpus.join(','));
        }
        if (filters.gpus?.length) {
            queryFilter.set('gpus', filters.gpus.join(','));
        }
        if (filters.storage?.length) {
            queryFilter.set('storage', filters.storage.join(','));
        }
        if (filters.ram) {
            queryFilter.set('ram', JSON.stringify(filters.ram));
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['laptops', queryFilter.toString()],
        queryFn: () => laptopApi.fetchLaptops(queryFilter)
    })
    
    const [laptops, setLaptops] = useState<ILaptop[] | undefined>(data);
    
    useEffect(() => {
        setLaptops(data);
    }, [data])

    return { laptops, isLoading };
}