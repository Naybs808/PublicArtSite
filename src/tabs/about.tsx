import { Stack, Typography } from "@mui/material";
import React from "react";

export default function About() {
  return (
    <>
      <Stack direction="column" spacing={2} margin={4}>
        <Typography textAlign="center" style={{ color: "#f5b342" }}>
          Born and raised in Ilkley in West Yorkshire, I didn't get started with
          my artistic journey until I moved down to Surrey. I started exploring
          my creativity during the Covid pandemic, when I started a habit of
          writing in a journal. Every now and then I would take a break from
          writing about my experiences in prose, and attempt to create a poem
          from the experiences. After sharing a few of these at open mic poetry
          nights, as I knew how to play guitar, I put some chords behind some of
          my better poems and started to get into writing songs.
        </Typography>

        <Typography textAlign="center" style={{ color: "#f5b342" }}>
          Once I had recorded a few songs, I needed some artwork to go with
          them, and so I decided to give painting a go. My interest in art and
          drawing had started during my time at Nottingham University where
          there was a very well run Art society. I would go along and practice
          my drawing and do fun things like painting our own mugs.
        </Typography>

        <Typography textAlign="center" style={{ color: "#f5b342" }}>
          I find working in both the mediums of painting and music allows me to
          explore and express a wide range of emotions and experiences. Songs
          lend themselves well to exploring relationships and personal
          expierences, whereas paintings more easily lend themselves towards
          joy, awe, and reflectiveness. I hope you enjoy viewing my collection.
        </Typography>
      </Stack>
    </>
  );
}
