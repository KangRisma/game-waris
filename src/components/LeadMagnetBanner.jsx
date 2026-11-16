import React, { useState } from 'react';
import { Sparkles, MessageCircle, CheckCircle, ArrowRight, BookOpen, GraduationCap, X } from 'lucide-react';

export default function LeadMagnetBanner() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('umum'); // 'alumni' | 'peserta_aktif' | 'umum'

  const handleOpenWA = (e) => {
    e.preventDefault();
    const msg = `Halo Tim Syariah Waris Indonesia & Akademi Faraidh, saya *${name || 'Sahabat Faraidh'}* (${status.toUpperCase()}). Saya baru saja mencoba Simulasi Kasus Faraidh Interaktif dan tertarik untuk mengikuti program bimbingan intensif Faraidh berikutnya. Mohon info pendaftaran dan jadwal terdekat ya. Terima kasih!`;
    const url = `https://api.whatsapp.com/send?phone=6289662813637&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto my-8 px-4">
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/70 border border-amber-500/30 p-5 sm:p-7 shadow-2xl overflow-hidden">
          {/* Subtle gold flare */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                <GraduationCap size={15} />
                <span>Akademi Faraidh by Tim Syariah Waris Indonesia</span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                Ingin Menguasai Ilmu Waris Faraidh dari Nol Sampai Mahir?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Bergabunglah bersama ratusan alumni dan praktisi dalam program intensif Akademi Faraidh. Pelajari bedah kasus nyata, kaidah praktis, kalkulasi harta waris, hingga simulasi digital langsung bersama Tim Syariah Waris Indonesia.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-emerald-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-amber-400" /> Rumus Visual Aplikatif
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-amber-400" /> Studi Kasus Sengketa Riil
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-amber-400" /> Bimbingan Mentor & Praktikum
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span>Konsultasi & Gabung Kelas</span>
              </button>
              <span className="text-[11px] text-slate-400">
                Layanan Konsultasi & Bimbingan Resmi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-2 font-bold">
                <GraduationCap size={24} />
              </div>
              <h4 className="text-lg font-black text-white">Daftar Bimbingan Akademi Faraidh</h4>
              <p className="text-xs text-slate-400 mt-1">
                Isi data singkat untuk terhubung langsung dengan Tim Syariah Waris Indonesia via WhatsApp
              </p>
            </div>

            <form onSubmit={handleOpenWA} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nama Lengkap:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ahmad Baihaqi"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white font-medium text-xs rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nomor WhatsApp:
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white font-medium text-xs rounded-xl px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Status Anda:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 text-white font-medium text-xs rounded-xl px-3.5 py-2.5 outline-none"
                >
                  <option value="umum">Calon Peserta Baru (Masyarakat Umum)</option>
                  <option value="peserta_aktif">Peserta Aktif Akademi Faraidh</option>
                  <option value="alumni">Alumni Akademi Faraidh</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all mt-2"
              >
                <MessageCircle size={16} />
                <span>Lanjut ke WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
