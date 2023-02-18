import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ANALISI_PEMBELIAN_LUAS_GUDANG_PERBULAN } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PembelianPerLuas() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = () => {
    refetch(tahun?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_ANALISI_PEMBELIAN_LUAS_GUDANG_PERBULAN', tahun?.value], () =>
    GET_ANALISI_PEMBELIAN_LUAS_GUDANG_PERBULAN(tahun?.value)
  );
  const list = data && data?.data?.data;
  const chartDataLuas = [...Array(12)].map(() => 0);
  const chartDataJumlah = [...Array(12)].map(() => 0);
  if (!isLoading) {
    list?.forEach((v) => {
      chartDataLuas[v.bulan - 1] = v.jumlahLuasGudang;
      chartDataJumlah[v.bulan - 1] = v.jumlahBeli;
    });
  }
  const state = {
    series: [
      {
        name: 'Luas',
        data: chartDataLuas,
      },
      {
        name: 'Pembelian',
        data: chartDataJumlah,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Analisis Pembelian per luas gudang',
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
