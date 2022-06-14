import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';

export default function Step2({ handleNext, values, isLoading }) {
  const [selectedImg, setSelectedImg] = useState(values?.ktp || null);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };
  };
  const removeImg = () => {
    setSelectedImg(null);
  };
  return (
    <>
      <div style={{ paddingLeft: 40, paddingRight: 40, marginBottom: 20 }}>
        {selectedImg && (
          <a style={{ width: '100%' }} role="button" tabIndex={0} onKeyDown={removeImg} onClick={removeImg}>
            <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
          </a>
        )}
        <ButtonPrimary upload={handleUploadClick} component="label" label="Unggah File KTP" />
      </div>
      <ButtonPrimary
        disabled={selectedImg === null || isLoading}
        // onClick={() => handleNext(3, 'Data Usaha', { ktp: '-' })}
        onClick={() => handleNext(3, 'Data Usaha', { ktp: selectedImg })}
        label="Selanjutnya"
      />
    </>
  );
}

Step2.propTypes = {
  handleNext: PropTypes.func,
  isLoading: PropTypes.any,
  values: PropTypes.any,
};
