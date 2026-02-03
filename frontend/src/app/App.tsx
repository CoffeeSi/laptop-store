import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from "@/app/router/AppRouter.tsx";
import { MantineProvider } from "@mantine/core"

function App() {
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
