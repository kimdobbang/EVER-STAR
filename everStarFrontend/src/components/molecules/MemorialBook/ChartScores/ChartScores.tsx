import React from 'react';
import { WeatherIcon, WeatherIconProps } from 'components/atoms/icons/weather/WeatherIcon';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export interface ChartScoresProps {
  title: string;
  scores: number[];
}

const getWeatherType = (weatherScore: number): WeatherIconProps['type'] => {
  if (weatherScore <= 20) {
    return 'thunder';
  } else if (weatherScore <= 40) {
    return 'rain';
  } else if (weatherScore <= 60) {
    return 'wind';
  } else if (weatherScore <= 80) {
    return 'cloud';
  } else {
    return 'sun';
  }
};

export const ChartScores: React.FC<ChartScoresProps> = ({ title, scores }) => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: '감정 일조량',
        data: scores.slice(0, 7),
        backgroundColor: 'rgba(255, 237, 101, 0.6)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="relative flex flex-col items-center p-5 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-md">
      <div className="mb-16 text-center">
        <h2 className="text-xl font-bold leading-tight tracking-wide text-greyscaleblack-100">
          {title}
        </h2>
      </div>
      <div className="flex items-center justify-center w-[320px]">
        {scores.slice(0, 7).map((score, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
            <WeatherIcon type={getWeatherType(score)} />
            <p className="text-xs text-center">{`Week ${index + 1}`}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 w-[320px] h-[240px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
