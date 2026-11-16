/**
 * FARAIDH SOLVER & CASE GENERATOR ENGINE
 * Mengimplementasikan kaidah mawarith standar Jumhur Ulama.
 * Dilengkapi pembagian Ashabah spesifik: Ashabah bin Nafs, Ashabah bil Ghair, Ashabah ma'al Ghair.
 */

import { HEIR_DEFINITIONS } from './faraidh-rules';

// Utility KPK (Kelipatan Persekutuan Terkecil)
export function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function lcmArray(arr) {
  if (!arr || arr.length === 0) return 1;
  return arr.reduce((acc, curr) => lcm(acc, curr), 1);
}

/**
 * Cek apakah suatu porsi termasuk kategori Ashabah
 */
export function isAshabah(portion) {
  if (!portion) return false;
  return (
    portion === 'Ashabah' ||
    portion === 'Ashabah bin Nafs' ||
    portion === 'Ashabah bil Ghair' ||
    portion === 'Ashabah ma\'al Ghair'
  );
}

/**
 * Normalisasi fraction string ke penyebut integer
 */
function getDenominator(portionStr) {
  switch (portionStr) {
    case '1/2': return 2;
    case '1/4': return 4;
    case '1/8': return 8;
    case '2/3': return 3;
    case '1/3': return 3;
    case '1/6': return 6;
    case '1/3 Sisa': return 6; // Dihitung dari sisa
    default: return null;
  }
}

/**
 * Selesaikan kasus faraidh berdasarkan daftar ahli waris
 * @param {string} deceasedGender 'M' (Pria) atau 'F' (Wanita)
 * @param {Array<{ heirId: string, count: number }>} heirs
 * @param {string} forcedSpecialCase Optional: 'gharawain', 'musyarrakah', 'akdariyah'
 */
