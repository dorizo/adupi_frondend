import { Typography } from '@mui/material';
import React from 'react';
import adupi from '../assets/logo/adupi.png';
import mayora from '../assets/logo/mayora.png';

export default function AdupiXMayoraHead({ text = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
      {text === true && (
        <Typography variant="caption" style={{ marginTop: 15 }}>
          Sponsored by :
        </Typography>
      )}
      {text === false && <img alt="adupi logo" width={65} src={adupi} />}
      <img alt="mayora logo" width={60} height={53} src={mayora} />
    </div>
  );
}
