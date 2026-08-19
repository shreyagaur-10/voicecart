import React from 'react';
import clsx from 'clsx';

interface WaveformAnimationProps {
  isActive: boolean;
  className?: string;
}

const BAR_HEIGHTS = [40, 65, 80, 55, 90, 70, 50, 85, 60, 45];

export const WaveformAnimation: React.FC<WaveformAnimationProps> = ({
  isActive,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-[5px]',
        className
      )}
      aria-hidden="true"
    >
      {BAR_HEIGHTS.map((height, i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{
            height: `${height}px`,
            animationPlayState: isActive ? 'running' : 'paused',
            opacity: isActive ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  );
};
