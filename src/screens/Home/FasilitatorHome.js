import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BottomNavigation, BottomNavigationAction, Card, CardContent, SvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import kehadiran from '../../assets/illustation/kunjunganmitra.svg';
import kehadirannonmitra from '../../assets/illustation/kunjunganmitranon.svg';


import listMitra from '../../assets/illustation/listmitra.svg';
import gesn from '../../assets/logo/logo.png';
import lemineral from '../../assets/logo/le-minerale.png';
import adupi from '../../assets/logo/adupi.png';
import useAuth from '../../hooks/useAuth';
import Akun from '../Akun';

import tambahmitra from '../../assets/illustation/tambahMitras.svg';

const menuList = [
  { title: 'Tambah Mitra', desc: 'Tambah Mitra GESN', icon: tambahmitra, link: '/mobile/tambah-mitra' },
  { title: 'List Mitra', desc: 'Daftar Mitra GESN', icon: listMitra, link: '/mobile/list-mitra' },
  { title: 'Kunjungan Mitra', desc: 'Kunjungan Mitra GESN', icon: kehadiran, link: '/mobile/list-kehadiranmitra' },
  { title: 'Kunjungan Non Mitra', desc: 'Kunjungan Non Mitra GESN', icon: kehadirannonmitra, link: '/mobile/list-kehadiran' },
];
export default function FasilitatorHome() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <div style={{ paddingBottom: 20 }}>
      {value === 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <Box style={{background: '#35a4ed'  }} position="static">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
              <img alt="gesn logo" width={80} src={gesn} style={{ marginRight: 2 }} />
              <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
              <img alt="lemineral logo" width={60} src={lemineral} style={{ marginRight: 2 }} />
            
            </div>
            <Toolbar sx={{color:"#FFFFFF"}}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <AccountCircleIcon sx={{fontSize:70}} />
              </IconButton>
              <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
                Hai,<br /> {auth && auth.user} <br />
                {auth.role && auth.role.join()}
              
              </Typography>
              <Typography style={{ wordWrap: 'break-word', width: 100, textAlign: 'right' }}>
                {' '}
              </Typography>
            </Toolbar>
            <Box sx={{ padding: 3,background:"#F5F5F5" , borderStartEndRadius:30 , borderStartStartRadius:30,marginTop:5 }}>
              <Typography variant="h6">Selamat Datang,</Typography>
              <Typography>Selamat Pagi!, Semangat Selalu</Typography>
            </Box>
          </Box>
          <Grid sx={{ padding: 3 }} container spacing={2}>
            {menuList.map((m, i) => (
              <Grid onClick={() => navigate(m.link)} key={i} item xs={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardContent
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 5 }}
                  >
                    <img alt={`menu-${i}`} style={{ width: '100%' }} src={m.icon} />
                 
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {value === 1 && <Akun />}
      <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, margin: '0 auto', left: 0, right: 0 }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Akunku" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
}
