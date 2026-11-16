import React, { useState } from 'react';
import { HEIR_DEFINITIONS } from '../utils/faraidh-rules';
import { solveFaraidhCase } from '../utils/faraidh-engine';
import { Wrench, X, Play, Calculator, UserCheck, AlertCircle, Check } from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function CustomCaseModal({ isOpen, onClose, onStartCustomCase }) {
  const [gender, setGender] = useState('M'); // 'M' or 'F'
  const [selectedHeirs, setSelectedHeirs] = useState({
    istri: 1,
    anak_laki: 1,
    anak_perempuan: 1,
  });
  const [autoSolution, setAutoSolution] = useState(null);

  if (!isOpen) return null;

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setAutoSolution(null);
    const updated = { ...selectedHeirs };
    if (newGender === 'M') {
      delete updated.suami;
      if (!updated.istri) updated.istri = 1;
    } else {
      delete updated.istri;
      if (!updated.suami) updated.suami = 1;
    }
    setSelectedHeirs(updated);
  };

  const handleToggleHeir = (heirId) => {
    playTapSound();
    setAutoSolution(null);
    const updated = { ...selectedHeirs };
    if (updated[heirId]) {
      delete updated[heirId];
    } else {
      updated[heirId] = 1;
    }
    setSelectedHeirs(updated);
  };

  const handleChangeCount = (heirId, delta) => {
    playTapSound();
    setAutoSolution(null);
    const current = selectedHeirs[heirId] || 1;
    const nextVal = Math.max(1, current + delta);
    setSelectedHeirs({
      ...selectedHeirs,
      [heirId]: nextVal,
    });
  };

  const buildHeirArray = () => {
    return Object.entries(selectedHeirs).map(([heirId, count]) => ({
      heirId,
      count,
    }));
  };

  const handleCalculateAuto = () => {
    const heirsArr = buildHeirArray();
    const solution = solveFaraidhCase(gender, heirsArr);
    setAutoSolution(solution);
  };

  const handlePlayCustom = () => {
    const heirsArr = buildHeirArray();
    const isFemale = gender === 'F';
    const heirNames = heirsArr
      .map((h) => `${h.count > 1 ? h.count + ' ' : ''}${HEIR_DEFINITIONS[h.heirId]?.name || h.heirId}`)
      .join(', ');

    const customCaseObj = {
      id: 'CUSTOM-' + Date.now().toString(36),
      title: 'Kasus Kustom Sandbox',
      deceasedGender: gender,
      deceasedName: isFemale ? 'Ibu Almarhumah' : 'Pak Almarhum',
      deceasedTitle: isFemale ? 'Seorang wanita / istri' : 'Seorang pria / suami',
      story: `Pewaris (${isFemale ? 'Perempuan' : 'Laki-laki'}) meninggal dunia. Ahli waris yang ditinggalkan: ${heirNames}. Selesaikan kasus kustom ini!`,
      heirs: heirsArr,
      level: 2,
    };

    onStartCustomCase(customCaseObj);
    onClose();
  };

  const heirKeys = Object.keys(HEIR_DEFINITIONS).filter((key) => {
    if (gender === 'M' && key === 'suami') return false;
    if (gender === 'F' && key === 'istri') return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-900/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Wrench size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Sandbox & Generator Kasus Bebas
                <span className="font-arabic text-amber-400 text-sm font-semibold">المسائل الحرة</span>
              </h3>
              <p className="text-xs text-slate-400">
                Pilih kombinasi ahli waris sesukamu untuk simulasi latihan mandiri atau hitung otomatis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-200">
          {/* Deceased Gender Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              1. Jenis Kelamin Pewaris yang Wafat:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGenderChange('M')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                  gender === 'M'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-950/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>Pria (Suami) yang Wafat</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange('F')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                  gender === 'F'
                    ? 'bg-pink-600 text-white border-pink-400 shadow-lg shadow-pink-950/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>Wanita (Istri) yang Wafat</span>
              </button>
            </div>
          </div>

          {/* Heirs Grid Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Pilih Ahli Waris yang Masih Hidup:
              </label>
              <span className="text-[11px] text-amber-400 font-bold">
                {Object.keys(selectedHeirs).length} Ahli Waris Dipilih
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {heirKeys.map((key) => {
                const def = HEIR_DEFINITIONS[key];
                const isSelected = !!selectedHeirs[key];
                const count = selectedHeirs[key] || 1;

                return (
                  <div
                    key={key}
                    onClick={() => handleToggleHeir(key)}
                    className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isSelected && <Check size={12} />}
                        </div>
                        <span className="text-xs font-bold text-white leading-tight">
                          {def.name}
                        </span>
                      </div>
                      <span className="font-arabic text-[11px] text-amber-300 block pl-5.5">
                        {def.arabic}
                      </span>
                    </div>

                    {/* Count stepper if selected */}
                    {isSelected && (
                      <div
                        className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleChangeCount(key, -1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleChangeCount(key, 1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auto Solution Preview if computed */}
          {autoSolution && (
            <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Calculator size={16} className="text-emerald-400" />
                  <strong className="text-xs font-bold text-white">Kalkulasi Cepat Faraidh:</strong>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Asal Masalah: {autoSolution.asalMasalah}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                {autoSolution.heirResults.map((r, i) => {
                  const def = HEIR_DEFINITIONS[r.heirId] || { name: r.heirId };
                  return (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-slate-900 text-slate-300">
                      <span>{r.count > 1 ? `${r.count} ` : ''}{def.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-amber-300">{r.portion}</span>
                        <span className="text-slate-500">Saham: <strong className="text-emerald-400">{r.share}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleCalculateAuto}
            disabled={Object.keys(selectedHeirs).length === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-emerald-200 font-bold text-xs flex items-center gap-1.5 border border-emerald-900/40 transition-colors"
          >
            <Calculator size={14} />
            <span>Hitung Solusi Otomatis</span>
          </button>

          <button
            type="button"
            onClick={handlePlayCustom}
            disabled={Object.keys(selectedHeirs).length === 0}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all"
          >
            <Play size={14} />
            <span>Mulai Uji Kasus Ini di Game</span>
          </button>
        </div>
      </div>
    </div>
  );
}
