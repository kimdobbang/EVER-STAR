import PropTypes from 'prop-types';
import React from 'react';

interface Props {
  fill: number; // 0 to 49
  className?: string;
}

const milestoneColors = [
  { min: 0, max: 6, color: 'bg-pink-300' }, // 핑
  { min: 7, max: 13, color: 'bg-red-500' }, // 빨
  { min: 14, max: 20, color: 'bg-orange-500' }, // 주
  { min: 21, max: 27, color: 'bg-yellow-400' }, // 노
  { min: 28, max: 34, color: 'bg-green-500' }, // 초
  { min: 35, max: 41, color: 'bg-blue-500' }, // 파
  { min: 42, max: 48, color: 'bg-indigo-600' }, // 남
  { min: 49, max: 49, color: 'bg-purple-600' }, // 보
];

export const ProgressBar: React.FC<Props> = ({ fill, className }) => {
  const getFillColor = () => {
    for (const milestone of milestoneColors) {
      if (fill >= milestone.min && fill <= milestone.max) {
        return milestone.color;
      }
    }
    return 'bg-pink-200';
  };

  const width = `${(fill / 49) * 100}%`;

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="w-full bg-[#edededcc] relative h-1">
        <div className={`h-1 ${getFillColor()}`} style={{ width }} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  fill: PropTypes.number.isRequired,
  className: PropTypes.string,
};
