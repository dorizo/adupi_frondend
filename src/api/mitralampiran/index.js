import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_mitraLampiran = async (search) => {
  console.log(search);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.get('lampiran/'+search, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  };
  const ADD_MITRALAMPIRANIMAGE = async ({ MitraLampiranImageKeterangan, MitraLampiranImageFoto, MitraLampiranCode, MitraCode}) => {
    const data = qs.stringify({
      MitraLampiranImageKeterangan,
      MitraLampiranCode,
      MitraCode,
      MitraLampiranImageFoto,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.post(`savelampiran`, data, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  };
  
const DELETE_LAMPIRANIMAGE = async ({id}) => {
  const data = qs.stringify({
    id
  });
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`deletelampiran`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }

};
  export {GET_mitraLampiran ,ADD_MITRALAMPIRANIMAGE,DELETE_LAMPIRANIMAGE}