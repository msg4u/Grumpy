import React, { useState } from 'react';
import { GUIDED_QUESTIONS, SCIENCE_EXPLANATION } from '../data/storyData';
import { soundFx } from '../utils/audio';
import { 
  Users, 
  MessageCircleQuestion, 
  Lightbulb, 
  ShieldAlert, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  FlaskConical,
  Heart
} from 'lucide-react';

export const ParentGuideTab: React.FC = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

  const toggleQuestion = (idx: number) => {
    soundFx.playPop();
    setOpenQuestionIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-8">
      {/* Hero Header */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Pentru Părinți & Educatori</span>
          </div>
          <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Ghidul Adultului: Știință & Reglare Emoțională
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-medium leading-relaxed">
            Cum să transformi povestea lui Grumpy și experimentul cu vulcanul într-un moment de conectare profundă, învățare științifică și inteligență emoțională pentru copilul tău de 4-7 ani.
          </p>
        </div>
      </div>

      {/* SECTION 1: Întrebări de ghidat activitatea */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4">
        <div className="border-b border-stone-100 pb-3 flex items-center gap-2.5">
          <MessageCircleQuestion className="w-6 h-6 text-orange-600 shrink-0" />
          <div>
            <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
              Cum ghidezi activitatea: Întrebări deschise
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Pune aceste întrebări în timpul sau imediat după erupție pentru a stimula gândirea critică:
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {GUIDED_QUESTIONS.map((item, idx) => {
            const isOpen = openQuestionIndex === idx;
            return (
              <div
                key={idx}
                className="border-2 border-stone-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full text-left p-4 bg-stone-50 hover:bg-stone-100/80 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-stone-900 text-sm sm:text-base">
                      {item.q}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 bg-white border-t border-stone-200 space-y-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                        <strong>Ce urmărim: </strong>{item.hint}
                      </p>
                    </div>
                    <div className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg inline-block">
                      Concept cheie: {item.concept}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Legătura poveste-concept (Știință explicată pe scurt) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4">
        <div className="border-b border-stone-100 pb-3 flex items-center gap-2.5">
          <FlaskConical className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-stone-900">
              {SCIENCE_EXPLANATION.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Explicată pentru tine, ca adult ghid:
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <span>⚗️</span> Reacția Chimică (Acid + Bază)
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
              {SCIENCE_EXPLANATION.chemistry}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
            <h4 className="font-bold text-sky-950 text-sm flex items-center gap-2">
              <span>💨</span> Presiunea și Forța de Împingere
            </h4>
            <p className="text-xs sm:text-sm text-sky-800 leading-relaxed font-medium">
              {SCIENCE_EXPLANATION.pressure}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <span>❤️</span> Puntea Emoțională (Presiunea Interioară)
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {SCIENCE_EXPLANATION.emotionalLink}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Sfaturi de Siguranță & Curățenie */}
      <div className="bg-amber-50/80 rounded-3xl p-6 border-2 border-amber-300 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <span>Sfaturi Practice de Siguranță și Organizare:</span>
        </div>

        <ul className="grid gap-2 text-xs sm:text-sm text-stone-700 font-medium">
          <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl">
            <span className="text-amber-600 font-bold">•</span>
            <span><strong>Afară sau pe tavă adâncă:</strong> Oțetul cu bicarbonat produce multă spumă efervescentă. O tavă de friptură sau blatul curat din bucătărie protejează mobilierul.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl">
            <span className="text-amber-600 font-bold">•</span>
            <span><strong>Stabilitatea sticlei:</strong> Fixați bine sticla de 500ml pe tavă cu bandă adezivă înainte de a modela cartonul/ziarele, pentru a nu se răsturna în momentul turnării oțetului.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/80 p-3 rounded-xl">
            <span className="text-amber-600 font-bold">•</span>
            <span><strong>Protejarea ochilor:</strong> Deși oțetul și bicarbonatul sunt sigure și non-toxice, pot ustura dacă ajung la ochi. Spălați mâinile copilului după experiment.</span>
          </li>
        </ul>
      </div>

      {/* SECTION 4: Recomandare Pedagogică */}
      <div className="p-5 rounded-3xl bg-stone-100 border border-stone-300 flex items-start gap-3">
        <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="font-bold text-stone-900 text-sm">
            Mesajul cel mai important pentru copil:
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            „Furia nu este un lucru rău. Toți ne supărăm uneori, chiar și adulții și vulcanii vechi de sute de ani. Important este să nu lăsăm supărarea să distrugă florile celor din jur și să învățăm cum să eliberăm presiunea cu vorbe bune și respirație.”
          </p>
        </div>
      </div>
    </div>
  );
};
