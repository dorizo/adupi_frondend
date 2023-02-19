import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GET_REPORT_MITRA_BY_DATE } from '../../api/report';
import Label from '../../components/Label';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import { fDateSuffix } from '../../utils/formatTime';
import PenjualanPerMitraPerbulanLine from '../ReportMayora/Chart/PenjualanPerMitraPerbulanLine';
import PembelianPerMitraPerbulanline from '../ReportMayora/Chart/PembelianPerMitraPerbulanline';
import Action from './Action';
import LuasGudangPerbulan from './Chart/LuasGudangPerbulan';
import PekerjaPerbulan from './Chart/PekerjaPerbulan';
import PembelianMitraPerbulan from './Chart/PembelianMitraPerbulan';
import PembelianMitraPerJenis from './Chart/PembelianMitraPerJenis';
import PembelianMitraPerKategori from './Chart/PembelianMitraPerKategori';
import PenjualanMitraPerbulan from './Chart/PenjualanMitraPerbulan';
import PenjualanMitraPerbulanPabrik from './Chart/PenjualanMitraPerbulanPabrik';
import PenjualanMitraPerJenis from './Chart/PenjualanMitraPerJenis';
import PenjualanMitraPerKategori from './Chart/PenjualanMitraPerKategori';
import PenjualanPerMitraPerbulanPabrik from './Chart/PenjualanPerMitraPerbulanPabrik';
import TotalMitravsJumlahPembelian from './Chart/TotalMitravsJumlahPembelian';
import Totalcontinuevspembelian from './Chart/Totalcontinuemitravspembelian';
import TotalMitravsJumlahPenjualan from './Chart/TotalMitravsJumlahPenjualan';
import Totalcontinuevspenjualan from './Chart/Totalcontinuemitravspenjualan';
import MasalahmitraPerbulanline from '../ReportMayora/Chart/MasalahmitraPerbulanline';
import PenjualanPerMitraPerbulanLineContinue from '../ReportMayora/Chart/PenjualanPerMitraPerbulanLineContinue';
import PembelianPerMitraPerbulanLineContinue from '../ReportMayora/Chart/PembelianPerMitraPerbulanlineContinue';
import useAuth from 'src/hooks/useAuth';
import { GET_ALL_FASILITATOR } from 'src/api/fasilitator';

const headCells = [
  {
    id: 'nama',
    numeric: false,
    disablePadding: true,
    label: 'Nama',
  },
  {
    id: 'nik',
    numeric: false,
    disablePadding: true,
    label: 'NIK',
  },

  {
    id: 'alamat',
    numeric: false,
    disablePadding: true,
    label: 'Alamat',
  },
  {
    id: 'totalBeliSampah',
    numeric: false,
    disablePadding: true,
    label: 'Total Beli',
  },
  {
    id: 'totalJualSampah',
    numeric: false,
    disablePadding: true,
    label: 'Total Jual',
  },
  {
    id: 'totalMesin',
    numeric: false,
    disablePadding: true,
    label: 'Total Mesin',
  },
  {
    id: 'Masalah',
    numeric: false,
    disablePadding: true,
    label: 'Masalah',
  },
];
const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const startInit = new Date(y, m, 1);
const endInit = new Date(y, m + 1, 0);

