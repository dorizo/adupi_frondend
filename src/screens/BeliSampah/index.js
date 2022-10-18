import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { BELI_SAMPAH, EDIT_BELI_SAMPAH } from '../../api/sampah';
import belisampah from '../../assets/illustation/beli-sampah.png';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useDrawer from '../../hooks/useDrawer';
import Form from './form';
import PembelianPage from '../Transaksi/pembelianpage';
import Edit from './edit';
import {  useQuery, useQueryClient } from 'react-query';

export default function BeliSampah() {
  const { onOpen, Drawer, onClose } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [fungsi, setFungsi] = useState('add');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [item, setItem] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const [dataStruck, setDataStruck] = useState({});
  const queryClient = useQueryClient();

  // const { data:databelisampah, refetch:refechbelisambah, isLoading } = useQuery('GET_BELI_SAMPAH', () => GET_BELI_SAMPAH({ page, size, date }), {
  //   refetchOnWindowFocus: true,
  //   refetchOnMount: true,
  // });

  const handleEditsubmit = async (vakkk) => {
    console.log(vakkk);
  
    // setLoading(true);
    if (step === 2) {
      const response = await EDIT_BELI_SAMPAH(vakkk);
      if (response.status === 422) {
        const asdf = response.data.errors;
        const keys = asdf && Object.keys(asdf);
        keys.forEach((key) => {
          enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
        });
      }
      if (response.status === 200) {
        await enqueueSnackbar(response.data.message, { variant: 'success' });
        setStep(3);
        // refetch();
        queryClient.refetchQueries("GET_BELI_SAMPAH");
      }
      if (response.status === 400) {
        await enqueueSnackbar(response.data.message, { variant: 'error' });
      }
      if (response.status === 500) {
        await enqueueSnackbar('Internal server error', 'error');
      }
    }
    if (step === 3) {
      setStep(0);
      onClose();
    }
  }
  const handleAdd = async (vakkk) => {
    setLoading(true);
    if (step === 2) {
      const response = await BELI_SAMPAH(vakkk);
      if (response.status === 422) {
        const asdf = response.data.errors;
        const keys = asdf && Object.keys(asdf);
        keys.forEach((key) => {
          enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
        });
      }
      if (response.status === 200) {
        await enqueueSnackbar(response.data.message, { variant: 'success' });
        setStep(3);
        // refetch();
        queryClient.refetchQueries("GET_BELI_SAMPAH");
      }
      if (response.status === 400) {
        await enqueueSnackbar(response.data.message, { variant: 'error' });
      }
      if (response.status === 500) {
        await enqueueSnackbar('Internal server error', 'error');
      }
    }
    if (step === 3) {
      setStep(0);
      onClose();
    }
    setLoading(false);
  };

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
    setFungsi('add');
  };
  const handleEdit = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
    setFungsi('edit');
  };
  const handleOnAdd = () => {
    setDrawerTitle('Pilih Tanggal & Jam');
    onOpen();
    setStep(0);
    setFungsi('add');
  };
  const handleOnEdit = (title , valuedata) => {
    console.log("edits" ,valuedata?.e?.bsCode);
    setValues({...values , "bsCode":valuedata?.e?.bsCode});
    setItem(valuedata?.e);
    setDrawerTitle(title);
    onOpen();
    setStep(0);
    setFungsi('edit');
  };
  return (
    <>
      <BarMobile title={'Beli Sampah'} />
      <AdupiXLeMineraleHead />
      <img alt="recyle logo" width="100%" src={belisampah} />
      <div style={{ textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Masukan Data
        </Typography>
        <Typography align="center" variant="h2">
          Pembelian Sampah
        </Typography>
        <ButtonPrimary onClick={handleOnAdd} style={{ marginTop: 50, marginBottom: 5 }} label={'Beli sampah'} />
        <PembelianPage 
        setStep = {setStep} 
        handleEdit={handleOnEdit}
        // data={databelisampah}
        value={values} />
      </div>
      <Drawer title={drawerTitle}>
        {fungsi ==='add'?<Form
          mitra={auth?.mitra}
          isLoading={loading}
          step={step}
          next={handleOpen}
          values={values}
          dataStruck={dataStruck}
          setDataStruck={setDataStruck}
          handleAdd={handleAdd}
          setValues={setValues}
        />:<Edit 
        mitra={auth?.mitra}
        isLoading={loading}
        step={step}
        next={handleEdit}
        values={values}
        dataStruck={dataStruck}
        setDataStruck={setDataStruck}
        handleAdd={handleEditsubmit}
        item={item}
        setValues={setValues} />
        }
      </Drawer>
    </>
  );
}
