import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Fasilitator from './pages/Fasilitator';
import JenisSampah from './pages/JenisSampah';
import KategoriSampah from './pages/KategoriSampah';
import ListMasalah from './pages/ListMasalah';
import Login from './pages/Login';
import Mitra from './pages/Mitra';
import NotFound from './pages/Page404';
import Pembeli from './pages/Pembeli';
import Register from './pages/Register';
import Role from './pages/Role';
import Warna from './pages/Warna';
import RoleDetail from './pages/RoleDetail';
import User from './pages/User';
import Pembelian from './pages/Pembelian';
import Penjualan from './pages/penjualan';
import UserDetail from './pages/UserDetail';
import VarifikasiMitra from './pages/VarifikasiMitra';
import VerifikasiAnggota from './pages/VerifikasiAnggota';
import VerifikasiAnggotaDetail from './pages/VerifikasiAnggotaDetail';
// import DashboardApp from './pages/DashboardApp';
import MobileGuard from './Guard/MobileGuard';
import RequireAuth from './Guard/RequiredAuth';
import MobileLayout from './layouts/MobileLayout';
import KunjunganFasilitator from './pages/KunjunganFasilitator';
import MitraDetail from './pages/MitraDetail';
import MitraReportDetail from './pages/MitraReportDetail';
import PetaSebaran from './pages/PetaSebaran';
import Report from './pages/Report';
import ReportMayora from './pages/ReportMayora';
import Akun from './screens/Akun';
import Anggota from './screens/Anggota';
import BeliSampah from './screens/BeliSampah';
import Home from './screens/Home';
import FasilitatorHome from './screens/Home/FasilitatorHome';
import JualSampah from './screens/JualSampah';
import Kunjungan from './screens/Kunjungan';
import ListMitra from './screens/ListMitra';
import Masalah from './screens/Masalah';
import MasalahByFasilitator from './screens/MasalahByFasiltator';
import TambahAlat from './screens/TambahAlat';
import TambahMitra from './screens/TambahMitra';
import Welcome from './screens/Welcome';
import FasilitatorWelcome from './screens/Welcome/FasilitatorWelcome';
import Export from './pages/Export';
import Mitrakehadiran from './screens/Mitrakehadiran';
import Mitrakehadirandetail from './screens/Mitrakehadirandetail';
import Kunjungandashboard from './pages/kunjungandashboard';
import Detailmasalahstatus from './pages/Detailmasalahstatus';
import Kunjunganmitra from './pages/kunjunganmitra';
import Activityfasilitator from './pages/activityfasilitator';
import Target from './pages/Target';
import LampiranByFasilitator from './screens/LampiranByFasilitator';
import Transaksi from './screens/Transaksi';
import Fasilitatortransaksi from './screens/Fasilitatortransaksi';
import MitraEdit from './pages/MitraEdit';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    process.env.REACT_APP_MOBILE !== 'TRUE' && {
      path: '/dashboard',
      element: (
        <RequireAuth allowedRoles={['admin']}>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { path: '', element: <Navigate to={'/dashboard/app'} /> },
        {
          path: 'detailmasalahstatus/:status',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Detailmasalahstatus />
            </RequireAuth>
          ),
        },
        {
          path: 'detaillogfasilitator',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Activityfasilitator />
            </RequireAuth>
          ),
        },
        
        { path: 'app', element:(
          <>
          <Kunjungandashboard />
          <PetaSebaran />
          </>
        )},
        { path: 'penjualan', element:(
          <>
          <Penjualan />
          </>
        )},
        { path: 'pembelian', element:(
          <>
          <Pembelian />
          </>
        )},
        { path: 'target', element:(
          <>
          <Target />
          </>
        )},
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
          path: 'warna',
          children: [
            {
              path: '',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <Warna />
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
          path: 'kategori-sampah',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <KategoriSampah />
            </RequireAuth>
          ),
        },
        {
          path: 'pembeli',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Pembeli />
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
          children: [
            {
              path: '',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <Mitra />
                </RequireAuth>
              ),
            },
            {
              path: 'detail/:mitraCode',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <MitraDetail />
                </RequireAuth>
              ),
            },
          
            {
              path: 'edit/:mitraCode',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <MitraEdit />
                </RequireAuth>
              ),
            },
            {
              path: 'masalah/:mitraCode',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <ListMasalah />
                </RequireAuth>
              ),
            },
            {
              path: 'anggota/:mitraCode',
              element: (
                <RequireAuth allowedRoles={['admin']}>
                  <VerifikasiAnggotaDetail />
                </RequireAuth>
              ),
            },
          ],
        },

        {
          path: 'kunjungan-fasilitator',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <KunjunganFasilitator />
            </RequireAuth>
          ),
        },
        {
          path: 'kunjungan-mitra',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Kunjunganmitra />
            </RequireAuth>
          ),
        },

        {
          path: 'report',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Report />
            </RequireAuth>
          ),
        },
        {
          path: 'export-data',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <Export />
            </RequireAuth>
          ),
        },
        {
          path: 'report_mayora',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <ReportMayora />
            </RequireAuth>
          ),
        },
        {
          path: 'report/detail/:mitraCode',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <MitraReportDetail />
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
              <VerifikasiAnggota />
            </RequireAuth>
          ),
        },
        {
          path: 'verifikasi-anggota/:mitraCode',
          element: (
            <RequireAuth allowedRoles={['admin']}>
              <VerifikasiAnggotaDetail />
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
          path: 'list-kehadiranmitra',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <Mitrakehadiran />
            </MobileGuard>
          ),
        },
        {
          path: 'kehadiranmitradetail/:mitraCode',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <Mitrakehadirandetail />
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
          path: 'list-mitra/masalah/:mitraCode',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <MasalahByFasilitator />
            </MobileGuard>
          ),
        },
        {
          path: 'list-mitra/transaksi/:mitraCode',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <Fasilitatortransaksi />
            </MobileGuard>
          ),
        },
        {
          path: 'list-mitra/lampiran/:mitraCode',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <LampiranByFasilitator />
            </MobileGuard>
          ),
        },
        {
          path: 'list-kehadiran',
          element: (
            <MobileGuard allowedRoles={['Fasilitator']} allowedPermission={['']}>
              <Kunjungan />
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
        { path: '/', element: <Navigate to={process.env.REACT_APP_MOBILE === 'TRUE' ? '/mobile' : '/dashboard'} /> },
        process.env.REACT_APP_MOBILE !== 'TRUE' && { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
console.log(process.env.REACT_APP_MOBILE !== 'TRUE');
