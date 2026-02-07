import { Route, Routes } from 'react-router-dom';
import { PATHS } from '@/shared/routes/routePaths';
import HomePage from '@/pages/HomePage/HomePage'
import LaptopPage from '@/pages/LaptopPage/LaptopPage';
import BrandPage from '@/pages/BrandPage/BrandPage';
import CartPage from '@/pages/CartPage/CartPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import SearchPage from '@/pages/SearchPage/SearchPage';

export const AppRouter = () => (
    <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.LAPTOP} element={<LaptopPage />} />
        <Route path={PATHS.BRAND} element={<BrandPage />} />
        <Route path={PATHS.SEARCH} element={<SearchPage/>} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={PATHS.PROFILE} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path={PATHS.CART} element={<PrivateRoute><CartPage /></PrivateRoute>} />
    </Routes>
)