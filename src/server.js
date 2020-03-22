import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./components/App";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
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
const PRODUCTS_ENDPOINT =
  "https://dev-api.danielwellington.com/frontend/products";
const ASSETS_ENDPOINT = "https://dev-api.danielwellington.com/frontend/assets";

const getAllProducts = async () => {
  try {
    let productList = await axios.get(PRODUCTS_ENDPOINT);
    let products = await Promise.all(
      productList.data.data.map(async product => {
        let productResponse = await axios.get(
          PRODUCTS_ENDPOINT + "/" + product.id
        );
        return productResponse.data.data;
      })
    );
    return products;
  } catch (e) {
    return this.setError(e);
  }
};

const getProductAssetData = async assetId => {
  try {
    let assetResponse = await axios.get(ASSETS_ENDPOINT + "/" + assetId);
    return assetResponse.data.data.uri;
  } catch (e) {
    return this.setError(e);
  }
};

const getAllProductsWithAsset = async () => {
  try {
    let productsResponse = await getAllProducts();

    return Promise.all(
      productsResponse.map(async product => {
        let productInstance = {};
        product.elements.map(async element => {
          productInstance[element.name] = element.value;
          productInstance["image_uri"] =
            element.name === "main_image" ? element.value.id : "NULL";
        });
        productInstance["image_uri"] = await getProductAssetData(
          productInstance["image_uri"]
        );
        const currencyFormat = new Intl.NumberFormat("en", {
          style: "currency",
          currency: productInstance["price"].unitAbbreviation
        });
        productInstance["price"] = currencyFormat.format(
          productInstance["price"].value
        );
        return productInstance;
      })
    );
  } catch (e) {
    return this.setError(e);
  }
};
function handleRender(req, res, next) {
  if (req.path === "/api/products") return next();

  const sheets = new ServerStyleSheets();
  let html;
  getAllProductsWithAsset()
    .then(products => {
      html = ReactDOMServer.renderToString(
        sheets.collect(
          <ThemeProvider theme={theme}>
            <App productsData={products} />
          </ThemeProvider>
        )
      );
      // Grab the CSS from the sheets.
      const css = sheets.toString();

      // Send the rendered page back to the client.
      res.send(renderFullPage(html, css));
    })
    .catch(err => {
      next(err); // Pass errors to Express.
    });
}
function renderFullPage(html, css) {
  return `
     <!DOCTYPE html>
     <html>
       <head>
         <title>My page</title>
         <style id="jss-server-side">${css}</style>
       </head>
       <body>
         <div id="root">${html}</div>
         <script src="/static/client.js"></script>

       </body>
     </html>
   `;
}
const app = express();
// This is fired every time the server-side receives a request.
app.get("/", function(req, res, next) {
  handleRender(req, res, next);
});

app.use("/static", express.static("public"));

app.get("/api/products", (req, res, next) => {
  getAllProductsWithAsset()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      next(err); // Pass errors to Express.
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
