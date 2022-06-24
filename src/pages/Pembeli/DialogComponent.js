import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import useScriptRef from '../../hooks/useScriptRef';

export default function DialogComponent(props) {
  const { open, onClose, item, onAdd, onUpdate, processing } = props;
  const editMode = Boolean(item && item.pembeliCode);
  const scriptedRef = useScriptRef();

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      if (item && item.pembeliCode) {
        onUpdate({ ...values }, item.pembeliCode, setErrors);
      } else {
        onAdd(values, setErrors);
      }
    } catch (err) {
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      pembeli: item ? item.pembeli : '',
    },
    validationSchema: Yup.object({
      pembeli: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Pembeli</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              name="pembeli"
              id="pembeli"
              label="Pembeli"
              type="text"
              disabled={processing}
              value={formik.values.pembeli}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.pembeli && Boolean(formik.errors.pembeli)}
              variant="standard"
              helperText={formik.touched.pembeli && formik.errors.pembeli}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={processing}>
              {editMode ? 'Edit' : 'Tambah'}
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
  onAdd: PropTypes.any,
  onUpdate: PropTypes.any,
  processing: PropTypes.any,
};
