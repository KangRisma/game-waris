import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { drawCertificate, getFaraidhGrade } from '../utils/certificate';
import { Download, Share2, Award, Check, Sparkles, X, User } from 'lucide-react';
import { playFanfareSound } from '../utils/audio';

export default function CertificateModal({
  isOpen,
  onClose,
  score = 0,
  streak = 0,
  levelTitle,
}) {
  const canvasRef = useRef(null);
  const [userName, setUserName] = useState('Alumni Akademi Faraidh');
  const [copied, setCopied] = useState(false);

  const gradeInfo = getFaraidhGrade(score, streak);

  useEffect(() => {
    if (isOpen) {
      if (streak >= 10) {
        playFanfareSound();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
        });
      }
    }
  }, [isOpen, streak]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      drawCertificate(canvasRef.current, {
        name: userName,
        score: score || 0,
        streak: streak || 0,
        levelTitle: levelTitle || 'Level 1: Dasar',
        dateStr: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        serialNumber: `AF-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }
  }, [isOpen, userName, score, streak, levelTitle]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Sertifikat-Akademi-Faraidh-${userName.replace(/\s+/g, '_')}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleShareWhatsApp = () => {
    const text = streak >= 10
      ? `🎉 *Alhamdulillah! Saya Telah Menyelesaikan 10 Kasus Faraidh Beruntun Tanpa Salah dengan Predikat MUMTAZ!* 🏆\n\nSaya telah berhasil memecahkan simulasi kasus mawarith dengan akurasi 100% pada *Generator Simulasi Kasus Faraidh - Akademi Faraidh by Tim Syariah Waris Indonesia*.\n\nSkor: *${score} PTS* | Rekor: *10/10 Streak Sempurna*\n\nYuk asah pemahaman ilmu waris Anda bersama kami di Akademi Faraidh!`
      : `🎉 *Alhamdulillah! Saya Sedang Mengikuti Praktikum di Generator Simulasi Kasus Faraidh!* 🏆\n\nPencapaian saat ini: Predikat *${gradeInfo.title}* dengan Skor *${score} PTS* (${streak}/10 Kasus Beruntun).\n\nPlatform resmi Akademi Faraidh by Tim Syariah Waris Indonesia. Yuk asah kemampuan ilmu waris Anda!`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyText = () => {
    const text = streak >= 10
      ? `🎉 Alhamdulillah! Saya berhasil menyelesaikan 10 Kasus Simulasi Faraidh beruntun dengan skor ${score} PTS (Predikat MUMTAZ) di Akademi Faraidh by Tim Syariah Waris Indonesia. Pelajari ilmu waris secara mudah, visual & interaktif!`
      : `🎉 Alhamdulillah! Saya meraih Predikat ${gradeInfo.title} dengan skor ${score} PTS di Generator Simulasi Faraidh - Akademi Faraidh by Tim Syariah Waris Indonesia.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-amber-300">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                E-Sertifikat Digital Akademi Faraidh
                <Sparkles size={16} className="text-amber-300" />
              </h3>
              <p className="text-xs text-amber-100">
                Apresiasi kelulusan praktikum simulasi waris interaktif
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Real-time Progress Notice */}
        <div className="px-4 sm:px-6 pt-3">
          {streak >= 10 ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 font-medium">
              <span>🏆</span>
              <span><strong>Selamat!</strong> Anda telah mencapai 10 kasus beruntun tanpa salah dengan predikat tertinggi <strong>MUMTAZ</strong>!</span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>
                🔥 <strong>Progres Predikat MUMTAZ:</strong> {streak} dari 10 kasus beruntun terselesaikan.
                {10 - streak > 0 && ` Jawab ${10 - streak} kasus lagi tanpa salah untuk meraih Predikat MUMTAZ!`}
              </span>
              <span className="font-bold text-amber-400 font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 self-start sm:self-auto">
                Streak: {streak} / 10
              </span>
            </div>
          )}
        </div>

        {/* Name input customizer & Realtime Grade */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
              <User size={13} className="text-amber-400" />
              Tulis Nama Lengkap Anda (Untuk Sertifikat):
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Contoh: Muhammad Ilham, S.E."
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white font-bold text-sm rounded-xl px-3.5 py-2 outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] text-slate-400 block">Predikat Pencapaian Saat Ini:</span>
            <span className={`text-xs font-extrabold ${gradeInfo.badgeColor} px-2.5 py-1 rounded-lg inline-block mt-0.5 border`}>
              {gradeInfo.badge}
            </span>
          </div>
        </div>

        {/* Live Canvas Certificate Preview */}
        <div className="p-4 sm:p-6 bg-slate-900 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-black">
            <canvas
              ref={canvasRef}
              className="w-full h-auto block select-none"
              style={{ maxHeight: '55vh', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Actions Bar: Download, WhatsApp Share, Copy */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400 max-w-sm">
            Bagikan pencapaian Anda ke media sosial atau WhatsApp untuk menginspirasi rekan-rekan pembelajar Faraidh lainnya!
          </p>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopyText}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span>{copied ? 'Teks Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50"
            >
              <Share2 size={14} />
              <span>Share ke WA</span>
            </button>

            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60"
            >
              <Download size={15} />
              <span>Download E-Sertifikat (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
