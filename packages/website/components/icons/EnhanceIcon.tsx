
export const EnhanceIcon: React.FC<{
  lightColor?: string;
  darkColor?: string;
}> = ({ lightColor = "#C6FDF3", darkColor = "#1ADAB7" }) => (
  <div className="feature-icon" style={{ background: lightColor }}>
    <svg width="88" height="88" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="nonzero">
        <circle fill="#1ADAB7" cx="38" cy="50" r="5" />
        <path
          d="M53 42h2v-8a1 1 0 0 0-1-1h-8v2h5.586l-8.293 8.293a1 1 0 1 0 1.414 1.414L53 36.414V42z"
          fill={darkColor} />
        <path
          fill={lightColor}
          d="M34 41.414l3-3 3 3L41.414 40l-3-3 3-3L40 32.586l-3 3-3-3L32.586 34l3 3-3 3zM55.414 48L54 46.586l-3 3-3-3L46.586 48l3 3-3 3L48 55.414l3-3 3 3L55.414 54l-3-3z" />
      </g>
    </svg>
  </div>
);
