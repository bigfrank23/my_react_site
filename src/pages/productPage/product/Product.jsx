import React, { useState } from "react";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import useStyles from "./styles";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button, Box, } from "@mui/material";
import { commerce } from "../../../lib/commerce";
import { useParams } from "react-router-dom";

import img2 from "../../../../src/phone.webp";

const Product = () => {
  const classes = useStyles();
  const productId = useParams()
  const [product, setProduct] = useState([])
// console.log(productId.id);
  commerce.products
    .retrieve(productId.id)
    .then((product) => setProduct(product) );
  // console.log(product);
  // return <div>test</div>
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product?.image?.url}
        title={product.name}
      />
      <CardContent sx={{ background: "beige" }}>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            color="crimson"
            fontWeight={700}
            gutterBottom
          >
            {product.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          endIcon={<AddShoppingCart />}
          color="secondary"
          sx={{ marginTop: 1 }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
