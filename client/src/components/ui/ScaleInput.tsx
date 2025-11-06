import React from 'react';
import { COLOR_MAP, getScaleColor } from '../../constants/logItemMaps';

interface ScaleInputProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  descriptionMap: { [key: number]: string };
}

export const ScaleInput: React.FC<ScaleInputProps> = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
  descriptionMap,
}) => {
  const valueIndex = value >= min && value <= max ? value : min;

  return (
    <div className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-150 ease-in-out
              ${
                num === valueIndex
                  ? `${getScaleColor(num)} text-white ring-4 ring-offset-2 ring-indigo-400 scale-110`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            aria-label={`${label} - ${descriptionMap[num]}`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="mt-1 h-5">
        <span className={`text-sm font-medium ${COLOR_MAP[valueIndex] ? `text-` + COLOR_MAP[valueIndex].slice(3) : 'text-gray-500'}`}>
          {descriptionMap[valueIndex]}
        </span>
      </div>
    </div>
  );
};