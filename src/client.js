import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import axios from "axios";
const PRODUCTS_ENDPOINT = "/api/products";
// Create a theme instance.
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
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(PRODUCTS_ENDPOINT).then(products => {
      // Send the rendered page back to the client.
      this.setState({
        products: products.data
      });
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <App productsData={this.state.products} />
      </ThemeProvider>
    );
  }
}

ReactDOM.hydrate(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.querySelector("#root")
);
