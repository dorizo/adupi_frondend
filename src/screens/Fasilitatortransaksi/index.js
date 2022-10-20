import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import BarMobile from 'src/components/BarMobile';
import TransaksiPembelian from './pembelian';
import TransaksiPenjualan from './penjualan';

export default function Transaksi() {
  const [alignment, setAlignment] = React.useState('pembelian');

  const params = useParams();
  console.log(params);
  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
    
    <BarMobile title={'Detail Transaksi'} />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={alignment}
          style={{ marginBottom: 10 }}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton color="primary" value="pembelian">
            Pembelian
          </ToggleButton>
          <ToggleButton color="primary" value="penjualan">
            Penjualan
          </ToggleButton>
        </ToggleButtonGroup>
        {params?.mitraCode?alignment === 'pembelian' && <TransaksiPembelian parammitra={params?.mitraCode} />:<></>}
        {params?.mitraCode?alignment === 'penjualan' && <TransaksiPenjualan  parammitra={params?.mitraCode} />:<></>}
      </div>
    </>
  );
}
