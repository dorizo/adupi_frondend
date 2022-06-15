import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

const ImageViewerContext = React.createContext({});

export const ImageViewerProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [img, setImg] = useState([]);

  const openImageViewer = useCallback((image) => {
    setImg(image);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    setImg([]);
  };

  function ImageViewerComponent() {
    return (
      <>
        {isViewerOpen && (
          <ImageViewer
            src={img}
            backgroundStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
            }}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={Boolean(true)}
            onClose={closeImageViewer}
          />
        )}
      </>
    );
  }
  return (
    <ImageViewerContext.Provider value={{ openImageViewer, ImageViewerComponent }}>
      {children}
    </ImageViewerContext.Provider>
  );
};

export default ImageViewerContext;
