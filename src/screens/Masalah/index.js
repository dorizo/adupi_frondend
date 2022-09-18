import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fDateTime } from '../../utils/formatTime';
import { ADD_MASALAH, CHANGE_STATUS_MASALAH, DELETE_MASALAH, GET_ALL_MASALAH, UPDATE_MASALAH } from '../../api/masalah';
import dummyMasalah from '../../assets/dummy-masalah.png';
import masalah from '../../assets/illustation/masalah.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import DialogConfirm from '../../components/DialogConfirm';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';
import MoreMenu from './MoreMenu';
import Image from '../../components/Image';
import TidakAdaData from '../../components/TidakAdaData';
import LoadingCard from '../../components/LoadingCard';

export default function Masalah() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [prosessinput, setprosessinput] = useState(0);
  const { data, refetch, isLoading } = useQuery('GET_ALL_MASALAH', GET_ALL_MASALAH, {
    refetchOnWindowFocus: false,
  });

  const handleAdd = async () => {
    setLoading(true);
    //     const response = await ADD_MASALAH({ ...values, foto: '-' });
    const response = await ADD_MASALAH({ ...values, foto: selectedImg } ,setprosessinput);
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
    // const response = await UPDATE_MASALAH({ ...values, foto: '-' }, item.masalahCode);
    const response = await UPDATE_MASALAH({ ...values, foto: selectedImg }, item.masalahCode);
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
    const response = await DELETE_MASALAH(item.masalahCode);
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
  const handleChangeStatus = async (id) => {
    setLoading(true);
    const response = await CHANGE_STATUS_MASALAH(id);
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
    setLoading(false);
  };

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
  };
  const handleOnUpdate = (item) => {
    setItem(item);
    setStep(0);
    setSelectedImg(item.ktp);
    setDrawerTitle('Edit Masalah');
    onOpen();
    setprosessinput(0);
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah Masalah');
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
      <BarMobile title={'Masalah'} />
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" width="100%" src={masalah} />
      <div style={{ marginTop: 5, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Laporkan
        </Typography>
        <Typography align="center" variant="h2">
          Masalah
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Tambah'} />
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
          list.map((li, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={
                  <MoreMenu handleOnUpdate={() => handleOnUpdate(li)} handleOnDelete={() => handleOnDelete(li)} />
                }
                title={li?.jenisMasalah}
                subheader={
                  <Chip label={li?.status} color={li?.status === 'Dalam peninjauan' ? 'warning' : 'success'} />
                }
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Deskripsi :{' '}
                    </Typography>
                    <Typography variant="caption">{li?.deskripsi}</Typography>
                    <br />
                    <Typography variant="caption">Mulai : {fDateTime(li?.createAt)}</Typography><br />
                    <Typography variant="caption">Terselesaikan : {li?.updateAt?fDateTime(li?.updateAt):"-"}</Typography>
                 
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Image
                        style={{ width: 100 }}
                        src={li?.foto}
                        dummy={dummyMasalah}
                        folder="masalah"
                        alt={`img-masalah`}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                     
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
          item={item}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          isLoading={loading}
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
