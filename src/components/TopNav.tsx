import React from 'react';
import { Gauge, BarChart3, SlidersHorizontal, BookOpen } from 'lucide-react';

export type NavTab = 'appraisal' | 'models' | 'insights' | 'methodology';

interface TopNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickTest?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickTest
}) => {
  return (
    <header className="border-b border-[rgba(244,243,240,0.12)] bg-[#17181C]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('appraisal')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Return to Valuation Appraisal Desk"
          >
            <span className="font-serif-fraunces text-2xl font-bold tracking-tight text-[#F4F3F0] group-hover:text-[#38BDF8] transition-colors">
              AutoValuator
            </span>
          </button>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#1E6E4F]" title="Model Active" />
        </div>

        {/* Zone 2: Navigation Links (Clean text with active indicator, no pill boxes) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab('appraisal')}
            className={`flex items-center gap-2 py-2 transition-colors border-b-2 cursor-pointer ${
              currentTab === 'appraisal'
                ? 'text-[#F4F3F0] border-[#38BDF8]'
                : 'text-[#8C8F94] border-transparent hover:text-[#F4F3F0]'
            }`}
          >
            <Gauge className="w-4 h-4 text-[#38BDF8]" />
            <span>Appraisal Desk</span>
          </button>

          <button
            onClick={() => onSelectTab('models')}
            className={`flex items-center gap-2 py-2 transition-colors border-b-2 cursor-pointer ${
              currentTab === 'models'
                ? 'text-[#F4F3F0] border-[#38BDF8]'
                : 'text-[#8C8F94] border-transparent hover:text-[#F4F3F0]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#9A9E9F]" />
            <span>Model Comparison</span>
          </button>

          <button
            onClick={() => onSelectTab('insights')}
            className={`flex items-center gap-2 py-2 transition-colors border-b-2 cursor-pointer ${
              currentTab === 'insights'
                ? 'text-[#F4F3F0] border-[#38BDF8]'
                : 'text-[#8C8F94] border-transparent hover:text-[#F4F3F0]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#9A9E9F]" />
            <span>ML Insights</span>
          </button>

          <button
            onClick={() => onSelectTab('methodology')}
            className={`flex items-center gap-2 py-2 transition-colors border-b-2 cursor-pointer ${
              currentTab === 'methodology'
                ? 'text-[#F4F3F0] border-[#38BDF8]'
                : 'text-[#8C8F94] border-transparent hover:text-[#F4F3F0]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#9A9E9F]" />
            <span>Lab Methodology</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenQuickTest && (
            <button
              onClick={onOpenQuickTest}
              className="text-xs font-mono font-medium px-3.5 py-2 border border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors rounded-sm cursor-pointer whitespace-nowrap"
            >
              Load Test Car (₹5.5L)
            </button>
          )}

          <div className="md:hidden flex items-center">
            {/* Mobile Tab Selector */}
            <select
              value={currentTab}
              onChange={(e) => onSelectTab(e.target.value as NavTab)}
              className="bg-[#212328] text-xs text-[#F4F3F0] border border-[rgba(244,243,240,0.12)] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#38BDF8]"
              aria-label="Navigation View"
            >
              <option value="appraisal">Appraisal Desk</option>
              <option value="models">5-Model Benchmarks</option>
              <option value="insights">Feature Importance</option>
              <option value="methodology">Data Cleaning & Report</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
