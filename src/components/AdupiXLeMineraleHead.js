import { Typography } from '@mui/material';
import React from 'react';
import adupi from '../assets/logo/logo-black.png';
import leMineral from '../assets/logo/le-minerale.png';

export default function AdupiXLeMineraleHead({ text = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
      {text === true && (
        <Typography variant="caption" style={{ marginTop: 15 }}>
          Sponsored by :
        </Typography>
      )}
      {text === false && <img alt="adupi logo" width={95} src={adupi} />}
      <img alt="leMineral logo" height={65} src={leMineral} />
    </div>
  );
}
