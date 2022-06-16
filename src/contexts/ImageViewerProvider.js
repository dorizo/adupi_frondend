import Modal from '@mui/material/Modal';
import React, { useState } from 'react';

const ImageViewerContext = React.createContext({});

export const ImageViewerProvider = ({ children }) => {
  const [src, setSrc] = useState(null);
  const [dummy, setDummy] = useState('https://dummyimage.com/400x400/000000/fff&text=blank');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (src, dumy = 'https://dummyimage.com/400x400/000000/fff&text=blank') => {
    setSrc(src);
    setDummy(dumy);
    setOpen(true);
  };

  const handleClose = () => {
    setSrc(null);
    setDummy('https://dummyimage.com/400x400/000000/fff&text=blank');
    setOpen(false);
  };
  function ImageViewerComponent() {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <img
              src={src}
              alt={`img-barang-asdas`}
              width={700}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = dummy;
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
  return (
    <ImageViewerContext.Provider value={{ ImageViewerComponent, handleOpen }}>{children}</ImageViewerContext.Provider>
  );
};

export default ImageViewerContext;
