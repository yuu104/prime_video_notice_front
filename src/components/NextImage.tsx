import Image from "next/image";
import { FC } from "react";
import styles from "@styles/components/NextImage.module.scss";

type NextImageProps = {
  src: string;
  alt: string;
};

export const NextImage: FC<NextImageProps> = ({ src, alt }) => {
  return (
    <div className={styles.container}>
      <Image src={src} sizes="100vw" alt={alt} fill className={styles.image} />
    </div>
  );
};
