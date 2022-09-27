import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { EDIT_BELI_SAMPAH, JUAL_SAMPAHEDIT } from 'src/api/sampah';
import * as Yup from 'yup';
import useScriptRef from '../../hooks/useScriptRef';
import Edit from './edit';

export default function DialogComponent(props) {
  const { open, onClose, item, onAdd, onUpdate, processing } = props;
  const editMode = Boolean(item && item.pembeliCode);
  const scriptedRef = useScriptRef();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [selectedImg, setSelectedImg] = useState('');
  const [prosessinput, setprosessinput] = useState(0);
  
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleEditsubmit = async () => {
    setLoading(true);
    // const response = await JUAL_SAMPAH({ ...values, nota: '-' });
    const response = await JUAL_SAMPAHEDIT({ ...values, nota: selectedImg },setprosessinput);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setStep(0);
      onClose();
      // refetch();
        queryClient.refetchQueries("GET_ALL_PENJUALAN");
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setLoading(false);
  }
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

  const handleEdit = (a, s) => {
    setStep(s);
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Pembeli</DialogTitle>
          <DialogContent>
           <Edit
          isLoading={loading}
          step={step}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          next={handleEdit}
          values={values}
          handleAdd={handleEditsubmit}
          setValues={setValues}
          prosessinput={prosessinput}
          item={item}
          />
           
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={onClose}>
              Cancel
            </Button>
           
          </DialogActions>
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
