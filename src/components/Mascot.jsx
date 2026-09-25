import React from 'react';

export const Mascot = ({ mood = 'happy', message = null, size = 'md' }) => {
  // Size classes
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Animated SVG Mascot: Clingy the C Crab */}
      <div className={`relative ${currentSize} shrink-0 animate-mascot transition-transform hover:scale-105 cursor-pointer`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Shadow */}
          <ellipse cx="60" cy="110" rx="35" ry="8" fill="#e5e5e5" />

          {/* Left Claw */}
          <g className={mood === 'cheering' ? 'animate-bounce' : ''}>
            <path
              d="M 32 65 C 10 50, 10 30, 26 25 C 28 38, 38 48, 40 60 Z"
              fill="#FF4B4B"
              stroke="#EA2B2B"
              strokeWidth="3"
            />
            {/* Claw pincer */}
            <path
              d="M 24 25 C 15 15, 26 5, 34 18 C 30 20, 26 22, 24 25 Z"
              fill="#FF6161"
            />
          </g>

          {/* Right Claw */}
          <g className={mood === 'cheering' ? 'animate-bounce' : ''}>
            <path
              d="M 88 65 C 110 50, 110 30, 94 25 C 92 38, 82 48, 80 60 Z"
              fill="#FF4B4B"
              stroke="#EA2B2B"
              strokeWidth="3"
            />
            <path
              d="M 96 25 C 105 15, 94 5, 86 18 C 90 20, 94 22, 96 25 Z"
              fill="#FF6161"
            />
          </g>

          {/* Legs */}
          <path d="M 28 85 Q 15 95 18 105" stroke="#EA2B2B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 35 90 Q 25 105 28 112" stroke="#EA2B2B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 92 85 Q 105 95 102 105" stroke="#EA2B2B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 85 90 Q 95 105 92 112" stroke="#EA2B2B" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Crab Main Body */}
          <ellipse cx="60" cy="72" rx="38" ry="28" fill="#FF4B4B" stroke="#EA2B2B" strokeWidth="4" />
          {/* Cute belly patch */}
          <ellipse cx="60" cy="78" rx="26" ry="17" fill="#FFC800" opacity="0.9" />

          {/* C Logo on Belly */}
          <text
            x="60"
            y="85"
            textAnchor="middle"
            fontFamily="'Fira Code', monospace"
            fontWeight="900"
            fontSize="22"
            fill="#46A302"
            className="drop-shadow-sm"
          >
            C
          </text>

          {/* Eye Stalks */}
          <rect x="42" y="38" width="6" height="15" rx="3" fill="#FF4B4B" stroke="#EA2B2B" strokeWidth="2" />
          <rect x="72" y="38" width="6" height="15" rx="3" fill="#FF4B4B" stroke="#EA2B2B" strokeWidth="2" />

          {/* Eyes */}
          <circle cx="45" cy="38" r="11" fill="#FFFFFF" stroke="#EA2B2B" strokeWidth="3" />
          <circle cx="75" cy="38" r="11" fill="#FFFFFF" stroke="#EA2B2B" strokeWidth="3" />

          {/* Pupils based on mood */}
          {mood === 'sad' ? (
            <>
              <circle cx="45" cy="41" r="5" fill="#1e293b" />
              <circle cx="75" cy="41" r="5" fill="#1e293b" />
              {/* Tear */}
              <circle cx="38" cy="49" r="3" fill="#38bdf8" />
            </>
          ) : mood === 'flame' ? (
            <>
              <circle cx="45" cy="37" r="6" fill="#FF9600" />
              <circle cx="75" cy="37" r="6" fill="#FF9600" />
              <circle cx="44" cy="35" r="2" fill="#FFFFFF" />
              <circle cx="74" cy="35" r="2" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <circle cx="46" cy="37" r="5" fill="#1e293b" />
              <circle cx="76" cy="37" r="5" fill="#1e293b" />
              {/* Highlights */}
              <circle cx="44" cy="35" r="2" fill="#FFFFFF" />
              <circle cx="74" cy="35" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Mouth */}
          {mood === 'sad' ? (
            <path d="M 52 70 Q 60 63 68 70" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : mood === 'cheering' ? (
            <path d="M 50 63 Q 60 76 70 63 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
          ) : (
            <path d="M 52 64 Q 60 71 68 64" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Cheeks */}
          <ellipse cx="38" cy="68" rx="4" ry="2.5" fill="#f87171" opacity="0.8" />
          <ellipse cx="82" cy="68" rx="4" ry="2.5" fill="#f87171" opacity="0.8" />
        </svg>
      </div>

      {/* Speech bubble */}
      {message && (
        <div className="relative bg-white border-2 border-[#e5e5e5] rounded-2xl px-4 py-2.5 shadow-sm text-sm font-bold text-gray-700 max-w-xs animate-fade-in">
          {/* Arrow */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#e5e5e5]"></div>
          <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-r-7 border-r-white"></div>
          {message}
        </div>
      )}
    </div>
  );
};
