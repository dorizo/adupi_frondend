import { FormHelperText, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
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

  const editMode = Boolean(item && item.userCode);
  const scriptedRef = useScriptRef();

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      if (item && item.userCode) {
        onUpdate({ ...values }, item.userCode, setErrors);
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
      // name: item ? item.name : '',
      email: item ? item.email : '',
      password: item ? item.password : '',
      isActive: item ? item.isActive : '',
    },
    validationSchema: Yup.object({
      // name: Yup.string().required('Harus Disisi'),
      email: Yup.string().email('Must be a valid email').required('Harus Disisi'),
      password: Yup.string().required('Harus Disisi'),
      isActive: Yup.number().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <TextField
              margin="dense"
              name="name"
              id="name"
              label="Nama"
              type="text"
              disabled={processing}
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              variant="standard"
              helperText={formik.touched.name && formik.errors.name}
            /> */}
            <TextField
              margin="dense"
              name="email"
              id="email"
              label="Email"
              type="email"
              disabled={processing}
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              variant="standard"
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              name="password"
              id="password"
              label="Password"
              type="password"
              disabled={processing}
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              variant="standard"
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl
              error={formik.touched.isActive && Boolean(formik.errors.isActive)}
              variant="standard"
              margin="dense"
              fullWidth
              name="isActive"
              disabled={processing}
            >
              <InputLabel id="demo-simple-select-label">Active</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.isActive}
                label="Active"
                name="isActive"
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>In Active</MenuItem>
                <MenuItem value={1}>Active</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.isActive && formik.errors.isActive}</FormHelperText>
            </FormControl>
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
