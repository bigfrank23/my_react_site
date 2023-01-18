import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

import useStyles from "./style";
import img2 from "../../../../../src/phone.webp";

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  const classes = useStyles();

  const buttons = [
    <Button variant="contained" key="one" color="secondary">
      <RemoveIcon
        onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
      />
    </Button>,
    <Button key="two" sx={{ color: "black" }}>
      {item?.quantity}
    </Button>,
    <Button variant="contained"  color="secondary">
      <AddIcon
        onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
      />
    </Button>,
  ];

  return (
    <Card>
      <CardMedia
        image={item?.image?.url}
        alt={item?.line_items?.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item?.name}</Typography>
        <Typography variant="subtitle1">
          {item?.line_total?.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          {buttons}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "1rem" },
          }}
        >
          <Button
            variant="outlined"
            type="button"
            color="error"
            endIcon={<DeleteOutlineIcon />}
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
