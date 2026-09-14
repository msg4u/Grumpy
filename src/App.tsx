import React, { useState } from 'react';
import { AppTab } from './types';
import { Navbar } from './components/Navbar';
import { StoryTab } from './components/StoryTab';
import { ExperimentTab } from './components/ExperimentTab';
import { LabSimulatorTab } from './components/LabSimulatorTab';
import { EmotionsTab } from './components/EmotionsTab';
import { DrawingTab } from './components/DrawingTab';
import { ParentGuideTab } from './components/ParentGuideTab';
import { MiniGameTab } from './components/MiniGameTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('story');
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C2420] flex flex-col font-['Quicksand',sans-serif]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
      />

      {/* Main Tab Content */}
      <main className="flex-1 py-4 pb-12">
        {activeTab === 'story' && <StoryTab onNavigateTab={setActiveTab} />}
        {activeTab === 'experiment' && <ExperimentTab onNavigateTab={setActiveTab} />}
        {activeTab === 'simulator' && <LabSimulatorTab />}
        {activeTab === 'emotions' && <EmotionsTab />}
        {activeTab === 'creative' && <DrawingTab />}
        {activeTab === 'minigame' && <MiniGameTab />}
        {activeTab === 'parent-guide' && <ParentGuideTab />}
      </main>

      {/* Child-Friendly Playful Footer */}
      <footer className="border-t border-amber-200/80 bg-white/70 py-6 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-['Fredoka',sans-serif] text-sm font-bold text-stone-800">
            <span>🌋</span>
            <span>Grumpy — Vulcanul care nu știa să se supere frumos</span>
            <span>🌸</span>
          </div>
          <p className="text-[11px] text-stone-500 max-w-md mx-auto">
            Aplicație educațională STEM & inteligență emoțională pentru copii de 4-7 ani, părinți și educatori.
          </p>
        </div>
      </footer>
    </div>
  );
}
