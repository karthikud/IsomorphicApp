
import React, { Component } from "react";
import { withStyles,createMuiTheme } from "@material-ui/core/styles";
import ProductDialog from "./productDialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import axios from "axios";


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    height: 300
  }
});
const PRODUCTS_ENDPOINT =
  "https://dev-api.danielwellington.com/frontend/products";
const ASSETS_ENDPOINT = "https://dev-api.danielwellington.com/frontend/assets";
class ProductGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      openDialog: false,
      isLoading: false,
      error: null,
      currentProduct: null
    };
  }

setError = async () => {
  this.setState({
    error: true
  });
};

  getAllProducts = async () => {
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
      return products;   } catch (e) {
        await this.setError();
   }
};

  getProductAssetData = async assetId => {
    try {
      let assetResponse = await axios.get(ASSETS_ENDPOINT + "/" + assetId);
      return assetResponse.data.data.uri
    } catch (e) {
      await this.setError();
   }

  };

  getAllProductsWithAsset = async () => {

    try {
      let productsResponse = await this.getAllProducts();

        return Promise.all(productsResponse.map(
          async product => {
          let productInstance = {}
            product.elements.map(
              async element => {

              productInstance[element.name] = element.value
              productInstance["image_uri"]  = (element.name === "main_image") ? element.value.id : 'NULL';
            });
            productInstance["image_uri"]  = await this.getProductAssetData(productInstance["image_uri"] )
            const currencyFormat = new Intl.NumberFormat("en", {
              style: "currency",
              currency: productInstance["price"].unitAbbreviation
            });
            productInstance["price"]  = currencyFormat.format(productInstance["price"].value);

            return productInstance;

        }));
    } catch (e) {
      await this.setError();
   }

  };

  closeModalHandler = () => {
    this.setState({
      openDialog: false
    });
  };
  handleClickOpen = product => {
    this.setState({
      currentProduct: product,
      openDialog: true
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getAllProductsWithAsset()
      .then(products => {
        console.log(products);
        this.setState({
          productsData: products,
          isLoading: false
        });
      });
  }

  render() {
    const { productsData, isLoading, error } = this.state;

    if (error) {
      return <p>{error}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    const { classes } = this.props;

    return (
      <Container fixed>
        <Grid container spacing={3}>
          {productsData.map(product => (
            <Grid key={product.name} item xs={3}>
              <Card
                onClick={e => this.handleClickOpen(product)}
                className={classes.root}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={product.image_uri}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
              {this.state.openDialog ? (
                <ProductDialog
                  show={this.state.openDialog}
                  close={this.closeModalHandler}
                  data={this.state.currentProduct}
                ></ProductDialog>
              ) : null}
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
export default withStyles(styles)(ProductGridList);
