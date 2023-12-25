import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { Container } from "@mui/system";

export default function ModelDetail() {
  return (
    <Container maxWidth={false}>
      <Skeleton variant="rounded" width="100%" height={250} sx={{ marginBottom: "1em" }} />
      <Skeleton variant="rounded" width="100%" height={250} sx={{ marginBottom: "1em" }} />
      <Skeleton variant="rounded" width="100%" height={250} sx={{ marginBottom: "1em" }} />
      <Skeleton variant="rounded" width="100%" height={250} sx={{ marginBottom: "1em" }} />
      <Skeleton variant="rounded" width="100%" height={250} sx={{ marginBottom: "1em" }} />
    </Container>
  );
}
