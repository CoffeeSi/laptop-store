import { Stack, Title, Divider } from '@mantine/core';
import { BrandForm } from '@/features/admin/components/BrandForm/BrandForm';
import { BrandList } from '@/features/admin/components/BrandList/BrandList';

export const BrandManagement = () => {
    return (
        <Stack gap="xl">
            <Title order={2}>Brand Management</Title>
            
            <Stack gap="lg">
                <div>
                    <Title order={3} mb="md">Add New Brand</Title>
                    <BrandForm />
                </div>
                
                <Divider />
                
                <div>
                    <Title order={3} mb="md">All Brands</Title>
                    <BrandList />
                </div>
            </Stack>
        </Stack>
    );
};
