import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ANALISA_V2_MITRA_PENJUALAN, GET_ANALISA_V2_MITRA_PENJUALANFASILITATOR, GET_ANALISI_PEMBELIAN_PEKERJA_PERBULAN } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function TotalMitravsJumlahPenjualan() {
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
    refetchmitrapembelian(tahun?.value, sessionStorage.getItem("kordinator"));
    setOpen(false);
  };

  const { data : mitrapembelian, isLoading:lodingmitrapembelian, refetch:refetchmitrapembelian } = useQuery(['GET_ANALISA_V2_PENJUALANDIR', tahun?.value], () =>
  GET_ANALISA_V2_MITRA_PENJUALANFASILITATOR(tahun?.value , sessionStorage.getItem("kordinator"))
  );
//   console.log(mitrapembelian);
  
  const list = mitrapembelian && mitrapembelian?.data?.data;
  const chartDataPekerja = [];
  const label = [];
  const mitra = [];
  if (!lodingmitrapembelian) {
    list?.forEach((v,index, arr) => {
    //   chartDataPekerja[v.bulan - 1] = v?.jumlahPekerja;
    //   chartDataJumlah[v.bulan - 1] = v?.jumlahBeli;
    chartDataPekerja[index] = v.data;
    mitra[index] = v.mitra;
    label[index] = v.tahun+"-"+v.bulan+"- 15";
    });
  }
  
  console.log(label);
  const state = {
          
    series: [{
      name: 'mitra',
      type: 'column',
      data: mitra
    }, {
      name: 'Penjualan',
      type: 'line',
      data: chartDataPekerja
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'akumulasi total mitra vs laju koleksi Penjualan perbulan',
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      labels: label,
      xaxis: {
        type: 'datetime'
      },
      yaxis: [{
        title: {
          text: 'Mitra',
        },
        
      
      },
       {
        opposite: true,
        title: {
          text: 'Penjualan per kg'
        },
        labels: {
          formatter: function (value) {
            return value.toLocaleString("id-ID");
          }
        }
        
      }]
    },
  
  
  };


//   const state = {
//     series: [
//       {
//         name: 'Pekerja',
//         data: chartDataPekerja,
//       },
//     //   {
//     //     name: 'Pembelian',
//     //     data: chartDataJumlah,
//     //   },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: 'straight',
//       },
//       title: {
//         text: 'Analisis Pembelian per pekerja',
//         align: 'left',
//       },
//       grid: {
//         row: {
//           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         categories:label
//       },
//     },
//   };

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
