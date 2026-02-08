import { Container, Tabs } from '@mantine/core';
import { Header } from '@/components/layout/Header/Header';
import { useState } from 'react';
import { BrandManagement } from '@/features/admin/components/BrandManagement/BrandManagement';
import { LaptopManagement } from '@/features/admin/components/LaptopManagement/LaptopManagement';
import { OrderManagement } from '@/features/admin/components/OrderManagement/OrderManagement';
import classes from './AdminPage.module.css';

function AdminPage() {
    const [activeTab, setActiveTab] = useState<string | null>('brands');
    
    return (
        <>
            <Header />
            <Container size="xl" className={classes.container}>
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab value="brands">Brands</Tabs.Tab>
                        <Tabs.Tab value="laptops">Laptops</Tabs.Tab>
                        <Tabs.Tab value="orders">Orders</Tabs.Tab>
                    </Tabs.List>
                    
                    <Tabs.Panel value="brands" pt="xl">
                        <BrandManagement />
                    </Tabs.Panel>
                    
                    <Tabs.Panel value="laptops" pt="xl">
                        <LaptopManagement />
                    </Tabs.Panel>
                    
                    <Tabs.Panel value="orders" pt="xl">
                        <OrderManagement />
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </>
    )
}

export default AdminPage;