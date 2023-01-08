
export const LeafIcon: React.FC<{
  lightColor?: string;
  darkColor?: string;
}> = ({ lightColor = "#FFD2DA", darkColor = "#FF6381" }) => (
  <div className="feature-icon" style={{ background: lightColor }}>
    <svg width="88" height="88" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="nonzero">
        <path
          d="M43 47v7a13 13 0 0 0 13-13v-7c-7.18 0-13 5.82-13 13z"
          fill={darkColor} />
        <path d="M32 41v4a9 9 0 0 0 9 9v-4a9 9 0 0 0-9-9z" fill={lightColor} />
      </g>
    </svg>
  </div>
);
