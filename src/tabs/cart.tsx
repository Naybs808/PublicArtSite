import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../hooks.tsx";
import {
  ProductType,
  reduceBasket,
  removeItem,
  selectItems,
  selectProducts,
  setProducts,
  stockReducer,
} from "../features/cartState/cartSlice.tsx";
import { getProduct, nameImageMap } from "./shop.tsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FontColour, colRef } from "../App.tsx";
import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import StripeDialog from "../common/StripeDialog.tsx";

export default function Cart() {
  const items = useAppSelector(selectItems);
  const products = useAppSelector(selectProducts);

  let dispatch = useAppDispatch();

  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let products: ProductType[] = [];
      snapshot.docs.forEach((doc) => {
        let docData = doc.data();
        let product = getProduct(doc.id);
        let newProduct: ProductType = {
          title: product.title,
          description: product.description,
          id: product.id,
          quantity: docData["stock"],
          image: product.image,
          price: product.price,
        };

        products.push(newProduct);
      });

      dispatch(setProducts(products));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colRef]);

  function DisplaySelections() {
    let result: any[] = [];

    result.push(
      <Grid
        container
        columns={{ xs: 15, sm: 15, md: 15 }}
        alignItems="center"
        justifyContent={"space-between"}
        key={-2}
        spacing={1}
      >
        <Grid item xs={8} sm={8} md={8}>
          <Typography variant="subtitle1">Item</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Typography variant="subtitle1">Price</Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Typography variant="subtitle1">Quantity</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Typography variant="subtitle1">Unit cost</Typography>
        </Grid>
      </Grid>
    );
    let totalCost = 0;
    products.forEach(function (prod, index) {
      let quantity = prod.quantity;
      let numInCart = items.filter((it) => it === prod.id).length;
      if (numInCart <= quantity && numInCart > 0) {
        totalCost += numInCart * Number(prod.price);
        result.push(
          <>
            <Card sx={{ maxHeight: "20%" }} key={prod.id}>
              <Grid
                container
                columns={{ xs: 15, sm: 15, md: 15 }}
                alignItems="center"
                justifyContent={"space-between"}
                spacing={2}
              >
                <Grid item xs={4} sm={4} md={4}>
                  <img
                    src={nameImageMap.get(prod.image)}
                    alt={prod.title}
                    width="100%"
                  ></img>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                  <Typography variant="subtitle1">{prod.title}</Typography>
                </Grid>

                <Grid item xs={2} sm={2} md={2}>
                  <Typography variant="subtitle1">
                    {"£" + prod.price}
                  </Typography>
                </Grid>

                <Grid item xs={3} sm={3} md={3}>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="subtitle1">
                      {String(numInCart)}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        dispatch(removeItem(prod.id));
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Stack>
                </Grid>

                <Grid item xs={2} sm={2} md={2}>
                  <Typography variant="subtitle1">
                    {"£" + String(numInCart * Number(prod.price))}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </>
        );
      } else if (numInCart > 0) {
        let basketReducer: stockReducer = {
          id: prod.id,
          quantity: prod.quantity,
        };
        dispatch(reduceBasket(basketReducer));
      }
    });

    result.push(
      <Grid
        container
        columns={{ xs: 15, sm: 15, md: 15 }}
        alignItems="center"
        justifyContent={"space-between"}
        key={-1}
      >
        <Grid item xs={13} sm={13} md={13}>
          <Typography>Total cost: </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Typography variant="subtitle1">
            {"£" + totalCost + " + VAT"}
          </Typography>
        </Grid>
      </Grid>
    );

    return result;
  }
  return (
    <>
      {items.length > 0 && (
        <>
          <Stack direction="column" spacing={2} margin={4}>
            {DisplaySelections()}
          </Stack>

          <Stack direction="row" justifyContent={"space-around"}>
            <Button
              onClick={() => {
                console.log("Clicked!");
                setShowContainer(true);
              }}
            >
              {" "}
              checkout{" "}
            </Button>
          </Stack>
        </>
      )}
      {items.length === 0 && (
        <>
          <center>
            <Typography style={{ color: FontColour }}>
              Your cart is empty.
            </Typography>
            <Typography style={{ color: FontColour }}>
              Return to the shop to add items to your cart.
            </Typography>
          </center>
        </>
      )}

      <StripeDialog
        open={showContainer}
        setOpen={setShowContainer}
        products={products}
      />
    </>
  );
}
