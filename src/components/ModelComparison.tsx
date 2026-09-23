import React, { useState } from 'react';
import metricsData from '../ml/metrics.json';
import { SpecSheetDivider } from './SpecSheetDivider.tsx';
import { formatIndianCurrency } from '../utils/currency.ts';
import { Award, AlertTriangle, Scale, CheckCircle2, TrendingUp, Info } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'r2' | 'mae' | 'rmse'>('r2');
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const { models } = metricsData;

  // Chart scaling math
  const maxR2 = 1.0;
  const maxMae = Math.max(...models.map(m => m.mae));
  const maxRmse = Math.max(...models.map(m => m.rmse));

  return (
    <div className="w-full text-left">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono tracking-[0.2em] text-[#38BDF8] uppercase">
            SECTION 2 // BENCHMARK EVALUATION
          </span>
          <span className="text-[#8C8F94]">·</span>
          <span className="text-xs text-[#8C8F94] font-mono">80/20 TEST SPLIT (N=3,049)</span>
        </div>
        <h1 className="font-serif-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F3F0] mb-3">
          Five-Model Algorithmic Comparison
        </h1>
        <p className="text-sm sm:text-base text-[#8C8F94] max-w-3xl leading-relaxed">
          Full empirical regression benchmarks evaluated on the identical 80/20 train-test split (random_state=42).
          All five models were trained per Section 2 specification with R², MAE (₹), and RMSE (₹) computed against actual transaction selling prices.
        </p>
      </div>

      {/* Interactive Metric Comparison Bar Chart */}
      <div className="bg-[#1C1E23] p-6 sm:p-8 rounded-sm border border-[rgba(244,243,240,0.1)] mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(244,243,240,0.08)]">
          <div>
            <h2 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0] mb-0.5">
              Comparative Metric Visualizer
            </h2>
            <p className="text-xs text-[#8C8F94]">
              {activeMetric === 'r2' && 'R² Coefficient of Determination (Higher is better — 1.0 max)'}
              {activeMetric === 'mae' && 'Mean Absolute Error in ₹ (Lower is better — average price deviation)'}
              {activeMetric === 'rmse' && 'Root Mean Squared Error in ₹ (Lower is better — penalizes large outliers)'}
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141518] rounded border border-[rgba(244,243,240,0.08)] shrink-0">
            <button
              onClick={() => setActiveMetric('r2')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors cursor-pointer ${
                activeMetric === 'r2'
                  ? 'bg-[#0284C7] text-white font-semibold'
                  : 'text-[#8C8F94] hover:text-[#F4F3F0]'
              }`}
            >
              R² Score
            </button>
            <button
              onClick={() => setActiveMetric('mae')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors cursor-pointer ${
                activeMetric === 'mae'
                  ? 'bg-[#0284C7] text-white font-semibold'
                  : 'text-[#8C8F94] hover:text-[#F4F3F0]'
              }`}
            >
              MAE (₹)
            </button>
            <button
              onClick={() => setActiveMetric('rmse')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors cursor-pointer ${
                activeMetric === 'rmse'
                  ? 'bg-[#0284C7] text-white font-semibold'
                  : 'text-[#8C8F94] hover:text-[#F4F3F0]'
              }`}
            >
              RMSE (₹)
            </button>
          </div>
        </div>

        {/* SVG/HTML Bar Chart */}
        <div className="space-y-4 pt-2">
          {models.map((model) => {
            let barWidth = 0;
            let displayValue = '';

            if (activeMetric === 'r2') {
              barWidth = (model.r2_score / maxR2) * 100;
              displayValue = `${(model.r2_score * 100).toFixed(2)}% (${model.r2_score.toFixed(4)})`;
            } else if (activeMetric === 'mae') {
              barWidth = (model.mae / maxMae) * 100;
              displayValue = formatIndianCurrency(model.mae);
            } else {
              barWidth = (model.rmse / maxRmse) * 100;
              displayValue = formatIndianCurrency(model.rmse);
            }

            const isBest = model.is_best;
            const isHovered = hoveredModel === model.id;

            return (
              <div
                key={model.id}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                className={`p-3 rounded transition-all ${
                  isHovered ? 'bg-[#22252C]' : 'bg-[#17181C]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-1.5 gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${isBest ? 'text-[#F4F3F0]' : 'text-[#8C8F94]'}`}>
                      {model.name}
                    </span>
                    {isBest && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#1E6E4F]/20 text-[#1E6E4F] border border-[#1E6E4F]/40 rounded font-semibold flex items-center gap-1">
                        <Award className="w-3 h-3" /> BEST FIT
                      </span>
                    )}
                    {model.id === 'ada' && (
                      <span className="text-[10px] px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-800/40 rounded font-semibold">
                        OUTLIER SENSITIVE
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-[#F4F3F0]">
                    {displayValue}
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full bg-[#111215] h-3.5 rounded-xs overflow-hidden flex items-center">
                  <div
                    className={`h-full transition-all duration-500 rounded-xs ${
                      isBest
                        ? 'bg-gradient-to-r from-[#1E6E4F] to-[#259b6f]'
                        : model.id === 'ada' && activeMetric === 'r2'
                        ? 'bg-gradient-to-r from-red-900 to-red-600'
                        : 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8]'
                    }`}
                    style={{ width: `${Math.max(5, barWidth)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full 5-Model Ground Truth Table */}
      <div className="bg-[#1C1E23] p-6 sm:p-8 rounded-sm border border-[rgba(244,243,240,0.1)] mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif-fraunces text-xl font-bold text-[#F4F3F0]">
            Empirical Results Matrix
          </h2>
          <span className="text-xs font-mono text-[#8C8F94]">Source: metrics.json</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-[rgba(244,243,240,0.15)] text-[#8C8F94] uppercase tracking-wider">
                <th className="py-3 px-3">Algorithm</th>
                <th className="py-3 px-3">Hyperparameters</th>
                <th className="py-3 px-3">Scaling Regime</th>
                <th className="py-3 px-3 text-right">R² Score</th>
                <th className="py-3 px-3 text-right">MAE (₹)</th>
                <th className="py-3 px-3 text-right">RMSE (₹)</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(244,243,240,0.06)] text-[#F4F3F0]">
              {models.map((model) => {
                const isBest = model.is_best;
                return (
                  <tr
                    key={model.id}
                    className={`transition-colors ${
                      isBest ? 'bg-[#1E6E4F]/10 hover:bg-[#1E6E4F]/15 font-medium' : 'hover:bg-[#212329]'
                    }`}
                  >
                    <td className="py-3 px-3 flex items-center gap-2">
                      <span className={`text-sm ${isBest ? 'text-[#F4F3F0] font-bold' : ''}`}>
                        {model.name}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#8C8F94] font-mono text-[11px]">
                      {model.hyperparameters}
                    </td>
                    <td className="py-3 px-3 text-[#8C8F94] text-[11px]">
                      {model.scaling}
                    </td>
                    <td className="py-3 px-3 text-right text-sm font-bold text-[#F4F3F0]">
                      {model.r2_score.toFixed(4)}
                    </td>
                    <td className="py-3 px-3 text-right text-sm">
                      {formatIndianCurrency(model.mae)}
                    </td>
                    <td className="py-3 px-3 text-right text-sm text-[#8C8F94]">
                      {formatIndianCurrency(model.rmse)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {isBest ? (
                        <span className="text-[10px] font-semibold text-[#1E6E4F] uppercase tracking-wider">
                          LIVE MODEL
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8C8F94] uppercase tracking-wider">
                          BENCHMARK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SpecSheetDivider label="CRITICAL ML LAB FINDINGS & VIVA NOTES" />

      {/* Honest Viva Talking Points & Findings (AdaBoost & SVR) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: AdaBoost Outlier Sensitivity */}
        <div className="bg-[#1C1E23] p-6 rounded-sm border border-red-900/30">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h3 className="font-serif-fraunces text-base font-bold text-[#F4F3F0]">
              Why AdaBoost Underperformed (R² = 0.4589)
            </h3>
          </div>
          <p className="text-xs text-[#8C8F94] leading-relaxed mb-3">
            In tabular regression tasks with heavily right-skewed targets, AdaBoostRegressor&apos;s default linear/square loss
            function iteratively re-weights samples with the largest residuals.
          </p>
          <div className="p-3 bg-[#141518] rounded text-xs text-[#F4F3F0] font-mono leading-relaxed space-y-1.5 border border-[rgba(244,243,240,0.05)]">
            <p>
              • <strong>Target Skew:</strong> The dataset median is ₹5.56 Lakh, but luxury/exotic outliers reach up to ₹3.95 Crore.
            </p>
            <p>
              • <strong>Mileage Outliers:</strong> Some vehicles record &gt; 3,800,000 km driven.
            </p>
            <p>
              • <strong>Weight Concentration:</strong> Boosting concentrates sample weights on these extreme outliers rather than fitting the typical mass-market cases, producing an MAE of ₹5,52,061.
            </p>
          </div>
          <p className="text-[11px] text-[#8C8F94] mt-3 italic">
            Viva talking point: Honest demonstration of boosting&apos;s vulnerability to extreme regression residuals without Huber loss or outlier trimming.
          </p>
        </div>

        {/* Card 2: SVR Target Scaling Requirement */}
        <div className="bg-[#1C1E23] p-6 rounded-sm border border-[#0284C7]/30">
          <div className="flex items-center gap-2 text-[#38BDF8] mb-2">
            <Scale className="w-4 h-4 shrink-0" />
            <h3 className="font-serif-fraunces text-base font-bold text-[#F4F3F0]">
              Why SVR Required Dual X and y Scaling
            </h3>
          </div>
          <p className="text-xs text-[#8C8F94] leading-relaxed mb-3">
            Support Vector Regression utilizes kernel distance computations in continuous feature space.
            Unlike tree regressors, distance-based kernels break when the target spans multiple orders of magnitude.
          </p>
          <div className="p-3 bg-[#141518] rounded text-xs text-[#F4F3F0] font-mono leading-relaxed space-y-1.5 border border-[rgba(244,243,240,0.05)]">
            <p>
              • <strong>Without y-Scaling:</strong> SVR achieves a <em>negative R²</em> (predicting worse than the sample mean every time).
            </p>
            <p>
              • <strong>Correct Implementation:</strong> Fit a dedicated <code className="text-[#38BDF8]">StandardScaler</code> on <code className="text-[#38BDF8]">y_train.values.reshape(-1, 1)</code>.
            </p>
            <p>
              • <strong>Inverse Transform:</strong> Predict on scaled X and y, then <code className="text-[#38BDF8]">inverse_transform</code> back to ₹ before scoring.
            </p>
          </div>
          <p className="text-[11px] text-[#8C8F94] mt-3 italic">
            Viva talking point: Demonstrates mastery over distance-based vs tree-based algorithm scaling requirements.
          </p>
        </div>
      </div>

      {/* Random Forest Superiority Breakdown */}
      <div className="p-5 bg-[#17181C] border border-[#1E6E4F]/30 rounded flex items-start gap-4">
        <CheckCircle2 className="w-5 h-5 text-[#1E6E4F] shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-[#8C8F94]">
          <h4 className="font-semibold text-sm text-[#F4F3F0] mb-1">
            Why Random Forest is the Ideal Production Model (R² = 0.8790)
          </h4>
          <p>
            Random Forest constructs an ensemble of 100 decorrelated decision trees using bootstrap aggregation (bagging) and random feature subspace sampling.
            Because split decisions depend solely on feature ordering rather than metric distances, it handles mixed unscaled categorical encodings and continuous engine variables effortlessly,
            yielding the lowest MAE (₹1,05,480) and lowest RMSE (₹3,13,403) across all evaluated architectures.
          </p>
        </div>
      </div>
    </div>
  );
};
