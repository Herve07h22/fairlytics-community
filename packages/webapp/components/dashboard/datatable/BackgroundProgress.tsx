export const BackgroundProgress: React.FC<{ value?: number }> = ({ value }) => value && value > 1 ? (
  <div
    className="fairlytics-progress-bar"
    style={{ width: `${value || 0}%` }}
  />
) : null;
