import axios from 'axios';

export default axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL_SSL,
});

export function catchCallBack(error) {
  console.log(error);
  if (error.response) {
    // console.log('error.response ', error.response);
    return error.response;
  }
  if (error.request) {
    // console.log('error.request ', error.request);
    return error.request;
  }
  if (error.message) {
    // do something other than the other two
    // console.log('error.message ', error.message);
    return error.message;
  }
  return error;
}
