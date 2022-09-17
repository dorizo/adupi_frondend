import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/Drawer';
import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';;
export default function useDrawer() {
  const [state, setState] = React.useState(false);
  const[Openkonfirm , setOpenkonfirm] = React.useState(false);

  const toggleDrawer = (open) => (event) => {

    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'click')) {
      console.log("swift");
      return;
    }
    setOpenkonfirm(false);
    setState(open);
  };
  const hendelkonfirmasi = (open) => (event) => {
    setOpenkonfirm(true);
  }
  const Drawer = ({ title = 'Title', children, closeable = true }) => (
    <div>
        <Dialog open={Openkonfirm} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm the action</DialogTitle>
        <Box position="absolute" top={0} right={0}>
       
        </Box>
        <DialogContent>
          <Typography>YAKIN INGIN KELUAR ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={toggleDrawer(false)}>
            Iya
          </Button>
          <Button color="primary" variant="contained" onClick={()=>setOpenkonfirm(false)}>
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
      <SwipeableDrawer
        PaperProps={{ elevation: 0, style: { backgroundColor: 'transparent',paddingTop:20 } }}
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
          <IconButton onClick={hendelkonfirmasi(false)}>
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
