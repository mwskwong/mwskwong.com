"use client";

import { type FC, useEffect } from "react";

import { incrementArticleView } from "@/lib/actions";

export interface IncrViewProps {
  id: string;
}
export const IncrementView: FC<IncrViewProps> = ({ id }) => {
  useEffect(() => void incrementArticleView(id), [id]);
  // eslint-disable-next-line unicorn/no-null
  return null;
};
