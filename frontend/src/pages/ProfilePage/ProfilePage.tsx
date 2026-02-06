import { Header } from "@/components/layout/Header/Header";
import { Card, Grid, GridCol } from "@mantine/core";
import classes from './ProfilePage.module.css';
import { OrdersStack } from "@/features/order/components/OrdersStack/OrdersStack";

function ProfilePage() {
  return (
    <>
    <Header />
      <Grid className={classes.main}>
        <GridCol span={{base: 12, md: 8}}>
          1
        </GridCol>
        <GridCol span={{base: 12, md: 4}}>
          <Card withBorder p={20}>
            <OrdersStack />
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}

export default ProfilePage;