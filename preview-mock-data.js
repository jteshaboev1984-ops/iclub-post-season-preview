(function () {
  "use strict";

  const subjectIds = {
    informatics: 6,
    economics: 7,
    biology: 3,
    chemistry: 4,
    mathematics: 5
  };

  const subjectTopics = {
    economics: {
      topic: "Demand and supply",
      subtopics: [
        "Demand curve",
        "Supply curve",
        "Elasticity",
        "Consumer surplus",
        "Government intervention",
        "Exchange rates"
      ]
    },
    mathematics: {
      topic: "Algebra and functions",
      subtopics: [
        "Quadratics",
        "Inequalities",
        "Graphs",
        "Sequences",
        "Trigonometry",
        "Coordinate geometry"
      ]
    },
    biology: {
      topic: "Cell structure",
      subtopics: [
        "Organelles",
        "Biological molecules",
        "Enzymes",
        "Membranes",
        "Transport",
        "Immunity"
      ]
    },
    chemistry: {
      topic: "Atomic and stoichiometric foundations",
      subtopics: [
        "Atomic structure",
        "Moles",
        "Bonding",
        "Energetics",
        "Redox",
        "Organic chemistry"
      ]
    },
    informatics: {
      topic: "Algorithms and data representation",
      subtopics: [
        "Binary",
        "Logic gates",
        "Pseudocode",
        "Trace tables",
        "Arrays",
        "Databases"
      ]
    }
  };

  const baseOptions = {
    economics: [
      ["A fall in demand", "An increase in demand", "A fall in supply", "A price ceiling"],
      ["Elastic demand", "Inelastic demand", "Unitary elasticity", "Perfectly elastic demand"],
      ["Consumer surplus falls", "Consumer surplus rises", "Supply becomes fixed", "Demand becomes zero"]
    ],
    mathematics: [
      ["x = 2", "x = -2", "x = 4", "x = -4"],
      ["A translation", "A reflection", "A rotation", "A probability"],
      ["The gradient", "The intercept", "The discriminant", "The range"]
    ],
    biology: [
      ["Mitochondrion", "Ribosome", "Nucleus", "Cell wall"],
      ["Diffusion", "Osmosis", "Active transport", "Facilitated diffusion"],
      ["Enzyme activity increases", "Enzyme denatures", "Substrate disappears", "pH becomes neutral"]
    ],
    chemistry: [
      ["Oxidation", "Reduction", "Neutralisation", "Polymerisation"],
      ["Ionic bonding", "Covalent bonding", "Metallic bonding", "Hydrogen bonding"],
      ["The mole ratio", "The empirical formula", "The isotope number", "The rate constant"]
    ],
    informatics: [
      ["Binary", "Denary", "Hexadecimal", "Boolean"],
      ["FOR loop", "IF statement", "Trace table", "Array index"],
      ["Validation", "Verification", "Compilation", "Encryption"]
    ]
  };

  function normalizeSubjectKey(subjectKey) {
    return String(subjectKey || "economics").trim() || "economics";
  }

  function makeQuestion(subjectKey, idx, difficulty, mode, tourNo) {
    const key = normalizeSubjectKey(subjectKey);
    const pack = subjectTopics[key] || subjectTopics.economics;
    const subtopic = pack.subtopics[(idx - 1) % pack.subtopics.length];
    const optsPack = baseOptions[key] || baseOptions.economics;
    const options = optsPack[(idx - 1) % optsPack.length];

    return {
      id: Number((mode === "tour" ? 9000 : 8000) + idx + (Number(tourNo || 1) * 100)),
      topic: pack.topic,
      subtopic,
      difficulty,
      timeLimitSec: difficulty === "hard" ? 90 : difficulty === "medium" ? 70 : 55,
      type: "mcq",
      qtype: "mcq",
      question:
        mode === "tour"
          ? `Preview ${key} Tour ${tourNo}: Which option best matches ${subtopic}?`
          : `Preview ${key} Practice ${tourNo}: Choose the best answer about ${subtopic}.`,
      options,
      correctIndex: idx % 4,
      correctAnswer: "",
      correct_answer: ["A", "B", "C", "D"][idx % 4],
      explanation: `Preview explanation: this question checks ${subtopic}. In production, the same screen will use real questions from the bank.`,
      imageUrl: null,
      practiceTourNo: Number(tourNo || 4),
      practicePoolId: Number(1000 + Number(tourNo || 4)),
      orderNo: idx
    };
  }

  function makePracticeQuestions(subjectKey, tourNo) {
    const dist = [
      ["easy", 3],
      ["medium", 5],
      ["hard", 2]
    ];

    const out = [];
    let idx = 1;
    dist.forEach(([difficulty, count]) => {
      for (let i = 0; i < count; i += 1) {
        out.push(makeQuestion(subjectKey, idx, difficulty, "practice", tourNo));
        idx += 1;
      }
    });
    return out;
  }

  function makeTourQuestions(subjectKey, tourNo) {
    const dist = [
      ["easy", 6],
      ["medium", 9],
      ["hard", 5]
    ];

    const out = [];
    let idx = 1;
    dist.forEach(([difficulty, count]) => {
      for (let i = 0; i < count; i += 1) {
        out.push(makeQuestion(subjectKey, idx, difficulty, "tour", tourNo));
        idx += 1;
      }
    });
    return out;
  }

  function getSubjectId(subjectKey) {
    return subjectIds[normalizeSubjectKey(subjectKey)] || subjectIds.economics;
  }

  function getPracticeContext(subjectKey, tourNo) {
    const subjectId = getSubjectId(subjectKey);
    const practiceTourNo = Number(tourNo || 4);
    const pools = Array.from({ length: 7 }).map((_, i) => {
      const n = i + 1;
      return {
        id: 1000 + n,
        subject_id: subjectId,
        tour_no: n,
        title: `Preview Practice Tour ${n}`,
        is_active: true
      };
    });

    return {
      subjectId,
      practiceTourNo,
      poolId: 1000 + practiceTourNo,
      poolRow: pools.find((p) => Number(p.tour_no) === practiceTourNo),
      pools,
      activeTourNo: 4,
      globallyClosedCount: 3,
      totalTours: 7
    };
  }

  function getPracticeCards(subjectKey) {
    const currentTourNo = 4;
    const cards = Array.from({ length: 7 }).map((_, i) => {
      const tourNo = i + 1;
      const locked = tourNo > 4;
      const total = 70;
      const done = tourNo < 4 ? 70 : tourNo === 4 ? 18 : 0;

      return {
        tourNo,
        stateName: locked ? "locked" : tourNo === 4 ? "active" : "past",
        isLocked: locked,
        isActive: tourNo === 4,
        isDone: done >= total,
        total,
        done,
        open: Math.max(0, total - done),
        best: tourNo < 4 ? { percent: 78 } : null,
        last: []
      };
    });

    return { currentTourNo, selectedTourNo: currentTourNo, cards };
  }

  function getPracticeStats(subjectKey, tourNo) {
    const n = Number(tourNo || 4);
    const total = 70;
    const mastered = n < 4 ? 70 : n === 4 ? 18 : 0;

    return {
      practiceTourNo: n,
      poolId: 1000 + n,
      totalCount: total,
      masteredCount: mastered,
      openCount: Math.max(0, total - mastered),
      best: n < 4 ? { percent: 78, score: 8, total: 10 } : null,
      last: []
    };
  }

  function getTour(subjectId, tourNo) {
    return {
      id: Number(7000 + Number(tourNo || 4)),
      subject_id: Number(subjectId || 7),
      tour_no: Number(tourNo || 4),
      start_date: "2026-05-11",
      end_date: "2026-05-17",
      is_active: true
    };
  }

  window.ICLUB_PREVIEW = {
    userId: "00000000-0000-4000-8000-000000000001",
    getSubjectId,
    getPracticeContext,
    getPracticeCards,
    getPracticeStats,
    makePracticeQuestions,
    makeTourQuestions,
    getTour
  };
})();



