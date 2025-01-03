"use client";

import { incrementArticleView } from "@/lib/actions";
import { type FC, useEffect } from "react";

export interface IncrViewProperties {
  id: string;
}
export const IncrementView: FC<IncrViewProperties> = ({ id }) => {
  useEffect(() => void incrementArticleView(id), [id]);
  // eslint-disable-next-line unicorn/no-null
  return null;
};
