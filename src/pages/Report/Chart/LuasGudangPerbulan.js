import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_LUAS_GUDANG_PERBULAN } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function LuasGudangPerbulan() {
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

  const { data, isLoading, refetch } = useQuery(['GET_LUAS_GUDANG_PERBULAN', tahun?.value], () =>
    GET_LUAS_GUDANG_PERBULAN(tahun?.value)
  );
  const list = data && data?.data?.data;
  
  const chartDataPekerja = [];
  const label = [];
  const mitra = [];
  if (!isLoading) {
    list?.forEach((v,index, arr) => {
    //   chartDataPekerja[v.bulan - 1] = v?.jumlahPekerja;
    //   chartDataJumlah[v.bulan - 1] = v?.jumlahBeli;
    chartDataPekerja[index] = v.data;
    mitra[index] = "luas Gudang";
    label[index] = v.tahun+"-"+v.bulan+"- 15";
    });
  }
  // const chartData = [...Array(12)].map(() => 0);
  // if (!isLoading) {
  //   list?.forEach((v) => {
  //     chartData[v.bulan - 1] = v.luasGudang;
  //   });
  // }
  const state = {
    series: [
      {
        name: 'Luas Gudang',
        data: chartDataPekerja,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Akumulasi luas gudang semua mitra perbulan (m2)',
      },

      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
      },

      xaxis: {
        categories:label,
        
        type: 'datetime'
      },

      
      yaxis: [{
      labels: {
          formatter: function (value) {
            return value.toLocaleString("id-ID");
          }
        }
      }]
    },
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter
      </Button>

      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
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
