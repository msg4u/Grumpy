import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { 
  Sparkles, 
  RotateCcw, 
  Flame, 
  FlaskConical, 
  Check, 
  HelpCircle, 
  Zap,
  Gauge
} from 'lucide-react';

interface LavaColorOption {
  name: string;
  hex: string;
  label: string;
}

const LAVA_COLORS: LavaColorOption[] = [
  { name: 'red', hex: '#EF4444', label: 'Roșu Aprins' },
  { name: 'orange', hex: '#F97316', label: 'Portocaliu Foc' },
  { name: 'pink', hex: '#EC4899', label: 'Roz Zmeură' },
  { name: 'gold', hex: '#EAB308', label: 'Auriu Strălucitor' },
];

export const LabSimulatorTab: React.FC = () => {
  const [bakingSodaSpoons, setBakingSodaSpoons] = useState<number>(2); // 1, 2, 3, 4
  const [vinegarMl, setVinegarMl] = useState<number>(100); // 50, 100, 200
  const [hasSoap, setHasSoap] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<string>('#F97316');

  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [reactionProgress, setReactionProgress] = useState<number>(0); // 0 to 100
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute simulated outputs
  // Max foam height in cm
  const computedHeightCm = Math.round(
    bakingSodaSpoons * 7 + (vinegarMl / 10) * 1.8 + (hasSoap ? 18 : 6)
  );

  // Gas pressure level (percentage 0-100)
  const computedPressure = Math.min(
    100,
    Math.round((bakingSodaSpoons * 15) + (vinegarMl * 0.25))
  );

  const handleTriggerReaction = () => {
    if (isReacting) return;
    soundFx.playEruption();
    setIsReacting(true);
    setReactionProgress(0);
    setHasCompleted(false);

    // Particle confetti
    try {
      confetti({
        particleCount: bakingSodaSpoons * 25,
        spread: 75,
        origin: { y: 0.6 },
        colors: [selectedColor, '#FFFFFF', '#FED7AA']
      });
    } catch {
      // ignore
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setReactionProgress(progress);
      if (progress % 15 === 0) {
        soundFx.playBubble();
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsReacting(false);
        setHasCompleted(true);
        soundFx.playCelebration();
      }
    }, 120);
  };

  const handleReset = () => {
    soundFx.playPop();
    setIsReacting(false);
    setReactionProgress(0);
    setHasCompleted(false);
  };

  // Canvas drawing of foam bubbles during reaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const bubbles: { x: number; y: number; r: number; vy: number; vx: number; alpha: number }[] = [];

    // Initialize bubbles
    const bubbleCount = hasSoap ? 45 : 15;
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height - 30 - Math.random() * 40,
        r: Math.random() * (hasSoap ? 8 : 4) + 3,
        vy: -(Math.random() * 2 + 1.5),
        vx: (Math.random() - 0.5) * 2,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isReacting || reactionProgress > 0) {
        // Draw rising foam body
        const foamHeight = (reactionProgress / 100) * (canvas.height * 0.65);
        const topY = canvas.height - 40 - foamHeight;

        // Base gradient for lava flow
        const grad = ctx.createLinearGradient(0, topY, 0, canvas.height);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.3, selectedColor);
        grad.addColorStop(1, '#991B1B');

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Conical overflow
        ctx.moveTo(canvas.width / 2 - 30, canvas.height - 20);
        ctx.bezierCurveTo(
          canvas.width / 2 - 50, topY + 15,
          canvas.width / 2 - 40, topY,
          canvas.width / 2, topY - 10
        );
        ctx.bezierCurveTo(
          canvas.width / 2 + 40, topY,
          canvas.width / 2 + 50, topY + 15,
          canvas.width / 2 + 30, canvas.height - 20
        );
        ctx.closePath();
        ctx.fill();

        // Draw animated foam bubbles
        bubbles.forEach(b => {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
          ctx.strokeStyle = selectedColor;
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();

          // Move
          b.y += b.vy;
          b.x += b.vx;

          if (b.y < topY - 30) {
            b.y = canvas.height - 30;
            b.x = canvas.width / 2 + (Math.random() - 0.5) * 60;
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isReacting, reactionProgress, selectedColor, hasSoap]);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wide">
          <FlaskConical className="w-4 h-4 text-red-600" />
          <span>Laboratorul Virtual de Știință</span>
        </div>
        <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold text-stone-900">
          Simulatorul de Erupție al lui Grumpy
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Modifică cantitățile de ingrediente și observă cum reacționează chimic bicarbonatul cu oțetul!
        </p>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Recipe Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md space-y-5">
          <h2 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <span>🎛️</span>
            <span>Reglează Ingredientele Secrete</span>
          </h2>

          {/* Control 1: Baking Soda (Supărarea) */}
          <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Ingredient 1 (Baza)
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                  Bicarbonat de sodiu („Supărarea”)
                </h4>
              </div>
              <span className="text-xs font-extrabold bg-orange-100 text-orange-800 px-3 py-1 rounded-full border border-orange-200">
                {bakingSodaSpoons} linguri
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[1, 2, 3, 4].map((spoons) => (
                <button
                  key={spoons}
                  disabled={isReacting}
                  onClick={() => {
                    soundFx.playPop();
                    setBakingSodaSpoons(spoons);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    bakingSodaSpoons === spoons
                      ? 'bg-orange-500 text-white border-orange-600 shadow-xs scale-105'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  {spoons === 1 && '1 (Mic)'}
                  {spoons === 2 && '2 (Standard)'}
                  {spoons === 3 && '3 (Mult)'}
                  {spoons === 4 && '4 (Uriaș)'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 italic">
              Cu cât pui mai mult bicarbonat, cu atât Grumpy ține mai multă supărare în burtică.
            </p>
          </div>

          {/* Control 2: Vinegar (Norul obraznic) */}
          <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Ingredient 2 (Acidul)
                </span>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                  Oțet alimentar („Norul obraznic”)
                </h4>
              </div>
              <span className="text-xs font-extrabold bg-sky-100 text-sky-800 px-3 py-1 rounded-full border border-sky-200">
                {vinegarMl} ml
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { ml: 50, label: '50 ml (Puțin)' },
                { ml: 100, label: '100 ml (1/2 pahar)' },
                { ml: 200, label: '200 ml (1 pahar plin)' }
              ].map((opt) => (
                <button
                  key={opt.ml}
                  disabled={isReacting}
                  onClick={() => {
                    soundFx.playPop();
                    setVinegarMl(opt.ml);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    vinegarMl === opt.ml
                      ? 'bg-sky-500 text-white border-sky-600 shadow-xs scale-105'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 italic">
              Oțetul este scânteia care declanșează eliberarea gazului sub presiune!
            </p>
          </div>

          {/* Control 3: Detergent de vase Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div>
              <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                Adaugă detergent de vase lichid
              </h4>
              <p className="text-[11px] text-emerald-700">
                Captează dioxidul de carbon și produce spumă densă cu mii de bule!
              </p>
            </div>

            <button
              disabled={isReacting}
              onClick={() => {
                soundFx.playPop();
                setHasSoap(prev => !prev);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                hasSoap
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-stone-500 border-stone-300'
              }`}
            >
              {hasSoap ? '✓ ACTIVAT' : 'OPRIT'}
            </button>
          </div>

          {/* Control 4: Lava Color Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Alege culoarea lavei:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LAVA_COLORS.map((col) => (
                <button
                  key={col.hex}
                  disabled={isReacting}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedColor(col.hex);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedColor === col.hex
                      ? 'border-stone-900 bg-stone-100 shadow-xs scale-102'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="truncate">{col.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Trigger Button */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleTriggerReaction}
              disabled={isReacting}
              id="start-virtual-reaction-btn"
              className={`w-full py-4 px-6 rounded-2xl font-['Fredoka',sans-serif] text-base sm:text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-3 border-2 ${
                isReacting
                  ? 'bg-stone-300 text-stone-600 border-stone-400 cursor-wait'
                  : 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white border-amber-300 hover:scale-[1.02] active:scale-95 shadow-orange-300'
              }`}
            >
              <FlaskConical className={`w-6 h-6 ${isReacting ? 'animate-spin' : ''}`} />
              <span>
                {isReacting
                  ? `REACȚIE ÎN DESFĂȘURARE... ${reactionProgress}%`
                  : '🧪 TOARNĂ OȚETUL ȘI DECLANȘEAZĂ REACȚIA!'}
              </span>
            </button>

            {hasCompleted && (
              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Încearcă alt amestec / Resetează</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Volcano Reactor Visualizer & Meters */}
        <div className="lg:col-span-6 space-y-4">
          {/* Reactor Screen Card */}
          <div className="bg-stone-900 rounded-3xl p-5 border-4 border-stone-800 shadow-xl text-white relative overflow-hidden flex flex-col items-center">
            {/* Top Stat Bar */}
            <div className="w-full flex items-center justify-between border-b border-stone-800 pb-3 mb-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Gauge className="w-4 h-4" />
                <span>CAMERA DE PRESIUNE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-400">STATUS:</span>
                <span className={`font-bold ${isReacting ? 'text-red-400 animate-pulse' : hasCompleted ? 'text-emerald-400' : 'text-stone-300'}`}>
                  {isReacting ? 'ERUPȚIE ACTIVĂ' : hasCompleted ? 'ERUPȚIE FINALIZATĂ' : 'PREGĂTIT'}
                </span>
              </div>
            </div>

            {/* Volcano Canvas Stage */}
            <div className="relative w-full aspect-square max-w-[340px] flex items-end justify-center">
              {/* Mountain Volcano graphic in background */}
              <svg 
                viewBox="0 0 300 240" 
                className="absolute bottom-0 w-full z-10 pointer-events-none drop-shadow-md"
              >
                <defs>
                  <linearGradient id="simVolcanoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7F1D1D" />
                    <stop offset="50%" stopColor="#451A03" />
                    <stop offset="100%" stopColor="#1C1917" />
                  </linearGradient>
                </defs>

                {/* Crater opening */}
                <ellipse cx="150" cy="80" rx="35" ry="12" fill="#292524" stroke="#78350F" strokeWidth="3" />

                {/* Mountain Body */}
                <path 
                  d="M115 80 C125 130, 80 190, 20 235 L280 235 C220 190, 175 130, 185 80 Z" 
                  fill="url(#simVolcanoGrad)" 
                  stroke="#44403C" 
                  strokeWidth="3"
                />

                {/* Lava streaks running down */}
                {reactionProgress > 20 && (
                  <>
                    <path d="M135 85 Q115 140 100 210" stroke={selectedColor} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
                    <path d="M150 85 Q152 150 148 220" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9" />
                    <path d="M165 85 Q185 140 200 210" stroke={selectedColor} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
                  </>
                )}

                {/* Grumpy face on simulator mountain */}
                <circle cx="138" cy="145" r="4" fill="#FFFFFF" />
                <circle cx="162" cy="145" r="4" fill="#FFFFFF" />
                <path d="M142 165 Q150 172 158 165" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
              </svg>

              {/* Dynamic Particle Canvas overlay */}
              <canvas
                ref={canvasRef}
                width={300}
                height={240}
                className="relative z-20 w-full h-full pointer-events-none"
              />
            </div>

            {/* Live Metrics Row */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-stone-800">
              <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  Înălțime Spumă Estimată
                </span>
                <div className="text-xl sm:text-2xl font-black font-['Fredoka',sans-serif] text-orange-400 mt-0.5">
                  ~{computedHeightCm} cm
                </div>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  Presiune Gaz CO₂
                </span>
                <div className="text-xl sm:text-2xl font-black font-['Fredoka',sans-serif] text-red-400 mt-0.5">
                  {computedPressure}%
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Observation & Comparison Box */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md space-y-2 text-stone-800">
            <div className="flex items-center gap-2 text-orange-700 font-bold text-sm">
              <Zap className="w-5 h-5" />
              <span>Ce observăm la acest amestec?</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              {bakingSodaSpoons >= 3 && vinegarMl >= 100 ? (
                <span>
                  🔥 <strong>Reacție puternică!</strong> Ai combinat o cantitate mare de bază (bicarbonat) cu mult acid (oțet). S-au format instantaneu milioane de molecule de gaz CO₂, creând o presiune mare care împinge lava spumoasă cu forță!
                </span>
              ) : bakingSodaSpoons <= 1 ? (
                <span>
                  🌱 <strong>Reacție blândă!</strong> O singură lingură de bicarbonat produce o erupție mică, liniștită. Gazul format este puțin, deci spuma se prelinge ușor pe versanți.
                </span>
              ) : (
                <span>
                  ✨ <strong>Reacție echilibrată!</strong> Cantitățile standard (2 linguri bicarbonat + 100ml oțet) oferă erupția perfectă de laborator: spectaculoasă, cu spumă generoasă și ușor de ținut sub control pe tavă.
                </span>
              )}
            </p>

            <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
              <span>
                {hasSoap 
                  ? 'Detergentul este activat: bulele sunt rezistente și formează o spumă densă.'
                  : 'Fără detergent: reacția este mai gazoasă și fâsâie mai mult, dar spuma dispare mai repede.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
