import React from 'react';

interface ATechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'iconOnly';
}

export const ATechLogo: React.FC<ATechLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'full'
}) => {
  // Height scaling
  const heightClasses = {
    sm: 'h-7',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20 lg:h-24',
  }[size];

  if (variant === 'iconOnly') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses} w-auto ${className} drop-shadow-[0_0_12px_rgba(190,242,100,0.3)]`}
      >
        <path 
          d="M 50 14 L 86 86 L 71 86 L 63 70 L 37 70 L 29 86 L 14 86 Z M 50 36 L 41 56 L 59 56 Z" 
          stroke="#bef264" 
          strokeWidth="7" 
          strokeLinejoin="miter"
          fill="none" 
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${heightClasses} ${className}`}>
      <svg 
        viewBox="0 0 330 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-[0_0_15px_rgba(190,242,100,0.25)]"
      >
        {/* Outlined 'A' matching Image 2 */}
        <path 
          d="M 48 14 L 84 86 L 69 86 L 61 70 L 35 70 L 27 86 L 12 86 Z M 48 36 L 39 56 L 57 56 Z" 
          stroke="#bef264" 
          strokeWidth="7" 
          strokeLinejoin="miter"
          fill="none" 
        />
        {/* 'TECH' Pill Badge matching Image 2 */}
        <rect 
          x="102" 
          y="15" 
          width="215" 
          height="70" 
          rx="22" 
          fill="#bef264" 
        />
        {/* 'TECH' White Heavy Typography */}
        <text 
          x="209" 
          y="65" 
          fill="#FFFFFF" 
          fontSize="48" 
          fontWeight="900" 
          fontFamily="'Montserrat', 'Arial Black', sans-serif" 
          textAnchor="middle" 
          letterSpacing="1.5"
        >
          TECH
        </text>
      </svg>
    </div>
  );
};
