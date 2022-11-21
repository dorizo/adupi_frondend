import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../api/wilayah';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({
  next,
  setSelectedImg,
  step,
  onUpdate,
  selectedImg,
  setValues,
  handleAdd,
  item,
  isLoading,
  prosessinput,
}) {
  const editAble = (item?.anggotaCode && true) || false;
  const [isNext, setIsNext] = useState({ a: '', s: '' });
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [loading, setLoading] = useState(false);

  const idPro = editAble && item.wilayahCode.split('.')[0];
  const idKab = editAble && `${item.wilayahCode.split('.')[0]}.${item.wilayahCode.split('.')[1]}`;
  const idKec =
    editAble && `${item.wilayahCode.split('.')[0]}.${item.wilayahCode.split('.')[1]}.${item.wilayahCode.split('.')[2]}`;

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
        setProvinsi(list);
        if (editAble) {
          getKab(idPro);
        }
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
        if (editAble) {
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
        if (editAble) {
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
        setDesa(list);
      })
      .catch((e) => {
        setDesa();
        console.log(e);
      });
    setLoading(false);
  }
  const handleSubmit = (val) => {
    setValues(val);
    next(isNext.a, isNext.s);
  };
  const formik = useFormik({
    initialValues: {
      nama: item ? item.nama : '',
      nik: item ? item.nik : '',
      noHp: item ? item.noHp : '',
      jenisKelamin: item ? item.jenisKelamin : '',
      wilayahCode: item ? item.wilayahCode : '',
      alamat: item ? item.alamat : '',
    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Harus Disisi'),
      nik: Yup.string()
        .test('len', 'NIK harus 16', (val) => val.toString().length === 16)
        .required('Harus Disisi'),
      noHp: Yup.string().required('Harus Disisi'),
      jenisKelamin: Yup.string().required('Harus Disisi'),
      // wilayahCode: Yup.string().required('Harus Disisi'),
      alamat: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });

  const handleOpen = (a, s) => {
    setIsNext({ a, s });
    formik.submitForm();
  };
  const handleUploadClick = (event) => {
    console.log(event);
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
  const handleChangeProvinsi = (e) => {
    getKab(e.target.value);
    formik.values.wilayahCode = e.target.value;
  };
  const handleChangeKabupaten = (e) => {
    getKec(e.target.value);
    formik.values.wilayahCode = e.target.value;
  };
  const handleChangeKecamatan = (e) => {
    getDesa(e.target.value);
    formik.values.wilayahCode = e.target.value;
  };
  useEffect(() => {
    getPro();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 0 && (
        <>
          <TextInput
            name="nama"
            id="nama"
            value={formik.values.nama}
            onChange={formik.handleChange}
            error={formik.touched.nama && Boolean(formik.errors.nama)}
            helperText={formik.touched.nama && formik.errors.nama}
            label={'Nama'}
            placeholder="Masukkan Nama"
          />
          <TextInput
            name="nik"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16);
            }}
            id="nik"
            value={formik.values.nik}
            onChange={formik.handleChange}
            error={formik.touched.nik && Boolean(formik.errors.nik)}
            helperText={formik.touched.nik && formik.errors.nik}
            label={'NIK'}
            type="number"
            placeholder="Masukkan Nomor Induk Kependudukan"
          />
          <TextInput
            value={formik.values.noHp}
            name="noHp"
            id="noHp"
            onChange={formik.handleChange}
            error={formik.touched.noHp && Boolean(formik.errors.noHp)}
            helperText={formik.touched.noHp && formik.errors.noHp}
            label={'No. HP'}
            type="number"
            placeholder="Masukkan Nomor Handphone"
          />

          <SelectInput
            label="Jenis Kelamin"
            name="jenisKelamin"
            id="jenisKelamin"
            value={formik.values.jenisKelamin}
            error={formik.touched.jenisKelamin && Boolean(formik.errors.jenisKelamin)}
            onChange={formik.handleChange}
            option={[
              { value: 'L', label: 'Laki-laki' },
              { value: 'P', label: 'Perempuan' },
            ]}
          />
          <SelectInput
            value={(editAble && idPro) || undefined}
            label="Provinsi"
            option={provinsi}
            onChange={handleChangeProvinsi}
          />
          <SelectInput
            value={(editAble && idKab) || undefined}
            label="Kota/Kabupaten"
            option={kabupaten}
            onChange={handleChangeKabupaten}
          />
          <SelectInput
            value={(editAble && idKec) || undefined}
            label="Kecamatan"
            option={kecamatan}
            onChange={handleChangeKecamatan}
          />
          <SelectInput
            name="wilayahCode"
            id="wilayahCode"
            value={formik.values.wilayahCode}
            onChange={formik.handleChange}
            label="Kelurahan"
            option={desa}
          />
          <TextInput
            name="alamat"
            id="alamat"
            value={formik.values.alamat}
            onChange={formik.handleChange}
            label={'Alamat'}
            placeholde="Masukkan Alamat"
            error={formik.touched.alamat && Boolean(formik.errors.alamat)}
            helperText={formik.touched.alamat && formik.errors.alamat}
            rows={3}
            multiline
          />
          <ButtonPrimary
            type="submit"
            loading={loading || isLoading}
            onClick={() => handleOpen('Upload KTP', 1)}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={'Selanjutnya'}
          />
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
            {selectedImg && (
              <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
            <ButtonPrimary disabled={selectedImg} upload={handleUploadClick} component="label" label="Unggah File" />
          </div>
          <ButtonPrimary
            disabled={selectedImg === null || loading || isLoading}
            onClick={editAble ? onUpdate : handleAdd}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={prosessinput===0?editAble ? 'Update' : 'Tambah':prosessinput}
          />
        </>
      )}
    </form>
  );
}

Form.propTypes = {
  next: PropTypes.any,
  setSelectedImg: PropTypes.any,
  step: PropTypes.any,
  isLoading: PropTypes.any,
  item: PropTypes.any,
  onUpdate: PropTypes.func,
  selectedImg: PropTypes.any,
  setValues: PropTypes.any,
  handleAdd: PropTypes.func,
};
