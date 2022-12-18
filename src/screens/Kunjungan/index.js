import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Icon, TablePagination, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState ,useEffect } from 'react';
import { useQuery } from 'react-query';
import TidakAdaData from '../../components/TidakAdaData';
import { ADD_KUNJUNGAN, DELETE_KUNJUNGAN, GET_ALL_KUNJUNGAN, UPDATE_KUNJUNGAN ,ADD_KUNJUNGANIMAGE } from '../../api/kunjungan';
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
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ButtonUpload from 'src/components/Button/ButtonUpload';
import { LoadingButton } from '@mui/lab';
export default function Kunjungan() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(5);
  const [openmodal, setOpenmodal] = useState(false);
  const [Modalitems, setModalitems] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [loadingbutton ,setloadingbutton] = useState(true);
  const [progress ,setprogress] = useState(0);
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

    const imageupload = async (value) => {
        console.log(value);
        setModalitems(value);
        setOpenmodal(true);
        setSelectedImg("");
        setloadingbutton(false);
        setprogress(0);
    }
  const handleAdd = async (value) => {
    setLoading(true);
    // const response = await ADD_KUNJUNGAN({ ...values, foto: '-' });
    console.log(value);
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
    setDrawerTitle('CHECKOUT');
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

   

  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log("Latitude disni :", position.coords.latitude);
      if(lat){
        console.log("Longitude is :", lat);
     
      }else{
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
    
      }
      
    });    
  });
  const handleClose = () => {
    setOpenmodal(false);
  };


  
  const handleUploadClick = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
    setLoading(false);
    setloadingbutton(false);
  };
  const Uploadimagebase = async () => {
    setloadingbutton(true);
    const response = await ADD_KUNJUNGANIMAGE({idku:Modalitems.kunjunganCode , image:selectedImg , statusfoto:'non mitra'} ,setprogress);
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
      setOpenmodal(false);
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
  };
  return (
    <>
     <Dialog open={openmodal} onClose={handleClose}>
        <DialogTitle>{Modalitems?.judul}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {selectedImg && (
              <a style={{ width: '100%' }} role="button" tabIndex={0} >
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
          <ButtonUpload disabled={selectedImg} upload={handleUploadClick} component="label" label="Unggah File" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton loading={loadingbutton} onClick={Uploadimagebase}>Upload</LoadingButton>
          {progress===0?"":progress}
        </DialogActions>
      </Dialog>
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
                subheader={`Check In :  ${fDateTime(m?.createAt)}`}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 10 }}>Deskripsi : {m?.deskripsi} </Typography>
                  </Grid>
                  
                  
                  <Grid item xs={12}>
                  <Typography sx={{ fontSize: 14 }}>Check Out : {m?.updateAt?fDateTime(m?.updateAt):"Belum checkout"} </Typography>
                  </Grid>
                </Grid>
              </CardContent> 
              <CardActions>
                <div style={{padding:10}} >
                  <BurstModeIcon  spacing={1} onClick={() => imageupload(m)} />
                </div>
              </CardActions>
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
        <Form isLoading={loading} mitra={mitra} item={item} step={step} handleAdd={handleAdd} onUpdate={handleUpdate} latitudes={lat} longitudes={long} />
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
