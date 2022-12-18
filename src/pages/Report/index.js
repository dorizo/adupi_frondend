import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
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
import MasalahMitraPerbulan from './Chart/MasalahMitraPerbulan';
import MasalahPerMitraPerbulan from './Chart/MasalahPerMitraPerbulan';
import PekerjaPerbulan from './Chart/PekerjaPerbulan';
import PembelianMitraPerbulan from './Chart/PembelianMitraPerbulan';
import PembelianMitraPerJenis from './Chart/PembelianMitraPerJenis';
import PembelianMitraPerKategori from './Chart/PembelianMitraPerKategori';
import PembelianPerLuas from './Chart/PembelianPerLuas';
import PembelianPerMitra from './Chart/PembelianPerMitra';
import PembelianPerMitraPerbulan from './Chart/PembelianPerMitraPerbulan';
import PembelianPerPekerja from './Chart/PembelianPerPekerja';
import PenjualanMitraPerbulan from './Chart/PenjualanMitraPerbulan';
import PenjualanMitraPerbulanPabrik from './Chart/PenjualanMitraPerbulanPabrik';
import PenjualanMitraPerJenis from './Chart/PenjualanMitraPerJenis';
import PenjualanMitraPerKategori from './Chart/PenjualanMitraPerKategori';
import PenjualanPerMitraPerbulan from './Chart/PenjualanPerMitraPerbulan';
import PenjualanPerMitraPerbulanPabrik from './Chart/PenjualanPerMitraPerbulanPabrik';
import TotalMitravsJumlahPembelian from './Chart/TotalMitravsJumlahPembelian';
import Totalcontinuevspembelian from './Chart/Totalcontinuemitravspembelian';

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
    title: 'Total Mitra vs Jumlah Pembelian Per Bulan Seluruh Mitra',
  },
  {
    component: <Totalcontinuevspembelian />,
    title: 'Total Mitra vs Jumlah Pembelian Continue Count',
  },
  {
    component: <LuasGudangPerbulan />,
    title: 'Luas Gudang Perbulan',
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
  {
    component: <MasalahMitraPerbulan />,
    title: 'Masalah Mitra Perbulan',
  },
  {
    component: <MasalahPerMitraPerbulan />,
    title: 'Masalah PerMitra Perbulan',
  },
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
  {
    component: <PembelianPerMitra />,
    title: 'Analisis Pembelian Per Mitra',
  },
  {
    component: <PembelianPerPekerja />,
    title: 'Analisis Pembelian Per Pekerja',
  },
  {
    component: <PembelianPerLuas />,
    title: 'Analisis Pembelian Per Luas',
  },
];

export default function Report() {
  const fixedOptions = [chartOpton[2]];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [start, setStart] = React.useState(startInit);
  const [end, setEnd] = React.useState(endInit);
  const [showChart, setShowChart] = React.useState([...fixedOptions]);
  const [itemSelected, setItemSelected] = React.useState(null);
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

  const actionOpen = Boolean(anchorEl);
  return (
    <Page title="Report">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report
          </Typography>
        </Stack>
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
