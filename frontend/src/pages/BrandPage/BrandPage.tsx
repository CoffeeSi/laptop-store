import { Header } from "@/components/layout/Header/Header";
import { Stack, Title, Card, Text, Grid, Loader, Alert, Group, Center, Pagination, Progress } from "@mantine/core";
import classes from "./BrandPage.module.css";
import { useParams } from "react-router-dom";
import { useBrand, useBrandStats } from "@/features/brand/hooks/useBrands";
import { IconAlertCircle, IconStar, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { LaptopCards } from "@/features/laptop/components/LaptopCard/LaptopCards";
import { useLaptops } from "@/features/laptop/hooks/useLaptops";
import { useState } from "react";

function BrandPage() {
  const { brandID } = useParams();
  const [activePage, setPage] = useState(1);
  const { brand, isLoading: brandLoading, error: brandError } = useBrand(brandID || '');
  const { stats, isLoading: statsLoading } = useBrandStats(brandID || '');
  const { totalPages } = useLaptops({ brands: brandID ? [brandID] : [], cpus: [], gpus: [], storage: [] }, activePage);

  if (brandLoading) {
    return (
      <>
        <Header />
        <Stack className={classes.main} align="center" py="xl">
          <Loader size="lg" />
          <Text c="dimmed">Loading brand information...</Text>
        </Stack>
      </>
    );
  }

  if (brandError || !brand) {
    return (
      <>
        <Header />
        <Stack className={classes.main}>
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            Brand not found or failed to load.
          </Alert>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Header />
      <Stack className={classes.main}>
        <Card withBorder shadow="sm" radius="md" p="xl">
          <Group justify="space-between" mb="md">
            <div>
              <Title order={1} mb={5} tt="uppercase">{brand.brand_name}</Title>
              <Text size="sm" c="dimmed" tt="uppercase">{brand.country}</Text>
            </div>
            {stats && !statsLoading && (
              <Group gap="xl">
                <div>
                  <Group gap={5}>
                    <IconStar size={20} color="gold" />
                    <Text size="sm" c="dimmed">Average Rating</Text>
                  </Group>
                  <Text size="xl" fw={700}>{stats.avgRating ? stats.avgRating.toFixed(1) : 'N/A'}</Text>
                </div>
                <div>
                  <Group gap={5}>
                    <IconTrendingUp size={20} color="green" />
                    <Text size="sm" c="dimmed">Highest</Text>
                  </Group>
                  <Text size="xl" fw={700}>{stats.maxRating || 'N/A'}</Text>
                </div>
                <div>
                  <Group gap={5}>
                    <IconTrendingDown size={20} color="red" />
                    <Text size="sm" c="dimmed">Lowest</Text>
                  </Group>
                  <Text size="xl" fw={700}>{stats.minRating || 'N/A'}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Total Reviews</Text>
                  <Text size="xl" fw={700}>{stats.totalReviews}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Total Laptops</Text>
                  <Text size="xl" fw={700}>{stats.totalLaptops}</Text>
                </div>
              </Group>
            )}
          </Group>
        </Card>

        {stats && !statsLoading && stats.totalReviews > 0 && (
          <Card withBorder shadow="sm" radius="md" p="xl" mt="md">
            <Title order={3} mb="md">Rating Distribution</Title>
            <Stack gap="sm">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = star === 5 ? stats.fiveStarCount :
                             star === 4 ? stats.fourStarCount :
                             star === 3 ? stats.threeStarCount :
                             star === 2 ? stats.twoStarCount :
                             stats.oneStarCount;
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                
                return (
                  <Group key={star} gap="md" grow>
                    <Group gap={5} style={{ minWidth: '80px' }}>
                      <Text size="sm" fw={500}>{star}</Text>
                      <IconStar size={16} color="gold" />
                    </Group>
                    <Progress 
                      value={percentage} 
                      color={star >= 4 ? 'green' : star >= 3 ? 'yellow' : 'red'}
                      size="lg"
                      style={{ flex: 1 }}
                    />
                    <Text size="sm" style={{ minWidth: '60px' }} ta="right">
                      {count} ({percentage.toFixed(0)}%)
                    </Text>
                  </Group>
                );
              })}
            </Stack>
          </Card>
        )}

        <Title order={2} mt="xl" mb="md">Laptops from {brand.brand_name}</Title>
        <Grid>
          <LaptopCards 
            filters={{ brands: brandID ? [brandID] : [], cpus: [], gpus: [], storage: [] }}
            page={activePage}
          />
        </Grid>
        {totalPages > 1 && (
          <Center mt="md">
            <Pagination 
              total={totalPages} 
              value={activePage} 
              onChange={setPage} 
              my="md" 
            />
          </Center>
        )}
      </Stack>
    </>
  );
}

export default BrandPage;