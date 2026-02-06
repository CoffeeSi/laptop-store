import { Avatar, Group, Text, Table, ActionIcon, Menu, Alert } from "@mantine/core";
import { IconDots, IconMessages, IconNote, IconReportAnalytics, IconTrash } from "@tabler/icons-react";
import { useOrders } from "../../hooks/useOrders";

const data = [

  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    rate: 22,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    rate: 45,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    rate: 76,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    rate: 15,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    rate: 98,
  },
];



export function OrdersStack() {
  const { orders, error } = useOrders();

  if (error) {
    return (
      <Alert variant="light" color="red" radius="md" title="Alert title">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
      </Alert>
    )
  }

  const rows = orders.map((order) => {
    const order_laptops = order.items.map((item) => (
      <>
        <Text>{item.laptop.model_name}</Text>
        <Text>{item.laptop.price}</Text>
      </>
    ))

    return (
    <Table.Tr key={order._id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              {order_laptops}
            </Text>
            {/* <Text c="dimmed" fz="xs">
              {item.job}
            </Text> */}
          </div>
        </Group>
      </Table.Td>
      {/* <Table.Td>
        <Text fz="sm">{}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </Table.Td> */}
      <Table.Td>
        <Text fz="sm">${order.total_price} / hr</Text>
        <Text fz="xs" c="dimmed">
          Rate
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