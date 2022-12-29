import { FC, MouseEvent, ReactNode } from "react";
import { Portal } from "./Potal";
import styles from "@styles/components/Modal.module.scss";

type ModalProps = {
  closeModal: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <Portal>
      <div className={styles.modal} onClick={closeModal}>
        <div>{children}</div>
      </div>
    </Portal>
  );
};
