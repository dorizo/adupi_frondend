import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_MASALAH = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('masalah/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ALL_MASALAH_DASHBOARD = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('masalah/allstatuscount', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ALL_MASALAH_DASHBOARDLIST = async (kode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/allstatus/${kode}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ALL_ACTIVITI_DASHBOARDLIST = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`logfasilitator`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ALL_MASALAH_BY_MITRA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/all/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const CHANGE_STATUS_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/changeStatus/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const CHANGE_STATUS_MASALAHbyfasilitator = async ({ masalahCode , status ,updateAt }) => {
  const data = qs.stringify({
    masalahCode,
    status,
    updateAt,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`masalah/rubahfasilitatormasalah`,data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const NOTE_MASALAH_FASILITATOR = async ({ masalahCode, note, status }) => {
  const data = qs.stringify({
    masalahCode,
    note,
    status,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`fasilitator/masalahnote`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_MASALAH = async ({ jenisMasalah, deskripsi, foto },progressig) => {
  const data = qs.stringify({
    jenisMasalah,
    deskripsi,
    foto,
  });
  try {
    const response = await axios.post(`masalah/add`, data, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        progressig(`${loaded}kb of ${total}kb | ${percent}%`);
        // setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
      },
    }
    );
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_MASALAH = async ({ jenisMasalah, deskripsi, foto }, id) => {
  const data = qs.stringify({
    jenisMasalah,
    deskripsi,
    foto,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`masalah/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`masalah/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export {
  ADD_MASALAH,
  GET_ALL_MASALAH,
  GET_ALL_MASALAH_BY_MITRA,
  DELETE_MASALAH,
  UPDATE_MASALAH,
  GET_ONE_MASALAH,
  CHANGE_STATUS_MASALAH,
  CHANGE_STATUS_MASALAHbyfasilitator,
  GET_ALL_MASALAH_DASHBOARD,
  GET_ALL_MASALAH_DASHBOARDLIST,
  GET_ALL_ACTIVITI_DASHBOARDLIST,
  NOTE_MASALAH_FASILITATOR,
};
