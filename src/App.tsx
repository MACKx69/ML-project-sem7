import React, { useState } from 'react';
import { TopNav, NavTab } from './components/TopNav.tsx';
import { AppraisalForm } from './components/AppraisalForm.tsx';
import { ValuationResult } from './components/ValuationResult.tsx';
import { ModelComparison } from './components/ModelComparison.tsx';
import { InsightsView } from './components/InsightsView.tsx';
import { LabReportView } from './components/LabReportView.tsx';
import { FooterDisclaimer } from './components/FooterDisclaimer.tsx';
import { CarInputSpecs, PRESET_CARS, PresetCar } from './ml/presets.ts';
import { predictCarPrice, PredictionResult } from './ml/predict.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('appraisal');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Initialize with the Step 8 Test Car specs
  const [specs, setSpecs] = useState<CarInputSpecs>({
    brand: PRESET_CARS[0].brand,
    vehicle_age: PRESET_CARS[0].vehicle_age,
    km_driven: PRESET_CARS[0].km_driven,
    seller_type: PRESET_CARS[0].seller_type,
    fuel_type: PRESET_CARS[0].fuel_type,
    transmission_type: PRESET_CARS[0].transmission_type,
    mileage: PRESET_CARS[0].mileage,
    engine: PRESET_CARS[0].engine,
    max_power: PRESET_CARS[0].max_power,
    seats: PRESET_CARS[0].seats
  });

  const [result, setResult] = useState<PredictionResult | null>(() => {
    return predictCarPrice(PRESET_CARS[0]);
  });

  const handleFieldChange = (field: keyof CarInputSpecs, value: any) => {
    setSpecs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    // Smooth brief feedback
    setTimeout(() => {
      const pred = predictCarPrice(specs);
      setResult(pred);
      setHasCalculated(true);
      setIsEvaluating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  };

  const handleApplyPreset = (preset: PresetCar) => {
    setSpecs({
      brand: preset.brand,
      vehicle_age: preset.vehicle_age,
      km_driven: preset.km_driven,
      seller_type: preset.seller_type,
      fuel_type: preset.fuel_type,
      transmission_type: preset.transmission_type,
      mileage: preset.mileage,
      engine: preset.engine,
      max_power: preset.max_power,
      seats: preset.seats
    });
    const pred = predictCarPrice(preset);
    setResult(pred);
    setHasCalculated(true);
    setCurrentTab('appraisal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLoadTestCar = () => {
    handleApplyPreset(PRESET_CARS[0]);
  };

  const handleResetForm = () => {
    setSpecs({
      brand: 'Maruti',
      vehicle_age: 4,
      km_driven: 40000,
      seller_type: 'Individual',
      fuel_type: 'Petrol',
      transmission_type: 'Manual',
      mileage: 20.0,
      engine: 1197,
      max_power: 82,
      seats: 5
    });
    setHasCalculated(false);
  };

  return (
    <div className="min-h-screen bg-[#17181C] text-[#F4F3F0] flex flex-col justify-between selection:bg-[#0284C7]/30 selection:text-[#F4F3F0]">
      {/* Top Bar Navigation */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickTest={handleQuickLoadTestCar}
      />

      {/* Main Content Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentTab === 'appraisal' && (
          hasCalculated && result ? (
            <ValuationResult
              result={result}
              specs={specs}
              onEditSpecs={() => setHasCalculated(false)}
              onExploreSensitivity={() => setCurrentTab('insights')}
            />
          ) : (
            <AppraisalForm
              specs={specs}
              onChange={handleFieldChange}
              onSubmit={handleEstimate}
              onApplyPreset={handleApplyPreset}
              onReset={handleResetForm}
              isLoading={isEvaluating}
            />
          )
        )}

        {currentTab === 'models' && <ModelComparison />}

        {currentTab === 'insights' && <InsightsView />}

        {currentTab === 'methodology' && <LabReportView />}
      </main>

      {/* Disclaimer & Appendix Footer */}
      <FooterDisclaimer
        onOpenMethodology={() => {
          setCurrentTab('methodology');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBenchmarks={() => {
          setCurrentTab('models');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
