import React, { useEffect, useState } from 'react';
import { PredictionResult } from '../ml/predict.ts';
import { CarInputSpecs } from '../ml/presets.ts';
import { SpecSheetDivider } from './SpecSheetDivider.tsx';
import { formatIndianCurrency, formatIndianNumber } from '../utils/currency.ts';
import { ArrowLeft, ShieldAlert, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';

interface ValuationResultProps {
  result: PredictionResult;
  specs: CarInputSpecs;
  onEditSpecs: () => void;
  onExploreSensitivity: () => void;
}

export const ValuationResult: React.FC<ValuationResultProps> = ({
  result,
  specs,
  onEditSpecs,
  onExploreSensitivity
}) => {
  // One deliberate motion moment: odometer numeric tick-up animation
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    const target = result.rawPrediction;
    const duration = 900; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(target * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [result.rawPrediction]);

  return (
    <div className="w-full text-left">
      {/* Back to form link */}
      <button
        onClick={onEditSpecs}
        className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8F94] hover:text-[#38BDF8] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Modify Appraisal Specifications</span>
      </button>

      {/* Hero Estimated Value Card */}
      <div className="bg-[#1C1E23] p-7 sm:p-10 border border-[rgba(244,243,240,0.12)] rounded-sm relative overflow-hidden mb-8">
        {/* Decorative corner tick accent */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#38BDF8]/40 pointer-events-none" />

        {/* Small tracked-out eyebrow label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#1E6E4F] uppercase bg-[#1E6E4F]/10 px-2.5 py-1 rounded">
            ESTIMATED VALUE
          </span>
          <span className="text-xs font-mono text-[#8C8F94]">·</span>
          <span className="text-xs font-mono text-[#8C8F94]">
            {specs.brand} ({specs.vehicle_age} yrs old, {specs.max_power} bhp)
          </span>
        </div>

        {/* Large IBM Plex Mono Price Figure with Indian lakh/crore grouping */}
        <div className="font-mono-plex text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E6E4F] mb-4">
          {formatIndianCurrency(animatedValue)}
        </div>

        {/* Stated Margin of Error sentence using Random Forest's MAE */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-[#F4F3F0] mb-5 font-normal">
          <p className="leading-relaxed">
            Typical estimate is within <strong className="font-mono text-[#38BDF8]">{result.formattedMargin}</strong> of the actual sale price (Random Forest MAE).
          </p>
        </div>

        {/* Expected Appraisal Valuation Range */}
        <div className="p-3.5 bg-[#17181C] border border-[rgba(244,243,240,0.06)] rounded flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div>
            <span className="text-[#8C8F94] block text-[10px] uppercase tracking-wider mb-0.5">Conservative Lower Bound</span>
            <span className="text-[#F4F3F0] text-sm font-semibold">{result.formattedLowerBound}</span>
          </div>

          <div className="h-6 w-[1px] bg-[rgba(244,243,240,0.1)] hidden sm:block" />

          <div>
            <span className="text-[#8C8F94] block text-[10px] uppercase tracking-wider mb-0.5">Expected Point Valuation</span>
            <span className="text-[#38BDF8] text-sm font-semibold">{result.formattedPrice}</span>
          </div>

          <div className="h-6 w-[1px] bg-[rgba(244,243,240,0.1)] hidden sm:block" />

          <div>
            <span className="text-[#8C8F94] block text-[10px] uppercase tracking-wider mb-0.5">Optimistic Upper Bound</span>
            <span className="text-[#F4F3F0] text-sm font-semibold">{result.formattedUpperBound}</span>
          </div>

          <div className="h-6 w-[1px] bg-[rgba(244,243,240,0.1)] hidden sm:block" />

          <div className="flex items-center gap-1.5 text-[#1E6E4F] text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>R²: 0.879 · 100 Trees</span>
          </div>
        </div>
      </div>

      {/* Feature Vector Order Verification (as required by Section 4) */}
      <div className="mb-8 p-4 bg-[#141518] border border-[rgba(244,243,240,0.08)] rounded text-xs font-mono text-[#8C8F94]">
        <div className="flex items-center justify-between mb-1.5 text-[11px] text-[#38BDF8]">
          <span className="uppercase tracking-widest font-semibold">Trained Model Feature Vector Order Verification</span>
          <span>10 unscaled dimensions</span>
        </div>
        <div className="overflow-x-auto text-[11px] text-[#F4F3F0] font-mono py-1">
          <code>[{result.featureVector.join(', ')}]</code>
        </div>
        <div className="text-[10px] text-[#8C8F94] mt-1">
          Exact order: brand_enc, vehicle_age, km_driven, seller_enc, fuel_enc, trans_enc, mileage, engine, max_power, seats.
        </div>
      </div>

      {/* Two Column Layout: Specifications Recap & Feature Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Entered Specification Recap Table */}
        <div className="lg:col-span-7 bg-[#1C1E23] p-6 rounded-sm border border-[rgba(244,243,240,0.08)]">
          <h3 className="font-serif-fraunces text-lg font-bold text-[#F4F3F0] mb-1">
            Vehicle Specification Recap
          </h3>
          <p className="text-xs text-[#8C8F94] mb-4">
            Audit of all 10 tabular parameters entered into the regression pipeline.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-[rgba(244,243,240,0.1)] text-[#8C8F94] text-left">
                  <th className="py-2 font-normal">PARAMETER</th>
                  <th className="py-2 font-normal">INPUT VALUE</th>
                  <th className="py-2 font-normal text-right">MODEL ENCODING / RANGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(244,243,240,0.05)] text-[#F4F3F0]">
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Brand / Make</td>
                  <td className="py-2.5 font-semibold text-[#38BDF8]">{specs.brand}</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">Class #{result.featureVector[0]} of 31</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Vehicle Age</td>
                  <td className="py-2.5">{specs.vehicle_age} years</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">0 – 29 yrs</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Transmission</td>
                  <td className="py-2.5">{specs.transmission_type}</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">Code #{result.featureVector[5]} (0=Auto, 1=Manual)</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Fuel Type</td>
                  <td className="py-2.5">{specs.fuel_type}</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">Code #{result.featureVector[4]}</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Odometer</td>
                  <td className="py-2.5">{formatIndianNumber(specs.km_driven)} km</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">100 – 3,800,000 km</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Certified Mileage</td>
                  <td className="py-2.5">{specs.mileage} km/l</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">4.0 – 33.54 km/l</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Seller Channel</td>
                  <td className="py-2.5">{specs.seller_type}</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">Code #{result.featureVector[3]}</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Engine Displacement</td>
                  <td className="py-2.5">{formatIndianNumber(specs.engine)} cc</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">793 – 6592 cc</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Maximum Power</td>
                  <td className="py-2.5 font-semibold text-[#1E6E4F]">{specs.max_power} bhp</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">Top Feature (63.5%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C8F94]">Seating Capacity</td>
                  <td className="py-2.5">{specs.seats} seats</td>
                  <td className="py-2.5 text-right text-[#8C8F94]">2 – 9 seats</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Feature Contributions & What-If Link */}
        <div className="lg:col-span-5 bg-[#1C1E23] p-6 rounded-sm border border-[rgba(244,243,240,0.08)] flex flex-col justify-between">
          <div>
            <h3 className="font-serif-fraunces text-lg font-bold text-[#F4F3F0] mb-1">
              Valuation Drivers & Sensitivity
            </h3>
            <p className="text-xs text-[#8C8F94] mb-4">
              Estimated factor impacts relative to the dataset baseline mean of ₹7.75 Lakh.
            </p>

            <div className="space-y-3">
              {result.featureContributions.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-[#17181C] rounded border border-[rgba(244,243,240,0.05)] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#F4F3F0] truncate font-medium pr-2">{item.label}</span>
                    <span className={`font-mono font-semibold ${
                      item.direction === 'positive' ? 'text-[#1E6E4F]' : 'text-[#8C8F94]'
                    }`}>
                      {item.formattedImpact}
                    </span>
                  </div>
                  <div className="w-full bg-[#26282E] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.direction === 'positive' ? 'bg-[#1E6E4F]' : 'bg-[#0284C7]/60'}`}
                      style={{ width: `${Math.min(100, Math.max(10, item.percentage * 1.3))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[rgba(244,243,240,0.08)]">
            <button
              onClick={onExploreSensitivity}
              className="w-full py-2.5 px-4 bg-[#0284C7]/10 hover:bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-xs font-mono font-medium rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Explore Live Feature Sensitivity</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <SpecSheetDivider label="ACADEMIC LAB DISCLAIMER" />

      {/* Academic Disclaimer Box */}
      <div className="p-4 bg-[#141518] border border-[rgba(244,243,240,0.06)] rounded flex items-start gap-3 text-xs text-[#8C8F94] leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
        <p>
          <strong>Academic & Laboratory Valuation Notice:</strong> This valuation is an algorithmic statistical estimate
          generated by a trained Random Forest regression model on the historical CarDekho Indian automotive resale dataset (15,242 rows).
          It is built strictly for machine learning demonstration and lab coursework analysis; it does not constitute an official bank inspection,
          certified commercial appraisal, or binding dealer offer. Physical condition, accident history, and regional tax variations may significantly alter real market value.
        </p>
      </div>
    </div>
  );
};
