(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  const BUILD = "fix-preview-db-off-click-v23-20260530";
  window.ICLUB_POSTSEASON_PREVIEW_BUILD = BUILD;
  console.info("[iClub Preview] post-season build:", BUILD);

  /*
    Preview-only layer. No Supabase writes. No production DB calls.

    Future main mapping:
    - Grand Final = tours.tour_no = 8
    - Final attempt = current tour_attempts
    - Final answers = current tour_answers
    - Final ranking = current ratings_cache / fallback tour_attempts
    - Final certificate = current issue_tour_certificate(final_attempt_id)
    - "Все 7 туров" must remain tour_no 1..7. Final is a separate rating option.
  */

  const STORAGE = {
    phase: "iclub_preview_phase_v22",
    subject: "iclub_preview_grand_subject_v22"
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
      topics: {
        5: [["Market intervention", 18, 24], ["Elasticity", 11, 18], ["Consumer surplus", 8, 12]],
        6: [["Macroeconomic policy", 16, 22], ["Exchange rates", 9, 14], ["Evaluation paragraphs", 7, 12]],
        7: [["Balance of payments", 13, 18], ["Development economics", 10, 16], ["Globalisation", 8, 12]]
      },
      final: { score: 17, total: 20, percent: 85, time: "12:45", regionRank: 8, overallRank: 31 }
    },
    mathematics: {
      title: "Математика",
      tours: "5/7",
      avg: "68%",
      rank: "#18",
      weak: 4,
      strong: ["Quadratics", "Graphs", "Coordinate geometry"],
      study: ["Trigonometric identities", "Binomial coefficients", "Inequalities", "Series"],
      topics: {
        5: [["Quadratics", 17, 22], ["Graphs", 13, 18], ["Coordinate geometry", 9, 14]],
        6: [["Trigonometric identities", 12, 20], ["Binomial coefficients", 8, 12], ["Series", 7, 10]],
        7: [["Inequalities", 11, 16], ["Differentiation", 10, 14], ["Integration", 8, 12]]
      },
      final: { score: 15, total: 20, percent: 75, time: "14:10", regionRank: 12, overallRank: 46 }
    }
  };

  const LEADERBOARD_FINAL = [
    { rank: 1, name: "Azizbek", meta: "Toshkent", score: "20/20", time: "10:58" },
    { rank: 2, name: "Nigina", meta: "Farg‘ona", score: "19/20", time: "11:30" },
    { rank: 3, name: "Sardorbek", meta: "Qoraqalpog‘iston", score: "19/20", time: "12:20" },
    { rank: 8, name: "Siz", meta: "Sizning hududingiz", score: "17/20", time: "12:45", me: true }
  ];

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
    document.getElementById("psp-modal")?.remove();

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
    const final = subject.final;

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
        note: tr("Продолжите попытку. После завершения ответы изменить нельзя.", "Urinishni davom ettiring. Yakunlangandan keyin javoblarni o‘zgartirib bo‘lmaydi.", "Continue the attempt. Answers cannot be changed after submission."),
        stats: commonStats,
        actions: `<button type="button" class="btn primary psp-full" data-psp-action="grand-continue" data-subject="${esc(key)}">${tr("Продолжить финал", "Finalni davom ettirish", "Continue final")}</button>`
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
        title: `${subject.title} · ${final.score}/${final.total}`,
        sub: `#${final.regionRank} ${tr("в регионе", "hududda", "region")} · #${final.overallRank} ${tr("общий рейтинг", "umumiy reyting", "overall")}`,
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

    const modal = document.createElement("div");
    modal.id = "psp-modal";
    modal.innerHTML = `<div class="psp-backdrop">${html}</div>`;
    document.body.appendChild(modal);
    document.documentElement.classList.add("psp-modal-open");
    document.body.classList.add("psp-modal-open");
  }

  function closeModal() {
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
          <div class="psp-panel-title">${tr("Что важно", "Muhim jihatlar", "Key rules")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Одна финальная попытка по предмету.", "Fan bo‘yicha bitta final urinishi.", "One final attempt per subject.")}</span></div>
            <div><b>2</b><span>${tr("Ответы нельзя изменить после завершения.", "Yakunlangandan keyin javoblarni o‘zgartirib bo‘lmaydi.", "Answers cannot be changed after submission.")}</span></div>
            <div><b>3</b><span>${tr("Результат откроется после расчёта рейтинга.", "Natija reyting hisoblangandan keyin ochiladi.", "Result opens after ranking is calculated.")}</span></div>
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

    openModal(modalShell(
      tr("ФИНАЛ ИДЁТ", "FINAL DAVOM ETMOQDA", "FINAL IN PROGRESS"),
      `${d.title} · Grand Final`,
      "7/20 · 12:45",
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Вопрос финала", "Final savoli", "Final question")}</div>
          <div class="psp-question">${tr("Какой вариант лучше показывает применение темы, а не простое запоминание термина?", "Qaysi javob mavzuni shunchaki yodlash emas, qo‘llashni yaxshiroq ko‘rsatadi?", "Which option best shows applying a topic rather than memorising a term?")}</div>
          <div class="psp-options">
            <button>A. ${tr("Вспомнить определение", "Ta’rifni eslash", "Recall a definition")}</button>
            <button class="is-picked">B. ${tr("Применить идею к новой ситуации", "G‘oyani yangi vaziyatda qo‘llash", "Apply the idea to a new situation")}</button>
            <button>C. ${tr("Выбрать по ключевому слову", "Kalit so‘z orqali tanlash", "Choose by keyword")}</button>
            <button>D. ${tr("Пропустить вопрос", "Savolni o‘tkazib yuborish", "Skip the question")}</button>
          </div>
        </div>
        <div class="psp-actions">
          <button type="button" class="btn primary" data-psp-action="grand-submit" data-subject="${esc(key)}">${tr("Завершить финал", "Finalni yakunlash", "Submit final")}</button>
          <button type="button" class="btn" data-psp-action="modal-close">${tr("Выйти", "Chiqish", "Exit")}</button>
        </div>
      `
    ));
  }

  function showGrandSubmitted(key) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);
    setPhase("grand_submitted");
    renderHomeRouter();

    openModal(modalShell(
      tr("ОТВЕТЫ ПРИНЯТЫ", "JAVOBLAR QABUL QILINDI", "ANSWERS RECEIVED"),
      `${d.title} · Grand Final`,
      tr("Ответы сохранены.", "Javoblar saqlandi.", "Answers saved."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Статус", "Holat", "Status")}</div>
          <div class="psp-big-status">${tr("Попытка завершена", "Urinish yakunlandi", "Attempt submitted")}</div>
          <div class="psp-muted">${tr("Результат, рейтинг и сертификат появятся после завершения финального окна.", "Natija, reyting va sertifikat final oynasi tugagandan keyin chiqadi.", "Result, ranking and certificate appear after the final window closes.")}</div>
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
    const r = d.final;
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
    const r = d.final;

    openModal(modalShell(
      tr("СЕРТИФИКАТ", "SERTIFIKAT", "CERTIFICATE"),
      "Grand Final Certificate",
      `${d.title} · ${r.percent}% · #${r.regionRank} ${tr("в регионе", "hududda", "region")}`,
      `
        <div class="psp-cert">
          <div class="psp-cert-logo">iClub</div>
          <div class="psp-cert-title">Grand Final Certificate</div>
          <div class="psp-cert-name">Preview Student</div>
          <div class="psp-cert-meta">${esc(d.title)} · ${r.score}/${r.total} · ${r.time}</div>
          <div class="psp-cert-code">ICL-202606-GF-${esc(String(key).toUpperCase())}-PREVIEW</div>
        </div>

        <div class="psp-panel soft">
          <div class="psp-panel-title">${tr("Как будет в main", "Main’da qanday bo‘ladi", "Main mapping")}</div>
          <div class="psp-muted">${tr("В рабочем app это будет текущий tour certificate по финальному туру, но с названием Grand Final.", "Ishchi app’da bu final tur bo‘yicha odatiy sertifikat bo‘ladi, lekin Grand Final nomi bilan.", "In main this uses the current tour certificate for the final tour, labelled Grand Final.")}</div>
        </div>

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="grand-result" data-subject="${esc(key)}">${tr("К результату", "Natijaga", "Back to result")}</button>
        </div>
      `
    ));
  }

  function showReport(key, scope = "season") {
    const d = DATA[key] || DATA.economics;

    const tabs = [
      ["season", tr("Итог сезона", "Mavsum yakuni", "Season")],
      ["tour1", tr("Тур 1", "1-tur", "Tour 1")],
      ["tour2", tr("Тур 2", "2-tur", "Tour 2")],
      ["tour3", tr("Тур 3", "3-tur", "Tour 3")],
      ["tour4", tr("Тур 4", "4-tur", "Tour 4")],
      ["tour5", tr("Тур 5", "5-tur", "Tour 5")],
      ["tour6", tr("Тур 6", "6-tur", "Tour 6")],
      ["tour7", tr("Тур 7", "7-tur", "Tour 7")]
    ];

    const tourNo = scope.startsWith("tour") ? Number(scope.replace("tour", "")) : null;
    const isTour = !!tourNo;

    openModal(modalShell(
      isTour ? tr("ИТОГ ТУРА", "TUR YAKUNI", "TOUR SUMMARY") : tr("ИТОГ СЕЗОНА", "MAVSUM YAKUNI", "SEASON SUMMARY"),
      isTour ? `${d.title} · ${tr("Тур", "Tur", "Tour")} ${tourNo}` : d.title,
      isTour ? tr("Итог выбранного тура.", "Tanlangan tur yakuni.", "Selected tour summary.") : tr("Общий итог сезона по предмету.", "Fan bo‘yicha mavsum yakuni.", "Subject season summary."),
      `
        <div class="psp-tabs">
          ${tabs.map(([value, label]) => `<button type="button" class="${value === scope ? "is-on" : ""}" data-psp-action="report" data-subject="${esc(key)}" data-scope="${esc(value)}">${esc(label)}</button>`).join("")}
        </div>

        <div class="psp-report-grid">
          <div><b>${isTour ? "85%" : esc(d.tours)}</b><span>${isTour ? tr("Результат", "Natija", "Result") : tr("Туры", "Turlar", "Tours")}</span></div>
          <div><b>${isTour ? "#8" : esc(d.avg)}</b><span>${isTour ? tr("Регион", "Hudud", "Region") : tr("Средний", "O‘rtacha", "Average")}</span></div>
          <div><b>${isTour ? "3" : esc(d.rank)}</b><span>${isTour ? tr("Ошибки", "Xatolar", "Mistakes") : tr("Регион", "Hudud", "Region")}</span></div>
          <div><b>${isTour ? "12:45" : "18"}</b><span>${isTour ? tr("Время", "Vaqt", "Time") : tr("Практики", "Amaliyot", "Practices")}</span></div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Освоенные темы", "O‘zlashtirilgan mavzular", "Mastered topics")}</div>
          <div class="psp-chip-row">${d.strong.map((x) => `<span class="good">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="psp-panel study">
          <div class="psp-panel-title">${tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study")}</div>
          <div class="psp-chip-row">${d.study.map((x) => `<span class="warn">${esc(x)}</span>`).join("")}</div>
          <button type="button" class="btn primary psp-full" data-psp-action="practice" data-subject="${esc(key)}" data-mode="study" data-tour="${esc(tourNo || "")}">${tr("Начать изучение", "O‘rganishni boshlash", "Start studying")}</button>
        </div>
      `
    ));
  }

  function topicRows(key, tour = 7) {
    const d = DATA[key] || DATA.economics;
    const rows = d.topics[tour] || d.topics[7] || [];

    return rows.map((row, index) => `
      <button type="button" class="psp-topic ${index === 0 ? "is-on" : ""}" data-topic="${esc(row[0])}">
        <span>${esc(row[0])}</span>
        <small>${row[1]}/${row[2]}</small>
      </button>
    `).join("");
  }

  function showPractice(key, mode = "regular", tour = 7) {
    const d = DATA[key] || DATA.economics;
    const selectedMode = mode || "regular";

    openModal(modalShell(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      tr("Выберите формат", "Formatni tanlang", "Choose format"),
      `${d.title}`,
      `
        <div class="psp-mode-list">
          <button type="button" class="psp-mode ${selectedMode === "regular" ? "is-on" : ""}" data-psp-action="practice" data-subject="${esc(key)}" data-mode="regular">
            <b>${tr("Обычная практика", "Oddiy amaliyot", "Regular practice")}</b>
            <span>${tr("Быстрый запуск привычной практики по предмету.", "Fan bo‘yicha odatiy amaliyotni tez boshlash.", "Quick start for usual practice.")}</span>
          </button>

          <button type="button" class="psp-mode ${selectedMode === "study" ? "is-on" : ""}" data-psp-action="practice" data-subject="${esc(key)}" data-mode="study">
            <b>${tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")}</b>
            <span>${tr("Выберите тур и темы, которые нужно закрыть.", "Yopish kerak bo‘lgan tur va mavzularni tanlang.", "Choose tour and topics to study.")}</span>
          </button>

          <button type="button" class="psp-mode ${selectedMode === "custom" ? "is-on" : ""}" data-psp-action="practice" data-subject="${esc(key)}" data-mode="custom">
            <b>${tr("Собрать практику", "Amaliyot yig‘ish", "Build practice")}</b>
            <span>${tr("Настройте тур, темы, сложность и количество.", "Tur, mavzu, qiyinlik va sonini tanlang.", "Choose tour, topics, difficulty and count.")}</span>
          </button>
        </div>

        ${selectedMode === "regular" ? "" : `
          <div class="psp-builder">
            <div class="psp-panel-title">${tr("Тур", "Tur", "Tour")}</div>
            <div class="psp-pills">
              ${[5, 6, 7].map((n) => `<button type="button" class="${Number(tour) === n ? "is-on" : ""}" data-psp-action="practice" data-subject="${esc(key)}" data-mode="${esc(selectedMode)}" data-tour="${n}">${n}</button>`).join("")}
            </div>

            <div class="psp-panel-title">${tr("Темы", "Mavzular", "Topics")}</div>
            <div class="psp-topic-list">${topicRows(key, Number(tour) || 7)}</div>

            <div class="psp-panel-title">${tr("Количество", "Soni", "Count")}</div>
            <div class="psp-pills">
              <button>5</button><button class="is-on">10</button><button>20</button><button>30</button>
            </div>
          </div>
        `}

        <div class="psp-actions single">
          <button type="button" class="btn primary" data-psp-action="practice-ready" data-subject="${esc(key)}" data-mode="${esc(selectedMode)}">${selectedMode === "regular" ? tr("Начать обычную практику", "Oddiy amaliyotni boshlash", "Start regular practice") : tr("Начать изучение", "O‘rganishni boshlash", "Start studying")}</button>
        </div>
      `
    ));
  }

  function showPracticeReady(key) {
    const d = DATA[key] || DATA.economics;

    openModal(modalShell(
      tr("ПРАКТИКА ГОТОВА", "AMALIYOT TAYYOR", "PRACTICE READY"),
      d.title,
      tr("Выбранные вопросы готовы к запуску.", "Tanlangan savollar tayyor.", "Selected questions are ready."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что дальше", "Keyingi qadam", "Next")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Откроется обычный экран практики.", "Oddiy amaliyot ekrani ochiladi.", "The usual practice screen opens.")}</span></div>
            <div><b>2</b><span>${tr("Ответы сохраняются после каждого вопроса.", "Javoblar har savoldan keyin saqlanadi.", "Answers are saved after each question.")}</span></div>
            <div><b>3</b><span>${tr("После завершения откроются ошибки и рекомендации.", "Yakunlangandan keyin xatolar va tavsiyalar ochiladi.", "Mistakes and recommendations open after finishing.")}</span></div>
          </div>
        </div>
        <div class="psp-actions">
          <button type="button" class="btn primary" data-psp-action="practice" data-subject="${esc(key)}" data-mode="study">${tr("Изменить", "O‘zgartirish", "Change")}</button>
          <button type="button" class="btn" data-psp-action="modal-close">${tr("Закрыть", "Yopish", "Close")}</button>
        </div>
      `
    ));
  }

  function openPreviewControls() {
    const current = getPhaseRaw();

    openModal(modalShell(
      "PREVIEW",
      "DB off",
      tr("Это панель проверки preview-сценариев. В main её не будет.", "Bu preview tekshiruv paneli. Main’da bo‘lmaydi.", "Preview scenario panel. It will not exist in main."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Состояние главного экрана", "Bosh ekran holati", "Home state")}</div>
          <div class="psp-dev-grid">
            ${PHASES.map(([key, label]) => `
              <button type="button" class="${current === key ? "is-on" : ""}" data-psp-action="set-phase" data-phase="${esc(key)}">${esc(label)}</button>
            `).join("")}
          </div>
        </div>

        <div class="psp-panel soft">
          <div class="psp-panel-title">${tr("Правило подключения", "Ulanish qoidasi", "Connection rule")}</div>
          <div class="psp-muted">${tr("Auto: если активен обычный тур, Home остаётся как в main. Post-season включается только после завершения обычных туров.", "Auto: oddiy tur aktiv bo‘lsa, Home main kabi qoladi. Post-season faqat oddiy turlar tugagandan keyin yoqiladi.", "Auto: if a regular tour is active, Home stays like main. Post-season appears only after regular tours finish.")}</div>
        </div>
      `
    ));
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

  function decorateProfileCertificates() {
    if (effectivePhase() !== "grand_ready") return;

    const view = document.querySelector("#view-profile.is-active, [data-view='profile'].is-active, .profile-view.is-active");
    if (!view) return;
    if (document.getElementById("psp-grand-cert-profile")) return;

    const text = String(view.textContent || "");
    if (!text.includes("Мои сертификаты") && !text.includes("сертификат")) return;

    const target = view.querySelector(".content") || view;
    const card = document.createElement("div");
    card.id = "psp-grand-cert-profile";
    card.className = "psp-profile-cert";
    card.innerHTML = `
      <div>
        <div class="psp-profile-cert-title">Grand Final Certificate</div>
        <div class="psp-muted">${tr("Доступен после финала", "Finaldan keyin mavjud", "Available after final")}</div>
      </div>
      <button type="button" class="btn" data-psp-action="grand-certificate" data-subject="${esc(getGrandSubject())}">${tr("Открыть", "Ochish", "Open")}</button>
    `;

    target.appendChild(card);
  }


  function isPreviewDbOffTrigger(target) {
    let node = target;

    for (let i = 0; node && i < 8; i += 1, node = node.parentElement) {
      if (!node || node === document.body || node === document.documentElement) continue;

      const text = String(node.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      const cls = String(node.className || "").toLowerCase();
      const id = String(node.id || "").toLowerCase();

      const looksLikePreviewBadge =
        (text.includes("preview") && (text.includes("db off") || text.includes("дб офф"))) ||
        (cls.includes("preview") && cls.includes("db")) ||
        (id.includes("preview") && id.includes("db"));

      if (looksLikePreviewBadge) return node;
    }

    return null;
  }

  function interceptPreviewDbOff(event) {
    const trigger = isPreviewDbOffTrigger(event.target);
    if (!trigger) return false;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    openPreviewControls();
    return true;
  }

  function bindGlobal() {
    if (window.__pspCleanBound) return;
    window.__pspCleanBound = true;

    document.addEventListener("pointerdown", (event) => {
      interceptPreviewDbOff(event);
    }, true);

    document.addEventListener("click", (event) => {
      if (interceptPreviewDbOff(event)) return;

      const btn = event.target?.closest?.("[data-psp-action]");
      if (!btn) return;

      const action = String(btn.dataset.pspAction || "");
      const key = btn.dataset.subject || getGrandSubject();

      event.preventDefault();
      event.stopPropagation();

      if (action === "modal-close") return closeModal();

      if (action === "set-phase") {
        setPhase(btn.dataset.phase || "auto");
        closeModal();
        renderHomeRouter();
        return;
      }

      if (action === "to-summaries") {
        closeModal();
        document.getElementById("psp-home")?.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
      }

      if (action === "plan") return showPlan();
      if (action === "grand-select") return showGrandSelect();
      if (action === "grand-confirm") return showGrandConfirm(key);
      if (action === "grand-start" || action === "grand-continue") return showGrandAttempt(key);
      if (action === "grand-submit" || action === "grand-status") return showGrandSubmitted(key);
      if (action === "grand-finalizing") return showGrandFinalizing();
      if (action === "grand-result") return showGrandResult(key);
      if (action === "grand-certificate") return showGrandCertificate(key);

      if (action === "report") return showReport(key, btn.dataset.scope || "season");
      if (action === "practice") return showPractice(key, btn.dataset.mode || "regular", Number(btn.dataset.tour || 7));
      if (action === "practice-ready") return showPracticeReady(key);
    }, true);
  }

  function injectStyles() {
    if (document.getElementById("psp-clean-styles")) return;

    const style = document.createElement("style");
    style.id = "psp-clean-styles";
    style.textContent = `
      .psp-modal-open { overflow:hidden !important; }

      #psp-home {
        display:grid;
        gap:12px;
      }

      .psp-grand-card,
      .psp-subject-card,
      .psp-panel,
      .psp-rating-hint,
      .psp-profile-cert {
        background:#fff;
        border:1px solid rgba(226,232,240,.92);
        border-radius:18px;
        box-shadow:0 8px 22px rgba(15,23,42,.06);
      }

      .psp-grand-card {
        padding:14px;
        border-color:rgba(245,158,11,.28);
      }

      .psp-kicker {
        color:#2563eb;
        font-size:11px;
        line-height:1.1;
        font-weight:950;
        letter-spacing:.04em;
        text-transform:uppercase;
      }

      .psp-grand-title,
      .psp-modal-title {
        margin-top:5px;
        color:#0f172a;
        font-size:19px;
        line-height:1.12;
        font-weight:950;
      }

      .psp-grand-sub,
      .psp-grand-note,
      .psp-muted {
        color:rgba(15,23,42,.62);
        font-size:12px;
        line-height:1.42;
        font-weight:650;
      }

      .psp-grand-sub { margin-top:4px; }
      .psp-grand-note { margin:10px 0 0; }

      .psp-grand-stats,
      .psp-report-grid {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:7px;
        margin:12px 0;
      }

      .psp-report-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      .psp-grand-stats div,
      .psp-report-grid div {
        min-height:42px;
        border:1px solid rgba(226,232,240,.95);
        border-radius:13px;
        background:rgba(248,250,252,.96);
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-align:center;
      }

      .psp-grand-stats b,
      .psp-report-grid b {
        color:#2563eb;
        font-size:16px;
        font-weight:950;
        line-height:1.05;
      }

      .psp-grand-stats span,
      .psp-report-grid span {
        color:rgba(15,23,42,.55);
        font-size:10px;
        font-weight:850;
        margin-top:3px;
      }

      .psp-actions {
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:9px;
        margin-top:12px;
      }

      .psp-actions.single {
        grid-template-columns:1fr;
      }

      .psp-full {
        width:100%;
        margin-top:12px;
      }

      .psp-section h2 {
        margin:0 0 4px;
        color:#0f172a;
        font-size:18px;
        font-weight:950;
      }

      .psp-section p {
        margin:0 0 10px;
        color:rgba(15,23,42,.62);
        font-size:12px;
        line-height:1.4;
      }

      .psp-subject-list {
        display:grid;
        gap:12px;
      }

      .psp-subject-card {
        overflow:hidden;
      }

      .psp-metrics {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:7px;
        margin:12px 0 8px;
      }

      .psp-metrics div {
        border:1px solid rgba(226,232,240,.95);
        border-radius:12px;
        background:rgba(248,250,252,.96);
        min-height:42px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      }

      .psp-metrics b {
        color:#2563eb;
        font-size:15px;
        font-weight:950;
        line-height:1;
      }

      .psp-metrics span {
        color:rgba(15,23,42,.55);
        font-size:10px;
        font-weight:850;
        margin-top:3px;
      }

      .psp-study-pill {
        border-radius:999px;
        background:rgba(245,158,11,.13);
        color:#b45309;
        padding:7px 10px;
        font-size:11px;
        line-height:1;
        font-weight:900;
        margin-bottom:10px;
      }

      #psp-modal {
        position:fixed;
        inset:0;
        z-index:9999;
      }

      .psp-backdrop {
        position:absolute;
        inset:0;
        background:rgba(15,23,42,.50);
        display:flex;
        align-items:flex-end;
        justify-content:center;
      }

      .psp-modal-card {
        width:min(100%, 430px);
        max-height:92vh;
        overflow:auto;
        background:#fff;
        border-radius:22px 22px 0 0;
        padding:14px;
        box-shadow:0 -18px 45px rgba(15,23,42,.22);
      }

      .psp-modal-top {
        display:grid;
        grid-template-columns:38px 1fr;
        gap:10px;
        align-items:start;
        margin-bottom:12px;
      }

      .psp-back {
        width:36px;
        height:36px;
        border-radius:14px;
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        color:#0f172a;
        font-size:18px;
        font-weight:900;
      }

      .psp-panel {
        padding:12px;
        margin-top:10px;
      }

      .psp-panel.soft {
        background:rgba(248,250,252,.74);
      }

      .psp-panel.study {
        border-color:rgba(245,158,11,.24);
        background:linear-gradient(135deg, rgba(245,158,11,.055), #fff);
      }

      .psp-panel-title {
        color:rgba(15,23,42,.66);
        font-size:12px;
        line-height:1.2;
        font-weight:950;
        letter-spacing:.04em;
        text-transform:uppercase;
        margin-bottom:8px;
      }

      .psp-steps {
        display:grid;
        gap:9px;
      }

      .psp-steps div {
        display:grid;
        grid-template-columns:28px 1fr;
        gap:8px;
        align-items:start;
      }

      .psp-steps b {
        width:22px;
        height:22px;
        display:grid;
        place-items:center;
        border-radius:999px;
        background:rgba(37,99,235,.10);
        color:#2563eb;
        font-size:11px;
        font-weight:950;
      }

      .psp-steps span {
        color:rgba(15,23,42,.66);
        font-size:12px;
        line-height:1.38;
        font-weight:650;
      }

      .psp-choice-list,
      .psp-mode-list {
        display:grid;
        gap:10px;
      }

      .psp-choice,
      .psp-mode {
        border:1px solid rgba(226,232,240,.95);
        border-radius:16px;
        background:#fff;
        padding:12px;
        display:grid;
        gap:10px;
      }

      .psp-choice-title,
      .psp-mode b,
      .psp-big-status {
        color:#0f172a;
        font-size:15px;
        line-height:1.2;
        font-weight:950;
      }

      .psp-mode {
        text-align:left;
      }

      .psp-mode span {
        color:rgba(15,23,42,.62);
        font-size:12px;
        line-height:1.35;
        font-weight:650;
      }

      .psp-mode.is-on {
        border-color:rgba(37,99,235,.32);
        background:rgba(37,99,235,.055);
      }

      .psp-tabs,
      .psp-pills,
      .psp-rating-tabs {
        display:flex;
        gap:7px;
        overflow-x:auto;
        padding-bottom:2px;
        scrollbar-width:none;
      }

      .psp-tabs::-webkit-scrollbar,
      .psp-pills::-webkit-scrollbar,
      .psp-rating-tabs::-webkit-scrollbar {
        display:none;
      }

      .psp-tabs button,
      .psp-pills button,
      .psp-rating-tabs span,
      .psp-rating-tabs b,
      .psp-dev-grid button {
        flex:0 0 auto;
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        color:rgba(15,23,42,.66);
        border-radius:999px;
        padding:8px 11px;
        font-size:11px;
        font-weight:900;
      }

      .psp-tabs button.is-on,
      .psp-pills button.is-on,
      .psp-dev-grid button.is-on {
        background:rgba(37,99,235,.12);
        color:#2563eb;
        border-color:rgba(37,99,235,.32);
      }

      .psp-rating-tabs b {
        background:rgba(245,158,11,.13);
        color:#b45309;
        border-color:rgba(245,158,11,.34);
      }

      .psp-chip-row {
        display:flex;
        flex-wrap:wrap;
        gap:8px;
      }

      .psp-chip-row span {
        border-radius:999px;
        padding:7px 10px;
        font-size:11px;
        font-weight:900;
      }

      .psp-chip-row .good {
        background:rgba(34,197,94,.13);
        color:#15803d;
      }

      .psp-chip-row .warn {
        background:rgba(245,158,11,.14);
        color:#b45309;
      }

      .psp-builder {
        border:1px solid rgba(245,158,11,.22);
        border-radius:16px;
        padding:12px;
        background:linear-gradient(135deg, rgba(245,158,11,.055), #fff);
        margin-top:10px;
        display:grid;
        gap:10px;
      }

      .psp-topic-list {
        display:grid;
        gap:8px;
      }

      .psp-topic {
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        border-radius:13px;
        padding:10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:8px;
        text-align:left;
      }

      .psp-topic.is-on {
        border-color:rgba(245,158,11,.34);
        background:rgba(245,158,11,.08);
      }

      .psp-topic span {
        color:#0f172a;
        font-size:12px;
        font-weight:850;
      }

      .psp-topic small {
        color:#b45309;
        font-size:11px;
        font-weight:900;
      }

      .psp-question {
        color:#0f172a;
        font-size:15px;
        line-height:1.38;
        font-weight:850;
      }

      .psp-options {
        display:grid;
        gap:8px;
        margin-top:12px;
      }

      .psp-options button {
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        border-radius:14px;
        padding:11px;
        text-align:left;
        color:#0f172a;
        font-weight:800;
      }

      .psp-options button.is-picked {
        border-color:rgba(37,99,235,.34);
        background:rgba(37,99,235,.08);
        color:#2563eb;
      }

      .psp-cert {
        border-radius:22px;
        padding:18px;
        background:linear-gradient(135deg, #fff, rgba(37,99,235,.08));
        border:1px solid rgba(37,99,235,.18);
        text-align:center;
      }

      .psp-cert-logo {
        color:#2563eb;
        font-weight:950;
      }

      .psp-cert-title {
        margin-top:10px;
        color:#0f172a;
        font-size:20px;
        font-weight:950;
      }

      .psp-cert-name {
        margin-top:12px;
        color:#0f172a;
        font-size:17px;
        font-weight:900;
      }

      .psp-cert-meta,
      .psp-cert-code {
        margin-top:8px;
        color:rgba(15,23,42,.58);
        font-size:11px;
        font-weight:800;
      }

      .psp-rating-hint {
        padding:12px;
        margin-bottom:12px;
      }

      .psp-rating-title {
        margin-top:4px;
        color:#0f172a;
        font-size:15px;
        font-weight:950;
      }

      .psp-profile-cert {
        padding:12px;
        margin:12px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      }

      .psp-profile-cert-title {
        color:#0f172a;
        font-size:14px;
        font-weight:950;
      }

      .psp-dev-grid {
        display:flex;
        flex-wrap:wrap;
        gap:7px;
      }
    `;

    document.head.appendChild(style);
  }

  function boot() {
    applyPhaseFromUrl();
    injectStyles();
    bindGlobal();

    const tick = () => {
      try { renderHomeRouter(); } catch {}
      try { decorateRatingTab(); } catch {}
      try { decorateProfileCertificates(); } catch {}
    };

    setTimeout(tick, 100);
    setTimeout(tick, 400);
    setTimeout(tick, 1000);
    setInterval(tick, 1200);
  }

  boot();
})();
