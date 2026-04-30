import React from "react";

const WoodFurnitureLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-8">
      {/* Container for the SVG Icon */}
      <svg
        viewBox="0 0 100 60"
        className="w-32 h-auto fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric 'AL' Icon inspired by 402398919_652614447048665_5355903895843495298_n.jpg */}
        <path
          d="M30 45 L50 15 L70 45 H62 L50 27 L38 45 H30 Z 
             M55 22 L85 22 L70 45 L62 45 L73 28 L55 28 Z"
        />
        {/* Decorative horizontal line below the icon */}
        <rect x="15" y="50" width="70" height="2" />
      </svg>

      {/* Text Span with Name */}
      <span className="mt-4 text-white font-semibold text-lg tracking-wide uppercase font-sans">
        Wood Furniture & Decore
      </span>
    </div>
  );
};

export default WoodFurnitureLogo;
