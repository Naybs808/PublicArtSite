import * as React from "react";

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Router() {
  const navigate = useNavigate();
  return (
    <>
      <center>
        <Typography> Apologies, your order was cancelled.</Typography>
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
