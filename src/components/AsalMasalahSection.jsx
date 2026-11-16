import React, { useState } from 'react';
import { Calculator, HelpCircle, Check, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { HEIR_DEFINITIONS } from '../utils/faraidh-rules';
import { playTapSound } from '../utils/audio';

const STANDARD_ASAL_MASALAH = [2, 3, 4, 6, 8, 12, 24];
const SPECIAL_ASAL_MASALAH = [7, 8, 9, 10, 13, 15, 17, 27];

export default function AsalMasalahSection({
  heirs,
  assignedPortions,
  userAsalMasalah,
  onChangeAsalMasalah,
  userShares,
  onChangeShare,
  onSubmitCheck,
  canSubmit,
}) {
  const [showKpkHint, setShowKpkHint] = useState(false);

  // Kumpulkan penyebut yang ada
  const activeDenominators = [];
  Object.values(assignedPortions).forEach((p) => {
    if (p === '1/2') activeDenominators.push(2);
    else if (p === '1/4') activeDenominators.push(4);
    else if (p === '1/8') activeDenominators.push(8);
    else if (p === '2/3' || p === '1/3') activeDenominators.push(3);
    else if (p === '1/6') activeDenominators.push(6);
  });
  const uniqueDenoms = [...new Set(activeDenominators)].sort((a, b) => a - b);

  // Hitung total saham yang telah diisi user
  const totalUserShares = Object.values(userShares).reduce((acc, val) => {
    const num = parseInt(val, 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const asalNum = parseInt(userAsalMasalah, 10);
  const diff = !isNaN(asalNum) ? totalUserShares - asalNum : 0;

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Langkah 2: Hitung Asal Masalah & Saham
                <span className="font-arabic text-amber-400 text-sm font-semibold">أصل المسألة والسهام</span>
              </h3>
              <p className="text-xs text-slate-400">
                Tentukan angka KPK (Kelipatan Persekutuan Terkecil) dari penyebut porsi waris di atas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowKpkHint(!showKpkHint)}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg self-start sm:self-center transition-colors"
          >
            <HelpCircle size={14} />
            <span>{showKpkHint ? 'Tutup Bantuan KPK' : 'Petunjuk KPK'}</span>
          </button>
        </div>

        {/* Hint Box for KPK */}
        {showKpkHint && (
          <div className="mb-5 p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles size={14} />
              Kaidah Faraidh: Tashilul Ashl (Menentukan Asal Masalah)
            </div>
            <p>
              Penyebut furudh yang aktif pada kasus ini: <strong className="text-emerald-400">{uniqueDenoms.length > 0 ? uniqueDenoms.join(', ') : 'Hanya Ashabah / Sisa'}</strong>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Asal masalah baku dalam faraidh umumnya salah satu dari: <strong className="text-white">2, 3, 4, 6, 8, 12, 24</strong>. Jika terjadi <em>'Aul</em>, angka 6 bisa menjadi 7, 8, 9, 10; angka 12 menjadi 13, 15, 17; angka 24 menjadi 27.
            </p>
          </div>
        )}

        {/* Asal Masalah Input & Presets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          <div className="md:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Ketik Angka Asal Masalah:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="999"
                value={userAsalMasalah}
                onChange={(e) => onChangeAsalMasalah(e.target.value)}
                placeholder="Contoh: 6, 12, 24..."
                className="w-full bg-slate-900 border-2 border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white font-black text-xl rounded-xl px-4 py-2.5 outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            {/* Quick buttons */}
            <div className="mt-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                Pilih Cepat Asal Masalah Umum:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STANDARD_ASAL_MASALAH.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      onChangeAsalMasalah(val.toString());
                      playTapSound();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                      userAsalMasalah === val.toString()
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-slate-500 mr-1 self-center">Aul/Kasus Khusus:</span>
                {SPECIAL_ASAL_MASALAH.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      onChangeAsalMasalah(val.toString());
                      playTapSound();
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-all ${
                      userAsalMasalah === val.toString()
                        ? 'bg-purple-500 text-white border-purple-400 shadow-md scale-105'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table of Shares (Saham) */}
          <div className="md:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Pembagian Saham Tiap Ahli Waris:
                </label>
                <span className="text-[11px] text-slate-400">
                  (Porsi × Asal Masalah)
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {heirs.map((h) => {
                  const def = HEIR_DEFINITIONS[h.heirId] || { name: h.heirId };
                  const portion = assignedPortions[h.heirId];
                  const shareVal = userShares[h.heirId] || '';

                  return (
                    <div
                      key={h.heirId}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">
                          {h.count > 1 ? `${h.count} ` : ''}
                          {def.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px] font-mono font-bold">
                          {portion || 'Belum diisi'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-500">Saham:</span>
                        <input
                          type="number"
                          min="0"
                          value={shareVal}
                          onChange={(e) => onChangeShare(h.heirId, e.target.value)}
                          placeholder="0"
                          className="w-16 bg-slate-950 border border-slate-700 focus:border-emerald-400 rounded-lg px-2 py-1 text-center font-bold text-emerald-400 text-xs outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Balance Status Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Total Saham Diinput: <strong className="text-white">{totalUserShares}</strong>
              </span>

              {userAsalMasalah && (
                <div className="flex items-center gap-1">
                  {diff === 0 ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <Check size={12} /> Seimbang (= {userAsalMasalah})
                    </span>
                  ) : diff > 0 ? (
                    <span className="text-purple-400 font-bold flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                      Lebih (+{diff}) - Potensi 'Aul
                    </span>
                  ) : (
                    <span className="text-amber-400 font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Sisa ({Math.abs(diff)}) - Untuk Ashabah/Radd
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Pastikan seluruh porsi ahli waris telah Anda tentukan dengan teliti sebelum memeriksa.
          </p>

          <button
            type="button"
            onClick={onSubmitCheck}
            disabled={!canSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
              canSubmit
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-950/60 hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-emerald-400/50'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Cek Jawaban Sekarang</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
