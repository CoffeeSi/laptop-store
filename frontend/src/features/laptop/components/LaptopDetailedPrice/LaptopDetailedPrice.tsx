import { Card, Flex, Text, Button } from "@mantine/core";
import classes from "./LaptopDetailedPrice.module.css";
import { Link } from "react-router-dom";
import { useLaptop } from "../../hooks/useLaptop";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useMemo, useState } from "react";

export function LaptopDetailedPrice({ laptopID }: { laptopID: string }) {
  const addLaptop = useCartStore(state => state.addLaptop);
  const items = useCartStore(state => state.items);
  const [isToggled, setIsToggled] = useState(false);
  const { laptop } = useLaptop(laptopID);

  const isOutOfStock = useMemo(() => {
    if (laptop && !laptop.stock_quantity) {
      return true;
    }
    if (laptop && (items[laptopID]?.quantity || 0) >= laptop.stock_quantity) {
      return true;
    }
    return false;
  }, [laptop, items, laptopID]);


  // if (!laptop && !isLoading) {
  //   return (
  //     <>
  //       <Navigate to="/not-found" />
  //     </>
  //   );
  // }

  const addToCart = () => {
    if (!laptop?.stock_quantity) {
      return alert("Product is out of stock.");
    }
    
    const currentQuantity = items[laptopID]?.quantity || 0;
    if (currentQuantity >= laptop.stock_quantity) {
      return alert("Cannot add more items than available in stock.");
    }
    
    if (laptop) {
      addLaptop(laptop);
      setIsToggled(true);
    }
  }

  return (
    <Card withBorder shadow="md" radius="lg" className={classes.order_card}>
      <Flex justify="space-between" align="center" mb={20}>
        <Text fz="1.5em">Buy</Text>
        <Text fz="1.5em">
          {
            new Intl.NumberFormat('ru-KZ', {
              style: "currency",
              currency: "KZT"
            }).format(laptop ? laptop.price : 0)
          }
        </Text>
      </Flex>
      { isToggled ? (
        <Button fullWidth component={Link} to='/cart' variant="filled" color="green">Go to Cart</Button>
      ) : (
        <Button fullWidth  onClick={() => addToCart()} variant="filled" disabled={isOutOfStock}>Add to Cart</Button>
      )}
    </Card>
  )
}