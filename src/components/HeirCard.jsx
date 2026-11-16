import React, { useState } from 'react';
import { HEIR_DEFINITIONS, PORSI_OPTIONS } from '../utils/faraidh-rules';
import { X, CheckCircle, ChevronDown, User, Users } from 'lucide-react';
import { playTapSound } from '../utils/audio';

export default function HeirCard({
  heir,
  assignedPortion,
  onAssignPortion,
  selectedPalettePortion,
  isCorrect,
  isSubmitted,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const def = HEIR_DEFINITIONS[heir.heirId] || {
    name: heir.heirId,
    arabic: '',
    category: 'heir',
    description: '',
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedPortion = e.dataTransfer.getData('text/plain');
    if (droppedPortion) {
      onAssignPortion(heir.heirId, droppedPortion);
      playTapSound();
    }
  };

  const handleCardClick = () => {
    if (selectedPalettePortion) {
      onAssignPortion(heir.heirId, selectedPalettePortion);
      playTapSound();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onAssignPortion(heir.heirId, null);
    playTapSound();
  };

  const portionObj = PORSI_OPTIONS.find((p) => p.id === assignedPortion);

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'zawj':
        return { label: 'Pasangan', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'ushul':
        return { label: 'Ushul (Leluhur)', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'furu':
        return { label: 'Furu\' (Keturunan)', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'hawasyi':
        return { label: 'Hawasyi (Kerabat Samping)', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'Ahli Waris', bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
    }
  };

  const catBadge = getCategoryBadge(def.category);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleCardClick}
      className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between shadow-lg select-none ${
        isDragOver
          ? 'border-amber-400 bg-amber-500/10 ring-4 ring-amber-400/30 scale-[1.02]'
          : assignedPortion
          ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
          : 'bg-slate-900/60 border-dashed border-slate-700 hover:border-slate-500 hover:bg-slate-900/80'
      } ${selectedPalettePortion ? 'cursor-pointer hover:ring-2 hover:ring-amber-400/40' : ''}`}
    >
      {/* Top Bar: Category & Count */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${catBadge.bg}`}
        >
          {catBadge.label}
        </span>

        <span className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-700">
          {heir.count > 1 ? <Users size={12} className="text-amber-400" /> : <User size={12} className="text-slate-400" />}
          <span>{heir.count} Orang</span>
        </span>
      </div>

      {/* Heir Title & Arabic Name */}
      <div className="mb-4">
        <h4 className="text-base sm:text-lg font-black text-white leading-tight">
          {heir.count > 1 ? `${heir.count} ` : ''}
          {def.name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="font-arabic text-amber-300 text-sm font-semibold">{def.arabic}</span>
          <span className="text-[10px] text-slate-400">{def.gender === 'F' ? 'Perempuan' : def.gender === 'M' ? 'Laki-laki' : ''}</span>
        </div>
      </div>

      {/* Target Slot for Assigned Portion */}
      <div className="mt-auto">
        <span className="text-[11px] font-medium text-slate-400 mb-1.5 block">
          Porsi Faraidh:
        </span>

        {assignedPortion ? (
          <div
            className={`relative flex items-center justify-between p-3 rounded-xl border bg-gradient-to-r ${
              portionObj ? portionObj.color : 'from-emerald-700 to-teal-800'
            } text-white shadow-md`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight">{assignedPortion}</span>
              <span className="font-arabic text-xs font-semibold text-amber-200">
                ({portionObj?.arabic || ''})
              </span>
            </div>

            <button
              onClick={handleClear}
              className="w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              title="Hapus porsi"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            className={`p-3 rounded-xl border-2 border-dashed flex items-center justify-center text-center transition-all ${
              isDragOver
                ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                : 'border-slate-700 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-500'
            }`}
          >
            <span className="text-xs font-medium">
              {selectedPalettePortion
                ? `Klik untuk pasang [${selectedPalettePortion}]`
                : 'Tarik balok porsi ke sini'}
            </span>
          </div>
        )}

        {/* Quick Dropdown Picker for Mobile/Quick Select */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">Pilih cepat:</span>
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <span>{assignedPortion || 'Pilih porsi...'}</span>
              <ChevronDown size={12} />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 bottom-full mb-1 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-30 max-h-56 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-800">
                  Daftar Porsi Faraidh
                </div>
                {PORSI_OPTIONS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onAssignPortion(heir.heirId, p.id);
                      setShowDropdown(false);
                      playTapSound();
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 ${
                      assignedPortion === p.id ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-200'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="font-arabic text-[11px] text-slate-400">{p.arabic}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
