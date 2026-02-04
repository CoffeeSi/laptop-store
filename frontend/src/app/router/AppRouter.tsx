import { Route, Routes } from 'react-router-dom';
import { PATHS } from '@/shared/routes/routePaths';
import HomePage from '@/pages/HomePage/HomePage'
import CartPage from '@/pages/CartPage/CartPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export const AppRouter = () => (
    <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.CART} element={<CartPage />} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
)