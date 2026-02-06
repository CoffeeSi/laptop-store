import { useEffect, useState } from "react";
import { laptopApi } from "../api/laptopApi";
import type { ILaptop } from "../types/laptop.types";

export function useLaptop(id: string): { laptop: ILaptop | undefined; loading: boolean } {
    const [laptop, setLaptop] = useState<ILaptop>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLaptop = async () => {
            setLoading(true);
            try {
                const data = await laptopApi.fetchLaptopById(id);                                                
                setLaptop(data);
            } catch (error) {
                console.error("Failed to fetch laptop:", error);
            } finally {
                setLoading(false);
            }
        }
        void fetchLaptop();
    }, [id]);
    
    return { laptop, loading };
}