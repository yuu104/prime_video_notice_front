import { FC, ReactNode } from "react";
import { Header } from "./Header";
import styles from "@styles/components/Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.mainWrapper}>{children}</div>
      </main>
    </>
  );
};
