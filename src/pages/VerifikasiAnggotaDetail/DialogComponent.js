import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import dummyKtp from '../../assets/dummy-ktp.jpg';
import Image from '../../components/Image';

export default function DialogComponent(props) {
  const { open, onClose, item, handleVerifikasi, processing } = props;

  const handleSubmit = (values) => {
    handleVerifikasi(values);
  };
  const formik = useFormik({
    initialValues: {
      lat: item?.lat || '',
      long: item?.long || '',
    },
    validationSchema: Yup.object({
      lat: Yup.number().required('Harus Disisi'),
      long: Yup.number().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Verifikasi Anggota</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <Card style={{ marginBottom: 10, padding: 0 }}>
            <CardContent style={{ padding: 10 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 12 }}>{item?.nama}</Typography>
                  <Typography sx={{ fontSize: 10 }}>NIK : {item?.nik}</Typography>
                  <Typography sx={{ fontSize: 10 }}>No Hp : {item?.noHp}</Typography>
                  <Typography sx={{ fontSize: 10 }}>Alamat : {item?.alamat} {item?.desa}, kecamatan {item?.kecamatan}, {item?.kabupaten}, {item?.provinsi}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Image style={{ height: 100 }} folder="anggota" src={item?.ktp} dummy={dummyKtp} alt={`img-ktp`} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <DialogContent>
            <TextField
              margin="dense"
              name="lat"
              id="lat"
              label="Latitude"
              type="number"
              disabled={processing}
              value={formik.values.lat}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.lat && Boolean(formik.errors.lat)}
              variant="standard"
              helperText={formik.touched.lat && formik.errors.lat}
            />
            <TextField
              margin="dense"
              name="long"
              id="long"
              label="Longitude"
              type="number"
              disabled={processing}
              value={formik.values.long}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.long && Boolean(formik.errors.long)}
              variant="standard"
              helperText={formik.touched.long && formik.errors.long}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={processing}>
              Verifikasi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
DialogComponent.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  item: PropTypes.any,
  handleVerifikasi: PropTypes.any,
  processing: PropTypes.any,
};
