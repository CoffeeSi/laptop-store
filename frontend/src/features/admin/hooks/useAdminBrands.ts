import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBrandApi } from '../api/adminBrandApi';
import type { ICreateBrandPayload } from '../types/admin.types';

export const useAdminBrands = () => {
    return useQuery({
        queryKey: ['admin', 'brands'],
        queryFn: () => adminBrandApi.getAllBrands(),
    });
};

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: ICreateBrandPayload) => adminBrandApi.createBrand(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
        },
    });
};

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (brandId: string) => adminBrandApi.deleteBrand(brandId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
        },
    });
};
