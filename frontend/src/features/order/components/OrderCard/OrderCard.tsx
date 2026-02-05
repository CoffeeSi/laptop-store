import { Button, Card, Modal, Table, Text } from "@mantine/core";
import { useCartStore } from "@/features/cart/store/cartStore";
import classes from "./OrderCard.module.css";
import { useOrder } from "../../hooks/useOrder";
import { useDisclosure } from "@mantine/hooks";

export function OrderCard() {
  const [opened, { open, close }] = useDisclosure(false);

  const items = useCartStore((state) => state.items);
  const totalCost = Object.values(items).reduce(
    (sum, item) => sum + (item.laptop.price * item.quantity), 
    0
  );
  const { createOrder } = useOrder();

  const data_table = [
    { label: "Address", value: "123 Main St, City, Country" },
    { label: "Payment Method", value: "Credit Card" },
    { label: "Total", value: new Intl.NumberFormat('ru-KZ', {
        style: "currency",
        currency: "KZT"
    }).format(totalCost) },
  ]

  const rows = data_table.map((item) => (
    <Table.Tr key={item.label}>
      <Table.Td>
        <Text fz="lg" fw={600} className={classes.title}>
          {item.label}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="lg" fw={600} className={classes.title}>
          {item.value}
        </Text>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
    <Modal opened={opened} onClose={close} title="Your order has been placed!">
      <Text>Your order successfully placed. Thank you for shopping with us!</Text>
    </Modal>
    <Card withBorder shadow="md" radius="lg" p={20}>
      <div className={classes.wrapper}>
        <Table verticalSpacing="lg" mb={20}>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
        <Button fullWidth variant="filled" disabled={totalCost === 0} onClick={() => {createOrder(); open;}}>Order</Button>
      </div>
    </Card>
    </>
  )
}