import PropTypes from 'google-map-react';
import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

export default function Register({ handleNext, isLoading, values, step }) {
  return (
    <>
      {step === 1 && <Step1 isLoading={isLoading} values={values} handleNext={handleNext} />}
      {step === 2 && <Step2 isLoading={isLoading} values={values} handleNext={handleNext} />}
      {step === 3 && <Step3 isLoading={isLoading} values={values} handleNext={handleNext} />}
      {step === 4 && <Step4 isLoading={isLoading} values={values} handleNext={handleNext} />}
      {step === 5 && <Step5 isLoading={isLoading} values={values} handleNext={handleNext} />}
      {step === 6 && <Step6 isLoading={isLoading} values={values} handleNext={handleNext} />}
    </>
  );
}
Register.propTypes = {
  handleNext: PropTypes.func,
  values: PropTypes.any,
  step: PropTypes.any,
  isLoading: PropTypes.any,
};
