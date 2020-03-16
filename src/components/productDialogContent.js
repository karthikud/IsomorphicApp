import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 300,
    height: 300
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});
class ProductDialogContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={this.props.data.image_uri}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {this.props.data.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {this.props.data.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  QTY: {this.props.data.qty_pack}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SKU: {this.props.data.sku}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  SIZE: {this.props.data.size}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  COLOR: {this.props.data.color}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(ProductDialogContent);
