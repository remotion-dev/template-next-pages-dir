import React, { useCallback } from "react";

const textareaContainer: React.CSSProperties = {
  border: "1px solid #eaeaea",
  padding: 24,
  borderRadius: 6,
  backgroundColor: "white",
};

const textarea: React.CSSProperties = {
  border: "1px solid #eaeaea",
  resize: "none",
  lineHeight: 1.7,
  width: "100%",
  height: "100%",
  borderRadius: 6,
  backgroundColor: "white",
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
