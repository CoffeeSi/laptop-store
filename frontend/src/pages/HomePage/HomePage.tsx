import { Header } from "@/components/layout/Header/Header.tsx";
import { LaptopCards } from "@/features/laptop/components/LaptopCard/LaptopCards";
import { Stack } from "@mantine/core";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <Header />
      <Stack className={classes.main} mb={50}>
        <LaptopCards />
      </Stack>
    </>
  );
}
export default HomePage