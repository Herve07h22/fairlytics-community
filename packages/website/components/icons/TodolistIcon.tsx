
export const TodolistIcon: React.FC<{
  lightColor?: string;
  darkColor?: string;
}> = ({ lightColor = "#E0E1FE", darkColor = "#4950F6" }) => (
  <div className="feature-icon" style={{ background: lightColor }}>
    <svg width="88" height="88" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="nonzero">
        <path
          d="M41 42h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1zM41 55h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z"
          fill={darkColor} />
        <path
          fill={lightColor}
          d="M45 34h10v2H45zM45 39h10v2H45zM45 47h10v2H45zM45 52h10v2H45z" />
      </g>
    </svg>
  </div>
);
