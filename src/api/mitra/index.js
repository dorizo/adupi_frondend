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
    const response = await axios.post('master/jenisSampah/all', data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { POST_REGISTRASI_MITRA };
