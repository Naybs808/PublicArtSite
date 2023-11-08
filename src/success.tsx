import * as React from "react";

import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks.tsx";
import { useEffect, useRef } from "react";
import {
  emptyCart,
  selectItems,
  selectProducts,
} from "./features/cartState/cartSlice.tsx";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./App.tsx";

import banner from "./images/Header.png";

import * as _ from "lodash";
import { displayItems } from "./common/StripeDialog.tsx";

export default function Router() {
  const navigate = useNavigate();
  let dispatch = useAppDispatch();
  let items = useAppSelector(selectItems);
  let products = useAppSelector(selectProducts);
  let itemCopy = useRef<string[]>();
  let cost = useRef<number>();

  useEffect(() => {
    itemCopy.current = _.cloneDeep(items);
    items.forEach(function (item) {
      const docRef = doc(db, "ArtProducts", item);

      // Get the current value of 'stock' field
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const currentStock = docSnap.data().stock;

            // Decrement the stock value by 1
            const updatedStock = currentStock - 1;

            // Update the document with the new stock value
            updateDoc(docRef, { stock: updatedStock })
              .then(() => {
                console.log("Document successfully updated!");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          } else {
            console.error("Document does not exist.");
          }
        })
        .catch((error) => {
          console.error("Error getting document: ", error);
        });
    });

    dispatch(emptyCart(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box margin={3} alignContent="center">
        <img src={banner} alt="Stage of Life" width="100%" />
      </Box>
      <center>
        {itemCopy.current !== undefined &&
          displayItems(products, itemCopy.current, cost)}
      </center>
      <center>
        <Typography> Thank you for your purchase.</Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to site
        </Button>
      </center>
    </>
  );
}