// Preview practice-mode override: regular / weak / custom produce different mock sets.
(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW) return;
  if (window.ICLUB_PREVIEW.__practiceModeOverrideV2) return;
  window.ICLUB_PREVIEW.__practiceModeOverrideV2 = true;

  const weakTopics = {
    economics: ["Evaluation paragraphs", "Exchange rates", "Balance of payments", "Policy effectiveness"],
    mathematics: ["Trigonometric identities", "Binomial coefficients", "Inequalities", "Series"],
    biology: ["Transport in mammals", "Immunity", "Genetic technology", "Homeostasis"],
    chemistry: ["Equilibria", "Kinetics", "Organic mechanisms", "Electrochemistry"],
    informatics: ["SQL", "Cybersecurity", "Recursion", "Databases"]
  };

  const regularTopics = {
    economics: ["Demand and supply", "Elasticity", "Market failure", "Macroeconomic policy"],
    mathematics: ["Quadratics", "Graphs", "Coordinate geometry", "Trigonometry"],
    biology: ["Cell structure", "Enzymes", "Membranes", "Genetics"],
    chemistry: ["Atomic structure", "Moles", "Bonding", "Energetics"],
    informatics: ["Binary", "Logic gates", "Trace tables", "Algorithms"]
  };

  function getSubjectKey(subjectKey) {
    return String(subjectKey || "economics").trim() || "economics";
  }

  function getDifficulty(i, selected) {
    const d = String(selected || "mixed").toLowerCase();
    if (["easy", "medium", "hard"].includes(d)) return d;
    return i % 5 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy";
  }

  function makeOptions(subjectKey, mode, i) {
    if (mode === "weak") {
      return ["Fix the weak concept", "Ignore previous mistakes", "Guess faster", "Skip explanations"];
    }

    if (mode === "custom") {
      return ["Selected filter answer", "Unrelated topic", "Wrong difficulty", "Random option"];
    }

    return ["Correct concept", "Common distractor", "Partial idea", "Opposite answer"];
  }

  function makePreviewQuestion(subjectKey, i, mode, filters) {
    const key = getSubjectKey(subjectKey);
    const topics = mode === "weak" || filters?.topics === "weak"
      ? (weakTopics[key] || weakTopics.economics)
      : (regularTopics[key] || regularTopics.economics);

    const topic = topics[(i - 1) % topics.length];
    const difficulty = getDifficulty(i, filters?.difficulty);

    const modeTitle = mode === "weak"
      ? "Weak-topic practice"
      : mode === "custom"
        ? "Custom practice"
        : "Regular practice";

    const count = Number(filters?.count || 10) || 10;
    const tour = String(filters?.tour || "1-7");

    return {
      id: Number(880000 + i + (mode === "weak" ? 1000 : mode === "custom" ? 2000 : 0)),
      topic,
      subtopic: topic,
      difficulty,
      timeLimitSec: difficulty === "hard" ? 90 : difficulty === "medium" ? 70 : 55,
      type: "mcq",
      qtype: "mcq",
      question: `${modeTitle}: ${topic}. Question ${i}/${count}.`,
      options: makeOptions(key, mode, i),
      correctIndex: 0,
      correctAnswer: "",
      correct_answer: "A",
      explanation:
        mode === "custom"
          ? `Custom preview: tour ${tour}, topics ${filters?.topics || "weak"}, difficulty ${filters?.difficulty || "mixed"}, count ${count}.`
          : mode === "weak"
            ? `Weak-topic preview: this set focuses on ${topic}, because it is marked as an area to strengthen.`
            : `Regular preview: this is the familiar practice flow for ${topic}.`,
      imageUrl: null,
      practiceTourNo: Number(tour === "1-7" ? 7 : tour || 4),
      practicePoolId: 9900,
      orderNo: i
    };
  }

  window.ICLUB_PREVIEW.makePracticeQuestions = function (subjectKey, tourNo) {
    const selected = window.ICLUB_PREVIEW_SELECTED_PRACTICE || {};
    const mode = selected.mode || "regular";
    const filters = {
      tour: selected.filters?.tour || String(tourNo || "1-7"),
      topics: selected.filters?.topics || (mode === "weak" ? "weak" : "all"),
      difficulty: selected.filters?.difficulty || "mixed",
      count: Number(selected.filters?.count || 10) || 10
    };

    return Array.from({ length: filters.count }).map((_, idx) =>
      makePreviewQuestion(subjectKey, idx + 1, mode, filters)
    );
  };
})();
