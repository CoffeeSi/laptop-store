import { useState } from 'react';
import { Card, TextInput, NumberInput, Button, Stack, Alert, Select } from '@mantine/core';
import { useCreateLaptop } from '../../hooks/useAdminLaptops';
import { useAdminBrands } from '../../hooks/useAdminBrands';
import { IconAlertCircle } from '@tabler/icons-react';
import type { AxiosError } from 'axios';

export const LaptopForm = () => {
    const [modelName, setModelName] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [cpu, setCpu] = useState('');
    const [ram, setRam] = useState<number | string>('');
    const [storage, setStorage] = useState('');
    const [gpu, setGpu] = useState('');
    const [stockQuantity, setStockQuantity] = useState<number | string>('');
    const [brandId, setBrandId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const { data: brands } = useAdminBrands();
    const { mutate: createLaptop, isPending, isSuccess } = useCreateLaptop();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!brandId) {
            setError('Please select a brand');
            return;
        }
        
        createLaptop(
            {
                model_name: modelName,
                price: Number(price),
                specifications: [{
                    cpu,
                    ram: Number(ram),
                    storage,
                    gpu
                }],
                stock_quantity: Number(stockQuantity),
                brand_id: brandId
            },
            {
                onSuccess: () => {
                    setModelName('');
                    setPrice('');
                    setCpu('');
                    setRam('');
                    setStorage('');
                    setGpu('');
                    setStockQuantity('');
                    setBrandId(null);
                },
                onError: (err) => {
                    const axiosError = err as AxiosError<{ message?: string }>;
                    setError(axiosError.response?.data?.message || 'Failed to create laptop');
                }
            }
        );
    };
    
    const brandOptions = brands?.map(brand => ({
        value: brand._id,
        label: brand.brand_name
    })) || [];
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    {error && (
                        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                            {error}
                        </Alert>
                    )}
                    
                    {isSuccess && (
                        <Alert color="green" title="Success">
                            Laptop created successfully!
                        </Alert>
                    )}
                    
                    <TextInput
                        label="Model Name"
                        placeholder="Enter model name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        required
                    />
                    
                    <NumberInput
                        label="Price"
                        placeholder="Enter price"
                        value={price}
                        onChange={setPrice}
                        min={0}
                        required
                    />
                    
                    <Select
                        label="Brand"
                        placeholder="Select brand"
                        data={brandOptions}
                        value={brandId}
                        onChange={setBrandId}
                        required
                        searchable
                    />
                    
                    <TextInput
                        label="CPU"
                        placeholder="e.g., Intel Core i7"
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                        required
                    />
                    
                    <NumberInput
                        label="RAM (GB)"
                        placeholder="Enter RAM size"
                        value={ram}
                        onChange={setRam}
                        min={0}
                        required
                    />
                    
                    <TextInput
                        label="Storage"
                        placeholder="e.g., 512GB SSD"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        required
                    />
                    
                    <TextInput
                        label="GPU"
                        placeholder="e.g., NVIDIA RTX 3060"
                        value={gpu}
                        onChange={(e) => setGpu(e.target.value)}
                        required
                    />
                    
                    <NumberInput
                        label="Stock Quantity"
                        placeholder="Enter stock quantity"
                        value={stockQuantity}
                        onChange={setStockQuantity}
                        min={0}
                        required
                    />
                    
                    <Button type="submit" loading={isPending}>
                        Create Laptop
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};
