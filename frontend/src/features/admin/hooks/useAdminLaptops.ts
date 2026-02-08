import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminLaptopApi } from '../api/adminLaptopApi';
import type { ICreateLaptopPayload } from '../types/admin.types';

export const useAdminLaptops = () => {
    return useQuery({
        queryKey: ['admin', 'laptops'],
        queryFn: () => adminLaptopApi.getAllLaptops(),
    });
};

export const useCreateLaptop = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: ICreateLaptopPayload) => adminLaptopApi.createLaptop(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'laptops'] });
        },
    });
};

export const useUpdateStock = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ laptopId, stock_quantity }: { laptopId: string; stock_quantity: number }) => 
            adminLaptopApi.updateStock(laptopId, stock_quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'laptops'] });
        },
    });
};

export const useDeleteLaptop = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (laptopId: string) => adminLaptopApi.deleteLaptop(laptopId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'laptops'] });
        },
    });
};
