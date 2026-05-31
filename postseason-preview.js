(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  const BUILD = "grand-final-v30-short-real-tour-20260530";
  window.ICLUB_POSTSEASON_PREVIEW_BUILD = BUILD;
  console.info("[iClub Preview] post-season build:", BUILD);

  /*
    Preview-only. No Supabase writes.

    Future main mapping:
    - Grand Final = tours.tour_no = 8
    - Attempt = current tour_attempts
    - Answers = current tour_answers
    - Ranking = current ratings_cache / fallback tour_attempts
    - Certificate = issue_tour_certificate(final_attempt_id)
    - "Все 7 туров" remains tour_no 1..7. Final is separate.
  */

  const TEST_FINAL_QUESTIONS = 4;
  const TEST_FINAL_SECONDS = 90;

  const STORAGE = {
    phase: "iclub_preview_phase_v30",
    subject: "iclub_preview_grand_subject_v30",
    quizPrefix: "iclub_preview_grand_quiz_v30_"
  };

  const PHASES = [
    ["auto", "Auto"],
    ["postseason", "После 7 туров"],
    ["grand_open", "Финал открыт"],
    ["grand_in_progress", "Финал начат"],
    ["grand_submitted", "Ответы приняты"],
    ["grand_finalizing", "Расчёт"],
    ["grand_ready", "Итоги готовы"]
  ];

  const DATA = {
    economics: {
      title: "Экономика",
      tours: "6/7",
      avg: "74%",
      rank: "#12",
      weak: 3,
      strong: ["Demand & Supply", "Elasticity", "Market intervention"],
      study: ["Evaluation paragraphs", "Exchange rates", "Balance of payments"],
      questions: [
        {
          q: "Which option best shows applying the concept rather than only recalling a definition?",
          options: [
            ["A", "Recall the definition only"],
            ["B", "Apply the idea to a new situation"],
            ["C", "Choose by a keyword"],
            ["D", "Ignore the context of the question"]
          ],
          correct: "B"
        },
        {
          q: "Which policy response best addresses the main cause of a balance of payments deficit caused by weak export competitiveness?",
          options: [
            ["A", "A temporary improvement in productivity and product quality"],
            ["B", "A permanent ban on all imports"],
            ["C", "Higher consumption without changing output"],
            ["D", "Ignoring exchange rate effects"]
          ],
          correct: "A"
        },
        {
          q: "A strong evaluation paragraph should mainly show:",
          options: [
            ["A", "Only one memorised definition"],
            ["B", "A reasoned judgement with conditions and limits"],
            ["C", "A longer introduction"],
            ["D", "A repeated question phrase"]
          ],
          correct: "B"
        },
        {
          q: "If demand is price elastic, a fall in price is most likely to:",
          options: [
            ["A", "Reduce total revenue"],
            ["B", "Leave total revenue unchanged"],
            ["C", "Increase total revenue"],
            ["D", "Make demand perfectly inelastic"]
          ],
          correct: "C"
        }
      ],
      topics: {
        7: [["Balance of payments", 13, 18], ["Development economics", 10, 16], ["Globalisation", 8, 12]]
      }
    },
    mathematics: {
      title: "Математика",
      tours: "5/7",
      avg: "68%",
      rank: "#18",
      weak: 4,
      strong: ["Quadratics", "Graphs", "Coordinate geometry"],
      study: ["Trigonometric identities", "Binomial coefficients", "Inequalities", "Series"],
      questions: [
        {
          q: "Which method gives the most reliable first step for this problem?",
          options: [
            ["A", "Substitute numbers immediately"],
            ["B", "Identify the structure of the expression first"],
            ["C", "Round before solving"],
            ["D", "Use the longest formula available"]
          ],
          correct: "B"
        },
        {
          q: "Before solving a trigonometric identity question, the best approach is to:",
          options: [
            ["A", "Rewrite using known identities"],
            ["B", "Guess the angle"],
            ["C", "Ignore the domain"],
            ["D", "Differentiate both sides always"]
          ],
          correct: "A"
        },
        {
          q: "For a quadratic equation, the discriminant helps determine:",
          options: [
            ["A", "The number and type of roots"],
            ["B", "Only the y-intercept"],
            ["C", "The gradient of a line"],
            ["D", "The area under a curve"]
          ],
          correct: "A"
        },
        {
          q: "In binomial expansion, the coefficient of a term is found using:",
          options: [
            ["A", "Only substitution"],
            ["B", "Binomial coefficients and powers"],
            ["C", "Random estimation"],
            ["D", "Completing the square"]
          ],
          correct: "B"
        }
      ],
      topics: {
        7: [["Inequalities", 11, 16], ["Differentiation", 10, 14], ["Integration", 8, 12]]
      }
    }
  };

  const esc = (value) => String(value == null ? "" : value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  function lang() {
    try {
      const profileRaw = localStorage.getItem("iclub_profile_v1") || localStorage.getItem("profile") || "";
      const profile = profileRaw ? JSON.parse(profileRaw) : null;
      const value = String(profile?.language || profile?.language_code || profile?.uiLanguage || document.documentElement.lang || "ru").toLowerCase();
      if (value.startsWith("uz")) return "uz";
      if (value.startsWith("en")) return "en";
      return "ru";
    } catch {
      return "ru";
    }
  }

  function tr(ru, uz, en) {
    const l = lang();
    if (l === "uz") return uz || ru;
    if (l === "en") return en || ru;
    return ru;
  }

  function getPhaseRaw() {
    const raw = localStorage.getItem(STORAGE.phase) || "auto";
    return PHASES.some(([key]) => key === raw) ? raw : "auto";
  }

  function setPhase(phase) {
    const next = PHASES.some(([key]) => key === phase) ? phase : "auto";
    localStorage.setItem(STORAGE.phase, next);
    syncPhaseSelect();
    return next;
  }

  function getGrandSubject() {
    const raw = localStorage.getItem(STORAGE.subject);
    return raw && DATA[raw] ? raw : subjectKeys()[0] || "economics";
  }

  function setGrandSubject(key) {
    const next = DATA[key] ? key : "economics";
    localStorage.setItem(STORAGE.subject, next);
    return next;
  }

  function quizKey(key) {
    return STORAGE.quizPrefix + (key || getGrandSubject());
  }

  function defaultQuizState(key) {
    return {
      q: 1,
      total: TEST_FINAL_QUESTIONS,
      selected: "",
      answers: {},
      startedAt: Date.now(),
      durationSeconds: TEST_FINAL_SECONDS,
      finished: false,
      finishReason: ""
    };
  }

  function resetQuizState(key) {
    const state = defaultQuizState(key);
    localStorage.setItem(quizKey(key), JSON.stringify(state));
    return state;
  }

  function getQuizState(key) {
    try {
      const raw = localStorage.getItem(quizKey(key));
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") return resetQuizState(key);

      return {
        q: Math.max(1, Math.min(TEST_FINAL_QUESTIONS, Number(parsed.q || 1))),
        total: TEST_FINAL_QUESTIONS,
        selected: ["A", "B", "C", "D"].includes(parsed.selected) ? parsed.selected : "",
        answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
        startedAt: Number(parsed.startedAt || Date.now()),
        durationSeconds: Number(parsed.durationSeconds || TEST_FINAL_SECONDS),
        finished: !!parsed.finished,
        finishReason: String(parsed.finishReason || "")
      };
    } catch {
      return resetQuizState(key);
    }
  }

  function saveQuizState(key, state) {
    localStorage.setItem(quizKey(key), JSON.stringify(state));
    return state;
  }

  function remainingSeconds(state) {
    const elapsed = Math.floor((Date.now() - Number(state.startedAt || Date.now())) / 1000);
    return Math.max(0, Number(state.durationSeconds || TEST_FINAL_SECONDS) - elapsed);
  }

  function timeText(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function currentQuestion(key, state) {
    const d = DATA[key] || DATA.economics;
    return d.questions[(state.q || 1) - 1] || d.questions[0];
  }

  function calculateResult(key) {
    const d = DATA[key] || DATA.economics;
    const state = getQuizState(key);
    let correct = 0;

    d.questions.slice(0, TEST_FINAL_QUESTIONS).forEach((question, index) => {
      const userAnswer = state.answers[String(index + 1)] || "";
      if (userAnswer && userAnswer === question.correct) correct += 1;
    });

    return {
      score: correct,
      total: TEST_FINAL_QUESTIONS,
      percent: Math.round((correct / TEST_FINAL_QUESTIONS) * 100),
      time: timeText(Math.max(0, TEST_FINAL_SECONDS - remainingSeconds(state))),
      regionRank: correct >= 3 ? 8 : 18,
      overallRank: correct >= 3 ? 31 : 76
    };
  }

  function pickAnswer(key, option) {
    const state = getQuizState(key);
    state.selected = ["A", "B", "C", "D"].includes(option) ? option : "";
    saveQuizState(key, state);
    return state;
  }

  function saveCurrentAnswerIfSelected(key) {
    const state = getQuizState(key);
    if (state.selected) {
      state.answers[String(state.q)] = state.selected;
      state.selected = "";
      saveQuizState(key, state);
    }
    return state;
  }

  function answerCurrentQuestion(key) {
    const state = getQuizState(key);
    if (!state.selected) return state;

    state.answers[String(state.q)] = state.selected;

    if (state.q >= state.total) {
      return finishFinalAttempt(key, "submitted");
    }

    state.q += 1;
    state.selected = "";
    return saveQuizState(key, state);
  }

  function finishFinalAttempt(key, reason) {
    const state = getQuizState(key);

    if (state.selected) {
      state.answers[String(state.q)] = state.selected;
      state.selected = "";
    }

    state.finished = true;
    state.finishReason = reason || "submitted";
    saveQuizState(key, state);

    setGrandSubject(key);
    setPhase("grand_submitted");
    renderHomeRouter();
    showGrandSubmitted(key, reason);
    return state;
  }

  let timerInterval = null;

  function stopTimerLoop() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startTimerLoop(key) {
    stopTimerLoop();

    const tick = () => {
      const state = getQuizState(key);
      const remaining = remainingSeconds(state);

      const timer = document.querySelector("#psp-grand-timer");
      if (timer) {
        timer.textContent = timeText(remaining);
        timer.classList.toggle("is-danger", remaining <= 10);
      }

      if (remaining <= 0 && !state.finished) {
        stopTimerLoop();
        finishFinalAttempt(key, "time_expired");
      }
    };

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function applyPhaseFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const raw = params.get("phase") || params.get("grand");
      if (!raw) return;

      const map = {
        auto: "auto",
        postseason: "postseason",
        scheduled: "postseason",
        open: "grand_open",
        grand_open: "grand_open",
        started: "grand_in_progress",
        in_progress: "grand_in_progress",
        submitted: "grand_submitted",
        finalizing: "grand_finalizing",
        ready: "grand_ready",
        results: "grand_ready",
        results_ready: "grand_ready"
      };

      if (map[raw]) setPhase(map[raw]);
    } catch {}
  }

  function getCompList() {
    return document.getElementById("home-competitive-list");
  }

  function getCompetitiveBlock() {
    const list = getCompList();
    return list ? (list.closest(".home-block") || list.parentElement) : null;
  }

  function getHomeView() {
    return document.getElementById("view-home");
  }

  function isHomeActive() {
    const home = getHomeView();
    return !!home && home.classList.contains("is-active");
  }

  function getCardBySubject(key) {
    const list = getCompList();
    if (!list) return null;
    return list.querySelector(`.home-competitive-card[data-subject="${CSS.escape(key)}"]`);
  }

  function subjectKeys() {
    const list = getCompList();
    if (!list) return ["economics", "mathematics"];

    const keys = Array.from(list.querySelectorAll(".home-competitive-card"))
      .map((card) => String(card.dataset.subject || "").trim())
      .filter(Boolean);

    const unique = Array.from(new Set(keys));
    return unique.length ? unique.slice(0, 2) : ["economics", "mathematics"];
  }

  function hasActiveRegularTour() {
    const block = getCompetitiveBlock();
    if (!block) return false;

    const text = String(block.textContent || "").toLowerCase();

    return (
      text.includes("тур активен") ||
      text.includes("tour active") ||
      text.includes("tur aktiv") ||
      text.includes("участвуйте в текущем туре")
    );
  }

  function effectivePhase() {
    const raw = getPhaseRaw();
    if (raw !== "auto") return raw;

    if (hasActiveRegularTour()) return "regular_active";
    return "postseason";
  }

  function removePreviewHome() {
    document.getElementById("psp-home")?.remove();
    const block = getCompetitiveBlock();
    if (block) block.style.display = "";
  }

  function heroHTML(key) {
    const old = getCardBySubject(key);
    const hero = old?.querySelector(".home-competitive-hero");
    if (hero) return hero.outerHTML;

    return `
      <div class="home-competitive-hero">
        <div class="home-competitive-hero-img" aria-hidden="true"></div>
      </div>
    `;
  }

  function grandConfig() {
    const phase = effectivePhase();
    const key = getGrandSubject();
    const subject = DATA[key] || DATA.economics;
    const result = calculateResult(key);

    const commonStats = `
      <div class="psp-grand-stats">
        <div><b>20</b><span>${tr("вопросов", "savol", "questions")}</span></div>
        <div><b>1</b><span>${tr("попытка", "urinish", "attempt")}</span></div>
        <div><b>${tr("балл", "ball", "score")}</b><span>+ ${tr("время", "vaqt", "time")}</span></div>
      </div>
    `;

    const states = {
      postseason: {
        kicker: tr("ФИНАЛ СЕЗОНА", "MAVSUM FINALI", "SEASON FINAL"),
        title: "Grand Olympiad",
        sub: tr("Финальный этап после 7 туров.", "7 turdan keyingi final bosqich.", "Final stage after 7 tours."),
        note: tr("Пока финал закрыт. Готовьтесь через итоги по предметам и практику.", "Final hozir yopiq. Fan yakunlari va amaliyot orqali tayyorlaning.", "Final is closed. Prepare through subject summaries and practice."),
        stats: commonStats,
        actions: `<button type="button" class="btn primary psp-full" data-psp-action="plan">${tr("Подробнее", "Batafsil", "Details")}</button>`
      },
      grand_open: {
        kicker: tr("ФИНАЛ ОТКРЫТ", "FINAL OCHIQ", "FINAL OPEN"),
        title: "Grand Olympiad",
        sub: tr("Выберите предмет и начните финальную попытку.", "Fanni tanlang va final urinishini boshlang.", "Choose a subject and start the final attempt."),
        note: tr("Результат, рейтинг и сертификат откроются после закрытия финала.", "Natija, reyting va sertifikat final yopilgandan keyin ochiladi.", "Result, ranking and certificate open after the final closes."),
        stats: commonStats,
        actions: `
          <div class="psp-actions">
            <button type="button" class="btn primary" data-psp-action="grand-select">${tr("Начать финал", "Finalni boshlash", "Start final")}</button>
            <button type="button" class="btn" data-psp-action="plan">${tr("Правила", "Qoidalar", "Rules")}</button>
          </div>
        `
      },
      grand_in_progress: {
        kicker: tr("ФИНАЛ НАЧАТ", "FINAL BOSHLANDI", "FINAL STARTED"),
        title: `${subject.title} · Grand Final`,
        sub: tr("Финальная попытка в процессе.", "Final urinishi davom etmoqda.", "Final attempt is in progress."),
        note: tr("Вернитесь к начатой попытке. После завершения ответы изменить нельзя.", "Boshlangan urinishga qayting. Yakunlangandan keyin javoblarni o‘zgartirib bo‘lmaydi.", "Return to the started attempt. Answers cannot be changed after submission."),
        stats: commonStats,
        actions: `<button type="button" class="btn primary psp-full" data-psp-action="grand-continue" data-subject="${esc(key)}">${tr("Вернуться к попытке", "Urinishga qaytish", "Return to attempt")}</button>`
      },
      grand_submitted: {
        kicker: tr("ОТВЕТЫ ПРИНЯТЫ", "JAVOBLAR QABUL QILINDI", "ANSWERS RECEIVED"),
        title: `${subject.title} · Grand Final`,
        sub: tr("Ответы сохранены.", "Javoblar saqlandi.", "Answers saved."),
        note: tr("Результат появится после закрытия финала и расчёта рейтинга.", "Natija final yopilgandan va reyting hisoblangandan keyin chiqadi.", "Result appears after final closes and ranking is calculated."),
        stats: commonStats,
        actions: `<button type="button" class="btn primary psp-full" data-psp-action="grand-status" data-subject="${esc(key)}">${tr("Статус финала", "Final holati", "Final status")}</button>`
      },
      grand_finalizing: {
        kicker: tr("РАСЧЁТ ИТОГОВ", "YAKUNLAR HISOBLANMOQDA", "CALCULATING RESULTS"),
        title: "Grand Olympiad",
        sub: tr("Рейтинг и сертификаты рассчитываются.", "Reyting va sertifikatlar hisoblanmoqda.", "Ranking and certificates are being calculated."),
        note: tr("Система закрывает попытки, считает места и готовит результаты.", "Tizim urinishlarni yopadi, o‘rinlarni hisoblaydi va natijalarni tayyorlaydi.", "System closes attempts, calculates ranks and prepares results."),
        stats: commonStats,
        actions: `<button type="button" class="btn primary psp-full" data-psp-action="grand-finalizing">${tr("Как идёт расчёт", "Hisoblash jarayoni", "Calculation status")}</button>`
      },
      grand_ready: {
        kicker: tr("РЕЗУЛЬТАТ ГОТОВ", "NATIJA TAYYOR", "RESULT READY"),
        title: `${subject.title} · ${result.score}/${result.total}`,
        sub: `#${result.regionRank} ${tr("в регионе", "hududda", "region")} · #${result.overallRank} ${tr("общий рейтинг", "umumiy reyting", "overall")}`,
        note: tr("Откройте итог финала. Рейтинг смотрите во вкладке “Рейтинг”.", "Final natijasini oching. Reytingni “Reyting” bo‘limida ko‘ring.", "Open final result. Ranking is in the Ranking tab."),
        stats: commonStats,
        actions: `
          <div class="psp-actions">
            <button type="button" class="btn primary" data-psp-action="grand-result" data-subject="${esc(key)}">${tr("Открыть результат", "Natijani ochish", "Open result")}</button>
            <button type="button" class="btn" data-psp-action="grand-certificate" data-subject="${esc(key)}">${tr("Сертификат", "Sertifikat", "Certificate")}</button>
          </div>
        `
      }
    };

    return states[phase] || states.postseason;
  }

  function grandCardHTML() {
    const cfg = grandConfig();

    return `
      <section class="psp-grand-card">
        <div class="psp-kicker">${esc(cfg.kicker)}</div>
        <div class="psp-grand-title">${esc(cfg.title)}</div>
        <div class="psp-grand-sub">${esc(cfg.sub)}</div>
        ${cfg.stats}
        <div class="psp-grand-note">${esc(cfg.note)}</div>
        ${cfg.actions}
      </section>
    `;
  }

  function subjectCardHTML(key) {
    const d = DATA[key] || DATA.economics;

    return `
      <article class="home-competitive-card psp-subject-card" data-subject="${esc(key)}">
        ${heroHTML(key)}
        <div class="home-competitive-body">
          <div class="home-competitive-title">${esc(d.title)}</div>
          <div class="home-competitive-note">${tr("Итог сезона и практика доступны.", "Mavsum yakuni va amaliyot mavjud.", "Season summary and practice are available.")}</div>

          <div class="psp-metrics">
            <div><b>${esc(d.tours)}</b><span>${tr("туров", "tur", "tours")}</span></div>
            <div><b>${esc(d.avg)}</b><span>${tr("средний", "o‘rtacha", "average")}</span></div>
            <div><b>${esc(d.rank)}</b><span>${tr("регион", "hudud", "region")}</span></div>
          </div>

          <div class="psp-study-pill">${esc(d.weak)} ${tr("темы изучить", "mavzu o‘rganish", "topics to study")}</div>

          <div class="psp-actions">
            <button type="button" class="btn primary" data-psp-action="report" data-subject="${esc(key)}">${tr("Итог сезона", "Mavsum yakuni", "Season summary")}</button>
            <button type="button" class="btn" data-psp-action="practice" data-subject="${esc(key)}">${tr("Практика", "Amaliyot", "Practice")}</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderPostSeasonHome() {
    const block = getCompetitiveBlock();
    if (!block || !block.parentNode) return;

    block.style.display = "none";

    let root = document.getElementById("psp-home");
    if (!root) {
      root = document.createElement("div");
      root.id = "psp-home";
      block.parentNode.insertBefore(root, block);
    }

    const keys = subjectKeys();

    root.innerHTML = `
      ${grandCardHTML()}
      <section class="psp-section">
        <h2>${tr("Итоги по предметам", "Fanlar bo‘yicha yakunlar", "Subject summaries")}</h2>
        <p>${tr("Откройте итог и начните изучение нужных тем.", "Yakunlarni oching va kerakli mavzularni o‘rganishni boshlang.", "Open the summary and start studying needed topics.")}</p>
        <div class="psp-subject-list">
          ${keys.map(subjectCardHTML).join("")}
        </div>
      </section>
    `;
  }

  function renderHomeRouter() {
    if (!isHomeActive()) return;

    const phase = effectivePhase();

    if (phase === "regular_active") {
      removePreviewHome();
      return;
    }

    renderPostSeasonHome();
  }

  function openModal(html) {
    document.getElementById("psp-modal")?.remove();

    const isQuiz = String(html || "").includes("psp-quiz-screen");

    const modal = document.createElement("div");
    modal.id = "psp-modal";
    if (isQuiz) modal.classList.add("psp-modal-fullscreen");

    modal.innerHTML = isQuiz
      ? `<div class="psp-fullscreen-host">${html}</div>`
      : `<div class="psp-backdrop">${html}</div>`;

    document.body.appendChild(modal);
    document.documentElement.classList.add("psp-modal-open");
    document.body.classList.add("psp-modal-open");
  }

  function closeModal() {
    stopTimerLoop();
    document.getElementById("psp-modal")?.remove();
    document.documentElement.classList.remove("psp-modal-open");
    document.body.classList.remove("psp-modal-open");
  }

  function modalShell(kicker, title, sub, body) {
    return `
      <div class="psp-modal-card">
        <div class="psp-modal-top">
          <button type="button" class="psp-back" data-psp-action="modal-close">←</button>
          <div>
            <div class="psp-kicker">${esc(kicker)}</div>
            <div class="psp-modal-title">${esc(title)}</div>
            ${sub ? `<div class="psp-muted">${esc(sub)}</div>` : ""}
          </div>
        </div>
        ${body}
      </div>
    `;
  }

  function showPlan() {
    openModal(modalShell(
      tr("ФИНАЛ СЕЗОНА", "MAVSUM FINALI", "SEASON FINAL"),
      "Grand Olympiad",
      tr("Финальный этап после 7 туров.", "7 turdan keyingi final bosqich.", "Final stage after 7 tours."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Формат финала", "Final formati", "Final format")}</div>
          <div class="psp-grand-stats inside">
            <div><b>20</b><span>${tr("вопросов", "savol", "questions")}</span></div>
            <div><b>Mixed</b><span>${tr("темы", "mavzular", "topics")}</span></div>
            <div><b>1</b><span>${tr("попытка", "urinish", "attempt")}</span></div>
          </div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что будет оцениваться", "Nima baholanadi", "What is assessed")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Точность ответов.", "Javoblar aniqligi.", "Answer accuracy.")}</span></div>
            <div><b>2</b><span>${tr("Умение применять темы из разных туров.", "Turli turlardagi mavzularni qo‘llash.", "Using topics across tours.")}</span></div>
            <div><b>3</b><span>${tr("Время влияет только при равных результатах.", "Vaqt faqat teng natijada ta’sir qiladi.", "Time matters only for tied scores.")}</span></div>
          </div>
        </div>

        <div class="psp-panel soft">
          <div class="psp-panel-title">${tr("Важно", "Muhim", "Important")}</div>
          <div class="psp-muted">${tr("Финал будет отдельным пунктом в рейтинге и не входит в “Все 7 туров”.", "Final reytingda alohida bo‘ladi va “7 tur” ichiga kirmaydi.", "Final is a separate ranking option and is not included in all 7 tours.")}</div>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="to-summaries">${tr("К итогам по предметам", "Fan yakunlariga", "To subject summaries")}</button>
        </div>
      `
    ));
  }

  function showGrandSelect() {
    const cards = subjectKeys().map((key) => {
      const d = DATA[key] || DATA.economics;
      return `
        <div class="psp-choice">
          <div>
            <div class="psp-choice-title">${esc(d.title)}</div>
            <div class="psp-muted">20 ${tr("вопросов", "savol", "questions")} · Mixed · 1 ${tr("попытка", "urinish", "attempt")}</div>
          </div>
          <button type="button" class="btn primary" data-psp-action="grand-confirm" data-subject="${esc(key)}">${tr("Выбрать", "Tanlash", "Choose")}</button>
        </div>
      `;
    }).join("");

    openModal(modalShell(
      "GRAND OLYMPIAD",
      tr("Выберите предмет финала", "Final fanini tanlang", "Choose final subject"),
      tr("Финал проходит отдельно по каждому предмету.", "Final har bir fan bo‘yicha alohida o‘tadi.", "Final runs separately for each subject."),
      `<div class="psp-choice-list">${cards}</div>`
    ));
  }

  function showGrandConfirm(key) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);

    openModal(modalShell(
      tr("ПЕРЕД СТАРТОМ", "BOSHLASHDAN OLDIN", "BEFORE START"),
      `${d.title} · Grand Final`,
      tr("Проверьте правила перед началом.", "Boshlashdan oldin qoidalarni tekshiring.", "Check the rules before starting."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Тестовый режим preview", "Preview test rejimi", "Preview test mode")}</div>
          <div class="psp-muted">${tr("Для проверки используются 4 вопроса и короткий таймер. В main будет полный финальный пул.", "Tekshiruv uchun 4 savol va qisqa taymer ishlatiladi. Main’da to‘liq final puli bo‘ladi.", "Preview uses 4 questions and a short timer. Main uses the full final pool.")}</div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Правила", "Qoidalar", "Rules")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Выход из попытки недоступен.", "Urinishdan chiqish mavjud emas.", "Exit is not available.")}</span></div>
            <div><b>2</b><span>${tr("Можно завершить финал досрочно.", "Finalni muddatidan oldin yakunlash mumkin.", "You may finish the final early.")}</span></div>
            <div><b>3</b><span>${tr("При истечении времени попытка завершится автоматически.", "Vaqt tugasa, urinish avtomatik yakunlanadi.", "When time expires, the attempt submits automatically.")}</span></div>
          </div>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="grand-start" data-subject="${esc(key)}">${tr("Начать попытку", "Urinishni boshlash", "Start attempt")}</button>
        </div>
      `
    ));
  }

  function showGrandAttempt(key) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);
    setPhase("grand_in_progress");
    renderHomeRouter();

    const state = getQuizState(key);
    const question = currentQuestion(key, state);
    const remaining = remainingSeconds(state);
    const selected = state.selected;

    openModal(`
      <div class="psp-quiz-screen">
        <div class="psp-quiz-top">
          <div class="psp-quiz-progress">${state.q}/${state.total}</div>
          <div id="psp-grand-timer" class="psp-quiz-timer ${remaining <= 10 ? "is-danger" : ""}">${timeText(remaining)}</div>
        </div>

        <div class="psp-quiz-subject">${esc(d.title)} · Grand Final</div>

        <div class="psp-quiz-card">
          <div class="psp-quiz-meta">${tr("Финальный вопрос", "Final savoli", "Final question")}</div>
          <div class="psp-question">${esc(question.q)}</div>

          <div class="psp-options">
            ${question.options.map(([letter, text]) => `
              <button type="button"
                class="${selected === letter ? "is-picked" : ""}"
                data-psp-action="grand-pick"
                data-subject="${esc(key)}"
                data-option="${esc(letter)}">
                <span class="psp-option-letter">${esc(letter)}</span>
                <span>${esc(text)}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="psp-quiz-actions">
          <button type="button"
            class="btn primary"
            data-psp-action="grand-answer"
            data-subject="${esc(key)}"
            ${selected ? "" : "disabled"}>
            ${state.q >= state.total ? tr("Завершить финал", "Finalni yakunlash", "Finish final") : tr("Ответить", "Javob berish", "Answer")}
          </button>

          <button type="button"
            class="btn"
            data-psp-action="grand-finish-now"
            data-subject="${esc(key)}">
            ${tr("Завершить финал", "Finalni yakunlash", "Finish final")}
          </button>
        </div>
      </div>
    `);

    startTimerLoop(key);
  }

  function showGrandSubmitted(key, reason = "submitted") {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);
    setPhase("grand_submitted");
    renderHomeRouter();

    const reasonText = reason === "time_expired"
      ? tr("Время истекло. Попытка завершена автоматически.", "Vaqt tugadi. Urinish avtomatik yakunlandi.", "Time expired. Attempt submitted automatically.")
      : tr("Финальная попытка завершена.", "Final urinishi yakunlandi.", "Final attempt submitted.");

    openModal(modalShell(
      tr("ОТВЕТЫ ПРИНЯТЫ", "JAVOBLAR QABUL QILINDI", "ANSWERS RECEIVED"),
      `${d.title} · Grand Final`,
      reasonText,
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Статус", "Holat", "Status")}</div>
          <div class="psp-big-status">${tr("Ответы сохранены", "Javoblar saqlandi", "Answers saved")}</div>
          <div class="psp-muted">${tr("Результат, рейтинг и сертификат откроются после закрытия финала.", "Natija, reyting va sertifikat final yopilgandan keyin ochiladi.", "Result, ranking and certificate open after the final closes.")}</div>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="modal-close">${tr("На главную", "Bosh sahifaga", "Home")}</button>
        </div>
      `
    ));
  }

  function showGrandFinalizing() {
    setPhase("grand_finalizing");
    renderHomeRouter();

    openModal(modalShell(
      tr("РАСЧЁТ ИТОГОВ", "YAKUNLAR HISOBLANMOQDA", "CALCULATING RESULTS"),
      tr("Результаты готовятся", "Natijalar tayyorlanmoqda", "Results are being prepared"),
      tr("Рейтинг и сертификаты скоро откроются.", "Reyting va sertifikatlar tez orada ochiladi.", "Ranking and certificates will open soon."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что происходит", "Nima bo‘lmoqda", "What happens")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Завершаются открытые попытки.", "Ochiq urinishlar yakunlanadi.", "Open attempts are closed.")}</span></div>
            <div><b>2</b><span>${tr("Считается рейтинг: сначала балл, затем время.", "Reyting hisoblanadi: avval ball, keyin vaqt.", "Ranking: score first, then time.")}</span></div>
            <div><b>3</b><span>${tr("Готовятся сертификаты финала.", "Final sertifikatlari tayyorlanadi.", "Final certificates are prepared.")}</span></div>
          </div>
        </div>
      `
    ));
  }

  function showGrandResult(key) {
    const d = DATA[key] || DATA.economics;
    const r = calculateResult(key);
    setGrandSubject(key);
    setPhase("grand_ready");
    renderHomeRouter();

    openModal(modalShell(
      tr("ИТОГ ФИНАЛА", "FINAL YAKUNI", "FINAL RESULT"),
      `${d.title} · Grand Final`,
      tr("Финальный результат по предмету.", "Fan bo‘yicha final natijasi.", "Final subject result."),
      `
        <div class="psp-report-grid">
          <div><b>${r.score}/${r.total}</b><span>${tr("Ответы", "Javoblar", "Answers")}</span></div>
          <div><b>${r.percent}%</b><span>${tr("Результат", "Natija", "Result")}</span></div>
          <div><b>#${r.regionRank}</b><span>${tr("Регион", "Hudud", "Region")}</span></div>
          <div><b>${r.time}</b><span>${tr("Время", "Vaqt", "Time")}</span></div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Освоенные темы", "O‘zlashtirilgan mavzular", "Mastered topics")}</div>
          <div class="psp-chip-row">${d.strong.slice(0, 2).map((x) => `<span class="good">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="psp-panel study">
          <div class="psp-panel-title">${tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study")}</div>
          <div class="psp-chip-row">${d.study.slice(0, 2).map((x) => `<span class="warn">${esc(x)}</span>`).join("")}</div>
          <button type="button" class="btn primary psp-full" data-psp-action="practice" data-subject="${esc(key)}" data-mode="study">${tr("Начать изучение", "O‘rganishni boshlash", "Start studying")}</button>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="grand-certificate" data-subject="${esc(key)}">${tr("Сертификат", "Sertifikat", "Certificate")}</button>
        </div>
      `
    ));
  }

  function showGrandCertificate(key) {
    const d = DATA[key] || DATA.economics;
    const r = calculateResult(key);

    openModal(modalShell(
      tr("СЕРТИФИКАТ", "SERTIFIKAT", "CERTIFICATE"),
      "Grand Final Certificate",
      `${d.title} · Grand Final`,
      `
        <div class="psp-tour-cert">
          <div class="psp-tour-cert-head">
            <div class="psp-cert-logo">iClub</div>
            <div class="psp-tour-cert-type">Grand Final Certificate</div>
          </div>

          <div class="psp-tour-cert-name">Preview Student</div>
          <div class="psp-tour-cert-line">${esc(d.title)} · ${r.score}/${r.total} · ${r.percent}%</div>

          <div class="psp-tour-cert-grid">
            <div><b>#${r.regionRank}</b><span>${tr("Регион", "Hudud", "Region")}</span></div>
            <div><b>#${r.overallRank}</b><span>${tr("Общий", "Umumiy", "Overall")}</span></div>
            <div><b>${r.time}</b><span>${tr("Время", "Vaqt", "Time")}</span></div>
          </div>

          <div class="psp-tour-cert-code">ICL-202606-GF-${esc(String(key).toUpperCase())}-PREVIEW</div>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="grand-result" data-subject="${esc(key)}">${tr("К результату", "Natijaga", "Back to result")}</button>
        </div>
      `
    ));
  }

  function showReport(key, scope = "season") {
    const d = DATA[key] || DATA.economics;

    openModal(modalShell(
      tr("ИТОГ СЕЗОНА", "MAVSUM YAKUNI", "SEASON SUMMARY"),
      d.title,
      tr("Общий итог сезона по предмету.", "Fan bo‘yicha mavsum yakuni.", "Subject season summary."),
      `
        <div class="psp-report-grid">
          <div><b>${esc(d.tours)}</b><span>${tr("Туры", "Turlar", "Tours")}</span></div>
          <div><b>${esc(d.avg)}</b><span>${tr("Средний", "O‘rtacha", "Average")}</span></div>
          <div><b>${esc(d.rank)}</b><span>${tr("Регион", "Hudud", "Region")}</span></div>
          <div><b>18</b><span>${tr("Практики", "Amaliyot", "Practices")}</span></div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Освоенные темы", "O‘zlashtirilgan mavzular", "Mastered topics")}</div>
          <div class="psp-chip-row">${d.strong.map((x) => `<span class="good">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="psp-panel study">
          <div class="psp-panel-title">${tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study")}</div>
          <div class="psp-chip-row">${d.study.map((x) => `<span class="warn">${esc(x)}</span>`).join("")}</div>
          <button type="button" class="btn primary psp-full" data-psp-action="practice" data-subject="${esc(key)}" data-mode="study">${tr("Начать изучение", "O‘rganishni boshlash", "Start studying")}</button>
        </div>
      `
    ));
  }

  function showPractice(key) {
    const d = DATA[key] || DATA.economics;

    openModal(modalShell(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      tr("Выберите формат", "Formatni tanlang", "Choose format"),
      d.title,
      `
        <div class="psp-mode-list">
          <button type="button" class="psp-mode is-on">
            <b>${tr("Обычная практика", "Oddiy amaliyot", "Regular practice")}</b>
            <span>${tr("Быстрый запуск привычной практики по предмету.", "Fan bo‘yicha odatiy amaliyotni tez boshlash.", "Quick start for usual practice.")}</span>
          </button>

          <button type="button" class="psp-mode">
            <b>${tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")}</b>
            <span>${tr("Выберите тур и темы, которые нужно закрыть.", "Yopish kerak bo‘lgan tur va mavzularni tanlang.", "Choose tour and topics to study.")}</span>
          </button>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="modal-close">${tr("Закрыть", "Yopish", "Close")}</button>
        </div>
      `
    ));
  }

  function syncPhaseSelect() {
    const select = document.getElementById("psp-phase-select");
    if (select && select.value !== getPhaseRaw()) select.value = getPhaseRaw();
  }

  function installPreviewPhaseSelect() {
    const topbarRight =
      document.querySelector("#topbar .topbar-right") ||
      document.querySelector(".topbar-right");

    if (!topbarRight) return;

    let wrap = document.getElementById("psp-phase-select-wrap");

    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "psp-phase-select-wrap";
      wrap.innerHTML = `
        <select id="psp-phase-select" aria-label="Preview state">
          <option value="auto">Auto</option>
          <option value="postseason">После 7 туров</option>
          <option value="grand_open">Финал открыт</option>
          <option value="grand_in_progress">Финал начат</option>
          <option value="grand_submitted">Ответы приняты</option>
          <option value="grand_finalizing">Расчёт</option>
          <option value="grand_ready">Итоги готовы</option>
        </select>
      `;

      const bell =
        document.getElementById("topbar-notifications") ||
        topbarRight.querySelector("[data-action='open-notifications']") ||
        topbarRight.firstElementChild;

      topbarRight.insertBefore(wrap, bell || null);

      const select = wrap.querySelector("#psp-phase-select");

      select.addEventListener("change", () => {
        setPhase(select.value || "auto");
        closeModal();
        renderHomeRouter();
      });
    }

    syncPhaseSelect();
    wrap.style.display = isHomeActive() ? "block" : "none";
  }

  function decorateRatingTab() {
    const view = document.querySelector("#view-rating.is-active, [data-view='rating'].is-active, .rating-view.is-active");
    if (!view) return;

    if (document.getElementById("psp-rating-final-hint")) return;

    const target = view.querySelector(".content") || view;

    const box = document.createElement("div");
    box.id = "psp-rating-final-hint";
    box.className = "psp-rating-hint";
    box.innerHTML = `
      <div class="psp-kicker">${tr("РЕЙТИНГ", "REYTING", "RANKING")}</div>
      <div class="psp-rating-title">${tr("Финал будет отдельным пунктом", "Final alohida bo‘ladi", "Final will be separate")}</div>
      <div class="psp-rating-tabs">
        <span>${tr("Все 7 туров", "7 tur", "All 7 tours")}</span>
        <span>${tr("Тур 1", "1-tur", "Tour 1")}</span>
        <span>...</span>
        <span>${tr("Тур 7", "7-tur", "Tour 7")}</span>
        <b>${tr("Финал", "Final", "Final")}</b>
      </div>
      <div class="psp-muted">${tr("Финал не входит в “Все 7 туров”. В main это будет tour_no = 8.", "Final “7 tur” ichiga kirmaydi. Main’da bu tour_no = 8 bo‘ladi.", "Final is not included in all 7 tours. In main it maps to tour_no = 8.")}</div>
    `;

    target.prepend(box);
  }

  function bindGlobal() {
    if (window.__pspV30Bound) return;
    window.__pspV30Bound = true;

    document.addEventListener("click", (event) => {
      const btn = event.target?.closest?.("[data-psp-action]");
      if (!btn) return;

      const action = String(btn.dataset.pspAction || "");
      const key = btn.dataset.subject || getGrandSubject();

      event.preventDefault();
      event.stopPropagation();

      if (action === "modal-close") return closeModal();

      if (action === "to-summaries") {
        closeModal();
        document.getElementById("psp-home")?.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
      }

      if (action === "plan") return showPlan();
      if (action === "grand-select") return showGrandSelect();
      if (action === "grand-confirm") return showGrandConfirm(key);

      if (action === "grand-start") {
        resetQuizState(key);
        return showGrandAttempt(key);
      }

      if (action === "grand-continue") return showGrandAttempt(key);

      if (action === "grand-pick") {
        pickAnswer(key, btn.dataset.option || "");
        return showGrandAttempt(key);
      }

      if (action === "grand-answer") {
        const state = answerCurrentQuestion(key);
        if (state.finished) return showGrandSubmitted(key, "submitted");
        return showGrandAttempt(key);
      }

      if (action === "grand-finish-now") {
        return finishFinalAttempt(key, "submitted");
      }

      if (action === "grand-status") return showGrandSubmitted(key);
      if (action === "grand-finalizing") return showGrandFinalizing();
      if (action === "grand-result") return showGrandResult(key);
      if (action === "grand-certificate") return showGrandCertificate(key);

      if (action === "report") return showReport(key);
      if (action === "practice") return showPractice(key);
    }, true);
  }

  function injectStyles() {
    if (document.getElementById("psp-v30-styles")) return;

    const style = document.createElement("style");
    style.id = "psp-v30-styles";
    style.textContent = `
      .psp-modal-open {
        overflow: hidden !important;
      }

      #psp-home {
        display: grid;
        gap: 12px;
      }

      .psp-grand-card,
      .psp-subject-card,
      .psp-panel,
      .psp-rating-hint {
        background: #fff;
        border: 1px solid rgba(226,232,240,.92);
        border-radius: 18px;
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      .psp-grand-card {
        padding: 14px;
        border-color: rgba(245,158,11,.28);
      }

      .psp-kicker {
        color: #2563eb;
        font-size: 11px;
        line-height: 1.1;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
      }

      .psp-grand-title,
      .psp-modal-title {
        margin-top: 5px;
        color: #0f172a;
        font-size: 19px;
        line-height: 1.12;
        font-weight: 950;
      }

      .psp-grand-sub,
      .psp-grand-note,
      .psp-muted {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.42;
        font-weight: 650;
      }

      .psp-grand-sub {
        margin-top: 4px;
      }

      .psp-grand-note {
        margin: 10px 0 0;
      }

      .psp-grand-stats,
      .psp-report-grid {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 7px;
        margin: 12px 0;
      }

      .psp-report-grid {
        grid-template-columns: repeat(2,minmax(0,1fr));
      }

      .psp-grand-stats div,
      .psp-report-grid div {
        min-height: 42px;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 13px;
        background: rgba(248,250,252,.96);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .psp-grand-stats b,
      .psp-report-grid b {
        color: #2563eb;
        font-size: 16px;
        font-weight: 950;
      }

      .psp-grand-stats span,
      .psp-report-grid span {
        color: rgba(15,23,42,.55);
        font-size: 10px;
        font-weight: 850;
        margin-top: 3px;
      }

      .psp-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        margin-top: 12px;
      }

      .psp-actions.single {
        grid-template-columns: 1fr;
      }

      .psp-full {
        width: 100%;
        margin-top: 12px;
      }

      .psp-section h2 {
        margin: 0 0 4px;
        color: #0f172a;
        font-size: 18px;
        font-weight: 950;
      }

      .psp-section p {
        margin: 0 0 10px;
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.4;
      }

      .psp-subject-list {
        display: grid;
        gap: 12px;
      }

      .psp-subject-card {
        overflow: hidden;
      }

      .psp-metrics {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 7px;
        margin: 12px 0 8px;
      }

      .psp-metrics div {
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 12px;
        background: rgba(248,250,252,.96);
        min-height: 42px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .psp-metrics b {
        color: #2563eb;
        font-size: 15px;
        font-weight: 950;
      }

      .psp-metrics span {
        color: rgba(15,23,42,.55);
        font-size: 10px;
        font-weight: 850;
        margin-top: 3px;
      }

      .psp-study-pill {
        border-radius: 999px;
        background: rgba(245,158,11,.13);
        color: #b45309;
        padding: 7px 10px;
        font-size: 11px;
        line-height: 1;
        font-weight: 900;
        margin-bottom: 10px;
      }

      #psp-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
      }

      .psp-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(15,23,42,.50);
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }

      .psp-modal-card {
        width: min(100%, 430px);
        max-height: 92vh;
        overflow: auto;
        background: #fff;
        border-radius: 22px 22px 0 0;
        padding: 14px;
        box-shadow: 0 -18px 45px rgba(15,23,42,.22);
      }

      .psp-modal-top {
        display: grid;
        grid-template-columns: 38px 1fr;
        gap: 10px;
        align-items: start;
        margin-bottom: 12px;
      }

      .psp-back {
        width: 36px;
        height: 36px;
        border-radius: 14px;
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        color: #0f172a;
        font-size: 18px;
        font-weight: 900;
      }

      .psp-panel {
        padding: 12px;
        margin-top: 10px;
      }

      .psp-panel.soft {
        background: rgba(248,250,252,.74);
      }

      .psp-panel.study {
        border-color: rgba(245,158,11,.24);
        background: linear-gradient(135deg, rgba(245,158,11,.055), #fff);
      }

      .psp-panel-title {
        color: rgba(15,23,42,.66);
        font-size: 12px;
        line-height: 1.2;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      .psp-steps {
        display: grid;
        gap: 9px;
      }

      .psp-steps div {
        display: grid;
        grid-template-columns: 28px 1fr;
        gap: 8px;
        align-items: start;
      }

      .psp-steps b {
        width: 22px;
        height: 22px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: rgba(37,99,235,.10);
        color: #2563eb;
        font-size: 11px;
        font-weight: 950;
      }

      .psp-steps span {
        color: rgba(15,23,42,.66);
        font-size: 12px;
        line-height: 1.38;
        font-weight: 650;
      }

      .psp-choice-list,
      .psp-mode-list {
        display: grid;
        gap: 10px;
      }

      .psp-choice,
      .psp-mode {
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 16px;
        background: #fff;
        padding: 12px;
        display: grid;
        gap: 10px;
      }

      .psp-choice-title,
      .psp-mode b,
      .psp-big-status {
        color: #0f172a;
        font-size: 15px;
        line-height: 1.2;
        font-weight: 950;
      }

      .psp-mode {
        text-align: left;
      }

      .psp-mode span {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }

      .psp-chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .psp-chip-row span {
        border-radius: 999px;
        padding: 7px 10px;
        font-size: 11px;
        font-weight: 900;
      }

      .psp-chip-row .good {
        background: rgba(34,197,94,.13);
        color: #15803d;
      }

      .psp-chip-row .warn {
        background: rgba(245,158,11,.14);
        color: #b45309;
      }

      #psp-modal.psp-modal-fullscreen,
      #psp-modal.psp-modal-fullscreen .psp-fullscreen-host {
        position: fixed;
        inset: 0;
        background: #f8fafc;
        z-index: 9999;
      }

      #psp-modal.psp-modal-fullscreen .psp-fullscreen-host {
        display: flex;
        justify-content: center;
        align-items: stretch;
      }

      .psp-quiz-screen {
        width: min(100%, 430px);
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        background: #f8fafc;
        padding: 10px 14px calc(14px + env(safe-area-inset-bottom));
        box-sizing: border-box;
      }

      .psp-quiz-top {
        position: sticky;
        top: 0;
        z-index: 2;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 4px 0 10px;
        margin-bottom: 8px;
        background: #f8fafc;
      }

      .psp-quiz-progress {
        color: #0f172a;
        font-size: 16px;
        font-weight: 950;
      }

      .psp-quiz-timer {
        min-width: 68px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: #fff;
        border: 1px solid rgba(226,232,240,.95);
        color: #0f172a;
        font-size: 13px;
        font-weight: 950;
      }

      .psp-quiz-timer.is-danger {
        color: #dc2626;
        border-color: rgba(220,38,38,.30);
        background: rgba(254,226,226,.75);
      }

      .psp-quiz-subject {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.25;
        font-weight: 800;
        margin-bottom: 12px;
      }

      .psp-quiz-card {
        background: #fff;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      .psp-quiz-meta {
        color: rgba(15,23,42,.55);
        font-size: 11px;
        line-height: 1.2;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      .psp-question {
        color: #0f172a;
        font-size: 15px;
        line-height: 1.38;
        font-weight: 850;
      }

      .psp-options {
        display: grid;
        gap: 8px;
        margin-top: 12px;
      }

      .psp-options button {
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        border-radius: 14px;
        padding: 11px;
        text-align: left;
        color: #0f172a;
        font-weight: 800;
        display: grid;
        grid-template-columns: 28px 1fr;
        align-items: center;
        gap: 8px;
      }

      .psp-options button.is-picked {
        border-color: rgba(37,99,235,.34);
        background: rgba(37,99,235,.08);
        color: #2563eb;
      }

      .psp-option-letter {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: rgba(15,23,42,.055);
        color: rgba(15,23,42,.68);
        font-size: 11px;
        font-weight: 950;
      }

      .psp-options button.is-picked .psp-option-letter {
        background: rgba(37,99,235,.15);
        color: #2563eb;
      }

      .psp-quiz-actions {
        margin-top: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        padding-top: 14px;
      }

      .psp-quiz-actions .btn[disabled] {
        opacity: .45;
        pointer-events: none;
      }

      .psp-tour-cert {
        border-radius: 22px;
        padding: 18px;
        background: linear-gradient(135deg, #fff, rgba(37,99,235,.07));
        border: 1px solid rgba(37,99,235,.18);
        box-shadow: 0 12px 30px rgba(15,23,42,.08);
      }

      .psp-tour-cert-head {
        text-align: center;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(226,232,240,.82);
      }

      .psp-cert-logo {
        color: #2563eb;
        font-weight: 950;
      }

      .psp-tour-cert-type {
        margin-top: 6px;
        color: #0f172a;
        font-size: 18px;
        font-weight: 950;
      }

      .psp-tour-cert-name {
        margin-top: 16px;
        text-align: center;
        color: #0f172a;
        font-size: 19px;
        font-weight: 950;
      }

      .psp-tour-cert-line {
        margin-top: 6px;
        text-align: center;
        color: rgba(15,23,42,.62);
        font-size: 12px;
        font-weight: 800;
      }

      .psp-tour-cert-grid {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: 7px;
        margin-top: 14px;
      }

      .psp-tour-cert-grid div {
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        border-radius: 13px;
        min-height: 46px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .psp-tour-cert-grid b {
        color: #2563eb;
        font-size: 15px;
        font-weight: 950;
      }

      .psp-tour-cert-grid span {
        margin-top: 3px;
        color: rgba(15,23,42,.55);
        font-size: 10px;
        font-weight: 850;
      }

      .psp-tour-cert-code {
        margin-top: 14px;
        text-align: center;
        color: rgba(15,23,42,.48);
        font-size: 10px;
        line-height: 1.35;
        font-weight: 850;
        word-break: break-all;
      }

      #psp-phase-select-wrap {
        display: block;
        margin-right: 6px;
      }

      #psp-phase-select {
        max-width: 124px;
        height: 30px;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 999px;
        background: #fff;
        color: #2563eb;
        font-size: 11px;
        font-weight: 900;
        padding: 0 8px;
        outline: none;
      }
    `;

    document.head.appendChild(style);
  }

  function boot() {
    applyPhaseFromUrl();
    injectStyles();
    bindGlobal();
    installPreviewPhaseSelect();

    const tick = () => {
      try { installPreviewPhaseSelect(); } catch {}
      try { renderHomeRouter(); } catch {}
      try { decorateRatingTab(); } catch {}
    };

    setTimeout(tick, 100);
    setTimeout(tick, 400);
    setTimeout(tick, 1000);
    setInterval(tick, 1200);
  }

  boot();
})();
