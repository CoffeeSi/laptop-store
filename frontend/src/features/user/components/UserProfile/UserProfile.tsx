import { Avatar, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { useUserStore } from "../../store/userStore";

export function UserProfile() {
  const user = useUserStore((state) => state.user)
  return (
    <Card withBorder radius="md" p="lg">
      <Stack gap="md">
        {/* Header */}
        <Group>
          <Avatar
            radius="xl"
            size="lg"
            color="blue"
          >
            {user.full_name?.[0]}
          </Avatar>

          <Stack gap={2}>
            <Text fw={600} size="lg">
              {user.full_name}
            </Text>
            <Text size="sm" c="dimmed">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </Stack>
        </Group>

        <Divider />

        {/* Info */}
        <Stack gap="xs">
          <Group justify="space-between">
            <Text c="dimmed" size="sm">Email</Text>
            <Text>{user.email}</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed" size="sm">Phone</Text>
            <Text>{user.phone || "—"}</Text>
          </Group>

          <Group justify="space-between">
            <Text c="dimmed" size="sm">Address</Text>
            <Text>{user.address || "—"}</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
} 