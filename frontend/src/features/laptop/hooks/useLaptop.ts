import { useEffect, useState } from "react";
import type { ILaptop } from "../types/laptop.types";
import { laptopApi } from "../api/laptopApi";

export async function useLaptops() {
    const [laptops, setLaptops] = useState<ILaptop[]>([]);

    useEffect(() => {
        const fetchLaptops = async () => {
            try {
                const data = await laptopApi.fetchLaptops();
                setLaptops(data.data);
            } catch (error) {
                console.error("Failed to fetch laptops:", error);
            }
        }
        fetchLaptops();
    }, [])

    return { laptops };
}