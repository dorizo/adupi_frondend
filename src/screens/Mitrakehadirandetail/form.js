import { LoadingButton } from '@mui/lab';
import { FormControl } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { GET_KUNJUNGAN_DETAIL } from 'src/api/kunjunganmitra';
import * as Yup from 'yup';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

export default function Form({title ,pengisiansubmit}) {

      
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit =async (val ,{ resetForm}) =>{
        console.log(val);
      const response =  await GET_KUNJUNGAN_DETAIL(val);
      console.log(response);
      if(response.status == 200){
        await enqueueSnackbar(response.data.message, { variant: 'success' });
        pengisiansubmit(false);
        resetForm();
      }else{
        
        await enqueueSnackbar(response.data.message, { variant: 'error' });

      }
      }
    const formik = useFormik({
        initialValues: 
        {
            Kunjungan_formCapaian : "",
            Kunjungan_formKeterlambatan : "",
            Kunjungan_formHargaPembelian : "",
            Kunjungan_formPekerja : "",
            Kunjungan_formJumlahMesin : title,
            Kunjungan_formPendampingan : "",
            mitraCode :title
         
         },
        validationSchema: Yup.object({
            Kunjungan_formCapaian: Yup.string().required('Harus Disisi'),
            Kunjungan_formKeterlambatan: Yup.string().required('Harus Disisi'),
            Kunjungan_formHargaPembelian: Yup.string().required('Harus Disisi'),
            Kunjungan_formPekerja: Yup.string().required('Harus Disisi'),
            Kunjungan_formPendampingan: Yup.string().required('Harus Disisi'),
            mitraCode: Yup.string().required('Harus Disisi'),
        }),
        onSubmit: handleSubmit,
      });
      formik.values.mitraCode = title;
    return(
        <>
        <form  onSubmit={formik.handleSubmit}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextInput
                    name="Kunjungan_formCapaian"
                    value={formik.values.Kunjungan_formCapaian}
                    onChange={formik.handleChange}
                    error={formik.touched.Kunjungan_formCapaian && Boolean(formik.errors.Kunjungan_formCapaian)}
                    helperText={formik.touched.Kunjungan_formCapaian && formik.errors.Kunjungan_formCapaian}
                    id="outlined-multiline-flexible"
                    label="masalah apa yang dihadapi dalam mecapai target pembelian bulanan ?"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextInput
                    name="Kunjungan_formKeterlambatan"
                    value={formik.values.Kunjungan_formKeterlambatan}
                    error={formik.touched.Kunjungan_formKeterlambatan && Boolean(formik.errors.Kunjungan_formKeterlambatan)}
                    helperText={formik.touched.Kunjungan_formKeterlambatan && formik.errors.Kunjungan_formKeterlambatan}
                    onChange={formik.handleChange}
                    id="outlined-multiline-flexible"
                    label="masalah apa yang dihadapi dalam melakukan Pembayaran pinjaman dari program?"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextInput
                    name="Kunjungan_formHargaPembelian"
                    value={formik.values.Kunjungan_formHargaPembelian}
                    error={formik.touched.Kunjungan_formHargaPembelian && Boolean(formik.errors.Kunjungan_formHargaPembelian)}
                    helperText={formik.touched.Kunjungan_formHargaPembelian && formik.errors.Kunjungan_formHargaPembelian}
                    onChange={formik.handleChange}
                    id="outlined-multiline-flexible"
                    label="harga pembelian/penjualan di lapangan ?"
                
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextInput
                    name="Kunjungan_formPekerja"
                    type="number"
                    value={formik.values.Kunjungan_formPekerja}
                    error={formik.touched.Kunjungan_formPekerja && Boolean(formik.errors.Kunjungan_formPekerja)}
                    helperText={formik.touched.Kunjungan_formPekerja && formik.errors.Kunjungan_formPekerja}
                    onChange={formik.handleChange}
                    id="outlined-multiline-flexible"
                    label="jumlah pekerja saat ini ?"
                  />
                </FormControl>
                {/* <FormControl fullWidth sx={{ m: 1 }}>
                  <TextInput
                    name="Kunjungan_formJumlahMesin"
                    value={formik.values.Kunjungan_formJumlahMesin}
                    error={formik.touched.Kunjungan_formJumlahMesin && Boolean(formik.errors.Kunjungan_formJumlahMesin)}
                    helperText={formik.touched.Kunjungan_formJumlahMesin && formik.errors.Kunjungan_formJumlahMesin}
                    onChange={formik.handleChange}
                    id="outlined-multiline-flexible"
                    label="Jumlah Mesin Saat ini ?"
                  />
                </FormControl> */}
                <FormControl fullWidth sx={{ m: 1 }}>
                <TextInput
                    name="Kunjungan_formPendampingan"
                    value={formik.values.Kunjungan_formPendampingan}
                    error={formik.touched.Kunjungan_formPendampingan && Boolean(formik.errors.Kunjungan_formPendampingan)}
                    helperText={formik.touched.Kunjungan_formPendampingan && formik.errors.Kunjungan_formPendampingan}
                    onChange={formik.handleChange}
                    id="outlined-multiline-flexible"
                    label="pelatihan/pendampingan yang dibutuhkan ?"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                <LoadingButton
                    type="submit"
                    loadingPosition="start"
                    variant="outlined"
                  >
                    Simpan
                  </LoadingButton>
                </FormControl>
              </form>
        </>
    )

}
