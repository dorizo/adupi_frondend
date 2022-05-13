import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Welcome from './screens/Welcome';
import MobileLayout from './layouts/MobileLayout';
import Home from './screens/Home';
import BeliSampah from './screens/BeliSampah';
import JualSampah from './screens/JualSampah';
import Masalah from './screens/Masalah';
import Anggota from './screens/Anggota';
import TambahAlat from './screens/TambahAlat';
import FasilitatorHome from './screens/Home/FasilitatorHome';
import FasilitatorWelcome from './screens/Welcome/FasilitatorWelcome';
import TambahMitra from './screens/TambahMitra';
import ListMitra from './screens/ListMitra';
import ListKehadiran from './screens/ListKehadiran';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/mobile',
      element: <MobileLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'fasilitator', element: <FasilitatorHome /> },
        { path: 'welcome', element: <Welcome /> },
        { path: 'login', element: <FasilitatorWelcome /> },
        { path: 'beli-sampah', element: <BeliSampah /> },
        { path: 'jual-sampah', element: <JualSampah /> },
        { path: 'masalah', element: <Masalah /> },
        { path: 'anggota', element: <Anggota /> },
        { path: 'tambah-alat', element: <TambahAlat /> },
        { path: 'tambah-mitra', element: <TambahMitra /> },
        { path: 'list-mitra', element: <ListMitra /> },
        { path: 'list-kehadiran', element: <ListKehadiran /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/mobile/welcome" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
