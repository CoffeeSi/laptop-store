import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/reviewApi';
import type { ICreateReviewPayload } from '../types/review.types';

export const useReviews = (laptopId: string) => {
    return useQuery({
        queryKey: ['reviews', laptopId],
        queryFn: () => reviewApi.getReviewsByLaptop(laptopId),
        enabled: !!laptopId,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: ICreateReviewPayload) => reviewApi.createReview(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.laptop_id] });
        },
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (reviewId: string) => reviewApi.deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
    });
};
