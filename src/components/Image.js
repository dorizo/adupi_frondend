import React from 'react';
import useImageViewer from '../hooks/useImageViewer';

export default function Image({
  src,
  folder,
  dummy = 'https://dummyimage.com/400x400/000000/fff&text=dummy',
  ...props
}) {
  const { handleOpen, ImageViewerComponent } = useImageViewer();

  return (
    <>
      <div
        style={{ padding: 0, margin: 0 }}
        role="button"
        onClick={() => handleOpen(`${process.env.REACT_APP_API_URL_SSL}assets/${folder}/${src}`, dummy)}
        onKeyPress={() => handleOpen(`${process.env.REACT_APP_API_URL_SSL}assets/${folder}/${src}`, dummy)}
        tabIndex="0"
      >
        <img
          {...props}
          src={`${process.env.REACT_APP_API_URL_SSL}assets/${folder}/${src}`}
          alt={`img-barang`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = dummy;
          }}
        />
      </div>
      <ImageViewerComponent />
    </>
  );
}
