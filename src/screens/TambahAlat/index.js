import { Box, Card, CardContent, CardHeader, Grid, TablePagination, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ADD_MESIN, DELETE_MESIN, GET_ALL_MESIN_MITRA, UPDATE_MESIN } from '../../api/mesin';
import dummybarang from '../../assets/dummy-barang.jpg';
import alat from '../../assets/illustation/recyle.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import Image from '../../components/Image';
import LoadingCard from '../../components/LoadingCard';
import TidakAdaData from '../../components/TidakAdaData';
import useAuth from '../../hooks/useAuth';
import useDrawer from '../../hooks/useDrawer';
import { fDateTime } from '../../utils/formatTime';
import Form from './form';
import MoreMenu from './MoreMenu';

export default function TambahAlat() {
  const { auth } = useAuth();
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(5);
  const [prosessinput, setprosessinput] = useState(0);
  const { data, refetch, isLoading } = useQuery(
    'GET_ALL_MESIN_MITRA',
    () => GET_ALL_MESIN_MITRA(auth?.mitra?.mitraCode),
    {
      refetchOnWindowFocus: false,
    }
  );

  const gudang = auth?.mitra?.gudang?.map((g) => {
    return { value: g?.usahaCode, label: g?.namaUsaha };
  });

  const handleAdd = async () => {
    setLoading(true);
    // const response = await ADD_MESIN({ ...values, foto: '-' });
    const response = await ADD_MESIN({ ...values, foto: selectedImg } ,setprosessinput);
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
  const handleUpdate = async () => {
    setLoading(true);
    const response = await UPDATE_MESIN({ ...values, foto: selectedImg }, item.mesinCode);
    // const response = await UPDATE_MESIN({ ...values, ktp: selectedImg }, item.mesinCode);
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
    const response = await DELETE_MESIN(item.mesinCode);
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

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
  };
  const handleOnUpdate = (item) => {
    setItem(item);
    setStep(0);
    setSelectedImg(item.ktp);
    setDrawerTitle('Edit alat');
    onOpen();
    setprosessinput(0);
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah alat');
    onOpen();
    setStep(0);
    setItem(null);
    setprosessinput(0);
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
      <BarMobile title={'Tambah Alat'} />
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" width="100%" src={alat} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Tambah
        </Typography>
        <Typography align="center" variant="h2">
          Alat
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Tambah Alat'} />
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
                title={m?.jenisMesin}
                subheader={`Tanggal :  ${fDateTime(m?.createAt)}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 12 }}>{m?.jenisMesin}</Typography>
                    <Typography sx={{ fontSize: 10 }}>Status : {m?.statusKepemilikanMesin}</Typography>
                    <Typography sx={{ fontSize: 10 }}>Kapasitas : {m?.kapasitas}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Image
                        style={{ width: 100 }}
                        src={m?.foto}
                        alt={`img-barang`}
                        folder="mesin"
                        dummy={dummybarang}
                      />
                    </Box>
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
        <Form
          isLoading={loading}
          gudang={gudang}
          item={item}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          handleAdd={handleAdd}
          onUpdate={handleUpdate}
          setValues={setValues}
          prosessinput={prosessinput}
        />
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
