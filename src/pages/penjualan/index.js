import { Button, Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { GET_SU_PEMBELIAN, GET_SU_PENJUALAN } from 'src/api/dashboard';
import { fRupiah, ribuan } from 'src/utils/formatNumber';
import { ADD_PEMBELI, DELETE_PEMBELI, GET_ALL_PEMBELI, UPDATE_PEMBELI } from '../../api/pembeli';
import DialogConfirm from '../../components/DialogConfirm';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
  {
    id: 'Mitra',
    numeric: false,
    disablePadding: true,
    label: 'Mitra',
  },
  {
    id: 'Pembeli',
    numeric: false,
    disablePadding: true,
    label: 'Pembeli',
  },
  {
    id: 'TOTAL_BERAT',
    numeric: false,
    disablePadding: true,
    label: 'TOTAL_BERAT',
  },
  {
    id: 'TOTAL_PEMBELIAN',
    numeric: false,
    disablePadding: true,
    label: 'TOTAL_PEMBELIAN',
  },
  {
    id: 'TANGGAL_PEMBELIAN',
    numeric: false,
    disablePadding: true,
    label: 'TANGGAL_PEMBELIAN',
  },
  {
    id: 'TANGGAL_PEMBUATAN',
    numeric: false,
    disablePadding: true,
    label: 'TANGGAL_PEMBUATAN',
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
  const { data, isLoading, refetch } = useQuery('GET_ALL_PENJUALAN', () => GET_SU_PENJUALAN(null));
  const { enqueueSnackbar } = useSnackbar();

  const rows = data && data?.data?.data?.data;


  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
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

  const deleteMutation = useMutation((params) => DELETE_PEMBELI(params.id), {
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
    const response = await ADD_PEMBELI(data);
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
    const response = await UPDATE_PEMBELI(data, id);
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
    deleteMutation.mutate({ id: itemSelected.pembeliCode });
  };
  const handleConfirm = async () => {
    await onDelete();
  };

  const actionOpen = Boolean(anchorEl);
  const processing = loading || isLoading || deleteMutation.isLoading;
  return (
    <Page title="Pembeli">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Penjualan Bahan DUP
          </Typography>
          {/* )} */}
        </Stack>

        <Card>
          {list &&
            TableComponent(
              list?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                    <TableCell>{row?.no}</TableCell>  <TableCell id={labelId} scope="row">
                    {row?.mitra?.nama}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                    {row?.pembeli?.pembeli}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                    {ribuan(row?.totalBerat)}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                    {fRupiah(row?.totalHarga)}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                    {format(new Date(row?.createAt) , "yyyy-MM-dd HH:mm")}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                    {format(new Date(row?.updateAt) , "yyyy-MM-dd HH:mm")}
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
          handleEdit={handleEdit}
          handelDelete={() => handleAlertOpen('Apakah yakin mau delete')}
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
