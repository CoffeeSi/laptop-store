import { laptopApi } from "../api/laptopApi";
import type { ILaptop } from "../types/laptop.types";
import { useQuery } from "@tanstack/react-query";

export function useLaptop(id: string): { laptop: ILaptop | undefined; isLoading: boolean } {
    const { data, isLoading } = useQuery({
        queryKey: ['laptop', id],
        queryFn: () => laptopApi.fetchLaptopById(id)
    })
    
    return { laptop: data, isLoading };
}