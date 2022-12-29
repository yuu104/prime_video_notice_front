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
      <Image src={src} alt={alt} fill sizes="100%" className={styles.image} />
    </div>
  );
};
