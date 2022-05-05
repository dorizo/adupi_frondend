import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

export default function MobileLayout() {
  return (
    <Container style={{ paddingTop: 0, paddingBottom: 20, paddingLeft: 0, paddingRight: 0 }} maxWidth="sm">
      <Outlet />
    </Container>
  );
}
