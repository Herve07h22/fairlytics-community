import anime from "animejs";
import { useEffect, useState } from "react";

export const HeroIllustration: React.FC<{}> = () => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      const heroAnimation = anime.timeline({ autoplay: false });
      heroAnimation
        .add({
          targets: ".hero-illustration",
          opacity: {
            value: [0, 1],
            duration: 0,
            easing: "linear",
          },
        })
        .add({
          targets: ".stroke-animation",
          fillOpacity: {
            value: [0, 1],
            duration: 250,
            easing: "easeOutCubic",
            delay: 650,
          },
        })
        .add({
          targets: ".fadeleft-animation",
          offset: 0, // Starts at 1300ms of the timeline
          translateX: {
            value: [40, 0],
            duration: 600,
            easing: "easeOutCubic",
          },
          opacity: {
            value: [0, 1],
            duration: 600,
            easing: "linear",
          },
        })
        .add({
          targets: ".fadeup-animation",
          offset: 0, // Starts at 650 of the timeline
          translateY: {
            value: [100, 0],
            duration: 700,
            easing: "easeOutElastic",
          },
          opacity: {
            value: [0, 1],
            duration: 700,
            easing: "linear",
          },
        });

      heroAnimation.play();
    }
  }, []);

  return (
    <div className="hero-illustration" style={{ opacity: "0" }}>
      <div className="hero-shape hero-shape-1">
        <svg
          width="40"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <circle
            className="anime-element fadeup-animation"
            cx="20"
            cy="20"
            r="20"
            fill="#FFD8CD"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div className="hero-shape hero-shape-2">
        <svg
          width="88"
          height="88"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <circle
            className="anime-element fadeup-animation"
            cx="44"
            cy="44"
            r="44"
            fill="#FFD2DA"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div className="hero-main-shape">
        <svg
          width="940"
          height="647"
          viewBox="0 0 940 647"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
              id="hero-illustration-a"
            >
              <stop stopColor="#261FB6" offset="0%" />
              <stop stopColor="#4950F6" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="89.764%"
              y1="16.809%"
              x2="11.987%"
              y2="82.178%"
              id="hero-illustration-b"
            >
              <stop stopColor="#FC8464" offset="0%" />
              <stop stopColor="#FB5C32" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="100%"
              y1="23.096%"
              x2="4.439%"
              y2="96.586%"
              id="hero-illustration-c"
            >
              <stop stopColor="#1ADAB7" offset="0%" />
              <stop stopColor="#55EBD0" offset="100%" />
            </linearGradient>
            <filter
              x="-13%"
              y="-150%"
              width="126.1%"
              height="400%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-d"
            >
              <feGaussianBlur stdDeviation="32" in="SourceGraphic" />
            </filter>
            <linearGradient
              x1="0%"
              y1="100%"
              x2="46.694%"
              y2="42.915%"
              id="hero-illustration-f"
            >
              <stop stopColor="#EEF1FA" offset="0%" />
              <stop stopColor="#FFF" offset="100%" />
            </linearGradient>
            <rect id="hero-illustration-e" width="800" height="450" rx="4" />
            <linearGradient
              x1="100%"
              y1="-12.816%"
              x2="0%"
              y2="-12.816%"
              id="hero-illustration-g"
            >
              <stop stopColor="#D2DAF0" stopOpacity="0" offset="0%" />
              <stop stopColor="#D2DAF0" offset="50.045%" />
              <stop stopColor="#D2DAF0" stopOpacity="0" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="116.514%"
              y1="-21.201%"
              x2="0%"
              y2="100%"
              id="hero-illustration-h"
            >
              <stop stopColor="#55EBD0" offset="0%" />
              <stop stopColor="#4950F6" offset="100%" />
            </linearGradient>
            <path id="hero-illustration-j" d="M0 0h308v288H0z" />
            <filter
              x="-15.6%"
              y="-12.5%"
              width="139%"
              height="141.7%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-i"
            >
              <feOffset
                dx="12"
                dy="24"
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                stdDeviation="16"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.0666666667 0 0 0 0 0.062745098 0 0 0 0 0.243137255 0 0 0 0.08 0"
                in="shadowBlurOuter1"
              />
            </filter>
            <circle id="hero-illustration-k" cx="16" cy="16" r="16" />
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="hero-illustration-m"
            >
              <stop stopColor="#C6FDF3" offset="0%" />
              <stop stopColor="#C6FDF3" stopOpacity="0" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="2.875%"
              y1="89.028%"
              x2="99.412%"
              y2="6.885%"
              id="hero-illustration-n"
            >
              <stop stopColor="#83F0DD" offset="0%" />
              <stop stopColor="#1ADAB7" offset="50.924%" />
              <stop stopColor="#55EBD0" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="50%"
              y1="1.569%"
              x2="50%"
              y2="97.315%"
              id="hero-illustration-o"
            >
              <stop stopColor="#FF97AA" offset="0%" />
              <stop stopColor="#FF6381" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="hero-illustration-p"
            >
              <stop stopColor="#FCAC96" offset="0%" />
              <stop stopColor="#FC8464" offset="100%" />
            </linearGradient>
            <circle id="hero-illustration-r" cx="28" cy="28" r="28" />
            <filter
              x="-85.7%"
              y="-64.3%"
              width="314.3%"
              height="314.3%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-q"
            >
              <feOffset
                dx="12"
                dy="24"
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                stdDeviation="16"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.0666666667 0 0 0 0 0.062745098 0 0 0 0 0.243137255 0 0 0 0.08 0"
                in="shadowBlurOuter1"
              />
            </filter>
            <circle id="hero-illustration-t" cx="36" cy="36" r="36" />
            <filter
              x="-66.7%"
              y="-50%"
              width="266.7%"
              height="266.7%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-s"
            >
              <feOffset
                dx="12"
                dy="24"
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                stdDeviation="16"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.0666666667 0 0 0 0 0.062745098 0 0 0 0 0.243137255 0 0 0 0.08 0"
                in="shadowBlurOuter1"
              />
            </filter>
            <circle id="hero-illustration-v" cx="28" cy="28" r="28" />
            <filter
              x="-85.7%"
              y="-64.3%"
              width="314.3%"
              height="314.3%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-u"
            >
              <feOffset
                dx="12"
                dy="24"
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                stdDeviation="16"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.0666666667 0 0 0 0 0.062745098 0 0 0 0 0.243137255 0 0 0 0.08 0"
                in="shadowBlurOuter1"
              />
            </filter>
            <circle id="hero-illustration-x" cx="24" cy="24" r="24" />
            <filter
              x="-100%"
              y="-75%"
              width="350%"
              height="350%"
              filterUnits="objectBoundingBox"
              id="hero-illustration-w"
            >
              <feOffset
                dx="12"
                dy="24"
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                stdDeviation="16"
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0.0666666667 0 0 0 0 0.062745098 0 0 0 0 0.243137255 0 0 0 0.08 0"
                in="shadowBlurOuter1"
              />
            </filter>
          </defs>
          <g fill="none" fillRule="evenodd">
            <path
              className="anime-element stroke-animation"
              d="M600,300 C600,465.685425 465.685425,600 300,600 C134.314575,600 1.3749042e-14,465.685425 3.60373576e-15,300 C-6.54157051e-15,134.314575 134.314575,-1.29473326e-14 300,-2.30926389e-14 C465.685425,-3.32379452e-14 600,134.314575 600,300 Z"
              fill="url(#hero-illustration-a)"
              fillOpacity="1"
            />
            <g transform="translate(435 518)">
              <circle
                className="anime-element fadeup-animation"
                fill="url(#hero-illustration-b)"
                cx="106"
                cy="32"
                r="32"
              />
              <circle
                className="anime-element fadeup-animation"
                fill="url(#hero-illustration-c)"
                cx="12"
                cy="117"
                r="12"
              />
            </g>
            <g className="anime-element fadeleft-animation">
              <g transform="translate(103 75)">
                <path
                  fillOpacity=".24"
                  fill="#11103E"
                  filter="url(#hero-illustration-d)"
                  d="M32 410h736v64H32z"
                />
                <use
                  fill="url(#hero-illustration-f)"
                  xlinkHref="#hero-illustration-e"
                />
              </g>
              <g transform="translate(123 87)">
                <circle fill="#D2DAF0" cx="4" cy="4" r="4" />
                <circle fill="#D2DAF0" cx="20" cy="4" r="4" />
                <circle fill="#D2DAF0" cx="36" cy="4" r="4" />
                <path fillOpacity=".56" fill="#FFF" d="M736 2h24v4h-24z" />
                <path fill="url(#hero-illustration-g)" d="M27 20h706v2H27z" />
              </g>
              <g transform="translate(396 157)">
                <path fill="#FFF" d="M0 0h308v144H0z" />
                <path
                  fill="#EEF1FA"
                  d="M28 119h252v1H28zM28 94h252v1H28zM28 69h252v1H28zM28 44h252v1H28z"
                />
                <path
                  stroke="url(#hero-illustration-h)"
                  strokeWidth="3"
                  d="M26 119l49.19-38.316 14.615 19.035 16.36-19.035 31.306 4.272 33.079-23.54 34.86 38.303 15.625-50.412 16.356 12.109 16.472-12.11 15.075 21.443 16.976-21.442"
                />
                <rect
                  fill="#D2DAF0"
                  x="28"
                  y="20"
                  width="24"
                  height="4"
                  rx="2"
                />
              </g>
              <g>
                <path fill="#FFF" d="M396 333h308v144H396z" />
                <path
                  fill="#EEF1FA"
                  d="M424 452h252v1H424zM424 427h252v1H424zM424 402h252v1H424zM424 377h252v1H424z"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M28 24h12v96H28z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-p)"
                  d="M52 67h12v53H52z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M76 24h12v96H76z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-p)"
                  d="M100 82h12v38h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M124 45h12v75h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-p)"
                  d="M148 67h12v53h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M172 82h12v38h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-p)"
                  d="M196 45h12v75h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M220 67h12v53h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-p)"
                  d="M244 82h12v38h-12z"
                  transform="translate(396 333)"
                />
                <path
                  fill="url(#hero-illustration-o)"
                  d="M268 45h12v75h-12z"
                  transform="translate(396 333)"
                />
              </g>
            </g>
            <g className="anime-element fadeleft-animation">
              <g transform="translate(56 157)">
                <use
                  fill="#000"
                  filter="url(#hero-illustration-i)"
                  xlinkHref="#hero-illustration-j"
                />
                <use fill="#FFF" xlinkHref="#hero-illustration-j" />
                <path fill="#EEF1FA" d="M0 191h308v1H0zM28 44h252v1H28z" />
                <rect
                  fill="#D2DAF0"
                  x="28"
                  y="20"
                  width="24"
                  height="4"
                  rx="2"
                />
                <rect
                  fill="#ABABC9"
                  x="28"
                  y="216"
                  width="64"
                  height="4"
                  rx="2"
                />
                <rect
                  fill="#D2DAF0"
                  x="256"
                  y="216"
                  width="24"
                  height="4"
                  rx="2"
                />
                <rect
                  fill="#D2DAF0"
                  x="64"
                  y="20"
                  width="24"
                  height="4"
                  rx="2"
                />
                <g transform="translate(28 232)">
                  <mask id="hero-illustration-l" fill="#fff">
                    <use xlinkHref="#hero-illustration-k" />
                  </mask>
                  <use fill="#ABABC9" xlinkHref="#hero-illustration-k" />
                  <image
                    mask="url(#hero-illustration-l)"
                    x="-2"
                    width="33"
                    height="33"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAABGdBTUEAALGOfPtRkwAAQABJREFUeAHN3emzZceRGPb77r68fe19wb4QIAiQIDngaKM4nvGIHywpwmFrGUmWLH+3/Yc4wh/scIQjHPYnR1j2RFgzFjkbZzTkcEiKAEjsjd67374vd7/Xvzz13uuHRjdnYTeEwsPpunXq1MnKzMrMysqqM/KdP/hBLksjIyP+TddU8uDrSO+B5X/xgw987FOFpWGA8cmUj58ZeKl8MJKVZD9avXYhS371s+RePp+vVRt+9bpd15FcAXjFfN51pNhvt9vD4bBUKo2MFDqdziA3LBaLw0G892TLw6z98rCT/ZvziIzrIP3OH8IZJSOHd93Jp8dSnQddj9tJN4sPqvN5LEtwJ8iGuXu9VJ6SWzIwLQPPOzs7fqME5JZKxfww3+v1oBvWVRgMBvIIIK+Oa0rDYV/BYf6o8LH++7kjwAMGQC54bnCElwwdh1woXy0Xg68TD46MoIwf+dxIvVbpZqnXHuT6A1hGnnxu2B/0C8WgChp43OAZjuSNksGIn+7Hq4wJ/6Qx8YnXKv2lE/BAEhBn6R7xf+mWH00DCbX3Xf0E8QMTzCqPQdAfuORcZHp95aV8oQzZI8PBoKe8WBipVCpJ/uQLI+lBQLuLUhqRzSh41JEgyWNJJzvyeRwBAyJmBMbuXaFh5CHCtd/tB94zwQGF2UgglYc7W/ulQjG0w0iuP6QNhvmRQr5ERAU9er0YAP5HBrQtElEjJHmMEhU0kiF+mIsR9XjT544Aupuk0MlrFGZY/jQyYghnwxkiCxTjALKDJMrbrWakvf12r1stlUdHRxuNRr6Wx+/ZQzFu+v18uVKp1Wp7e3v4P9pHKYTIxcDy45AWceORpazlw9Y+dwQ4lPWfGv4jA+rxEynDVq6QG8HIgcqQPSFNWq1Wv9Ntdpr7O7ubm5sH+/tu16rVer1OBPWKauVgfGJiQnPNg/ZIsZBok5BOgxhA1PcRmh6xlE7NHjWe+9wR4BM4PvpB/ATaTqSMOZWwbULid/q9QbdHvh8cYOU9rH/9+nVWj37Wq2WMP+y311e3m/sH11cWiaX5+fnz5y8SP6vrG56q10Z/9W+8gfbqM41CEwxRVso/ciV8ohORDRPiZNHxSL+v/LjOw8qPK9yX+avWh0p8SiyT0wQKcwWHw1G1WgVov99lPhIySIIoDJWRbn9rc3NpeXl9bW19fX1zc/3g4AC51Ol121Bfq1WANDU1FXJmZzsK6xNavn3rxt7ezu7egQFUKJTWVhe//PpXn3nmmXaru7+/W62PAqPb7e03Wx6UVw1IqXewZJQc9/Re7rjoSGZ+Gp/HJanu524EQLSuEtMESqEYqpe9UimXMTW04s1yqZQvF/d395aWllZXV+9cu7WziQSbJA+W73XC9kQbKCsVVCxMNBrdQb9zsJcf9MYa1UJ9IZ8vDENStZsHe8Nur2SiUMjfvHGj3Wptrq0+/dSz9dFGt93CCmNjE5XJaS3v7u6iKNgQg/5WkhTPCYT/NbOfOwIU84VWpzvI7EgmSqZRY5Ja9H/MZ3PDXndzc4uEeffdd2/durVycxExYMRYqdUhPY1pJk5/pFxqHewPxxsTo6MH+7t4f3ysUS4Vu51+u9M0sMpEjlcgT7tZLRZWF+/+8fLSR+9/8OKLLz799NOlanl3e2t3rwnvlEQMqV6PUif4cPEIg+tRpM8dAfCvEQD11XIZv3fbnV6/axyYWPUJhP3d1eXlDz98/7133r1567rp7qCFImHVFKhNw2UwxN+ymf3f29pcrxRyo6P18dE6OVYYGXbabZO60kihWEevMnm1vbuzv9f0xunxCVpg8dbNW9euvn/piVe//GVkWN7amp6eRgPEJ/1CCmWz6weKnV9Akfskz3HNzx0BBt1BwfyU8IFMbhxOm7zZVIFEWltZ+vjjjz58/4OPrnywePtOq9XE9YVcuVauMOTlSZ5OuwP75XK5WBuBXyNje2tja2N0cnw8fEGsm0F/0IspADY2nLynlMuXRnLFcnF3Z5tJqiZd8rO33sT++9tbT7/yOqRvbGxAWQyyWg0BjAb65xiJv0zmc0cAnIiXmZTdVhsJoB7eIGtzfeX9d9/74Q9/cO3jj2laI4M4GikP67UGvJTMsHI5DJpp1GKI/+GA6dmoVzH+1sYGBTo+MToYVgysVq+5exAzhEy+MftzY5mE2dxZX9lvjkmTE41KdW1l9f/9f377N+uTM1mCerDBdcifEIV/NbQ/bAQU/uk/+5cPbOlh1kuYaH+V9LB2HtaG6Wjw8nBAneomDcmQX1lc+vFP/vytN996752fr60ss2+QhTY2vapXR6E+ZlT8OYM+jm406mNjo+GjHBmae42PjfEADQf9chAJ8AWirNOhcZvNg/12yyyNo2KwurLaGG1UKuXNjfX1NQTre3un1b66uAx3pND4+Li+kJBeI3MSC2nOmHr0V9UMn7sRYLxzFCcjnNAwszX8r3z00e9/9/fWV1Y3t1aJpgrcl0pj9QZmbe518Xin24ImijozYYNDeX62t7frter83BwzMvN9jpD4Iwc984BysVSv1mCz2dxN42Zyctrdg3ZLy9S1l2pK+1evXsX4ZJoWFhYW2LVmfIDME36PIpGb4YdK6bjBk+PFLeXpKvMQj8C9CseNpEw3zJfwkifWwDk8w3HrE3b0vdlmrZQbttv9QaeqXr+3trz07p//4Kc/+vHa9Q9NASqdNgRN1ccnJyd5Hjqd1qDvr03mlMsVs9+dg81KLXdqdLZcbJw5cxrva4HwOXdqgRXLWh0pjyJAB9v3u+hVrYz0Bwfmb5ub2xCdlHcxZsuD/ebB5vbWmYWF3vriD75zd/XqB//Jb/7mbONSs9MtFwoHzTYK5QoxXzEniGeLpQxvD9YN7ieEJNweY7jwT/7ZvzhEf4boVOnk9T4CnLx1Mn9MoZOF8oPwrEQZAqRxe2jAnRzDJ0y6kWEvHMEhU3q72xtXP77y87fe/vjKh9tbm/wMcMeFsLAwPzk51e11t7a2MIRJFvlABLW7be5Pivlgb//s2TOYxUoAERSmZ7fLM0eYtzN+g+Bk0kB0+DGGJgZd1/CRZo5rPwfDmAZSFcHvhWhhb2/fRGBqekZN6A6cpqWhkZhCpw49BIsPZdDHLoJO8v4RbYJHiImjn/6NksQ5UI8AZrwHuzs3r1/7+dtvffj+u3fv3KJWa9WQCcTxaL2WG/S4NevVykG7B02EDLcn0RWaYBgLLxDL9zY5OU5P0CJmUizUmJ2VSm6N9BKq8yiqBEI94lmIVCJBKPxqmWPDsxNTQbDV9TXKpDE2gZBuqS+lmhkdI59x2ome/UXZxz4CwHQfUEeIP/r3CMTEQWPFmKY297eXF+988N677/3s7aXFO8N+7/zZMwvzsxcvXSRYKFjCBLLOnD5TLIeFjuvTOAgRGYTh3dydm545c+oU8c0BDac0rXlDpT4B3aGvQ2lH8g8QoBund/k/8HI2IJRnLRcRoNMNzXFAa+/xUtTn5uar1XIsQAxion44mDOaHfXm/n8zNNxf6PdjJ4BRmghwfE1QhJT55F9IqJEhk8X0dWN16frVjz589+dLd25VioWzp+efeuoycfzMs08/+8zTtVp1Z3tb72emZ2bn55kulXJxtFFXXgr2zePz1ZUVhiMriDEqI0EVKzVfCFcH5AYZDLRut2Nm3O/zlco3eVIzb7Y6vZj5Bj3Q5qDV9NMsgUTabzYrlerc/By5RPGQqEGH0I3ZoL6frw6R/jACPHYRVDhkj0MJc9JiewA/8A/vbrd2tjdXV8xI6U+LhAun5y6eO3/q1Hy1Url48dzlJ9Dikqnpe++9t3+wuzBNAZyCu9ZBzMvmL86wLzfXN2CNEbm8tJQJokkGjrvE13Y4dYL3EUAKAmTCx0CBIyV+oqG85O7+/j6twzra2tqBcfLq1o0bf5L73tTM9Pnz52cWasNBvtsPOsG/lv+q1tFjHwEF6+TBGiHzgxYZg2QRCEeUOaJD0hbbNz82BSV/blz92NS3VipcOHfq/JnTTz3xxJnTp8+dczl16tTC7MysCRRlW6pWWf2Nep1lUq2Ux7kdanVyvzFaI7iwcc3cqxoOUe+DWSweSPd/tnIQlmenjR4yrsiiHB7VVN8I6Pc6ZFpMe7MxkXUhv7u3R1gxSadmZvSLRYUwUE+GmUcedegT/waFHpQe+whIxkH4rsCeXfv3bM57EIUctSg4zG+uLocs3t/tNg9yPV5okqVaq5SfuHR+dnZ+dGJcV0fHxkIN8lEUCnfXN8sFVChPjY6TDwe7exo1s+XppAna3Q5LqTbamJubq1SrZgYQgc3jFUcJuhVSKjR84n0lGpE3jLjh+Fxr9frs7OzK+hotAO8GyE9+9OemBRcuXWqMjRtQ4mCo7Idh+V4/P5Ur/Na/+Je/+LF097iOzAPTp1o+LCgNLLcm8WixNRgoXYvl0n6IBaZLEas29/dPzc2+9dM3t69fmRgbW11e+ulPflTK505bOpmb+bVf+9bzzz0zMT4e1KjXQ+8Nh5NTU8+9+PzS0vL+3j6hhaxcQtjP9C1q1eq0NF9Qr9+vNeoxj83n91vNne0DEzeeiHApZ1iWM+1CDgMgZFOmn2MciJ8oYOp2aAGeuG6n1el4rz5geSS5fecOFnjyiadGx0ZNznGXyY3ho8oxiqK/WULLQ4x88p8Hl36yzqP5FbgP7B+2BipyHDuHl384mGjU+V4I/ZnpSYx/89rVwnDAbzM/O/2ll1+6dP4cGc3KZOXHghXfm3y5pJAgJiX4Kiy2CP9RrEulkdDDs9PTZ06dHq03rE0ur6y0uh3S3BuhmMBh2yR3ENRQD3CN8eEdfEqAp5prSKH+obe1HEMij0BWCwymXqd9++bNd9/9udY8pTV3oT71MEN76jQRfNTtw97f++exEyAT94fvg/30U0avOGdKHJT9Hg9lvVy6fuWjtaXF6YnxzfA9fFAtl6YnJ5+4dPmLL788Mz+fCdki3CRbwxXK0OPrX339/Pmz29ubb73905+/9WZ4irodjiQOn0qpTKogs0Wu7W3objNbCBDopmkZ+KxSuINi8GXMHoua8A5f0Ice8vjDn18qgEFyK0kvmdu3b7/zzjukXDwy6PF/aCo9nvqszi/AvjqPXQccBjkJ2IH0zFgLdei/4LDgMdyqp1Zrb1+9OsKcyOWufPA+PTx7+fL87MxTTz1FeiBXjnSJ3oWZr4/mrPqGWYtT43/jjW80d/e+++++8+abb85NTV+8eJm1A/W5Ysk4IMS5P0zIaU66t1yOpXl4hHfoxrM9rox2eDhCMTBjkrs/gw/u4D1hEOlRjqEjfBFtivkcITbIbS4vLt66cd3rDEeEIa+OUZ8yrr+ABoV/+s//q+N6D8ykh39BEw986rhwxOp2pl6D/SHNjRCWWJnV1ssP+5DRbTXXl5c/eu+9+emZ+qD1ne98R41zZ85euHD+61//OqOGFU/sxGOZXyP8nGhgkSCXb66vzJw7awULXnk0lxYXMfbBfpPmLpQKtYal3aqYLHKk2W4x50v5cMw1W5ROJKjn0oBQHVTOtkliBHUz04c7Fqf0CxxPhQJ+AX5Stlhnb/+AWVqr1SF4ZtqUZFZrVnqO+34y8zAEPrj2ySd/yTyu10LwbRa1lrUWZBBRKOxVPzG2KJK7N29B59TY+M3r79y9u/zcs0+yWy5evMjaqVRLI9WqtSp9918WtRDYj58jOXyXO2iWq7Vf/dVfJXP+5A/++IP3319dWYLHhXYLtiqNus5HsE+kEYstSeYEO2eWexqjcJcNKYsKoWmPtUL2lEWJWCLqGsOZsPIgVd5tcxONmZktLi6ylC5efsIwQsnUTromvKfrAzH52AkQ6M/8PEn9Jh1glIIv8NEb6MD+zs7d27ehzzIL9PW6uTNnzsD+s88+CxGjRFAosUz6I0Nmk8QgQFULBpMTzZVVvv16ufr6a18eq9UX5udvXrt+0LLQ21pZWamPjxVqNXQCiRkTue/VCcvECxh4/ZL6TSRJehgqIR2pYmFgeGiS6ohnJQh1NS61g6K8Q66rq8sMU8LS3VAeWVLNK1L+gdfHToBDOCAQGbJrKtG3Sj4WEXnK6MPtzc3Zyend7W2r7dw2HDtocOHCheBWcRL7+/lqzbIvKZYtzwcidNGw6mxusgj5HHKtDm355OUnapX6ypNP3b67tLK2ur69M9zPT9Tr1Wql1W4zXeAXdiAuiR3YsQjqp/LjMQGDErYHKgASxg/x6EcmRzVCn2/s7FLjcwunGbIUMt0zUqikCumqHY24pp+p7yevBMHJn/fy6cn4nSpkb713+1O5e/U/eWvI8agzGDeuscDifp4DXabfbBiznc7ytavlXntuvHz1yscfb61PzFSx7ZMXLhXbw8nw45tk1jhxuAgGHEPFKtz12/3yUNRJaaRYzQULt3uF3HDCSntjoWI63Ll4qtTcnFpbXlnb2D7obHT7xe6w2S2219oFFtEIa7Y8ttvd6fRz1dHxQq2/u7fVGgo3Gpjf0RfbGxw+lXql2smVGWpmBfjezC+iwNoRgTFRrexsbozTMNXq5q1rG5OjpacutjdWaguX0AxWdVaX4T30VcYrh4hJmDzC52c0Ak4SJTkPcdBorVYYDtfW1rAPW4VKvHPnTqNR0QE/2ewYVsTPpKnBc8/ki7kqR8IwRBZzv1GtaafX7JjJMeVMGkKUxwpyTjBPqZ9b2todG5+olOvl+sad9XVWlhX4Wq1RKVtv6JtTkSMQSkWR/tqkcsPMsiLK/dTL9yE6SyYd8HicQmQNYqolI8mopS8kG2PU3KIydyh8dDmwn40AmZMYOJn/TAmAF44BIX+jg50O7IN7ZnR0eXFpY22tTDfm8iy8733ve9c/vGLla8aM/9rHX3j9tdG5WfaQhyL2JFl7AkYLVYNLD4kjqVjgGh0rjuXPnhvmOr220M/yaHFsurq7c2d9rbO9U6sSXB2zNqgx/zAPYXxa6gl85S1wwb+wFlOtIZULxlI5Fl4SHuMR+exNkJ4KweNZXeDMwENT2c906ySiH5b/TAlwAogBrdg0mWzuMwmNcT6WW7duoVCsOhViorS6sU6Pcjzo1ZUrVzgELj339KVnnmnURwfNjki3MhOnIKYE4xZwZaxg4VszJnqCbj5zcbC9u9nfJJNLvWGpTTludwcjE42av/3tTVIf3WJLxjAmUBieaLRtgHihSwyLNARKmQRPkCcCWCqF/aQbZKJ+BGR0wKkw6ZI0ODBEooTMib5/IvsfhwAhhQZDg4DhzY2jNztYaHsT46EB0/PpZ5999Qsvdw9aot4+vPKRNeIbN25Ye7X8cv7CBd3TY1PUQn0M+5sSDGJtQTBcsDEiDOwGMLk4aG/s7N26dffqrdt3ROE290xpK8XSWLUwXi/t7LX6NgVwNsTUbiiSCzbhBlSDckV4HtbuWQDLCuExYTMMJ81nmlnl40cQjMCkkBFAHfXdSnhP+USJT+A++/FZEwDqkymEZcYatfbmCMkzaHeYQZh4Z2sTHv/23/xbb7zxxqmz53Ptzu7aJmP77vJSsVqxNnjrytV6oTQzN1emE+DbElaejMbFfKz6mNdvEbUWVjY2tswtPvrgyo2bt5c2N3f2D/ZNuAa5qbBIRXKZl4ttKXB3h52JqS0ExUaOkCdhDpl4Z8I9JN5RglmJ4FInlbkL0epDvakAfXa226W93T2J6+OhcLIw5T9TAsB+GooBHcB7/a3tDVFW8+Nj15ZXqD3xILV66Rvf+AaDur23WylVx06f+vrkxK07dze3t4UpEA6eaFQr1Zh/DnOtg17pcAVfc6bW3GQ7G+t7guGWV99/772fv/3O9s5epTE6Oz0zZa7b606PhoOoeDe3sb7sZ6la4Y/qUtARfNe0lMyq4YwwyIwP8UQcFJCe0K1QkofQlDmcG+fzaQQYBEiSGF8Xj/F+XPIfmQBeD2kktGuxkN8W5bPEd9adGBvfXF+FCkGGl1547tLFi00iuNsplSo7a+v6PzYxwSkz0Z/QvcIg16InSKEw4ZmHoZM5RJHTgGhxsS2vrq2uil3c2tiEKwHqAhNn5hesXo5NjE+NFpmOP/7pf7h58/rG7jbbx8jrtVvlWt1KcVhIsRpjL+Uhk+ATeehOuEuUSHloNV6VGAEGNLkkJcmTHv80uj9d8thHAM+Bt4bQD/Y/nIqBz/DvdNt8BpzGVz58n7+H+Ng+aE2Ojc9OTWMo85qDg5ZtFDc+uBEOiVKZEbmxtnLhqSe63bY4B92Gl5KhBP2tZudgP5i207Wm3N7dtq0AORZOzS6cOkP0zC2ceuELL4Oktb/RaIw9+eQTb7791tLqSrlan4kIl4FpGotrbSubqQ1HZufm7naXDixzdkwEqx6E2Yw2MXn2ariXEQjvGmv9lZh/Md78NEOWOSYMiYeHPo36VPLYCfCgFzNThMcOe4LE9w9YQQQHNqS3KMRcr7945y4FvbaxefvO4vZec3pyZnR8slYp1UuVva3NjbX1VvtgbKJRrU6YG9u9QZrnuk2LL1rb3bScubi+vMrvdvbsaXZlpd6YmubYntre5C9Yn5udwKdWNV9++eWltdWltfVKPaYd3Z1YLA6cmhKXKvKwDPjg8iNjBk6P08l+eUpCIc9iHdf0SKqsplsqnHzkOP+ZEuBQ/mQvN4PhrGnu71o7HHQ7lGdY9sNco1bnF7q9svLx9Rtvv/Pu/kHrq1/52oWz57/x+lfnpiaxUjbYw2zvolWnXy31GI3WcNrN3fXFxbu3F2G52epUGo35M6f2252bdxdvLt3la7Ay89xzz62tb+7sWkmuWFAbHR/LCXu2jyNWe0oCHJMwaWRkMOaIIZQ4liqQCABzNxnl8AsMVz8l1WBfciuVf+4IkDCfXUMNZLbzHjIEgxRylKGY0OXbdzfWNn721ls37i4/++IXnnjy6VdefmV1cenqjev7e7NjvMy1UqVWZW12B13zfVtRBf0wDVu7+4bO4s07tnpNTE/NX7ggjKtzcNCYanIVwSzFcP3Wbb4MSvjU2CitMDt/anFlw6LlbnNbwEO3L66ibLES/+JiVKFwM2MyTIeEzYRu18OSrDOp0FOw74oYrlKiXOrvw66PfwSkSND7dz0ypbttbvtMBMU6TPgRRiqlnIAfrGd5T1jzf/3f/OvLr3yJuPr+73znp9//AY196dzZudnJ8dnR7nDAfBmdmiTUi/bpDZ1NsLe6srm73zpz9vyTzz4/eeZ0vlFbKJUO3n77+rWbuPLjDz68dePmmcmJ+ujYcy+8MDNH18xW643t9bVkG0MZBkdNAUFwSlnzQfdDnBzOBhISj9EtE3Q4SqoRbigtQb28lypM9Y9q3f/v4yfA0Ruh+DjJRwRDllhBDBEWX0G4ZSlHJdrvyBH01VdevfzSSztLy//f7/zu5urG7//hH0yPjo38yterteLs2ZlSjROomBPK246zBprt7uaWydxesVSbNYN48qn5Sxf/7R/+0Xa7PTV36te/9GVv/P4f/8nC+RvX3nr7w7d//tY7737h5VemrJ/Nzm81mwhguQZ4kEXlUqFJ8UKlBc5jAiSE+qmmPE7PliBDxKdC5TLKU0+VpzbTzwdeH6wZHlj1r1eIR+LvCPsyKU/+CIniZzyaQ8Xin9CrscYo7zR3NCVJOvMUffDRh4IYPvz4yu3Fu+KfhTJbjrePbqSc5+shog/a/a2dvbWtnVZvWLM3YGqm2pj6vT/+wXa78/yXXv07f+/bL//KN1rDwpvvX9lu9V7+4pf88WJ8+NGVnb0DgT18G+H27xJd4XcTIkcK6SxUIkCsA2V5GE/JT9USchOq5Y9+xoRAtXgmq6amTLqbld1/eewEOPnC45fJJJYBX/BRljgJGHPnzp07f/YcMX316tVb779/9sJ5WPjt3/5t5VYIWIp6aOTwxnkotj/2TJ86uxwx+00TXeZ8qVy1U+Z3v/Od02cuvPTaa30+t0Fue3//T77//f/1f/8//uzPfsgiuvzEk6Z1i4tLwCORvFdTCVlZPlB8kpflMyQHp0ue8lMdKeVTob4A74FW0Ek8nMw/MhGUIDjZdMqXwrQ8jEZhNKeRYIkdw1UbEwed7tToWHNjeWpqorW7zRf99PNnx8fzF6cbb//pH21fff+NX/nVv/+1154dq7Immd/jk2Onzp6ZnJ2sFCscQA6KKO22+wftAdu/tzusd6pzI7nR1kHn7pdfPDc3clBcXyyOT73zu7//b/7H/3m4tPjkWKO9vrX40dWxevXF0+fMq8vbu6e44vIR6kMbV4ulcj93dnbSYjFoa2Pj29t7tbyFz5hqMTI7nXwsluUsh1XWt/bHG2VGRGyjYujzQPW7wPJnrTu8pkHEmHmaWfMqJWqFzzv0YuaHMsg+jbLPoMR8jI7Ca7gbv5D9Zvjwe/r06Uq9dvb8+ctPPj0+OcNkNKsVDScelIzmGZ0wbZu15boByCQQRIlADb7TYOYcGphe+Pmtb32Lj/lgY6Nu+pdZWWTL1NT08+cve5Dnz5Cp1Mocd6mdQHE2CCz7wxROoUf5STMJdDheg5OylDJpHCe0BqIzkHQnVDG7TMmRkj5EvRqfSv9xCAAMSBG9VrRRdGtzgkETm+LLl554cv7M2cbkeG188vl8fsWcq9nhdLbO1RiOWxyesOG9YZ8iM7HXFvzT75cHOYOeZnAeivk1aeNnmoiSPUtmADdu7e7sfOmLL1tB1FppMNxc2RACRoKNz45NTI5V6xXzcoLDCIBuTj0jAsoIHVPsJDZBC6HBNzyn2YKMLlj8URjUwtOxiTyCeZMIyjMQglr3KPcpzB8WfHYEiLCU7KXhtsQu2caraqW2016aaozz5pQqZYJ+Zn7O9JURNzoxKfa10+6Z09Jn9IMpvvHhaUFdgY6+tUjP5Wy14zPQ20IhPAQGhEFgj1+lVreRaHNrwwxrbn6Gw+DmzZsb21sWryyHTs/MnDlzirllpX5yemp1Y3XvYJ83SMOcb9l6sMmGNgOJiQCgljnMh80aPw1i3ZJxzcRUBLnIB9dnisTjWb8ffHn8BDg0gNJQPgbC5LPKF8Q7tm7/UCxy9cdqNUYhM7AyPmarY77dEwBRGis0wF+qBDtJOpcFa5ZLjo4otAacb9sCx/f2mEND/iVKWfRPqxoRVzyjghVPL8w3ie5mq1ErPXHpwnqjPjU9ATP8SxMT44HBfs+oElXNMUvOE+WMy9jnbRzgmZj6ZtMx6IwM4RnMjvUNWdIGKxkDyi2lte0fyxb9QRp1jkQWGgQ9HpQePwGyt6aYlAQAVgELft/f7J0+fXZ3daW5s264nz99SlSBteB8Y5RLPpfZhblSOVsqtHXPdkIb6zjNuuZHpqkRCdvubG/srK9tCrllR9KOrVasTBkrK0tLcwsL46MNBx9QNpWnnpxfmLNjwDggoLhONYJh/SzGmQbVibFRoZL2ARhTkEW6WGWLJcrMj8YdkfB3zN1wmhSYylIq16DGXf1UeDwCMgI8CP2fQWjig18bbFMUO37u/Pm9zdWf/4clvcX+osvqY+Nx9kCrSaCXqpRt3ukCFgyjHee6WTcJNz3/26DdbO/v7gtxYKjg+sy0CN2e+m9+Nzk+xoPaXlmlEU+fmiXS1lc3bPQwB6Sm4coqHEO+1TqwFjkxIYq0ktvbDwlzGJzrTd3w91moyJbsgwZwmU3B6AR7mNVNHVQsg/3DHBak1B0NAoTrPVKWT9n7r5/FCDiEEfAZFxmZoQ/sa+gPwiEztxCDetgjjhoTk2yIgJdhVKlbNOgf2DM0LE80ujt7caxJzUJAcGc0gs0YPIKe27zwdAq1WgrTLzPQYWTp7iI3p1B1m5QQhmA5d/rUQbdJvjcFi4b3zFZh5hO27dAvYV9mhmMsVOKIzNKPVQdgUxpGIsAyRCd0H6M1Kw4h4y1GQNLDoIkF/KSlg6L3oz79PnQbqfeXTA9u5uGlYotP3vQWFrFZD4cas5KRfOHS5Xqjwdysj0+MzS9kcAfjMGV6zQMRyeVGnWWjXNCnyXNoWqcgOqaA+6zF+RXrIahiNUohV1J0Gs/Sw86NyCbeEExeCc6iEuwwcIQTsjjJxioCT4N3BXkKBYjTFGMJZbWReSM0kO9Q04COtYaIzM2L4BMAMCAm7dNzMJqlTQK1VnKjUHaIjgQelJAIQ81q/CQSTuYPx8jJokefD09cBLLdS0NmRsnCCECLcWabPRciHMQ5hPEXnWPcxLwmJI4MIyNfCytIgCYRE8fANZvykxTGkSOe5DH2CQFJIQzi8BDNzh1iRBkfcAedcAu/sSnB8Tcq8ucEyWwQoCkMAkBidmMq/BP+10gAdMjAYY1mcijphLRWqVqiGc1EBJmo+wnpxoRMyLSH8f+xkLqHmsecQwbSgghCgfFJx8NAe9l6S7FSDQKggNWMTo+rP/vrDXEo9oOyOEaApm0Xq+WxhbnK9BSm6gi3yizD1EO8BhdCQmNqG3aqNWKDjbwKUz0TLM5ToWDMFNoySpABjhAPvoLA5aq6iiGeisLy9GkvVvIiYouUCX6ATwTJeMP4JOGzuReqjXArpQAhvB8CLTbYBG1+AVI/Cx3g9UmMxuGoR/YQvsDS8avAwTAhvjOzvak9eMGELtw9sQ13QFjzXURsfo9Jw9gulSvQYE+A864OHBYRW8mqcXhBnEWTs1qp27gvjQDuin5BfDmntagXYRTW0yw5i232A4LRNIxUmiONAOEugWUWpyijXIh1/B8mf7a/Ic2MY0CYMhBcpaIJBxSnMUd8be7spQgte8pQDWck5ngYDT4jApx8PaQbxaA26rEb5h4dNx+aCl0Kf52OUEORsYSRONy0p50Ex3XilTlVIoCw2zV/jmX3TXv6luzmcKs+PUWjMiKpAQEskxPjmaKmcGzf6jkRwxFk3ZYZXJvqph5iKLQRIP6yZKdjmSR04lDEQ+Ss97rkWb4hQI86kLAJ3QaGcZPwTrLxPaA3LjGM0iAwqTTPV6jO0dMP+PezI8AR62dAhDcKa/a4NHUe49h2K3THyMWohZxTqWLajIuFB0IDWuDUW9dvfvzRlVqp9MSF8wh47eqVG9eur6/tiEGfmBw/fXohW0SpLNswtrRkN2vYiMGnBhBxwy6NVMpbSSPZIoatFyMhPBrUjQwjCoW7/YNMwNg5Y7MG/MTypxQ8QH2gReaI9RvjJ+0KTliOUdXtYnxzCzFCNIFDKpQjDzKkRj59/ewIkN4dZMjYiZ3Zb0UEMnnBIrIAILiV33+KiSmQgkMxkyHkMeeL/9R0WNkPf/B9ISSvvfzKxFjjzu2bNhLfuLXMwTA761Qx+79qBsjW+sbSnbu9F14cVOA+BEV4bwahD2lEK6EYP073a4Zb2+YE3v8spsSKUJynro5x6IF+aNs4T/cYecfsjzcMxTCuMi4xA4dnJoCVjKeeeS7bK7BqHNgeSy0nVZz5Sz+N/8e/R+wB78yK6ChWpiscudoODB2YKFc0/hn5rJQwifAcvwD+gylbNn7t1/4uzTk3OWmVOOZTnY5gtFuLG+S+QIdiaUbb7BDLOPAe+A7Xmb9wlGb6Mw7oC6Fv8tBseaPIl5YDErNdMZAYqprdZI6RKWcSySD0J2UDIDLB74Fwrg4Bq3EvXQEPJMLUe2Ff0zLplsxfTICTbaX3xds+lRIXfKr4EIgHlA9il3qSgml1iWKjBWy9Yjmb+fPDE0ETk5M3rl/96Ts/+/Uvf+Wg0ykKIHQaT+yGKTkc10urjep0cWZifgy1lFTPTTUnRqrXr1948plX7txZXLozUhph8RA+4zOTtdE6K4rIty/YJsDAPt7nw+t2d40ANw5aWzvbGNYhr6JwizkxYaXdgx24HRaK5sYdIquc42saGVSciGyFh5U2OTohhNHOZ5Fk66vLU6OTNImj0zreMNI3W9xq7zOJvvH669//0Q+Xbt+an5+dGh9DDH4nG/TDMA4+wF6ZtwMNCc37UOZ2osR95Y/2J0EUlt9IGB5eF/ks2R9w8NJL9Bi9aP4VAZshERjtuWFmbADeEHFw6NzMbPmFly6cuziy1rZFCwEwIO8CNfjE5UsUILvICQV+JgVunBH7mqIByGrsmU0aYsIVkkYYRBZvC4oYB5ltm1lDBH5YU1brhEMqd1ebhpf2XU34lISPOovq9bgR+fzzz+sXVngpi67QuBbiRfGqbDQdYVPJPQL4kVB/nDmq9ij/DXs0GxCAZ1iWHVlVru13N/VKunZNKO0N0TutvZYFAAwDdOLYIrBIhUa9kauVg7P392FydnJm9uyF5oe3WVNTk5MUuH1aorhg3toLb2uxQP5aIaBuCX2XSOL+ySh6Mpg/vGaBHEsJrH5ISmCA8DD8OeIfh91hr85FNTYmjIMNRqw7a6I+NkppkS2QzqLTSiIe9fvGG29QxZjJW+i2oBA9dMIUOsnih66IhOOMRJE9zqTyR3LF9Qn7qTWShAGKwbhrzIIRhRFCdv/kzZ86UMBIxdGHYpQ7QVj55FSYNOubA2FV5ku1sQFXxZ1lDonklsB0hg5/KoGWBckO2J3QzvFmn4G/lIw23L8TG9PI/whyhz6ECRzhYgFa5ZjBJidbpgDItgglMs+oEotZgnclMO6RtHSQeDyNZqzwxBNPIDPrQAVE1fgxSo+xr0Q6pItcwstxJv18FFfD89iOuNeejgBLz0dHx33vxaQIBOacP3v3HWdiOA8x5kstKyTdQD9f8+bWsN0pctTzAzW7uX1rVYzu8cLE5NS4OMVaNqfVRggJf2xa5o2/hHt4T1huiYck4wkgIksAsNKYD7D9A8jATuaZSIAao+YjooYnxkcnnclizTqWUY0Lh6GZOVdMxNRMlDBGcS4mIBEvXbpkf/nHH3+sjwiAYKlB7R+nVBIjIOVOZo7z6dYvecX7YX3eS2Q7bVc01zUVNVsBdFd0g/lPrnBnZemDq1dwItSoBTuc+OZN/BP8AzkxWAfdNu//nnBEi+WN/Zu3oJmk5u1hGqoPtQhAxghB3BX70GJmat6rYKNH8qjA7uRYQ1bsH7MxzZryhelJTYQ8ASxawCztPVqr+xMuFofilA/DcjVl7BJHKruq6dWITzeYCevR+fPn6QP51G8oPcYqGhwXBgHdSEXHmXT7kVyPUJ8GgUlJ6CHcigWxBqbGefBFQeJIfzsHzT//Dz995dVXqd/xWsPxnlAvYLRQrd25fvPOrducjqdPnxmtj23dvBt+x4Eo9hJhJjyc2jzYDy+/lxI4o53wRId7Olx7HBEhZ7YdBs3cjdoQzd7PCbyCf9ErdLSBksYKMLmv+ZRQp+bYCoPKUKhaAjOEWmYb1i/xeGmvhKLj9To/kSHFoYge4CEDz549e/XmDWGu1lZR6JDN0yA7YnpvOVTCjwP199EvLJl7RaYtB2P1OpxnvhYDcYQYID0Fqrz7/nsbW9vOCJqZmuZUsN1ltFr74+/+PiSatdp3d+3Djzst230x6cgrLz1jKsUOJUYaE+MHrfbG1lbSezrFjxfem3CsRuyVnQAohDbYPFxsMcsj4OLLXNYdI8qXOIqTC0JlJmg9Tc0ghpdHmFbm9HfFQDQtxtcUTgod0Gr5iX4IQ5k5Zwf5zdKffKYbQxwfHDH+MRpAGC2mlEoV3ZdS+VGtT4iS44b+MpnULEBTMn6pKc3iF50hlCleoVkOKr92887b777nmAe8rEtTk+N3b99aunt3YW7+7/zmt3/jH/2T+ZnZP/6j7wnF/dY3/+7zX3n9wpmzF89fWFlc+elPfvreex8gpEXize3djS3hEDuEELTifXjf3d9rMYggWmC16QDl5IxAbpycc36Uc/bFZIoGNmUJuTIyMjcxTg0szM2azllktn5g4QwmTeAQSmXw6wWSz8/OWrHA7ElRK0QhXTAa1NERWNJ3BIOKhE9PnTCO/jJY/GvVwUon7R9tEBEBQryfVz8OoWECpb9hvrS6ufvmW2/bNIF/1Uos9sQTl5wc199czx0cEPd2s37jV75mI3Vuc2v+7AUnAt29e/eHP/wRQ/bNN9/e2Nzlcub03KPI2zFWeP0IfeyptZD0JrohCEmO+IMSYS1CjyyNqZB6ifFxSa1UJPgH9n30RX/FGaJBIWtp2UoLtQybfspoHPYTZvG+RowMlTUqqXYSeemnyvfmASdvP8I8b0rW2iGlM0ogewyDKM9GZfgdMp3HhilVGiIz//QHP/oH/9k/vLgwz+DAdHjqyctP3Lp94//6P//NwtypTjOG+akzZ37n3/3OT/79985fuLQnHqHVdQ799t61ksAhywuNap3TLVfDelbbkZyStKQg9ifcDGlCZFMO4ZMt0pFgpgZxGByFkcFF4k9PTpSa7bFGHQxgZpXBImyalTmikVOJ5RstOJSLE3R7J2ziLJmIKAT28vKygY4MlUI9w8P9IuSzGAHZi4Pr740Du0gxZEwPmTaiug3MNOftlyvOJR6/8vHij3/8puMEREwTB/hramHOYbgvvfyi0/hMFL7xN79x8cXnnCbk+P8P331vyIzs9xmjtsQbSW/97GdLyw6a3mll56lzruFcmA32NxoSM8ZqQ9hjXm600cv0KgXNZAcwoe+8rhgBhCKKCt42VsRSOIyxH5yepIpmsbn6MtCdeoqvQ+vGub2lhH20TwyXxodbKan/2REgAXd8DYAyBSQDeqghGBCl3cnNzp0WmPnd3/sDdqT6OgMRizdvmpe9/vpXpmYmufO/8tWv2NQqVPRf/6t/9Zu/8Z/GloL91uXLT75w6amxsfGddmt1dU3n9dMMT9vYNrAQBg+WD+GjZXdZQ3jfZC2mZRFRApKA0SCFWUuUjH5SUguWfcwQ0lMGh5y1PCIeljG9dzkiIQyKtJSfTQ6QxCvoHnhXHsAkKyh7dcp/FgQwSLH//SkOs4iT2mJrdaQwF0Fpguq4AZXfeuttGhXfkqeW5nkZeRpu371z9erH4eT64he2d7eEqpudQpAzVr75zW/+9//tf/dbv/XP7IR86vzlwHgQNeSDfMh3zoYTiYKBbdgJy3V/b2dvFyVCngRiguqJtU2zbczmSDKtACWPp9cBCdJV9LiMctRVCNE0QUI3KaQEDdRRIRHArYQHJSnz2AmgSw9MAErQyByOgHAJkBG5PR8ucpBBe/CDH/wAU3Ix8J+Zl0Hl4uKd9c2NC5fP92/fYLSMTozevX3HEUP2t3799a86rIxuOHfunD1JntI+vOwLHzIXC+6OhEmP/mJJi9m66/syu2Ev+XmIlCwcGmt7o5a1g44CGt1VR3nma4rPn6BTgp8OUJnPTgUkUYhjFKqJAEkEJaTfR4PHroQfiH2FwKVgEUEGAYAoyQhWWVleBrlTN957771ASrbWAUdmqsxqvfrK117n87JsQ2fqnqk/n9fv/d7vfXTrf+vkC1/66lf+6N//qb1khleaW9gLLLoqvcXSDkRQBbFC2WPdRCxbrPcfdOJwtSxhblj2ODx6nRPZ7SRRzRGhAaFARnZ9L45elGFlMiBMFYHqc1cqpDGR/BYGgXJdq56QP4evSe86+eNkHpQpAUKCppRO1jmZP6p+/7+Fvg/JxlzUSA4ninCFEXFBnOM95+07cGk4DC7sdnZZbs39jWFzd9jct77lBJ8b71+dbczkRO13KsNOYfHGuiiIZ55/ZeLsE91SOd8Yv7m5sX17aWxQ+JXnXvr57//J2s/ee2ZsunV7sdSO/cZ2/q12DpY6rZXBcGWYXxsWNkbKI+29fnOn096nezn7t3u9tU5/tTOAxd1B/oAk5CTPCwqr1fvFWifvReOnTn988w77WDhSa78jjhRBi4ORcs4apoNzGrz8TF7ziYN+tzE6ub1z4DM4e9t7p2Zneq1mYdDd21wbKxcFGA26TUEe6BHRp8VyqzN47CMAOxySDmkEm/htwl4qsSXQL8qyxVWZRM619VXfIBGa6GSm3/iNX49Th/k0kUwYRLtF17300ksiOvkmrfxSztc210bnJr/4+msjtdrW/sHkwsKP3vm56HC61hJAvpdFLTDAzHlJfeIuDK5ISow4AwiHYltvB5p6KYIpwKSEKxUZvJ89MWRNppqeSp0SJKaa7ngchPLqu5u6RpcYBx6BcXfdksywSSFJm6o9dgKAHlhkpfV3KjFWyMMNEDvZACEPuIAPXKzykZww8cvnLixvbc4tzP8X//gfqWP+ST061cmthVNzF156ob+3W+iNrK2vbG1trvb2Xn/1a2MvPvO1M/M2dKxsbC/96Xp1vGEtMnP/dAqdXHvQtS5GITBVrQd7kb6zuMAGp/QqAOBCCsRkUwTgwT4JzhmtGnEEy+omk8xdkHuB5JZC2IRo9XVWm5oJmuWGGGVtYx3feIUQYA8aLq7e5VnVHrsSjh4xeLJXprcCzFu9Ovl/gMs7GUeCZdOE6NPQbHP/lVde/uKrrzj6YV/kT8yStrHva1951YDgoyb3xXSamvXGKs993aa7Trea3+m3ryze2DzYduJZFsjL8jdbiu+2RShKFvIVVr8xhxWyOM6MAG3IMxgPjdOMDAmtybChfkCeVAKOTisBwFSIDNGdI3oks0fLgfxsfFPFftLwhgVUSKm+TCLAYx8BNJY3oX/4H3E5r4M1j2KsuwKFaWiayGNslmRbNL+YjdQ8WWLHf+WNr3OiOU5laqzBReYzPRcunHv++We3lu/SvZubG2adzowemRq9+PLzSyvrfMp3t1ffv3ElTicN7w7+MzuLRX2nB4X2YeGzF6PctZ9WaThgQzCaj0UUqQmyBQAaWLwkjo9k+KV1oWCMYXyDA2aVJDy6hpmQ0UwctbsS5EK6nlLUxoSMEeCR8bHJDO99jnMDXoOI+thHQJKwgMAdeCcGdTKWM2eku8cToGyKFOPfl9cunT330osvrCzegXpess2tdUcJWaoscDDTH+22s9/C37+3M3l6vui4aceQVgpiEGOg5ONcuZDmGRMG4izdpsQe4bXs9R1hQG0KiFBMG3hpDMqgQcy/zH4l2AeqjBJ5XWDz0DqYCTZdlae+aMRbJHUklQ0sGSXq6HLWzaCZZNB4CmiH9QPKx5lMcHwr0LYgkjQN2BDEoaYCPjxiuQQzkgwxCYI0X+oZ5l579VWbBRwN5NuQdtNfvXqV6Xfpwvnu9o6wOXtpzHy21za4KV577SsUCyeESE7GvMr7vuwTX5iJHUyklqtoCRNc064Igxs4PNG2J5MDs7OMAAnvxgjTpOATig7DDfsdHiHGVcKqsIaBzDP0AsaTYlCesO+u7qQ8pGN5BPC4q0fcRRIVEMA14VtG+WMfAd5BhlodZdR/9NFH7HdQYrFghgiWimkRhw3U8xDE1oDeYLRSfum5F1jfEMYhozM3r994+umnR6ZmfBrj9s3blnWW7i6x4Z0B9JVXXmXHKllbXF66dYds2l7fcL5iHFumq5mmdPEGmyDhAAFgPVZV0lJEJnxgxLJBOGZtiioYAeKkD8+YSSMYvwMbJehbGUk55Er64XHdlFENeRQmiZ8QTW2gk1vR5RMEkP/rEADdHphS0+lWygMRm5jvEI4CYzJGKjqjfnd7z3liAPJ6kFEDDjW3HWZ9azvcA93B2dPnvvm3v7m9uXNq4QyDiZ7zNzU5c3DrLmc7stEmTMfrV2+8+spro2Mzu6tbO0sbK9fu7K9u7K6sF3zzc3ObemGD67wlD0GPUN8y4Eg/R5MlERSOn9AIEjZknMRJIJzPVWfmz3kQ/JnjLqthP3f2Qe40joEtgR9z6BeW1x3Cyk8POu5Lm9gOGRzA7Oopy5OGglmbdtxV34Myj0wJg0ZzUJ+uKIEXpGCmbAgb19wDyu3yxSO+3CsqyKB++aUvXrp0yVY7oYYOTnxvaflrX//Vccf7DIfb+04YKK6sbU5Mzzm3j4m3s92mSRyTvbv356j13PMvWhkZNLsTtdFBq7uxtLK7vvnFV17xbbe1/Z3b62siR5yhjgZh+fQHgPHlW0eE7DZpAa4hwIbW8Vcp5nitoVLQFV+b7uiLhNldE68AWyYlec+6pm6qI+OWVyjXL5bP5Mw4RFMbek0EoSiyyTOJU1NqPjICgCA6c0QGr5HAZL7Dhk4MYhwbwqIdvN4WJPAjyalTtdNn4is8yABfr1166tu/+ffGpucgbmttlQC/ubw6ffpscXSsxXjP5ev10TsOJd7eufDU06PzC7lWd31lffXO4s1rN/c2d/7xf/5f/v1/+A/MSP+H/+V/2mq3mgJsI9SqTMnwdtZG8tthj3ANGWnB+OHsDP7P+SQZbz7+FWLEhRbez8xFi3nRQL+0ooN6FALoyN8AoSDX00QArJbmBNhchOj86Vl4Rwx3DQ55BJYnGw3+lH/0BDhmEBBLhLwBF9tIq3G8LPZv7gUcZigBSrY2Qtabf07Nz57xpYynnquMjr310cdO5rN8u7Oxvd5s+gD8+KmzziurTs/YTPT9N/+0X6q88c1vCa0yI6uPT+18dNWmG6EoX/zil7773e++89EV5nqjwn71/WUBvjHfhvN2d2+n2eL1pmxi6pcln0E0SA1QDtBR3wZ1GFFmXKZVhBBEmXmjX8FP2bnTkM6c9lNHtKE+SsiQQvJ67QrdhI98kgFoHsv305MsAyNOhLX6CPnICJD1JS5pECTI5BkQoBnZP7QBAIpHJAJYZTH/ug0c1mbsZekNR6v1t69ddfjA/PSUI25tIrj4hS+Mzc7s5YZ7XPsWtkRO9IfT5y/OXXrCATWLN67b11IeH9tqNecunL/8zLP/9+/+27ff/fnlF56lXczvYqmMCBF40ecrJn+yD42I9wzFH3YnyTgWn573tdoC6wDk8AtmxicIE0IV6gvsQxm8R48yY98iNhSrlgS6fqmDDGYt8E4NkPsobTq2t7To5+TsNNuAxFNNepQEABCwUpKXQAbuXqx53HMQ6ucoZ1ZQJSwzPOIRMrdQt8W3yWZt5Qq9SnVydibirw56tfHxs6dm97e237lxk4nCcwzu08885WDPDxcXJ5wg1Khdu3l7a3v7T37y42++8Y1eKX/u0gW+vThwwHwn1oFN8wgi32DztvhklTPbERIWMCHy+/wbySPyJ4OkagHArNGhHcIm4VpHQCsFu5Cnme0I3frnbnaqWTa7JIuypRz1yZ/+XhfSvc+DSsTr3VlapIHPBPEYu9y0QQBvfGQjALqjyUzue2XiHVdDWAIHU3zcIfMOzHVWKltToOeh5MT3g1LR7JM92t/pdeuT4wJ3CY04wTA3crAXXzX1SXMUFpfCvOR8ti5/zRd/0G/QW3GG3/T4l//GG7/+7W/bp/Fr3/722Xff/fHbb47cuR00NhBiMaEtPMLQZ/QDEu8T/T66YX/2uC/N1xumpD72EbZvJuXtpcTOUAYEDJT1zAjNNG021TJ40lCARH3XZehOGEeeoIGZhx0QToMaOjozThfRGlSI/YCNCMjI3BsxfB5JAoSkqUSDBLGrQaAcBAmsMM2zaA76VjlNYJDK6GTqp95wjN1dWfXpd8qgNFqzSjs6OdVwno29NGJdq+WNnR3ndxDbN5YWebnqDvg+vfC3v/Utm05/9Oc/XHf8LkyXyoLjaOtkDmZhLznbSFGa8rfs5aWGo7ezUkRXgCrDQ1gzIBGEm3Ca8c+9i1sJ4x6X8YhrSqlSKid/FGqB3NeyQjURIwm39NNdlAilnL34/ovb9xf9wt8gc/+w0SOvrFfaIWrVMI7krtb3AGBbQK06Uctiu3EvjeQpEyBilMiAVJK5O6yNTnV3O1xIe+EwqdoK3D4YqTXO2kyXL9VFPa9ski2lfn5qs1/uVyt3hkVHfTcKtW2nNWztLK/sfrzd+mBQWstXOX3IezAICjXnqxsAsJ/LjVdGnKI7WS9TIQwlu/gAz0KCr5LTWUYrfccC9ptmZHwezqPA1CQeY8ZuWDEn+uscdsdlNsr5gYeLg7FGeX317l6+u5/rOMI9P6jk0ZEXpOM09sKZ6dMjne8eGoEAABScSURBVMHB5t7ERKG5uzM9NbW9r3ME7aNOKJrYP/GFvAyaJ7L7iVMMVb2V0ssV6rYuYRApcZmhQ5thUtwkn2oet3n8CuMal2FztzxIT6B6lGxvUypCi2KPjLg4nBuuDs/hEhuecloOnZntVEi+nQShdgRAAFKbnkojwy3QuuV5hYCMhrKUAJZVQaE1O5UBZGAZ9ww/ZqhbBIA2waaONj0FVE89MgIALgHk6h0ppXy8Botl6ii9GyipfqJBuqY6qauuIE4EkPHTg5JmXRMKsoJ+BEt1wjsGm/w/vvijk3DHpapQ/eTfP3wd2ELyshcjIrhUrJgAs/S5V13VSdj0RhlUBDle8SIASCocv90tbAHyRCSP+Ol1m2vrIlaVg0fCPVpwNYBkAKaOR2AAQgi6aPSvlLz4YclbpdSa1xxXS+WuqST9BESqk/oGeuDCOEATy6fy9FTCtfopHf/UoF7ovHJX5cxKJ97v8f5tbRlouCw77yTeqXLMQMk6By5WypQEVQHRUC9pAUiQLh+Y4ULNvD1kjvL0eHp76qAS1Vz9BGqGbZu2g2AffPCBXmjHrTNnz3J/pX7hBe1rDZwIcNjxhJRf/uplx40c572Dr/cYlcCVkjxJvUo1XaVUDSfplLtJkmV32IIUmj9vMMxT5chDwWgxDmWFGo97ih11YA3HHjlBQfYW2PqhOmF9GKBnWziaUTmsskFrSNObCmrREnAdYoweqPRqg42k1LJhFG86Mi4SnN7rjfAYxm7WI+Tn21BTfWKHiTHuk6O+45c59TjEYouTb/plydQPAbhlPPvIRkCGqdD7gIguH4mdhFYQS+6mJJ/qu8IaqPCLzksgU5J43FU/U1Paydq4d0kDXCdJ22SYkt3cPBHcQvHF1zXJ/1h20EJKsTIcUQGxMso+zfbItBnBGiWvE9jy4MGqgIFN8KRykAAsUTqRPIEqb8h6Kr0C6sl+fl+NKPTz7LlzmtJxFpceCb4zTI081jFMPXodcITkw4kY6OEOlFKCEhDenpCrP5KOBUCZ+v10n1PNRJVU3zUhxbugl71nGqWQkS9AU1t8G0LaoISxnyIi0SbblhADgeUlXEW0TsQKwb/nY48UQ75j9kvxwxcuTmwBrYmHtJ8gVKIj2auDhUkbTJBoYBwYefDrZH7iHlcB2128g6csJliT00FvNJ+3dMFGeGQESPQ/voIswZ0wBWIEUOInmPBOQmu6myqnOjqpq6nkuLL6KSUUaEFKLSQrSN4k2eqh09WbexFq5fgfYVKoEBF4GcqEivjr2r8ay8KxRGOkyKCg1yV0gwEqvQUNgCGlXqggfxLmRANXBDB6kt4yKI05XE/aICEa2MunZRUArFCPkm7QlB65Fv7Jb/1zrf/l0zGK78sAVIkXpKZS3tWo9W7Qe5+OKZFXBzQekVGSOpluEcnxKSO+ArtpMTMTJwQ7T354grj2uNS4lg0nT/sJY6od7DmCvbu5sb6+vOJr6M5YMcAdIBGjIftCEuR5D2VQrvJfMqRMN0YcHWFVzKcLTp8644sz0AehEGSNOmCGHk0TWhZYMgkJJjyeDeYwi4kU8bwecQq78sZonJLlWBGjcHp2RjUNmGkKw3HLPJw8NRrSpqWLFy8apoB8ZK4IAD0wQTpQEAbeVQgeyegEOJlEAHeP82mgpDrKJTUl/dRUIp67StyCGmdrCPnSOgKLbrZK7BOPNsPAvme4AvmhstkehRDaONuNGhvAAx662KmtRcOC0h8kw1w57AcBMoDxr7d4V/qZsA9swMAm9gcJu9OVGldzbm4B71sBVALL+mtA8As5DMMXPTTiEaA6T0FlXPjYCeA1gAaxLrnilAS963GCUAlw+sksSD/dVTn13FV/wK2OQhX0X8u6R2fbOASBhK9e7W5tiiOiaJ3pITycHmRvx4aMjMa4XkwLG4gyNv4pBiGFViZgW4ywqRpaelGGf7+CRfxMXfB2ICX+UJjyAACJPWekzV62DjxTHrOigLnh3SMxAG3mLhYmGpPqEGTEEdPWOLBKKMj9oa6IhIVf/opzdQDiUgfktWmYE5ryupFKVJB3i6SVl/FT8rg+K9HnNAKUwKYWEmxGguV0t9h+ehWzp8GQV7k30kIZoSvFdpw41PWVwpiEUZBhBWUkCZ+oc0JMluLt2eF8ZALsaxlUKZTC24Hq9eBPACdgMHJiCzQoN2ryCIAKrVwllq9HRhwO+/G1qw7JZ47yRFEUegL0fiksDq2RZa6PfQQAJeEuESBhVh7YeqJLrgpTr3QjC57z65Ae2bMhLI/OEEAY0gCRQkQ4+Z5UkyEooJ7uZYA6DM6m0v1enJtFqgAgvdRkIP4L0saH32SMTSfHmv8ZEghtxSZJHj5RD+5H6KJtFxEegeFd0d5TAeRwCH554KGQlPjMq8Q23bp1y5zAreoHH5w/f/6pp582GtIOcri36za14Crs47GPAGIOdkADRLjwVnDrDKwl3lcoHXfMEoc66quQ0CGvROVjmvmpzyp4KrtGdJQxgbOUBJ8y/+NN2YMZ2yfBBj8swihloebCggQewOjkiNnMhp2f8KnZQi/GLlBVj59ZSsCktyfIvdoGKXJfy6RKvlLb3dn1WRyzkzt37vzZn/2Z06ic5KIFStv+fGeZGVLEHEOLLHrsIwDWvAlqgKsniKGfwVOZbJXRmUQJ5SqEAZTJJY/4qVrCqZ+pmp4oTyR0K3z0TKND0cG5aAbW2eP4zD5sFc64NHUOwRPyhy2Fs8lBMsFSgAkq8e8txpX2oUYVgPBEWHIwj+Ueid/ZoiPAEjMls9JTqXGGngpoCelWlGJzZPNAU7aUf/jhh5d8m/30KZNhkxVeDj4ojx9k38H9LJQwEPEmUuuevIwrIHQG6pEn0SCRJzAeB7TFSIdxvYXZRAMZ9ZUbFqolYsgjEF9n1OH0yEZSPOLQ4lJwMTyqLHkwJXnzYzV13ggIXo6NweEwFRSBO1UQ0OKa6MEfCxIjyyPa0xcvBXZUyxJE+yRgVM6C6XxOQijK3q3YUDU6NaHKzTu3eYccoQIAFFNf9zdX19xyVO1DR4AXJIhTr9JVCX5J5fddWYLHCHILEgEKg05fBTT4dNhQ0A4IID3DXehVL5L3CCxIGlFZUrNYqPqohjpwajZlL5EKOm++mnBOkAzKdniLeA6LMpxrEQ3nm8B8ons7B7s79sb0c21LkygRkW+lscxjM1EbuXhmempidM/MmX+/UKI2SGcrNoguOM4iGccyF4lvyO2sr+/1Y4kmvjaW71dHS8VGcaQ6ssXkzTkPtswKGJ+YRk/bxMqVg/npeWNN31fWlm388JHJWx99dG529tLCGVHzN274kJCxMr22srswd+GhBLgPv3/hT92Gx0Q2SEwEUGKmmugBie4ansxnyJX8lNxNGciVcQV6msdrMxO8IYvhPcGAfn4mTtS+BXenbxwc2NfkowuRIJQYSieQJi46jIDwI+aJOZ8KIiu07F2awo+spghlDLVssUd0rVGiahxwrYJykMSxW3Gc2qFhRug74swYBokAy7m5+bNnz9sdv7cb882F4oINqvjMSWBsM0MNOUV0Az6sTwNoMHL75p1r1649MgJoNIDMuqRvgJYHCm0DDnADFGF4zcxKDAW9TvWjb5k6Tfglozyu22D1OBSnBLOpcZVVUJjIFuKaOzOE0KFElkFGjiGSRcPRNhwitD/jtJ+bmKibGCkVnMvHypXgwzV2iYV3lVCsxGez4xRv28F94SFLuCfOkg1KHnKMKXK5Ds6gIlCnZ30Ta8G8d3nlmqWI02fONMb2683RqtfnY23g3XffHW2Mv/DCC8ZJMpcR2BT/kREgIT1DZhiFwE5uNTHbsH8scBP99QdVYFD91ENXP9Eg9FKmG/xEAI2gVqpzXDlxpcoy3X2BygI+45jdpHLNLNgx/EIIkSibxkEQQB3fisOW1RpVLExCDBac+5QEV0HO7Jl0zOZWThFxbKBvhuJ0Xgr6iB1lVHkpYHSQIiXT/Dc55SOVCz6VqJuGezgk8vlz586xecjQmzeva1FHDA4jAMjz8wvCMM6du1CqrPvo3yMjQJIwCUfyiQbAhUd5/J4Or0An0ECcbrgCWsJExoenPK5j8pK8cpVVwGKYy8/UskJ5LbhuOZ/PVkiLMLHNnYP5gK4XZCjgV4UwR7MBAHWBvNyAwKYFOSlsjPFOcUmm6iJTxXWZhbOR4uQC83bEwvAjDqPeAj9QzQwQwBtJD85UmzC1X61VfHEC79tKZbBTRAtnzgCeY8NeekGiV65c8cEnw9ot7RhYZnpO5McD875TQV0FVI8igQymAIq1ExkCaEFOTvo5Ci4DGR4J+LIErZJqEKpO4GswIP0BimxJcKWaymEW8aTUvke0Y3CYfDlNyBKYB4/G3EgxNgYSQOFMMMUg94W8h6chsz65SEXCIGIaMUaJNwdm49AINlGYXkKpibyh7RmwPxQ5anRYFg3WSTB4ta0mPi3ky/WW8O24I+jHxifPn7+0vrp2Z/GOEemTOFnYxxg8mBOcP3+R+GV8GW12J8gsnD71yAgA++gIOC+T/NSLjCQxh3TLbJBwjO2lGUdDn2FBGSbtCsWpbzCeMvqDDFKgZjhcX19HLe2rACkSdEuY0h5TgsIyfEQ7x348JIfRJK6DuYDmTzyWu84AJ4YgQHy6hqHeBoVifEfSmIqTAe2a147R5SCnVufAnM6agseBoUdsoWJECtREX4AQ/IF3n+KYnKrW9aXqBAvwE18ba6tz8/O+WIlXzpw+pVDGtGDh1P6FixcnJ6ftTNlY23xkBIBBKdHAy2SA65WlYg09lOBQloAr4QiV+kTcow2cJhTDssLw8Wa7f12VQLQK6stoJ2EB92k8tW8jQKd1IAbCMPc6ZjJE4t+YHmR6FygRc8WwIcSzSYZqBo1EgSdyJrqC32FBGrcpB/xEijpceiQ9cQgA48IBdfpi+laoVDG870o7vm7a4Qpnz5uHbG5u/eH3/gjkTjryBSKLAdrUZbLIi4y53WYTJ/l+X60RB5ebKBxO6L3vvhREf1ACDby4k66pmivUYGqYgia3ZLybuocXbEKyW6UDxKVLl1gCynVD99REAxjxLCyopo4xkYEb0j/d1QfU8golWvZ2mVRzc2tty5hfXd7f9eWA4ACGjuFPvocBkrogHC9iQJAgJuHa54QB2Mz0FGgNI8CAJGgyjC/C+7oreNzyiolGA0kiVMUifs9RvyVo1QKXCZeCj05cuHRp/tSZ5RWut2tmKpcvX2ZKOY5cnes3rvl0KzethgVH460zBoRd08WCMxcc2s8i/8uOAPDpc+rOA68qAFdPVEuguwY9ChEDCuNeRgHAox66Bb4wJDJTx0/l8umnduBaCmweTTjVST+Vq4BmWBKadrfWoL51wB/DP5q58DI/HVKAF6tAuiuu4VoAG7aAcXJGIzKAAQliMKHQBvgUEdNV63S0N3qFF8l4FtrBGdSK2LqRpy5d9r1X9o/WxPzOLZymjYHn9KhGrfKHv/8HV69ehYHpCWvCMY75ZmGR0Iu2igXLPv7+YgJAgfqp8zJ+prxryqRCV7Dq1bFYByisMdQU6gNQ9FMd8hoWdFtJwqaaOq9aMmPwi7wXJXIC3V0pvUih96qgKQ0StfzQzX1nFsR8Wx2NZzD7EVo3FuIzQwjTeqk1muaOVVmzZfYYRVv1FV3fNIZw6OMwtB5m1abtnK2WJZeaFTjjSQvxsAlbhHPZN1U+e+Hi+YsXeJsdoVnO96fn5xiz8/OnELVcqTk2zXk56P7cs89T3w6TOnPmjKc0hFoxxS9X7JujuR5KgIRo/TnGcsoEX2XpZAUFEJQkiYFGRyVcqIP9/ZSBLLeUq0ZxySQWhvQY+pm4V0chDGoQ3lNSEyETJMrVRLZESENKBAinInMVa2RwBXtJGjEcYjk4K6Y8WTL28qGIbd8sTOysHa1pzyokivJA+NH1ZVYTizhvPdeoVKmTQFw2+4sZc5aoUE5/H/Uj1juDfV88nBmfZETZd2ZK4dPHThXXx2efffbU/IK4Rv0yqqHINnGQY2ncx/Y12h5KgNQZAOlM6nbKpLzy4woybnkfNGld0hlAJ6EBucYELNskZZ8pOwzj6wXckewZZKHrZFw1lSjnWUmz6adyZJPU0T4uwzy0mbRn15I51IBTIRYa1WTqxDVcP2RQDAJId/ABtx/vZrPjRa2IhbZcLwApTBv7kTtidPl/sEuPdGJ6+i5ogfWJVyNAz1jRKQwBHvzE3eaw6/HJSc6lZnyJgKNJDBKIC8wv2pt0nX3xhd1tOwZ9m6xj+pket1/cuo25pSGvpmNHH0qAT6P+EOmHmI9uHSe3vB1k+FeCTbAqgWsR6VDGAFXIEQSnUI8Y7FEleDANF02pjIp4LbE8ftGCcnU8pQNuaRz2kRPx0EBTvieTljjEPwCNr8AkSH0PhklqJHEpcCVpLuJUorW8b3e7Gx/wRoiIzLEw6avzXHLdYSuUAEb2MWfYD0llQ0PdMpsHU4/G6g2TytnZOeDa70cjKBdY7Pzj0P/dPiYTneukx9hovrYhIpsDhkloJOMh2lgXxKi7isl4KAGiAw9if+UpJXqkriqBGn3ELNCNMSERF/jJo3Xjxg2cZVEixWtSyCp7HJFgXx0Pkk66IeNWIp6rZnUbB6V3yUC6RrTgmgaQWYAJlZoBSXjRyPzwGMRP8MeoyLMEAv9QRZqLlK6V4xsyjkev+GSGmrnJKccS+3YG+dxkvqLK+FgY+N7OZJHC/B/Jcxkxe8ytcDScNrsD+/0wf92ymmiimDyEAWCsWR8lAWBAMlcZlKOlhKXUHZTwMnD+IgJ44JgG8scpoePkT73FzkpgTSbJfR0giPb3Ik5W5sknn7x16xaseTd06AOk4/rE2jqpWcRLzWpQUoLrJeC7pWWoN3Q0iMZmdlrj7QrOzyao4fcKlfsJgw3eQZXYX1M8FErCl9EN3w96uGV/ACGzZ/LFlGKz+s7naOzJRu92DMiQbArJUtytXAI2DRJQxo6aLjqhdqB7f4e6VhljOZgDurFU4ktvj5oohKIZe3n6/wcyjBvYI6OWwAAAAABJRU5ErkJggg=="
                  />
                </g>
                <path
                  d="M308 89.82v101.063H0v-33.728l3.038-3.799 10.783-7.894 8.687-2.646h9.246l21.198 10.54 9.852 3.251 6.608-3.25 8.644-12.005 6.87-6.388 7.892-1.512 10.906 6.066 13.895 15.802 11.188 5.944h5.692l7.314-3.28 7.19-9.37 5.879-13.65 10.774-21.657 8.34-14.026 9.243-12.336 9.594-7.043 15.407-3.881 6.362 1.497 14.939 7.765 10.531 8.166 13.17 12.338 12.362 7.52 12.756 3.746 8.366-1.542 8.96-5.366 10.183-15.377L308 89.82z"
                  fill="url(#hero-illustration-m)"
                />
                <path
                  d="M308 84.066v8.885c-13.215 32.373-36.292 33.308-68.007 2.699-18.456-17.814-33.74-21.583-47.058-13.978-10.675 6.097-19.593 18.713-29.342 38.963-2.594 5.388-10.386 22.73-11.136 24.336-11.298 24.181-27.067 24.181-45.624.363-12.17-13.657-21.486-13.657-29.221-.248-3.596 6.232-6.872 9.923-10.352 11.627-3.677 1.8-7.4 1.412-12.305-.82-2.416-1.098-12.51-6.8-14.82-7.981a101.498 101.498 0 0 0-4.586-2.208c-11.912-5.359-23.695-.926-35.549 13.65v-4.62c11.94-13.38 24.255-17.4 36.78-11.766 1.571.707 3.13 1.46 4.72 2.273 2.416 1.235 12.425 6.889 14.697 7.922 4.167 1.895 7.013 2.192 9.744.855 2.836-1.388 5.748-4.67 9.072-10.432 8.843-15.326 20.622-15.326 34.123-.172 17.344 22.257 30.338 22.257 40.603.287.734-1.572 8.536-18.936 11.151-24.368 9.998-20.768 19.193-33.776 30.557-40.266 14.618-8.348 31.298-4.234 50.63 14.424 32.601 31.465 54.068 28.367 65.923-9.425z"
                  fill="url(#hero-illustration-n)"
                  fillRule="nonzero"
                />
              </g>
            </g>
            <g>
              <g className="anime-element fadeleft-animation">
                <g transform="translate(164 483)">
                  <use
                    fill="#000"
                    filter="url(#hero-illustration-q)"
                    xlinkHref="#hero-illustration-r"
                  />
                  <use fill="#FFF" xlinkHref="#hero-illustration-r" />
                </g>
                <path
                  d="M200 506c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4h-.8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z"
                  fill="#1DA1F2"
                  fillRule="nonzero"
                />
              </g>
              <g className="anime-element fadeleft-animation">
                <g transform="translate(251 390)">
                  <use
                    fill="#000"
                    filter="url(#hero-illustration-s)"
                    xlinkHref="#hero-illustration-t"
                  />
                  <use fill="#FFF" xlinkHref="#hero-illustration-t" />
                </g>
                <g fillRule="nonzero">
                  <path
                    d="M290.56 415.485a2.137 2.137 0 1 0-4.066 1.32l5.526 17.004a2.137 2.137 0 0 0 2.6 1.325c1.135-.327 1.826-1.532 1.464-2.646l-5.525-17.003"
                    fill="#DFA22F"
                  />
                  <path
                    d="M281.996 418.267a2.137 2.137 0 0 0-4.065 1.321l5.526 17.003a2.137 2.137 0 0 0 2.6 1.325c1.134-.326 1.826-1.531 1.464-2.645l-5.525-17.004"
                    fill="#3CB187"
                  />
                  <path
                    d="M297.515 429.567a2.137 2.137 0 1 0-1.32-4.065l-17.004 5.526a2.137 2.137 0 0 0-1.325 2.6c.327 1.134 1.532 1.825 2.646 1.464l17.003-5.525"
                    fill="#CE1E5B"
                  />
                  <path
                    fill="#392538"
                    d="M282.735 434.37l4.064-1.321-1.32-4.065-4.065 1.321 1.321 4.064"
                  />
                  <path
                    d="M291.298 431.587l4.064-1.32-1.32-4.066-4.065 1.321 1.321 4.065"
                    fill="#BB242A"
                  />
                  <path
                    d="M294.733 421.004a2.137 2.137 0 0 0-1.321-4.066l-17.003 5.527a2.136 2.136 0 0 0-1.325 2.6c.326 1.134 1.531 1.825 2.645 1.463l17.004-5.524"
                    fill="#72C5CD"
                  />
                  <path
                    d="M279.952 425.806l4.065-1.32c-.5-1.537-.964-2.965-1.32-4.065l-4.066 1.322 1.321 4.063"
                    fill="#248C73"
                  />
                  <path
                    d="M288.515 423.024l4.065-1.32-1.321-4.066-4.065 1.321 1.321 4.065"
                    fill="#62803A"
                  />
                </g>
              </g>
              <g className="anime-element fadeleft-animation">
                <g transform="translate(28 221)">
                  <use
                    fill="#000"
                    filter="url(#hero-illustration-u)"
                    xlinkHref="#hero-illustration-v"
                  />
                  <use fill="#FFF" xlinkHref="#hero-illustration-v" />
                </g>
                <text
                  fontFamily="AppleColorEmoji, Apple Color Emoji"
                  fontSize="19"
                  fill="#11103E"
                  transform="translate(28 221)"
                >
                  <tspan x="17" y="36">
                    🤗
                  </tspan>
                </text>
              </g>
              <g className="anime-element fadeleft-animation">
                <g transform="translate(325 257)">
                  <use
                    fill="#000"
                    filter="url(#hero-illustration-w)"
                    xlinkHref="#hero-illustration-x"
                  />
                  <use fill="#FFF" xlinkHref="#hero-illustration-x" />
                </g>
                <text
                  fontFamily="AppleColorEmoji, Apple Color Emoji"
                  fontSize="16"
                  fill="#11103E"
                  transform="translate(325 257)"
                >
                  <tspan x="13" y="31">
                    👋
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
