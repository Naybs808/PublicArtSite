import * as React from "react";

import Box from "@mui/material/Box";
import GalleryTab from "./tabs/gallery.tsx";

import banner from "./images/Header.png";
import footer from "./images/footer.png";

import { Button, IconButton, Stack, Typography } from "@mui/material";
import About from "./tabs/about.tsx";
import Shop from "./tabs/shop.tsx";
import Cart from "./tabs/cart.tsx";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "./hooks.tsx";
import { selectItems } from "./features/cartState/cartSlice.tsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import useGetProductData from "./hooks/useGetProductData.tsx";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Removed to display code publicly
  projectId: "",
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Collection reference
export const colRef = collection(db, "ArtProducts");

export const FontColour = "#f5b342";

export default function App() {
  const [tab, setTab] = React.useState(1);

  let items = useAppSelector(selectItems);

  function renderTab(toggleState: number) {
    switch (toggleState) {
      case 1:
        return <GalleryTab />;
      case 2:
        return <About />;
      case 3:
        return <Shop />;
      case 4:
        return <Cart />;
    }
  }

  useGetProductData(0);

  return (
    <>
      <Box margin={3} alignContent="center">
        <img src={banner} alt="Stage of Life" width="100%" />
      </Box>

      <Stack
        direction="row"
        sx={{ height: 40, pb: 2 }}
        justifyContent="space-around"
      >
        <Stack direction="row">
          <Button
            style={{ color: FontColour }}
            onClick={() => {
              setTab(1);
            }}
          >
            Gallery
          </Button>
          <Button
            style={{ color: FontColour }}
            onClick={() => {
              setTab(2);
            }}
          >
            About
          </Button>
          <Button
            style={{ color: FontColour }}
            onClick={() => {
              setTab(3);
            }}
          >
            Shop
          </Button>
        </Stack>
        <Stack
          style={{ position: "absolute", right: "5%" }}
          direction="row"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setTab(4);
            }}
            size="small"
          >
            <ShoppingCartIcon></ShoppingCartIcon>
          </IconButton>
          <Typography>{items.length > 0 ? items.length : ""}</Typography>
        </Stack>
      </Stack>

      {renderTab(tab)}
      <br></br>

      <center>
        <img src={footer} alt={"Footer"} width="80%" />
      </center>
    </>
  );
}
