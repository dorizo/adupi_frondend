import { Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

export default function useDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const Drawer = ({ title = 'Title', children, closeable = true }) => (
    <div>
      <SwipeableDrawer
        PaperProps={{ elevation: 0, style: { backgroundColor: 'transparent' } }}
        anchor={'bottom'}
        open={state}
        onClose={closeable ? toggleDrawer(false) : undefined}
        onOpen={toggleDrawer(true)}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20,
            paddingBottom: 30,
          }}
        >
          <Typography sx={{ borderBottom: 3, marginBottom: 2 }} variant="h4" color="primary">
            {title}
          </Typography>
          {children}
        </div>
      </SwipeableDrawer>
    </div>
  );
  return {
    onOpen: toggleDrawer(true),
    onClose: toggleDrawer(false),
    Drawer,
  };
}
