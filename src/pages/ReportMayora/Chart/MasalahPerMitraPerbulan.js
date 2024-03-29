import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_MITRA_ALL_BY_SU_YES } from '../../../api/mitra';
import { GET_MASALAH_PERBULAN_JENIS_STATUS, GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINE } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function MasalahPerMitraPerbulan() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [jenisMasalah, setJenisMasalah] = useState(null);
  const [mitraCode, setMitraCode] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReset = () => {
    setStatus(null);
    setJenisMasalah(null);
    setMitraCode(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = () => {
    refetch(tahun?.value, jenisMasalah?.value, mitraCode?.value, status?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSsssss', tahun?.value], () =>
  GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINE(tahun?.value, jenisMasalah?.value, mitraCode?.value, status?.value)
  );
  const { data: mitraData } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  const listMitra = mitraData && mitraData?.data?.data;
  const mitraOption =
    listMitra &&
    listMitra?.map((m) => {
      const option = { value: m.mitraCode, title: m.nama };
      return option;
    });

  const list = data && data?.data?.data;

  const seriesData =
    !isLoading &&
    list &&
    list

  const state = {
    series: seriesData,
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
        text: 'Masalah per bulan per mitra (dalam setahun)',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: [
        {
          labels: {
            formatter: (val) => val.toFixed(0),
          },
        },
      ],
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

      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      <Typography variant="caption">*Tahun : {tahun?.title}</Typography>
      {jenisMasalah && <Typography variant="caption">, Jenis : {jenisMasalah?.title}</Typography>}
      {status && <Typography variant="caption">, Status : {status?.title}</Typography>}
      {mitraCode && <Typography variant="caption">, Mitra : {mitraCode?.title}</Typography>}
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
          <AutoCompleteLoading
            label="Status"
            options={[
              { value: 'Selesai', title: 'Selesai' },
              { value: 'Proses', title: 'Proses' },
            ]}
            loading={loading}
            value={status}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setStatus(newVal)}
          />
          <AutoCompleteLoading
            label="Jenis Masalah"
            options={[
              'Kerusakan Mesin',
              'Kerusakan Kendaraan',
              'Kerusakan Peralatan',
              'Masalah Ketenagakerjaan',
              'Masalah Suplay',
              'Kondisi Darurat',
            ].map((a) => {
              return { value: a, title: a };
            })}
            loading={loading}
            value={jenisMasalah}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setJenisMasalah(newVal)}
          />
          <AutoCompleteLoading
            label="Mitra"
            options={mitraOption}
            loading={loading}
            value={mitraCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setMitraCode(newVal)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} autoFocus>
            Reset
          </Button>
          <Button onClick={handleFilter} autoFocus>
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
