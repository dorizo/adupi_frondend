import { Button } from '@mui/material';
import Camera from '@mui/icons-material/CameraAltRounded';

export default function ButtonUpload({ onClick, label, upload = false, ...props }) {
  return (
    <Button size="large" {...props} onClick={onClick} fullWidth variant="contained">
      {upload && <input onChange={upload} accept="image/*" hidden id="contained-button-file" multiple type="file" />}
       <Camera />
    </Button>
  );
}
