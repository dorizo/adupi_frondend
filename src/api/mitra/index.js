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
},setingproggress) => {
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
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post('fasilitator/addMitra', data, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setingproggress(`${loaded}kb of ${total}kb | ${percent}%`);
      },
  });
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
},setingproggress) => {
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
    const response = await axios.post('registrasi/mitra', data,  { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setingproggress(`${loaded}kb of ${total}kb | ${percent}%`);
      },
  });
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
const CHECK_NIK = async ({ nik }) => {
  const data = qs.stringify({
    nik,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`registrasi/mitra/checkNIK`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const CHECK_EMAIL = async ({ email }) => {
  const data = qs.stringify({
    email,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`registrasi/mitra/checkEmail`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const CHECK_NO_HP = async ({ noHp }) => {
  const data = qs.stringify({
    noHp,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`registrasi/mitra/checkNoHP`, data, { headers });
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
const GET_MITRA_ALL_BY_FASILITATOR = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/allMitra`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_MITRA_ALL_BY_SU_YES = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`su/allMitra/yes`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_MITRA_ALL_BY_SU_NO = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`su/allMitra/no`, { headers });
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
const GET_MITRA_DETAIL_BY_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/detailMitra/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_CEK_LOKASI = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/ceklokasi/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_MITRA_DETAIL_BY_SU = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`su/detailMitra/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const AKTIFASI_AKUN_MITRA = async ({ mitraCode, roleCode }) => {
  const data = qs.stringify({
    mitraCode,
    roleCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`su/activeAccountMitra`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_MITRA_BY_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`fasilitator/deleteMitra/${id}`, { headers });
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
  GET_MITRA_ALL_BY_FASILITATOR,
  AKTIFASI_AKUN_MITRA,
  DELETE_MITRA_BY_FASILITATOR,
  GET_MITRA_ALL_BY_SU_NO,
  GET_MITRA_ALL_BY_SU_YES,
  GET_MITRA_DETAIL_BY_FASILITATOR,
  GET_MITRA_DETAIL_BY_SU,
  CHECK_EMAIL,
  CHECK_NIK,
  CHECK_NO_HP,
  GET_CEK_LOKASI,
};
