import React, { useState } from 'react';
import { BookOpen, X, Search, ChevronRight, ShieldAlert, Sparkles, Scale } from 'lucide-react';

export default function CheatSheetModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('furudh'); // 'furudh' | 'hijab' | 'asal' | 'khusus'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Kamus Kaidah & Tabel Rujukan Faraidh
                <span className="font-arabic text-amber-400 text-sm font-semibold">قواعد الفرائض</span>
              </h3>
              <p className="text-xs text-slate-400">
                Panduan praktis standar Jumhur Ulama untuk alumni & peserta Akademi Faraidh
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('furudh')}
            className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'furudh'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale size={14} />
            <span>Tabel 6 Furudh Muqaddarah</span>
          </button>

          <button
            onClick={() => setActiveTab('hijab')}
            className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'hijab'
                ? 'border-rose-400 text-rose-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert size={14} />
            <span>Kaidah Hijab (Siapa Menghalangi Siapa)</span>
          </button>

          <button
            onClick={() => setActiveTab('asal')}
            className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'asal'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} />
            <span>Rumus Asal Masalah & 'Aul</span>
          </button>

          <button
            onClick={() => setActiveTab('ashabah')}
            className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'ashabah'
                ? 'border-yellow-400 text-yellow-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>3 Kategori Ashabah</span>
          </button>

          <button
            onClick={() => setActiveTab('khusus')}
            className={`px-4 py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'khusus'
                ? 'border-purple-400 text-purple-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Kasus Legendaris (Gharawain, Akdariyah, dll)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-300 text-xs sm:text-sm">
          {activeTab === 'furudh' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <strong>Enam Porsi Pasti (Furudh Muqaddarah)</strong> yang ditegaskan langsung dalam Al-Qur'an (QS. An-Nisa: 11, 12, 176): <strong>1/2, 1/4, 1/8, 2/3, 1/3, 1/6</strong>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-blue-400 font-mono">1/2 (Setengah)</span>
                    <span className="font-arabic text-amber-400 text-sm">النصف</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">Suami:</strong> Jika mayit tidak punya anak/cucu (furu').</li>
                    <li><strong className="text-slate-200">1 Anak Perempuan:</strong> Jika tunggal tanpa anak laki-laki.</li>
                    <li><strong className="text-slate-200">1 Cucu Perempuan:</strong> Jika tidak ada anak kandung.</li>
                    <li><strong className="text-slate-200">1 Saudari Kandung:</strong> Jika tunggal dan tidak ada furu'/ayah.</li>
                    <li><strong className="text-slate-200">1 Saudari Seayah:</strong> Jika tunggal dan tidak ada saudari kandung.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-teal-400 font-mono">1/4 (Seperempat)</span>
                    <span className="font-arabic text-amber-400 text-sm">الربع</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">Suami:</strong> Jika mayit memiliki anak/cucu (furu').</li>
                    <li><strong className="text-slate-200">Istri:</strong> Jika mayit tidak memiliki anak/cucu (furu').</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-amber-400 font-mono">1/8 (Seperdelapan)</span>
                    <span className="font-arabic text-amber-400 text-sm">الثمن</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">Istri (1 atau lebih):</strong> Jika mayit memiliki anak/cucu (furu'). Jika istri lebih dari satu, porsi 1/8 dibagi rata sesama mereka.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-purple-400 font-mono">2/3 (Dua Pertiga)</span>
                    <span className="font-arabic text-amber-400 text-sm">الثلثان</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">2+ Anak Perempuan:</strong> Berbagi rata jika tanpa anak laki-laki.</li>
                    <li><strong className="text-slate-200">2+ Cucu Perempuan:</strong> Jika tanpa anak kandung/cucu laki-laki.</li>
                    <li><strong className="text-slate-200">2+ Saudari Kandung:</strong> Jika tanpa furu', ayah, atau sdr kandung lk.</li>
                    <li><strong className="text-slate-200">2+ Saudari Seayah:</strong> Jika tanpa sdr kandung.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-indigo-400 font-mono">1/3 (Sepertiga)</span>
                    <span className="font-arabic text-amber-400 text-sm">الثلث</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">Ibu:</strong> Jika tidak ada furu' dan saudara &lt; 2 orang (bukan kasus Gharawain).</li>
                    <li><strong className="text-slate-200">2+ Saudara Seibu:</strong> Dibagi sama rata antara laki-laki dan perempuan.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-emerald-400 font-mono">1/6 (Seperenam)</span>
                    <span className="font-arabic text-amber-400 text-sm">السدس</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-200">Ayah:</strong> Jika ada anak/cucu laki-laki.</li>
                    <li><strong className="text-slate-200">Ibu:</strong> Jika ada furu' atau 2+ orang saudara.</li>
                    <li><strong className="text-slate-200">Kakek:</strong> Menggantikan ayah saat ayah tiada.</li>
                    <li><strong className="text-slate-200">Nenek:</strong> Jika tidak ada ibu.</li>
                    <li><strong className="text-slate-200">1 Cucu Perempuan:</strong> Takmilah 2/3 bersama 1 anak perempuan.</li>
                    <li><strong className="text-slate-200">1 Saudari Seayah:</strong> Takmilah 2/3 bersama 1 saudari kandung.</li>
                    <li><strong className="text-slate-200">1 Saudara/i Seibu:</strong> Jika kalalah tanpa furu'/ushul lk.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hijab' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <strong>Hijab Hirman</strong> adalah pengguguran hak waris seseorang secara penuh karena terhalang oleh ahli waris lain yang lebih dekat derajat kekerabatannya.
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">Anak Laki-laki (Ibn)</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Cucu (lk/pr), seluruh Saudara (kandung, seayah, seibu), Paman, Keponakan.
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">Ayah Kandung (Ab)</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Kakek, Nenek (pihak ayah), seluruh Saudara (kandung, seayah, seibu), Paman, Keponakan.
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">Ibu Kandung (Umm)</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Seluruh Nenek shahihah (baik dari pihak ibu maupun dari pihak ayah).
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">2+ Anak Perempuan</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Cucu perempuan (kecuali ada cucu laki-laki penolong / al-qarib al-mubarak).
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">Saudara Laki-laki Kandung</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Saudara seayah (lk/pr), Paman, Keponakan laki-laki.
                  </span>
                </div>
                <div className="p-3 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-xs">Furu' (Anak/Cucu) & Ushul Laki-laki</span>
                  <span className="text-xs text-rose-300">
                    Menghijab: Saudara/i Seibu secara mutlak.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <strong>Ahli Waris yang TIDAK PERNAH terhijab hirman sama sekali:</strong>
                <p className="text-white mt-1">1. Suami, 2. Istri, 3. Ayah, 4. Ibu, 5. Anak Laki-laki, 6. Anak Perempuan.</p>
              </div>
            </div>
          )}

          {activeTab === 'asal' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <strong>Asal Masalah (أصل المسألة)</strong> adalah angka terkecil (KPK) yang dapat membagi bulat seluruh saham furudh ahli waris tanpa pecahan.
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h5 className="font-bold text-white mb-1">4 Kaidah Hisab Faraidh Klasik:</h5>
                  <p><strong className="text-amber-400">1. Tamatsul:</strong> Penyebut sama (misal 1/3 dan 2/3) → ambil salah satu (3).</p>
                  <p><strong className="text-amber-400">2. Tadakhul:</strong> Penyebut satu kelipatan dari yang lain (misal 1/2 dan 1/6) → ambil yang terbesar (6).</p>
                  <p><strong className="text-amber-400">3. Tawafuq:</strong> Penyebut punya FPB (misal 1/4 dan 1/6, FPB=2) → kalikan salah satu dengan separuh yang lain = 12.</p>
                  <p><strong className="text-amber-400">4. Tabayun:</strong> Penyebut tidak punya faktor pembagi sama (misal 1/3 dan 1/4) → kalikan keduanya = 12.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h5 className="font-bold text-purple-400 mb-1">Kaidah 'Aul (العول):</h5>
                  <p className="text-slate-400">
                    Jika total saham furudh melebihi angka asal masalah:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-slate-300 space-y-0.5">
                    <li>Asal Masalah <strong>6</strong> dapat di-'Aul-kan menjadi <strong>7, 8, 9, atau 10</strong>.</li>
                    <li>Asal Masalah <strong>12</strong> dapat di-'Aul-kan menjadi <strong>13, 15, atau 17</strong>.</li>
                    <li>Asal Masalah <strong>24</strong> hanya dapat di-'Aul-kan menjadi <strong>27</strong> (Kasus Mimbariyyah).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ashabah' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">
                <strong>Ashabah (العصبة)</strong> adalah ahli waris yang tidak memiliki porsi pecahan tertentu (fardh muqaddar), melainkan mengambil <strong>seluruh sisa harta</strong> setelah ashabul furudh menerima haknya, atau mengambil seluruh harta jika tidak ada ashabul furudh.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Ashabah bin Nafs */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-400 text-sm">1. Ashabah bin Nafs</span>
                      <span className="font-arabic text-amber-300 text-xs">عصبة بالنفس</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-2">
                      Menjadi ashabah karena <strong>dirinya sendiri</strong> tanpa membutuhkan keberadaan orang lain. Seluruhnya adalah <strong>laki-laki</strong> (kecuali wanita yang memerdekakan budak/mu'tiqah).
                    </p>
                    <div className="space-y-1 text-slate-400 text-[11px]">
                      <p><strong className="text-white">• Arah Keturunan (Bunuwwah):</strong> Anak Laki-laki, Cucu Laki-laki.</p>
                      <p><strong className="text-white">• Arah Leluhur (Ubuwwah):</strong> Ayah, Kakek Shahih.</p>
                      <p><strong className="text-white">• Arah Saudara (Ukhuwwah):</strong> Sdr Lk Kandung, Sdr Lk Seayah, Keponakan Lk.</p>
                      <p><strong className="text-white">• Arah Paman ('Umumah):</strong> Paman Kandung, Paman Seayah, Anak Lk Paman.</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400">
                    Dalil: HR. Bukhari no. 6732 & Muslim no. 1614
                  </div>
                </div>

                {/* 2. Ashabah bil Ghair */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-orange-500/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-orange-400 text-sm">2. Ashabah bil Ghair</span>
                      <span className="font-arabic text-amber-300 text-xs">عصبة بالغير</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-2">
                      Ahli waris <strong>perempuan pemilik fardh (1/2 atau 2/3)</strong> yang ditarik menjadi ashabah karena adanya <strong>saudara laki-laki yang sederajat (mu'ashshib)</strong>.
                    </p>
                    <div className="space-y-1 text-slate-400 text-[11px]">
                      <p><strong className="text-white">1. Anak Perempuan:</strong> Bersama Anak Laki-laki (rasio 2:1).</p>
                      <p><strong className="text-white">2. Cucu Perempuan:</strong> Bersama Cucu Laki-laki sederajat (rasio 2:1).</p>
                      <p><strong className="text-white">3. Saudari Kandung:</strong> Bersama Saudara Lk Kandung (rasio 2:1).</p>
                      <p><strong className="text-white">4. Saudari Seayah:</strong> Bersama Saudara Lk Seayah (rasio 2:1).</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-orange-400">
                    Kaidah: للذكر مثل حظ الأنثيين (QS. An-Nisa: 11, 176)
                  </div>
                </div>

                {/* 3. Ashabah ma'al Ghair */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-rose-400 text-sm">3. Ashabah ma'al Ghair</span>
                      <span className="font-arabic text-amber-300 text-xs">عصبة مع الغير</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-2">
                      Ahli waris <strong>perempuan yang menjadi ashabah bersama perempuan lain</strong> (tanpa ada saudara laki-laki yang meng-ashabahkan).
                    </p>
                    <div className="space-y-1 text-slate-400 text-[11px]">
                      <p><strong className="text-white">1. Saudari Kandung:</strong> Menjadi ashabah saat ada 1 atau lebih Anak Perempuan / Cucu Perempuan.</p>
                      <p><strong className="text-white">2. Saudari Seayah:</strong> Menjadi ashabah saat ada Anak Perempuan / Cucu Perempuan (dan tidak ada saudara/i kandung).</p>
                      <p className="text-emerald-300 text-[10px] italic mt-1">
                        *Catatan: Saat menjadi Ashabah ma'al Ghair, kedudukannya sama seperti Saudara Laki-laki (sehingga menghijab saudara seayah & paman).
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-rose-400">
                    Kaidah: اجعلوا الأخوات مع البنات عصبة (HR. Bukhari no. 6736)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'khusus' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/40">
                <div className="font-bold text-amber-400 text-sm mb-1">1. Al-Gharawain (Umariyatayn)</div>
                <p className="text-slate-300 leading-relaxed">
                  Terjadi jika ahli waris hanya terdiri dari: <strong>Suami/Istri + Ibu + Ayah</strong> (tanpa furu' dan tanpa 2+ saudara).
                </p>
                <p className="text-emerald-400 mt-1">
                  Solusi: Ibu tidak diberi 1/3 dari seluruh harta, melainkan <strong>1/3 dari SISA (Tsulutsul Baqi)</strong> setelah jatah pasangan diambil, agar bagian Ayah tetap 2x bagian Ibu sesuai kaidah dasar laki-laki mendapat 2 bagian perempuan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/40">
                <div className="font-bold text-blue-400 text-sm mb-1">2. Al-Musyarrakah (Himyariyyah)</div>
                <p className="text-slate-300 leading-relaxed">
                  Ahli waris: <strong>Suami (1/2) + Ibu (1/6) + 2+ Saudara Seibu (1/3) + Saudara Laki-laki Kandung</strong>.
                </p>
                <p className="text-emerald-400 mt-1">
                  Karena 1/2 + 1/6 + 1/3 sudah menghabiskan seluruh 6/6 harta, maka Saudara Kandung bersekutu (musyarrakah) dalam porsi 1/3 bersama Saudara Seibu ("Anggaplah ayah kami batu di lautan, bukankah ibu kami sama?").
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/40">
                <div className="font-bold text-purple-400 text-sm mb-1">3. Al-Akdariyah</div>
                <p className="text-slate-300 leading-relaxed">
                  Ahli waris: <strong>Suami (1/2 = 3/6) + Ibu (1/3 = 2/6) + Kakek (1/6 = 1/6) + 1 Saudari Kandung/Seayah (1/2 = 3/6)</strong>.
                </p>
                <p className="text-emerald-400 mt-1">
                  Total saham = 9 (Aul dari 6 ke 9). Kemudian bagian Kakek (1) dan Saudari (3) digabung = 4, lalu dibagi rasio 2:1 (kakek:saudari). Dikalikan 3 menjadi Asal Masalah <strong>27</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
