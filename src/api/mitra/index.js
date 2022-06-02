import qs from 'qs';
import axios, { catchCallBack } from '../index';

const POST_REGISTRASI_MITRA = async ({
  nama,
  nik,
  noHp,
  jenisKelamin,
  wilayahCode,
  jenisMitra,
  tempatLahir,
  tanggalLahir,
  ktp,
  alamat,
  email,
  password,
}) => {
  const data = qs.stringify({
    nama,
    nik,
    noHp,
    jenisKelamin,
    wilayahCode,
    jenisMitra,
    tempatLahir,
    tanggalLahir,
    ktp,
    alamat,
    email,
    password,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post('registrasi/mitra', data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const REGISTRASI_MITRA_NEW = async ({
  nama,
  nik,
  noHp,
  jenisKelamin,
  wilayahCode,
  jenisMitra,
  tempatLahir,
  tanggalLahir,
  ktp,
  alamat,
  email,
  password,
  namaUsaha,
  foto,
  noSuratIzinUsaha,
  luasGudang,
  lamaOperasional,
  jumlahPekerja,
  statusKepemilikanGudang,
  wilayahCodeUsaha,
  alamatUsaha,
  lang,
  lat,
  mesin,
}) => {
  const data = qs.stringify({
    nama,
    nik,
    noHp,
    jenisKelamin,
    wilayahCode,
    jenisMitra,
    tempatLahir,
    tanggalLahir,
    ktp,
    alamat,
    email,
    password,
    namaUsaha,
    foto,
    noSuratIzinUsaha,
    luasGudang,
    lamaOperasional,
    jumlahPekerja,
    statusKepemilikanGudang,
    wilayahCodeUsaha,
    alamatUsaha,
    lang,
    lat,
    mesin,
  });
  // mesin: [
  //   {
  //     jenisMesin: 'Mesin Press',
  //     statusKepemilikanMesin: 'Milik Sendiri',
  //     kapasitas: '300',
  //     foto: 'Image base 64',
  //   },
  // ];
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post('registrasi/mitra', data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_SELF_MITRA = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`mitra/self`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_MITRA_NV_BY_FASILITATOR = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/allMitra/notYetVerifByFasilitator`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const VERIF_MITRA_BY_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/verifMitra/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export {
  POST_REGISTRASI_MITRA,
  GET_SELF_MITRA,
  VERIF_MITRA_BY_FASILITATOR,
  REGISTRASI_MITRA_NEW,
  GET_MITRA_NV_BY_FASILITATOR,
};
