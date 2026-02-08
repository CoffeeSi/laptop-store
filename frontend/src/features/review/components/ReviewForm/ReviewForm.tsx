import { useState } from 'react';
import { Card, Text, Rating, Textarea, Button, Stack, Alert } from '@mantine/core';
import { useCreateReview } from '../../hooks/useReviews';
import { useAuthStore } from '@/features/auth/store/authStore';
import { IconAlertCircle } from '@tabler/icons-react';
import type { AxiosError } from 'axios';

interface ReviewFormProps {
    laptopId: string;
}

export const ReviewForm = ({ laptopId }: ReviewFormProps) => {
    const { isLoggedIn } = useAuthStore();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const { mutate: createReview, isPending, isSuccess } = useCreateReview();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        
        if (comment.trim().length < 3) {
            setError('Comment must be at least 3 characters long');
            return;
        }
        
        createReview(
            { rating, comment, laptop_id: laptopId },
            {
                onSuccess: () => {
                    setRating(0);
                    setComment('');
                },
                onError: (err) => {
                    const axiosError = err as AxiosError<{ message?: string }>;
                    setError(axiosError.response?.data?.message || 'Failed to submit review');
                }
            }
        );
    };
    
    if (!isLoggedIn) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text c="dimmed" ta="center">
                    Please log in to write a review
                </Text>
            </Card>
        );
    }
    
    if (isSuccess) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Alert color="green" title="Success">
                    Your review has been submitted successfully!
                </Alert>
            </Card>
        );
    }
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Text size="lg" fw={500}>Write a Review</Text>
                    
                    {error && (
                        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                            {error}
                        </Alert>
                    )}
                    
                    <div>
                        <Text size="sm" mb="xs">Your Rating</Text>
                        <Rating 
                            value={rating} 
                            onChange={setRating}
                            size="lg"
                        />
                    </div>
                    
                    <Textarea
                        label="Your Review"
                        placeholder="Share your experience with this laptop..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        minRows={4}
                        maxLength={1000}
                        required
                    />
                    
                    <Button 
                        type="submit" 
                        loading={isPending}
                        disabled={rating === 0}
                    >
                        Submit Review
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};
