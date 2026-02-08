import { Stack, Title, Divider } from '@mantine/core';
import { LaptopForm } from '@/features/admin/components/LaptopForm/LaptopForm';
import { LaptopList } from '@/features/admin/components/LaptopList/LaptopList';

export const LaptopManagement = () => {
  return (
    <Stack gap="xl">
      <Title order={2}>Laptop Management</Title>

      <Stack gap="lg">
        <div>
          <Title order={3} mb="md">Add New Laptop</Title>
          <LaptopForm />
        </div>

        <Divider />

        <div>
          <Title order={3} mb="md">All Laptops</Title>
          <LaptopList />
        </div>
      </Stack>
    </Stack>
  );
};
