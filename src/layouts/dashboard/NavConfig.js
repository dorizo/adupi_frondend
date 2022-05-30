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
    title: 'list-mitra',
    path: '/dashboard/list-mitra',
    icon: getIcon('eva:list-outline'),
  },
  {
    title: 'masalah',
    path: '/dashboard/masalah',
    icon: getIcon('eva:settings-2-outline'),
  },
  {
    title: 'kunjungan-fasilitator',
    path: '/dashboard/kunjungan-fasilitator',
    icon: getIcon('eva:corner-up-right-outline'),
  },
  {
    title: 'log',
    path: '/dashboard/log',
    icon: getIcon('eva:bookmark-outline'),
  },
  {
    title: 'report',
    path: '/dashboard/report',
    icon: getIcon('eva:archive-outline'),
  },
  {
    title: 'peta-sebaran',
    path: '/dashboard/peta-sebaran',
    icon: getIcon('eva:map-outline'),
  },
  {
    title: 'validasi-mitra',
    path: '/dashboard/validasi-mitra',
    icon: getIcon('eva:person-add-outline'),
  },
];

export default navConfig;
