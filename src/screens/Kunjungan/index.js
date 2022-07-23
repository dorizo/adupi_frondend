import { Card, CardContent, CardHeader, Grid, TablePagination, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQuery } from 'react-query';
import TidakAdaData from '../../components/TidakAdaData';
import { ADD_KUNJUNGAN, DELETE_KUNJUNGAN, GET_ALL_KUNJUNGAN, UPDATE_KUNJUNGAN } from '../../api/kunjungan';
import { GET_MITRA_ALL_BY_FASILITATOR } from '../../api/mitra';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import useDrawer from '../../hooks/useDrawer';
import { fDateTime } from '../../utils/formatTime';
import Form from './form';
import MoreMenu from './MoreMenu';
import LoadingCard from '../../components/LoadingCard';

export default function Kunjungan() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const { data, refetch, isLoading } = useQuery('GET_ALL_KUNJUNGAN', GET_ALL_KUNJUNGAN, {
    refetchOnWindowFocus: false,
  });
  const { data: dataMitra } = useQuery('GET_MITRA_ALL_BY_FASILITATOR', GET_MITRA_ALL_BY_FASILITATOR, {
    refetchOnWindowFocus: false,
  });

  const mitra =
    dataMitra &&
    dataMitra?.data?.data?.map((g) => {
      return { value: g?.mitraCode, label: g?.nama };
    });

  const handleAdd = async (value) => {
    setLoading(true);
    // const response = await ADD_KUNJUNGAN({ ...values, foto: '-' });
    const response = await ADD_KUNJUNGAN(value);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setStep(0);
    onClose();
    setLoading(false);
  };
  const handleUpdate = async (value) => {
    setLoading(true);
    const response = await UPDATE_KUNJUNGAN(value, item.kunjunganCode);
    // const response = await UPDATE_KUNJUNGAN({ ...values, ktp: selectedImg }, item.kunjunganCode);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setStep(0);
    setItem(null);
    onClose();
    setLoading(false);
  };
  const handleDelete = async () => {
    setLoading(true);
    const response = await DELETE_KUNJUNGAN(item.kunjunganCode);
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setItem(null);
    setLoading(false);
    setAlertOpen(false);
  };

  const handleOnUpdate = (item) => {
    setItem(item);
    setStep(0);
    setDrawerTitle('Edit kunjungan');
    onOpen();
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah kunjungan');
    onOpen();
    setStep(0);
    setItem(null);
  };
  const handleOnDelete = (item) => {
    setItem(item);
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    setItem(null);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  function stableSort(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (query) {
      const column = array[0] && Object.keys(array[0]);
      return array.filter((a) =>
        column.some((col) => a[col] && a[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const ll = data && data?.data?.data;
  const list = ll ? stableSort(ll, search).slice(page * size, page * size + size) : [];

  return (
    <>
      <BarMobile title={'Kunjungan'} />
      <AdupiXLeMineraleHead />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Kunjungan
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Tambah kunjungan'} />
      </div>
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Cari ..."
          sx={{ marginBottom: 2 }}
        />
        {isLoading && <LoadingCard />}

        {list && list?.length === 0 && <TidakAdaData />}

        {list &&
          list.map((m, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={<MoreMenu handleOnUpdate={() => handleOnUpdate(m)} handleOnDelete={() => handleOnDelete(m)} />}
                title={m?.judul}
                subheader={`Tanggal :  ${fDateTime(m?.createAt)}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 10 }}>Deskripsi : {m?.deskripsi} </Typography>
                    <Typography sx={{ fontSize: 10 }}>Mitra : </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={ll && ll.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <Drawer title={drawerTitle}>
        <Form isLoading={loading} mitra={mitra} item={item} step={step} handleAdd={handleAdd} onUpdate={handleUpdate} />
      </Drawer>
      {alertOpen && (
        <DialogConfirm
          processing={loading}
          alertClose={handleAlertClose}
          alertOpen={alertOpen}
          handleConfirm={handleDelete}
          text={'Yakin Ingin Hapus'}
        />
      )}
    </>
  );
}
