import { Card, Text } from "@mantine/core";
import { useUserStore } from "../../store/userStore";

export function UserProfile() {
  const user = useUserStore((state) => state.user)
  return (
    <Card withBorder>
      <Text>{user.full_name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.created_at}</Text>
    </Card>
  )
}