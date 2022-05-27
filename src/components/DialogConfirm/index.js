import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PropTypes } from 'prop-types';

export default function DialogConfirm({ processing, alertOpen, alertClose, handleConfirm, text }) {
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={alertOpen}
                onClose={alertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={processing} onClick={alertClose}>
                        Batal
                    </Button>
                    <Button disabled={processing} variant="contained" onClick={handleConfirm}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
DialogConfirm.propTypes = {
    processing: PropTypes.any,
    alertOpen: PropTypes.any,
    alertClose: PropTypes.any,
    handleConfirm: PropTypes.any,
    text: PropTypes.any
};
