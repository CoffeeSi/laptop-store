import { useEffect, useState } from "react";
import { laptopApi } from "../api/laptopApi";
import type { ILaptop } from "../types/laptop.types";
import { useQuery } from "@tanstack/react-query";

export function useLaptop(id: string): { laptop: ILaptop | undefined; isLoading: boolean } {
    const [laptop, setLaptop] = useState<ILaptop>();

    const { data, isLoading } = useQuery({
        queryKey: ['laptop', id],
        queryFn: () => laptopApi.fetchLaptopById(id)
    })

    useEffect(() => {
        if (data) {
            setLaptop(data);
        }
    }, [data]);
    
    return { laptop, isLoading };
}