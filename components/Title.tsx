import * as React from 'react';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from "react";


export default function Title({ children }: PropsWithChildren<{children?:React.ReactNode}>) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}