import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-md bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