export function solveFaraidhCase(deceasedGender, heirs, forcedSpecialCase = null) {
  const heirMap = {};
  heirs.forEach(h => {
    heirMap[h.heirId] = h.count;
  });

  const count = (id) => heirMap[id] || 0;

  // Cek keberadaan kategori furu' (anak/cucu)
  const hasAnakLaki = count('anak_laki') > 0;
  const hasAnakPerempuan = count('anak_perempuan') > 0;
  const hasCucuLaki = count('cucu_laki') > 0;
  const hasCucuPerempuan = count('cucu_perempuan') > 0;

  const hasFuruLaki = hasAnakLaki || hasCucuLaki;
  const hasFuruPerempuan = hasAnakPerempuan || hasCucuPerempuan;
  const hasFuru = hasFuruLaki || hasFuruPerempuan;

  // Cek ushul
  const hasAyah = count('ayah') > 0;
  const hasIbu = count('ibu') > 0;
  const hasKakek = count('kakek') > 0;

  // Cek saudara
  const countSaudaraKandungLaki = count('saudara_kandung_laki');
  const countSaudaraKandungPerempuan = count('saudara_kandung_perempuan');
  const countSaudaraSeayahLaki = count('saudara_seayah_laki');
  const countSaudaraSeayahPerempuan = count('saudara_seayah_perempuan');
  const countSaudaraSeibu = count('saudara_seibu');

  const totalSaudara = countSaudaraKandungLaki + countSaudaraKandungPerempuan +
                       countSaudaraSeayahLaki + countSaudaraSeayahPerempuan + countSaudaraSeibu;

  // Inisialisasi hasil solusi
  const solutions = {};

  // 1. CEK KASUS KHUSUS TERLEBIH DAHULU

  // A. GHARAWAIN (Umariyatayn)
  const isGharawainSuami = count('suami') === 1 && hasIbu && hasAyah && !hasFuru && totalSaudara === 0 && Object.keys(heirMap).length === 3;
  const isGharawainIstri = count('istri') > 0 && hasIbu && hasAyah && !hasFuru && totalSaudara === 0 && Object.keys(heirMap).length === 3;

  if (forcedSpecialCase === 'gharawain' || isGharawainSuami || isGharawainIstri) {
    if (deceasedGender === 'F' || count('suami') === 1) {
      solutions['suami'] = {
        portion: '1/2',
        share: 3,
        note: 'Mendapat 1/2 karena mayit tidak memiliki anak/cucu.',
        dalil: 'QS. An-Nisa: 12'
      };
      solutions['ibu'] = {
        portion: '1/3 Sisa',
        share: 1,
        note: 'Kasus Gharawain: Ibu mendapat 1/3 dari SISA (Tsulutsul Baqi) agar bagian Ayah tetap 2x bagian Ibu.',
        dalil: 'Fatwa Khalifah Umar bin Khathab & Ijma Sahabat'
      };
      solutions['ayah'] = {
        portion: 'Ashabah bin Nafs',
        share: 2,
        note: 'Ayah mengambil sisa harta sebagai Ashabah bin Nafs (2/3 dari sisa). Bagian Ayah tetap 2x bagian Ibu.',
        dalil: 'Hadits Bukhari-Muslim tentang Ashabah'
      };
      return finalizeResult(heirs, solutions, 6, 'Gharawain (Umariyatayn)', false, false);
    } else {
      solutions['istri'] = {
        portion: '1/4',
        share: 1,
        note: 'Mendapat 1/4 karena mayit tidak memiliki anak/cucu.',
        dalil: 'QS. An-Nisa: 12'
      };
      solutions['ibu'] = {
        portion: '1/3 Sisa',
        share: 1,
        note: 'Kasus Gharawain: Ibu mendapat 1/3 dari SISA (Tsulutsul Baqi) setelah bagian Istri diambil.',
        dalil: 'Fatwa Khalifah Umar bin Khathab & Ijma Sahabat'
      };
      solutions['ayah'] = {
        portion: 'Ashabah bin Nafs',
        share: 2,
        note: 'Ayah mengambil sisa harta sebagai Ashabah bin Nafs (2 bagian). Bagian Ayah tetap 2x bagian Ibu.',
        dalil: 'Hadits Bukhari-Muslim tentang Ashabah'
      };
      return finalizeResult(heirs, solutions, 4, 'Gharawain (Umariyatayn)', false, false);
    }
  }

  // B. MUSYARRAKAH (Himyariyyah)
  const isMusyarrakah = (deceasedGender === 'F' || count('suami') === 1) &&
    (hasIbu || count('nenek') > 0) &&
    countSaudaraSeibu >= 2 &&
    countSaudaraKandungLaki >= 1 &&
    !hasFuru && !hasAyah && !hasKakek;

  if (forcedSpecialCase === 'musyarrakah' || isMusyarrakah) {
    solutions['suami'] = { portion: '1/2', share: 3, note: 'Mendapat 1/2 karena tidak ada anak/cucu.' };
    if (hasIbu) solutions['ibu'] = { portion: '1/6', share: 1, note: 'Mendapat 1/6 karena ada jama\'ah ikhwah (2+ saudara).' };
    if (count('nenek') > 0) solutions['nenek'] = { portion: hasIbu ? 'Mahjub' : '1/6', share: hasIbu ? 0 : 1, note: hasIbu ? 'Terhijab oleh Ibu.' : 'Mendapat 1/6.' };
    solutions['saudara_seibu'] = {
      portion: '1/3',
      share: 2,
      note: 'Kasus Musyarrakah: Bersekutu dalam porsi 1/3 bersama Saudara Kandung laki-laki/perempuan secara adil rata.'
    };
    solutions['saudara_kandung_laki'] = {
      portion: 'Ashabah bin Nafs',
      share: 0,
      note: 'Kasus Musyarrakah: Karena sisa ashabah habis (3+1+2=6), Saudara Kandung bersekutu dalam porsi 1/3 bersama Saudara Seibu ("Ibu kami sama").'
    };
    if (countSaudaraKandungPerempuan > 0) {
      solutions['saudara_kandung_perempuan'] = {
        portion: 'Ashabah bil Ghair',
        share: 0,
        note: 'Turut bersekutu dalam porsi 1/3 bersama saudara kandung laki-laki dan saudara seibu.'
      };
    }
    return finalizeResult(heirs, solutions, 6, 'Musyarrakah (Himyariyyah)', false, false);
  }

  // C. AKDARIYAH
  const isAkdariyah = (deceasedGender === 'F' || count('suami') === 1) &&
    hasIbu && count('kakek') === 1 &&
    (countSaudaraKandungPerempuan === 1 || countSaudaraSeayahPerempuan === 1) &&
    countSaudaraKandungLaki === 0 && countSaudaraSeayahLaki === 0 && countSaudaraSeibu === 0 &&
    !hasFuru && !hasAyah;

  if (forcedSpecialCase === 'akdariyah' || isAkdariyah) {
    const sdrPrKey = countSaudaraKandungPerempuan === 1 ? 'saudara_kandung_perempuan' : 'saudara_seayah_perempuan';
    solutions['suami'] = { portion: '1/2', share: 9, note: 'Mendapat 1/2 (3/6 ditashih jadi 9/27).' };
    solutions['ibu'] = { portion: '1/3', share: 6, note: 'Mendapat 1/3 (2/6 ditashih jadi 6/27).' };
    solutions['kakek'] = { portion: '1/6', share: 8, note: 'Kasus Akdariyah: Mendapat 1/6, lalu digabung dengan bagian Saudari dan dibagi rasio 2:1 (8 bagian).' };
    solutions[sdrPrKey] = { portion: '1/2', share: 4, note: 'Kasus Akdariyah: Semula diberi 1/2, lalu di-Aul-kan ke 9, ditashih ke 27. Saudari mendapat 4 bagian.' };
    return finalizeResult(heirs, solutions, 27, 'Akdariyah (Aul 6 ke 9 lalu Tashih ke 27)', true, false);
  }

  // 2. KALKULASI REGULER FARAIDH (JUMHUR)

  // A. SUAMI / ISTRI
  if (count('suami') > 0) {
    if (hasFuru) {
      solutions['suami'] = {
        portion: '1/4',
        note: 'Suami mendapat 1/4 karena mayit memiliki keturunan (furu\': anak atau cucu). QS. An-Nisa: 12.'
      };
    } else {
      solutions['suami'] = {
        portion: '1/2',
        note: 'Suami mendapat 1/2 karena mayit tidak memiliki keturunan (furu\'). QS. An-Nisa: 12.'
      };
    }
  }

  if (count('istri') > 0) {
    if (hasFuru) {
      solutions['istri'] = {
        portion: '1/8',
        note: 'Istri mendapat 1/8 (dibagi rata jika lebih dari 1) karena mayit memiliki keturunan. QS. An-Nisa: 12.'
      };
    } else {
      solutions['istri'] = {
        portion: '1/4',
        note: 'Istri mendapat 1/4 (dibagi rata jika lebih dari 1) karena mayit tidak memiliki keturunan. QS. An-Nisa: 12.'
      };
    }
  }

  // B. IBU & NENEK
  if (hasIbu) {
    if (hasFuru || totalSaudara >= 2) {
      solutions['ibu'] = {
        portion: '1/6',
        note: hasFuru
          ? 'Ibu mendapat 1/6 karena mayit meninggalkan keturunan (furu\'). QS. An-Nisa: 11.'
          : 'Ibu mendapat 1/6 karena mayit meninggalkan 2 orang saudara atau lebih (jam\'un minal ikhwah). QS. An-Nisa: 11.'
      };
    } else {
      solutions['ibu'] = {
        portion: '1/3',
        note: 'Ibu mendapat 1/3 karena tidak ada anak/cucu dan saudara kurang dari dua orang. QS. An-Nisa: 11.'
      };
    }
  }

  if (count('nenek') > 0) {
    if (hasIbu) {
      solutions['nenek'] = {
        portion: 'Mahjub',
        note: 'Nenek terhalang (mahjub) sepenuhnya oleh keberadaan Ibu kandung mayit.'
      };
    } else {
      solutions['nenek'] = {
        portion: '1/6',
        note: 'Nenek shahihah mendapat 1/6 karena tidak ada Ibu yang menghalanginya.'
      };
    }
  }

  // C. AYAH & KAKEK
  if (hasAyah) {
    if (hasFuruLaki) {
      solutions['ayah'] = {
        portion: '1/6',
        note: 'Ayah mendapat 1/6 fardh murni (tanpa sisa) karena ada anak/cucu laki-laki pewaris. QS. An-Nisa: 11.'
      };
    } else if (hasFuruPerempuan) {
      solutions['ayah'] = {
        portion: '1/6', // 1/6 fardhan + sisa Ashabah bin Nafs
        note: 'Ayah mendapat 1/6 sebagai fardh dan berhak mengambil sisa sebagai Ashabah bin Nafs jika ada, karena ada anak/cucu perempuan tanpa anak laki-laki.'
      };
    } else {
      solutions['ayah'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Ayah mengambil seluruh sisa harta sebagai Ashabah bin Nafs karena tidak ada keturunan (furu\').'
      };
    }
  }

  if (count('kakek') > 0) {
    if (hasAyah) {
      solutions['kakek'] = {
        portion: 'Mahjub',
        note: 'Kakek terhalang (mahjub) oleh keberadaan Ayah kandung (ushul yang lebih dekat).'
      };
    } else {
      if (hasFuruLaki) {
        solutions['kakek'] = {
          portion: '1/6',
          note: 'Kakek mendapat 1/6 karena ada anak/cucu laki-laki dan tidak ada Ayah.'
        };
      } else if (hasFuruPerempuan) {
        solutions['kakek'] = {
          portion: '1/6',
          note: 'Kakek mendapat 1/6 + mengambil sisa (Ashabah bin Nafs) karena ada keturunan perempuan dan tidak ada Ayah.'
        };
      } else {
        solutions['kakek'] = {
          portion: 'Ashabah bin Nafs',
          note: 'Kakek menempati posisi Ayah (ketika Ayah tiada) mengambil sisa harta sebagai Ashabah bin Nafs.'
        };
      }
    }
  }

  // D. ANAK LAKI-LAKI & ANAK PEREMPUAN
  if (hasAnakLaki) {
    solutions['anak_laki'] = {
      portion: 'Ashabah bin Nafs',
      note: 'Anak laki-laki adalah Ashabah bin Nafs terkuat, mengambil sisa harta setelah ashabul furudh. HR. Bukhari-Muslim.'
    };
    if (hasAnakPerempuan) {
      solutions['anak_perempuan'] = {
        portion: 'Ashabah bil Ghair',
        note: 'Anak perempuan menjadi Ashabah bil Ghair karena ditarik oleh saudara laki-lakinya (rasio 2 bagian laki-laki : 1 bagian perempuan). QS. An-Nisa: 11.'
      };
    }
  } else if (hasAnakPerempuan) {
    if (count('anak_perempuan') === 1) {
      solutions['anak_perempuan'] = {
        portion: '1/2',
        note: '1 anak perempuan tunggal (tanpa anak laki-laki) mendapat 1/2. QS. An-Nisa: 11.'
      };
    } else {
      solutions['anak_perempuan'] = {
        portion: '2/3',
        note: '2 anak perempuan atau lebih (tanpa anak laki-laki) bersekutu dalam 2/3 harta. QS. An-Nisa: 11.'
      };
    }
  }

  // E. CUCU LAKI-LAKI & CUCU PEREMPUAN
  if (count('cucu_laki') > 0) {
    if (hasAnakLaki) {
      solutions['cucu_laki'] = {
        portion: 'Mahjub',
        note: 'Cucu laki-laki terhalang (mahjub) oleh anak laki-laki kandung.'
      };
    } else {
      solutions['cucu_laki'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Cucu laki-laki menjadi Ashabah bin Nafs menggantikan posisi anak laki-laki yang tidak ada.'
      };
    }
  }

  if (count('cucu_perempuan') > 0) {
    if (hasAnakLaki) {
      solutions['cucu_perempuan'] = {
        portion: 'Mahjub',
        note: 'Cucu perempuan terhalang (mahjub) oleh anak laki-laki kandung.'
      };
    } else if (hasCucuLaki) {
      solutions['cucu_perempuan'] = {
        portion: 'Ashabah bil Ghair',
        note: 'Cucu perempuan ditarik menjadi Ashabah bil Ghair bersama cucu laki-laki (al-qarib al-mubarak).'
      };
    } else if (count('anak_perempuan') >= 2) {
      solutions['cucu_perempuan'] = {
        portion: 'Mahjub',
        note: 'Cucu perempuan gugur (mahjub) karena kuota 2/3 telah dihabiskan oleh 2+ anak perempuan, dan tidak ada cucu laki-laki yang meng-ashabahkan.'
      };
    } else if (count('anak_perempuan') === 1) {
      solutions['cucu_perempuan'] = {
        portion: '1/6',
        note: 'Cucu perempuan mendapat 1/6 sebagai penyempurna dua pertiga (Takmilah ats-Tsulutsain) bersama 1 anak perempuan.'
      };
    } else {
      if (count('cucu_perempuan') === 1) {
        solutions['cucu_perempuan'] = {
          portion: '1/2',
          note: 'Cucu perempuan tunggal (tanpa anak kandung) mendapat 1/2.'
        };
      } else {
        solutions['cucu_perempuan'] = {
          portion: '2/3',
          note: '2+ cucu perempuan (tanpa anak kandung) berbagi 2/3.'
        };
      }
    }
  }

  // F. SAUDARA SEIBU
  if (countSaudaraSeibu > 0) {
    if (hasFuru || hasAyah || hasKakek) {
      solutions['saudara_seibu'] = {
        portion: 'Mahjub',
        note: 'Saudara/i seibu terhalang (mahjub) oleh adanya keturunan (furu\': anak/cucu) atau ushul laki-laki (Ayah/Kakek).'
      };
    } else {
      if (countSaudaraSeibu === 1) {
        solutions['saudara_seibu'] = {
          portion: '1/6',
          note: '1 orang saudara/i seibu mendapat 1/6 (laki-laki dan perempuan sama rata). QS. An-Nisa: 12.'
        };
      } else {
        solutions['saudara_seibu'] = {
          portion: '1/3',
          note: '2 orang atau lebih saudara/i seibu bersekutu dalam 1/3 (laki-laki dan perempuan sama rata). QS. An-Nisa: 12.'
        };
      }
    }
  }

  // G. SAUDARA KANDUNG (Laki-laki & Perempuan)
  const mahjubSaudaraKandung = hasAyah || hasFuruLaki;

  let isSdriKandungAshabahMaalGhair = false;
  if (!mahjubSaudaraKandung && countSaudaraKandungPerempuan > 0 && hasFuruPerempuan && countSaudaraKandungLaki === 0) {
    isSdriKandungAshabahMaalGhair = true;
  }

  if (countSaudaraKandungLaki > 0) {
    if (mahjubSaudaraKandung) {
      solutions['saudara_kandung_laki'] = {
        portion: 'Mahjub',
        note: 'Saudara laki-laki kandung terhalang (mahjub) oleh Ayah atau keturunan laki-laki (anak/cucu laki-laki).'
      };
    } else {
      solutions['saudara_kandung_laki'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Saudara laki-laki kandung adalah Ashabah bin Nafs.'
      };
    }
  }

  if (countSaudaraKandungPerempuan > 0) {
    if (mahjubSaudaraKandung) {
      solutions['saudara_kandung_perempuan'] = {
        portion: 'Mahjub',
        note: 'Saudara perempuan kandung terhalang (mahjub) oleh Ayah atau keturunan laki-laki (anak/cucu laki-laki).'
      };
    } else if (countSaudaraKandungLaki > 0) {
      solutions['saudara_kandung_perempuan'] = {
        portion: 'Ashabah bil Ghair',
        note: 'Saudara perempuan kandung menjadi Ashabah bil Ghair bersama saudara laki-laki kandung (rasio 2:1). QS. An-Nisa: 176.'
      };
    } else if (isSdriKandungAshabahMaalGhair) {
      solutions['saudara_kandung_perempuan'] = {
        portion: 'Ashabah ma\'al Ghair',
        note: 'Saudara perempuan kandung menjadi Ashabah ma\'al Ghair bersama anak/cucu perempuan ("Jadikanlah saudari-saudari bersama anak-anak perempuan sebagai ashabah"). HR. Bukhari.'
      };
    } else {
      if (countSaudaraKandungPerempuan === 1) {
        solutions['saudara_kandung_perempuan'] = {
          portion: '1/2',
          note: 'Saudara perempuan kandung tunggal mendapat 1/2 karena tidak ada yang meng-ashabahkan atau menghalangi. QS. An-Nisa: 176.'
        };
      } else {
        solutions['saudara_kandung_perempuan'] = {
          portion: '2/3',
          note: '2 atau lebih saudara perempuan kandung bersekutu dalam 2/3. QS. An-Nisa: 176.'
        };
      }
    }
  }

  // H. SAUDARA SEAYAH (Laki-laki & Perempuan)
  const mahjubSaudaraSeayah = mahjubSaudaraKandung || (countSaudaraKandungLaki > 0) || isSdriKandungAshabahMaalGhair;

  let isSdriSeayahAshabahMaalGhair = false;
  if (!mahjubSaudaraSeayah && countSaudaraSeayahPerempuan > 0 && hasFuruPerempuan && countSaudaraSeayahLaki === 0 && countSaudaraKandungPerempuan === 0) {
    isSdriSeayahAshabahMaalGhair = true;
  }

  if (countSaudaraSeayahLaki > 0) {
    if (mahjubSaudaraSeayah) {
      solutions['saudara_seayah_laki'] = {
        portion: 'Mahjub',
        note: 'Saudara laki-laki seayah terhalang (mahjub) oleh Ayah/furu\' laki-laki atau Saudara kandung laki-laki / saudari kandung yang jadi ashabah ma\'al ghair.'
      };
    } else {
      solutions['saudara_seayah_laki'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Saudara laki-laki seayah menjadi Ashabah bin Nafs karena tidak ada saudara kandung.'
      };
    }
  }

  if (countSaudaraSeayahPerempuan > 0) {
    if (mahjubSaudaraSeayah) {
      solutions['saudara_seayah_perempuan'] = {
        portion: 'Mahjub',
        note: 'Saudara perempuan seayah terhalang (mahjub) oleh ushul/furu\' laki-laki atau saudara/i kandung yang lebih dekat.'
      };
    } else if (countSaudaraSeayahLaki > 0) {
      solutions['saudara_seayah_perempuan'] = {
        portion: 'Ashabah bil Ghair',
        note: 'Saudara perempuan seayah menjadi Ashabah bil Ghair bersama saudara laki-laki seayah (rasio 2:1).'
      };
    } else if (isSdriSeayahAshabahMaalGhair) {
      solutions['saudara_seayah_perempuan'] = {
        portion: 'Ashabah ma\'al Ghair',
        note: 'Saudara perempuan seayah menjadi Ashabah ma\'al Ghair bersama anak/cucu perempuan (karena tidak ada saudara/i kandung).'
      };
    } else if (countSaudaraKandungPerempuan >= 2) {
      solutions['saudara_seayah_perempuan'] = {
        portion: 'Mahjub',
        note: 'Saudara perempuan seayah gugur (mahjub) karena kuota 2/3 telah dihabiskan oleh 2+ saudari kandung, tanpa adanya saudara laki-laki seayah.'
      };
    } else if (countSaudaraKandungPerempuan === 1) {
      solutions['saudara_seayah_perempuan'] = {
        portion: '1/6',
        note: 'Saudara perempuan seayah mendapat 1/6 sebagai Takmilah ats-Tsulutsain (penyempurna 2/3) bersama 1 saudari kandung.'
      };
    } else {
      if (countSaudaraSeayahPerempuan === 1) {
        solutions['saudara_seayah_perempuan'] = {
          portion: '1/2',
          note: 'Saudara perempuan seayah tunggal mendapat 1/2.'
        };
      } else {
        solutions['saudara_seayah_perempuan'] = {
          portion: '2/3',
          note: '2+ saudara perempuan seayah bersekutu dalam 2/3.'
        };
      }
    }
  }

  // I. ANAK SAUDARA KANDUNG LAKI-LAKI (Keponakan)
  if (count('anak_saudara_kandung_laki') > 0) {
    const mahjubKeponakan = mahjubSaudaraSeayah || (countSaudaraSeayahLaki > 0);
    if (mahjubKeponakan) {
      solutions['anak_saudara_kandung_laki'] = {
        portion: 'Mahjub',
        note: 'Keponakan laki-laki terhalang (mahjub) oleh kerabat laki-laki yang lebih dekat (Ushul, Furu\', Saudara Kandung / Seayah).'
      };
    } else {
      solutions['anak_saudara_kandung_laki'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Anak laki-laki saudara kandung menjadi Ashabah bin Nafs.'
      };
    }
  }

  // J. PAMAN KANDUNG & PAMAN SEAYAH
  const mahjubPaman = mahjubSaudaraSeayah || (countSaudaraSeayahLaki > 0) || (count('anak_saudara_kandung_laki') > 0);

  if (count('paman_kandung') > 0) {
    if (mahjubPaman) {
      solutions['paman_kandung'] = {
        portion: 'Mahjub',
        note: 'Paman kandung terhalang (mahjub) oleh kerabat yang derajatnya lebih dekat (Ushul, Furu\', Saudara, atau Keponakan laki-laki).'
      };
    } else {
      solutions['paman_kandung'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Paman kandung menjadi Ashabah bin Nafs mengambil sisa harta.'
      };
    }
  }

  if (count('paman_seayah') > 0) {
    const mahjubPamanSeayah = mahjubPaman || (count('paman_kandung') > 0);
    if (mahjubPamanSeayah) {
      solutions['paman_seayah'] = {
        portion: 'Mahjub',
        note: 'Paman seayah terhalang (mahjub) oleh Paman kandung atau kerabat yang lebih utama.'
      };
    } else {
      solutions['paman_seayah'] = {
        portion: 'Ashabah bin Nafs',
        note: 'Paman seayah menjadi Ashabah bin Nafs.'
      };
    }
  }

  // 3. KALKULASI ASAL MASALAH (TASHILUL ASHL), AUL, ATAU RADD
  return calculateAsalMasalahAndShares(heirs, solutions);
}

/**
 * Hitung Asal Masalah KPK, Saham Fardh, Aul atau Radd
 */
function calculateAsalMasalahAndShares(heirs, solutions) {
  const denominators = [];
  let hasAshabah = false;

  heirs.forEach(h => {
    const sol = solutions[h.heirId];
    if (sol) {
      if (isAshabah(sol.portion)) {
        hasAshabah = true;
      } else if (sol.portion !== 'Mahjub') {
        const denom = getDenominator(sol.portion);
        if (denom) denominators.push(denom);
      }
    }
  });

  // Jika tidak ada fardh sama sekali (hanya ashabah)
  let baseAsalMasalah = denominators.length > 0 ? lcmArray(denominators) : 1;

  // Hitung saham tiap ahli waris pada baseAsalMasalah
  let totalFardhShares = 0;
  heirs.forEach(h => {
    const sol = solutions[h.heirId];
    if (sol && !isAshabah(sol.portion) && sol.portion !== 'Mahjub') {
      const denom = getDenominator(sol.portion);
      let share = 0;
      if (sol.portion === '2/3') {
        share = (baseAsalMasalah * 2) / 3;
      } else if (sol.portion === '1/3 Sisa') {
        share = Math.floor(baseAsalMasalah / 6);
      } else {
        share = baseAsalMasalah / denom;
      }
      sol.share = share;
      totalFardhShares += share;
    }
  });

  const remainder = baseAsalMasalah - totalFardhShares;
  let finalAsalMasalah = baseAsalMasalah;
  let isAul = false;
  let isRadd = false;
  let caseTitle = 'Standar';

  if (totalFardhShares > baseAsalMasalah) {
    // KASUS AUL
    isAul = true;
    finalAsalMasalah = totalFardhShares;
    caseTitle = `Kasus 'Aul (${baseAsalMasalah} menjadi ${finalAsalMasalah})`;
    heirs.forEach(h => {
      const sol = solutions[h.heirId];
      if (sol && isAshabah(sol.portion)) {
        sol.share = 0;
        sol.note += ' (Habis karena terjadi Aul, tidak ada sisa harta).';
      }
    });
  } else if (remainder > 0 && hasAshabah) {
    // Sisa diberikan kepada Ashabah
    heirs.forEach(h => {
      const sol = solutions[h.heirId];
      if (sol && isAshabah(sol.portion)) {
        sol.share = remainder;
      }
    });
  } else if (remainder > 0 && !hasAshabah) {
    // KASUS RADD
    isRadd = true;
    caseTitle = `Kasus Radd (Sisa ${remainder} saham dikembalikan ke ahli waris)`;
  }

  return finalizeResult(heirs, solutions, finalAsalMasalah, caseTitle, isAul, isRadd, baseAsalMasalah);
}

function finalizeResult(heirs, solutions, asalMasalah, caseTitle, isAul, isRadd, baseAsalMasalah = asalMasalah) {
  const result = {
    asalMasalah,
    baseAsalMasalah,
    caseTitle,
    isAul,
    isRadd,
    heirResults: heirs.map(h => {
      const sol = solutions[h.heirId] || { portion: 'Mahjub', share: 0, note: 'Tidak terdaftar' };
      return {
        heirId: h.heirId,
        count: h.count,
        portion: sol.portion,
        share: sol.share !== undefined ? sol.share : 0,
        note: sol.note || '',
        dalil: sol.dalil || null
      };
    })
  };
  return result;
}

/**
 * BANK SOAL & GENERATOR KASUS
 */
export const CURATED_CASES = {
  level1: [
    {
      id: 'L1-01',
      title: 'Keluarga Inti Sederhana 1',
      deceasedGender: 'M',
      deceasedName: 'Pak Ahmad',
      deceasedTitle: 'Seorang suami',
      story: 'Pak Ahmad meninggal dunia. Beliau meninggalkan ahli waris: seorang Istri, 1 Anak Laki-laki, dan 1 Anak Perempuan.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'anak_laki', count: 1 },
        { heirId: 'anak_perempuan', count: 1 },
      ],
      level: 1,
    },
    {
      id: 'L1-02',
      title: 'Pewaris Wanita Tanpa Keturunan',
      deceasedGender: 'F',
      deceasedName: 'Ibu Fatimah',
      deceasedTitle: 'Seorang istri',
      story: 'Ibu Fatimah wafat tanpa memiliki anak/cucu. Ahli waris yang ada: Suami, Ayah kandung, dan Ibu kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'ayah', count: 1 },
      ],
      level: 1,
      forcedSpecialCase: 'gharawain',
    },
    {
      id: 'L1-03',
      title: 'Ibu dan 2 Anak Perempuan',
      deceasedGender: 'M',
      deceasedName: 'Pak Hasan',
      deceasedTitle: 'Seorang ayah',
      story: 'Pak Hasan meninggal dunia. Beliau meninggalkan: Istri, Ibu, dan 2 Anak Perempuan.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'anak_perempuan', count: 2 },
      ],
      level: 1,
    },
    {
      id: 'L1-04',
      title: 'Anak Perempuan Tunggal & Ayah',
      deceasedGender: 'F',
      deceasedName: 'Ibu Sarah',
      deceasedTitle: 'Seorang wanita',
      story: 'Ibu Sarah wafat meninggalkan Suami, 1 Anak Perempuan, dan Ayah kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'anak_perempuan', count: 1 },
        { heirId: 'ayah', count: 1 },
      ],
      level: 1,
    },
    {
      id: 'L1-05',
      title: 'Ayah, Ibu & Anak Laki-laki',
      deceasedGender: 'M',
      deceasedName: 'Pak Khalid',
      deceasedTitle: 'Seorang pria',
      story: 'Pak Khalid wafat meninggalkan Istri, Ayah, Ibu, dan 2 Anak Laki-laki.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'ayah', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'anak_laki', count: 2 },
      ],
      level: 1,
    },
  ],
  level2: [
    {
      id: 'L2-01',
      title: 'Anak Laki-laki Menghalangi Paman',
      deceasedGender: 'F',
      deceasedName: 'Ibu Aminah',
      deceasedTitle: 'Seorang istri',
      story: 'Ibu Aminah wafat. Ahli waris yang ditinggalkan: Suami, 2 Anak Laki-laki, 1 Saudara Laki-laki Kandung, dan 1 Paman Kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'anak_laki', count: 2 },
        { heirId: 'saudara_kandung_laki', count: 1 },
        { heirId: 'paman_kandung', count: 1 },
      ],
      level: 2,
    },
    {
      id: 'L2-02',
      title: 'Cucu Perempuan & Anak Perempuan',
      deceasedGender: 'M',
      deceasedName: 'Pak Usman',
      deceasedTitle: 'Seorang pria',
      story: 'Pak Usman wafat meninggalkan Istri, 1 Anak Perempuan, 1 Cucu Perempuan (dari anak laki-laki yang sudah wafat duluan), dan 1 Saudara Laki-laki Kandung.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'anak_perempuan', count: 1 },
        { heirId: 'cucu_perempuan', count: 1 },
        { heirId: 'saudara_kandung_laki', count: 1 },
      ],
      level: 2,
    },
    {
      id: 'L2-03',
      title: 'Ibu Menghijab Nenek',
      deceasedGender: 'M',
      deceasedName: 'Pak Ridwan',
      deceasedTitle: 'Seorang pria',
      story: 'Pak Ridwan wafat meninggalkan Istri, Ibu, Nenek Shahihah, dan 1 Anak Laki-laki.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'nenek', count: 1 },
        { heirId: 'anak_laki', count: 1 },
      ],
      level: 2,
    },
    {
      id: 'L2-04',
      title: 'Saudari Kandung Jadi Ashabah ma\'al Ghair',
      deceasedGender: 'F',
      deceasedName: 'Ibu Maryam',
      deceasedTitle: 'Seorang wanita',
      story: 'Ibu Maryam wafat meninggalkan Suami, 2 Anak Perempuan, 1 Saudara Perempuan Kandung, dan 1 Paman Kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'anak_perempuan', count: 2 },
        { heirId: 'saudara_kandung_perempuan', count: 1 },
        { heirId: 'paman_kandung', count: 1 },
      ],
      level: 2,
    },
    {
      id: 'L2-05',
      title: 'Kakek & Ayah yang Masih Hidup',
      deceasedGender: 'M',
      deceasedName: 'Pak Zaid',
      deceasedTitle: 'Seorang pria',
      story: 'Pak Zaid wafat meninggalkan Ayah, Kakek Shahih, 1 Saudara Seibu, dan 1 Anak Laki-laki.',
      heirs: [
        { heirId: 'ayah', count: 1 },
        { heirId: 'kakek', count: 1 },
        { heirId: 'saudara_seibu', count: 1 },
        { heirId: 'anak_laki', count: 1 },
      ],
      level: 2,
    },
  ],
  level3: [
    {
      id: 'L3-01',
      title: 'Kasus Terkenal: Gharawain / Umariyatayn (Pria)',
      deceasedGender: 'M',
      deceasedName: 'Pak Ibrahim',
      deceasedTitle: 'Seorang suami',
      story: 'Pak Ibrahim wafat tanpa anak/cucu dan tanpa saudara. Ahli waris yang ditinggalkan: Istri, Ibu, dan Ayah kandung.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'ayah', count: 1 },
      ],
      level: 3,
      forcedSpecialCase: 'gharawain',
    },
    {
      id: 'L3-02',
      title: 'Kasus Terkenal: Al-Musyarrakah (Himyariyyah)',
      deceasedGender: 'F',
      deceasedName: 'Ibu Khadijah',
      deceasedTitle: 'Seorang istri',
      story: 'Ibu Khadijah wafat meninggalkan Suami, Ibu, 2 Saudara Seibu, dan 1 Saudara Laki-laki Kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'saudara_seibu', count: 2 },
        { heirId: 'saudara_kandung_laki', count: 1 },
      ],
      level: 3,
      forcedSpecialCase: 'musyarrakah',
    },
    {
      id: 'L3-03',
      title: 'Kasus Terkenal: Al-Akdariyah',
      deceasedGender: 'F',
      deceasedName: 'Ibu Zainab',
      deceasedTitle: 'Seorang wanita',
      story: 'Ibu Zainab wafat meninggalkan Suami, Ibu, Kakek Shahih, dan 1 Saudara Perempuan Kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'ibu', count: 1 },
        { heirId: 'kakek', count: 1 },
        { heirId: 'saudara_kandung_perempuan', count: 1 },
      ],
      level: 3,
      forcedSpecialCase: 'akdariyah',
    },
    {
      id: 'L3-04',
      title: 'Kasus \'Aul 6 Menjadi 7',
      deceasedGender: 'F',
      deceasedName: 'Ibu Aisyah',
      deceasedTitle: 'Seorang istri',
      story: 'Ibu Aisyah wafat meninggalkan Suami dan 2 Saudara Perempuan Kandung.',
      heirs: [
        { heirId: 'suami', count: 1 },
        { heirId: 'saudara_kandung_perempuan', count: 2 },
      ],
      level: 3,
    },
    {
      id: 'L3-05',
      title: 'Kasus \'Aul 24 Menjadi 27 (Al-Mimbariyyah)',
      deceasedGender: 'M',
      deceasedName: 'Pak Ali',
      deceasedTitle: 'Seorang suami',
      story: 'Kasus legendaris Khalifah Ali bin Abi Thalib saat berkhutbah di mimbar: Pak Ali wafat meninggalkan Istri, 2 Anak Perempuan, Ayah, dan Ibu.',
      heirs: [
        { heirId: 'istri', count: 1 },
        { heirId: 'anak_perempuan', count: 2 },
        { heirId: 'ayah', count: 1 },
        { heirId: 'ibu', count: 1 },
      ],
      level: 3,
    },
  ],
};

