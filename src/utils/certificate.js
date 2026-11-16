/**
 * CERTIFICATE & BADGE GENERATOR
 * Merender E-Sertifikat Digital Akademi Faraidh beresolusi tinggi (1200x800)
 * Kerapihan tipografi, proporsi estetis, dan watermark resmi Tim Syariah Waris Indonesia.
 */

/**
 * Menghitung Predikat Kelulusan Berdasarkan Pencapaian Real-time
 * @param {number} score Skor akumulasi
 * @param {number} streak Rekor streak tanpa salah (target sempurna = 10)
 */
export function getFaraidhGrade(score = 0, streak = 0) {
  const numScore = typeof score === 'number' ? score : parseInt(score, 10) || 0;
  const numStreak = typeof streak === 'number' ? streak : parseInt(streak, 10) || 0;

  if (numStreak >= 10) {
    return {
      grade: 'MUMTAZ',
      arabic: 'ممتاز',
      title: 'MUMTAZ (ISTIMEWA - 10 STREAK SEMPURNA)',
      badge: '★ MUMTAZ (10 STREAK SEMPURNA)',
      desc: 'Telah menyelesaikan tantangan 10 kasus beruntun dengan akurasi 100% sempurna',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      strokeColor: '#34d399',
      isPerfect: true,
    };
  } else if (numStreak >= 7 || numScore >= 700) {
    return {
      grade: 'JAYYID JIDDAN',
      arabic: 'جيد جدا',
      title: `JAYYID JIDDAN (${numStreak} KASUS BERUNTUN)`,
      badge: `★ JAYYID JIDDAN (${numStreak} STREAK)`,
      desc: `Berhasil menyelesaikan ${numStreak} kasus beruntun dengan ketepatan tinggi`,
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      strokeColor: '#60a5fa',
      isPerfect: false,
    };
  } else if (numStreak >= 4 || numScore >= 400) {
    return {
      grade: 'JAYYID',
      arabic: 'جيد',
      title: `JAYYID (${numStreak} KASUS BERUNTUN)`,
      badge: `★ JAYYID (${numStreak} STREAK)`,
      desc: `Berhasil menyelesaikan ${numStreak} kasus dengan pemahaman baik`,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      strokeColor: '#fbbf24',
      isPerfect: false,
    };
  } else if (numStreak >= 1 || numScore >= 100) {
    return {
      grade: 'MAQBUL',
      arabic: 'مقبول',
      badge: `★ MAQBUL (${numStreak} KASUS)`,
      title: `MAQBUL (${numStreak} KASUS TERSELESAIKAN)`,
      desc: `Telah berhasil menyelesaikan ${numStreak} kasus latihan tahap awal`,
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      strokeColor: '#c084fc',
      isPerfect: false,
    };
  } else {
    return {
      grade: 'IKHTIBAR',
      arabic: 'اختبار',
      title: 'IKHTIBAR (DALAM TAHAP LATIHAN)',
      badge: '★ TAHAP LATIHAN (0 KASUS)',
      desc: 'Sedang memulai rangkaian praktikum simulasi kasus Faraidh',
      badgeColor: 'text-slate-400 bg-slate-800 border-slate-700',
      strokeColor: '#94a3b8',
      isPerfect: false,
    };
  }
}

