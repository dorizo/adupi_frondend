import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { StaticTimePicker } from '@mui/x-date-pickers';
import BarMobile from '../../components/BarMobile';
import masalah from '../../assets/illustation/masalah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import useDrawer from '../../hooks/useDrawer';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function ListMitra() {
  const { onOpen, Drawer } = useDrawer();
  const [drawerTitle, setDrawerTitle] = useState('');
  const [beliTime, setBeliTime] = useState(new Date());
  const [selectedImg, setSelectedImg] = useState(null);
  const [step, setStep] = useState(0);

  const handleOpen = (a, s) => {
    setDrawerTitle(a);
    setStep(s);
    onOpen();
  };
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  return (
    <>
      <BarMobile title={'List Mitra'} />
      <AdupiXMayoraHead />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <Typography style={{ marginBottom: 20 }} variant="h2">
          Daftar Mitra
        </Typography>
        {new Array(5).fill('Dummy').map((li) => (
          <Card style={{ marginBottom: 10 }}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Bagas Ageng"
              subheader="Alamat asfgh kgas fdkgjasd hh"
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      Anggota :{' '}
                    </Typography>
                    <Typography variant="caption">100</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      Kapasitas :{' '}
                    </Typography>
                    <Typography variant="caption">100</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  Aktivitas terakhir :{' '}
                </Typography>
                <Typography variant="caption">2022-05-12 10:20</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
