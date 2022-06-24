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
import Action from './Action';
import LuasGudangPerbulan from './Chart/LuasGudangPerbulan';
import MasalahMitraPerbulan from './Chart/MasalahMitraPerbulan';
import MasalahPerMitraPerbulan from './Chart/MasalahPerMitraPerbulan';
import PekerjaPerbulan from './Chart/PekerjaPerbulan';
import PembelianMitraPerbulan from './Chart/PembelianMitraPerbulan';
import PembelianMitraPerKategori from './Chart/PembelianMitraPerKategori';
import PembelianPerLuas from './Chart/PembelianPerLuas';
import PembelianPerMitra from './Chart/PembelianPerMitra';
import PembelianPerMitraPerbulan from './Chart/PembelianPerMitraPerbulan';
import PembelianPerPekerja from './Chart/PembelianPerPekerja';
import PenjualanMitraPerbulan from './Chart/PenjualanMitraPerbulan';
import PenjualanMitraPerbulanPabrik from './Chart/PenjualanMitraPerbulanPabrik';
import PenjualanMitraPerKategori from './Chart/PenjualanMitraPerKategori';
import PenjualanPerMitraPerbulan from './Chart/PenjualanPerMitraPerbulan';
import PenjualanPerMitraPerbulanPabrik from './Chart/PenjualanPerMitraPerbulanPabrik';

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
    component: <LuasGudangPerbulan />,
    title: 'LuasGudangPerbulan',
  },
  {
    component: <PekerjaPerbulan />,
    title: 'PekerjaPerbulan',
  },
  {
    component: <PembelianMitraPerbulan />,
    title: 'PembelianMitraPerbulan',
  },
  {
    component: <PenjualanMitraPerbulan />,
    title: 'PenjualanMitraPerbulan',
  },
  {
    component: <PenjualanPerMitraPerbulan />,
    title: 'PenjualanPerMitraPerbulan',
  },
  {
    component: <PembelianPerMitraPerbulan />,
    title: 'PembelianPerMitraPerbulan',
  },
  {
    component: <PenjualanMitraPerbulanPabrik />,
    title: 'PenjualanMitraPerbulanPabrik',
  },
  {
    component: <PenjualanPerMitraPerbulanPabrik />,
    title: 'PenjualanPerMitraPerbulanPabrik',
  },
  {
    component: <MasalahMitraPerbulan />,
    title: 'MasalahMitraPerbulan',
  },
  {
    component: <MasalahPerMitraPerbulan />,
    title: 'MasalahPerMitraPerbulan',
  },
  {
    component: <PembelianMitraPerKategori />,
    title: 'PembelianMitraPerKategori',
  },
  {
    component: <PenjualanMitraPerKategori />,
    title: 'PenjualanMitraPerKategori',
  },
  {
    component: <PembelianPerMitra />,
    title: 'AnalisisPembelianPerMitra',
  },
  {
    component: <PembelianPerPekerja />,
    title: 'AnalisisPembelianPerPekerja',
  },
  {
    component: <PembelianPerLuas />,
    title: 'AnalisisPembelianPerLuas',
  },
];

export default function Report() {
  const fixedOptions = [chartOpton[1]];
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
                setShowChart([...fixedOptions, ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)]);
              }}
              options={chartOpton}
              getOptionLabel={(option) => option.title}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    key={index}
                    label={option.title}
                    {...getTagProps({ index })}
                    disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
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
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Box>
                <DesktopDatePicker
                  label="Dari"
                  inputFormat="dd/MM/yyyy"
                  value={start}
                  onChange={(_, newVal) => setStart(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Sampai"
                  inputFormat="dd/MM/yyyy"
                  value={end}
                  onChange={(_, newVal) => setEnd(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Button
                onClick={() => refetch(fDateSuffix(start), fDateSuffix(end))}
                size="large"
                variant="contained"
                color="primary"
              >
                Filter
              </Button>
            </Stack>
          </CardContent>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nama}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nik}
                    </TableCell>

                    <TableCell id={labelId} scope="row">
                      {row.alamat}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.totalBeliSampah}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.totalJualSampah}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.totalMesin}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      <Label variant="ghost" color={'warning'}>
                        Proses : {row.totalMasalahProses}
                      </Label>
                      <br />
                      <Label variant="ghost" color={'success'}>
                        Selesa : {row.totalMasalahSelesai}
                      </Label>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
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
