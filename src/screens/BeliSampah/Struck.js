import { Container, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { fDateTime } from '../../utils/formatTime';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import { fRupiah } from '../../utils/formatNumber';

function hitungTotal(detail) {
  let total = 0;
  detail.forEach((d) => {
    total += d.harga * d.berat;
  });
  return total;
}
const ComponentToPrint = React.forwardRef(({ data }, ref) => (
  <Container ref={ref} style={{ padding: 2 }} maxWidth="sm">
    <div
      style={{
        border: '1px solid rgba(0, 0, 0, 0.7)',
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <Typography>{data.mitra.namaUsaha}</Typography>
              <Typography>{data.mitra.alamat} </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {fDateTime(data.createAt)} <br /> No. 10809a
            </TableCell>
            <TableCell align="right">{data.anggota.nama}</TableCell>
          </TableRow>
          {data.detail.map((d, i) => (
            <TableRow key={i}>
              <TableCell>
                <Typography sx={{ fontWeight: 'bold' }}>{d.jenis}</Typography>
                <Typography>
                  {d.berat} KG x {fRupiah(d.harga)}
                </Typography>
              </TableCell>
              <TableCell align="right">{fRupiah(d.berat * d.harga)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
            </TableCell>
            <TableCell align="right">{fRupiah(hitungTotal(data.detail))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              Terima Kasih
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  </Container>
));

export default function Struck({ data }) {
  const componentRef = useRef();
  const handleDownloadImage = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `struck-${new Date().toDateString()}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  return (
    <>
      <ComponentToPrint data={data} ref={componentRef} />
      <ButtonPrimary onClick={handleDownloadImage} style={{ marginBottom: 10, marginTop: 10 }} label="Download" />
    </>
  );
}
ComponentToPrint.propTypes = {
  data: PropTypes.any,
};
Struck.propTypes = {
  data: PropTypes.any,
};
