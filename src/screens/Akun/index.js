import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SecurityIcon from '@mui/icons-material/Security';
import {
  Button,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useAuth from '../../hooks/useAuth';

const list = [
  {
    title: 'Setting',
    subList: [
      { title: 'Edit akun', icon: <ManageAccountsIcon />, link: '' },
      { title: 'Ubah password', icon: <LockIcon />, link: '' },
    ],
  },
  {
    title: 'Lainnya',
    subList: [
      { title: 'Privasi', icon: <SecurityIcon />, link: '' },
      { title: 'Term and condition', icon: <PrivacyTipIcon />, link: '' },
    ],
  },
];
export default function Akun() {
  const { logoutMobile, auth } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 ,background: '#35a4ed'  }} position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, flexDirection: 'column', marginTop: 2, marginBottom: 2 }}>
            <Typography variant="h6">Akun Setting</Typography>
            <Typography>{auth?.user}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          {list.map((li, i) => (
            <List
              key={i}
              sx={{ width: '100%', bgcolor: 'background.paper' }}
              subheader={<ListSubheader>{li.title}</ListSubheader>}
            >
              {li.subList.map((sl, i) => (
                <ListItemButton key={i}>
                  <ListItemIcon>{sl.icon}</ListItemIcon>
                  <ListItemText id="switch-list-label-wifi" primary={sl.title} />
                </ListItemButton>
              ))}
            </List>
          ))}
          <Typography align="center">GERAKAN EKONOMI SIRKULAR NASIONAL</Typography>
          <Typography style={{ fontSize: 10, marginBottom: 10 }} align="center">
            v 0.1
          </Typography>
          <Button onClick={logoutMobile} fullWidth color="error" variant="contained">
            KELUAR
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
