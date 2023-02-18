// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigfas = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-outline'), 
  },
  
  

  {
    title: 'Report',
    icon: getIcon('eva:archive-outline'), 
    children : [

    //   {
    //     title: 'kunjungan Non Mitra',
    //     path: '/dashboard/kunjungan-fasilitator',
    //     icon: getIcon('eva:corner-up-right-outline'),
    //   },
    //   {
    //     title: 'kunjungan Mitra',
    //     path: '/dashboard/kunjungan-mitra',
    //     icon: getIcon('eva:corner-up-right-outline'),
    //   },
    
      {
        title: 'report',
        path: '/dashboard/reportkordinator',
        icon: getIcon('eva:archive-outline'),
      },
    //   {
    //     title: 'report mayora',
    //     path: '/dashboard/report_mayora',
    //     icon: getIcon('eva:archive-outline'),
    //   },
    //   {
    //     title: 'export data',
    //     path: '/dashboard/export-data',
    //     icon: getIcon('eva:archive-outline'),
    //   },
    ]
  },

];

export default navConfigfas;
