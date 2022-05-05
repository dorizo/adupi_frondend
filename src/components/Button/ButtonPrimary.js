import { Button } from '@mui/material';

export default function ButtonPrimary({ onClick, label, upload = false, ...props }) {
  return (
    <Button size="large" {...props} onClick={onClick} fullWidth variant="contained">
      {upload && <input onChange={upload} accept="image/*" hidden id="contained-button-file" multiple type="file" />}
      {label}
    </Button>
  );
}
