import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";

interface ProductInfoDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product: any;
  image: any;
}

export default function ProductInfoDialog(props: ProductInfoDialogProps) {
  return (
    <Dialog open={props.open}>
      <DialogContent>This is some product info</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
