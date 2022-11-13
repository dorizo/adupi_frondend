
import { FormHelperText, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import { useQuery } from 'react-query';
import { GET_MITRA_ALL_BY_SU_YES } from 'src/api/mitra';
import * as Yup from 'yup';
import useScriptRef from '../../hooks/useScriptRef';

export default function DialogComponent(props) {
  const { open, onClose, item, onAdd, onUpdate, processing } = props;

  const editMode = Boolean(item && item.userCode);
  const scriptedRef = useScriptRef();

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    console.log(values);
    try {
      if (item && item.MitraTargetCode) {
        onUpdate({ ...values }, item.MitraTargetCode, setErrors);
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
      mitraCode: item ? item.mitraCode : '',
      MitraTargetName: item ? item.MitraTargetName : '',
      MitraTargetTanggal: item ? item.MitraTargetTanggal : '',
    },
    validationSchema: Yup.object({
      mitraCode: Yup.string().required('Harus Disisi'),
      MitraTargetName: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });
  const { data:datamitra, isLoading:lodingmitra } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Target</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
           
            <DesktopDatePicker
                  label="Dari"
                  fullWidth
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.MitraTargetTanggal}
                  onChange={(value) => {
                    console.log(value.$d);
                    
                    formik.setFieldValue('MitraTargetTanggal', value);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
                />
            <FormControl
              error={formik.touched.mitraCode && Boolean(formik.errors.mitraCode)}
              variant="standard"
              margin="dense"
              fullWidth
              name="isActive"
              disabled={processing}
            >
              <InputLabel id="demo-simple-select-label">Mitra</InputLabel>
              <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name='mitraCode'
                    value={formik.values.mitraCode}
                    style={{width:"100%"}}
                    onChange={formik.handleChange}
                  >
                    {datamitra?.data?.data.map((row ,indexx)=>{
                      
                       return(<MenuItem value={row.mitraCode}>{row.nama} ({row?.usahas?.[0]?.namaUsaha})</MenuItem>) 
                        
                      })}
                </Select>
               
              <FormHelperText>{formik.touched.mitraCode && formik.errors.mitraCode}</FormHelperText>
            </FormControl>
            <CurrencyFormat 
                fullWidth 
                customInput={TextField}
                thousandSeparator={true} 
                style={{paddingBottom:15 ,paddingTop:15}}
                type="tel"
                onValueChange={(e) => {
                  formik.setFieldValue('MitraTargetName',e.value);
                }}
                value={formik.values.MitraTargetName}
                label={'Target'}
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
