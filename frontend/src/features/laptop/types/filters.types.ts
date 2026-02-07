
export interface IFilters {
    brands: string[];
    cpus: string[];
    gpus: string[];
    storage: string[];
    ram: {
        min: number,
        max: number
    }
}