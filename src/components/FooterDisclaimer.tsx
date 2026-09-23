import React from 'react';
import { ShieldCheck, Database, Award } from 'lucide-react';

interface FooterDisclaimerProps {
  onOpenMethodology: () => void;
  onOpenBenchmarks: () => void;
}

export const FooterDisclaimer: React.FC<FooterDisclaimerProps> = ({
  onOpenMethodology,
  onOpenBenchmarks
}) => {
  return (
    <footer className="mt-20 border-t border-[rgba(244,243,240,0.1)] bg-[#141518] py-12 text-[#8C8F94] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand & Project Summary */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-serif-fraunces text-base font-bold text-[#F4F3F0]">
                AutoValuator
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#0284C7]/15 text-[#38BDF8] rounded">
                ML LAB PROJECT
              </span>
            </div>
            <p className="text-xs text-[#8C8F94] max-w-md leading-relaxed">
              Dealership appraisal desk prototype powered by a 100-tree Random Forest Regressor trained on the CarDekho Indian automotive dataset.
              Built for regression methodology evaluation and viva voce defense.
            </p>
          </div>

          {/* Quick Technical Specs */}
          <div className="md:col-span-3 space-y-1 font-mono text-[11px]">
            <span className="text-[#F4F3F0] font-semibold block mb-2 uppercase tracking-wider">
              Model Baseline
            </span>
            <div className="flex items-center gap-1.5 text-[#1E6E4F]">
              <Award className="w-3.5 h-3.5" />
              <span>Random Forest (R²: 0.8790)</span>
            </div>
            <div>MAE: ±₹1,05,480</div>
            <div>RMSE: ₹3,13,403</div>
            <button
              onClick={onOpenBenchmarks}
              className="text-[#38BDF8] hover:underline pt-1 inline-block cursor-pointer"
            >
              View 5-Model Benchmark Table →
            </button>
          </div>

          {/* Dataset Provenance */}
          <div className="md:col-span-3 space-y-1 font-mono text-[11px]">
            <span className="text-[#F4F3F0] font-semibold block mb-2 uppercase tracking-wider">
              Data Integrity
            </span>
            <div className="flex items-center gap-1.5 text-[#F4F3F0]">
              <Database className="w-3.5 h-3.5 text-[#9A9E9F]" />
              <span>15,242 Clean Observations</span>
            </div>
            <div>167 Duplicates Dropped</div>
            <div>seats == 0 Cleaned</div>
            <button
              onClick={onOpenMethodology}
              className="text-[#38BDF8] hover:underline pt-1 inline-block cursor-pointer"
            >
              Review Pipeline Code & Report →
            </button>
          </div>
        </div>

        {/* Quiet Academic Disclaimer Line */}
        <div className="pt-6 border-t border-[rgba(244,243,240,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] leading-relaxed">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <p>
              Academic Research Disclaimer: Valuation figures represent statistical regression estimates for academic demonstration only, not commercial quotes or insurance appraisals.
            </p>
          </div>
          <div className="font-mono text-[#8C8F94] shrink-0">
            Random Forest Ensemble · SEED=42
          </div>
        </div>
      </div>
    </footer>
  );
};
