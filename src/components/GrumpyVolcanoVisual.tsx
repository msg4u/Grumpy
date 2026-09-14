import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Droplets, Wind } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface GrumpyVolcanoVisualProps {
  grumpyFace: 'sleeping' | 'annoyed' | 'boiling' | 'exploding' | 'relieved';
  flowerState: 'healthy' | 'fine' | 'wet' | 'knocked' | 'reborn';
  hatOn: boolean;
  cloudState: 'none' | 'sneaking' | 'raining' | 'stormy' | 'fleeing';
  angerLevel: number;
  onTapGrumpy?: () => void;
  onTapFlower?: () => void;
  onTapCloud?: () => void;
  isErupting?: boolean;
  lavaColor?: string;
  denseFoam?: boolean;
}

export const GrumpyVolcanoVisual: React.FC<GrumpyVolcanoVisualProps> = ({
  grumpyFace,
  flowerState,
  hatOn,
  cloudState,
  angerLevel,
  onTapGrumpy,
  onTapFlower,
  onTapCloud,
  isErupting = false,
  lavaColor = '#EF4444',
  denseFoam = true
}) => {
  const isBoiling = grumpyFace === 'boiling' || angerLevel >= 60;
  const isExploding = grumpyFace === 'exploding' || isErupting;

  return (
    <div 
      className="relative w-full aspect-4/3 max-w-xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 border-4 border-amber-300/80 shadow-lg select-none flex items-center justify-center p-4"
      id="grumpy-volcano-stage"
    >
      {/* Sun / Sky Backdrop */}
      <div className="absolute top-4 left-6 flex items-center gap-1.5 opacity-90">
        <div className="w-12 h-12 rounded-full bg-amber-300 shadow-md flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 rounded-full bg-amber-400" />
        </div>
      </div>

      {/* Background Mountain Peaks */}
      <svg className="absolute bottom-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 500 300">
        <path d="M-20 300 L90 120 L210 300 Z" fill="#94A3B8" />
        <path d="M300 300 L420 140 L530 300 Z" fill="#CBD5E1" />
      </svg>

      {/* Interactive Cheeky Cloud */}
      <AnimatePresence>
        {cloudState !== 'none' && (
          <motion.div
            id="interactive-cheeky-cloud"
            initial={{ opacity: 0, x: 80, y: -20 }}
            animate={
              cloudState === 'fleeing'
                ? { x: 300, y: -60, opacity: 0, scale: 0.6 }
                : { 
                    x: [30, 45, 30], 
                    y: [-10, -5, -10],
                    opacity: 1,
                    scale: cloudState === 'stormy' ? 1.25 : 1.05
                  }
            }
            transition={{
              repeat: cloudState === 'fleeing' ? 0 : Infinity,
              duration: cloudState === 'fleeing' ? 0.8 : 3,
              ease: 'easeInOut'
            }}
            onClick={() => {
              soundFx.playCloudGiggle();
              onTapCloud?.();
            }}
            className="absolute top-8 right-12 z-30 cursor-pointer group flex flex-col items-center"
            title="Apasă pe norul obraznic!"
          >
            {/* Cloud SVG Body */}
            <div className={`relative px-4 py-3 rounded-3xl shadow-lg border transition-all ${
              cloudState === 'stormy'
                ? 'bg-gradient-to-r from-stone-700 to-stone-900 border-stone-800 text-stone-100'
                : 'bg-gradient-to-r from-stone-500 to-stone-600 border-stone-600 text-white'
            } group-hover:scale-110 active:scale-95`}>
              {/* Cheeky Eyes & Smile */}
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="text-xs font-bold font-mono">
                  {cloudState === 'fleeing' ? '⊙ ⊙' : cloudState === 'stormy' ? '▼ ▼' : '¬ ‿ ¬'}
                </span>
              </div>
              <div className="text-[10px] font-bold text-center tracking-wide">
                {cloudState === 'fleeing' ? 'Fugiți!' : cloudState === 'stormy' ? 'NORI VÂNT' : 'Nor Obraznic'}
              </div>

              {/* Stolen hat on cloud if hat stolen */}
              {!hatOn && cloudState !== 'fleeing' && (
                <div className="absolute -top-3.5 right-1 text-xs bg-white text-sky-800 font-bold px-1.5 py-0.5 rounded-full border border-sky-200 shadow-xs rotate-12 flex items-center gap-0.5">
                  <span>❄️</span> Pălăria!
                </div>
              )}
            </div>

            {/* Rain Drops if raining */}
            {cloudState === 'raining' && (
              <div className="flex gap-2 mt-1 animate-bounce">
                <Droplets className="w-4 h-4 text-sky-500 animate-pulse" />
                <Droplets className="w-3 h-3 text-sky-600" />
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
            )}

            {/* Storm gusts if stormy */}
            {cloudState === 'stormy' && (
              <div className="flex gap-1 mt-1 text-stone-700 animate-pulse">
                <Wind className="w-5 h-5 animate-spin" />
                <span className="text-xs font-bold text-stone-800">VJUUU!</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mountain Character (Grumpy) */}
      <div 
        id="grumpy-mountain-figure"
        onClick={() => {
          if (isBoiling) soundFx.playKettleWhistle();
          else soundFx.playPop();
          onTapGrumpy?.();
        }}
        className="relative z-20 cursor-pointer flex flex-col items-center mt-6 group"
        title="Apasă pe Grumpy!"
      >
        {/* Floating Steam / Kettle effect when boiling */}
        {isBoiling && !isExploding && (
          <div className="absolute -top-14 flex items-center justify-center gap-3 pointer-events-none">
            <motion.div 
              animate={{ y: [-5, -28], opacity: [0.8, 0], scale: [0.8, 1.4] }} 
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-stone-400 font-bold text-sm bg-white/70 px-2 py-0.5 rounded-full border border-stone-300"
            >
              ♨️ Fâââș!
            </motion.div>
            <motion.div 
              animate={{ y: [-8, -32], opacity: [0.9, 0], scale: [0.9, 1.5] }} 
              transition={{ repeat: Infinity, duration: 1.4, delay: 0.3 }}
              className="text-orange-500 font-bold text-sm bg-orange-100/90 px-2 py-0.5 rounded-full border border-orange-300"
            >
              Fierbe ca un ceainic!
            </motion.div>
          </div>
        )}

        {/* Sleeping Zzz when sleeping */}
        {grumpyFace === 'sleeping' && (
          <motion.div 
            animate={{ y: [-5, -25], opacity: [0, 1, 0], scale: [0.8, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="absolute -top-12 text-blue-500 font-black text-lg pointer-events-none"
          >
            Z z z...
          </motion.div>
        )}

        {/* Eruption Geyser of Lava */}
        {isExploding && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-24 z-40 flex flex-col items-center pointer-events-none"
          >
            {/* Lava Fountain Spout */}
            <div 
              className="w-16 h-28 rounded-t-full shadow-2xl relative flex items-center justify-center animate-pulse"
              style={{
                background: `linear-gradient(to top, ${lavaColor}, #FFA500, #FFFF77)`
              }}
            >
              {/* Spurt bubbles */}
              <div className="absolute -top-3 w-10 h-10 rounded-full bg-amber-300 border-2 border-white animate-ping" />
              <div className="absolute top-2 w-6 h-6 rounded-full bg-white opacity-80" />
              {denseFoam && (
                <div className="absolute -top-6 flex gap-1">
                  <div className="w-5 h-5 rounded-full bg-white shadow-md animate-bounce" />
                  <div className="w-7 h-7 rounded-full bg-amber-100 shadow-md" />
                  <div className="w-5 h-5 rounded-full bg-white shadow-md animate-bounce" />
                </div>
              )}
            </div>
            <div className="text-xs font-black text-red-700 bg-white/90 px-2 py-0.5 rounded-full shadow-md mt-1 border border-red-300">
              🔥 ERUPȚIE DE SPUMĂ!
            </div>
          </motion.div>
        )}

        {/* Mountain Peak Crown (Crater, Hat, Flower) */}
        <div className="relative z-30 flex items-center justify-center -mb-2">
          {/* Snow Hat */}
          {hatOn && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-5 z-20 bg-white border-2 border-sky-200 text-sky-900 px-3 py-1 rounded-full shadow-sm text-xs font-bold flex items-center gap-1"
            >
              <span>❄️</span> Pălăria de zăpadă
            </motion.div>
          )}

          {/* Grumpy's Precious Flower */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playPop();
              onTapFlower?.();
            }}
            className="relative z-30 cursor-pointer -top-6 p-1 transition-transform hover:scale-125"
            title="Floarea lui Grumpy (Apasă pe ea!)"
          >
            {flowerState === 'healthy' && (
              <motion.div 
                animate={{ rotate: [-3, 3, -3] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl filter drop-shadow-md">🌸</div>
                <div className="w-1.5 h-4 bg-emerald-600 rounded-full" />
              </motion.div>
            )}

            {flowerState === 'fine' && (
              <div className="flex flex-col items-center">
                <div className="text-2xl">🌸</div>
                <div className="w-1.5 h-3 bg-emerald-600 rounded-full" />
              </div>
            )}

            {flowerState === 'wet' && (
              <div className="flex flex-col items-center rotate-12">
                <div className="text-2xl filter drop-shadow-xs">🥀</div>
                <div className="w-1 h-3 bg-emerald-700 rounded-full" />
                <span className="text-[10px] text-blue-600 font-bold bg-white/80 px-1 rounded-full">udată...</span>
              </div>
            )}

            {flowerState === 'knocked' && (
              <div className="flex items-center -rotate-75 translate-y-3">
                <div className="text-2xl opacity-80">🥀</div>
                <div className="w-3 h-1 bg-emerald-800 rounded-full" />
                <span className="text-[10px] text-red-600 font-black bg-white/80 px-1 rounded-full ml-1">dărâmată!</span>
              </div>
            )}

            {flowerState === 'reborn' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <div className="text-3xl">🌺</div>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                </div>
                <div className="w-2 h-4 bg-emerald-600 rounded-full" />
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                  Renăscută!
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mountain Slope SVG with Expressions */}
        <div className="relative w-64 sm:w-76">
          <svg 
            viewBox="0 0 280 200" 
            className={`w-full drop-shadow-xl transition-all ${
              isExploding ? 'animate-bounce' : ''
            }`}
          >
            <defs>
              <linearGradient id="volcanoSlope" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isBoiling ? '#B91C1C' : isExploding ? '#DC2626' : '#78350F'} />
                <stop offset="40%" stopColor={isBoiling ? '#EA580C' : '#854D0E'} />
                <stop offset="100%" stopColor="#3F6212" />
              </linearGradient>

              <linearGradient id="craterRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#451A03" />
                <stop offset="50%" stopColor={isExploding ? '#FEF08A' : '#78350F'} />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>

            {/* Crater Top Opening */}
            <ellipse cx="140" cy="22" rx="42" ry="12" fill="url(#craterRim)" stroke="#292524" strokeWidth="3" />
            {isExploding && (
              <ellipse cx="140" cy="22" rx="36" ry="9" fill={lavaColor} className="animate-pulse" />
            )}

            {/* Main Volcano Conical Body */}
            <path 
              d="M100 22 C115 70, 70 140, 20 195 L260 195 C210 140, 165 70, 180 22 Z" 
              fill="url(#volcanoSlope)" 
              stroke="#292524" 
              strokeWidth="3.5"
            />

            {/* Grassy / Rocky Texture Slopes */}
            <path d="M40 190 Q90 140 130 185" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M150 185 Q190 140 240 190" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Hot Boiling Kettle Veins if Boiling */}
            {isBoiling && (
              <>
                <path d="M110 50 Q125 80 120 120" stroke="#F97316" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                <path d="M170 50 Q155 80 160 120" stroke="#F97316" strokeWidth="3" strokeDasharray="4 4" fill="none" className="animate-pulse" />
              </>
            )}

            {/* Lava streaks running down if exploding */}
            {isExploding && (
              <>
                <path d="M120 25 Q100 80 85 160" stroke={lavaColor} strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M140 25 Q145 90 142 170" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M160 25 Q180 85 195 160" stroke={lavaColor} strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* GRUMPY'S FACE */}
            <g id="grumpy-face-elements">
              {/* Sleeping Face */}
              {grumpyFace === 'sleeping' && (
                <>
                  {/* Closed Curved Eyes */}
                  <path d="M115 95 Q125 88 135 95" stroke="#FEE2E2" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M145 95 Q155 88 165 95" stroke="#FEE2E2" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  {/* Gentle sleeping mouth */}
                  <path d="M135 115 Q140 120 145 115" stroke="#FEE2E2" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Rosy Cheeks */}
                  <circle cx="108" cy="104" r="7" fill="#FCA5A5" opacity="0.5" />
                  <circle cx="172" cy="104" r="7" fill="#FCA5A5" opacity="0.5" />
                </>
              )}

              {/* Annoyed Face (Hat stolen) */}
              {grumpyFace === 'annoyed' && (
                <>
                  {/* Slanted Eyebrows */}
                  <line x1="110" y1="88" x2="132" y2="93" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
                  <line x1="170" y1="88" x2="148" y2="93" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
                  {/* Open watchful eyes */}
                  <circle cx="122" cy="98" r="5" fill="#FFFFFF" />
                  <circle cx="122" cy="98" r="2.5" fill="#1C1917" />
                  <circle cx="158" cy="98" r="5" fill="#FFFFFF" />
                  <circle cx="158" cy="98" r="2.5" fill="#1C1917" />
                  {/* Slight wavy mouth */}
                  <path d="M130 118 Q140 114 150 117" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Tiny sweat drop */}
                  <path d="M174 90 Q176 84 178 90 Z" fill="#67E8F9" />
                </>
              )}

              {/* Boiling Kettle Face */}
              {grumpyFace === 'boiling' && (
                <>
                  {/* Angry Eyebrows angled inward */}
                  <line x1="110" y1="84" x2="134" y2="96" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                  <line x1="170" y1="84" x2="146" y2="96" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                  {/* Fierce eyes */}
                  <circle cx="122" cy="102" r="6" fill="#FEF08A" />
                  <circle cx="122" cy="102" r="3" fill="#7F1D1D" />
                  <circle cx="158" cy="102" r="6" fill="#FEF08A" />
                  <circle cx="158" cy="102" r="3" fill="#7F1D1D" />
                  {/* Tight grimace / teeth */}
                  <rect x="126" y="115" width="28" height="8" rx="3" fill="#FEF08A" stroke="#7F1D1D" strokeWidth="2" />
                  <line x1="135" y1="115" x2="135" y2="123" stroke="#7F1D1D" strokeWidth="1.5" />
                  <line x1="145" y1="115" x2="145" y2="123" stroke="#7F1D1D" strokeWidth="1.5" />
                  {/* Glowing red cheeks */}
                  <circle cx="106" cy="108" r="9" fill="#EF4444" opacity="0.8" className="animate-pulse" />
                  <circle cx="174" cy="108" r="9" fill="#EF4444" opacity="0.8" className="animate-pulse" />
                </>
              )}

              {/* Exploding Face */}
              {grumpyFace === 'exploding' && (
                <>
                  {/* Super angled eyebrows */}
                  <line x1="108" y1="80" x2="135" y2="95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="172" y1="80" x2="145" y2="95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Huge flaming eyes */}
                  <circle cx="122" cy="100" r="8" fill="#FDE047" />
                  <circle cx="122" cy="100" r="4" fill="#DC2626" />
                  <circle cx="158" cy="100" r="8" fill="#FDE047" />
                  <circle cx="158" cy="100" r="4" fill="#DC2626" />
                  {/* Roaring open mouth */}
                  <path d="M122 114 Q140 140 158 114 Z" fill="#7F1D1D" stroke="#FEF08A" strokeWidth="2.5" />
                </>
              )}

              {/* Relieved / Happy Calm Face */}
              {grumpyFace === 'relieved' && (
                <>
                  {/* Happy closed arched eyes */}
                  <path d="M114 96 Q124 86 134 96" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M146 96 Q156 86 166 96" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  {/* Wide peaceful smile */}
                  <path d="M125 112 Q140 128 155 112" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  {/* Rosy glowing cheeks */}
                  <circle cx="106" cy="105" r="9" fill="#F472B6" opacity="0.7" />
                  <circle cx="174" cy="105" r="9" fill="#F472B6" opacity="0.7" />
                </>
              )}
            </g>
          </svg>
        </div>
      </div>

      {/* Thermometer Overlay in Top Right */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-2xl border-2 border-stone-200 shadow-md flex items-center gap-2">
        <span className="text-xs font-bold text-stone-600">Supărare:</span>
        <div className="w-18 sm:w-24 h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
          <motion.div 
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(8, angerLevel))}%`,
              backgroundColor: angerLevel < 30 ? '#10B981' : angerLevel < 70 ? '#F59E0B' : '#EF4444'
            }}
          />
        </div>
        <span className="text-xs font-extrabold" style={{
          color: angerLevel < 30 ? '#059669' : angerLevel < 70 ? '#D97706' : '#DC2626'
        }}>
          {angerLevel}%
        </span>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
        <span className="text-[11px] font-bold text-stone-600 bg-white/80 px-3 py-1 rounded-full border border-stone-200">
          💡 Atinge muntele, norul sau floarea pentru reacții!
        </span>
      </div>
    </div>
  );
};
