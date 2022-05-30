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
    title: 'mitra',
    path: '/dashboard/fasilitator',
    icon: getIcon('eva:person-done-outline'),
  },
];

export default navConfig;
