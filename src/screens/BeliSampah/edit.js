import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TidakAdaData from '../../components/TidakAdaData';
import { GET_ALL_ANGGOTA } from '../../api/anggota';
import { GET_ALL_JENIS_SAMPAH } from '../../api/jenis_sampah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';
import Struck from './Struck';
import CurrencyFormat from 'react-currency-format';
import { fRupiah, ribuan } from 'src/utils/formatNumber';
import { StaticDatePicker, StaticDateTimePicker } from '@mui/x-date-pickers';
import { format ,parseISO} from 'date-fns';
import { useEffect } from 'react';
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Edit({
  next,
  mitra,
  dataStruck,
  setDataStruck,
  step,
  values,
  setValues,
  isLoading,
  handleAdd,
  item,
}) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowFrom] = useState(false);
  const [sampahbutton, setsampahbutton] = useState(true);
  const [search, setSearch] = useState(item?.anggotum?.nama);
  const [valuetanggal , Setvaluetanggal] = useState(item?.createAt);
  const [form, setForm] = useState({ sumber: '', jsCode: '', harga: '', berat: '', jenis: '' });
  useEffect(() => {
    console.log(item?.createAt);
  });

  const [sampah, setSampah] = useState(item?.detail_beli_sampahs);
  const { data } = useQuery('GET_ALL_ANGGOTA', GET_ALL_ANGGOTA, {
    refetchOnMount: true,
  });
  const { data: dataJenis } = useQuery('GET_ALL_JENIS_SAMPAH', GET_ALL_JENIS_SAMPAH, {
    refetchOnMount: true,
  });
  const optionJs =
    dataJenis &&
    dataJenis?.data?.data.map((js) => {
      return { value: js.jsCode, label: js.jenis };
    });

  const anggotaNF = data && data?.data?.data;

  const handleOpen = (a, s, val) => {
    setLoading(true);
    if (s === 3) {
      handleAdd({ ...values, ...val });
    } else {
      setValues({ ...values, ...val });
      next(a, s);
    }
    setLoading(false);
  };

  const removeListSampah = (index) => {
    console.log(index);
    const valuess = [...sampah];
    console.log(valuess.filter(item => item !== index));
    // valuess.splice(index);
    setSampah(valuess.filter(item => item !== index));
  };
  const handelSimpan = () => {
    setSampah([...sampah, form]);
    setSampah([...sampah, form]);
    setForm({ sumber: '', jsCode: '', harga: '', berat: '', jenis: '' });
    setShowFrom(false);
    setsampahbutton(true);
  };
  const handleJenis = (e) => {
    const jenis = optionJs.find((j) => j.value === e.target.value);
    setForm({ ...form, jsCode: e.target.value, jenis: jenis.label });
  };
  const handlePilihAnggota = (anggota) => {
    // console.log(anggota);
    setDataStruck({
      ...dataStruck,
      anggota,
      mitra: { alamat: mitra?.alamat, namaUsaha: mitra?.gudang[0]?.namaUsaha },
    });
    handleOpen('PEMBELIAN BAHAN DUP', 2, { anggotaCode: anggota?.anggotaCode });
    console.log(step);
  };
  const handleTambahSampah = async () => {
    console.log(valuetanggal);
    await setDataStruck({ ...dataStruck, detail: sampah });
    await handleOpen('Struck', 3, { detail: sampah });
  };
  const filterAnggota = (array, query) => {
    if(array){
      if (query) {
        const column = array[0] && Object?.keys(array[0]);
        return array.filter((a) =>
          column.some((col) => a[col] && a[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
        );
      }
    };
    
    
    return array;
  };
  const anggota = filterAnggota(anggotaNF, search);
  const handleTanggal = async (e) => {
    
    
    await setDataStruck({ ...dataStruck, createAt: valuetanggal });
    
    await handleOpen('Pilih Supplier', 1,{ createAt: valuetanggal });
  }
  return (
    <form>
      {step === 0 && (
      <>
      <StaticDateTimePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        inputFormat="dd/MM/yyyy"
        value={valuetanggal}
        onChange={(newValue) => {
          Setvaluetanggal(format(new Date(newValue), 'yyyy-MM-dd HH:mm:ss'));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
           <ButtonPrimary
              disabled={valuetanggal === null}
              onClick={handleTanggal}
              label='Lanjut'
            />
      
      </>
      )}
      {step === 1 && (
        <>
          <TextInput value={search} onChange={(e) => setSearch(e.target.value)} label="Cari Anggota Edit" />
          {anggota && anggota.length === 0 && <TidakAdaData />}
          <Grid sx={{ padding: 3 }} container spacing={2}>
            {anggota &&
              anggota.map((m, i) => (
                <Grid onClick={() => handlePilihAnggota(m)} key={i} item xs={6}>
                  <Card
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                  >
                    <CardContent
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                    >
                      <Typography style={{ fontWeight: 'bold', fontSize: 12 }} variant="body1">
                        {m.nama}
                      </Typography>
                      <Typography style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 11 }} variant="body2">
                        {m.nik}
                      </Typography>
                      <Typography style={{ fontSize: 10 }} variant="alamat">
                        {m.alamat}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {step === 2 && (
        <>
          {sampah &&
            sampah.map((m, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontWeight: 'bold' }}>{m?.jenis}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Sumber : {m?.sumber}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Berat : {ribuan(m?.berat)}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Harga : {fRupiah(m?.harga)}</Typography>
                      <Button onClick={() => removeListSampah(m)} size="small" variant="outlined" color="error">
                        Hapus
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          <Button
            variant="outlined"
            style={{ marginBottom: 10 }}
            onClick={() => {setShowFrom(!showForm); setsampahbutton(showForm)}}
            color="success"
          >
            {showForm ? 'Batal' : 'Tambah Sampah'}
          </Button>
          <form>
            {showForm && (
              <>
                <SelectInput
                  label={'Sumber Sampah'}
                  name="sumber"
                  id="sumber"
                  onChange={(e) => setForm({ ...form, sumber: e.target.value })}
                  value={form.sumber}
                  option={['Perkantoran', 'Perumahan', 'Kawasan Industri', 'Fasilitas Umum', 'Fasilitas Khusus'].map(
                    (va) => {
                      return { value: va, label: va };
                    }
                  )}
                />
                <SelectInput
                  label={'Jenis Sampah'}
                  name="jsCode"
                  id="jsCode"
                  onChange={handleJenis}
                  value={form.jsCode}
                  option={optionJs && optionJs}
                />
              
                <CurrencyFormat 
                fullWidth 
                label={'Berat (kg)'} 
                customInput={TextField} 
                style={{paddingBottom:15 ,paddingTop:15}} 
                onValueChange={(e) => setForm({ ...form, berat: e.value })}
                thousandSeparator={true} 
                type="tel"
                value={form.berat} />
                
                <CurrencyFormat 
                fullWidth 
                customInput={TextField}
                thousandSeparator={true} 
                style={{paddingBottom:15 ,paddingTop:15}}
                type="tel"
                onValueChange={(e) => setForm({ ...form, harga: e.value })}
                value={form.harga}
                label={'Harga (Rp per kg)'}
               />
{/*                 
                <TextInput
                  id="berat"
                  name="berat"
                  type="number"
                  onChange={(e) => setForm({ ...form, berat: e.target.value })}
                  value={form.berat}
                  label={'Berat'}
                /> */}
                <ButtonPrimary
                  onClick={handelSimpan}
                  disabled={form.berat === '' || form.harga === '' || form.jsCode === '' || form.sumber === ''}
                  style={{ marginTop: 30, marginBottom: 5 }}
                  label={'Tambah'}
                />
              </>
            )}
            <ButtonPrimary
              type="submit"
              disabled={sampah.length === 0 || sampahbutton===false || loading || isLoading}
              onClick={handleTambahSampah}
              label={isLoading ? 'Proses' : 'Simpan Pembelian'}
            />
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <Struck data={dataStruck} />
          <ButtonPrimary disabled={loading || isLoading} onClick={handleAdd} label="Selesai" />
        </>
      )}
    </form>
  );
}

Edit.propTypes = {
  next: PropTypes.any,
  step: PropTypes.any,
  mitra: PropTypes.any,
  setValues: PropTypes.any,
  isLoading: PropTypes.any,
  values: PropTypes.any,
  dataStruck: PropTypes.func,
  setDataStruck: PropTypes.func,
  handleAdd: PropTypes.func,
};
