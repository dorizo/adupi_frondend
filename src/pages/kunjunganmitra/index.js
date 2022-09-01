import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { fDateTime } from '../../utils/formatTime';
import { GET_ALL_KUNJUNGAN, GET_ALL_KUNJUNGANMITRA } from '../../api/kunjungan';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';

const headCells = [
  
  {
    id: 'Nama Mitra',
    numeric: false,
    disablePadding: true,
    label: 'NAMA MITRA',
  },
  {
    id: 'Capaian',
    numeric: false,
    disablePadding: true,
    label: 'Capaian',
  },
  {
    id: 'rata2 pembelian',
    numeric: false,
    disablePadding: true,
    label: 'rata2 pembelian',
  },
  {
    id: 'pekerjan',
    numeric: false,
    disablePadding: true,
    label: 'Jumlah Pekerja',
  },
  {
    id: 'Masalah Mesin',
    numeric: false,
    disablePadding: true,
    label: 'Masalah Mesin',
  },
  {
    id: 'Pendampingan',
    numeric: false,
    disablePadding: true,
    label: 'pendampingan',
  },
];

export default function Kunjunganmitra() {
  const { data, isLoading } = useQuery('GET_ALL_KUNJUNGAN', GET_ALL_KUNJUNGANMITRA);

  const rows = data && data?.data?.data;

  console.log(rows);

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });

  return (
    <Page title="Kunjungan Fasilitator">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Kunjungan Fasilitator  Mitra
          </Typography>
        </Stack>

        <Card>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nama}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formCapaian}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formHargaPembelian}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formPekerja}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formJumlahMesin}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formPendampingan}
                    </TableCell>
                    
                  </TableRow>
                );
              })
            )}
        </Card>
      </Container>
    </Page>
  );
}
