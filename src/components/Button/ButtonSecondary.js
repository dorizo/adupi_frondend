import { Button } from '@mui/material';

export default function ButtonSecondary({ onClick, label, ...props }) {
  return (
    <Button {...props} onClick={onClick} color="grey" fullWidth variant="contained">
      {label}
    </Button>
  );
}
