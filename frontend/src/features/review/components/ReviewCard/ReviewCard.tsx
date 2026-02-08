import { Card, Text, Group, Rating, Stack, Button } from '@mantine/core';
import type { IReview } from '../../types/review.types';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useDeleteReview } from '../../hooks/useReviews';
import classes from './ReviewCard.module.css';

interface ReviewCardProps {
    review: IReview;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const { userID, isLoggedIn } = useAuthStore();
    const { mutate: deleteReview, isPending } = useDeleteReview();
    
    const isOwner = isLoggedIn && review.user_id && userID === review.user_id._id;
    
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this review?')) {
            deleteReview(review._id);
        }
    };
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
            <Stack gap="sm">
                <Group justify="space-between" align="flex-start">
                    <Stack gap={4}>
                        <Text fw={500}>
                            {review.user_id?.full_name || 'Deleted User'}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {formatDate(review.review_date)}
                        </Text>
                    </Stack>
                    <Rating value={review.rating} readOnly size="sm" />
                </Group>
                
                <Text size="sm">{review.comment}</Text>
                
                {isOwner && (
                    <Group justify="flex-end">
                        <Button 
                            size="xs" 
                            variant="subtle" 
                            color="red"
                            onClick={handleDelete}
                            loading={isPending}
                        >
                            Delete
                        </Button>
                    </Group>
                )}
            </Stack>
        </Card>
    );
};
