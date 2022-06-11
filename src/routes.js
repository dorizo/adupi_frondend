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
import VarifikasiMitra from './pages/VarifikasiMitra';
import Fasilitator from './pages/Fasilitator';
import RoleDetail from './pages/RoleDetail';
// import DashboardApp from './pages/DashboardApp';
import Welcome from './screens/Welcome';
import Akun from './screens/Akun';
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
import MitraDetail from './pages/MitraDetail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    !process.env.REACT_APP_MOBILE && {
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
          path: 'mitra',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Mitra />
            </RequireAuth>
          ),
        },
        {
          path: 'mitra/:mitraCode',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <MitraDetail />
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
          path: 'verifikasi-mitra',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <VarifikasiMitra />
            </RequireAuth>
          ),
        },
        {
          path: 'verifikasi-anggota',
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
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <Home />
            </MobileGuard>
          ),
        },
        {
          path: 'fasilitator',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <FasilitatorHome />
            </MobileGuard>
          ),
        },
        { path: 'welcome', element: <Welcome /> },
        { path: 'login', element: <FasilitatorWelcome /> },
        {
          path: 'beli-sampah',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <BeliSampah />
            </MobileGuard>
          ),
        },
        {
          path: 'jual-sampah',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <JualSampah />{' '}
            </MobileGuard>
          ),
        },
        {
          path: 'masalah',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <Masalah />
            </MobileGuard>
          ),
        },
        {
          path: 'anggota',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <Anggota />
            </MobileGuard>
          ),
        },
        {
          path: 'alat',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <TambahAlat />
            </MobileGuard>
          ),
        },
        {
          path: 'tambah-mitra',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <TambahMitra />
            </MobileGuard>
          ),
        },
        {
          path: 'list-mitra',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <ListMitra />
            </MobileGuard>
          ),
        },
        {
          path: 'list-kehadiran',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <ListKehadiran />
            </MobileGuard>
          ),
        },
        {
          path: 'akun',
          element: (
            <MobileGuard allowedRoles={['Mitra']} allowedPermission={['']}>
              <Akun />
            </MobileGuard>
          ),
        },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to={process.env.REACT_APP_MOBILE ? '/mobile' : '/dashboard'} /> },
        !process.env.REACT_APP_MOBILE && { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
