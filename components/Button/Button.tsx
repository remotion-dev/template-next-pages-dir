import React from "react";
import { Spacing } from "../Spacing";
import { Spinner } from "../Spinner/Spinner";
import styles from "./styles.module.css";

export const Button: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
}> = ({ onClick, disabled, children, loading }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {loading && (
        <>
          <Spinner size={20}></Spinner>
          <Spacing></Spacing>
        </>
      )}
      {children}
    </button>
  );
};
