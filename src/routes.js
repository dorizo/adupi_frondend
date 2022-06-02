import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import UserDetail from './pages/UserDetail';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import ComingSoon from './pages/ComingSoon';
import GoogleMaps from './pages/GoogleMaps';
import Register from './pages/Register';
import Role from './pages/Role';
import JenisSampah from './pages/JenisSampah';
import Mitra from './pages/Mitra';
import Fasilitator from './pages/Fasilitator';
import RoleDetail from './pages/RoleDetail';
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
import RequireAuth from './Guard/RequiredAuth';
import MobileGuard from './Guard/MobileGuard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth allowedRoles={['admin']}>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { path: 'app', element: <ComingSoon /> },
        {
          path: 'role',
          children: [
            {
              path: '',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <Role />
                </RequireAuth>
              ),
            },
            {
              path: 'detail/:roleId',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <RoleDetail />
                </RequireAuth>
              ),
            },
          ],
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <User />
                </RequireAuth>
              ),
            },
            {
              path: 'detail/:id',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <UserDetail />
                </RequireAuth>
              ),
            },
          ],
        },
        { path: 'blog', element: <Blog /> },
        {
          path: 'jenis-sampah',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <JenisSampah />
            </RequireAuth>
          ),
        },
        {
          path: 'fasilitator',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Fasilitator />
            </RequireAuth>
          ),
        },
        {
          path: 'list-mitra',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Mitra />
            </RequireAuth>
          ),
        },
        {
          path: 'masalah',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ComingSoon />
            </RequireAuth>
          ),
        },
        {
          path: 'kunjungan-fasilitator',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ComingSoon />
            </RequireAuth>
          ),
        },
        {
          path: 'log',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ComingSoon />
            </RequireAuth>
          ),
        },
        {
          path: 'report',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ComingSoon />
            </RequireAuth>
          ),
        },
        {
          path: 'peta-sebaran',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <GoogleMaps />
            </RequireAuth>
          ),
        },
        {
          path: 'validasi-mitra',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ComingSoon />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: '/mobile',
      element: <MobileLayout />,
      children: [
        {
          path: '',
          element: (
            <MobileGuard allowedRoles={['admin']}>
              <Home />
            </MobileGuard>
          ),
        },
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
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
