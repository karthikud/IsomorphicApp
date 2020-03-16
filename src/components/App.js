import React from "react";
import { ThemeProvider,createMuiTheme   } from "@material-ui/core/styles";
import { black } from '@material-ui/core/colors';

import ProductGridList from "./productGridList";
import ButtonAppBar from "./buttonAppBar";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000',
      main: '#000',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <ButtonAppBar />
      <ProductGridList />
    </div>
    </ThemeProvider>

  );
}

export default App;
