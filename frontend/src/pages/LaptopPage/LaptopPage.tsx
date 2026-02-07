import { Header } from "@/components/layout/Header/Header";
import { Grid, GridCol, Stack } from "@mantine/core";
import classes from "./LaptopPage.module.css";
import { Navigate, useParams } from "react-router-dom";
import LaptopDetailedCard from "@/features/laptop/components/LaptopDetailedCard/LaptopDetailedCard";
import { LaptopDetailedPrice } from "@/features/laptop/components/LaptopDetailedPrice/LaptopDetailedPrice";

function LaptopPage() {
  const { laptopID } = useParams();
  if (!laptopID) {
    return <Navigate to="/not-found" />;
  }

  return (
    <>
      <Header />
      <Grid className={classes.main}>
        <GridCol span={{base: 12, md: 8}}>
          <Stack>
            <LaptopDetailedCard laptopID={laptopID} />
          </Stack>
        </GridCol>
        <GridCol span={{base: 12, md: 4}}>
          <LaptopDetailedPrice laptopID={laptopID} /> 
        </GridCol>
      </Grid>
    </>
  )
}

export default LaptopPage;