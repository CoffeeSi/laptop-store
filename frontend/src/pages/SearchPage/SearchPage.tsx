import { Header } from '@/components/layout/Header/Header';
import classes from './SearchPage.module.css';
import { Card, Grid, GridCol, Text, Stack, Title, Button, MultiSelect, RangeSlider } from '@mantine/core';
import { useBrands } from '@/features/brand/hooks/useBrands';
import { useFilters } from '@/features/laptop/hooks/useFilters';
import { LaptopCards } from '@/features/laptop/components/LaptopCard/LaptopCards';
import { useState } from 'react';
import type { IFilters } from '@/features/laptop/types/filters.types';

function SearchPage() {
  const { brands, isLoading } = useBrands();
  const [filters, setFilters] = useState<IFilters>();
  const filtersList = useFilters();

  const [brand, setBrand] = useState<string[]>();
  const [cpu, setCpu] = useState<string[]>();
  const [gpu, setGpu] = useState<string[]>();
  const [minRam, setMinRam] = useState<number>();
  const [maxRam, setMaxRam] = useState<number>();
  const [storage, setStorage] = useState<string[]>();

  const handleSearch = () => {
    const newFilters: IFilters = {
      brands: brand || [],
      cpus: cpu || [],
      gpus: gpu || [],
      ram: {
        min: minRam !== undefined ? minRam : filtersList?.ram.min || 0,
        max: maxRam !== undefined ? maxRam : filtersList?.ram.max || 0
      },
      storage: storage || []
    };
    setFilters(newFilters);
  }

  if (isLoading) {
    return 123;
  }

  return (
    <>
      <Header />
      <Grid className={classes.main}>
        <GridCol span={{base: 12, md: 3}}>
          <Card withBorder radius="md">
            <Title order={2} mb={20}>Filters</Title>
            <Stack gap={20}>
              <MultiSelect
                label="Brand"
                placeholder="Pick value"
                data={brands?.map((brand) => ({ value: brand._id, label: brand.brand_name }))}
                onChange={(value) => setBrand(value)}
              />
              <MultiSelect
                label="CPU"
                placeholder="Pick value"
                data={filtersList?.cpus}
                onChange={(value) => setCpu(value)}
              />
              <MultiSelect
                label="GPU"
                placeholder="Pick value"
                data={filtersList?.gpus}
                onChange={(value) => setGpu(value)}
              />
              <Text>RAM</Text>
              <RangeSlider
                color="blue"
                marks={[
                  {label: filtersList?.ram.min, value: filtersList?.ram.min || 0},
                  {label: filtersList?.ram.max, value: filtersList?.ram.max || 0}
                ]}
                step={1}
                minRange={4}
                min={filtersList?.ram.min}
                max={filtersList?.ram.max}
                onChange={(value) => {
                  setMinRam(value[0]);
                  setMaxRam(value[1]);
                }}
              />
              <MultiSelect
                label="Storage"
                placeholder="Pick value"
                data={filtersList?.storage}
                onChange={(value) => setStorage(value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{base: 12, md: 9}}>
          <Card withBorder radius="md" p={20}>
            <Grid justify="start" gutter="xl">
              <LaptopCards filters={filters} />
            </Grid>
          </Card>
        </GridCol>
      </Grid>
    </>
  )
}

export default SearchPage;