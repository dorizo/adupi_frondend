import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import adupi from '../../assets/logo/adupi-w.png';
import menuBeli from '../../assets/illustation/menu-beli-sampah.png';
import menuJual from '../../assets/illustation/menu-jual-sampah.png';
import menuMasalah from '../../assets/illustation/menu-masalah.png';
import menuAnggota from '../../assets/illustation/menu-anggota.png';

const menuList = [
  { title: 'Beli Sampah', desc: 'Masukkan Data Sampah yang Dibeli', icon: menuBeli, link: '/mobile/beli-sampah' },
  { title: 'Jual Sampah', desc: 'Masukkan Data Sampah yang Dijual', icon: menuJual, link: '/mobile/jual-sampah' },
  { title: 'Masalah', desc: 'Laporkan Masalah Mesin/Kendaraan', icon: menuMasalah, link: '/mobile/masalah' },
  {
    title: 'Tambah Anggota/Sumber',
    desc: 'Tambah Anggota/Sumber Sampah',
    icon: menuAnggota,
    link: '/mobile/anggota',
  },
];
export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} position="static">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
          <img alt="adupi logo" width={50} src={adupi} />
          <Typography
            variant="caption"
            style={{
              wordWrap: 'break-word',
              width: 120,
              borderLeft: '2px solid #fff',
              paddingLeft: 5,
            }}
          >
            ASOSIASI {'\n'} DAUR ULANG {'\n'} PLASTIK INDONESIA
          </Typography>
        </div>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hai, Krisna
          </Typography>
          <Typography style={{ wordWrap: 'break-word', width: 100 }}>Universitas Lampung</Typography>
          <LocationOnIcon />
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h3">Selamat Datang,</Typography>
        <Typography variant="h3">PT. KMBRPS</Typography>
        <Typography>Selamat bergabung sebagai mitra</Typography>
        <br />
        <Button color="error" variant="contained">
          Lengkapi Pendaftaran
        </Button>
      </Box>
      <Grid sx={{ padding: 3 }} container spacing={2}>
        {menuList.map((m, i) => (
          <Grid
            onClick={() => navigate(m.link)}
            key={i}
            style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            item
            xs={6}
          >
            <div style={{}}>
              <img alt={`menu-${i}`} style={{ width: '100%' }} src={m.icon} />
              <Typography variant="h4">{m.title}</Typography>
              <Typography variant="caption">{m.desc}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
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
    </Box>
  );
}
