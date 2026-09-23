import React, { useState } from 'react';
import metricsData from '../ml/metrics.json';
import { SpecSheetDivider } from './SpecSheetDivider.tsx';
import { formatIndianCurrency, formatIndianNumber } from '../utils/currency.ts';
import { Zap, Activity, Sliders, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';
import { predictCarPrice } from '../ml/predict.ts';

export const InsightsView: React.FC = () => {
  const { feature_importances } = metricsData;

  // Interactive Live Sensitivity Simulator
  const [simPower, setSimPower] = useState<number>(115);
  const [simAge, setSimAge] = useState<number>(4);
  const [simKm, setSimKm] = useState<number>(45000);
  const [simMileage, setSimMileage] = useState<number>(17.5);
  const [simBrand, setSimBrand] = useState<string>('Honda');

  const simResult = predictCarPrice({
    brand: simBrand,
    vehicle_age: simAge,
    km_driven: simKm,
    seller_type: 'Individual',
    fuel_type: 'Petrol',
    transmission_type: 'Manual',
    mileage: simMileage,
    engine: Math.round(simPower * 12.5),
    max_power: simPower,
    seats: 5
  });

  return (
    <div className="w-full text-left">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-[0.2em] text-[#38BDF8] uppercase">
            SECTION 3 // REGRESSION EXPLAINABILITY
          </span>
          <span className="text-[#8C8F94]">·</span>
          <span className="text-xs text-[#8C8F94] font-mono">GINI IMPURITY SPLIT REDUCTION</span>
        </div>
        <h1 className="font-serif-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F3F0] mb-3">
          Random Forest Feature Importance
        </h1>
        <p className="text-sm sm:text-base text-[#8C8F94] max-w-3xl leading-relaxed">
          Mean decrease in impurity across 100 decision trees.
          Reveals how specific physical specifications govern automotive resale valuations in the Indian secondary vehicle market.
        </p>
      </div>

      {/* Dominance Callout Banner */}
      <div className="bg-[#1C1E23] p-6 sm:p-7 rounded-sm border-l-4 border-[#1E6E4F] border-t border-r border-b border-[rgba(244,243,240,0.08)] mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-[#1E6E4F]/20 rounded text-[#1E6E4F] shrink-0 mt-0.5">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#1E6E4F] uppercase tracking-wider font-semibold">
                DOMINANT PREDICTOR PHENOMENON
              </span>
            </div>
            <h2 className="font-serif-fraunces text-2xl font-bold text-[#F4F3F0] mb-2">
              Maximum Power (bhp) Dominates by a Wide Margin (63.5%)
            </h2>
            <p className="text-xs sm:text-sm text-[#8C8F94] leading-relaxed mb-3">
              <code className="text-[#38BDF8] font-mono">max_power</code> accounts for <strong>0.635</strong> of the total tree split variance —
              surpassing the combined weight of all other 9 features combined.
              In the Indian automotive market, engine horsepower acts as an unambiguous proxy for vehicle trim, original invoice MSRP, and luxury tier classification.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[rgba(244,243,240,0.08)] text-xs font-mono">
              <div>
                <span className="text-[#8C8F94] block text-[10px]">1. max_power</span>
                <span className="text-[#1E6E4F] font-bold text-sm">63.5%</span>
              </div>
              <div>
                <span className="text-[#8C8F94] block text-[10px]">2. mileage</span>
                <span className="text-[#F4F3F0] font-bold text-sm">12.7%</span>
              </div>
              <div>
                <span className="text-[#8C8F94] block text-[10px]">3. vehicle_age</span>
                <span className="text-[#F4F3F0] font-bold text-sm">12.7%</span>
              </div>
              <div>
                <span className="text-[#8C8F94] block text-[10px]">4. km_driven</span>
                <span className="text-[#F4F3F0] font-bold text-sm">6.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Importance Bar Chart */}
      <div className="bg-[#1C1E23] p-6 sm:p-8 rounded-sm border border-[rgba(244,243,240,0.1)] mb-8">
        <h3 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0] mb-1">
          Complete 10-Feature Hierarchy
        </h3>
        <p className="text-xs text-[#8C8F94] mb-6">
          Ranking of relative information gain per feature column.
        </p>

        <div className="space-y-4">
          {feature_importances.map((item, index) => {
            const isTop = index === 0;
            const barWidth = (item.importance / 0.635) * 100;

            return (
              <div key={item.feature} className="p-3 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-1.5 gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8C8F94] font-bold w-5">#{index + 1}</span>
                    <span className={`text-sm ${isTop ? 'text-[#1E6E4F] font-bold' : 'text-[#F4F3F0] font-medium'}`}>
                      {item.label}
                    </span>
                    <span className="text-[#8C8F94] text-[11px] hidden md:inline">({item.feature})</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-sm font-bold text-[#F4F3F0]">{item.percentage}</span>
                    <span className="text-xs text-[#8C8F94]">({item.importance.toFixed(3)})</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#111215] h-3 rounded-xs overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all duration-500 rounded-xs ${
                      isTop
                        ? 'bg-gradient-to-r from-[#1E6E4F] to-[#259b6f]'
                        : index < 3
                        ? 'bg-[#0284C7]'
                        : 'bg-[#9A9E9F]/60'
                    }`}
                    style={{ width: `${Math.max(1.5, barWidth)}%` }}
                  />
                </div>

                <p className="text-[11px] text-[#8C8F94] leading-relaxed">
                  {item.insight}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <SpecSheetDivider label="INTERACTIVE WHAT-IF REGRESSION EXPLORER" />

      {/* Interactive Sensitivity Explorer */}
      <div className="bg-[#1C1E23] p-6 sm:p-8 rounded-sm border border-[rgba(244,243,240,0.1)] mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-[#38BDF8]" />
          <h2 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0]">
            Live Sensitivity Simulator
          </h2>
        </div>
        <p className="text-xs text-[#8C8F94] mb-6">
          Adjust the dominant predictors in real-time to observe the nonlinear valuation response of the Random Forest model.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand select */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#F4F3F0]">Make Classification:</span>
                <span className="text-[#38BDF8] font-semibold">{simBrand}</span>
              </div>
              <select
                value={simBrand}
                onChange={(e) => setSimBrand(e.target.value)}
                className="w-full bg-[#17181C] text-xs text-[#F4F3F0] border border-[rgba(244,243,240,0.15)] rounded px-3 py-2 focus:border-[#38BDF8] focus:outline-none"
              >
                {['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Mahindra', 'Tata', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Slider 1: max_power (Dominant) */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#F4F3F0] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E6E4F]" />
                  Engine Power (max_power):
                </span>
                <span className="text-[#1E6E4F] font-bold">{simPower} bhp</span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="2"
                value={simPower}
                onChange={(e) => setSimPower(Number(e.target.value))}
                className="w-full accent-[#1E6E4F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C8F94] font-mono mt-0.5">
                <span>40 bhp (Entry)</span>
                <span>82 bhp (Commuter)</span>
                <span>140 bhp (SUV)</span>
                <span>300 bhp (Luxury)</span>
              </div>
            </div>

            {/* Slider 2: vehicle_age */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#F4F3F0] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  Vehicle Age (Depreciation):
                </span>
                <span className="text-[#38BDF8] font-bold">{simAge} years</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={simAge}
                onChange={(e) => setSimAge(Number(e.target.value))}
                className="w-full accent-[#0284C7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C8F94] font-mono mt-0.5">
                <span>0 yrs (Brand New)</span>
                <span>5 yrs (Retained)</span>
                <span>10 yrs (Depreciated)</span>
                <span>15 yrs</span>
              </div>
            </div>

            {/* Slider 3: km_driven */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#F4F3F0] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9A9E9F]" />
                  Odometer (km_driven):
                </span>
                <span className="text-[#9A9E9F] font-bold">{formatIndianNumber(simKm)} km</span>
              </div>
              <input
                type="range"
                min="5000"
                max="180000"
                step="2500"
                value={simKm}
                onChange={(e) => setSimKm(Number(e.target.value))}
                className="w-full accent-[#9A9E9F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C8F94] font-mono mt-0.5">
                <span>5k km</span>
                <span>50k km</span>
                <span>100k km</span>
                <span>180k km</span>
              </div>
            </div>
          </div>

          {/* Realtime Output Card */}
          <div className="lg:col-span-5 bg-[#141518] p-6 rounded-sm border border-[rgba(244,243,240,0.12)] flex flex-col justify-between text-center lg:text-left">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#38BDF8] uppercase block mb-1">
                SIMULATED VALUATION
              </span>
              <div className="font-mono-plex text-4xl sm:text-5xl font-bold text-[#1E6E4F] mb-3">
                {simResult.formattedPrice}
              </div>
              <p className="text-xs text-[#8C8F94] font-mono mb-4">
                Bounded Interval: {simResult.formattedLowerBound} – {simResult.formattedUpperBound}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(244,243,240,0.08)] text-xs text-[#8C8F94] space-y-1.5">
              <div className="flex justify-between">
                <span>Simulated Power:</span>
                <span className="text-[#F4F3F0] font-mono">{simPower} bhp</span>
              </div>
              <div className="flex justify-between">
                <span>Simulated Age:</span>
                <span className="text-[#F4F3F0] font-mono">{simAge} years</span>
              </div>
              <div className="flex justify-between">
                <span>Simulated Mileage:</span>
                <span className="text-[#F4F3F0] font-mono">{simMileage} km/l</span>
              </div>
              <div className="flex justify-between">
                <span>Model Confidence:</span>
                <span className="text-[#1E6E4F] font-mono">MAE ±₹1.05 Lakh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
