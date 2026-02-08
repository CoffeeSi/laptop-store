import { Table, Button, Text, Loader, Alert, Stack, Card } from '@mantine/core';
import { useAdminBrands, useDeleteBrand } from '../../hooks/useAdminBrands';
import { IconAlertCircle } from '@tabler/icons-react';

export const BrandList = () => {
    const { data: brands, isLoading, error } = useAdminBrands();
    const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrand();
    
    const handleDelete = (brandId: string, brandName: string) => {
        if (confirm(`Are you sure you want to delete "${brandName}"?`)) {
            deleteBrand(brandId);
        }
    };
    
    if (isLoading) {
        return (
            <Stack align="center" py="xl">
                <Loader size="md" />
                <Text c="dimmed">Loading brands...</Text>
            </Stack>
        );
    }
    
    if (error) {
        return (
            <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                Failed to load brands. Please try again later.
            </Alert>
        );
    }
    
    if (!brands || brands.length === 0) {
        return (
            <Card p="xl" ta="center" withBorder>
                <Text c="dimmed">No brands found. Create your first brand above.</Text>
            </Card>
        );
    }
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Brand Name</Table.Th>
                        <Table.Th>Country</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {brands.map((brand) => (
                        <Table.Tr key={brand._id}>
                            <Table.Td>{brand.brand_name}</Table.Td>
                            <Table.Td>{brand.country}</Table.Td>
                            <Table.Td>
                                <Button
                                    size="xs"
                                    variant="filled"
                                    color="red"
                                    onClick={() => handleDelete(brand._id, brand.brand_name)}
                                    loading={isDeleting}
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
