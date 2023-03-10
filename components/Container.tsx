import React from "react";

const inputContainer: React.CSSProperties = {
  border: "1px solid var(--unfocused-border-color)",
  padding: 24,
  borderRadius: 6,
  backgroundColor: "white",
};

export const InputContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div style={inputContainer}>{children}</div>;
};
