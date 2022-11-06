export const FormattedViewsNumber: React.FC<{ views: number }> = ({
  views,
}) => <span className="fairlytics-views">{FormattedNumber(views)}</span>;

export function FormattedNumber(value: number) {
  if (!value) return "";
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(1)}k`;
  if (value < 1_000_000_000) return `${(value / 1_000_000).toFixed(1)}M`;

  return "?";
}
