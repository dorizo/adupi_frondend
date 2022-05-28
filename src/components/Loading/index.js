import { CircularProgress, Typography } from '@mui/material';
import logo from '../../assets/logo/adupi.png';

export default function LoadingPage() {
  return (
    <div>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="logo-app" width="120" />
        <CircularProgress color="info" disableShrink />
      </div>
    </div>
  );
}
