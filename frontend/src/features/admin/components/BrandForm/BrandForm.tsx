import { useState } from 'react';
import { Card, TextInput, Button, Stack, Alert } from '@mantine/core';
import { useCreateBrand } from '../../hooks/useAdminBrands';
import { IconAlertCircle } from '@tabler/icons-react';
import type { AxiosError } from 'axios';

export const BrandForm = () => {
    const [brandName, setBrandName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const { mutate: createBrand, isPending, isSuccess } = useCreateBrand();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (brandName.trim().length < 2) {
            setError('Brand name must be at least 2 characters');
            return;
        }
        
        if (country.trim().length < 2) {
            setError('Country must be at least 2 characters');
            return;
        }
        
        createBrand(
            { brand_name: brandName, country },
            {
                onSuccess: () => {
                    setBrandName('');
                    setCountry('');
                },
                onError: (err) => {
                    const axiosError = err as AxiosError<{ message?: string }>;
                    setError(axiosError.response?.data?.message || 'Failed to create brand');
                }
            }
        );
    };
    
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
                            Brand created successfully!
                        </Alert>
                    )}
                    
                    <TextInput
                        label="Brand Name"
                        placeholder="Enter brand name"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                    
                    <TextInput
                        label="Country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    
                    <Button type="submit" loading={isPending}>
                        Create Brand
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};
