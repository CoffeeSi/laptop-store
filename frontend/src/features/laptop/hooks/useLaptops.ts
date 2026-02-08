import { useQuery} from '@tanstack/react-query'
import { laptopApi } from "../api/laptopApi";
import type { IFilters } from "../types/filters.types";

export function useLaptops(filters?: IFilters, page: number = 1) {
    const queryFilter = new URLSearchParams();
    
    queryFilter.set('page', page.toString());
    
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

    return { 
        laptops: data?.laptops, 
        isLoading,
        totalPages: data?.totalPages || 1,
        currentPage: data?.currentPage || 1,
        totalCount: data?.totalCount || 0
    };
}