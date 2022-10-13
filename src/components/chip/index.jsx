import React from 'react';
import {Chip as ChipMaterial, createTheme, ThemeProvider} from "@mui/material";

export const Chip = ({label}) => {

  const chipTheme = createTheme({
    components: {
      MuiChip: {
        variants: [
          {
            props: {variant: 'white'},
            style: {
              color: '#fff',
              backgroundColor: 'rgba(109,109,109,0.5)'
            }
          }
        ]
      }
    }
  })

  return (
    <ThemeProvider theme={chipTheme}>
      <ChipMaterial label={label} variant='white'/>
    </ThemeProvider>
  );
}
