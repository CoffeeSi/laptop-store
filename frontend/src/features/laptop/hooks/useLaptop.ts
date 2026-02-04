import { useEffect, useState } from "react";
import type { ILaptop } from "../types/laptop.types";
import { laptopApi } from "../api/laptopApi";

export function useLaptops() {
    const [laptops, setLaptops] = useState<ILaptop[]>([]);

    useEffect(() => {
        const fetchLaptops = async () => {
            try {
                const data = await laptopApi.fetchLaptops();                
                setLaptops(data);
            } catch (error) {
                console.error("Failed to fetch laptops:", error);
            }
        }
        void fetchLaptops();
    }, [])

    return { laptops };
}