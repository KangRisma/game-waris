import React from 'react';
import { User, ScrollText, BookmarkCheck, Sparkles, AlertCircle } from 'lucide-react';
import { HEIR_DEFINITIONS } from '../utils/faraidh-rules';

export default function CaseCard({ currentCase, caseNumber, totalInSession }) {
  if (!currentCase) return null;

  const isFemale = currentCase.deceasedGender === 'F';

  return (
    <div className="w-full max-w-5xl mx-auto mb-6 px-4">
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-5 md:p-6 shadow-xl overflow-hidden">
        {/* Subtle Decorative Islamic Star/Arch background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Top Case Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <ScrollText size={14} />
              Kasus #{caseNumber || 1}
            </span>

            {currentCase.forcedSpecialCase && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold animate-pulse">
                <Sparkles size={13} />
                Kasus Legendaris Faraidh
              </span>
            )}
          </div>

          {/* Jenazah Indicator */}
          <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isFemale ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'}`}>
              <User size={14} />
            </div>
            <div className="text-xs">
              <span className="text-slate-400">Pewaris (Mayit): </span>
              <strong className="text-white font-semibold">
                {currentCase.deceasedName} ({isFemale ? 'Perempuan / Istri' : 'Laki-laki / Suami'})
              </strong>
            </div>
          </div>
        </div>

        {/* Story Text */}
        <div className="mb-4">
          <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 leading-relaxed font-sans">
            "{currentCase.story}"
          </p>
        </div>

        {/* Quick Heirs Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <BookmarkCheck size={14} className="text-emerald-400" />
            Ahli waris terdaftar:
          </span>
          {currentCase.heirs.map((h, idx) => {
            const def = HEIR_DEFINITIONS[h.heirId] || { name: h.heirId, arabic: '' };
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-700/60 text-xs font-semibold text-slate-200"
              >
                <span className="text-amber-400 font-bold">{h.count > 1 ? `${h.count}x` : '1'}</span>
                <span>{def.name}</span>
                <span className="font-arabic text-[11px] text-slate-400 hidden sm:inline">({def.arabic})</span>
              </span>
            );
          })}
        </div>

        {/* Instructional Reminder */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/5 -mx-5 -mb-5 px-5 py-2.5">
          <AlertCircle size={14} className="shrink-0 text-amber-400" />
          <span>
            <strong>Instruksi:</strong> Tentukan porsi fardh/ashabah/mahjub untuk masing-masing ahli waris, lalu tentukan Asal Masalahnya!
          </span>
        </div>
      </div>
    </div>
  );
}
