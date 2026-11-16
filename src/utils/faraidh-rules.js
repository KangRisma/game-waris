/**
 * FARAIDH RULES & KNOWLEDGE BASE
 * Berdasarkan Fiqih Mawarith Ahlussunnah wal Jama'ah (Jumhur Ulama: Syafi'i, Hanbali, Maliki, Hanafi)
 * Didesain khusus untuk Akademi Faraidh by Tim Syariah Waris Indonesia
 */

export const PORSI_OPTIONS = [
  { id: '1/2', label: '1/2', shortLabel: '1/2', arabic: 'النصف', desc: 'Setengah harta', category: 'fardh', color: 'from-blue-600 to-indigo-600' },
  { id: '1/4', label: '1/4', shortLabel: '1/4', arabic: 'الربع', desc: 'Seperempat harta', category: 'fardh', color: 'from-teal-600 to-emerald-600' },
  { id: '1/8', label: '1/8', shortLabel: '1/8', arabic: 'الثمن', desc: 'Seperdelapan harta', category: 'fardh', color: 'from-amber-600 to-orange-600' },
  { id: '2/3', label: '2/3', shortLabel: '2/3', arabic: 'الثلثان', desc: 'Dua pertiga harta', category: 'fardh', color: 'from-purple-600 to-pink-600' },
  { id: '1/3', label: '1/3', shortLabel: '1/3', arabic: 'الثلث', desc: 'Sepertiga harta', category: 'fardh', color: 'from-violet-600 to-purple-600' },
  { id: '1/6', label: '1/6', shortLabel: '1/6', arabic: 'السدس', desc: 'Seperenam harta', category: 'fardh', color: 'from-emerald-600 to-green-700' },
  { id: '1/3 Sisa', label: '1/3 Sisa', shortLabel: '1/3 Sisa', arabic: 'ثلث الباقي', desc: 'Sepertiga sisa (Gharawain)', category: 'fardh', color: 'from-cyan-600 to-blue-700' },
  { id: 'Ashabah bin Nafs', label: 'Ashabah bin Nafs', shortLabel: 'A. bin Nafs', arabic: 'عصبة بالنفس', desc: 'Ashabah sendiri (Ibn, Ab, Akh Syaqiq, dll)', category: 'ashabah', color: 'from-amber-500 to-yellow-600' },
  { id: 'Ashabah bil Ghair', label: 'Ashabah bil Ghair', shortLabel: 'A. bil Ghair', arabic: 'عصبة بالغير', desc: 'Ditarik saudara laki-laki setingkat (2:1)', category: 'ashabah', color: 'from-orange-500 to-amber-700' },
  { id: 'Ashabah ma\'al Ghair', label: 'Ashabah ma\'al Ghair', shortLabel: 'A. ma\'al Ghair', arabic: 'عصبة مع الغير', desc: 'Saudari bersama anak/cucu perempuan', category: 'ashabah', color: 'from-rose-500 to-orange-600' },
  { id: 'Mahjub', label: 'Mahjub', shortLabel: 'Mahjub', arabic: 'محجوب', desc: 'Terhalang (tidak mendapat bagian)', category: 'mahjub', color: 'from-rose-700 to-red-800' },
];

