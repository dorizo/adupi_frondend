import { CircularProgress } from '@mui/material';
import logo from '../../assets/images/logo.png';

export default function LoadingPage() {
    return (
        <div>
            <div
                style={{ minHeight: '100vh' }}
                className=" jumbotron  d-flex m-auto justify-content-center flex-column align-items-center "
            >
                <img src={logo} alt="logo-app" width="120" />;
                <CircularProgress color="error" disableShrink />
            </div>
        </div>
    );
}
