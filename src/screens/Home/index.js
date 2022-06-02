import * as React from 'react';
import useAuth from '../../hooks/useAuth';
import FasilitatorHome from './FasilitatorHome';
import MitraHome from './MitraHome';

export default function Home() {
  const { auth } = useAuth();
  console.log(auth?.role?.find((role) => ['Fasilitator'].includes(role)));
  if (auth?.role?.find((role) => ['Fasilitator'].includes(role))) {
    return <FasilitatorHome />;
  }
  return <MitraHome />;
}
