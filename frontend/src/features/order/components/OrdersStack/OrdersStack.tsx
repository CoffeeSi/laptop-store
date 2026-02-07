import { Group, Text, Table, ActionIcon, Menu, Alert } from "@mantine/core";
import { IconDots, IconMessages, IconNote, IconReportAnalytics, IconTrash } from "@tabler/icons-react";
import { useOrders } from "../../hooks/useOrders";
import { Link } from "react-router-dom";
import classes from './OrdersStack.module.css';

export function OrdersStack() {
  const { orders, error } = useOrders();

  if (error) {
    return (
      <Alert variant="light" color="red" radius="md" title="Alert title">
        Order error
      </Alert>
    )
  }

  const rows = orders.map((order) => {
    
    const order_laptops = order.items.map((item) => (
      <>
        <Group gap="sm" key={item.laptop_id._id}>
          <Link to={`/laptop/${item.laptop_id._id}`} className={classes.order_link}>{item.laptop_id.model_name} x {item.quantity}</Link>
        </Group>
      </>
    ))

    return (
    <Table.Tr key={order._id}>
      <Table.Td>
        {order_laptops}
        <Text fz="xs" c="dimmed">
          Order
        </Text>
      </Table.Td>
      {/* <Table.Td>
        <Text fz="sm">{}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </Table.Td> */}
      <Table.Td>
        <Text fz="sm">{new Intl.NumberFormat('ru-KZ', {
                        style: "currency",
                        currency: "KZT"
        }).format(order.total_price)}</Text>
        <Text fz="xs" c="dimmed">
          Total price
        </Text>
      </Table.Td>
      <Table.Td>
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
              <Menu.Item leftSection={<IconMessages size={16} stroke={1.5} />}>
                Send message
              </Menu.Item>
              <Menu.Item leftSection={<IconNote size={16} stroke={1.5} />}>Add note</Menu.Item>
              <Menu.Item leftSection={<IconReportAnalytics size={16} stroke={1.5} />}>
                Analytics
              </Menu.Item>
              <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">
                Terminate contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
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