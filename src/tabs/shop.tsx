import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";

import data from "../products.json";

import stageScan from "../images/StageScan.jpg";
import butterfly from "../images/Butterfly.jpeg";
import wimbledon from "../images/Wimbledon.jpeg";
import daisy from "../images/DaisyField.jpeg";
import winter from "../images/WinterSun.jpeg";

import {
  ProductType,
  addItem,
  selectItems,
  selectProducts,
  setProducts,
} from "../features/cartState/cartSlice.tsx";
import { useAppDispatch, useAppSelector } from "../hooks.tsx";
import { onSnapshot } from "firebase/firestore";
import { colRef } from "../App.tsx";

export const nameImageMap = new Map<string, typeof stageScan>();
nameImageMap.set("StageScan.jpg", stageScan);
nameImageMap.set("Butterfly.jpeg", butterfly);
nameImageMap.set("Wimbledon.jpeg", wimbledon);
nameImageMap.set("DaisyField.jpeg", daisy);
nameImageMap.set("WinterSun.jpeg", winter);

export function getProduct(id: string): any {
  for (let i = 0; i < data.products.length; ++i) {
    if (data.products[i].id === id) {
      return data.products[i];
    }
  }
}

export default function Shop() {
  let dispatch = useAppDispatch();
  let products = useAppSelector(selectProducts);
  let items = useAppSelector(selectItems);

  // real time collection data
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

  function displayProducts(): ReactNode {
    let result: any = [];
    for (let i = 0; i < products.length; ++i) {
      let numInCart = items.filter((it) => it === products[i].id).length;
      result.push(
        <Grid item key={i}>
          <Card
            key={products[i].id}
            sx={{ border: "1px solid grey", maxWidth: 300 }}
          >
            <Box sx={{ width: 300, height: 300 }}>
              <img
                src={nameImageMap.get(products[i].image)}
                alt={products[i].title}
                width="100%"
              ></img>

              {products[i].quantity === 0 && (
                <Box
                  variant="subtitle1"
                  style={{
                    position: "relative",
                    top: "-10%",
                    left: "60%",
                    color: "white",
                  }}
                  sx={{
                    backgroundColor: "black",
                    borderRadius: 10,
                    width: "12ch",
                  }}
                >
                  <center>
                    <Typography
                      style={{
                        color: "white",
                      }}
                    >
                      {"Out of stock"}
                    </Typography>
                  </center>
                </Box>
              )}
            </Box>

            <CardContent>
              <Typography variant="h5">{products[i].title}</Typography>
              <Typography variant="subtitle2">
                {products[i].description}
              </Typography>
              <Typography variant="subtitle2">£{products[i].price}</Typography>

              <Typography variant="subtitle2">
                {products[i].quantity + " in stock"}{" "}
                {numInCart > 0 && " & " + String(numInCart) + " in cart"}
              </Typography>
              <Button
                disabled={
                  !(
                    items.filter((it) => it === products[i].id).length <
                    products[i].quantity
                  )
                }
                variant="contained"
                size="small"
                onClick={() => {
                  if (
                    items.filter((it) => it === products[i].id).length <
                    products[i].quantity
                  ) {
                    dispatch(addItem(products[i].id));
                  }
                }}
              >
                {" "}
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return result;
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"space-evenly"}
        paddingTop={2}
      >
        {displayProducts()}
      </Grid>
    </>
  );
}
