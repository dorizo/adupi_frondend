import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GET_MITRA_ALL_BY_SU_YES } from '../../api/mitra';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
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
    id: 'jenisKelamin',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Kelamin',
  },
  {
    id: 'tanggalLahir',
    numeric: false,
    disablePadding: true,
    label: 'Tanggal Lahir',
  },
  {
    id: 'tempatLahir',
    numeric: false,
    disablePadding: true,
    label: 'Tempat Lahir',
  },
  {
    id: 'alamat',
    numeric: false,
    disablePadding: true,
    label: 'Alamat',
  },
];

export default function Index() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  const { data, isLoading } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
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
    navigate(`/dashboard/mitra/detail/${itemSelected.mitraCode}`);
  };
  const handleVerifAnggota = () => {
    navigate(`/dashboard/mitra/anggota/${itemSelected.mitraCode}`);
  };
  const handleMasalah = () => {
    navigate(`/dashboard/mitra/masalah/${itemSelected.mitraCode}`);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    navigate(`/dashboard/mitra/edit/${itemSelected.mitraCode}`);
  };
  const actionOpen = Boolean(anchorEl);
  return (
    <Page title="Mitra">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            List Mitra
          </Typography>
        </Stack>

        <Card>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell id={labelId} scope="row">
                    {row?.usahas?.[0]?.namaUsaha}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nik}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.jenisKelamin}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.tanggalLahir}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.tempatLahir}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.alamat}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
      </Container>
      {actionOpen && (
        <Action
          handleVerifAnggota={handleVerifAnggota}
          handleMasalah={handleMasalah}
          handleEdit={handleEdit}
          actionOpen={actionOpen}
          handleDetail={handleDetail}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      )}
    </Page>
  );
}
