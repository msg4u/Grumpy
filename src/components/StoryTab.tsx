import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { STORY_SCENES } from '../data/storyData';
import { GrumpyVolcanoVisual } from './GrumpyVolcanoVisual';
import { soundFx, speakRomanian, stopSpeaking } from '../utils/audio';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Square, 
  Flame, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  Info
} from 'lucide-react';
import { AppTab } from '../types';

interface StoryTabProps {
  onNavigateTab: (tab: AppTab) => void;
}

export const StoryTab: React.FC<StoryTabProps> = ({ onNavigateTab }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEruptingAnimation, setIsEruptingAnimation] = useState(false);
  const [childInteractionsCount, setChildInteractionsCount] = useState(0);

  const scene = STORY_SCENES[currentSceneIndex];

  // Stop speech when changing scenes
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
    return () => {
      stopSpeaking();
    };
  }, [currentSceneIndex]);

  const handleNext = () => {
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      soundFx.playPop();
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      soundFx.playPop();
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const handleNarrate = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const speechText = `${scene.title}. ${scene.text} ${scene.dialogue || ''}`;
      setIsSpeaking(true);
      speakRomanian(
        speechText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Trigger Big Eruption
  const triggerEruption = () => {
    soundFx.playEruption();
    setIsEruptingAnimation(true);

    // Blast colorful confetti particles resembling volcano lava and foam
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#F97316', '#FBBF24', '#FFFFFF']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.3, y: 0.6 },
          colors: ['#FFA500', '#FF4500', '#FFFFFF']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.7, y: 0.6 },
          colors: ['#FFA500', '#FF4500', '#FFFFFF']
        });
      }, 350);
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsEruptingAnimation(false);
      soundFx.playCelebration();
      setCurrentSceneIndex(4); // Advance to scene 5 (Relief)
    }, 2400);
  };

  const handleTapGrumpy = () => {
    setChildInteractionsCount(c => c + 1);
    if (scene.angerLevel >= 60) {
      soundFx.playKettleWhistle();
    } else {
      soundFx.playPop();
    }
  };

  const handleTapCloud = () => {
    setChildInteractionsCount(c => c + 1);
    soundFx.playCloudGiggle();
  };

  const handleTapFlower = () => {
    setChildInteractionsCount(c => c + 1);
    soundFx.playZenChime();
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Stage Stepper Banner */}
      <div className="bg-white rounded-2xl p-3 border border-amber-200/80 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        {STORY_SCENES.map((s, idx) => {
          const isCurrent = idx === currentSceneIndex;
          const isPassed = idx < currentSceneIndex;
          return (
            <button
              key={s.id}
              onClick={() => {
                soundFx.playPop();
                setCurrentSceneIndex(idx);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs sm:text-sm font-bold border ${
                isCurrent
                  ? 'bg-orange-500 text-white border-orange-600 shadow-xs scale-105'
                  : isPassed
                  ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-black/10 text-xs">
                {idx + 1}
              </span>
              <span className="hidden md:inline">{s.stageName.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Volcano Canvas */}
      <GrumpyVolcanoVisual
        grumpyFace={scene.grumpyFace}
        flowerState={scene.flowerState}
        hatOn={scene.hatOn}
        cloudState={scene.cloudState}
        angerLevel={scene.angerLevel}
        onTapGrumpy={handleTapGrumpy}
        onTapFlower={handleTapFlower}
        onTapCloud={handleTapCloud}
        isErupting={isEruptingAnimation || currentSceneIndex === 4}
      />

      {/* Story Narration Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md space-y-4">
        {/* Header with Title & Audio Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Scena {scene.id} din 5
            </span>
            <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
              {scene.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNarrate}
              id="story-narration-button"
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition-all shadow-xs ${
                isSpeaking
                  ? 'bg-red-500 text-white border-red-600 animate-pulse'
                  : 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Oprește Vocea</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Ascultă Povestea</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story Text */}
        <p className="text-base sm:text-lg leading-relaxed text-stone-700 font-medium">
          {scene.text}
        </p>

        {/* Dialogue Quote Box */}
        {scene.dialogue && (
          <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-bold text-base sm:text-lg italic shadow-2xs">
            💬 {scene.dialogue}
          </div>
        )}

        {/* Child Interactive Action Cue */}
        <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 animate-spin" />
            <span className="text-xs sm:text-sm font-bold">
              {scene.childActionPrompt}
            </span>
          </div>
          {childInteractionsCount > 0 && (
            <span className="text-xs font-extrabold bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full shrink-0">
              ⭐ Atingeri: {childInteractionsCount}
            </span>
          )}
        </div>

        {/* Eruption Culmination Trigger on Scene 4 */}
        {currentSceneIndex === 3 && (
          <div className="pt-2">
            <button
              onClick={triggerEruption}
              id="trigger-story-eruption-btn"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-amber-300 animate-pulse"
            >
              <Flame className="w-6 h-6 animate-bounce" />
              <span>🌋 AJUTĂ-L PE GRUMPY SĂ ERUPĂ!</span>
              <Flame className="w-6 h-6 animate-bounce" />
            </button>
            <p className="text-center text-xs text-stone-500 mt-2">
              Apasă pentru a declanșa erupția cu spumă și bule exact în momentul culminant!
            </p>
          </div>
        )}

        {/* Scene Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <button
            onClick={handlePrev}
            disabled={currentSceneIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-sm border transition-all ${
              currentSceneIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Înapoi</span>
          </button>

          {currentSceneIndex === STORY_SCENES.length - 1 ? (
            <button
              onClick={() => {
                soundFx.playPop();
                setCurrentSceneIndex(0);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Citește din nou</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white border border-orange-600 shadow-md"
            >
              <span>Următoarea scenă</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Next Activity Banner */}
      <div className="bg-gradient-to-r from-orange-100 via-amber-100 to-red-100 rounded-3xl p-5 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-['Fredoka',sans-serif] text-lg font-bold text-stone-900">
              Vrei să faci experimentul chiar la tine acasă?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Cu o sticlă mică, bicarbonat, oțet și o picătură de detergent construim vulcanul Grumpy!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playPop();
            onNavigateTab('experiment');
          }}
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md"
        >
          <span>Vezi Pașii de Construcție</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
