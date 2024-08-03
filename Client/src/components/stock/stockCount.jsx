import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export function StockCount() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button 
        variant="contained" color="primary" 
        sx={{ minWidth: '30px', minHeight: '30px', padding: '4px', fontSize: '1rem' }}
      >
        -
      </Button>
      <Typography variant="body1" sx={{ mx: 2 }}>0</Typography>

      <Button 
        variant="contained" color="primary" 
        sx={{ minWidth: '30px', minHeight: '30px', padding: '4px', fontSize: '1rem' }}
      >
        +
      </Button>
    </Box>
  );
}
