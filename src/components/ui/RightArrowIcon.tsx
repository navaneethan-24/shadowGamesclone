import React from "react";

interface RightArrowIconProps {
  size?: number;
  color1?: string;
  color2?: string;
}

export default function RightArrowIcon({
  size = 39,
  color1 = "red",
  color2 = "#009AFF",
}: RightArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      style={{ transform: "scale(1.2)" }}
    >
      <g filter="url(#rightArrow_svg__a)">
        <rect
          width="27"
          height="27"
          x="6"
          y="3"
          fill="url(#rightArrow_svg__b)"
          fillOpacity="0.5"
          rx="13.5"
          shapeRendering="crispEdges"
        ></rect>
        <rect
          width="27"
          height="27"
          x="6"
          y="3"
          stroke="url(#rightArrow_svg__c)"
          strokeWidth="0.35"
          rx="13.5"
          shapeRendering="crispEdges"
        ></rect>
        <path
          fill="#fff"
          d="M18.79 10.79a1 1 0 0 0 0 1.42l3.3 3.29H14.5a1 1 0 0 0 0 2h7.59l-3.3 3.29a1.004 1.004 0 1 0 1.42 1.42l5-5a1 1 0 0 0 .21-.33.94.94 0 0 0 0-.76 1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 0"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="rightArrow_svg__b"
          x1="13.875"
          x2="47.606"
          y1="-24.355"
          y2="18.846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1}></stop>
          <stop offset="1" stopColor={color2}></stop>
        </linearGradient>
        <linearGradient
          id="rightArrow_svg__c"
          x1="19.5"
          x2="19.5"
          y1="3"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1}></stop>
          <stop offset="1" stopColor={color2}></stop>
        </linearGradient>
        <filter
          id="rightArrow_svg__a"
          width="38.142"
          height="38.142"
          x="0.429"
          y="0.232"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="0.876"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_47_3"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="2.803"></feOffset>
          <feGaussianBlur stdDeviation="2.698"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.603922 0 0 0 0 1 0 0 0 0.14 0"></feColorMatrix>
          <feBlend
            in2="effect1_dropShadow_47_3"
            result="effect2_dropShadow_47_3"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_47_3"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
