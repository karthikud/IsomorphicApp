import React, { Component } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ProductGridList from "./productGridList";
import ButtonAppBar from "./buttonAppBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#000",
      main: "#000",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <ButtonAppBar />
          <ProductGridList productsData = {this.props.productsData} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
