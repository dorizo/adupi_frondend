import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import LoadingOverlayComponent from 'src/components/LoadingOverlay';
import { JUAL_SAMPAH, JUAL_SAMPAHEDIT } from '../../api/sampah';
import jualsampah from '../../assets/illustation/jual-sampah.png';

import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import PenjualanPage from '../Transaksi/penjualanpage';
import Edit from './edit';
import Form from './form';

export default function JualSampah() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [prosessinput, setprosessinput] = useState(0);
  const [fungsi, setFungsi] = useState('add');
  const [item, setItem] = useState({});
  
  const queryClient = useQueryClient();

  const handleAdd = async () => {
    setLoading(true);
    // const response = await JUAL_SAMPAH({ ...values, nota: '-' });
    const response = await JUAL_SAMPAH({ ...values, nota: selectedImg },setprosessinput);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setStep(0);
      onClose();
      // refetch();
        queryClient.refetchQueries("GET_JUAL_SAMPAH");
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setLoading(false);
  };

  
  const handleEdit = async () => {
    setLoading(true);
    // const response = await JUAL_SAMPAH({ ...values, nota: '-' });
    const response = await JUAL_SAMPAHEDIT({ ...values, nota: selectedImg },setprosessinput);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setStep(0);
      onClose();
      // refetch();
        queryClient.refetchQueries("GET_JUAL_SAMPAH");
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

  const handleOnAdd = () => {
    setDrawerTitle('Pilih Tanggal & Jam');
    onOpen();
    setStep(0);
    setprosessinput(0);
    setFungsi('add');
  };
  
  const handleOnEdit = (title , valuedata) => {
    console.log("edits" ,valuedata);
    setValues({...values , "jsCode":valuedata?.e?.jsCode});
    setItem(valuedata?.e);
    setDrawerTitle('Pilih Tanggal & Jam');
    onOpen();
    setStep(0);
    setFungsi('edit');
  };

  return (
    <>
      <BarMobile title={'Jual Sampah'} />
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" width="100%" src={jualsampah} />
      <div style={{ marginTop: 35, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Masukan Data
        </Typography>
        <Typography align="center" variant="h2">
          Sampah Dijual
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Jual sampah'} />
        <PenjualanPage 
        setStep = {setStep} 
        handleEdit={handleOnEdit}
         />
      </div>
      
      <LoadingOverlayComponent text={"Loading \n "+prosessinput} loading={loading} />
      <Drawer title={drawerTitle}>
      {fungsi ==='add'?<Form
          isLoading={loading}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          handleAdd={handleAdd}
          setValues={setValues}
          prosessinput={prosessinput}
        />:
        <Edit
          isLoading={loading}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleOpen}
          values={values}
          handleAdd={handleEdit}
          setValues={setValues}
          prosessinput={prosessinput}
          item={item}
        />
      }
      </Drawer>
    </>
  );
}
