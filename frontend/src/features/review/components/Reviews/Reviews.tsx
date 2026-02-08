import { Stack, Title, Divider } from '@mantine/core';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { ReviewList } from '../ReviewList/ReviewList';

interface ReviewsProps {
    laptopId: string;
}

export const Reviews = ({ laptopId }: ReviewsProps) => {
    return (
        <Stack gap="xl">
            <Title order={2}>Customer Reviews</Title>
            
            <ReviewForm laptopId={laptopId} />
            
            <Divider />
            
            <ReviewList laptopId={laptopId} />
        </Stack>
    );
};
