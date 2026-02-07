import { Header } from "@/components/layout/Header/Header.tsx";
import { LaptopCards } from "@/features/laptop/components/LaptopCard/LaptopCards";
import { Grid, Stack } from "@mantine/core";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <Header />
      <Stack className={classes.main}>
        <Grid>
          <LaptopCards />
        </Grid>
      </Stack>
    </>
  );
}
export default HomePage;
