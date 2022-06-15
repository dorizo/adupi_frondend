import { useContext } from 'react';

import ImageViewerContext from '../contexts/ImageViewerProvider';

const useImageViewer = () => {
  return useContext(ImageViewerContext);
};

export default useImageViewer;
