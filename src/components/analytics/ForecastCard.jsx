import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

export default function ForecastCard({ forecast }) {
  // Mock confidence and trend for UI
  const confidence = 85;
  const growth = 12.5;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl border border-indigo-500 p-6 shadow-md flex flex-col h-full justify-between text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute right-10 bottom-0 w-24 h-24 bg-white opacity-5 rounded-full -mb-10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <LineChart className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <h3 className="font-bold text-white">Revenue Forecast</h3>
            <p className="text-xs text-indigo-200">Predicted Next Month</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold text-white">
            {formatCurrency(forecast)}
          </h2>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-indigo-500/50 relative z-10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-emerald-300 font-medium bg-emerald-900/40 px-2 py-1 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{growth}% Trend</span>
            </div>
          </div>
          <div className="text-indigo-200">
            <span className="font-semibold text-white">{confidence}%</span> Confidence
          </div>
        </div>
      </div>
    </div>
  );
}
