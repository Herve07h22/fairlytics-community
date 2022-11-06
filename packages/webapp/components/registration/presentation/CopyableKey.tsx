import { CopyIcon } from "components/icons/CopyIcon";

export const CopyableText: React.FC<{ text: string }> = ({ text }) => (
  <span>
    <code>{text}</code>&nbsp;
    <button
    className="button-copy"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <CopyIcon />
    </button>
  </span>
);
