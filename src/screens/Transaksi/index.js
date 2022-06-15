import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import TransaksiPembelian from './pembelian';
import TransaksiPenjualan from './penjualan';

export default function Transaksi() {
  const [alignment, setAlignment] = React.useState('pembelian');

  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
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
        {alignment === 'pembelian' && <TransaksiPembelian />}
        {alignment === 'penjualan' && <TransaksiPenjualan />}
      </div>
    </>
  );
}
