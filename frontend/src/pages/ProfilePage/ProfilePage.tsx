import { Header } from "@/components/layout/Header/Header";
import { Card, Grid, GridCol, Title } from "@mantine/core";
import classes from './ProfilePage.module.css';
import { OrdersStack } from "@/features/order/components/OrdersStack/OrdersStack";
import { UserProfile } from "@/features/user/components/UserProfile/UserProfile";

function ProfilePage() {
  return (
    <>
    <Header />
      <Grid className={classes.main}>
        <GridCol span={{base: 12, md: 8}}>
          <UserProfile />
        </GridCol>
        <GridCol span={{base: 12, md: 4}}>
          <Card withBorder p={20}>
            <Title order={2} mb={20} ml={10}>Your orders</Title>
            <OrdersStack />
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}

export default ProfilePage;