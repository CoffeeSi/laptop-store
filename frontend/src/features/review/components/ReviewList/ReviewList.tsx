import { Stack, Text, Loader, Alert, Paper, Group } from '@mantine/core';
import { useReviews } from '../../hooks/useReviews';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { IconAlertCircle, IconStarFilled } from '@tabler/icons-react';

interface ReviewListProps {
    laptopId: string;
}

export const ReviewList = ({ laptopId }: ReviewListProps) => {
    const { data: reviews, isLoading, error } = useReviews(laptopId);
    
    if (isLoading) {
        return (
            <Stack align="center" py="xl">
                <Loader size="md" />
                <Text c="dimmed">Loading reviews...</Text>
            </Stack>
        );
    }
    
    if (error) {
        return (
            <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                Failed to load reviews. Please try again later.
            </Alert>
        );
    }
    
    if (!reviews || reviews.length === 0) {
        return (
            <Paper p="xl" ta="center" withBorder>
                <Text c="dimmed" size="lg">
                    No reviews yet. Be the first to review this laptop!
                </Text>
            </Paper>
        );
    }
    
    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
    return (
        <Stack gap="md">
            <Paper p="md" withBorder>
                <Group gap="xs">
                    <IconStarFilled size={20} style={{ color: '#fcc419' }} />
                    <Text size="xl" fw={600}>
                        {averageRating.toFixed(1)}
                    </Text>
                    <Text c="dimmed">
                        ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </Text>
                </Group>
            </Paper>
            
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </Stack>
    );
};
