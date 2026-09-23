import React from 'react';

interface SpecSheetDividerProps {
  className?: string;
  align?: 'left' | 'right';
  label?: string;
}

export const SpecSheetDivider: React.FC<SpecSheetDividerProps> = ({
  className = '',
  align = 'left',
  label
}) => {
  return (
    <div className={`relative flex items-center gap-3 my-6 ${className}`}>
      {align === 'left' && (
        <svg
          width="44"
          height="14"
          viewBox="0 0 44 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-[#38BDF8]/70"
          aria-hidden="true"
        >
          {/* Main baseline */}
          <line x1="0" y1="7" x2="44" y2="7" stroke="currentColor" strokeWidth="1.2" />
          {/* Gauge millimeter tick marks */}
          <line x1="2" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="22" y1="4" x2="22" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="32" y1="4" x2="32" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="1" x2="42" y2="13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}

      {label && (
        <span className="text-[11px] font-mono tracking-[0.2em] text-[#38BDF8] uppercase shrink-0">
          {label}
        </span>
      )}

      <div className="h-[1px] w-full bg-[rgba(244,243,240,0.12)]" />

      {align === 'right' && (
        <svg
          width="44"
          height="14"
          viewBox="0 0 44 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-[#38BDF8]/70"
          aria-hidden="true"
        >
          <line x1="0" y1="7" x2="44" y2="7" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="1" x2="2" y2="13" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="22" y1="4" x2="22" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="32" y1="4" x2="32" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="2" x2="42" y2="12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
};
