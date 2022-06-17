import { DateRangePicker } from '@mui/lab';
import { Box, Button, Card, CardContent, Container, Stack, TableCell, TableRow, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Label from '../../components/Label';
import { GET_REPORT_MITRA_BY_DATE } from '../../api/report';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import { fDateSuffix } from '../../utils/formatTime';
import Action from './Action';

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

export default function Report() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [start, setStart] = React.useState(startInit);
  const [end, setEnd] = React.useState(endInit);
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

        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Box>
                <DesktopDatePicker
                  label="Dari"
                  inputFormat="dd/MM/yyyy"
                  value={start}
                  onChange={(newVal) => setStart(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Sampai"
                  inputFormat="dd/MM/yyyy"
                  value={end}
                  onChange={(newVal) => setEnd(newVal)}
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
