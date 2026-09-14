import React from 'react';
import { AppTab } from '../types';
import { 
  BookOpen, 
  Flame, 
  FlaskConical, 
  HeartHandshake, 
  Palette, 
  Users, 
  Gamepad2, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  soundMuted: boolean;
  setSoundMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundMuted,
  setSoundMuted,
}) => {
  const tabs: { id: AppTab; label: string; subLabel: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'story',
      label: 'Povestea',
      subLabel: 'Citește & Ascultă',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'experiment',
      label: 'Experiment DIY',
      subLabel: 'Activitate acasă',
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      color: 'bg-orange-100 text-orange-900 border-orange-300'
    },
    {
      id: 'simulator',
      label: 'Simulator Lavă',
      subLabel: 'Laborator virtual',
      icon: <FlaskConical className="w-5 h-5 text-red-600" />,
      color: 'bg-red-100 text-red-900 border-red-300'
    },
    {
      id: 'emotions',
      label: 'Emoții & Calmare',
      subLabel: 'Cum ne supărăm frumos',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 'creative',
      label: 'Atelier Desen',
      subLabel: 'Colorează & Diplomă',
      icon: <Palette className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      id: 'minigame',
      label: 'Jocul Norilor',
      subLabel: 'Pentru 4-7 ani',
      icon: <Gamepad2 className="w-5 h-5 text-sky-600" />,
      color: 'bg-sky-100 text-sky-900 border-sky-300'
    },
    {
      id: 'parent-guide',
      label: 'Ghid Părinți',
      subLabel: 'Știință & Concepte',
      icon: <Users className="w-5 h-5 text-stone-700" />,
      color: 'bg-stone-100 text-stone-900 border-stone-300'
    }
  ];

  const handleTabClick = (tabId: AppTab) => {
    soundFx.playPop();
    setActiveTab(tabId);
  };

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    soundFx.soundEnabled = !next;
    if (!next) soundFx.playPop();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand & Mascot */}
          <div 
            onClick={() => handleTabClick('story')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            id="app-branding-header"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="volcan">🌋</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold tracking-tight text-[#3A2218]">
                  Grumpy
                </span>
                <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-bold border border-orange-200">
                  4-7 ani
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium line-clamp-1">
                Vulcanul care nu știa să se supere frumos
              </p>
            </div>
          </div>

          {/* Quick Sound Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              id="sound-toggle-button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                soundMuted 
                  ? 'bg-stone-100 text-stone-500 border-stone-300' 
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
              title={soundMuted ? 'Activează sunetele' : 'Dezactivează sunetele'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
              <span className="hidden sm:inline">{soundMuted ? 'Sunet Oprit' : 'Sunet Pornit'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-2.5 pb-1 no-scrollbar text-sm font-medium" id="main-tab-navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap text-left border ${
                  isActive
                    ? `${tab.color} shadow-sm font-bold scale-[1.02]`
                    : 'bg-white/80 text-stone-600 hover:bg-stone-100/90 border-stone-200/80 hover:text-stone-900'
                }`}
              >
                <span className="shrink-0">{tab.icon}</span>
                <div className="flex flex-col">
                  <span className="leading-tight text-xs sm:text-sm font-semibold">{tab.label}</span>
                  <span className="text-[10px] opacity-75 font-normal hidden md:inline leading-none">
                    {tab.subLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
