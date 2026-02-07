import { Header } from "@/components/layout/Header/Header";
import { Stack, Title } from "@mantine/core";
import classes from "./BrandPage.module.css";
import { useParams } from "react-router-dom";

function BrandPage() {
  const { brandID } = useParams();

  return (
    <>
      <Header />
      <Stack className={classes.main}>
      <Title mb={20}>
        Brand Page - {brandID}
      </Title>
        
      </Stack>
    </>
  )
}

export default BrandPage;