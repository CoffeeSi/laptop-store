import { Route, Routes } from 'react-router-dom';
import { PATHS } from '@/shared/routes/routePaths.ts';
import HomePage from '@/pages/HomePage/HomePage.tsx'

export const AppRouter = () => (
    <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
    </Routes>
)