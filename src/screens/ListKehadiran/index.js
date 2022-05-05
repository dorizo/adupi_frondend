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

export default function ListKehadiran() {
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
      <BarMobile title={'List Kehadiran'} />
      <AdupiXMayoraHead />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <Typography style={{ marginBottom: 20 }} variant="h2">
          Pelatihan 1
        </Typography>
        {new Array(5).fill('Dummy').map((li) => (
          <Card style={{ marginBottom: 10 }}>
            <CardHeader title="Bagas Ageng" subheader="Hadir" />
          </Card>
        ))}
      </div>
    </>
  );
}
