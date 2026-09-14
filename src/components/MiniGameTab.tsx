import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { 
  Gamepad2, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Heart, 
  Wind,
  ShieldCheck
} from 'lucide-react';

interface FloatingCloud {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  speed: number;
  isTamed: boolean;
  type: 'sneaky' | 'rainy' | 'windy';
}

export const MiniGameTab: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [clouds, setClouds] = useState<FloatingCloud[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [flowerHealth, setFlowerHealth] = useState<number>(3); // 3 hearts

  // Target to win
  const TARGET_SCORE = 8;

  const startGame = () => {
    soundFx.playCelebration();
    setScore(0);
    setFlowerHealth(3);
    setIsGameOver(false);
    setIsPlaying(true);
    setClouds([
      { id: 1, x: 15, y: 10, speed: 0.8, isTamed: false, type: 'sneaky' },
      { id: 2, x: 75, y: 15, speed: 0.9, isTamed: false, type: 'rainy' },
    ]);
  };

  // Game tick loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setClouds(prev => {
        // Move clouds downwards towards mountain peak (y: 65%)
        const updated = prev.map(c => {
          if (c.isTamed) {
            // Tamed cloud floats away upwards
            return { ...c, y: c.y - 2.5, x: c.x + (c.id % 2 === 0 ? 1 : -1) };
          }
          return { ...c, y: c.y + c.speed };
        });

        // Filter out tamed clouds that left the screen
        const remaining = updated.filter(c => c.y > -20 && c.y < 95);

        // Check if untamed cloud reached the mountain flower (y >= 65)
        remaining.forEach(c => {
          if (!c.isTamed && c.y >= 65 && Math.abs(c.x - 50) < 25) {
            c.isTamed = true;
            soundFx.playBubble();
            setFlowerHealth(h => {
              const next = Math.max(0, h - 1);
              if (next === 0) {
                setIsGameOver(true);
                setIsPlaying(false);
              }
              return next;
            });
          }
        });

        // Spawn new clouds if needed
        if (remaining.filter(c => !c.isTamed).length < 3 && Math.random() > 0.4) {
          const newId = Date.now() + Math.random();
          const randomX = Math.random() * 70 + 15;
          const types: ('sneaky' | 'rainy' | 'windy')[] = ['sneaky', 'rainy', 'windy'];
          remaining.push({
            id: newId,
            x: randomX,
            y: 5,
            speed: Math.random() * 0.7 + 0.6,
            isTamed: false,
            type: types[Math.floor(Math.random() * types.length)]
          });
        }

        return remaining;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  const handleTapCloud = (cloudId: number) => {
    soundFx.playCloudGiggle();
    setClouds(prev =>
      prev.map(c => {
        if (c.id === cloudId && !c.isTamed) {
          return { ...c, isTamed: true };
        }
        return c;
      })
    );

    setScore(s => {
      const next = s + 1;
      if (next >= TARGET_SCORE) {
        soundFx.playCelebration();
        setIsGameOver(true);
        setIsPlaying(false);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold uppercase tracking-wide">
          <Gamepad2 className="w-4 h-4 text-sky-600" />
          <span>Mini-Joc Didactic (4-7 ani)</span>
        </div>
        <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold text-stone-900">
          Protejează Floarea lui Grumpy!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Atinge norii obraznici înainte să ajungă la floare ca să îi transformi în norișori prietenoși cu curcubeu!
        </p>
      </div>

      {/* Game Stage Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-amber-200 shadow-lg space-y-4">
        {/* Score & Heart Bar */}
        <div className="flex items-center justify-between bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Nori cumințiți:
            </span>
            <span className="font-['Fredoka',sans-serif] text-xl font-bold text-orange-600">
              {score} / {TARGET_SCORE} ⭐
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-stone-500 mr-1 hidden sm:inline">
              Protecție floare:
            </span>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 transition-all ${
                  i < flowerHealth
                    ? 'text-rose-500 fill-rose-500 scale-105'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Game Canvas Area */}
        <div className="relative w-full aspect-16/10 rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 border-4 border-sky-300/80 overflow-hidden select-none">
          {/* Background Sun */}
          <div className="absolute top-4 left-6 w-12 h-12 rounded-full bg-amber-300 shadow-md animate-pulse" />

          {/* Grumpy at the bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
            {/* Flower on peak */}
            <div className="text-3xl filter drop-shadow-md -mb-2">
              {flowerHealth > 0 ? '🌸' : '🥀'}
            </div>
            {/* Volcano Mountain */}
            <div className="w-56 h-28 rounded-t-[100px] bg-gradient-to-b from-stone-800 to-stone-900 border-4 border-stone-900 flex flex-col items-center justify-center p-2 shadow-xl">
              <div className="text-white text-xs font-bold font-mono">
                {flowerHealth > 0 ? '◠ ‿ ◠' : '¬ ︵ ¬'}
              </div>
              <span className="text-[10px] text-amber-200 font-bold mt-1">
                Grumpy
              </span>
            </div>
          </div>

          {/* Floating Clouds */}
          {isPlaying && (
            <AnimatePresence>
              {clouds.map(cloud => (
                <motion.div
                  key={cloud.id}
                  onClick={() => handleTapCloud(cloud.id)}
                  style={{
                    left: `${cloud.x}%`,
                    top: `${cloud.y}%`
                  }}
                  className="absolute -translate-x-1/2 cursor-pointer z-20 group"
                >
                  <div
                    className={`px-3 py-2 rounded-2xl border-2 shadow-md transition-transform group-hover:scale-115 active:scale-95 flex items-center gap-1.5 ${
                      cloud.isTamed
                        ? 'bg-white/95 border-emerald-300 text-emerald-800'
                        : 'bg-stone-700/95 border-stone-800 text-white animate-bounce'
                    }`}
                  >
                    <span className="text-xl">
                      {cloud.isTamed ? '🌈' : cloud.type === 'rainy' ? '🌧️' : '☁️'}
                    </span>
                    <span className="text-xs font-extrabold">
                      {cloud.isTamed ? 'Cuminte!' : 'Obraznic!'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Start Screen Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center z-30">
              <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm space-y-4">
                <div className="text-4xl">🎮</div>
                <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-stone-900">
                  Gata de joacă?
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Cumințește <strong>{TARGET_SCORE} nori obraznici</strong> dând click pe ei înainte să ajungă la floarea lui Grumpy!
                </p>
                <button
                  onClick={startGame}
                  id="start-minigame-btn"
                  className="w-full py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md"
                >
                  Start Joc!
                </button>
              </div>
            </div>
          )}

          {/* Game Over / Victory Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-30">
              <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm space-y-4">
                <div className="text-5xl">
                  {score >= TARGET_SCORE ? '🏆' : '🌱'}
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-stone-900">
                  {score >= TARGET_SCORE
                    ? 'Felicitări, Eroule!'
                    : 'Floarea a obosit un pic!'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  {score >= TARGET_SCORE
                    ? 'Ai protejat floarea lui Grumpy și ai îmblânzit toți norii obraznici! Grumpy doarme din nou fericit!'
                    : 'Norii au dărâmat floarea, dar Grumpy a erupt și s-a liniștit. Hai să încercăm din nou!'}
                </p>
                <button
                  onClick={startGame}
                  className="w-full py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Joacă din nou</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
