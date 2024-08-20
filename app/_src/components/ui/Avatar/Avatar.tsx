import Image from "next/image";

import { Image as ImageType } from "@/_src/types";

import s from "./Avatar.module.scss";

interface IAvatar {
  image?: ImageType | null;
  name?: string;
  big?: boolean;
  className?: string;
}

export const Avatar: React.FC<IAvatar> = ({ image, name, big, className = "" }) => {
  return (
    <div className={className}>
      {image && image.url && image.url.startsWith("https") ? (
        <Image
          src={image.url}
          className={s.image}
          alt="Avatar"
          width={big ? 100 : 50}
          height={big ? 100 : 50}
          priority
        />
      ) : (
        name && <div className={`${s.avatar} ${big ? s.avatar_big : ""}`}>{name.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
};
