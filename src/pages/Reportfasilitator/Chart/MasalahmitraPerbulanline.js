import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUS, GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINE, GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINEFASILITATOR } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function MasalahmitraPerbulanline() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [jenisMasalah, setJenisMasalah] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReset = () => {
    setStatus(null);
    setJenisMasalah(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = () => {
    refetch(tahun?.value, jenisMasalah?.value, status?.value, sessionStorage.getItem("kordinator"));
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GETMASALAH_KOK_DIRIBETIN_YAFASILITATOR', tahun?.value], () =>
  GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINEFASILITATOR(tahun?.value, jenisMasalah?.value, status?.value , sessionStorage.getItem("kordinator"))
  );
  const list = data && data?.data?.data;

  if(!isLoading){
    console.log(isLoading);
    console.log(list);
  }
  
  const state = {
    series:  !isLoading && list,
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Masalah Perbulan',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Januari',
          'Febuari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ],
      },
    },
  };

  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
      Filter
    </Button>

    <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    <Typography variant="caption">*Tahun : {tahun?.title}</Typography>
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Filter Chart</DialogTitle>
      <DialogContent>
        <AutoCompleteLoading
          label="Tahun"
          options={yearOption}
          loading={loading}
          value={tahun}
          getOptionLabel={(option) => option.title}
          onChange={(_, newVal) => setTahun(newVal)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFilter} autoFocus>
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
