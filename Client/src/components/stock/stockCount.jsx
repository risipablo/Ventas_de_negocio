import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';


export function StockCount({restarStock,sumarStock,InitalStock}) {
  const [cantidad,setCantidad] = useState(InitalStock)


  useEffect(() => {
    setCantidad(InitalStock)
  },[setCantidad])

  const restar = () => {
    if(cantidad > 0)
      setCantidad(cantidad - 1)
      restarStock()
  }

  const sumar = () => {
      setCantidad(cantidad + 1)
      sumarStock()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button 
        variant="contained" color="primary" 
        sx={{ minWidth: '30px', minHeight: '30px', padding: '4px', fontSize: '1rem' }}
        onClick={restar}
      >
        -
      </Button>
      <Typography variant="body1" sx={{ mx: 2 }}>{cantidad}</Typography>
      <Button 
        variant="contained" color="primary" 
        sx={{ minWidth: '30px', minHeight: '30px', padding: '4px', fontSize: '1rem' }}
        onClick={sumar}
      >
        +
      </Button>

    </Box>
  );
}
