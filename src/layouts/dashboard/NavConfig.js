// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-outline'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-outline'),
  },
  {
    title: 'role',
    path: '/dashboard/role',
    icon: getIcon('eva:settings-outline'),
  },
  {
    title: 'kategori-sampah',
    path: '/dashboard/kategori-sampah',
    icon: getIcon('eva:trash-2-outline'),
  },
  {
    title: 'jenis-sampah',
    path: '/dashboard/jenis-sampah',
    icon: getIcon('eva:trash-2-outline'),
  },
  {
    title: 'fasilitator',
    path: '/dashboard/fasilitator',
    icon: getIcon('eva:person-done-outline'),
  },
  {
    title: 'Pembeli',
    path: '/dashboard/pembeli',
    icon: getIcon('eva:shopping-cart-outline'),
  },
  {
    title: 'list mitra',
    path: '/dashboard/mitra',
    icon: getIcon('eva:list-outline'),
  },
  {
    title: 'verifikasi mitra',
    path: '/dashboard/verifikasi-mitra',
    icon: getIcon('eva:person-add-outline'),
  },
  {
    title: 'verifikasi anggota',
    path: '/dashboard/verifikasi-anggota',
    icon: getIcon('eva:people-outline'),
  },

  {
    title: 'kunjungan-fasilitator',
    path: '/dashboard/kunjungan-fasilitator',
    icon: getIcon('eva:corner-up-right-outline'),
  },

  {
    title: 'report',
    path: '/dashboard/report',
    icon: getIcon('eva:archive-outline'),
  },
  {
    title: 'report mayora',
    path: '/dashboard/report_mayora',
    icon: getIcon('eva:archive-outline'),
  },
  {
    title: 'export data',
    path: '/dashboard/export-data',
    icon: getIcon('eva:archive-outline'),
  },
];

export default navConfig;
