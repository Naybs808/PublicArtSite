import { Box } from "@mui/material";
import React from "react";

import stageScan from "../images/StageScan.jpg";
import fourtet from "../images/fourtet.jpeg";
import daisy from "../images/DaisyField.jpeg";
import butter from "../images/Butterfly.jpeg";
import winter from "../images/WinterSun.jpeg";
import wimbledon from "../images/Wimbledon.jpeg";

export default function HomeTab() {
  return (
    <>
      <center>
        <img src={stageScan} alt="Stage of Life" width="50%" />
      </center>

      <Box sx={{ height: 40, width: "100%" }} />

      <center>
        <img src={daisy} alt="Daisy" width="60%" />
      </center>

      <Box sx={{ height: 40, width: "100%" }} />

      <center>
        <img src={winter} alt="AllyPally" width="45%" />
      </center>

      <Box sx={{ height: 40, width: "100%" }} />

      <center>
        <img src={wimbledon} alt="AllyPally" width="65%" />
      </center>

      <Box sx={{ height: 40, width: "100%" }} />

      <center>
        <img src={fourtet} alt="AllyPally" width="40%" />
      </center>

      <Box sx={{ height: 40, width: "100%" }} />

      <center>
        <img src={butter} alt="AllyPally" width="35%" />
      </center>
    </>
  );
}
