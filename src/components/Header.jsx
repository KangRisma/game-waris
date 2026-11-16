import React from 'react';
import { Sparkles, Heart, Flame, Award, BookOpen, Volume2, VolumeX, RotateCcw, Wrench } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playTapSound } from '../utils/audio';

export default function Header({
  hearts,
  maxHearts,
  streak,
  score,
  currentLevel,
  onOpenCheatSheet,
  onOpenCertificate,
  onOpenCustomModal,
  onResetGame,
  soundOn,
  setSoundOn,
}) {
  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playTapSound();
  };

  return (
    <header className="w-full bg-slate-900/95 border-b border-emerald-900/40 backdrop-blur sticky top-0 z-40 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 p-[2px] shadow-md shadow-emerald-900/40 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-arabic text-amber-400 text-xl font-bold">ف</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Simulasi Faraidh
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Akademi Faraidh
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">Game Asah Otak & Praktikum Waris by Tim Syariah Waris Indonesia</p>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={onOpenCheatSheet}
              className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-700"
              title="Kamus & Tabel Furudh"
            >
              <BookOpen size={16} />
            </button>
          </div>
        </div>

        {/* Gamification Stats: Hearts, Streak, Score */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
          {/* Nyawa / Hearts */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 shadow-inner">
            <span className="text-xs text-slate-400 font-medium mr-1">Nyawa:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: maxHearts }).map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  className={`transition-all duration-300 ${
                    i < hearts
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-600 fill-slate-700/50 scale-90'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Streak Counter with Goal 10 */}
          <div
            onClick={streak >= 10 ? onOpenCertificate : undefined}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-inner transition-all ${
              streak >= 10
                ? 'bg-amber-500/20 border-amber-500/50 cursor-pointer animate-pulse'
                : 'bg-slate-800/80 border-slate-700'
            }`}
            title={streak >= 10 ? 'Klik untuk cetak E-Sertifikat!' : `${10 - streak} kasus lagi untuk E-Sertifikat`}
          >
            <Flame size={16} className={streak > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-500'} />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase leading-none font-semibold">Streak</span>
              <span className="text-xs font-bold text-amber-400 leading-tight">
                {streak} / 10 <span className="text-[10px] text-slate-400">🔥</span>
              </span>
            </div>
          </div>

          {/* Score / XP */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 shadow-inner">
            <Sparkles size={16} className="text-emerald-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase leading-none font-semibold">Skor</span>
              <span className="text-xs font-bold text-emerald-400 leading-tight">{score} PTS</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Cheat Sheet, Custom Case, Certificate, Sound */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-medium border border-amber-900/40 transition-colors shadow-sm"
          >
            <BookOpen size={14} />
            <span>Kamus Furudh</span>
          </button>

          <button
            onClick={onOpenCustomModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-emerald-200 text-xs font-medium border border-emerald-900/40 transition-colors shadow-sm"
            title="Buat simulasi kasus mandiri sesukamu"
          >
            <Wrench size={14} />
            <span>Sandbox</span>
          </button>

          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-amber-950/40 transition-all"
            title="Lihat / Unduh E-Sertifikat"
          >
            <Award size={14} />
            <span>Sertifikat</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={onResetGame}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
            title="Mulai Ulang Sesi"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
