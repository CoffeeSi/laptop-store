import { Header } from "@/components/layout/Header/Header";
import { Stack, Title, Card, Text, Grid, GridCol, Loader, Alert, Group } from "@mantine/core";
import classes from "./BrandsPage.module.css";
import { useBrands } from "@/features/brand/hooks/useBrands";
import { IconAlertCircle, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function BrandsPage() {
  const { brands, isLoading } = useBrands();

  if (isLoading) {
    return (
      <>
        <Header />
        <Stack className={classes.main} align="center" py="xl">
          <Loader size="lg" />
          <Text c="dimmed">Loading brands...</Text>
        </Stack>
      </>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <>
        <Header />
        <Stack className={classes.main}>
          <Alert icon={<IconAlertCircle size={16} />} title="No Brands" color="blue">
            No brands available at the moment.
          </Alert>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Header />
      <Stack className={classes.main}>
        <Title order={1} mb="xl">All Brands</Title>
        <Grid>
          {brands.map((brand) => (
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={brand._id}>
              <Card
                withBorder
                shadow="sm"
                radius="md"
                p="lg"
                component={Link}
                to={`/brand/${brand._id}`}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
                className={classes.brandCard}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={700} size="lg" tt="uppercase">{brand.brand_name}</Text>
                </Group>
                <Group gap={5}>
                  <IconMapPin size={16} />
                  <Text size="sm" c="dimmed" tt="uppercase">{brand.country}</Text>
                </Group>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Stack>
    </>
  );
}

export default BrandsPage;
