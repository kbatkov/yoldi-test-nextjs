import Image from "next/image";

import { Cover } from "@/_src/types";

import s from "./Background.module.scss";

export const Background = ({ cover }: { cover: Cover | null }) => {
  return cover ? (
    <Image src={cover.url} className={s.background} alt="" width={cover.width} height={cover.height} priority />
  ) : (
    <div className={s.background} />
  );
};
