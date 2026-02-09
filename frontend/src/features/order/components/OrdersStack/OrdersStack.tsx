import { Group, Text, Table, ActionIcon, Menu, Alert, Button } from "@mantine/core";
import { IconDots, IconCreditCardRefund } from "@tabler/icons-react";
import { useOrders } from "../../hooks/useOrders";
import { useRefundItem } from "../../hooks/useRefund";
import { Link } from "react-router-dom";
import classes from './OrdersStack.module.css';

export function OrdersStack() {
  const { orders, error, refetch } = useOrders();
  const { mutate: refundItem, isPending } = useRefundItem();

  if (error) {
    return (
      <Alert variant="light" color="red" radius="md" title="Alert title">
        Order error
      </Alert>
    )
  }

  const handleRefund = (orderId: string, laptopId: string, laptopName: string) => {
    if (confirm(`Are you sure you want to refund "${laptopName}"? The item will be removed from your order and the stock will be restored.`)) {
      refundItem({ orderId, laptopId }, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };
  
  const rows = orders.map((order) => {
    
    const order_laptops = order.items.map((item) => {
      if (!item.laptop_id) {
        return (
          <Group gap="sm" key={`deleted-${item.quantity}`} justify="space-between">
            <Text className={classes.order_link} c="dimmed">Deleted Product x {item.quantity}</Text>
          </Group>
        );
      }
      
      return (
        <Group gap="sm" key={item.laptop_id._id} justify="space-between">
          <Link to={`/laptop/${item.laptop_id._id}`} className={classes.order_link}>{item.laptop_id.model_name} x {item.quantity}</Link>
          <Group gap={0} justify="flex-end">
            <Menu
              transitionProps={{ transition: 'pop' }}
              withArrow
              position="bottom-end"
              withinPortal
            >
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray" aria-label="Menu">
                  <IconDots size={16} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconCreditCardRefund size={16} stroke={1.5} />} color="red">
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() => handleRefund(order._id!, item.laptop_id._id, item.laptop_id.model_name)}
                    loading={isPending}
                  >
                    Refund
                  </Button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      );
    })

    return (
    <Table.Tr key={order._id}>
      <Table.Td>
        {order_laptops}
        <Text fz="xs" c="dimmed">
          Order
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{new Intl.NumberFormat('ru-KZ', {
                        style: "currency",
                        currency: "KZT"
        }).format(order.total_price)}</Text>
        <Text fz="xs" c="dimmed">
          Total price
        </Text>
      </Table.Td>
    </Table.Tr>
    )
  })


  return (
    <Table verticalSpacing="md">
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}