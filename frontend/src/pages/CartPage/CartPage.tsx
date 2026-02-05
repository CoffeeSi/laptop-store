import { Header } from "@/components/layout/Header/Header";
import CartCards from "@/features/cart/components/CartCards/CartCards";
import { Grid, GridCol } from "@mantine/core";
import { OrderCard } from "@/features/order/components/OrderCard/OrderCard";
import classes from "./CartPage.module.css";

function CartPage() {
  return (
    <>
      <Header />
      <Grid className={classes.main} gutter="xl">
        <GridCol span={{base: 12, md: 8}}>
          <CartCards />
        </GridCol>
        <GridCol span={{base: 12, md: 4}}>
          <OrderCard />
        </GridCol>
      </Grid>
    </>
  )
}

export default CartPage;