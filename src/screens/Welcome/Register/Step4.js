import { Box, Card, IconButton, Typography } from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../../api/wilayah';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';

const containerStyle = {
  width: '100%',
  height: '300px',
};
const centerstyle = {
  position: 'absolute',
  zIndex: 20,
  right: 15,
  bottom: 180,
};

export default function Step4({ handleNext, values, isLoading }) {
  const mlg = values?.lang ? { lat: values?.lat, lng: values?.lang } : null;
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [marker, setMarker] = useState(mlg);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = React.useState(null);
  const [selectedImg, setSelectedImg] = useState(values?.foto || null);
  const [center, setCenter] = useState({ lat: values?.lat || -6.258752, lng: values?.lang || 106.6201363 });
  console.log(center);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  const onLoad = React.useCallback((m) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    m.fitBounds(bounds);
    setMap(m);
  }, []);

  const onUnmount = React.useCallback((m) => {
    setMap(null);
    console.log(m);
  }, []);

  console.log(map);

  const onMapClick = (val) => {
    const mm = val.latLng;
    setMarker({ lat: mm?.lat(), lng: mm?.lng() });
    console.log(val.latLng);
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(position);
        setMarker(pos);
        setCenter(pos);
      });
    }
  };
  const idPro = values?.wilayahCodeUsaha && values.wilayahCodeUsaha.split('.')[0];
  const idKab =
    values?.wilayahCodeUsaha && `${values.wilayahCodeUsaha.split('.')[0]}.${values.wilayahCodeUsaha.split('.')[1]}`;
  const idKec =
    values?.wilayahCodeUsaha &&
    `${values.wilayahCodeUsaha.split('.')[0]}.${values.wilayahCodeUsaha.split('.')[1]}.${
      values.wilayahCodeUsaha.split('.')[2]
    }`;

  async function getPro() {
    setLoading(true);
    GET_ALL_PROVINSI()
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCodeUsaha) {
          getKab(idPro);
        }
        setProvinsi(list);
      })
      .catch((e) => {
        setProvinsi();
        console.log(e);
      });
    setKabupaten();
    setKecamatan();
    setDesa();
    setLoading(false);
  }
  async function getKab(id) {
    setLoading(true);
    GET_KABUPATEN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCodeUsaha) {
          getKec(idKab);
        }
        setKabupaten(list);
      })
      .catch((e) => {
        setKabupaten();
        console.log(e);
      });
    setKecamatan();
    setDesa();
    setLoading(false);
  }
  async function getKec(id) {
    setLoading(true);
    GET_KECAMATAN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        if (values?.wilayahCodeUsaha) {
          getDesa(idKec);
        }
        setKecamatan(list);
      })
      .catch((e) => {
        setKecamatan();
        console.log(e);
      });
    setDesa();
    setLoading(false);
  }
  async function getDesa(id) {
    setLoading(true);
    GET_DESA(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            const wil = { value: p.wilayahCode, label: p.wilayah };
            return wil;
          });
        console.log(res);
        setDesa(list);
      })
      .catch((e) => {
        setDesa();
        console.log(e);
      });
    setLoading(false);
  }
  const handleChangeProvinsi = (e) => {
    getKab(e.target.value);
  };
  const handleChangeKabupaten = (e) => {
    getKec(e.target.value);
  };
  const handleChangeKecamatan = (e) => {
    getDesa(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      wilayahCodeUsaha: values?.wilayahCodeUsaha || null,
      alamatUsaha: values?.alamatUsaha || null,
      lang: values?.lang || null,
      lat: values?.lat || null,
    },
    validationSchema: Yup.object({
      wilayahCodeUsaha: Yup.string().required('Harus Disisi'),
      alamatUsaha: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: (values) => {
      // handleNext(5, 'Data Mesin', { ...values, lat: marker?.lat(), lang: marker?.lng(), foto: '-' });
      handleNext(5, 'Data Mesin', { ...values, lat: marker?.lat, lang: marker?.lng, foto: selectedImg });
    },
  });
  useEffect(() => {
    function xxxx() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
        });
      }
      getPro();
    }
    xxxx();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <SelectInput
        value={values?.wilayahCodeUsaha ? idPro : undefined}
        label="Provinsi"
        option={provinsi}
        onChange={handleChangeProvinsi}
      />
      <SelectInput
        value={values?.wilayahCodeUsaha ? idKab : undefined}
        label="Kota/Kabupaten"
        option={kabupaten}
        onChange={handleChangeKabupaten}
      />
      <SelectInput
        value={values?.wilayahCodeUsaha ? idKec : undefined}
        label="Kecamatan"
        option={kecamatan}
        onChange={handleChangeKecamatan}
      />
      <SelectInput
        name="wilayahCodeUsaha"
        id="wilayahCodeUsaha"
        value={formik.values.wilayahCodeUsaha}
        onChange={formik.handleChange}
        label="Kelurahan"
        option={desa}
        error={formik.touched.wilayahCodeUsaha && Boolean(formik.errors.wilayahCodeUsaha)}
      />
      <TextInput
        name="alamatUsaha"
        id="alamatUsaha"
        value={formik.values.alamatUsaha}
        onChange={formik.handleChange}
        label={'Alamat'}
        placeholde="Masukkan Alamat Usaha"
        error={formik.touched.alamatUsaha && Boolean(formik.errors.alamatUsaha)}
        helperText={formik.touched.alamatUsaha && formik.errors.alamatUsaha}
        rows={3}
        multiline
      />
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            onClick={onMapClick}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        )}
        <Box style={{ display: 'flex', justifyContent: 'end', marginRight: 5 }}>
          <IconButton onClick={handleMyLocation} aria-label="my location">
           <Typography style={{fontSize:12,marginRight:10}}>Tab untuk mendapatkan lokasi terkini </Typography><MyLocationIcon />
          </IconButton>
        </Box>
      </Card>
      <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
        {selectedImg && (
          <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
            <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
          </a>
        )}
        {!selectedImg && <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah Foto Gudang" />}
      </div>
      <ButtonPrimary type="submit" disabled={!marker || !selectedImg || loading || isLoading} label={!marker?"Map & Foto belum Diisi":"Selanjutnya"} />
    </form>
  );
}
Step4.propTypes = {
  handleNext: PropTypes.func,
  isLoading: PropTypes.any,
  values: PropTypes.any,
};
