import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from "@/app/router/AppRouter.tsx";
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/authStore';

function App() {
  const [client] = useState(new QueryClient())
  
  useAuth();
  
  const isLoading = useAuthStore(state => state.isLoading);
  
  if (isLoading) {
    return (<>Loading...</>);
  }

  return (
    <>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <MantineProvider>
            <AppRouter />
          </MantineProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
