import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const ForecastCard = React.memo(function ForecastCard({ forecast }) {
  // Mock confidence and trend for UI
  const confidence = 85;
  const growth = 12.5;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl border border-indigo-500 p-4 md:p-6 shadow-md flex flex-col justify-between min-h-[160px] text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute right-10 bottom-0 w-24 h-24 bg-white opacity-5 rounded-full -mb-10 pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-medium text-white break-words whitespace-normal leading-snug">
            Revenue Forecast
          </h3>
          <p className="text-xs md:text-sm text-indigo-200 mt-1 break-words whitespace-normal">
            Predicted Next Month
          </p>
        </div>
        <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm shrink-0">
          <LineChart className="w-5 h-5 md:w-6 md:h-6 text-indigo-50" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto relative z-10">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight break-words whitespace-normal">
            {formatCurrency(forecast)}
          </h2>
        </div>

        <div className="mt-4 pt-4 border-t border-indigo-500/50">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-emerald-300 font-medium bg-emerald-900/40 px-2 py-1 rounded-md text-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{growth}% Trend</span>
            </div>
            <div className="text-xs md:text-sm text-indigo-200 break-words">
              <span className="font-semibold text-white">{confidence}%</span> Confidence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ForecastCard;
