import React, { useState } from 'react';
import { EXPERIMENT_MATERIALS, CONSTRUCTION_STEPS } from '../data/storyData';
import { ExperimentMaterial, AppTab } from '../types';
import { soundFx } from '../utils/audio';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Printer, 
  AlertTriangle, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Droplets,
  PackageCheck
} from 'lucide-react';

interface ExperimentTabProps {
  onNavigateTab: (tab: AppTab) => void;
}

export const ExperimentTab: React.FC<ExperimentTabProps> = ({ onNavigateTab }) => {
  const [materials, setMaterials] = useState<ExperimentMaterial[]>(EXPERIMENT_MATERIALS);
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleMaterial = (id: string) => {
    soundFx.playPop();
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, checked: !m.checked } : m))
    );
  };

  const checkedCount = materials.filter(m => m.checked).length;
  const allChecked = checkedCount === materials.length;

  const currentStepData = CONSTRUCTION_STEPS.find(s => s.stepNumber === activeStep) || CONSTRUCTION_STEPS[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-200" />
            <span>Ghid Practic DIY pentru Părinți & Copii</span>
          </div>
          <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight">
            Activitatea: „Ajută-l pe Grumpy să erupă!”
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
            Copilul devine „prietenul care ține jurnalul supărării lui Grumpy” și declanșează chiar el eruperea spumoasă cu bicarbonat și oțet, în momentul potrivit al poveștii!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundFx.playPop();
                onNavigateTab('simulator');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-orange-800 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-amber-50"
            >
              <Play className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span>Testează în Simulatorul Virtual</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-black/20 hover:bg-black/30 border border-white/30 rounded-xl font-bold text-xs sm:text-sm text-white"
            >
              <Printer className="w-4 h-4" />
              <span>Tipărește Rețeta / Fișa</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden lg:block absolute right-8 bottom-4 text-8xl opacity-30 select-none">
          🌋
        </div>
      </div>

      {/* SECTION 1: Materials Checklist */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <PackageCheck className="w-6 h-6 text-orange-600" />
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
                Materiale Necesare
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Bifați obiectele pe măsură ce le adunați pe masa de lucru:
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <span className="text-xs font-bold text-amber-900">
              Pregătite: {checkedCount} / {materials.length}
            </span>
            {allChecked && <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />}
          </div>
        </div>

        {/* Grid of Materials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {materials.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMaterial(item.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start gap-3 ${
                item.checked
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                  : 'bg-stone-50/80 border-stone-200 hover:border-amber-300 text-stone-800'
              }`}
            >
              <button className="shrink-0 mt-0.5">
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className={`text-sm font-bold truncate ${item.checked ? 'line-through text-stone-500' : ''}`}>
                    {item.name}
                  </h4>
                </div>
                <div className="text-xs text-orange-700 font-semibold mt-0.5">
                  Cantitate: {item.amount}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 leading-tight">
                  Rol: {item.role}
                </div>
                {item.tip && (
                  <div className="text-[10px] text-amber-700 font-medium mt-1 bg-amber-100/60 px-2 py-0.5 rounded-md inline-block">
                    💡 {item.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Practical tips bar */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Sfaturi practice importante: </span>
            Faceți experimentul afară sau pe o tavă mare adâncă, ușor de curățat — spuma de oțet și bicarbonat este generoasă! Asigurați-vă că sticla este bine fixată în interiorul conului de ziare, altfel se poate răsturna.
          </div>
        </div>
      </div>

      {/* SECTION 2: Step-by-Step Construction Guide */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
              Pașii de Construcție și Realizare
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Urmați cei 5 pași simpli pentru a construi muntele și a pregăti momentul erupției:
            </p>
          </div>
        </div>

        {/* Step Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CONSTRUCTION_STEPS.map((step) => {
            const isSelected = activeStep === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  soundFx.playPop();
                  setActiveStep(step.stepNumber);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.02]'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-black/15 text-xs font-black">
                  {step.stepNumber}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Card */}
        <div className="bg-stone-50 rounded-3xl p-6 border-2 border-stone-200/90 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Pasul {currentStepData.stepNumber} din 5
              </span>
              <h3 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
                {currentStepData.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-semibold">
                {currentStepData.subtitle}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-black">
              {currentStepData.stepNumber === 1 && '🏔️'}
              {currentStepData.stepNumber === 2 && '🎨'}
              {currentStepData.stepNumber === 3 && '✨'}
              {currentStepData.stepNumber === 4 && '📖'}
              {currentStepData.stepNumber === 5 && '🌋'}
            </div>
          </div>

          {/* Step Instructions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Instrucțiuni Pas cu Pas:
            </h4>
            <div className="grid gap-2">
              {currentStepData.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-stone-700 text-sm font-medium leading-relaxed">
                    {inst}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Roles Breakdown: Kid vs Adult */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-1">
                <span>🧒</span>
                <span>Rolul Copilului:</span>
              </div>
              <p className="text-xs sm:text-sm text-sky-800 leading-relaxed font-medium">
                {currentStepData.kidRole}
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                <span>🧑‍🏫</span>
                <span>Rolul Adultului:</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
                {currentStepData.adultRole}
              </p>
            </div>
          </div>

          {/* Warning if any */}
          {currentStepData.warning && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>
                <strong>Atenție:</strong> {currentStepData.warning}
              </span>
            </div>
          )}

          {/* Next / Prev Step controls */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                if (activeStep > 1) {
                  soundFx.playPop();
                  setActiveStep(s => s - 1);
                }
              }}
              disabled={activeStep === 1}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border ${
                activeStep === 1
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
              }`}
            >
              Pasul Anterior
            </button>

            {activeStep < 5 ? (
              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveStep(s => s + 1);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xs"
              >
                <span>Următorul Pas ({activeStep + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundFx.playCelebration();
                  onNavigateTab('simulator');
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
              >
                <span>Mergi la Simulatorul de Lavă</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
