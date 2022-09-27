import { Container, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import { fDateTime } from '../../utils/formatTime';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import { fRupiah } from '../../utils/formatNumber';
import gesn from '../../assets/logo/logo.png';
import lemineral from '../../assets/logo/le-minerale.png';
import adupi from '../../assets/logo/adupi.png';

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
          <TableRow style={{background:'#35a4ed'}}>
            <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
              <img alt="gesn logo" width={80} src={gesn} style={{ marginRight: 2 }} />
              <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
              <img alt="lemineral logo" width={60} src={lemineral} style={{ marginRight: 2 }} />
            
            </div>
            </TableCell>
            <TableCell align="center" colSpan={1}>
              <Typography sx={{ fontWeight: 'bold' }}>{data.mitra.namaUsaha}</Typography>
              <Typography>{data.mitra.alamat} </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Transaksi {fDateTime(data.createAt)} <br /> No. {Math.floor(Math.random() * 999999999999)}<br />Dibuat {fDateTime(new Date())}
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
  // const handleDownloadImage = async () => {
  //   const element = componentRef.current;
  //   const canvas = await html2canvas(element);

  //   const data = canvas.toDataURL('image/jpg');
  //   const link = document.createElement('a');

  //   if (typeof link.download === 'string') {
  //     link.href = data;
  //     link.download = `struck-${new Date().toDateString()}.jpg`;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     window.open(data);
  //   }
  // };
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('old boring text');

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called'); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log('`onBeforePrint` called'); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log('`onBeforeGetContent` called'); // tslint:disable-line no-console
    setLoading(true);
    setText('Loading new text...');

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText('New, Updated Text!');
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: 'AwesomeFileName',
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  return (
    <>
      <ComponentToPrint data={data} ref={componentRef} />
      <ButtonPrimary
        disabled={loading}
        onClick={handlePrint}
        style={{ marginBottom: 10, marginTop: 10 }}
        label={loading ? 'loading Print' : 'Print'}
      />
    </>
  );
}
ComponentToPrint.propTypes = {
  data: PropTypes.any,
};
Struck.propTypes = {
  data: PropTypes.any,
};
