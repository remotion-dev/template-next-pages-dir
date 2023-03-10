import React, { useCallback } from "react";

const textareaContainer: React.CSSProperties = {
  border: "1px solid var(--unfocused-border-color)",
  padding: 24,
  borderRadius: 6,
  backgroundColor: "white",
};

const textarea: React.CSSProperties = {
  resize: "none",
  lineHeight: 1.7,
  width: "100%",
  height: "100%",
  borderRadius: 6,
  backgroundColor: "white",
  paddingLeft: 12,
  paddingTop: 12,
  paddingBottom: 12,
};

export const Textarea: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ text, setText }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  return (
    <div style={textareaContainer}>
      <input name="props" style={textarea} value={text} onChange={onChange} />
    </div>
  );
};
