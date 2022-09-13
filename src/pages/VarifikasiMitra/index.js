import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AKTIFASI_AKUN_MITRA, GET_MITRA_ALL_BY_SU_NO } from '../../api/mitra';
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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertText, setAlertText] = React.useState('Yakin Ingin Verifikasi?');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  //   const { checkPermision } = useMee();
  const { data, isLoading, refetch } = useQuery('GET_MITRA_ALL_BY_SU_NO', GET_MITRA_ALL_BY_SU_NO);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const rows = data && data?.data?.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
  // HANDLE ACTION
  const handleDetail = () => {
    console.log(itemSelected);
    navigate(`/dashboard/mitra/detail/${itemSelected.mitraCode}`);
  };
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  const handleAlertClose = () => {
    setAlertText('');
    setAlertOpen(false);
  };

  const handleConfirm = async () => {
    await handleVerifikasi();
  };

  const handleVerifikasi = async () => {
    setLoading(true);
    const response = await AKTIFASI_AKUN_MITRA({ mitraCode: itemSelected.mitraCode, roleCode: '3' });

    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 404) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setLoading(false);
    handleAlertClose();
    handleActionClose();
  };
  const actionOpen = Boolean(anchorEl);
  const processing = loading || isLoading;
  return (
    <Page title="Verifikasi Mitra">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Verifikasi Mitra
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
      {dialogOpen && (
        <DialogComponent
          processing={processing}
          onClose={() => setDialogOpen(false)}
          item={itemSelected}
          open={dialogOpen}
        />
      )}
      {actionOpen && (
        <Action
          actionOpen={actionOpen}
          handleVerifikasi={() => setAlertOpen(true)}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
          handleDetail={handleDetail}
        />
      )}
      {alertOpen && (
        <DialogConfirm
          processing={processing}
          alertClose={handleAlertClose}
          alertOpen={alertOpen}
          handleConfirm={handleConfirm}
          text={alertText}
        />
      )}
    </Page>
  );
}
