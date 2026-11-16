import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LevelSelector from './components/LevelSelector';
import CaseCard from './components/CaseCard';
import PortionPalette from './components/PortionPalette';
import HeirCard from './components/HeirCard';
import AsalMasalahSection from './components/AsalMasalahSection';
import FeedbackModal from './components/FeedbackModal';
import CertificateModal from './components/CertificateModal';
import CheatSheetModal from './components/CheatSheetModal';
import CustomCaseModal from './components/CustomCaseModal';
import LeadMagnetBanner from './components/LeadMagnetBanner';

import { generateRandomCase, solveFaraidhCase } from './utils/faraidh-engine';
import { HEIR_DEFINITIONS } from './utils/faraidh-rules';
import { playSuccessSound, playWrongSound, playTapSound, isSoundEnabled, setSoundEnabled } from './utils/audio';

const MAX_HEARTS = 3;

export default function App() {
  // Persistent State
  const [hearts, setHearts] = useState(() => {
    const saved = localStorage.getItem('af_sim_hearts');
    return saved !== null ? parseInt(saved, 10) : MAX_HEARTS;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('af_sim_streak');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('af_sim_score');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [currentLevel, setCurrentLevel] = useState(1);
  const [soundOn, setSoundOn] = useState(true);

  const [totalSolvedInLevel, setTotalSolvedInLevel] = useState(() => {
    const saved = localStorage.getItem('af_sim_solved');
    return saved ? JSON.parse(saved) : { 1: 0, 2: 0, 3: 0 };
  });

  // Current Active Case
  const [caseNumber, setCaseNumber] = useState(1);
  const [currentCase, setCurrentCase] = useState(null);

  // User input states
  const [assignedPortions, setAssignedPortions] = useState({});
  const [selectedPalettePortion, setSelectedPalettePortion] = useState(null);
  const [userAsalMasalah, setUserAsalMasalah] = useState('');
  const [userShares, setUserShares] = useState({});

  // Modals
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    isCorrect: false,
    feedbackData: null,
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Initialize first case
  useEffect(() => {
    loadNewCase(currentLevel);
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('af_sim_hearts', hearts.toString());
    localStorage.setItem('af_sim_streak', streak.toString());
    localStorage.setItem('af_sim_score', score.toString());
    localStorage.setItem('af_sim_solved', JSON.stringify(totalSolvedInLevel));
  }, [hearts, streak, score, totalSolvedInLevel]);

  const loadNewCase = (level) => {
    const newCase = generateRandomCase(level);
    setCurrentCase(newCase);
    setAssignedPortions({});
    setSelectedPalettePortion(null);
    setUserAsalMasalah('');
    setUserShares({});
  };

  const handleSelectLevel = (level) => {
    setCurrentLevel(level);
    loadNewCase(level);
    playTapSound();
  };

  const handleAssignPortion = (heirId, portion) => {
    setAssignedPortions((prev) => {
      const updated = { ...prev };
      if (!portion) {
        delete updated[heirId];
      } else {
        updated[heirId] = portion;
      }
      return updated;
    });
  };

  const handleChangeShare = (heirId, val) => {
    setUserShares((prev) => ({
      ...prev,
      [heirId]: val,
    }));
  };

  // Check if user has assigned portions to all heirs
  const allHeirsAssigned =
    currentCase &&
    currentCase.heirs.length > 0 &&
    currentCase.heirs.every((h) => !!assignedPortions[h.heirId]);

  const canSubmit = allHeirsAssigned && userAsalMasalah.trim() !== '';

  const handleSubmitCheck = () => {
    if (!canSubmit || !currentCase) return;

    const solution = currentCase.solution || solveFaraidhCase(currentCase.deceasedGender, currentCase.heirs, currentCase.forcedSpecialCase);
    const mistakes = [];

    // Validasi Porsi
    solution.heirResults.forEach((expected) => {
      const userPortion = assignedPortions[expected.heirId];
      const def = HEIR_DEFINITIONS[expected.heirId] || { name: expected.heirId };

      let isMatch = userPortion === expected.portion;

      // Fleksibilitas untuk Ayah yang mendapat 1/6 + Ashabah
      if (expected.heirId === 'ayah' && expected.portion === '1/6' && (userPortion === 'Ashabah bin Nafs' || userPortion === 'Ashabah')) {
        // jika ada furu perempuan, ayah dapat 1/6 + ashabah
        const hasFuruPerempuan = currentCase.heirs.some((h) => h.heirId === 'anak_perempuan' || h.heirId === 'cucu_perempuan');
        if (hasFuruPerempuan) isMatch = true;
      }

      if (!isMatch) {
        mistakes.push({
          heirId: expected.heirId,
          name: `${expected.count > 1 ? expected.count + ' ' : ''}${def.name}`,
          userPortion,
          correctPortion: expected.portion,
          reason: expected.note,
        });
      }
    });

    // Validasi Asal Masalah
    const userAsalInt = parseInt(userAsalMasalah, 10);
    const expectedAsal = solution.asalMasalah;
    const baseAsal = solution.baseAsalMasalah || solution.asalMasalah;

    // Terima jika user memasukkan asal masalah akhir ('Aul) atau asal masalah asal sebelum 'Aul
    const isAsalMatch = userAsalInt === expectedAsal || userAsalInt === baseAsal;

    if (!isAsalMatch) {
      mistakes.push({
        heirId: 'asal_masalah',
        name: 'Asal Masalah (أصل المسألة)',
        userPortion: userAsalMasalah,
        correctPortion: expectedAsal.toString(),
        reason: `KPK dari penyebut porsi adalah ${baseAsal}${solution.isAul ? ` yang kemudian di-'Aul-kan menjadi ${expectedAsal}` : ''}.`,
      });
    }

    const isAllCorrect = mistakes.length === 0;

    if (isAllCorrect) {
      playSuccessSound();
      const pointsEarned = 100 + streak * 10;
      const newScore = score + pointsEarned;
      const newStreak = streak + 1;

      setScore(newScore);
      setStreak(newStreak);

      setTotalSolvedInLevel((prev) => ({
        ...prev,
        [currentLevel]: (prev[currentLevel] || 0) + 1,
      }));

      setFeedbackModal({
        isOpen: true,
        isCorrect: true,
        feedbackData: {
          solution,
          mistakes: [],
        },
      });

      // Auto trigger certificate at 10 consecutive wins
      if (newStreak === 10) {
        setTimeout(() => {
          setShowCertificate(true);
        }, 1200);
      }
    } else {
      playWrongSound();
      const newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      setStreak(0);

      setFeedbackModal({
        isOpen: true,
        isCorrect: false,
        feedbackData: {
          solution,
          mistakes,
        },
      });
    }
  };

  const handleNextCase = () => {
    setFeedbackModal({ isOpen: false, isCorrect: false, feedbackData: null });
    setCaseNumber((prev) => prev + 1);
    loadNewCase(currentLevel);
  };

  const handleRetryCase = () => {
    setFeedbackModal({ isOpen: false, isCorrect: false, feedbackData: null });
  };

  const handleRestartGame = () => {
    setHearts(MAX_HEARTS);
    setStreak(0);
    setScore(0);
    setCaseNumber(1);
    setFeedbackModal({ isOpen: false, isCorrect: false, feedbackData: null });
    loadNewCase(currentLevel);
  };

  const handleStartCustomCase = (customCaseObj) => {
    const solution = solveFaraidhCase(customCaseObj.deceasedGender, customCaseObj.heirs);
    setCurrentCase({
      ...customCaseObj,
      solution,
    });
    setAssignedPortions({});
    setSelectedPalettePortion(null);
    setUserAsalMasalah('');
    setUserShares({});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation & Stats Bar */}
      <Header
        hearts={hearts}
        maxHearts={MAX_HEARTS}
        streak={streak}
        score={score}
        currentLevel={currentLevel}
        onOpenCheatSheet={() => setShowCheatSheet(true)}
        onOpenCertificate={() => setShowCertificate(true)}
        onOpenCustomModal={() => setShowCustomModal(true)}
        onResetGame={handleRestartGame}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      <main className="flex-1 w-full py-6">
        {/* Level Selector */}
        <LevelSelector
          currentLevel={currentLevel}
          onSelectLevel={handleSelectLevel}
          totalSolvedInLevel={totalSolvedInLevel}
        />

        {/* Active Case Narration Card */}
        <CaseCard
          currentCase={currentCase}
          caseNumber={caseNumber}
          totalInSession={10}
        />

        {/* Portion Palette (Draggable & Clickable) */}
        <PortionPalette
          selectedPortion={selectedPalettePortion}
          onSelectPortion={setSelectedPalettePortion}
        />

        {/* Heirs Cards Grid (Drop Targets) */}
        {currentCase && (
          <div className="w-full max-w-5xl mx-auto mb-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Langkah 1: Pasangkan Porsi Ahli Waris ({currentCase.heirs.length} Ahli Waris)
              </h3>
              <span className="text-[11px] text-amber-400 font-medium">
                {Object.keys(assignedPortions).length} dari {currentCase.heirs.length} terisi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentCase.heirs.map((heir) => (
                <HeirCard
                  key={heir.heirId}
                  heir={heir}
                  assignedPortion={assignedPortions[heir.heirId]}
                  onAssignPortion={handleAssignPortion}
                  selectedPalettePortion={selectedPalettePortion}
                  isSubmitted={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Asal Masalah & Saham Calculation Section */}
        {currentCase && (
          <AsalMasalahSection
            heirs={currentCase.heirs}
            assignedPortions={assignedPortions}
            userAsalMasalah={userAsalMasalah}
            onChangeAsalMasalah={setUserAsalMasalah}
            userShares={userShares}
            onChangeShare={handleChangeShare}
            onSubmitCheck={handleSubmitCheck}
            canSubmit={canSubmit}
          />
        )}

        {/* Lead Magnet Banner for Akademi Faraidh */}
        <LeadMagnetBanner />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Generator Simulasi Kasus Faraidh • Akademi Faraidh by Tim Syariah Waris Indonesia</p>
          <p className="text-[11px]">Dibuat dengan standar Fiqih Mawarith Ahlussunnah wal Jama'ah</p>
        </div>
      </footer>

      {/* Modals */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        isCorrect={feedbackModal.isCorrect}
        feedbackData={feedbackModal.feedbackData}
        onNextCase={handleNextCase}
        onRetryCase={handleRetryCase}
        onRestartGame={handleRestartGame}
        hearts={hearts}
        streak={streak}
      />

      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        score={score}
        streak={streak}
        levelTitle={`Level ${currentLevel}: ${currentLevel === 1 ? 'Dasar' : currentLevel === 2 ? 'Menengah (Hijab)' : 'Lanjutan (Aul & Kasus Khusus)'}`}
      />

      <CheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
      />

      <CustomCaseModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onStartCustomCase={handleStartCustomCase}
      />
    </div>
  );
}
