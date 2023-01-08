
export const MobileIcon: React.FC<{
  lightColor?: string;
  darkColor?: string;
}> = ({ lightColor = "#FFD8CD", darkColor = "#FCAC96" }) => (
  <div className="feature-icon" style={{ background: lightColor }}>
    <svg width="88" height="88" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="nonzero">
        <path
          d="M54 56h-9a2 2 0 0 1-2-2V43a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2zm-9-13v10h9V43h-9z"
          fill={darkColor} />
        <path
          d="M41 50h-7V34h14v5h2v-5a2 2 0 0 0-2-2H34a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h7v-4z"
          fill={lightColor} />
      </g>
    </svg>
  </div>
);
