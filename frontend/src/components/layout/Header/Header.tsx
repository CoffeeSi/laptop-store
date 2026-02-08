import {
  IconChevronRight,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconBuildingStore,
} from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useUserStore } from '@/features/user/store/userStore';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useLogout();

  const user = useUserStore(state => state.user);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text size="xl" fw={600} component={Link} to="/" className={classes.logo}>
            Laptop Store
          </Text>

          <Group visibleFrom='sm'>
          <Link to='/brands' className={classes.link} title="Brands">
            <IconBuildingStore size={24} />
          </Link>
          <Link to='/search' className={classes.link} title="Search">
            <IconSearch size={24} />
          </Link>
          {isLoggedIn ? (
            <>
              <Link to='/cart' className={classes.link}>
                <IconShoppingCart size={24} />
              </Link>
              <UnstyledButton component={Link} to='/profile' className={classes.user}>
                <Group>
                  <IconUser size={24} />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user ? user.full_name : "User"}
                    </Text>
                  </div>

                  <IconChevronRight size={14} stroke={1.5} />
                </Group>
              </UnstyledButton>
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Button variant="default" component={Link} to="/login">Log in</Button>
              <Button component={Link} to="/register">Sign up</Button>
            </>
          )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="light" component={Link} to='/brands' onClick={closeDrawer}>Brands</Button>
            <Button variant="light" component={Link} to='/search' onClick={closeDrawer}>Search</Button>
          </Group>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
          {isLoggedIn ? (
            <>
              <Button variant="default" component={Link} to='/profile' onClick={closeDrawer}>Profile</Button>
              <Button onClick={() => { logout(); closeDrawer(); }}>Log out</Button>
            </>
          ) : (
            <>
              <Button variant="default" component={Link} to="/login" onClick={closeDrawer}>Log in</Button>
              <Button component={Link} to="/register" onClick={closeDrawer}>Sign up</Button>
            </>
          )}
          </Group>
          
        </ScrollArea>
      </Drawer>
    </Box>
  );
}