export function drawCertificate(canvas, { name, score = 0, streak = 0, levelTitle, dateStr, serialNumber }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = 1200;
  const height = 800;

  const numScore = typeof score === 'number' ? score : parseInt(score, 10) || 0;
  const numStreak = typeof streak === 'number' ? streak : parseInt(streak, 10) || 0;
  const gradeInfo = getFaraidhGrade(numScore, numStreak);

  canvas.width = width;
  canvas.height = height;

  // 1. Background Gradient (Deep Majestic Emerald to Dark Forest Slate)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#022c22');
  bgGrad.addColorStop(0.35, '#064e3b');
  bgGrad.addColorStop(0.7, '#042f2e');
  bgGrad.addColorStop(1, '#021e17');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Background Subtle Islamic Geometric Star Grid
  ctx.save();
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
  ctx.lineWidth = 1;
  const step = 48;
  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x + height, 0);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Central Authentic Rosette Watermark (Tim Syariah Waris Indonesia)
  ctx.save();
  ctx.translate(width / 2, height / 2 + 10);
  ctx.rotate(-15 * Math.PI / 180);

  // Watermark Seal Outline
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.035)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 180, 0, Math.PI * 2);
  ctx.stroke();

  // 8-Point Star in Watermark
  for (let i = 0; i < 8; i++) {
    ctx.rotate((45 * Math.PI) / 180);
    ctx.strokeRect(-90, -90, 180, 180);
  }

  // Watermark text
  ctx.fillStyle = 'rgba(251, 191, 36, 0.045)';
  ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TIM SYARIAH WARIS INDONESIA', 0, -20);
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('• AKADEMI FARAIDH OFFICIAL •', 0, 25);
  ctx.restore();

  // 4. Double Ornate Golden Borders
  // Outer Border
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 7;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Inner Fine Gold Border
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.strokeRect(38, 38, width - 76, height - 76);

  // Inner Accent Guide Border
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, width - 92, height - 92);

  // 5. Corner Cornerpieces & Rosette Accents
  const cornerCoords = [
    [48, 48],
    [width - 48, 48],
    [48, height - 48],
    [width - 48, height - 48],
  ];

  cornerCoords.forEach(([cx, cy]) => {
    ctx.save();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.stroke();

    // Corner L-shapes
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    const dx = cx < width / 2 ? 22 : -22;
    const dy = cy < height / 2 ? 22 : -22;
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy);
    ctx.lineTo(cx + dx, cy + dy);
    ctx.lineTo(cx + dx, cy);
    ctx.stroke();
    ctx.restore();
  });

  // 6. Header Arabic Basmalah
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 30px Amiri, "Traditional Arabic", "Scheherazade New", serif';
  ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', width / 2, 88);

  // 7. Institution & Organizer Subtitle (by Tim Syariah Waris Indonesia)
  ctx.fillStyle = '#34d399';
  ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('AKADEMI FARAIDH INDONESIA', width / 2, 122);

  ctx.fillStyle = '#fde68a';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('by Tim Syariah Waris Indonesia', width / 2, 142);

  // 8. Main Certificate Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('SERTIFIKAT KELULUSAN PRAKTIKUM FARAIDH', width / 2, 192);

  // Serial verification code
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText(`Nomor Registrasi: ${serialNumber || 'AF-SWI-2026-001'}`, width / 2, 218);

  // 9. Golden Flourish Divider Bar
  const divW = 320;
  const divGrad = ctx.createLinearGradient(width / 2 - divW, 0, width / 2 + divW, 0);
  divGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
  divGrad.addColorStop(0.5, '#fbbf24');
  divGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - divW, 235);
  ctx.lineTo(width / 2 + divW, 235);
  ctx.stroke();

  // Small diamond in center of divider
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(width / 2, 230);
  ctx.lineTo(width / 2 + 5, 235);
  ctx.lineTo(width / 2, 240);
  ctx.lineTo(width / 2 - 5, 235);
  ctx.closePath();
  ctx.fill();

  // 10. Recipient Subtitle
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '0.2px';
  ctx.fillText('Diberikan dengan penuh apresiasi dan kehormatan kepada:', width / 2, 275);

  // 11. Recipient Name (Majestic, Centered, Flawless Hierarchy)
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 42px "Plus Jakarta Sans", Georgia, serif';
  ctx.letterSpacing = '0.5px';
  const displayRecipient = (name && name.trim()) ? name.trim() : 'Peserta Akademi Faraidh';
  ctx.fillText(displayRecipient, width / 2, 335);

  // Clean Gold Underline beneath recipient name
  const nameWidth = Math.min(ctx.measureText(displayRecipient).width + 60, 680);
  const nameUnderlineGrad = ctx.createLinearGradient(width / 2 - nameWidth / 2, 0, width / 2 + nameWidth / 2, 0);
  nameUnderlineGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
  nameUnderlineGrad.addColorStop(0.5, '#f59e0b');
  nameUnderlineGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.strokeStyle = nameUnderlineGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 350);
  ctx.lineTo(width / 2 + nameWidth / 2, 350);
  ctx.stroke();

  // 12. Achievement Description (Menggunakan Predikat Nyata Sesuai Skor & Streak)
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Telah berhasil menyelesaikan rangkaian simulasi latihan Faraidh interaktif', width / 2, 385);

  ctx.font = '700 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = gradeInfo.strokeColor;
  ctx.fillText(`dengan predikat kelulusan: ${gradeInfo.title}`, width / 2, 412);

  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`pada tingkat keahlian: ${levelTitle || 'Level 1: Dasar'}`, width / 2, 438);

  // 13. Metrics Badge Box (Enter Streak di bawah Skor Akumulasi & Luas Nyaman Bebas Tabrakan)
  const boxW = 460;
  const boxH = 92;
  const boxX = (width - boxW) / 2;
  const boxY = 472;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, boxX, boxY, boxW, boxH, 14, true, true);

  // Baris 1: Skor Akumulasi Aktual
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#10b981';
  ctx.fillText(`★ SKOR AKUMULASI: ${numScore} PTS`, width / 2, boxY + 36);

  // Garis pemisah halus di dalam kotak
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(boxX + 40, boxY + 49);
  ctx.lineTo(boxX + boxW - 40, boxY + 49);
  ctx.stroke();

  // Baris 2 (Enter): Streak Aktual
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#fbbf24';
  const streakText = numStreak >= 10
    ? '🔥 STREAK: 10 / 10 SEMPURNA (100% AKURASI)'
    : `🔥 STREAK: ${numStreak} / 10 KASUS TANPA SALAH`;
  ctx.fillText(streakText, width / 2, boxY + 74);

  // 14. Footer / Signatures & Institution Details
  // Left: Date & Accreditation
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Diterbitkan pada: ${dateStr || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 105, 682);
  ctx.fillText('Lembaga Penguji: Akademi Faraidh Indonesia', 105, 706);
  ctx.fillStyle = '#34d399';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✓ Terverifikasi Standar Fiqih Mawarith Ahlussunnah', 105, 730);

  // Right: Signature (Tim Syariah Waris Indonesia)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'italic bold 24px "Plus Jakarta Sans", serif';
  ctx.fillText('Tim Syariah Waris Indonesia', width - 105, 680);

  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 340, 695);
  ctx.lineTo(width - 105, 695);
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Dewan Penguji & Verifikator Faraidh', width - 105, 718);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Komisi Bimbingan Syariah Waris Indonesia', width - 105, 738);

  // Center Golden Seal
  drawGoldenSeal(ctx, width / 2, 690);
}

function drawGoldenSeal(ctx, x, y) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 46, 0, Math.PI * 2);
  const sealGrad = ctx.createRadialGradient(x, y, 5, x, y, 46);
  sealGrad.addColorStop(0, '#fef3c7');
  sealGrad.addColorStop(0.65, '#f59e0b');
  sealGrad.addColorStop(1, '#92400e');
  ctx.fillStyle = sealGrad;
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Fine inner dotted circle
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(x, y, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Seal Text
  ctx.fillStyle = '#451a03';
  ctx.font = '800 10px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SYARIAH WARIS', x, y - 10);
  ctx.font = '900 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('INDONESIA', x, y + 4);
  ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('★ OFFICIAL ★', x, y + 18);
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
