import { Header } from "@/components/layout/Header/Header.tsx";
import { LaptopCards } from "@/features/laptop/components/LaptopCard/LaptopCards";
import { Grid, Pagination, Stack, Center } from "@mantine/core";
import classes from "./HomePage.module.css";
import { useState } from "react";
import { useLaptops } from "@/features/laptop/hooks/useLaptops";

function HomePage() {
  const [activePage, setPage] = useState(1);
  const { totalPages } = useLaptops(undefined, activePage);
  
  return (
    <>
      <Header />
      <Stack className={classes.main}>
        <Grid>
          <LaptopCards page={activePage} />
        </Grid>
        {totalPages > 1 && (
          <Center>
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
export default HomePage;