export const HEIR_DEFINITIONS = {
  suami: {
    id: 'suami',
    name: 'Suami',
    arabic: 'الزوج',
    category: 'zawj',
    gender: 'M',
    description: 'Suami dari pewaris perempuan yang wafat',
    possiblePortions: ['1/2', '1/4'],
  },
  istri: {
    id: 'istri',
    name: 'Istri',
    arabic: 'الزوجة',
    category: 'zawj',
    gender: 'F',
    description: 'Istri dari pewaris laki-laki yang wafat',
    possiblePortions: ['1/4', '1/8'],
  },
  ayah: {
    id: 'ayah',
    name: 'Ayah',
    arabic: 'الأب',
    category: 'ushul',
    gender: 'M',
    description: 'Ayah kandung pewaris (tidak pernah terhijab hirman)',
    possiblePortions: ['1/6', 'Ashabah bin Nafs', '1/6 + Ashabah'],
  },
  ibu: {
    id: 'ibu',
    name: 'Ibu',
    arabic: 'الأم',
    category: 'ushul',
    gender: 'F',
    description: 'Ibu kandung pewaris (tidak pernah terhijab hirman)',
    possiblePortions: ['1/3', '1/6', '1/3 Sisa'],
  },
  kakek: {
    id: 'kakek',
    name: 'Kakek Shahih',
    arabic: 'الجد الصحيح',
    category: 'ushul',
    gender: 'M',
    description: 'Ayah dari ayah kandung pewaris',
    possiblePortions: ['1/6', 'Ashabah bin Nafs', 'Mahjub'],
  },
  nenek: {
    id: 'nenek',
    name: 'Nenek Shahihah',
    arabic: 'الجدة الصحيحة',
    category: 'ushul',
    gender: 'F',
    description: 'Ibu dari ibu atau ibu dari ayah',
    possiblePortions: ['1/6', 'Mahjub'],
  },
  anak_laki: {
    id: 'anak_laki',
    name: 'Anak Laki-laki',
    arabic: 'الابن',
    category: 'furu',
    gender: 'M',
    description: 'Anak laki-laki kandung pewaris (Ashabah bin Nafs terkuat)',
    possiblePortions: ['Ashabah bin Nafs'],
  },
  anak_perempuan: {
    id: 'anak_perempuan',
    name: 'Anak Perempuan',
    arabic: 'البنت',
    category: 'furu',
    gender: 'F',
    description: 'Anak perempuan kandung pewaris',
    possiblePortions: ['1/2', '2/3', 'Ashabah bil Ghair'],
  },
  cucu_laki: {
    id: 'cucu_laki',
    name: 'Cucu Laki-laki',
    arabic: 'ابن الابن',
    category: 'furu',
    gender: 'M',
    description: 'Anak laki-laki dari anak laki-laki',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
  cucu_perempuan: {
    id: 'cucu_perempuan',
    name: 'Cucu Perempuan',
    arabic: 'بنت الابن',
    category: 'furu',
    gender: 'F',
    description: 'Anak perempuan dari anak laki-laki',
    possiblePortions: ['1/2', '2/3', '1/6', 'Ashabah bil Ghair', 'Mahjub'],
  },
  saudara_kandung_laki: {
    id: 'saudara_kandung_laki',
    name: 'Saudara Laki-laki Kandung',
    arabic: 'الأخ الشقيق',
    category: 'hawasyi',
    gender: 'M',
    description: 'Saudara seayah dan seibu dengan mayit',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
  saudara_kandung_perempuan: {
    id: 'saudara_kandung_perempuan',
    name: 'Saudara Perempuan Kandung',
    arabic: 'الأخت الشقيقة',
    category: 'hawasyi',
    gender: 'F',
    description: 'Saudari seayah dan seibu dengan mayit',
    possiblePortions: ['1/2', '2/3', 'Ashabah bil Ghair', 'Ashabah ma\'al Ghair', 'Mahjub'],
  },
  saudara_seayah_laki: {
    id: 'saudara_seayah_laki',
    name: 'Saudara Laki-laki Seayah',
    arabic: 'الأخ لأب',
    category: 'hawasyi',
    gender: 'M',
    description: 'Saudara satu ayah berlainan ibu',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
  saudara_seayah_perempuan: {
    id: 'saudara_seayah_perempuan',
    name: 'Saudara Perempuan Seayah',
    arabic: 'الأخت لأب',
    category: 'hawasyi',
    gender: 'F',
    description: 'Saudari satu ayah berlainan ibu',
    possiblePortions: ['1/2', '2/3', '1/6', 'Ashabah bil Ghair', 'Ashabah ma\'al Ghair', 'Mahjub'],
  },
  saudara_seibu: {
    id: 'saudara_seibu',
    name: 'Saudara/i Seibu',
    arabic: 'الأخ / الأخت لأم',
    category: 'hawasyi',
    gender: 'Any',
    description: 'Saudara satu ibu berlainan ayah (laki-laki & perempuan sama porsinya)',
    possiblePortions: ['1/6', '1/3', 'Mahjub'],
  },
  paman_kandung: {
    id: 'paman_kandung',
    name: 'Paman Kandung',
    arabic: 'العم الشقيق',
    category: 'hawasyi',
    gender: 'M',
    description: 'Saudara laki-laki kandung dari ayah mayit',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
  paman_seayah: {
    id: 'paman_seayah',
    name: 'Paman Seayah',
    arabic: 'العم لأب',
    category: 'hawasyi',
    gender: 'M',
    description: 'Saudara laki-laki seayah dari ayah mayit',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
  anak_saudara_kandung_laki: {
    id: 'anak_saudara_kandung_laki',
    name: 'Keponakan Laki-laki (Anak Sdr Kandung)',
    arabic: 'ابن الأخ الشقيق',
    category: 'hawasyi',
    gender: 'M',
    description: 'Anak laki-laki dari saudara kandung laki-laki',
    possiblePortions: ['Ashabah bin Nafs', 'Mahjub'],
  },
};

/**
 * Dalil & Kaidah Fiqih Waris
 */
export const DALIL_FARAIDH = {
  annisa_11: {
    surah: 'QS. An-Nisa: 11',
    text: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ...',
    translation: 'Allah mensyariatkan kepadamu tentang (pembagian warisan untuk) anak-anakmu, yaitu bagian seorang anak laki-laki sama dengan bagian dua anak perempuan...'
  },
  annisa_12: {
    surah: 'QS. An-Nisa: 12',
    text: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ...',
    translation: 'Dan bagimu (suami-suami) seperdua dari harta yang ditinggalkan oleh istri-istrimu jika mereka tidak mempunyai anak...'
  },
  annisa_176: {
    surah: 'QS. An-Nisa: 176',
    text: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ...',
    translation: 'Mereka meminta fatwa kepadamu (tentang kalalah). Katakanlah: "Allah memberi fatwa kepadamu tentang kalalah..."'
  },
  hadits_ashabah: {
    surah: 'HR. Bukhari no. 6732 & Muslim no. 1614',
    text: 'أَلْحِقُوا الفَرَائِضَ بِأَهْلِهَا، فَمَا بَقِيَ فَهُوَ لأَوْلَى رَجُلٍ ذَكَرٍ',
    translation: 'Serahkanlah bagian-bagian warisan yang telah ditentukan kepada yang berhak. Sisanya adalah untuk kerabat laki-laki yang paling dekat.'
  },
  hadits_maal_ghair: {
    surah: 'Atsar Sahabat (Abdullah bin Mas\'ud - HR. Bukhari no. 6736)',
    text: 'اجْعَلُوا الأَخَوَاتِ مَعَ البَنَاتِ عَصَبَةً',
    translation: 'Jadikanlah saudari-saudari perempuan bersama anak-anak perempuan sebagai ashabah.'
  }
};
