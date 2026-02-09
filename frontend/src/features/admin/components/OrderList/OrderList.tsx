import { Table, Select, Text, Loader, Alert, Stack, Card, Badge } from '@mantine/core';
import { useAdminOrders, useUpdateOrderStatus } from '../../hooks/useAdminOrders';
import { IconAlertCircle } from '@tabler/icons-react';

export const OrderList = () => {
  const { data: orders, isLoading, error } = useAdminOrders();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const handleStatusChange = (orderId: string, status: 'pending' | 'shipping' | 'delievered') => {
    updateStatus({ orderId, payload: { status } });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'shipping': return 'blue';
      case 'delievered': return 'green';
      default: return 'gray';
    }
  };

  if (isLoading) {
    return (
      <Stack align="center" py="xl">
        <Loader size="md" />
        <Text c="dimmed">Loading orders...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        Failed to load orders. Please try again later.
      </Alert>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card p="xl" ta="center" withBorder>
        <Text c="dimmed">No orders found.</Text>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Order Date</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Items</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.map((order) => (
            <Table.Tr key={order._id}>
              <Table.Td>{formatDate(order.order_date)}</Table.Td>
              <Table.Td>
                {order.user_id ? (
                  <>
                    <Text size="sm" fw={500}>{order.user_id.full_name}</Text>
                    <Text size="xs" c="dimmed">{order.user_id.email}</Text>
                  </>
                ) : (
                  <Text size="sm" c="dimmed">Deleted User</Text>
                )}
              </Table.Td>
              <Table.Td>
                {order.items.map((item, idx) => (
                  <Text key={idx} size="xs">
                    {item.laptop_id ? item.laptop_id.model_name : 'Deleted Product'} × {item.quantity}
                  </Text>
                ))}
              </Table.Td>
              <Table.Td>{new Intl.NumberFormat('ru-KZ', { style: 'currency', currency: 'KZT' }).format(order.total_price)}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Select
                  size="xs"
                  value={order.status}
                  onChange={(value) =>
                    value && handleStatusChange(order._id, value as 'pending' | 'shipping' | 'delievered')
                  }
                  data={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'shipping', label: 'Shipping' },
                    { value: 'delievered', label: 'Delivered' }
                  ]}
                  disabled={isUpdating}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};
