import { CircularProgress, Typography } from '@mui/material';
import logo from '../../assets/logo/logo.png';

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
          <div style={{
            backgroundColor:"#2889BE",
            padding:10,
            borderRadius:10,
            marginBottom:10,
          }}>
          <img src={logo} alt="logo-app" width="220" />
        </div>
        <CircularProgress color="info" disableShrink />
      </div>
    </div>
  );
}
