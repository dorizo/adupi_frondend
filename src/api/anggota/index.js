import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_ANGGOTA = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('anggota/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_NV_ANGGOTA_BY_MITRA_ID = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`anggota/all/${id}/notVerified`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_VERIVY_ANGGOTA_BY_MITRA_ID = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`anggota/all/${id}/verified`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_ANGGOTA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`anggota/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_ANGGOTA = async ({ nama, nik, noHp, jenisKelamin, wilayahCode, ktp, alamat } ,progressig) => {
  const data = qs.stringify({
    nama,
    nik,
    noHp,
    jenisKelamin,
    wilayahCode,
    ktp,
    alamat,
  });
  try {
    const response = await axios.post(`anggota/add`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        progressig(`${loaded}kb of ${total}kb | ${percent}%`);
        // setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const VERIFIKASI_ANGGOTA = async ({ lat, long }, id) => {
  const data = qs.stringify({
    lat,
    long,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`su/activeAnggota/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_ANGGOTA = async ({ nama, nik, noHp, jenisKelamin, wilayahCode, ktp, alamat }, id) => {
  const data = qs.stringify({
    nama,
    nik,
    noHp,
    jenisKelamin,
    wilayahCode,
    ktp,
    alamat,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`anggota/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_ANGGOTA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`anggota/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export {
  ADD_ANGGOTA,
  GET_ALL_ANGGOTA,
  DELETE_ANGGOTA,
  UPDATE_ANGGOTA,
  GET_ONE_ANGGOTA,
  GET_NV_ANGGOTA_BY_MITRA_ID,
  GET_VERIVY_ANGGOTA_BY_MITRA_ID,
  VERIFIKASI_ANGGOTA,
};
