"use client";

import React from "react";

/* -------------------------------------------------------
   SHARED GEOMETRY — Your exact star + pentagon symbol
-------------------------------------------------------- */

const Symbol = ({ size = 80 }: { size?: number }) => (
  <svg
    width={size}
    height={(size * 200) / 320}
    viewBox="0 0 320 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(160,70)">
      {/* Black fintech star */}
      <polygon
        points="0,-50 28,-15 18,25 -18,25 -28,-15"
        fill="#000000"
      />

      {/* Neon fintech pentagon */}
      <polygon
        points="0,-15 14,-5 9,12 -9,12 -14,-5"
        fill="#4EE38A"
      />
    </g>
  </svg>
);

/* -------------------------------------------------------
   LIGHT MODE LOGO
-------------------------------------------------------- */

export const GenXBabyLogoLight: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="100%" height="100%" fill="#FFFFFF" />

    <g transform="translate(160,70)">
      <polygon points="0,-50 28,-15 18,25 -18,25 -28,-15" fill="#000000" />
      <polygon points="0,-15 14,-5 9,12 -9,12 -14,-5" fill="#4EE38A" />
    </g>

    <text
      x="50%"
      y="150"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize="28"
      fontWeight={700}
      fill="#1A1A1A"
    >
      GEN+X=BABY
    </text>
  </svg>
);

/* -------------------------------------------------------
   DARK MODE LOGO
-------------------------------------------------------- */

export const GenXBabyLogoDark: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="100%" height="100%" fill="#0F172A" />

    <g transform="translate(160,70)">
      <polygon points="0,-50 28,-15 18,25 -18,25 -28,-15" fill="#000000" />
      <polygon points="0,-15 14,-5 9,12 -9,12 -14,-5" fill="#4EE38A" />
    </g>

    <text
      x="50%"
      y="150"
      textAnchor="middle"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize="28"
      fontWeight={700}
      fill="#E5E7EB"
    >
      GEN+X=BABY
    </text>
  </svg>
);

/* -------------------------------------------------------
   MOBILE LOGO — For Navbar
-------------------------------------------------------- */

export const GenXBabyLogoMobile = () => (
  <div className="flex items-center gap-3">
    <Symbol size={40} />

    <span className="text-white font-bold tracking-wide text-lg">
      GEN<span className="text-[#4EE38A]">X</span>BABY
    </span>
  </div>
);

/* -------------------------------------------------------
   FULL LOGO — For Marketing Pages
-------------------------------------------------------- */

export const GenXBabyLogoFull = () => (
  <div className="flex items-center gap-4">
    <Symbol size={60} />

    <span className="text-white font-extrabold tracking-wider text-3xl">
      GEN<span className="text-[#4EE38A]">X</span>BABY
    </span>
  </div>
);
