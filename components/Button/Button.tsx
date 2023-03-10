import React from "react";
import styles from "./styles.module.css";

export const Button: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, disabled, children }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
