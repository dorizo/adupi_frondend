import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import SelectInput from '../../components/SelectInput';
import TextInput from '../../components/TextInput';

/* eslint-disable no-nested-ternary */
/* eslint-disable radix */

export default function Form({ mitra, step, isLoading, handleAdd, item, onUpdate }) {
  const editAble = (item?.kunjunganCode && true) || false;

  const handleSubmit = (values) => {
    if (editAble) {
      onUpdate(values);
    } else {
      handleAdd(values);
    }
  };
  const formik = useFormik({
    initialValues: {
      deskripsi: item ? item.deskripsi : '',
      judul: item ? item.judul : '',
      mitraCode: item ? item.mitraCode : '',
    },
    validationSchema: Yup.object({
      deskripsi: Yup.string().required('Harus Disisi'),
      mitraCode: Yup.string().required('Harus Disisi'),
      judul: Yup.string().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 0 && (
        <>
          <SelectInput
            label={'Mitra'}
            name="mitraCode"
            id="mitraCode"
            value={formik.values.mitraCode}
            onChange={formik.handleChange}
            error={formik.touched.mitraCode && Boolean(formik.errors.mitraCode)}
            option={mitra}
            pilih={false}
          />
          <TextInput
            id="judul"
            name="judul"
            type="text"
            value={formik.values.judul}
            onChange={formik.handleChange}
            error={formik.touched.judul && Boolean(formik.errors.judul)}
            helperText={formik.touched.judul && formik.errors.judul}
            label={'Judul'}
          />
          <TextInput
            id="deskripsi"
            name="deskripsi"
            type="number"
            multiline
            value={formik.values.deskripsi}
            onChange={formik.handleChange}
            error={formik.touched.deskripsi && Boolean(formik.errors.deskripsi)}
            helperText={formik.touched.deskripsi && formik.errors.deskripsi}
            label={'Deskripsi'}
          />
          <ButtonPrimary
            type="submit"
            disabled={isLoading}
            style={{ marginTop: 30, marginBottom: 5 }}
            label={'Simpan'}
          />
        </>
      )}
    </form>
  );
}

Form.propTypes = {
  step: PropTypes.any,
  item: PropTypes.any,
  onUpdate: PropTypes.func,
  isLoading: PropTypes.any,
  mitra: PropTypes.any,
  handleAdd: PropTypes.func,
};
