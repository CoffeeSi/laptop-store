import { Card, Group, Image, NumberInput, Stack, Text, Title } from '@mantine/core';
import { useCartStore } from "../../store/cartStore";
import classes from "./CartCards.module.css";

function CartCards() {
  const laptops = useCartStore(state => state.items);
  const addLaptop = useCartStore(state => state.addLaptop);
  const removeLaptop = useCartStore(state => state.removeLaptop);

  const updateQuantity = (laptop_id: string, newQuantity: string | number) => {
    const cartItem = laptops[laptop_id];
    if (!cartItem) return;
    
    const numQuantity = typeof newQuantity === 'string' ? parseInt(newQuantity) : newQuantity;
    
    const currentQuantity = cartItem.quantity;
    const difference = numQuantity - currentQuantity;
    
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        addLaptop(cartItem.laptop);
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        removeLaptop(cartItem.laptop);
      }
    }
  };

  const cards = Object.entries(laptops).map(([laptop_id, cartItem]) => {
    const { laptop, quantity } = cartItem;
    return (
      <Card withBorder radius="md" className={classes.card} key={laptop_id}>
        <Image src={laptop.imgUrl} className={classes.image} alt={laptop.model_name} radius="md" />

        <Stack className={classes.body}>
          <Text tt="uppercase" opacity={0.8} fw={700} size="sm">
            {laptop.brand_id.brand_name}
          </Text>
          <Text className={classes.title} fw={600} size="lg">
            {laptop.model_name}
          </Text>
          <Text className={classes.title} fw={600} size="lg">
            {new Intl.NumberFormat('ru-KZ', {
                style: "currency",
                currency: "KZT"
            }).format(laptop.price)}
          </Text>
          <Group gap={7}>
            <NumberInput
              className={classes.quantity}
              placeholder="Quantity"
              value={quantity}
              onChange={(value) => updateQuantity(laptop._id, value)}
              max={laptop.stock_quantity}
              min={0}
              w={80}
            />
            </Group>
        </Stack>
      </Card>
    )
  })

  return (
    <>
      <Stack>
        <Title order={2} mb={12}>Your Cart</Title>
        {cards}
      </Stack>
    </>
  )
}

export default CartCards;
