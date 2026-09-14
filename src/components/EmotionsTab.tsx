import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { 
  HeartHandshake, 
  Sparkles, 
  Wind, 
  Smile, 
  RotateCcw, 
  Heart, 
  Shield, 
  CheckCircle2 
} from 'lucide-react';

interface EmotionStage {
  level: number;
  label: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
  description: string;
  bodyFeeling: string;
  tip: string;
}

const EMOTION_STAGES: EmotionStage[] = [
  {
    level: 1,
    label: 'Calm și Liniștit',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    emoji: '🌸',
    description: 'Grumpy doarme de sute de ani cu floarea roz pe creștet și zăpada moale.',
    bodyFeeling: 'Inima bate domol, mușchii sunt relaxați, respirăm ușor.',
    tip: 'Bucură-te de joacă, de o poveste sau de o îmbrățișare caldă!'
  },
  {
    level: 2,
    label: 'Un Pic Supărat (Deranjat)',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    emoji: '☁️',
    description: 'Norul obraznic a furat pălăria de zăpadă. Grumpy și-a zis: „Nu-i nimic, o să-mi crească alta.”',
    bodyFeeling: 'Sprâncenele se apropie un pic, simțim o mică încruntare.',
    tip: 'Poți spune cu o voce calmă: „Hei, nu-mi place când faci asta, te rog oprește-te!”'
  },
  {
    level: 3,
    label: 'Se Încălzește ca un Ceainic!',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    emoji: '♨️',
    description: 'Norul i-a udat floarea cu ploaie rece. Înăuntru începe să fiarbă apa ca pe foc!',
    bodyFeeling: 'Obrajii devin calzi, pumnii se strâng, inima începe să bată mai repede.',
    tip: 'E momentul să iei o pauză! Bea o gură de apă rece și fă Respirația Vulcanului!'
  },
  {
    level: 4,
    label: 'Gata de Erupție! (Furtună mare)',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-300',
    emoji: '🌋',
    description: 'Norii i-au dărâmat floarea de tot! Grumpy nu mai poate ține supărarea în el și erupe.',
    bodyFeeling: 'Vocea vrea să strige, corpul tremură de energie neeliberată.',
    tip: 'Cere ajutor unui adult, mototolește o foaie de hârtie sau bate din picioare într-o pernă!'
  }
];

