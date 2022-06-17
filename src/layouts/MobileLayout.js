import { Alert, Container } from '@mui/material';
import { Offline } from 'react-detect-offline';
import { Outlet } from 'react-router-dom';

export default function MobileLayout() {
  return (
    <Container style={{ paddingTop: 0, paddingBottom: 20, paddingLeft: 0, paddingRight: 0 }} maxWidth="sm">
      <Offline>
        <Alert severity="error">Anda sedang offline!</Alert>
      </Offline>
      <Outlet />
    </Container>
  );
}
