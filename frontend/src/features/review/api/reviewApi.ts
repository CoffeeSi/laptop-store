import apiClient from '@/shared/api/request';
import type { ICreateReviewPayload, IReview } from '../types/review.types';

export const reviewApi = {
    getReviewsByLaptop: async (laptopId: string): Promise<IReview[]> => {
        const response = await apiClient.get(`/reviews/laptop/${laptopId}`);
        return response.data;
    },
    
    createReview: async (payload: ICreateReviewPayload): Promise<IReview> => {
        const response = await apiClient.post('/reviews', payload);
        return response.data;
    },
    
    deleteReview: async (reviewId: string): Promise<void> => {
        await apiClient.delete(`/reviews/${reviewId}`);
    }
};
