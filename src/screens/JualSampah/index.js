import React, { useState } from 'react';
import {
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';
import BarMobile from '../../components/BarMobile';
import jualsampah from '../../assets/illustation/jual-sampah.png';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import useDrawer from '../../hooks/useDrawer';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import TextInput from '../../components/TextInput';

export default function JualSampah() {
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
      <BarMobile title={'Jual Sampah'} />
      <AdupiXMayoraHead />
      <img alt="recyle logo" width="100%" src={jualsampah} />
      <div style={{ marginTop: 35, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>
        <Typography align="center" variant="h2">
          Masukan Data
        </Typography>
        <Typography align="center" variant="h2">
          Sampah Dijual
        </Typography>
        <ButtonPrimary
          onClick={() => handleOpen('Sampah Dijual', 0)}
          style={{ marginTop: 50, marginBottom: 5 }}
          label={'Masukkan Data'}
        />
      </div>
      <Drawer title={drawerTitle}>
        {step === 0 && (
          <>
            <TextInput label={'Berat Sampah'} type="number" />
            <TextInput label={'Pembeli'} />
            <TextInput label={'Jenis Sampah'} />
            <ButtonPrimary
              onClick={() => handleOpen('Struk Penjualan', 1)}
              style={{ marginTop: 30, marginBottom: 5 }}
              label={'Selanjutnya'}
            />
          </>
        )}
        {step === 1 && (
          <>
            <div
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 20,
                border: '1px solid rgba(0, 0, 0, 0.7)',
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <Typography>BANK SAMPAH A</Typography>
                      <Typography>Jl asdfg 12 </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      2022-03-08 <br /> 12:10:00 <br /> No. 10809a
                    </TableCell>
                    <TableCell align="right">PT ASDF</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}>Bodong Mix</Typography>
                      <Typography>1000 KG x 500</Typography>
                    </TableCell>
                    <TableCell align="right">RP. 500.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                    </TableCell>
                    <TableCell align="right">RP. 500.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Terima Kasih
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </div>
            <ButtonPrimary type="submit" label="Selesai" />
          </>
        )}
      </Drawer>
    </>
  );
}
