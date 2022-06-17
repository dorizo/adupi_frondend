import axios, { catchCallBack } from '../index';

const GET_REPORT_MITRA_BY_DATE = async (start, end) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/all/${start}/${end}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_REPORT_MITRA_DETAIL_BY_DATE = async (start, end, id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/detail/${id}/${start}/${end}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { GET_REPORT_MITRA_BY_DATE, GET_REPORT_MITRA_DETAIL_BY_DATE };