/**
 * Generator Soal Acak (RNG) Sesuai Tingkat Level
 */
export function generateRandomCase(level = 1) {
  const curatedList = CURATED_CASES[`level${level}`] || CURATED_CASES.level1;
  const pickCurated = Math.random() < 0.6;

  if (pickCurated && curatedList.length > 0) {
    const rawCase = curatedList[Math.floor(Math.random() * curatedList.length)];
    const solution = solveFaraidhCase(rawCase.deceasedGender, rawCase.heirs, rawCase.forcedSpecialCase);
    return {
      ...rawCase,
      solution
    };
  }

  if (level === 1) {
    return generateDynamicLevel1();
  } else if (level === 2) {
    return generateDynamicLevel2();
  } else {
    const rawCase = curatedList[Math.floor(Math.random() * curatedList.length)];
    return {
      ...rawCase,
      solution: solveFaraidhCase(rawCase.deceasedGender, rawCase.heirs, rawCase.forcedSpecialCase)
    };
  }
}

function generateDynamicLevel1() {
  const isFemaleDeceased = Math.random() > 0.5;
  const deceasedGender = isFemaleDeceased ? 'F' : 'M';
  const deceasedName = isFemaleDeceased ? 'Ibu Halimah' : 'Pak Mansur';
  const deceasedTitle = isFemaleDeceased ? 'Seorang istri' : 'Seorang suami';

  const heirs = [];
  if (isFemaleDeceased) {
    heirs.push({ heirId: 'suami', count: 1 });
  } else {
    heirs.push({ heirId: 'istri', count: 1 });
  }

  const withChildren = Math.random() > 0.3;
  if (withChildren) {
    const childType = Math.floor(Math.random() * 3);
    if (childType === 0) {
      heirs.push({ heirId: 'anak_laki', count: Math.random() > 0.5 ? 1 : 2 });
    } else if (childType === 1) {
      heirs.push({ heirId: 'anak_perempuan', count: Math.random() > 0.5 ? 1 : 2 });
    } else {
      heirs.push({ heirId: 'anak_laki', count: 1 });
      heirs.push({ heirId: 'anak_perempuan', count: Math.random() > 0.5 ? 1 : 2 });
    }
  }

  if (Math.random() > 0.4) {
    heirs.push({ heirId: 'ibu', count: 1 });
  }
  if (Math.random() > 0.5) {
    heirs.push({ heirId: 'ayah', count: 1 });
  }

  const heirNames = heirs.map(h => `${h.count > 1 ? h.count + ' ' : ''}${HEIR_DEFINITIONS[h.heirId]?.name || h.heirId}`).join(', ');
  const story = `${deceasedName} wafat (${deceasedTitle}). Ahli waris yang ditinggalkan: ${heirNames}.`;

  const solution = solveFaraidhCase(deceasedGender, heirs);

  return {
    id: 'DYN-L1-' + Date.now().toString(36),
    title: 'Kasus Dasar Dinamis',
    deceasedGender,
    deceasedName,
    deceasedTitle,
    story,
    heirs,
    level: 1,
    solution
  };
}

