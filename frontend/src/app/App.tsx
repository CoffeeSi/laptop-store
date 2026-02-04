import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from "@/app/router/AppRouter.tsx";
import { MantineProvider } from "@mantine/core"
import { useAuth } from '@/features/auth/hooks/useAuth';

function App() {
  useAuth();
  
  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <AppRouter />
        </MantineProvider>
      </BrowserRouter>
    </>
  )
}

export default App
