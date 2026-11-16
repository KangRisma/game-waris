import React from 'react';
import { PORSI_OPTIONS } from '../utils/faraidh-rules';
import { Sparkles, Move, Check } from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function PortionPalette({ selectedPortion, onSelectPortion }) {
  const handleDragStart = (e, portionId) => {
    e.dataTransfer.setData('text/plain', portionId);
    e.dataTransfer.effectAllowed = 'copy';
    playTapSound();
  };

  const handleClick = (portionId) => {
    playTapSound();
    if (selectedPortion === portionId) {
      onSelectPortion(null); // toggle off
    } else {
      onSelectPortion(portionId);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-6 px-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              <Move size={14} />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-wide">
                Balok Porsi Faraidh & 3 Jenis Ashabah (Seret / Klik ke Ahli Waris)
              </h3>
              <p className="text-[11px] text-slate-400">
                Pilih porsi furudh atau tentukan jenis ashabah spesifik: <em>Bin Nafs</em>, <em>Bil Ghair</em>, atau <em>Ma'al Ghair</em>.
              </p>
            </div>
          </div>

          {selectedPortion && (
            <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full text-xs text-amber-300 font-bold self-start sm:self-center animate-pulse">
              <Check size={14} />
              <span>Porsi terpilih: {selectedPortion}</span>
            </div>
          )}
        </div>

        {/* The Portion Blocks Grid (11 Blocks) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {PORSI_OPTIONS.map((p) => {
            const isSelected = selectedPortion === p.id;
            const isAshabahType = p.category === 'ashabah';

            return (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => handleDragStart(e, p.id)}
                onClick={() => handleClick(p.id)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-200 border text-center shadow-md min-h-[76px] ${
                  isSelected
                    ? 'ring-4 ring-amber-400 border-white bg-slate-800 scale-105 z-10'
                    : 'bg-slate-950/80 border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/80 hover:-translate-y-0.5'
                }`}
                title={`${p.label} (${p.arabic}) - ${p.desc}`}
              >
                {/* Visual colored pill */}
                <div
                  className={`w-full h-1.5 rounded-full mb-1.5 bg-gradient-to-r ${p.color}`}
                ></div>

                {/* Primary Fraction or Ashabah Label */}
                <span
                  className={`font-black text-white tracking-tight ${
                    isAshabahType ? 'text-[11px] leading-tight px-0.5 line-clamp-2' : 'text-base sm:text-lg'
                  }`}
                >
                  {p.shortLabel || p.label}
                </span>

                {/* Arabic Label */}
                <span className="font-arabic text-[11px] font-semibold text-amber-300/80 leading-none mt-0.5">
                  {p.arabic}
                </span>

                <span className="text-[8px] text-slate-400 line-clamp-1 mt-0.5">
                  {isAshabahType ? 'Ashabah' : p.id === 'Mahjub' ? 'Gugur' : 'Fardh'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
