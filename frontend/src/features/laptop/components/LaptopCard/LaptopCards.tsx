import { Card, Group, Image, Text, Center, Button, GridCol, Grid } from "@mantine/core";
import { IconCpu, IconGraph, IconDatabase, IconDeviceSdCard } from '@tabler/icons-react';
import { useLaptops } from "../../hooks/useLaptop";
import classes from "./LaptopCards.module.css";

export function LaptopCards() {
  const { laptops } = useLaptops();

  const cards = laptops.map(laptop => {
    const mockdata = [
      { label: laptop.specifications[0].cpu, icon: IconCpu },
      { label: laptop.specifications[0].gpu, icon: IconGraph },
      { label: laptop.specifications[0].ram, icon: IconDeviceSdCard },
      { label: laptop.specifications[0].storage, icon: IconDatabase },
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

    return (
    <GridCol span={3} key={laptop._id}>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={laptop.imgUrl} alt={laptop.model_name} />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <div>
            <Text fw={500}>{laptop.model_name}</Text>
            <Text fz="xs" c="dimmed">
              Laptop
            </Text>
          </div>
        </Group>

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
                {laptop.price} ₸
              </Text>
            </div>
            <Button radius="xl" style={{ flex: 1 }}>
              Buy now
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </GridCol>
  );
  });

  return (
    <>
      <Grid justify="start" gutter="xl" mt={50}>
        {cards}
      </Grid>
    </>
  )
}