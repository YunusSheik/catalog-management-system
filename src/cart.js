import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const CartComponent = () => {
  const { cart, placeOrder } = useContext(CartContext);

  return (
    <div style={{ padding: 20, maxWidth: 800, marginRight: "10rem" }}>
      <Typography variant="h5" gutterBottom>
        Shopping Cart ({cart.length} items)
      </Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={item.name}
              secondary={`Price: ₹${item.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={placeOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </Button>
    </div>
  );
};

export default CartComponent;
