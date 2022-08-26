import { IconButton, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/Drawer';
import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';;
export default function useDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    console.log(event && event.type);
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'click')) {
      console.log("swift");
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
        // onClose={closeable ? toggleDrawer(false) : undefined}
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
          <IconButton onClick={toggleDrawer(false)}>
           <ArrowBackIcon   /> 
           </IconButton>{title}
          
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
