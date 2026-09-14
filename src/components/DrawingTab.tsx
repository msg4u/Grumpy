import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { 
  Palette, 
  Download, 
  RotateCcw, 
  Award, 
  Printer, 
  Sparkles,
  Smile,
  Flame,
  Check
} from 'lucide-react';

const PALETTE = [
  '#2C2420', // black/brown
  '#EF4444', // lava red
  '#F97316', // orange
  '#FBBF24', // golden yellow
  '#22C55E', // grass green
  '#0EA5E9', // sky blue
  '#A855F7', // purple
  '#EC4899', // pink
  '#FFFFFF', // snow white
  '#78350F'  // mountain brown
];

const STICKERS = [
  { emoji: '🌸', name: 'Floare roz' },
  { emoji: '❄️', name: 'Zăpadă' },
  { emoji: '☁️', name: 'Nor obraznic' },
  { emoji: '💧', name: 'Ploaie rece' },
  { emoji: '🌋', name: 'Vulcan' },
  { emoji: '🔥', name: 'Flacără' },
  { emoji: '⭐', name: 'Steluță' },
  { emoji: '🌈', name: 'Curcubeu' }
];

export const DrawingTab: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<'calm' | 'boiling' | 'erupting'>('calm');
  const [brushColor, setBrushColor] = useState<string>('#EF4444');
  const [brushSize, setBrushSize] = useState<number>(8);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  // Certificate state
  const [childName, setChildName] = useState<string>('Alex');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Load template base outline when switching templates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and fill with soft canvas paper background
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw base volcano contour according to template
    drawTemplateBackground(ctx, selectedTemplate, canvas.width, canvas.height);
  }, [selectedTemplate]);

  const drawTemplateBackground = (
    ctx: CanvasRenderingContext2D, 
    template: 'calm' | 'boiling' | 'erupting',
    w: number,
    h: number
  ) => {
    ctx.save();
    // Sky tint
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, template === 'erupting' ? '#FEF3C7' : template === 'boiling' ? '#FFEDD5' : '#E0F2FE');
    skyGrad.addColorStop(1, '#FFFDF9');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Mountain outline guide
    ctx.strokeStyle = '#D6D3D1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Crater rim
    ctx.beginPath();
    ctx.ellipse(w / 2, 90, 45, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Mountain slopes
    ctx.beginPath();
    ctx.moveTo(w / 2 - 45, 90);
    ctx.bezierCurveTo(w / 2 - 35, 160, w / 2 - 90, 240, 50, h - 30);
    ctx.lineTo(w - 50, h - 30);
    ctx.bezierCurveTo(w / 2 + 90, 240, w / 2 + 35, 160, w / 2 + 45, 90);
    ctx.stroke();

    // Template Guide text
    ctx.fillStyle = '#78716C';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    if (template === 'calm') {
      ctx.fillText('1. Desenează-i lui Grumpy fața liniștită și floarea pe creștet!', w / 2, 40);
    } else if (template === 'boiling') {
      ctx.fillText('2. Desenează fața încruntată și aburii de ceainic fierbinte!', w / 2, 40);
    } else {
      ctx.fillText('3. Desenează marea erupție cu lavă, spumă și norii care fug!', w / 2, 40);
    }

    ctx.restore();
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedSticker) {
      // Stamp sticker
      soundFx.playPop();
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, coords.x, coords.y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedSticker) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.strokeStyle = '#FFFDF9';
    } else {
      ctx.strokeStyle = brushColor;
    }

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    soundFx.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTemplateBackground(ctx, selectedTemplate, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    soundFx.playCelebration();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `desen-grumpy-${selectedTemplate}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold uppercase tracking-wide">
          <Palette className="w-4 h-4 text-purple-700" />
          <span>Atelier Creativ & Expresiv</span>
        </div>
        <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold text-stone-900">
          Cele 3 Fețe ale lui Grumpy
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Desenează cum s-a simțit vulcanul în fiecare moment al poveștii sau personalizează o diplomă de cercetător!
        </p>
      </div>

      {/* Tabs for Template Selection */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'calm', label: '1. Grumpy Liniștit (cu floare)', emoji: '🌸' },
          { id: 'boiling', label: '2. Ca un Ceainic Fierbinte', emoji: '♨️' },
          { id: 'erupting', label: '3. Marea Erupție Eliberatoare', emoji: '🌋' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => {
              soundFx.playPop();
              setSelectedTemplate(t.id as 'calm' | 'boiling' | 'erupting');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
              selectedTemplate === t.id
                ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102'
                : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-300'
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}

        <button
          onClick={() => {
            soundFx.playCelebration();
            setShowCertificate(prev => !prev);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white border border-amber-600 shadow-md"
        >
          <Award className="w-4 h-4" />
          <span>{showCertificate ? 'Înapoi la Desen' : 'Diploma de Merit'}</span>
        </button>
      </div>

      {showCertificate ? (
        /* Certificate View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-400 shadow-xl max-w-3xl mx-auto space-y-6 text-center relative overflow-hidden" id="diploma-container">
          <div className="space-y-2">
            <div className="text-5xl">🏆</div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Certificat Oficial de Explorator
            </span>
            <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-4xl font-bold text-amber-950">
              DIPLOMĂ DE MERIT
            </h2>
            <p className="text-sm font-semibold text-stone-600">
              Se acordă micului cercetător curajos:
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Scrie numele copilului..."
              className="w-full text-center font-['Fredoka',sans-serif] text-2xl font-bold text-orange-600 border-b-2 border-orange-400 pb-1 focus:outline-hidden"
            />
          </div>

          <p className="text-sm sm:text-base text-stone-700 max-w-lg mx-auto font-medium leading-relaxed">
            Pentru că a ajutat vulcanul <strong>Grumpy</strong> să își elibereze supărarea prin știință, a înțeles cum funcționează dioxidul de carbon și a învățat secretul calmului prin <strong>Respirația Vulcanului</strong>!
          </p>

          <div className="flex items-center justify-around pt-6 border-t border-amber-200 text-xs font-bold text-stone-600">
            <div className="flex flex-col items-center">
              <span className="text-2xl">🌸</span>
              <span>Prietenul lui Grumpy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🌋</span>
              <span>Laboratorul de Știință</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">⭐</span>
              <span>Îmblânzitor de Emoții</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Tipărește Diploma</span>
            </button>
          </div>
        </div>
      ) : (
        /* Drawing Studio Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Canvas Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-md flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={600}
              height={420}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full max-w-[600px] aspect-[600/420] rounded-2xl border border-stone-200 shadow-inner cursor-crosshair touch-none"
            />

            {/* Bottom Actions */}
            <div className="w-full flex items-center justify-between gap-3 mt-3 pt-3 border-t border-stone-100">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Șterge tot</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Salvează Desenul</span>
              </button>
            </div>
          </div>

          {/* Right: Tools & Stickers */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md space-y-5">
            {/* Color Palette */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wider">
                  🎨 Paleta de Culori
                </h4>
                {isEraser && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    Radieră activă
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      soundFx.playPop();
                      setBrushColor(c);
                      setIsEraser(false);
                      setSelectedSticker(null);
                    }}
                    className={`w-9 h-9 rounded-xl border-2 transition-transform shadow-2xs ${
                      brushColor === c && !isEraser && !selectedSticker
                        ? 'scale-115 border-stone-900 shadow-md'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size & Eraser */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Grosime pensulă:</span>
                <span className="text-xs font-mono font-bold">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="3"
                max="28"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />

              <button
                onClick={() => {
                  soundFx.playPop();
                  setIsEraser(prev => !prev);
                  setSelectedSticker(null);
                }}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  isEraser
                    ? 'bg-red-500 text-white border-red-600'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                }`}
              >
                {isEraser ? '✓ Mod Radieră Activ' : '🧹 Folosește Radiera'}
              </button>
            </div>

            {/* Fun Stickers */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wider">
                  ✨ Abțibilduri Magice
                </h4>
                {selectedSticker && (
                  <button
                    onClick={() => setSelectedSticker(null)}
                    className="text-[10px] text-purple-700 font-bold underline"
                  >
                    Anulează
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {STICKERS.map((stk) => (
                  <button
                    key={stk.emoji}
                    onClick={() => {
                      soundFx.playPop();
                      setSelectedSticker(selectedSticker === stk.emoji ? null : stk.emoji);
                      setIsEraser(false);
                    }}
                    className={`p-2 rounded-xl text-2xl border transition-all ${
                      selectedSticker === stk.emoji
                        ? 'bg-purple-100 border-purple-500 scale-110 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                    title={stk.name}
                  >
                    {stk.emoji}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-500">
                Alege un abțibild și atinge canvasul unde vrei să îl așezi!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
