import { Skeleton, Stack } from '@mui/material';

export default function LoadingCard({ size = 3 }) {
  return [...Array(size)].map((_, i) => (
    <Stack key={i} spacing={1}>
      <Skeleton width={'100%'} height={80} variant="text" />
      <Skeleton width={'100%'} height={250} variant="rectangular" />
    </Stack>
  ));
}
