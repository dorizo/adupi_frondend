import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoadingComponent() {
    return (
        <Stack spacing={1}>
            <Skeleton width={200} height={80} variant="text" />
            <Skeleton style={{ minHeight: '100vh' }} variant="rectangular" />
        </Stack>
    );
}
