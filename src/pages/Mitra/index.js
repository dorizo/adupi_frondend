import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
// import { useMee } from 'contexts/MeContext';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { ADD_JENIS_SAMPAH, DELETE_JENIS_SAMPAH, UPDATE_JENIS_SAMPAH } from '../../api/jenis_sampah';
import { GET_MITRA_ALL_BY_SU_YES } from '../../api/mitra';
import DialogConfirm from '../../components/DialogConfirm';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

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
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  //   const { checkPermision } = useMee();
  const { data, isLoading } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const rows = data && data.data.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows,
    loading: isLoading,
  });
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleDetail = () => {
    navigate(`/dashboard/mitra/${itemSelected.mitraCode}`);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  const actionOpen = Boolean(anchorEl);
  const processing = loading || isLoading;
  return (
    <Page title="Mitra">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mitra
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
                      {row.nama}
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
          actionOpen={actionOpen}
          handleDetail={handleDetail}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      )}
    </Page>
  );
}
