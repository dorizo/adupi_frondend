import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ADD_PEMBELI, ADD_PEMBELIMITRA, GET_ALL_PEMBELI } from '../../api/pembeli';
import { GET_ALL_JENIS_SAMPAH } from '../../api/jenis_sampah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';
import AutoCompleteLoading from '../../components/AutoCompleteLoading';
import CurrencyFormat from 'react-currency-format';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({ next, setSelectedImg, step, selectedImg, values, setValues, isLoading, handleAdd ,prosessinput }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowFrom] = useState(false);
  const [pembeli, setPembeli] = useState('');
  const [pembeliCode, setPembeliCode] = useState(null);
  
  const [valuetanggal , Setvaluetanggal] = useState(null);
  const [sampahbutton, setsampahbutton] = useState(false);
  const [form, setForm] = useState({ jenisCode: '', harga: '', berat: '', jenis: '' });

  const [sampah, setSampah] = useState([]);
  const { data: pembeliData } = useQuery('GET_ALL_PEMBELI', () => GET_ALL_PEMBELI(null));
  const listPembeli = pembeliData && pembeliData?.data?.data;

  const pembeliOption =
    listPembeli &&
    listPembeli?.map((m) => {
      const option = { value: m.pembeliCode, title: m.pembeli };
      return option;
    });

  const { data: dataJenis } = useQuery('GET_ALL_JENIS_SAMPAH', GET_ALL_JENIS_SAMPAH, {
    refetchOnMount: true,
  });
  const optionJs =
    dataJenis &&
    dataJenis?.data?.data.map((js) => {
      return { value: js.jsCode, label: js.jenis };
    });

  const handleOpen = (a, s, val) => {
    setLoading(true);
    setValues({ ...values, ...val });
    next(a, s);
    setLoading(false);
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
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  const removeListSampah = (index) => {
    const valuess = [...sampah];
    valuess.splice(index);
    setSampah(valuess);
  };
  const handelSimpan = () => {
    setSampah([...sampah, form]);
    setSampah([...sampah, form]);
    setForm({ sumber: '', jenisCode: '', harga: '', berat: '', jenis: '' });
    setShowFrom(false);
    setsampahbutton(true);
  };
  const handleJenis = (e) => {
    const jenis = optionJs.find((j) => j.value === e.target.value);
    setForm({ ...form, jenisCode: e.target.value, jenis: jenis.label });
  };
  const handleSetPemebeli = (newVal) => {
    setPembeliCode(newVal);
    if (newVal.title !== 'Lain-lain') {
      setPembeli(newVal.title);
    } else {
      setPembeli('');
    }
  };
  const handleAddPembeli = async () => {
    console.log(pembeliCode);
    if (pembeliCode.title === 'Lain-lain') {
      await ADD_PEMBELIMITRA({ pembeli }).then((response) => {
        if (response.status === 200) {
          // console.log(response?.data);
          handleOpen('Sampah', 2, { pembeliCode: response?.data?.data?.pembeliCode });
        }
      
      });
    } else {
      await handleOpen('Sampah', 2, { pembeliCode: pembeliCode?.value });
    }
  };
  
  const handleTanggal = async (e) => {
    
    
    handleOpen('Pilih Pembeli/Pabrik', 1,{ createAt: valuetanggal });
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
          <AutoCompleteLoading
            label="Pembeli"
            options={pembeliOption}
            loading={isLoading}
            value={pembeliCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => handleSetPemebeli(newVal)}
          />
          {pembeliCode?.title === 'Lain-lain' && (
            <TextInput
              id="pembeli"
              name="pembeli"
              type="text"
              onChange={(e) => setPembeli(e.target.value)}
              value={pembeli}
              label={'Tambah Pembeli'}
            />
          )}
          <ButtonPrimary
            onClick={handleAddPembeli}
            style={{ marginTop: 30, marginBottom: 5 }}
            disabled={pembeli === '' || isLoading}
            label={'Selanjutnya'}
          />
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
                      <Typography sx={{ fontSize: 12 }}>Berat : {m?.berat}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Harga : {m?.harga}</Typography>
                      <Button onClick={() => removeListSampah(i)} size="small" variant="outlined" color="error">
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
                  label={'Jenis Sampah'}
                  name="jenisCode"
                  id="jenisCode"
                  onChange={handleJenis}
                  value={form.jenisCode}
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
                <ButtonPrimary
                  onClick={handelSimpan}
                  disabled={form.berat === '' || form.harga === '' || form.jenisCode === ''}
                  style={{ marginTop: 30, marginBottom: 5 }}
                  label={'Tambah'}
                />
              </>
            )}
            <ButtonPrimary
              type="submit"
              disabled={sampah.length === 0 ||sampahbutton===false}
              onClick={() =>
                handleOpen('Upload Nota', 3, {
                  detail: sampah.map((s) => {
                    delete s.jenis;
                    return s;
                  }),
                })
              }
              label="Selanjutnya"
            />
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
            {selectedImg && (
              <a role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
            <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File" />
          </div>
          <ButtonPrimary disabled={loading || isLoading} onClick={handleAdd} label="Selesai" />
        </>
      )}
    </form>
  );
}

Form.propTypes = {
  next: PropTypes.any,
  setSelectedImg: PropTypes.any,
  step: PropTypes.any,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  isLoading: PropTypes.any,
  values: PropTypes.any,
  handleAdd: PropTypes.func,
};
