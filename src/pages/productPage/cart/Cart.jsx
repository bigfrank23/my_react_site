import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CartItem from "./cartItem/CartItem";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import useStyles from "./style";
import { Link } from "react-router-dom";

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
  const isEmpty = !cart?.line_items?.length; //cart.line_items.length === 0
  // const carts = [1, 2, 3];
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,{" "}
      <Link to="/products" className={classes.link}>
        add now
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart?.line_items?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cart?.subtotal?.formatted_with_symbol}
        </Typography>
        <Box>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="outlined"
            color="secondary"
            startIcon={<RemoveShoppingCartIcon />}
            onClick={handleEmptyCart}
          >
            {" "}
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            component={Link}
            to="/checkout"
            endIcon={<ShoppingCartCheckoutIcon />}
            sx={{ marginTop: { xs: "1rem", md: 0 } }}
          >
            {" "}
            Check Out
          </Button>
        </Box>
      </div>
    </>
  );
  //   if (!cart.line_items) return "...loading";
  return (
    <Container
      maxWidth
      sx={{
        marginBottom: "20px",
        background: "#fff",
        padding: { xs: "5rem 2rem", md: "5rem 10rem !important" },
      }}
    >
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterButtom={true}>
        Your Shopping Cart
      </Typography>
      {/* {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />} */}
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
