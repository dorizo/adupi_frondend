import { Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { ADD_JENIS_SAMPAH, DELETE_JENIS_SAMPAH, UPDATE_JENIS_SAMPAH } from '../../api/jenis_sampah';
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
  const [alertText, setAlertText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  //   const { checkPermision } = useMee();
  const { data, isLoading, refetch } = useQuery('GET_MITRA_ALL_BY_SU_NO', GET_MITRA_ALL_BY_SU_NO);
  const { enqueueSnackbar } = useSnackbar();

  const rows = data && data.data.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows,
    loading: isLoading,
  });
  // HANDLE ACTION
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  // HANDLE MODAL
  const handleEdit = () => {
    setDialogOpen(true);
  };

  // HANDLE ALERT
  const handleAlertOpen = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertText('');
    setAlertOpen(false);
  };

  const deleteMutation = useMutation((params) => DELETE_JENIS_SAMPAH(params.id), {
    onSuccess: async (res) => {
      const variant = res.status === 200 ? 'success' : 'warning';
      await enqueueSnackbar(res.data.message, { variant });
      await refetch();
      handleActionClose();
      handleAlertClose();
      setItemSelected(null);
    },
    onError: async (e) => {
      await enqueueSnackbar(e.message, 'error');
    },
  });
  // HANDLE ACTION
  const onAdd = async (data, callbackSetError) => {
    setLoading(true);
    const response = await ADD_JENIS_SAMPAH(data);
    if (response.status === 400) {
      callbackSetError(response.data.error.form);
    }
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await refetch();
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setDialogOpen(false);
      handleActionClose();
    }
    await setLoading(false);
  };
  const onUpdate = async (data, id, callbackSetError) => {
    setLoading(true);
    const response = await UPDATE_JENIS_SAMPAH(data, id);
    if (response.data.status === 400) {
      callbackSetError(response.data.error.form);
    }
    if (response.data.status === 200) {
      await refetch();
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      handleActionClose();
      setDialogOpen(false);
      setItemSelected(null);
    }
    await setLoading(false);
  };
  const onDelete = async () => {
    deleteMutation.mutate({ id: itemSelected.jsCode });
  };
  const handleConfirm = async () => {
    await onDelete();
  };

  const handleVerifikasi = async () => {
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
  };
  const actionOpen = Boolean(anchorEl);
  const processing = loading || isLoading || deleteMutation.isLoading;
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
      {dialogOpen && (
        <DialogComponent
          processing={processing}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onClose={() => setDialogOpen(false)}
          item={itemSelected}
          open={dialogOpen}
        />
      )}
      {actionOpen && (
        <Action
          actionOpen={actionOpen}
          handleVerifikasi={handleVerifikasi}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
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
