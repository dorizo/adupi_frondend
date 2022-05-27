import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function useSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [severity, setSeverity] = React.useState('success');

    const snackBarOpen = (t, s) => {
        setOpen(true);
        setText(t);
        setSeverity(s);
    };

    const snackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    function SnackBarComponent() {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={snackBarClose}
                >
                    <Alert onClose={snackBarClose} severity={severity} sx={{ width: '100%' }}>
                        {text}
                    </Alert>
                </Snackbar>
            </Stack>
        );
    }
    return {
        snackBarOpen,
        snackBarClose,
        SnackBarComponent
    };
}
