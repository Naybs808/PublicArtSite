import React, { useRef } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import StripContainer from "./StripeContainer.tsx";
import { useAppSelector } from "../hooks.tsx";
import { ProductType, selectItems } from "../features/cartState/cartSlice.tsx";

interface StripeDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  products: ProductType[];
}

export function displayItems(
  products: ProductType[],
  items: string[],
  ref: useRef<number>
) {
  let result: any[] = [];
  let totalCost = 0;
  result.push(<Typography variant="subtitle1">{"Items ordered:"}</Typography>);
  products.forEach(function (prod) {
    let numInCart = items.filter((it) => it === prod.id).length;
    if (numInCart > 0) {
      totalCost += prod.price * numInCart;
      result.push(
        <Typography variant="subtitle1">
          {String(numInCart) +
            "x " +
            prod.title +
            " - £" +
            String(prod.price * numInCart)}
        </Typography>
      );
    }
  });
  result.push(
    <Typography variant="subtitle1">
      {"Total: £" + String(totalCost)}
    </Typography>
  );

  ref.current = totalCost;
  return result;
}

export default function StripeDialog(props: StripeDialogProps) {
  function handleCancel() {
    props.setOpen(false);
  }

  let items = useAppSelector(selectItems);

  let cost = useRef<number>();

  return (
    <>
      <Dialog open={props.open} fullWidth>
        <DialogTitle>Flat 9 Checkout</DialogTitle>
        <DialogContent>
          <Box margin={2}>{displayItems(props.products, items, cost)}</Box>
          <StripContainer />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
