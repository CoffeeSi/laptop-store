import { Header } from "@/components/layout/Header/Header.tsx";
import { LaptopCard } from "@/features/laptop/components/LaptopCard/LaptopCard";
import { Flex, Group, Stack } from "@mantine/core";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <Header />
      <Stack className={classes.main} mb={50}>
        <Flex direction="row" gap={20}>
          <LaptopCard />
          <LaptopCard />
          <LaptopCard />
          <LaptopCard />
        </Flex>
      </Stack>
    </>
  );
}
export default HomePage