import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProductDialog from "./productDialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  media: {
    height: 300
  }
});

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


  render() {
    const { isLoading, error } = this.state;
    const { productsData } = this.props;

    if (error) {
      return <p>{error.message}</p>;
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
