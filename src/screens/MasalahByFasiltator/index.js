import { Box, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TidakAdaData from '../../components/TidakAdaData';
import {
  ADD_MASALAH,
  CHANGE_STATUS_MASALAH,
  CHANGE_STATUS_MASALAHbyfasilitator,
  DELETE_MASALAH,
  GET_ALL_MASALAH_BY_MITRA,
  UPDATE_MASALAH,
} from '../../api/masalah';
import dummyMasalah from '../../assets/dummy-masalah.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import DialogConfirm from '../../components/DialogConfirm';
import Image from '../../components/Image';
import useDrawer from '../../hooks/useDrawer';
import { fDatesend, fDateSuffix, fDateTime, fDatetimework } from '../../utils/formatTime';
import Form from './form';
import MoreMenu from './MoreMenu';
import LoadingCard from '../../components/LoadingCard';
import useAuth from 'src/hooks/useAuth';
import { DatePicker } from '@mui/x-date-pickers';

export default function MasalahByFasilitator() {
  const params = useParams();
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
  const [datePickerValue, setDatePickerValue] = useState();
  const [masalahCodeedit, setmasalahCodeedit] = useState();

  const { data, refetch, isLoading } = useQuery(
    ['GET_ALL_MASALAH', params.mitraCode],
    () => GET_ALL_MASALAH_BY_MITRA(params?.mitraCode),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleAdd = async () => {
    setLoading(true);
    //     const response = await ADD_MASALAH({ ...values, foto: '-' });
    const response = await ADD_MASALAH({ ...values, foto: selectedImg });
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
  };

  const handleOnAdd = () => {
    setDrawerTitle('Tambah Masalah');
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
  const list = data && data?.data?.data;

  const [open, setOpen] = useState(false);

  const handleClickOpen = (a) => (event) => {
    console.log(a);
    setmasalahCodeedit(a?.masalahCode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitmasalah = async (event) => {
    if(datePickerValue){
      console.log(fDatesend(datePickerValue));
      // console.log(masalahCodeedit);
      const response = await CHANGE_STATUS_MASALAHbyfasilitator({masalahCode : masalahCodeedit , status : "selesai",updateAt:fDatesend(datePickerValue)});
      refetch();
      setOpen(false);
    }else{
      alert("MOHON ISI TANGGAL SELESAI MASALAH");
    }
    

  }

  return (
    <>
      <BarMobile title={'Masalah Mitra'} />
      <AdupiXLeMineraleHead />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
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
                  <Grid item xs={9}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Deskripsi :{' '}
                    </Typography>
                    <Typography variant="caption">{li?.deskripsi}</Typography>
                    <br />
                    <Typography variant="caption">Mulai : {fDateTime(li?.createAt)}</Typography><br />
                    <Typography variant="caption">Terselesaikan : {li?.updateAt?fDateTime(li?.updateAt):"-"}</Typography><br />
                    
                    <Button variant="outlined" onClick={handleClickOpen(li)}>
                      Selesaikan
                    </Button>
                  
                  </Grid>
                  <Grid item xs={3}>
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
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Selesaikan Masalah"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          <Stack spacing={2}>
                  <DatePicker
                    name="updateAt"
                    value={datePickerValue}
                    onChange={(newValue) => setDatePickerValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Button  type="submit" onClick={submitmasalah} variant="contained">Simpan</Button>
              </Stack>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
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