const chartOpton = [
  {
    component: <TotalMitravsJumlahPembelian />,
    title: 'Akumulasi total mitra vs laju koleksi pembelian perbulan',
  },
  {
    component: <Totalcontinuevspembelian />,
    title: 'Akumulasi total mitra vs laju total volume pembelian perbulan',
  },
  
  {
    component: <TotalMitravsJumlahPenjualan />,
    title: 'Akumulasi total mitra vs laju koleksi penjualan perbulan',
  },
  {
    component: <Totalcontinuevspenjualan />,
    title: 'Akumulasi total mitra vs laju total volume penjualan perbulan',
  },
  {
    component: <LuasGudangPerbulan />,
    title: 'Luas Gudang Perbulan',
  },
  {
    component: <PekerjaPerbulan />,
    title: 'Pekerja Perbulan',
  },
  {
    component: <PembelianMitraPerbulan />,
    title: 'Pembelian Mitra Perbulan',
  },
  {
    component: <PenjualanMitraPerbulan />,
    title: 'Penjualan Mitra Perbulan',
  },
  {
    component: <PenjualanPerMitraPerbulanLine />,
    title: 'Penjualan Per Mitra Perbulan',
  },
  {
    component: <PenjualanPerMitraPerbulanLineContinue />,
    title: 'Penjualan Per Mitra Perbulan Continue',
  },
  
  {
    component: <PembelianPerMitraPerbulanLineContinue />,
    title: 'Pembelian Per Mitra Perbulan Continue',
  },
  
  {
    component: <PembelianPerMitraPerbulanline />,
    title: 'Pembelian Per Mitra Perbulan',
  },
  {
    component: <PenjualanMitraPerbulanPabrik />,
    title: 'Penjualan Mitra Perbulan Pabrik',
  },
  {
    component: <PenjualanPerMitraPerbulanPabrik />,
    title: 'Penjualan Per Mitra Perbulan Pabrik',
  },
  // {
  //   component: <MasalahMitraPerbulan />,
  //   title: 'Masalah Mitra Perbulan',
  // },
  {
    component: <MasalahmitraPerbulanline />,
    title: 'Masalah Mitra Perbulan ',
  },
  // {
  //   component: <MasalahPerMitraPerbulan />,
  //   title: 'Masalah PerMitra Perbulan',
  // },
  {
    component: <PembelianMitraPerKategori />,
    title: 'Pembelian Mitra Per Kategori',
  },
  {
    component: <PenjualanMitraPerKategori />,
    title: 'Penjualan Mitra Per Kategori',
  },
  {
    component: <PembelianMitraPerJenis />,
    title: 'Pembelian Mitra Per Jenis',
  },
  {
    component: <PenjualanMitraPerJenis />,
    title: 'Penjualan Mitra Per Jenis',
  },
  // {
  //   component: <PembelianPerMitra />,
  //   title: 'Analisis Pembelian Per Mitra',
  // },
  // {
  //   component: <PembelianPerPekerja />,
  //   title: 'Analisis Pembelian Per Pekerja',
  // },
  // {
  //   component: <PembelianPerLuas />,
  //   title: 'Analisis Pembelian Per Luas',
  // },
];

export default function Reportfasilitator() {
  
  const [kordinatorval, setKordinatorval] = React.useState(sessionStorage.getItem("kordinator"));
  const fixedOptions = [chartOpton[6]];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [start, setStart] = React.useState(startInit);
  const [end, setEnd] = React.useState(endInit);
  const [showChart, setShowChart] = React.useState([...fixedOptions]);
  const [itemSelected, setItemSelected] = React.useState(null);
  
  const { auth } = useAuth();
  const { data, isLoading, refetch } = useQuery(
    'GET_REPORT_MITRA_BY_DATE',
    () => GET_REPORT_MITRA_BY_DATE(fDateSuffix(start), fDateSuffix(end)),
    {
      retry: false,
    }
  );
  const navigate = useNavigate();
  const rows = data && data?.data?.data;
  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleDetail = () => {
    navigate(`/dashboard/report/detail/${itemSelected.mitraCode}`);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  const selectkordinator = (event) =>{
    setKordinatorval(event.target.value);
    sessionStorage.setItem("kordinator",event.target.value);
  }
  const actionOpen = Boolean(anchorEl);
  // if(auth.role=="Fasilitator"){
  //   console.log(auth.role);
  //   sessionStorage.setItem("kordinator", auth.user);
  // }
  const { data:datafasilitator, isLoading:loadingfasilitator, refetch : refetchfasilitatotr } = useQuery('GET_ALL_FASILITATOR', GET_ALL_FASILITATOR);
  
  console.log(datafasilitator);
  return (
    <Page title="Report">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report Kordinator
            {sessionStorage.getItem("kordinator")}
          </Typography>
        </Stack>
        <Card  style={{ marginBottom: 10 }}>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={kordinatorval}
            onChange={selectkordinator}
          >
            {datafasilitator?.data?.data?.map((dataaller, index) => (  
                <MenuItem MenuItem value={dataaller?.fasilitatorCode}>{dataaller?.nama}</MenuItem>
            ))}
          </Select>
        </Card>
        <Card style={{ marginBottom: 10 }}>
       
          <CardContent>
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              value={showChart}
              onChange={(event, newValue) => {
                setShowChart([...newValue]);
              }}
              options={chartOpton}
              getOptionLabel={(option) => option.title}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => <Chip key={index} label={option.title} {...getTagProps({ index })} />)
              }
              renderInput={(params) => <TextField {...params} label="Pilih chart" placeholder="Chart Lainnya" />}
            />
          </CardContent>
        </Card>

        <Grid container spacing={1} style={{ marginBottom: 10 }}>
          {showChart?.map((a, i) => {
            if (i + 1 === showChart.length && showChart.length % 2 !== 0) {
              return (
                <Grid key={i} item xs={12} sm={12}>
                  <Card>
                    <CardContent>{a.component}</CardContent>
                  </Card>
                </Grid>
              );
            }
            return (
              <Grid key={i} item xs={12} sm={6}>
                <Card>
                  <CardContent>{a.component}</CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {actionOpen && (
        <Action
          actionOpen={actionOpen}
          handleDetail={handleDetail}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      )}
    </Page>
  );
}