function generateDynamicLevel2() {
  const isFemaleDeceased = Math.random() > 0.5;
  const deceasedGender = isFemaleDeceased ? 'F' : 'M';
  const deceasedName = isFemaleDeceased ? 'Ibu Salma' : 'Pak Yahya';
  const deceasedTitle = isFemaleDeceased ? 'Seorang wanita' : 'Seorang pria';

  const heirs = [];
  if (isFemaleDeceased) {
    heirs.push({ heirId: 'suami', count: 1 });
  } else {
    heirs.push({ heirId: 'istri', count: 1 });
  }

  const scenario = Math.floor(Math.random() * 4);
  if (scenario === 0) {
    heirs.push({ heirId: 'anak_laki', count: 1 });
    heirs.push({ heirId: 'cucu_laki', count: 1 });
    heirs.push({ heirId: 'saudara_kandung_laki', count: 1 });
    heirs.push({ heirId: 'paman_kandung', count: 1 });
  } else if (scenario === 1) {
    heirs.push({ heirId: 'anak_perempuan', count: 2 });
    heirs.push({ heirId: 'cucu_perempuan', count: 1 });
    heirs.push({ heirId: 'paman_kandung', count: 1 });
  } else if (scenario === 2) {
    heirs.push({ heirId: 'ayah', count: 1 });
    heirs.push({ heirId: 'kakek', count: 1 });
    heirs.push({ heirId: 'saudara_seibu', count: 2 });
  } else {
    heirs.push({ heirId: 'ibu', count: 1 });
    heirs.push({ heirId: 'nenek', count: 1 });
    heirs.push({ heirId: 'saudara_kandung_laki', count: 1 });
  }

  const heirNames = heirs.map(h => `${h.count > 1 ? h.count + ' ' : ''}${HEIR_DEFINITIONS[h.heirId]?.name || h.heirId}`).join(', ');
  const story = `${deceasedName} wafat. Ahli waris yang ditinggalkan: ${heirNames}. Cermati siapa yang mahjub dan berapa asal masalahnya!`;

  const solution = solveFaraidhCase(deceasedGender, heirs);

  return {
    id: 'DYN-L2-' + Date.now().toString(36),
    title: 'Kasus Hijab & Mahjub',
    deceasedGender,
    deceasedName,
    deceasedTitle,
    story,
    heirs,
    level: 2,
    solution
  };
}
