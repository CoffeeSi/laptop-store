import { Stack, Title } from '@mantine/core';
import { OrderList } from '@/features/admin/components/OrderList/OrderList';

export const OrderManagement = () => {
  return (
    <Stack gap="xl">
      <Title order={2}>Order Management</Title>
      <OrderList />
    </Stack>
  );
};
