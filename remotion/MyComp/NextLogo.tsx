import React from "react";

const style: React.CSSProperties = {
  height: 140,
  boxShadow: "0 0 300px black, 0 0 300px black",
  borderRadius: 70,
};

export const NextLogo: React.FC = () => {
  return (
    <svg
      style={style}
      fill="none"
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        height="180"
        id="mask0_292_250"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="180"
        x="0"
        y="0"
      >
        <circle cx="90" cy="90" fill="black" r="90"></circle>
      </mask>
      <g mask="url(#mask0_292_250)">
        <circle cx="90" cy="90" fill="black" r="90"></circle>
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear_292_250)"
        ></path>
        <rect
          fill="url(#paint1_linear_292_250)"
          height="72"
          width="12"
          x="115"
          y="54"
        ></rect>
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_292_250"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_292_250"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
