/* eslint-disable arrow-body-style */

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  // GET_ONE_FASILITATOR,
  GET_USER_FOR_ADD_FASILITATOR,
  GET_USER_FOR_UPDATE_FASILITATOR,
} from '../../api/fasilitator';
import { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN } from '../../api/wilayah';
import AutoCompleteLoading from '../../components/AutoCompleteLoading';
import useScriptRef from '../../hooks/useScriptRef';

export default function DialogComponent(props) {
  const { open, onClose, item, onAdd, onUpdate, processing } = props;
  const editMode = Boolean(item && item.fasilitatorCode);
  const scriptedRef = useScriptRef();
  const [provinsi, setProvinsi] = useState();
  const [provinsiS, setProvinsiS] = useState(null);
  const [kabupatenS, setKabupatenS] = useState(null);
  const [kabupaten, setKabupaten] = useState();
  const [kecamatanS, setKecamatanS] = useState(null);
  const [kecamatan, setKecamatan] = useState();
  const [desa, setDesa] = useState();
  const [user, setUser] = useState();
  const [userC, setUserC] = useState(null);
  const [loading, setLoading] = useState(false);

  // async function getOne() {
  //   setLoading(true);
  //   GET_ONE_FASILITATOR(item?.fasilitatorCode)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       setProvinsi();
  //       console.log(e);
  //     });
  //   setKabupaten();
  //   setKecamatan();
  //   setDesa();
  //   setLoading(false);
  // }
  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      if (item && item.fasilitatorCode) {
        console.log(values.userCode.value, userC.value);
        const vals = {
          ...values,
          userCode: values.userCode.value || userC.value,
          wilayahCode: values.wilayahCode.value,
        };
        onUpdate(vals, item.fasilitatorCode, setErrors);
      } else {
        const vals = { ...values, userCode: values.userCode.value, wilayahCode: values.wilayahCode.value };
        onAdd(vals);
      }
    } catch (err) {
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      nama: item ? item.nama : '',
      alamat: item ? item.alamat : '',
      wilayahCode: null,
      userCode: null,
    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Harus Disisi'),
      alamat: Yup.string().required('Harus Disisi'),
      wilayahCode: Yup.object().required('Harus Disisi'),
      userCode: Yup.object().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });

  async function getUser() {
    setLoading(true);
    const API = editMode ? GET_USER_FOR_UPDATE_FASILITATOR(item?.fasilitatorCode) : GET_USER_FOR_ADD_FASILITATOR();
    API.then((res) => {
      const list =
        res &&
        res.data?.data?.map((p) => {
          if (editMode && item.userCode === p.userCode) {
            setUserC({ value: p.userCode, title: p.email });
            formik.setFieldValue('userCode', { value: p.userCode, title: p.email });
          }
          return { value: p.userCode, title: p.email };
        });
      setUser(list);
    }).catch((e) => {
      setUser();
      console.log(e);
    });
    setLoading(false);
  }
  async function getPro() {
    const idWil = editMode && item.wilayahCode.split('.')[0];
    setLoading(true);
    GET_ALL_PROVINSI()
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            if (editMode && idWil === p.wilayahCode) {
              setProvinsiS({ value: p.wilayahCode, title: p.wilayah });
            }
            return { value: p.wilayahCode, title: p.wilayah };
          });
        if (editMode) {
          getKab(idWil);
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
    const idWil = editMode && `${item.wilayahCode.split('.')[0]}.${item.wilayahCode.split('.')[1]}`;
    setLoading(true);
    GET_KABUPATEN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            if (editMode && idWil === p.wilayahCode) {
              setKabupatenS({ value: p.wilayahCode, title: p.wilayah });
            }
            return { value: p.wilayahCode, title: p.wilayah };
          });
        if (editMode) {
          getKec(idWil);
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
    const idWil =
      editMode &&
      `${item.wilayahCode.split('.')[0]}.${item.wilayahCode.split('.')[1]}.${item.wilayahCode.split('.')[2]}`;
    setLoading(true);
    GET_KECAMATAN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            if (editMode && idWil === p.wilayahCode) {
              setKecamatanS({ value: p.wilayahCode, title: p.wilayah });
            }
            return { value: p.wilayahCode, title: p.wilayah };
          });
        if (editMode) {
          getDesa(idWil);
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
    const idWil = editMode && item.wilayahCode;
    setLoading(true);
    GET_DESA(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            if (editMode && idWil === p.wilayahCode) {
              formik.setFieldValue('wilayahCode', {
                value: p.wilayahCode,
                title: p.wilayah,
              });
            }
            return { value: p.wilayahCode, title: p.wilayah };
          });

        setDesa(list);
      })
      .catch((e) => {
        setDesa();
        console.log(e);
      });
    setLoading(false);
  }

  const handleChangeProvinsi = (_, v) => {
    setProvinsiS(v);
    getKab(v.value);
  };
  const handleChangeKabupaten = (_, v) => {
    setKabupatenS(v);
    getKec(v.value);
  };
  const handleChangeKecamatan = (_, v) => {
    setKecamatanS(v);
    getDesa(v.value);
  };
  const handleChangeDesa = (_, v) => {
    formik.setFieldValue('wilayahCode', v);
  };
  const handleChangeUser = (_, v) => {
    formik.setFieldValue('userCode', v);
  };
  useEffect(() => {
    function eff() {
      getUser();
      getPro();
    }
    eff();
  }, []);
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Fasilitator</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <AutoCompleteLoading
              value={formik.values.userCode || userC}
              onChange={handleChangeUser}
              options={user}
              name="userCode"
              id="userCode"
              loading={loading}
              label="User"
            />
            <TextField
              margin="dense"
              name="nama"
              id="nama"
              label="Nama"
              type="text"
              disabled={processing}
              value={formik.values.nama}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.nama && Boolean(formik.errors.nama)}
              variant="standard"
              helperText={formik.touched.nama && formik.errors.nama}
            />
            <AutoCompleteLoading
              onChange={handleChangeProvinsi}
              value={provinsiS}
              options={provinsi}
              loading={loading}
              label="Provinsi"
            />
            <AutoCompleteLoading
              onChange={handleChangeKabupaten}
              options={kabupaten}
              value={kabupatenS}
              loading={loading}
              label="Kabupaten"
            />
            <AutoCompleteLoading
              onChange={handleChangeKecamatan}
              options={kecamatan}
              value={kecamatanS}
              loading={loading}
              label="Kecamatan"
            />
            <AutoCompleteLoading
              value={formik.values.wilayahCode}
              onChange={handleChangeDesa}
              options={desa}
              name="wilayahCode"
              id="wilayahCode"
              loading={loading}
              label="Desa"
            />
            <TextField
              margin="dense"
              name="alamat"
              id="alamat"
              label="No Telp"
              type="text"
              disabled={processing}
              value={formik.values.alamat}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.alamat && Boolean(formik.errors.alamat)}
              variant="standard"
              helperText={formik.touched.alamat && formik.errors.alamat}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={processing}>
              {editMode ? 'Edit' : 'Tambah'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
DialogComponent.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  item: PropTypes.any,
  onAdd: PropTypes.any,
  onUpdate: PropTypes.any,
  processing: PropTypes.any,
};
