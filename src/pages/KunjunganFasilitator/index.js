import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { fDateTime } from '../../utils/formatTime';
import { GET_ALL_KUNJUNGAN } from '../../api/kunjungan';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';

const headCells = [
  {
    id: 'nama',
    numeric: false,
    disablePadding: true,
    label: 'Nama Fasilitator',
  },
  {
    id: 'mitra',
    numeric: false,
    disablePadding: true,
    label: 'Mitra',
  },
  {
    id: 'judul',
    numeric: false,
    disablePadding: true,
    label: 'Judul',
  },
  {
    id: 'descripsi',
    numeric: false,
    disablePadding: true,
    label: 'Deskripsi',
  },
  {
    id: 'tanggal',
    numeric: false,
    disablePadding: true,
    label: 'Tanggal',
  },
];

export default function KunjunganFasilitator() {
  const { data, isLoading } = useQuery('GET_ALL_KUNJUNGAN', GET_ALL_KUNJUNGAN);

  const rows = data && data?.data?.data;

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
            Kunjungan Fasilitator
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
                      {row?.namaFasilitator}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row?.namaMitra}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.judul}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.deskripsi}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {fDateTime(row.createAt)}
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
