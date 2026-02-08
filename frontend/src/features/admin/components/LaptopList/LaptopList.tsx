import { useState } from 'react';
import { Table, Button, Text, Loader, Alert, Stack, Card, Badge, NumberInput, Group } from '@mantine/core';
import { useAdminLaptops, useDeleteLaptop, useUpdateStock } from '../../hooks/useAdminLaptops';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';

export const LaptopList = () => {
  const { data: laptops, isLoading, error } = useAdminLaptops();
  const { mutate: deleteLaptop, isPending: isDeleting } = useDeleteLaptop();
  const { mutate: updateStock, isPending: isUpdating } = useUpdateStock();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState<number | string>('');

  const handleDelete = (laptopId: string, modelName: string) => {
    if (confirm(`Are you sure you want to delete "${modelName}"?`)) {
      deleteLaptop(laptopId);
    }
  };

  const startEditing = (laptopId: string, currentStock: number) => {
    setEditingId(laptopId);
    setNewStock(currentStock);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewStock('');
  };

  const saveStock = (laptopId: string) => {
    updateStock(
      { laptopId, stock_quantity: Number(newStock) },
      {
        onSuccess: () => {
          setEditingId(null);
          setNewStock('');
        }
      }
    );
  };

  if (isLoading) {
    return (
      <Stack align="center" py="xl">
        <Loader size="md" />
        <Text c="dimmed">Loading laptops...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        Failed to load laptops. Please try again later.
      </Alert>
    );
  }

  if (!laptops || laptops.length === 0) {
    return (
      <Card p="xl" ta="center" withBorder>
        <Text c="dimmed">No laptops found. Create your first laptop above.</Text>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Model Name</Table.Th>
            <Table.Th>Brand</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Stock</Table.Th>
            <Table.Th>Specs</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {laptops.map((laptop) => (
            <Table.Tr key={laptop._id}>
              <Table.Td>{laptop.model_name}</Table.Td>
              <Table.Td>
                {laptop.brand_id && typeof laptop.brand_id === 'object'
                  ? laptop.brand_id.brand_name
                  : laptop.brand_id || 'N/A'}
              </Table.Td>
              <Table.Td>{new Intl.NumberFormat('ru-KZ', {
                style: "currency",
                currency: "KZT"
              }).format(laptop.price)}</Table.Td>
              <Table.Td>
                {editingId === laptop._id ? (
                  <Group gap="xs">
                    <NumberInput
                      value={newStock}
                      onChange={setNewStock}
                      min={0}
                      size="xs"
                      style={{ width: 80 }}
                    />
                    <Button
                      size="xs"
                      variant="light"
                      color="green"
                      onClick={() => saveStock(laptop._id)}
                      loading={isUpdating}
                    >
                      <IconCheck size={14} />
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={cancelEditing}
                    >
                      <IconX size={14} />
                    </Button>
                  </Group>
                ) : (
                  <Group gap="xs">
                    <Badge color={laptop.stock_quantity > 0 ? 'green' : 'red'}>
                      {laptop.stock_quantity}
                    </Badge>
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() => startEditing(laptop._id, laptop.stock_quantity)}
                    >
                      Edit
                    </Button>
                  </Group>
                )}
              </Table.Td>
              <Table.Td>
                <Text size="xs">
                  {laptop.specifications.cpu} | {laptop.specifications.ram}GB RAM
                  <br />
                  {laptop.specifications.storage} | {laptop.specifications.gpu}
                </Text>
              </Table.Td>
              <Table.Td>
                <Button
                  size="xs"
                  variant="filled"
                  color="red"
                  onClick={() => handleDelete(laptop._id, laptop.model_name)}
                  loading={isDeleting}
                  disabled={editingId === laptop._id}
                >
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};
