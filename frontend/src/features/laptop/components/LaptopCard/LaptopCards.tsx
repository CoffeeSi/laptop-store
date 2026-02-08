import { Card, Group, Image, Text, Center, GridCol, Skeleton } from "@mantine/core";
import { IconCpu, IconGraph, IconDatabase, IconDeviceSdCard } from '@tabler/icons-react';
import { useLaptops } from "../../hooks/useLaptops";
import classes from "./LaptopCards.module.css";
import { useCartStore } from "@/features/cart/store/cartStore";
import { Link } from "react-router-dom";
import { NotificationInfo } from "@/components/Notification/Notification";
import { CartButtonSmall } from "@/components/CartButtonSmall/CartButtonSmall";
import type { IFilters } from "../../types/filters.types";

export function LaptopCards({filters, page}: {filters?: IFilters; page?: number}) {
  const { laptops, isLoading } = useLaptops(filters, page);
  const items = useCartStore(state => state.items);
  const addLaptop = useCartStore(state => state.addLaptop)


  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <GridCol span={{base: 12, sm: 6, lg: 4 }} key={i}>
            <Skeleton height="400" visible={isLoading}>bla</Skeleton>
          </GridCol>
        ))}
      </>
    )
  }  

  const cards = laptops?.map(laptop => {
    const spec = laptop.specifications;
    const mockdata = [
      { label: spec?.cpu, icon: IconCpu },
      { label: spec?.gpu, icon: IconGraph },
      { label: `${spec?.ram} GB`, icon: IconDeviceSdCard },
      { label: spec?.storage, icon: IconDatabase },
    ];
  
    const features = mockdata.map((feature) => {
      if (!feature.label) return null;
      
      return (
        <Center key={feature.label}>
          <feature.icon size={16} className={classes.icon} stroke={1.5} />
          <Text size="xs">{feature.label}</Text>
        </Center>
      );
    });

    const isOutOfStock = !laptop.stock_quantity || 
                          (items[laptop._id]?.quantity || 0) >= laptop.stock_quantity;

    const addToCart = () => {
      addLaptop(laptop);
      return <NotificationInfo message="ok" />
    }

    return (
      <GridCol span={{base: 12, sm: 6, lg: 4 }} key={laptop._id}>
        <Card withBorder radius="md" className={classes.card}>
        <Link to={`/laptop/${laptop._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Section className={classes.imageSection}>
            <Image width={414} height={300} fit="contain" src={laptop.imgUrl} alt={laptop.model_name} radius="md" />
          </Card.Section>

          <Group justify="space-between" mt="md">
            <div>
              <Text fw={600} className={classes.label}>{laptop.model_name}</Text>
              <Text fz="xs" c="dimmed">
                Laptop
              </Text>
            </div>
          </Group>
        </Link>
        
          {laptop.brand_id && (
            <Link 
              to={`/brand/${laptop.brand_id._id}`} 
              style={{ textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Text size="sm" c="blue" mt={5}>
                by {laptop.brand_id.brand_name}
              </Text>
            </Link>
          )}

          {features.length > 0 ? (
            <Card.Section className={classes.section} mt="md">
              <Text fz="sm" c="dimmed" className={classes.label}>
                Configuration
              </Text>

              <Group gap={8} mb={-8}>
                {features}
              </Group>
            </Card.Section>
          ) : null}
            
          <Card.Section className={classes.section}>
            <Group gap={30}>
              <div>
                <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                  {new Intl.NumberFormat('ru-KZ', {
                    style: "currency",
                    currency: "KZT"
                  }).format(laptop.price)}
                </Text>
              </div>
              <CartButtonSmall isDisabled={isOutOfStock} function_={addToCart} />
            </Group>
          </Card.Section>
        </Card>
      </GridCol>
    );
  });

  return (
    <>
      {cards}
    </>
  )
}