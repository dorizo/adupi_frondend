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
  const { open, onClose, item, onAdd, onUpdate, processing, option } = props;

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
      name: item ? item.name : '',
      email: item ? item.email : '',
      password: item ? item.password : '',
      nik_ta: item ? item.nik_ta : '',
      nik_api: item ? item.nik_api : '',
      package_id: item ? item.package_id : '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Harus Disisi'),
      email: Yup.string().email('Must be a valid email').required('Harus Disisi'),
      password: Yup.string().required('Harus Disisi'),
      nik_ta: Yup.string().required('Harus Disisi'),
      nik_api: Yup.string().required('Harus Disisi'),
      package_id: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
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
            />
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
            <TextField
              margin="dense"
              name="nik_ta"
              id="nik_ta"
              label="NIK TA"
              type="text"
              disabled={processing}
              value={formik.values.nik_ta}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.nik_ta && Boolean(formik.errors.nik_ta)}
              variant="standard"
              helperText={formik.touched.nik_ta && formik.errors.nik_ta}
            />
            <TextField
              margin="dense"
              name="nik_api"
              id="nik_api"
              label="NIK API"
              type="text"
              disabled={processing}
              value={formik.values.nik_api}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.nik_api && Boolean(formik.errors.nik_api)}
              variant="standard"
              helperText={formik.touched.nik_api && formik.errors.nik_api}
            />
            <FormControl
              error={formik.touched.package_id && Boolean(formik.errors.package_id)}
              variant="standard"
              margin="dense"
              fullWidth
              disabled={processing}
            >
              <InputLabel id="demo-simple-select-label">Package</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.package_id}
                label="package_id"
                name="package_id"
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>Not Set</MenuItem>
                {option && option.map((o) => <MenuItem value={o.id}>{o.label}</MenuItem>)}
              </Select>
              <FormHelperText>{formik.touched.package_id && formik.errors.package_id}</FormHelperText>
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
  option: PropTypes.any,
  processing: PropTypes.any,
};
