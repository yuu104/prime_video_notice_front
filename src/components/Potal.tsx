import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export const Portal: FC<PortalProps> = ({ children }) => {
  const element = process.browser ? document.querySelector("#__next") : null;
  return element ? ReactDOM.createPortal(children, element) : null;
};