export const EmotionsTab: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [myEmotion, setMyEmotion] = useState<number | null>(null);

  // Breathing exercise states
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');
  const [breathCounter, setBreathCounter] = useState<number>(0);
  const [breathingStars, setBreathingStars] = useState<number>(0);

  // Breathing loop
  useEffect(() => {
    if (!isBreathingActive) return;

    let timer: NodeJS.Timeout;

    if (breathPhase === 'inspire') {
      soundFx.playZenChime();
      timer = setTimeout(() => {
        setBreathPhase('hold');
      }, 4000); // 4 sec inhale
    } else if (breathPhase === 'hold') {
      timer = setTimeout(() => {
        setBreathPhase('expire');
      }, 2000); // 2 sec hold
    } else if (breathPhase === 'expire') {
      soundFx.playBubble();
      timer = setTimeout(() => {
        setBreathCounter(c => c + 1);
        setBreathingStars(s => s + 1);
        setBreathPhase('inspire');
      }, 4000); // 4 sec exhale
    }

    return () => clearTimeout(timer);
  }, [isBreathingActive, breathPhase]);

  const startBreathing = () => {
    soundFx.playZenChime();
    setIsBreathingActive(true);
    setBreathPhase('inspire');
  };

  const stopBreathing = () => {
    soundFx.playPop();
    setIsBreathingActive(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wide">
          <HeartHandshake className="w-4 h-4 text-emerald-700" />
          <span>Educație Emoțională (4-7 ani)</span>
        </div>
        <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold text-stone-900">
          Jurnalul Supărării & Cum Ne Calmăm Frumos
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          A fi supărat este o emoție normală! Învățăm de la vulcanul Grumpy cum să recunoaștem supărarea înainte de a exploda.
        </p>
      </div>

      {/* SECTION 1: Termometrul Supărării lui Grumpy */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
              Termometrul Emoțiilor lui Grumpy
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Apasă pe fiecare treaptă pentru a vedea cum a crescut supărarea vulcanului:
            </p>
          </div>
        </div>

        {/* 4 Levels Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EMOTION_STAGES.map((stage) => {
            const isSelected = selectedLevel === stage.level;
            return (
              <button
                key={stage.level}
                onClick={() => {
                  soundFx.playPop();
                  setSelectedLevel(stage.level);
                }}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col justify-between gap-2 ${
                  isSelected
                    ? `${stage.bg} ${stage.border} shadow-md scale-102`
                    : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stage.emoji}</span>
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${stage.bg} ${stage.color}`}>
                    Treapta {stage.level}
                  </span>
                </div>
                <div>
                  <h4 className={`font-bold text-xs sm:text-sm ${stage.color}`}>
                    {stage.label}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        {(() => {
          const current = EMOTION_STAGES.find(s => s.level === selectedLevel) || EMOTION_STAGES[0];
          return (
            <div className={`p-5 sm:p-6 rounded-3xl border-2 ${current.bg} ${current.border} space-y-4`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{current.emoji}</span>
                <div>
                  <h3 className={`font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold ${current.color}`}>
                    Treapta {current.level}: {current.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium">
                    {current.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/80 p-4 rounded-2xl border border-white/60">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    🔍 Ce simte corpul nostru:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800">
                    {current.bodyFeeling}
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-2xl border border-white/60">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    💡 Ce putem face frumos:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-stone-800">
                    {current.tip}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Check-in: How do I feel today? */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <h4 className="font-bold text-sm text-amber-950 mb-2">
            🧒 Cum se simte vulcanul tău chiar acum?
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { lvl: 1, label: 'Calm & vesel', icon: '🌸' },
              { lvl: 2, label: 'Un pic deranjat', icon: '☁️' },
              { lvl: 3, label: 'Ceainic fierbinte', icon: '♨️' },
              { lvl: 4, label: 'Furios rău', icon: '🌋' }
            ].map(item => (
              <button
                key={item.lvl}
                onClick={() => {
                  soundFx.playPop();
                  setMyEmotion(item.lvl);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  myEmotion === item.lvl
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border-amber-300'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {myEmotion === item.lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          {myEmotion && (
            <div className="mt-2.5 text-xs text-amber-900 font-medium bg-white/70 p-2.5 rounded-xl">
              {myEmotion === 1 && 'E minunat că te simți calm! Grumpy îți trimite o floare roz parfumată! 🌺'}
              {myEmotion === 2 && 'E în regulă să fii un pic deranjat. Respiră adânc și spune ce te supără.'}
              {myEmotion === 3 && 'Simți cum fierbe apa în ceainic? Hai să facem exercițiul Respirației Vulcanului mai jos ca să răcim lava!'}
              {myEmotion === 4 && 'Dă-i mânuța unui adult drag. Este în regulă să simți furie, hai să o eliberăm în siguranță!'}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Exercițiul „Respirația Vulcanului” */}
      <div className="bg-gradient-to-br from-teal-50 via-sky-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-md space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase">
            <Wind className="w-3.5 h-3.5" />
            <span>Exercițiu de Liniștire</span>
          </div>
          <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-3xl font-bold text-teal-950">
            Exercițiul: „Respirația Vulcanului”
          </h2>
          <p className="text-xs sm:text-sm text-teal-800">
            Când simțim lava fierbinte, respirăm adânc pentru a o răci și a aduce somnul liniștit înapoi:
          </p>
        </div>

        {/* Visual Breathing Circle animation */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {/* Pulsing Backglow */}
          <motion.div
            animate={
              isBreathingActive
                ? breathPhase === 'inspire'
                  ? { scale: [1, 1.45], opacity: [0.3, 0.8] }
                  : breathPhase === 'hold'
                  ? { scale: 1.45, opacity: 0.8 }
                  : { scale: [1.45, 1], opacity: [0.8, 0.3] }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{
              duration: breathPhase === 'hold' ? 2 : 4,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-300 via-sky-300 to-amber-300 blur-md pointer-events-none"
          />

          {/* Central Mountain Breathing Bubble */}
          <motion.div
            animate={
              isBreathingActive
                ? breathPhase === 'inspire'
                  ? { scale: [1, 1.35] }
                  : breathPhase === 'hold'
                  ? { scale: 1.35 }
                  : { scale: [1.35, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: breathPhase === 'hold' ? 2 : 4,
              ease: 'easeInOut'
            }}
            className="w-48 h-48 rounded-full bg-white border-4 border-teal-400 shadow-xl flex flex-col items-center justify-center p-4 text-center select-none z-10"
          >
            <div className="text-3xl mb-1">
              {breathPhase === 'inspire' ? '🏔️' : breathPhase === 'hold' ? '❄️' : '💨'}
            </div>
            <div className="font-['Fredoka',sans-serif] text-base sm:text-lg font-bold text-teal-900">
              {!isBreathingActive
                ? 'Gata de respirație?'
                : breathPhase === 'inspire'
                ? 'INSPIRĂ LUNG...'
                : breathPhase === 'hold'
                ? 'ȚINE AERUL...'
                : 'EXPIRĂ: PFFFFF...'}
            </div>
            <div className="text-[11px] text-teal-700 font-semibold mt-0.5">
              {!isBreathingActive
                ? 'Apasă butonul de mai jos'
                : breathPhase === 'inspire'
                ? 'Muntele se înalță (pe nas)'
                : breathPhase === 'hold'
                ? 'Simte căldura'
                : 'Răcim lava încet (pe gură)'}
            </div>
          </motion.div>
        </div>

        {/* Breathing Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {!isBreathingActive ? (
              <button
                onClick={startBreathing}
                id="start-breathing-btn"
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Wind className="w-4 h-4" />
                <span>Începe Respirația Vulcanului</span>
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="px-6 py-3 rounded-2xl bg-stone-700 hover:bg-stone-800 text-white font-bold text-sm shadow-md flex items-center gap-2"
              >
                <span>Oprește exercițiul</span>
              </button>
            )}
          </div>

          {/* Reward Stars */}
          <div className="flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full border border-teal-200">
            <span className="text-xs font-bold text-teal-900">
              Respirații de calm completate: {breathCounter}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(5, breathingStars) }).map((_, i) => (
                <span key={i} className="text-sm">⭐</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Trusa cu 4 Trucuri de Calmare */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-stone-900">
            Trusa Magică: 4 Trucuri când te simți ca Grumpy
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Trucuri prietenoase pe care le poți folosi oricând simți că se adună supărarea:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col justify-between gap-2">
            <div className="text-3xl">🗣️</div>
            <h4 className="font-bold text-sm text-orange-950">1. Vorbește cu gura ta</h4>
            <p className="text-xs text-orange-800 font-medium">
              Spune cu voce hotărâtă: „Sunt supărat pentru că mi-ai dărâmat turnul!” Nu ține secretul în burtică.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col justify-between gap-2">
            <div className="text-3xl">📄</div>
            <h4 className="font-bold text-sm text-red-950">2. Mototolește hârtia</h4>
            <p className="text-xs text-red-800 font-medium">
              Ia o foaie de ziar vechi sau hârtie și desenează lava cu toată forța, apoi mototolește-o într-o minge strânsă!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col justify-between gap-2">
            <div className="text-3xl">💧</div>
            <h4 className="font-bold text-sm text-sky-950">3. Paharul cu apă rece</h4>
            <p className="text-xs text-sky-800 font-medium">
              Bea câteva înghițituri mici de apă proaspătă. Apa rece stinge căldura din obraji și din piept.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 flex flex-col justify-between gap-2">
            <div className="text-3xl">🐻</div>
            <h4 className="font-bold text-sm text-pink-950">4. Îmbrățișarea de urs</h4>
            <p className="text-xs text-pink-800 font-medium">
              Cere o îmbrățișare strânsă mamei sau tatălui. O îmbrățișare de 20 de secunde eliberează magia calmului!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
