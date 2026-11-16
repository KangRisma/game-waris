import React from 'react';
import { ShieldCheck, UserCheck, Zap, Sparkles } from 'lucide-react';

export const LEVELS = [
  {
    level: 1,
    title: 'Level 1: Dasar',
    arabic: 'المستوى الأول: الفروض الأساسية',
    subtitle: 'Ashabul Furudh Inti',
    description: 'Suami/Istri, Ayah, Ibu, Anak Laki-laki & Perempuan. Mengasah porsi 1/2, 1/4, 1/8, 2/3, 1/3, 1/6 & Ashabah.',
    color: 'from-emerald-700 to-teal-800',
    borderColor: 'border-emerald-500/50',
    activeBadge: 'bg-emerald-500 text-slate-950',
    icon: UserCheck,
  },
  {
    level: 2,
    title: 'Level 2: Menengah',
    arabic: 'المستوى الثاني: الحجب والمحجوب',
    subtitle: 'Kaidah Hijab & Mahjub',
    description: 'Mulai memunculkan Cucu, Kakek, Nenek, Saudara (Kandung/Seayah/Seibu) & Paman. Jeli siapa yang terhalang!',
    color: 'from-blue-700 to-indigo-800',
    borderColor: 'border-blue-500/50',
    activeBadge: 'bg-blue-400 text-slate-950',
    icon: ShieldCheck,
  },
  {
    level: 3,
    title: 'Level 3: Lanjutan',
    arabic: 'المستوى الثالث: العول والرد والمسائل الخاصة',
    subtitle: '\'Aul, Radd & Kasus Khusus',
    description: 'Menghadapi Kasus Gharawain, Musyarrakah, Akdariyah, serta perhitungan \'Aul & Radd tingkat lanjut.',
    color: 'from-purple-700 to-amber-800',
    borderColor: 'border-amber-500/50',
    activeBadge: 'bg-amber-400 text-slate-950',
    icon: Zap,
  },
];

export default function LevelSelector({ currentLevel, onSelectLevel, totalSolvedInLevel }) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6 px-4">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-black text-white flex items-center justify-center gap-2">
          <Sparkles className="text-amber-400" size={22} />
          Pilih Tingkat Kesulitan Simulasi
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Tingkatkan level pemahaman Fiqih Mawarith Anda secara bertahap
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {LEVELS.map((lvl) => {
          const isActive = currentLevel === lvl.level;
          const Icon = lvl.icon;

          return (
            <button
              key={lvl.level}
              onClick={() => onSelectLevel(lvl.level)}
              className={`relative text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between overflow-hidden shadow-lg group ${
                isActive
                  ? `bg-gradient-to-br ${lvl.color} ${lvl.borderColor} ring-2 ring-amber-400/40 shadow-emerald-950/50 scale-[1.02]`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-amber-400'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm md:text-base leading-tight">
                      {lvl.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-amber-300/90 font-arabic">
                      {lvl.arabic}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${lvl.activeBadge}`}>
                    AKTIF
                  </span>
                )}
              </div>

              <div className="my-2">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  {lvl.subtitle}
                </span>
                <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
                  {lvl.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>Status Praktikum:</span>
                <span className="font-bold text-amber-300">
                  {totalSolvedInLevel[lvl.level] || 0} Terselesaikan
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
