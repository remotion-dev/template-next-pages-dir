import React, { forwardRef } from "react";
import { Spacing } from "../Spacing";
import { Spinner } from "../Spinner/Spinner";
import styles from "./styles.module.css";

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
  }
> = ({ onClick, disabled, children, loading }, ref) => {
  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
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

export const Button = forwardRef(ButtonForward);
