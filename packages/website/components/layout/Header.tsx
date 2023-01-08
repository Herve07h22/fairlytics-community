import Link from "next/link";
import { Logo } from "../icons/LogoIcon";

export const Header: React.FC<{ displayCta?: boolean }> = ({
  displayCta = true,
}) => (
  <header className="site-header">
    <div className="header-shape header-shape-1">
      <svg
        width="337"
        height="222"
        viewBox="0 0 337 222"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="55.434%"
            x2="50%"
            y2="0%"
            id="header-shape-1"
          >
            <stop stopColor="#E0E1FE" stopOpacity="0" offset="0%" />
            <stop stopColor="#E0E1FE" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M1103.21 0H1440v400h-400c145.927-118.557 166.997-251.89 63.21-400z"
          transform="translate(-1103)"
          fill="url(#header-shape-1)"
          fillRule="evenodd"
        />
      </svg>
    </div>

    <div className="site-header-inner">
      <div className="site-header-logo">
        <Logo />
        <Link href="/">
          <div>&nbsp;Fairlytics</div>
        </Link>
      </div>
      {displayCta && (
        <Link href="/">
          <button className="button ">Installer gratuitement</button>
        </Link>
      )}
    </div>
  </header>
);
