import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, BookOpen, AlertCircle, Sparkles, Award } from 'lucide-react';
import { HEIR_DEFINITIONS } from '../utils/faraidh-rules';

export default function FeedbackModal({
  isOpen,
  isCorrect,
  feedbackData,
  onNextCase,
  onRetryCase,
  onRestartGame,
  hearts,
  streak,
}) {
  useEffect(() => {
    if (isOpen && isCorrect) {
      // Confetti celebration burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#ffffff'],
      });
    }
  }, [isOpen, isCorrect]);

  if (!isOpen || !feedbackData) return null;

  const isGameOver = hearts <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div
          className={`p-6 text-center text-white relative ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700'
              : 'bg-gradient-to-r from-rose-800 via-rose-700 to-red-800'
          }`}
        >
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-white/20 backdrop-blur border border-white/30 shadow-inner">
            {isCorrect ? (
              <CheckCircle2 size={36} className="text-white" />
            ) : (
              <XCircle size={36} className="text-white" />
            )}
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            {isCorrect ? 'Masya Allah! Jawaban Tepat!' : isGameOver ? 'Afwan, Kesempatan Habis!' : 'Koreksi Faraidh Diperlukan'}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-md mx-auto">
            {isCorrect
              ? 'Perhitungan porsi dan asal masalah yang Anda susun 100% sesuai kaidah Fiqih Mawarith Jumhur.'
              : isGameOver
              ? 'Nyawa Anda telah habis. Tetap semangat, pelajari pembahasan dan ulangi simulasi untuk mengasah hafalan!'
              : 'Ada porsi atau asal masalah yang belum tepat. Simak penjelasan syar\'i di bawah ini:'}
          </p>

          {isCorrect && (
            <div className="mt-3 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
              <Sparkles size={14} className="text-amber-300" />
              <span>+100 Poin Skor • Streak Saat Ini: {streak} / 10</span>
            </div>
          )}
        </div>

        {/* Scrollable Content: Diagnostics & Explanation */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-200 text-sm">
          {/* Mistake highlights if any */}
          {!isCorrect && feedbackData.mistakes && feedbackData.mistakes.length > 0 && (
            <div className="bg-rose-950/30 border border-rose-800/60 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2.5">
                <AlertCircle size={15} />
                Poin Kesalahan Jawaban:
              </h4>
              <ul className="space-y-2">
                {feedbackData.mistakes.map((m, idx) => (
                  <li key={idx} className="text-xs leading-relaxed flex items-start gap-2 text-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                    <div>
                      <strong className="text-white">{m.name}: </strong>
                      Anda menjawab <span className="line-through text-rose-400">{m.userPortion || 'Kosong'}</span>, yang benar adalah <strong className="text-amber-400 underline">{m.correctPortion}</strong>.
                      <p className="text-slate-300 mt-0.5 italic">{m.reason}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Asal Masalah explanation */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <BookOpen size={15} />
              Kunci Solusi Asal Masalah & Saham:
            </h4>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800 text-slate-300">
              <span>Asal Masalah Baku:</span>
              <span className="font-mono font-bold text-white text-sm bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                {feedbackData.solution.asalMasalah}
                {feedbackData.solution.isAul && ' (\'Aul)'}
                {feedbackData.solution.isRadd && ' (Radd)'}
              </span>
            </div>
            {feedbackData.solution.caseTitle && (
              <div className="text-[11px] text-amber-300 mt-1.5 font-semibold">
                Kategori Kasus: {feedbackData.solution.caseTitle}
              </div>
            )}
          </div>

          {/* Complete Breakdown Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tabel Rincian Lengkap Ahli Waris:
            </h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 text-xs">
              {feedbackData.solution.heirResults.map((item, idx) => {
                const def = HEIR_DEFINITIONS[item.heirId] || { name: item.heirId, arabic: '' };
                return (
                  <div key={idx} className="p-3 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">
                          {item.count > 1 ? `${item.count} ` : ''}
                          {def.name}
                        </span>
                        <span className="font-arabic text-amber-400 text-xs">({def.arabic})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{item.note}</p>
                      {item.dalil && (
                        <p className="text-[10px] text-emerald-400 font-medium">{item.dalil}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                      <span className="px-2 py-1 rounded bg-slate-800 font-mono font-bold text-amber-300 border border-slate-700">
                        {item.portion}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Saham: <strong className="text-emerald-400">{item.share}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
          {isGameOver ? (
            <button
              onClick={onRestartGame}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <RotateCcw size={14} />
              <span>Mulai Latihan Baru</span>
            </button>
          ) : isCorrect ? (
            <button
              onClick={onNextCase}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Lanjut ke Kasus Berikutnya</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <>
              <button
                onClick={onRetryCase}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Coba Lagi Kasus Ini
              </button>
              <button
                onClick={onNextCase}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Lewati & Lanjut Kasus Baru</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
