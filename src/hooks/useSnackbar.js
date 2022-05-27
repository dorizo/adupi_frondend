import { useContext } from 'react';

import SnackBarContext from '../contexts/SnackbarProvider';

const useSnackbar = () => {
  return useContext(SnackBarContext);
};

export default useSnackbar;
