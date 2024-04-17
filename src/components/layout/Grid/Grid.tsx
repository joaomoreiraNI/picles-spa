import { ReactNode } from "react";
import styles from "./Grid.module.css";

interface IGrid {
  children: ReactNode;
}
export function Grid({ children }: IGrid) {
  return <div className={styles.grid}>{children}</div>;
}
