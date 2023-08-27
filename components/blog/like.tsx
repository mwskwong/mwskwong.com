"use client";

import { FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import Stack, { StackProps } from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FC, useState } from "react";

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

const Like: FC<Omit<StackProps, "children">> = (props) => {
  const [liked, setLiked] = useState(false);

  return (
    <Stack direction="row" spacing={0.5} alignItems="center" {...props}>
      <IconButton
        color={liked ? "danger" : undefined}
        onClick={() => setLiked((prev) => !prev)}
      >
        {liked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
      </IconButton>
      <Typography>{numberFormatter.format(1234)}</Typography>
    </Stack>
  );
};

export default Like;
