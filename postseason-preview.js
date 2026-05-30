(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  window.ICLUB_POSTSEASON_PREVIEW_BUILD = "grand-final-v21-clean-flow-20260530";
  console.info("[iClub Preview] post-season build:", window.ICLUB_POSTSEASON_PREVIEW_BUILD);



  const DATA = {
    economics: {
      title: "Экономика",
      tours: "6/7",
      avg: "74%",
      rank: "#12",
      weak: 3,
      topics: {
        5: [
          ["Market intervention", 18, 24],
          ["Elasticity", 11, 18],
          ["Consumer surplus", 8, 12]
        ],
        6: [
          ["Macroeconomic policy", 16, 22],
          ["Exchange rates", 9, 14],
          ["Evaluation paragraphs", 7, 12]
        ],
        7: [
          ["Balance of payments", 13, 18],
          ["Development economics", 10, 16],
          ["Globalisation", 8, 12]
        ]
      },
      strong: ["Demand & Supply", "Elasticity", "Market intervention"],
      weakList: ["Evaluation paragraphs", "Exchange rates", "Balance of payments"]
    },
    mathematics: {
      title: "Математика",
      tours: "5/7",
      avg: "68%",
      rank: "#18",
      weak: 4,
      topics: {
        5: [
          ["Quadratics", 17, 22],
          ["Graphs", 13, 18],
          ["Coordinate geometry", 9, 14]
        ],
        6: [
          ["Trigonometric identities", 12, 20],
          ["Binomial coefficients", 8, 12],
          ["Series", 7, 10]
        ],
        7: [
          ["Inequalities", 11, 16],
          ["Differentiation", 10, 14],
          ["Integration", 8, 12]
        ]
      },
      strong: ["Quadratics", "Graphs", "Coordinate geometry"],
      weakList: ["Trigonometric identities", "Binomial coefficients", "Inequalities", "Series"]
    }
  };

  function esc(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function ps2Lang() {
    try {
      const stored = localStorage.getItem("iclub_profile_v1") || localStorage.getItem("profile") || "";
      const parsed = stored ? JSON.parse(stored) : null;
      const lang = String(parsed?.language || parsed?.language_code || parsed?.lang || document.documentElement.lang || "ru").toLowerCase();
      if (lang.startsWith("uz")) return "uz";
      if (lang.startsWith("en")) return "en";
      return "ru";
    } catch {
      const lang = String(document.documentElement.lang || "ru").toLowerCase();
      if (lang.startsWith("uz")) return "uz";
      if (lang.startsWith("en")) return "en";
      return "ru";
    }
  }

  function tr(ru, uz, en) {
    const lang = ps2Lang();
    if (lang === "uz") return uz || ru;
    if (lang === "en") return en || ru;
    return ru;
  }


  // Grand Final preview mapping.
  // Future main DB mapping:
  // - GRAND_FINAL_TOUR_NO -> tours.tour_no = 8
  // - Grand Final attempt -> existing tour_attempts row
  // - Grand Final answers -> existing tour_answers rows
  // - Grand Final ranking -> existing ratings_cache / fallback tour_attempts logic
  // - Grand Final certificate -> existing issue_tour_certificate(final_attempt_id)
  // Important: "Все 7 туров" must stay tour_no 1..7; Final is separate.
  const GRAND_FINAL_TOUR_NO = 8;
  const GRAND_FINAL_TOUR_VALUE = "__final__";
  const GRAND_FINAL_STORAGE_KEY = "iclub_preview_grand_final_state_v17";
  const GRAND_FINAL_SUBJECT_KEY = "iclub_preview_grand_final_subject_v17";

  const GRAND_STATES = [
    ["scheduled", "До открытия"],
    ["open", "Финал открыт"],
    ["in_progress", "В процессе"],
    ["submitted", "Ответы приняты"],
    ["finalizing", "Расчёт"],
    ["results_ready", "Итоги готовы"]
  ];

  const GRAND_RESULTS = {
    economics: {
      score: 17,
      total: 20,
      percent: 85,
      time: "12:45",
      rankCountry: 31,
      rankRegion: 8,
      rankDistrict: 3,
      participants: 184,
      mastered: ["Demand & Supply", "Elasticity"],
      study: ["Exchange rates", "Balance of payments"]
    },
    mathematics: {
      score: 15,
      total: 20,
      percent: 75,
      time: "14:10",
      rankCountry: 46,
      rankRegion: 12,
      rankDistrict: 4,
      participants: 201,
      mastered: ["Quadratics", "Coordinate geometry"],
      study: ["Trigonometric identities", "Series"]
    }
  };

  const GRAND_LEADERBOARD = [
    { rank: 1, name: "Azizbek", meta: "Toshkent · Region", score: 20, time: "10:58" },
    { rank: 2, name: "Nigina", meta: "Farg‘ona · Region", score: 19, time: "11:30" },
    { rank: 3, name: "Sardorbek", meta: "Qoraqalpog‘iston · Region", score: 19, time: "12:20" },
    { rank: 8, name: "Siz", meta: "Sizning hududingiz", score: 17, time: "12:45", me: true },
    { rank: 31, name: "Grand overall", meta: "Mamlakat bo‘yicha", score: 17, time: "12:45" }
  ];

  function getGrandState() {
    const raw = localStorage.getItem(GRAND_FINAL_STORAGE_KEY);
    return GRAND_STATES.some(([key]) => key === raw) ? raw : "scheduled";
  }

  function setGrandState(state) {
    const next = GRAND_STATES.some(([key]) => key === state) ? state : "scheduled";
    localStorage.setItem(GRAND_FINAL_STORAGE_KEY, next);
    return next;
  }

  function applyGrandStateFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const raw = params.get("grand");
      if (!raw) return;

      const aliases = {
        before: "scheduled",
        scheduled: "scheduled",
        open: "open",
        started: "in_progress",
        in_progress: "in_progress",
        submitted: "submitted",
        finalizing: "finalizing",
        results: "results_ready",
        results_ready: "results_ready"
      };

      if (aliases[raw]) setGrandState(aliases[raw]);
    } catch {}
  }

  window.setGrandPreviewState = function setGrandPreviewState(state) {
    const next = setGrandState(state);
    try { closeModal(); } catch {}
    try { renderHome(); } catch {}
    console.info("[iClub Preview] Grand Final state:", next);
    return next;
  };


  function getGrandSubject() {
    const raw = localStorage.getItem(GRAND_FINAL_SUBJECT_KEY);
    return raw && DATA[raw] ? raw : (subjectKeys()[0] || "economics");
  }

  function setGrandSubject(key) {
    const next = DATA[key] ? key : "economics";
    localStorage.setItem(GRAND_FINAL_SUBJECT_KEY, next);
    return next;
  }

  function grandResultFor(key) {
    return GRAND_RESULTS[key] || GRAND_RESULTS.economics;
  }

  function grandStateSwitchHTML() {
    return `
      <div class="ps2-grand-dev">
        <div class="ps2-grand-switch-title">Сценарий финала</div>
        <div class="ps2-grand-switch-hint">Для проверки выберите этап финала.</div>
        <div class="ps2-grand-switch" aria-label="Grand Final scenario states">
          ${GRAND_STATES.map(([key, label]) => `
            <button type="button"
              class="${getGrandState() === key ? "is-on" : ""}"
              data-ps2-action="grand-state"
              data-state="${esc(key)}">${esc(label)}</button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function grandHomeHTML() {
    const state = getGrandState();
    const subjectKey = getGrandSubject();
    const subject = DATA[subjectKey] || DATA.economics;
    const result = grandResultFor(subjectKey);

    const cfg = {
      scheduled: {
        kicker: "ФИНАЛ СЕЗОНА",
        title: "Grand Olympiad",
        sub: "Финальный этап по выбранным предметам.",
        note: "Пока финал закрыт. Готовьтесь через итоги по предметам и практику.",
        actions: `<button type="button" class="btn primary ps2-full-btn" data-ps2-action="plan">Подробнее</button>`
      },
      open: {
        kicker: "ФИНАЛ ОТКРЫТ",
        title: "Grand Olympiad",
        sub: "Выберите предмет и начните финальную попытку.",
        note: "Результат, рейтинг и сертификат откроются после закрытия финала.",
        actions: `
          <div class="ps2-actions">
            <button type="button" class="btn primary" data-ps2-action="grand-select">Начать финал</button>
            <button type="button" class="btn" data-ps2-action="plan">Правила</button>
          </div>
        `
      },
      in_progress: {
        kicker: "ФИНАЛ НАЧАТ",
        title: `${subject.title} · Grand Final`,
        sub: "Финальная попытка в процессе.",
        note: "Продолжите попытку. После завершения финала ответы изменить нельзя.",
        actions: `<button type="button" class="btn primary ps2-full-btn" data-ps2-action="grand-continue" data-subject="${esc(subjectKey)}">Продолжить финал</button>`
      },
      submitted: {
        kicker: "ОТВЕТЫ ПРИНЯТЫ",
        title: `${subject.title} · Grand Final`,
        sub: "Ответы сохранены.",
        note: "Результат появится после закрытия финала и расчёта рейтинга.",
        actions: `<button type="button" class="btn primary ps2-full-btn" data-ps2-action="grand-submitted" data-subject="${esc(subjectKey)}">Статус финала</button>`
      },
      finalizing: {
        kicker: "РАСЧЁТ ИТОГОВ",
        title: "Grand Olympiad",
        sub: "Рейтинг и сертификаты рассчитываются.",
        note: "Система считает результаты, места и готовит сертификаты.",
        actions: `<button type="button" class="btn primary ps2-full-btn" data-ps2-action="grand-finalizing">Как идёт расчёт</button>`
      },
      results_ready: {
        kicker: "РЕЗУЛЬТАТ ГОТОВ",
        title: `${subject.title} · ${result.score}/${result.total}`,
        sub: `#${result.rankRegion} в регионе · #${result.rankCountry} общий рейтинг`,
        note: "Откройте результат, рейтинг и сертификат финала.",
        actions: `
          <div class="ps2-actions">
            <button type="button" class="btn primary" data-ps2-action="grand-result" data-subject="${esc(subjectKey)}">Открыть результат</button>
            <button type="button" class="btn" data-ps2-action="grand-certificate" data-subject="${esc(subjectKey)}">Сертификат</button>
          </div>
        `
      }
    }[state] || {};

    return `
      <section class="ps2-grand ps2-grand-state-${esc(state)}">
        <div class="ps2-kicker">${esc(cfg.kicker)}</div>
        <div class="ps2-grand-title">${esc(cfg.title)}</div>
        <div class="ps2-grand-sub">${esc(cfg.sub)}</div>

        <div class="ps2-grand-stats">
          <div><b>20</b><span>вопросов</span></div>
          <div><b>1</b><span>попытка</span></div>
          <div><b>балл</b><span>+ время</span></div>
        </div>

        <div class="ps2-grand-note">${esc(cfg.note)}</div>

        ${cfg.actions}


      </section>
    `;
  }


  function getCompList() {
    return document.getElementById("home-competitive-list");
  }

  function getOldBlock() {
    const list = getCompList();
    return list ? (list.closest(".home-block") || list.parentElement) : null;
  }

  function subjectKeys() {
    const list = getCompList();
    if (!list) return ["economics", "mathematics"];

    const keys = Array.from(list.querySelectorAll(".home-competitive-card"))
      .map(card => String(card.dataset.subject || "").trim())
      .filter(Boolean);

    const uniq = Array.from(new Set(keys));
    return uniq.length ? uniq.slice(0, 2) : ["economics", "mathematics"];
  }

  function cardHTML(key) {
    const d = DATA[key] || DATA.economics;

    return `
      <div class="home-competitive-card ps2-subject-card" data-subject="${esc(key)}">
        <div class="home-competitive-hero">
          <div class="home-competitive-hero-img" aria-hidden="true"></div>
        </div>

        <div class="home-competitive-body">
          <div class="home-competitive-title">${esc(d.title)}</div>
          <div class="home-competitive-note">Итог сезона и практика доступны.</div>

          <div class="ps2-metrics">
            <div><b>${esc(d.tours)}</b><span>туров</span></div>
            <div><b>${esc(d.avg)}</b><span>средний</span></div>
            <div><b>${esc(d.rank)}</b><span>регион</span></div>
          </div>

          <div class="ps2-weak">${esc(d.weak)} темы изучить</div>

          <div class="ps2-actions">
            <button type="button" class="btn primary" data-ps2-action="report" data-subject="${esc(key)}">Итог сезона</button>
            <button type="button" class="btn" data-ps2-action="practice" data-subject="${esc(key)}">Практика</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderHome() {
    const oldBlock = getOldBlock();
    if (!oldBlock || !oldBlock.parentNode) return;

    document.getElementById("home-post-season-preview")?.remove();
    document.getElementById("ps-safe-grand-card")?.remove();
    document.getElementById("ps-safe-subject-summaries")?.remove();

    const keys = subjectKeys();
    oldBlock.style.display = "none";

    let wrap = document.getElementById("ps2-postseason-home");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "ps2-postseason-home";
      oldBlock.parentNode.insertBefore(wrap, oldBlock);
    }

    wrap.innerHTML = `
      ${grandHomeHTML()}

      <section class="ps2-section">
        <h2>Итоги по предметам</h2>
        <p>Откройте итог и начните изучение нужных тем.</p>
        <div class="ps2-subject-list">
          ${keys.map(cardHTML).join("")}
        </div>
      </section>
    `;

    bind(wrap);
  }

  let ps2ScrollY = 0;

  function lockPs2Scroll() {
    ps2ScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    document.documentElement.classList.add("ps2-modal-open");
    document.body.classList.add("ps2-modal-open");

    document.body.style.position = "fixed";
    document.body.style.top = `-${ps2ScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }

  function unlockPs2Scroll() {
    document.documentElement.classList.remove("ps2-modal-open");
    document.body.classList.remove("ps2-modal-open");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    try {
      window.scrollTo(0, ps2ScrollY || 0);
    } catch {}
  }

  function openModal(html) {
    const root = document.getElementById("modal-root");
    if (!root) return;

    lockPs2Scroll();

    root.innerHTML = `<div class="ps2-backdrop">${html}</div>`;
    root.setAttribute("aria-hidden", "false");
    root.classList.add("is-open");

    bind(root);
  }

  function closeModal() {
    const root = document.getElementById("modal-root");
    if (!root) return;

    root.innerHTML = "";
    root.setAttribute("aria-hidden", "true");
    root.classList.remove("is-open");

    unlockPs2Scroll();
  }

  function subjectChoiceCards() {
    return subjectKeys().map(key => {
      const d = DATA[key] || DATA.economics;
      return `
        <div class="ps2-plan-subject">
          <div>
            <div class="ps2-plan-title">${esc(d.title)}</div>
            <div class="ps2-muted">${esc(d.tours)} туров · ${esc(d.avg)} · ${esc(d.rank)} регион</div>
          </div>
          <span class="ps2-weak mini">${esc(d.weak)} темы</span>
          <div class="ps2-actions">
            <button type="button" class="btn primary" data-ps2-action="report" data-subject="${esc(key)}">Итог сезона</button>
            <button type="button" class="btn" data-ps2-action="practice" data-subject="${esc(key)}">Практика</button>
          </div>
        </div>
      `;
    }).join("");
  }


  function grandSubjectCards(action = "grand-confirm") {
    return subjectKeys().map(key => {
      const d = DATA[key] || DATA.economics;
      return `
        <div class="ps2-plan-subject ps2-grand-subject">
          <div>
            <div class="ps2-plan-title">${esc(d.title)}</div>
            <div class="ps2-muted">20 вопросов · Mixed · 1 попытка</div>
          </div>
          <span class="ps2-final-badge">Final</span>
          <button type="button"
            class="btn primary ps2-full-btn"
            data-ps2-action="${esc(action)}"
            data-subject="${esc(key)}">Выбрать предмет</button>
        </div>
      `;
    }).join("");
  }

  function showGrandSubjectSelect() {
    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">GRAND OLYMPIAD</div>
            <div class="ps2-modal-title">Выберите предмет финала</div>
            <div class="ps2-muted">Финал проходит отдельно по каждому предмету.</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Формат</div>
          <div class="ps2-grand-stats inside">
            <div><b>20</b><span>вопросов</span></div>
            <div><b>Mixed</b><span>темы</span></div>
            <div><b>1</b><span>попытка</span></div>
          </div>
        </div>

        <div class="ps2-subject-list">
          ${grandSubjectCards("grand-confirm")}
        </div>
      </div>
    `);
  }

  function showGrandConfirm(key) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="grand-select">←</button>
          <div>
            <div class="ps2-kicker">ПЕРЕД СТАРТОМ</div>
            <div class="ps2-modal-title">${esc(d.title)} · Grand Final</div>
            <div class="ps2-muted">Проверьте правила перед началом.</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Что важно</div>
          <div class="ps2-steps">
            <div><b>1</b><span>У вас одна финальная попытка по этому предмету.</span></div>
            <div><b>2</b><span>Время влияет только при равных результатах.</span></div>
            <div><b>3</b><span>После завершения финала ответы изменить нельзя.</span></div>
            <div><b>4</b><span>Результат откроется после расчёта рейтинга.</span></div>
          </div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button"
            class="btn primary"
            data-ps2-action="grand-start"
            data-subject="${esc(key)}">Начать попытку</button>
        </div>
      </div>
    `);
  }

  function showGrandInProgress(key = getGrandSubject()) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);
    setGrandState("in_progress");
    renderHome();

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ФИНАЛ ИДЁТ</div>
            <div class="ps2-modal-title">${esc(d.title)} · Grand Final</div>
            <div class="ps2-muted">7/20 · осталось 12:45</div>
          </div>
        </div>

        <div class="ps2-panel ps2-final-question">
          <div class="ps2-panel-title">Вопрос финала</div>
          <div class="ps2-final-question-text">Какой вариант лучше показывает применение темы, а не простое запоминание термина?</div>
          <div class="ps2-final-options">
            <button>A. Просто вспомнить определение</button>
            <button class="is-picked">B. Применить идею к новой ситуации</button>
            <button>C. Выбрать ответ по ключевому слову</button>
            <button>D. Пропустить вопрос</button>
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Сохранение ответов</div>
          <div class="ps2-muted">В рабочем приложении каждый ответ будет сохраняться сразу после выбора. При возврате ученик продолжит начатую попытку.</div>
        </div>

        <div class="ps2-actions">
          <button type="button"
            class="btn primary"
            data-ps2-action="grand-submit"
            data-subject="${esc(key)}">Завершить и отправить</button>
          <button type="button" class="btn" data-ps2-action="close">Выйти</button>
        </div>
      </div>
    `);
  }

  function showGrandSubmitted(key = getGrandSubject()) {
    const d = DATA[key] || DATA.economics;
    setGrandSubject(key);
    setGrandState("submitted");
    renderHome();

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ОТВЕТЫ ПРИНЯТЫ</div>
            <div class="ps2-modal-title">${esc(d.title)} · Grand Final</div>
            <div class="ps2-muted">Попытка завершена.</div>
          </div>
        </div>

        <div class="ps2-panel ps2-readiness">
          <div class="ps2-panel-title">Статус</div>
          <div class="ps2-readiness-main">Ответы приняты</div>
          <div class="ps2-muted">Результат, рейтинг и сертификат появятся после завершения финального окна.</div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Почему рейтинг закрыт</div>
          <div class="ps2-muted">До закрытия финала рейтинг не показывается, чтобы все участники были в равных условиях.</div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="close">На главную</button>
        </div>
      </div>
    `);
  }

  function showGrandFinalizing() {
    setGrandState("finalizing");
    renderHome();

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">РАСЧЁТ ИТОГОВ</div>
            <div class="ps2-modal-title">Результаты готовятся</div>
            <div class="ps2-muted">Рейтинг и сертификаты скоро откроются.</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Что происходит</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Завершаются все открытые попытки.</span></div>
            <div><b>2</b><span>Считается рейтинг: сначала балл, затем время.</span></div>
            <div><b>3</b><span>Готовятся сертификаты финала.</span></div>
            <div><b>4</b><span>После проверки итоги открываются ученикам.</span></div>
          </div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="grand-state" data-state="results_ready">Показать готовые итоги</button>
        </div>
      </div>
    `);
  }

  function showGrandResult(key = getGrandSubject()) {
    const d = DATA[key] || DATA.economics;
    const r = grandResultFor(key);
    setGrandSubject(key);

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ИТОГ ФИНАЛА</div>
            <div class="ps2-modal-title">${esc(d.title)} · Grand Final</div>
            <div class="ps2-muted">Финальный результат по предмету.</div>
          </div>
        </div>

        <div class="ps2-report-grid">
          <div><b>${r.score}/${r.total}</b><span>Ответы</span></div>
          <div><b>${r.percent}%</b><span>Результат</span></div>
          <div><b>#${r.rankRegion}</b><span>Регион</span></div>
          <div><b>${r.time}</b><span>Время</span></div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Освоенные темы</div>
          <div class="ps2-chip-row">${r.mastered.map(x => `<span class="good">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="ps2-panel ps2-study-panel">
          <div class="ps2-panel-title">Темы для изучения</div>
          <div class="ps2-chip-row">${r.study.map(x => `<span class="warn">${esc(x)}</span>`).join("")}</div>
          <button type="button"
            class="btn primary ps2-study-btn"
            data-ps2-action="practice"
            data-subject="${esc(key)}"
            data-mode="weak">Начать изучение</button>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="grand-certificate" data-subject="${esc(key)}">Сертификат</button>
        </div>
      </div>
    `);
  }

  function showGrandRanking(key = getGrandSubject(), tab = GRAND_FINAL_TOUR_VALUE) {
    const d = DATA[key] || DATA.economics;
    const tabs = [
      ["__all7__", "Все 7 туров"],
      ["tour1", "Тур 1"],
      ["tour2", "Тур 2"],
      ["tour3", "Тур 3"],
      ["tour4", "Тур 4"],
      ["tour5", "Тур 5"],
      ["tour6", "Тур 6"],
      ["tour7", "Тур 7"],
      [GRAND_FINAL_TOUR_VALUE, "Финал"]
    ];

    const rows = tab === GRAND_FINAL_TOUR_VALUE
      ? GRAND_LEADERBOARD
      : [
          { rank: 1, name: "Season leader", meta: "Все 7 туров", score: 118, time: "42:20" },
          { rank: 12, name: "Siz", meta: "Sizning natijangiz", score: 96, time: "48:10", me: true }
        ];

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="grand-result" data-subject="${esc(key)}">←</button>
          <div>
            <div class="ps2-kicker">РЕЙТИНГ</div>
            <div class="ps2-modal-title">${esc(d.title)} · ${tab === GRAND_FINAL_TOUR_VALUE ? "Финал" : "Сезон"}</div>
            <div class="ps2-muted">Финал считается отдельно и не входит в “Все 7 туров”.</div>
          </div>
        </div>

        <div class="ps2-scope-tabs ps2-ranking-tabs">
          ${tabs.map(([value, label]) => `
            <button type="button"
              class="${value === tab ? "is-on" : ""} ${value === GRAND_FINAL_TOUR_VALUE ? "is-final" : ""}"
              data-ps2-action="grand-ranking-tab"
              data-subject="${esc(key)}"
              data-ranking-tab="${esc(value)}">${esc(label)}</button>
          `).join("")}
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">${tab === GRAND_FINAL_TOUR_VALUE ? "Рейтинг финала" : "Рейтинг сезона"}</div>
          <div class="ps2-leaderboard-mini">
            ${rows.map(row => `
              <div class="ps2-lb-mini-row ${row.me ? "is-me" : ""}">
                <b>#${row.rank}</b>
                <span>${esc(row.name)}</span>
                <small>${esc(row.meta)} · ${row.score} · ${esc(row.time)}</small>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Правило рейтинга</div>
          <div class="ps2-muted">Сначала сравнивается результат. Если результат равный, выше будет участник с меньшим временем.</div>
        </div>
      </div>
    `);
  }

  function showGrandCertificate(key = getGrandSubject()) {
    const d = DATA[key] || DATA.economics;
    const r = grandResultFor(key);

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="grand-result" data-subject="${esc(key)}">←</button>
          <div>
            <div class="ps2-kicker">СЕРТИФИКАТ</div>
            <div class="ps2-modal-title">Grand Final Certificate</div>
            <div class="ps2-muted">${esc(d.title)} · ${r.percent}% · #${r.rankRegion} в регионе</div>
          </div>
        </div>

        <div class="ps2-certificate-card">
          <div class="ps2-cert-logo">iClub</div>
          <div class="ps2-cert-title">Grand Final Certificate</div>
          <div class="ps2-cert-name">Preview Student</div>
          <div class="ps2-cert-meta">${esc(d.title)} · ${r.score}/${r.total} · ${r.time}</div>
          <div class="ps2-cert-code">ICL-202606-GRANDFINAL-${esc(String(key).toUpperCase())}-PREVIEW</div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Как будет в приложении</div>
          <div class="ps2-muted">Сертификат откроется после завершения финала и расчёта рейтинга.</div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="grand-result" data-subject="${esc(key)}">Вернуться к результату</button>
        </div>
      </div>
    `);
  }

  function showPlan() {
    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ФИНАЛ СЕЗОНА</div>
            <div class="ps2-modal-title">Grand Olympiad</div>
            <div class="ps2-muted">Финальный этап по выбранным предметам.</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Формат финала</div>
          <div class="ps2-grand-stats inside">
            <div><b>20</b><span>вопросов</span></div>
            <div><b>Mixed</b><span>темы</span></div>
            <div><b>1</b><span>попытка</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Что будет оцениваться</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Точность ответов.</span></div>
            <div><b>2</b><span>Умение применять темы из разных туров.</span></div>
            <div><b>3</b><span>Работа без повторения старых ошибок.</span></div>
            <div><b>4</b><span>Время — только при равных результатах.</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Как готовиться</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Откройте итог сезона по предмету.</span></div>
            <div><b>2</b><span>Посмотрите темы для изучения.</span></div>
            <div><b>3</b><span>Соберите практику по нужным турам и темам.</span></div>
            <div><b>4</b><span>Сделайте Mixed practice перед финалом.</span></div>
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Важно</div>
          <div class="ps2-muted">Финал будет иметь отдельный рейтинг. Он не смешивается с рейтингом “Все 7 туров”.</div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="to-summaries">К итогам по предметам</button>
        </div>
      </div>
    `);
  }

  function getAcademicReportBasis(key) {
    const base = {
      economics: {
        seasonStrong: [
          { name: "Demand & Supply", accuracy: 86, answered: 24 },
          { name: "Elasticity", accuracy: 82, answered: 19 },
          { name: "Market intervention", accuracy: 79, answered: 21 }
        ],
        seasonWeak: [
          { name: "Evaluation paragraphs", risk: "high", mistakes: 7 },
          { name: "Exchange rates", risk: "medium", mistakes: 5 },
          { name: "Balance of payments", risk: "medium", mistakes: 4 }
        ],
        tours: {
          1: {
            result: 56, rank: 18, mistakes: 9, time: "15:10",
            strong: [{ name: "Basic demand shifts", accuracy: 78, answered: 6 }],
            weak: [{ name: "Supply shifts", mistakes: 3 }, { name: "Equilibrium changes", mistakes: 2 }]
          },
          2: {
            result: 64, rank: 16, mistakes: 7, time: "14:40",
            strong: [{ name: "Price elasticity", accuracy: 80, answered: 5 }],
            weak: [{ name: "Income elasticity", mistakes: 3 }, { name: "Cross elasticity", mistakes: 2 }]
          },
          3: {
            result: 85, rank: 16, mistakes: 3, time: "12:45",
            strong: [{ name: "Demand & Supply", accuracy: 92, answered: 7 }, { name: "Elasticity", accuracy: 86, answered: 6 }],
            weak: [{ name: "Balance of payments", mistakes: 2 }, { name: "Development economics", mistakes: 1 }]
          },
          4: {
            result: 72, rank: 14, mistakes: 6, time: "13:35",
            strong: [{ name: "Market failure", accuracy: 83, answered: 6 }],
            weak: [{ name: "Externalities", mistakes: 3 }, { name: "Government failure", mistakes: 2 }]
          },
          5: {
            result: 76, rank: 14, mistakes: 5, time: "13:10",
            strong: [{ name: "Market intervention", accuracy: 84, answered: 7 }],
            weak: [{ name: "Consumer surplus", mistakes: 2 }, { name: "Elasticity application", mistakes: 2 }]
          },
          6: {
            result: 70, rank: 13, mistakes: 6, time: "14:20",
            strong: [{ name: "Macroeconomic policy", accuracy: 82, answered: 6 }],
            weak: [{ name: "Exchange rates", mistakes: 3 }, { name: "Evaluation paragraphs", mistakes: 2 }]
          },
          7: {
            result: 74, rank: 12, mistakes: 5, time: "13:05",
            strong: [{ name: "Development economics", accuracy: 81, answered: 6 }],
            weak: [{ name: "Balance of payments", mistakes: 3 }, { name: "Globalisation", mistakes: 2 }]
          }
        }
      },
      mathematics: {
        seasonStrong: [
          { name: "Quadratics", accuracy: 84, answered: 22 },
          { name: "Graph transformations", accuracy: 80, answered: 18 },
          { name: "Coordinate geometry", accuracy: 78, answered: 19 }
        ],
        seasonWeak: [
          { name: "Trigonometric identities", risk: "high", mistakes: 8 },
          { name: "Binomial coefficients", risk: "medium", mistakes: 5 },
          { name: "Inequalities", risk: "medium", mistakes: 4 },
          { name: "Series", risk: "medium", mistakes: 4 }
        ],
        tours: {
          1: {
            result: 48, rank: 24, mistakes: 10, time: "16:10",
            strong: [{ name: "Linear equations", accuracy: 76, answered: 5 }],
            weak: [{ name: "Completing the square", mistakes: 3 }, { name: "Graph sketching", mistakes: 3 }]
          },
          2: {
            result: 61, rank: 22, mistakes: 8, time: "15:25",
            strong: [{ name: "Quadratics", accuracy: 80, answered: 6 }],
            weak: [{ name: "Transformations", mistakes: 3 }, { name: "Function notation", mistakes: 2 }]
          },
          3: {
            result: 66, rank: 21, mistakes: 7, time: "14:50",
            strong: [{ name: "Coordinate geometry", accuracy: 79, answered: 6 }],
            weak: [{ name: "Circle equations", mistakes: 3 }, { name: "Gradients", mistakes: 2 }]
          },
          4: {
            result: 59, rank: 23, mistakes: 8, time: "15:15",
            strong: [{ name: "Algebraic manipulation", accuracy: 77, answered: 5 }],
            weak: [{ name: "Inequalities", mistakes: 3 }, { name: "Modulus notation", mistakes: 2 }]
          },
          5: {
            result: 82, rank: 17, mistakes: 4, time: "12:55",
            strong: [{ name: "Quadratics", accuracy: 88, answered: 7 }, { name: "Graphs", accuracy: 84, answered: 6 }],
            weak: [{ name: "Coordinate geometry", mistakes: 2 }]
          },
          6: {
            result: 68, rank: 18, mistakes: 6, time: "14:20",
            strong: [{ name: "Trigonometric equations", accuracy: 80, answered: 6 }],
            weak: [{ name: "Trigonometric identities", mistakes: 3 }, { name: "Binomial coefficients", mistakes: 2 }]
          },
          7: {
            result: 71, rank: 18, mistakes: 6, time: "13:40",
            strong: [{ name: "Differentiation basics", accuracy: 81, answered: 6 }],
            weak: [{ name: "Inequalities", mistakes: 3 }, { name: "Series", mistakes: 2 }]
          }
        }
      }
    };

    return base[key] || base.economics;
  }

  function getTourReportData(key, tourNo) {
    const basis = getAcademicReportBasis(key);
    const n = Number(tourNo || 7);
    const fallback = basis.tours[7];

    return {
      tourNo: n,
      ...(basis.tours[n] || fallback)
    };
  }

  function formatStrongTopic(topic) {
    if (!topic) return "";
    if (topic.accuracy && topic.answered) {
      return `${topic.name} · ${topic.accuracy}% / ${topic.answered}q`;
    }
    return topic.name || String(topic);
  }

  function formatWeakTopic(topic) {
    if (!topic) return "";
    if (topic.mistakes) {
      return `${topic.name} · ${topic.mistakes} ошибки`;
    }
    return topic.name || String(topic);
  }

  function getParticipatedTours(key) {
    const map = {
      economics: [1, 2, 3, 5, 6, 7],
      mathematics: [1, 2, 3, 5, 6]
    };

    return map[key] || map.economics;
  }

  function hasParticipatedInTour(key, tourNo) {
    return getParticipatedTours(key).includes(Number(tourNo));
  }

  function getSeasonReadiness(key) {
    const d = DATA[key] || DATA.economics;
    const basis = getAcademicReportBasis(key);
    const studied = basis.seasonStrong.length;
    const toStudy = basis.seasonWeak.length;

    const completedTours = Number(String(d.tours || "0/7").split("/")[0]) || 0;
    const avg = Number(String(d.avg || "0").replace("%", "")) || 0;

    const score = Math.max(20, Math.min(95, Math.round(avg * 0.55 + completedTours * 5 + studied * 4 - toStudy * 3)));

    return {
      score,
      level: score >= 80 ? "Высокая" : score >= 60 ? "Средняя" : "Нужно усилить",
      toStudy
    };
  }

  function getTourStudyTopics(key, tourNo) {
    const d = DATA[key] || DATA.economics;
    const rows = d.topics[tourNo] || d.topics[7] || [];

    return rows.map(row => ({
      name: row[0],
      available: row[1],
      total: row[2]
    }));
  }

  function formatStudyTopic(topic) {
    if (!topic) return "";
    if (topic.mistakes) return `${topic.name} · ${topic.mistakes} ошибки`;
    if (topic.available != null && topic.total != null) return `${topic.name} · ${topic.available}/${topic.total}`;
    return topic.name || String(topic);
  }

  function getParticipatedTours(key) {
    const map = {
      economics: [1, 2, 3, 5, 6, 7],
      mathematics: [1, 2, 3, 5, 6]
    };
    return map[key] || map.economics;
  }

  function hasParticipatedInTour(key, tourNo) {
    return getParticipatedTours(key).includes(Number(tourNo));
  }

  function getPracticeProgress(key, tourNo) {
    const data = {
      economics: {
        4: {
          practiced: true,
          attempts: 3,
          answered: 31,
          total: 70,
          best: 62,
          activeDays: 2,
          mastered: [
            { name: "Balance of payments", accuracy: 72, answered: 13 },
            { name: "Development economics", accuracy: 68, answered: 10 }
          ],
          study: [
            { name: "Globalisation", available: 8, total: 12 },
            { name: "Exchange rates", available: 9, total: 14 }
          ]
        }
      },
      mathematics: {
        4: {
          practiced: true,
          attempts: 2,
          answered: 22,
          total: 70,
          best: 58,
          activeDays: 1,
          mastered: [
            { name: "Algebraic manipulation", accuracy: 70, answered: 9 }
          ],
          study: [
            { name: "Inequalities", available: 11, total: 16 },
            { name: "Modulus notation", available: 7, total: 10 }
          ]
        },
        7: {
          practiced: false,
          attempts: 0,
          answered: 0,
          total: 70,
          best: null,
          activeDays: 0,
          mastered: [],
          study: [
            { name: "Inequalities", available: 11, total: 16 },
            { name: "Series", available: 7, total: 10 }
          ]
        }
      }
    };

    return data[key]?.[Number(tourNo)] || {
      practiced: false,
      attempts: 0,
      answered: 0,
      total: 70,
      best: null,
      activeDays: 0,
      mastered: [],
      study: getTourStudyTopics(key, tourNo)
    };
  }

  function getSeasonReadiness(key) {
    const d = DATA[key] || DATA.economics;
    const basis = getAcademicReportBasis(key);

    const completedTours = Number(String(d.tours || "0/7").split("/")[0]) || 0;
    const avg = Number(String(d.avg || "0").replace("%", "")) || 0;
    const masteredCount = basis.seasonStrong.length;
    const studyCount = basis.seasonWeak.length;

    const score = Math.max(20, Math.min(95, Math.round(avg * 0.55 + completedTours * 5 + masteredCount * 4 - studyCount * 3)));
    const afterStudy = Math.min(95, score + Math.max(6, studyCount * 4));

    return {
      score,
      afterStudy,
      level: score >= 80 ? "Высокая" : score >= 60 ? "Средняя" : "Требует подготовки",
      studyCount
    };
  }

  function getTourStudyTopics(key, tourNo) {
    const d = DATA[key] || DATA.economics;
    const rows = d.topics[tourNo] || d.topics[7] || [];
    return rows.map(row => ({
      name: row[0],
      available: row[1],
      total: row[2]
    }));
  }

  function formatMasteredTopic(topic) {
    if (!topic) return "";
    if (topic.accuracy && topic.answered) return `${topic.name} · ${topic.accuracy}% / ${topic.answered}q`;
    return topic.name || String(topic);
  }

  function formatStudyTopic(topic) {
    if (!topic) return "";
    if (topic.mistakes) return `${topic.name} · ${topic.mistakes} ${tr("ошибки", "xato", "mistakes")}`;
    if (topic.available != null && topic.total != null) return `${topic.name} · ${topic.available}/${topic.total}`;
    return topic.name || String(topic);
  }

  function reportScopeTabs(key, activeScope) {
    const chips = [
      ["season", tr("Итог сезона", "Mavsum yakuni", "Season")],
      ["tour1", tr("Тур 1", "1-tur", "Tour 1")],
      ["tour2", tr("Тур 2", "2-tur", "Tour 2")],
      ["tour3", tr("Тур 3", "3-tur", "Tour 3")],
      ["tour4", tr("Тур 4", "4-tur", "Tour 4")],
      ["tour5", tr("Тур 5", "5-tur", "Tour 5")],
      ["tour6", tr("Тур 6", "6-tur", "Tour 6")],
      ["tour7", tr("Тур 7", "7-tur", "Tour 7")]
    ];

    return `
      <div class="ps2-scope-tabs" aria-label="${esc(tr("Выбор периода", "Davr tanlash", "Period selector"))}">
        ${chips.map(([scope, label]) => {
          const isTour = scope.startsWith("tour");
          const tourNo = isTour ? Number(scope.replace("tour", "")) : null;
          const statusClass = isTour
            ? hasParticipatedInTour(key, tourNo) ? "is-done" : "is-missed"
            : "";

          const statusLabel = isTour
            ? hasParticipatedInTour(key, tourNo)
              ? tr("участвовал", "qatnashgan", "participated")
              : tr("не участвовал", "qatnashmagan", "missed")
            : "";

          return `
            <button type="button"
              class="${scope === activeScope ? "is-on" : ""} ${statusClass}"
              title="${esc(statusLabel)}"
              data-ps2-action="report"
              data-subject="${esc(key)}"
              data-scope="${esc(scope)}">${esc(label)}</button>
          `;
        }).join("")}
      </div>
    `;
  }

  function showReport(key, scope = "season") {
    const d = DATA[key] || DATA.economics;
    const basis = getAcademicReportBasis(key);

    const activeScope = String(scope || "season");
    const isTour = activeScope.startsWith("tour");
    const tourNo = isTour ? Number(activeScope.replace("tour", "")) || 7 : null;
    const participated = isTour ? hasParticipatedInTour(key, tourNo) : true;
    const t = isTour && participated ? getTourReportData(key, tourNo) : null;
    const practice = isTour && !participated ? getPracticeProgress(key, tourNo) : null;
    const readiness = getSeasonReadiness(key);

    const title = isTour ? `${d.title} · ${tr("Тур", "Tur", "Tour")} ${tourNo}` : d.title;
    const subtitle = isTour
      ? participated
        ? tr("Итог выбранного тура.", "Tanlangan tur yakuni.", "Selected tour summary.")
        : practice?.practiced
          ? tr("Тур не пройден, но практика по нему есть.", "Tur topshirilmagan, lekin amaliyot bor.", "Tour was not attempted, but practice exists.")
          : tr("Тур не пройден. Темы доступны для изучения.", "Tur topshirilmagan. Mavzular o‘rganish uchun ochiq.", "Tour was not attempted. Topics are available for study.")
      : tr("Общий итог сезона по предмету.", "Fan bo‘yicha mavsum yakuni.", "Subject season summary.");

    const metrics = !isTour
      ? `
        <div><b>${esc(d.tours)}</b><span>${esc(tr("Туры", "Turlar", "Tours"))}</span></div>
        <div><b>${esc(d.avg)}</b><span>${esc(tr("Средний результат", "O‘rtacha natija", "Average"))}</span></div>
        <div><b>${esc(d.rank)}</b><span>${esc(tr("Место в регионе", "Hududdagi o‘rin", "Region rank"))}</span></div>
        <div><b>18</b><span>${esc(tr("Практики", "Amaliyotlar", "Practices"))}</span></div>
      `
      : participated
        ? `
          <div><b>${t.result}%</b><span>${esc(tr("Результат", "Natija", "Result"))}</span></div>
          <div><b>#${t.rank}</b><span>${esc(tr("Регион", "Hudud", "Region"))}</span></div>
          <div><b>${t.mistakes}</b><span>${esc(tr("Ошибки", "Xatolar", "Mistakes"))}</span></div>
          <div><b>${t.time}</b><span>${esc(tr("Время", "Vaqt", "Time"))}</span></div>
        `
        : "";

    const mastered = !isTour
      ? basis.seasonStrong
      : participated
        ? t.strong
        : practice?.practiced
          ? practice.mastered
          : [];

    const studyTopics = !isTour
      ? basis.seasonWeak
      : participated
        ? t.weak
        : practice?.practiced
          ? practice.study
          : getTourStudyTopics(key, tourNo);

    const analysisTitle = !isTour
      ? tr("Готовность к Grand Olympiad", "Grand Olympiad tayyorgarligi", "Grand Olympiad readiness")
      : participated
        ? tr("Итог тура", "Tur yakuni", "Tour summary")
        : tr("Статус тура", "Tur holati", "Tour status");

    const analysisMain = !isTour
      ? `${readiness.level} ${tr("готовность", "tayyorgarlik", "readiness")} · ${readiness.score}%`
      : participated
        ? `${tr("Тур", "Tur", "Tour")} ${tourNo}: ${t.mistakes} ${tr("ошибки требуют изучения", "xato o‘rganishni talab qiladi", "mistakes need study")}`
        : practice?.practiced
          ? `${tr("Рейтинговой попытки нет", "Reyting urinishi yo‘q", "No ranked attempt")} · ${tr("практика", "amaliyot", "practice")} ${practice.best}%`
          : tr("Нет попытки — результат не рассчитан", "Urinish yo‘q — natija hisoblanmagan", "No attempt — no result calculated");

    const analysisText = !isTour
      ? `${tr("После изучения", "O‘rganilgandan keyin", "After studying")} ${readiness.studyCount} ${tr("тем готовность может вырасти до", "mavzudan so‘ng tayyorgarlik", "topics readiness can rise to")} ${readiness.afterStudy}%.`
      : participated
        ? `${tr("Фокус этого тура", "Bu turning fokusi", "This tour focus")} — ${studyTopics.map(x => x.name).slice(0, 2).join(" и ")}.`
        : practice?.practiced
          ? `${tr("Показаны данные практики по этому туру: ответы, лучший результат и темы для изучения.", "Bu tur bo‘yicha amaliyot ma’lumotlari ko‘rsatilgan.", "Practice data for this tour is shown: answers, best score and study topics.")}`
          : tr("По этому туру нет личного результата, но темы доступны через практику.", "Bu tur bo‘yicha shaxsiy natija yo‘q, lekin mavzular amaliyotda ochiq.", "No personal result for this tour, but topics are available through practice.");

    const detailedButton = isTour
      ? `${tr("Сформировать отчёт по Тур", "Tur bo‘yicha hisobot", "Create Tour report")} ${tourNo}`
      : tr("Сформировать общий отчёт", "Umumiy hisobot yaratish", "Create full report");

    const shouldShowDetailedReport = !isTour || participated || practice?.practiced;

    const planTitle = !isTour
      ? tr("План изучения", "O‘rganish rejasi", "Study plan")
      : participated
        ? `${tr("План после Тур", "Turdan keyingi reja", "Plan after Tour")} ${tourNo}`
        : `${tr("План изучения Тур", "Turni o‘rganish rejasi", "Tour study plan")} ${tourNo}`;

    const planRows = !isTour
      ? [
          tr("Начните с тем для изучения.", "O‘rganish kerak bo‘lgan mavzulardan boshlang.", "Start with study topics."),
          tr("Сделайте Mixed practice перед финалом.", "Final oldidan Mixed practice bajaring.", "Do Mixed practice before the final."),
          tr("После практики проверьте обновлённую готовность.", "Amaliyotdan so‘ng tayyorgarlikni tekshiring.", "Check updated readiness after practice.")
        ]
      : participated
        ? [
            tr("Изучите темы, где были ошибки.", "Xato bo‘lgan mavzularni o‘rganing.", "Study topics with mistakes."),
            tr("Пройдите практику по темам этого тура.", "Shu tur mavzulari bo‘yicha amaliyot qiling.", "Practice topics from this tour."),
            tr("Вернитесь к итогу и проверьте прогресс.", "Yakunlarga qaytib, progressni tekshiring.", "Return to the summary and check progress.")
          ]
        : practice?.practiced
          ? [
              tr("Продолжите практику по темам этого тура.", "Shu tur mavzulari bo‘yicha amaliyotni davom ettiring.", "Continue practice for this tour."),
              tr("Закрепите темы с низким результатом.", "Past natijali mavzularni mustahkamlang.", "Strengthen low-score topics."),
              tr("После практики вернитесь к общему итогу сезона.", "Amaliyotdan so‘ng mavsum yakuniga qayting.", "Return to the season summary after practice.")
            ]
          : [
              tr("Изучите темы тура без рейтинговой попытки.", "Reyting urinishi bo‘lmasa ham tur mavzularini o‘rganing.", "Study tour topics without a ranked attempt."),
              tr("Соберите практику по темам этого тура.", "Shu tur mavzulari bo‘yicha amaliyot yig‘ing.", "Build practice for this tour."),
              tr("После практики вернитесь к общему итогу сезона.", "Amaliyotdan so‘ng mavsum yakuniga qayting.", "Return to the season summary after practice.")
            ];

    const masteredHTML = mastered.length
      ? `<div class="ps2-chip-row">${mastered.map(x => `<span class="good">${esc(formatMasteredTopic(x))}</span>`).join("")}</div>`
      : `<div class="ps2-empty-note">${esc(isTour && !participated
          ? tr("Нет данных по рейтинговой попытке. После практики здесь появятся освоенные темы.", "Reyting urinishi bo‘yicha ma’lumot yo‘q.", "No ranked attempt data. Mastered topics will appear after practice.")
          : tr("Пока недостаточно данных.", "Hozircha ma’lumot yetarli emas.", "Not enough data yet.")
        )}</div>`;

    const practicePanel = practice?.practiced
      ? `
        <div class="ps2-panel ps2-practice-summary">
          <div class="ps2-panel-title">${esc(tr("Практика тура", "Tur amaliyoti", "Tour practice"))}</div>
          <div class="ps2-practice-grid">
            <div><b>${practice.best}%</b><span>${esc(tr("лучший результат", "eng yaxshi natija", "best score"))}</span></div>
            <div><b>${practice.answered}/${practice.total}</b><span>${esc(tr("вопросов", "savol", "questions"))}</span></div>
            <div><b>${practice.attempts}</b><span>${esc(tr("попытки", "urinish", "attempts"))}</span></div>
          </div>
        </div>
      `
      : "";

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">${esc(isTour ? tr("ИТОГ ТУРА", "TUR YAKUNI", "TOUR SUMMARY") : tr("ИТОГ СЕЗОНА", "MAVSUM YAKUNI", "SEASON SUMMARY"))}</div>
            <div class="ps2-modal-title">${esc(title)}</div>
            <div class="ps2-muted">${esc(subtitle)}</div>
          </div>
        </div>

        ${reportScopeTabs(key, activeScope)}

        ${metrics ? `<div class="ps2-report-grid">${metrics}</div>` : ""}

        <div class="ps2-panel ps2-readiness">
          <div class="ps2-panel-title">${esc(analysisTitle)}</div>
          <div class="ps2-readiness-main">${esc(analysisMain)}</div>
          ${!isTour ? `
            <div class="ps2-readiness-bar">
              <span style="width:${readiness.score}%"></span>
            </div>
          ` : ""}
          <div class="ps2-muted">${esc(analysisText)}</div>
        </div>

        ${practicePanel}

        ${shouldShowDetailedReport ? `
          <div class="ps2-panel soft">
            <div class="ps2-panel-title">${esc(tr("Подробный отчёт", "Batafsil hisobot", "Detailed report"))}</div>
            <div class="ps2-muted">${esc(isTour
              ? participated
                ? `Отдельный отчёт по Тур ${tourNo}: результат, время, темы, ошибки и обезличенное сравнение с группой.`
                : `Отчёт по Тур ${tourNo}: практика, статус участия и план изучения без рейтингового результата.`
              : "Общий отчёт за сезон: активность, динамика, темы для изучения и обезличенное сравнение по классу, району и региону."
            )}</div>
            <button type="button"
              class="btn ps2-report-btn"
              data-ps2-action="detailed-report"
              data-subject="${esc(key)}"
              data-scope="${esc(activeScope)}"
              data-tour="${esc(tourNo || "")}">${esc(detailedButton)}</button>
          </div>
        ` : ""}

        <div class="ps2-panel">
          <div class="ps2-panel-title">${esc(tr("Освоенные темы", "O‘zlashtirilgan mavzular", "Mastered topics"))}</div>
          <div class="ps2-muted ps2-academic-note">${esc(tr("Показаны темы с высокой точностью и достаточным числом ответов.", "Yuqori aniqlik va yetarli javoblar bo‘lgan mavzular ko‘rsatiladi.", "Shown topics have high accuracy and enough answers."))}</div>
          ${masteredHTML}
        </div>

        <div class="ps2-panel ps2-study-panel">
          <div class="ps2-panel-title">${esc(tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study"))}</div>
          <div class="ps2-chip-row">${studyTopics.map(x => `<span class="warn">${esc(formatStudyTopic(x))}</span>`).join("")}</div>
          <button type="button"
            class="btn primary ps2-study-btn"
            data-ps2-action="practice"
            data-subject="${esc(key)}"
            data-scope="${esc(activeScope)}"
            data-tour="${esc(tourNo || "")}"
            data-mode="weak">${esc(tr("Начать изучение", "O‘rganishni boshlash", "Start studying"))}</button>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">${esc(planTitle)}</div>
          <div class="ps2-steps mini">
            ${planRows.map((text, i) => `<div><b>${i + 1}</b><span>${esc(text)}</span></div>`).join("")}
          </div>
        </div>
      </div>
    `);
  }

  function showDetailedReport(key, context = {}) {
    const d = DATA[key] || DATA.economics;
    const scope = String(context.scope || "season");
    const isTour = scope.startsWith("tour");
    const tourNo = Number(context.tour || scope.replace("tour", "") || 0) || null;
    const participated = isTour ? hasParticipatedInTour(key, tourNo) : true;
    const practice = isTour && !participated ? getPracticeProgress(key, tourNo) : null;

    const title = isTour
      ? `${d.title} · ${tr("Отчёт по Тур", "Tur bo‘yicha hisobot", "Tour report")} ${tourNo}`
      : `${d.title} · ${tr("Общий отчёт", "Umumiy hisobot", "Full report")}`;

    const rows = isTour
      ? participated
        ? [
            tr("Результат, время и место в рейтинге выбранного тура.", "Tanlangan tur natijasi, vaqti va reyting o‘rni.", "Result, time and ranking for the selected tour."),
            tr("Освоенные темы и темы для изучения по этому туру.", "Shu tur bo‘yicha o‘zlashtirilgan va o‘rganish mavzulari.", "Mastered and study topics for this tour."),
            tr("Обезличенное сравнение с похожими участниками.", "O‘xshash qatnashchilar bilan anonim taqqoslash.", "Anonymized comparison with similar participants."),
            tr("Что изучить перед Grand Olympiad.", "Grand Olympiad oldidan nima o‘rganish kerak.", "What to study before Grand Olympiad.")
          ]
        : practice?.practiced
          ? [
              tr("Статус: рейтинговой попытки по туру нет.", "Holat: tur bo‘yicha reyting urinishi yo‘q.", "Status: no ranked attempt for this tour."),
              tr("Практика по туру: лучший результат, попытки и ответы.", "Tur amaliyoti: eng yaxshi natija, urinishlar va javoblar.", "Tour practice: best score, attempts and answers."),
              tr("Темы, которые уже частично освоены через практику.", "Amaliyot orqali qisman o‘zlashtirilgan mavzular.", "Topics partially mastered through practice."),
              tr("План изучения до Grand Olympiad.", "Grand Olympiadgacha o‘rganish rejasi.", "Study plan before Grand Olympiad.")
            ]
          : [
              tr("Статус: пользователь не участвовал в этом туре.", "Holat: foydalanuvchi bu turda qatnashmagan.", "Status: user did not participate in this tour."),
              tr("Темы тура, которые доступны для изучения.", "O‘rganish uchun mavjud tur mavzulari.", "Tour topics available for study."),
              tr("Практика по темам тура без рейтингового результата.", "Reyting natijasisiz tur mavzulari bo‘yicha amaliyot.", "Practice tour topics without ranked result."),
              tr("Как закрыть пробел перед Grand Olympiad.", "Grand Olympiad oldidan bo‘shliqni qanday yopish.", "How to close the gap before Grand Olympiad.")
            ]
      : [
          tr("Активные дни и регулярность занятий за сезон.", "Mavsumdagi faol kunlar va muntazamlik.", "Active days and study consistency."),
          tr("Динамика по всем турам и практике.", "Barcha turlar va amaliyot bo‘yicha dinamika.", "Dynamics across tours and practice."),
          tr("Темы, которые ещё требуют изучения.", "Hali o‘rganish kerak bo‘lgan mavzular.", "Topics that still need study."),
          tr("Обезличенное сравнение по классу, району и региону.", "Sinf, tuman va hudud bo‘yicha anonim taqqoslash.", "Anonymized comparison by class, district and region.")
        ];

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button"
            class="ps2-back"
            data-ps2-action="report"
            data-subject="${esc(key)}"
            data-scope="${esc(scope)}">←</button>
          <div>
            <div class="ps2-kicker">${esc(tr("ПОДРОБНЫЙ ОТЧЁТ", "BATAFSIL HISOBOT", "DETAILED REPORT"))}</div>
            <div class="ps2-modal-title">${esc(title)}</div>
            <div class="ps2-muted">${esc(isTour ? tr("Preview отчёта по выбранному туру.", "Tanlangan tur hisoboti preview.", "Selected tour report preview.") : tr("Preview общего отчёта за сезон.", "Mavsum bo‘yicha umumiy hisobot preview.", "Season report preview."))}</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">${esc(tr("Что войдёт", "Nimalar kiradi", "Included"))}</div>
          <div class="ps2-steps">
            ${rows.map((text, i) => `<div><b>${i + 1}</b><span>${esc(text)}</span></div>`).join("")}
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">${esc(tr("Логика расчёта", "Hisoblash logikasi", "Calculation logic"))}</div>
          <div class="ps2-muted">${esc(isTour
            ? participated
              ? tr("Отчёт по туру считается по попытке этого тура, времени, ошибкам и темам тура.", "Tur hisoboti shu tur urinishi, vaqt, xatolar va mavzular asosida hisoblanadi.", "Tour report uses attempt, time, mistakes and tour topics.")
              : practice?.practiced
                ? tr("Если рейтингового тура нет, отчёт показывает практику и план изучения.", "Reyting turi bo‘lmasa, hisobot amaliyot va o‘rganish rejasini ko‘rsatadi.", "If no ranked tour exists, report shows practice and study plan.")
                : tr("Если тура нет, отчёт показывает отсутствие попытки и доступный план изучения.", "Tur bo‘lmasa, hisobot urinish yo‘qligi va o‘rganish rejasini ko‘rsatadi.", "If no tour attempt exists, report shows missing attempt and study plan.")
            : tr("Общий отчёт считается по всем турам, практике, активности и повторяющимся ошибкам.", "Umumiy hisobot barcha turlar, amaliyot, faollik va takroriy xatolar asosida hisoblanadi.", "Full report uses all tours, practice, activity and repeated mistakes.")
          )}</div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button"
            class="btn primary"
            data-ps2-action="report"
            data-subject="${esc(key)}"
            data-scope="${esc(scope)}">${esc(tr("Вернуться к итогу", "Yakunlarga qaytish", "Back to summary"))}</button>
        </div>
      </div>
    `);
  }

  function topicRows(key, tour) {
    const d = DATA[key] || DATA.economics;
    const rows = d.topics[tour] || d.topics[7] || [];

    return rows.map((r, i) => `
      <button type="button" class="ps2-topic ${i === 0 ? "is-on" : ""}" data-topic="${esc(r[0])}" data-available="${r[1]}" data-total="${r[2]}">
        <span>${esc(r[0])}</span>
        <small>${r[1]}/${r[2]}</small>
      </button>
    `).join("");
  }

  function practiceTopicRows(key, tour, mode = "regular", scope = "direct") {
    const d = DATA[key] || DATA.economics;
    const tourNo = Number(tour || 7);
    const normalizedMode = String(mode || "regular");
    const normalizedScope = String(scope || "direct");

    let rows = [];

    if (normalizedMode === "weak") {
      if (normalizedScope === "season") {
        rows = getAcademicReportBasis(key).seasonWeak.map((topic, idx) => ({
          name: topic.name,
          available: Math.max(5, 12 - idx * 2),
          total: Math.max(8, 16 - idx * 2)
        }));
      } else if (normalizedScope.startsWith("tour") && hasParticipatedInTour(key, tourNo)) {
        rows = getTourReportData(key, tourNo).weak.map((topic, idx) => ({
          name: topic.name,
          available: Math.max(4, 10 - idx * 2),
          total: Math.max(7, 14 - idx * 2)
        }));
      } else if (normalizedScope.startsWith("tour")) {
        const progress = getPracticeProgress(key, tourNo);
        rows = progress?.study?.length ? progress.study : getTourStudyTopics(key, tourNo);
      } else {
        rows = getTourStudyTopics(key, tourNo);
      }
    } else {
      const sourceRows = d.topics[tourNo] || d.topics[7] || [];
      rows = sourceRows.map(row => ({
        name: row[0],
        available: row[1],
        total: row[2]
      }));
    }

    if (!rows.length) {
      rows = getTourStudyTopics(key, tourNo);
    }

    return rows.map((row, i) => `
      <button type="button"
        class="ps2-topic ${i === 0 ? "is-on" : ""}"
        data-topic="${esc(row.name)}"
        data-available="${Number(row.available || 0)}"
        data-total="${Number(row.total || row.available || 0)}">
        <span>${esc(row.name)}</span>
        <small>${Number(row.available || 0)}/${Number(row.total || row.available || 0)}</small>
      </button>
    `).join("");
  }

  function showPractice(key, context = {}) {
    const d = DATA[key] || DATA.economics;
    const scope = String(context.scope || "");
    const tourFromContext = Number(context.tour || 0);
    const defaultTour = tourFromContext || 7;
    const initialMode = String(context.mode || "regular");
    const cameFromReport = !!scope;

    window.__ps2LastPracticeContext = {
      key,
      scope,
      tour: tourFromContext || "",
      mode: initialMode
    };

    const sourceText = scope.startsWith("tour")
      ? `${tr("Источник", "Manba", "Source")}: ${tr("Тур", "Tur", "Tour")} ${defaultTour}`
      : scope === "season"
        ? `${tr("Источник", "Manba", "Source")}: ${tr("итог сезона", "mavsum yakuni", "season summary")}`
        : `${tr("Источник", "Manba", "Source")}: ${tr("быстрый доступ", "tezkor kirish", "quick access")}`;

    const backButton = cameFromReport
      ? `<button type="button"
          class="ps2-back"
          data-ps2-action="report"
          data-subject="${esc(key)}"
          data-scope="${esc(scope)}">←</button>`
      : `<button type="button" class="ps2-back" data-ps2-action="close">←</button>`;

    openModal(`
      <div class="ps2-modal" data-practice-subject="${esc(key)}" data-mode="${esc(initialMode)}" data-practice-scope="${esc(scope || "direct")}" data-practice-tour="${esc(defaultTour)}">
        <div class="ps2-modal-top">
          ${backButton}
          <div>
            <div class="ps2-kicker">${esc(tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"))}</div>
            <div class="ps2-modal-title">${esc(tr("Выберите формат", "Formatni tanlang", "Choose format"))}</div>
            <div class="ps2-muted">${esc(d.title)} · ${esc(sourceText)}</div>
          </div>
        </div>

        <div class="ps2-mode-list">
          <button type="button" class="ps2-mode ${initialMode === "regular" ? "is-selected" : ""}" data-mode="regular">
            <b>${esc(tr("Обычная практика", "Oddiy amaliyot", "Regular practice"))}</b>
            <span>${esc(tr("Быстрый запуск привычной практики по предмету.", "Fan bo‘yicha odatiy amaliyotni tez boshlash.", "Quick start for the usual subject practice."))}</span>
          </button>
          <button type="button" class="ps2-mode ${initialMode === "weak" ? "is-selected" : ""}" data-mode="weak">
            <b>${esc(tr("Изучить темы", "Mavzularni o‘rganish", "Study topics"))}</b>
            <span>${esc(tr("Фокус на темах, которые требуют изучения или закрепления.", "O‘rganish yoki mustahkamlash kerak bo‘lgan mavzular.", "Focus on topics that need study or reinforcement."))}</span>
          </button>
          <button type="button" class="ps2-mode ${initialMode === "custom" ? "is-selected" : ""}" data-mode="custom">
            <b>${esc(tr("Собрать практику", "Amaliyotni yig‘ish", "Build practice"))}</b>
            <span>${esc(tr("Выберите тур, темы, сложность и количество вопросов.", "Tur, mavzu, qiyinlik va savollar sonini tanlang.", "Choose tour, topics, difficulty and count."))}</span>
          </button>
        </div>

        <div class="ps2-builder">
          <div class="ps2-filter">
            <div class="ps2-panel-title">${esc(tr("Тур", "Tur", "Tour"))}</div>
            <div class="ps2-pills" data-filter="tour">
              <span class="${defaultTour === 5 ? "is-on" : ""}" data-value="5">5</span>
              <span class="${defaultTour === 6 ? "is-on" : ""}" data-value="6">6</span>
              <span class="${defaultTour === 7 ? "is-on" : ""}" data-value="7">7</span>
            </div>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">${esc(tr("Темы тура", "Tur mavzulari", "Tour topics"))}</div>
            <div class="ps2-topic-list">${practiceTopicRows(key, defaultTour, initialMode, scope || "direct")}</div>
            <div class="ps2-available">${esc(tr("Доступно новых вопросов", "Yangi savollar mavjud", "Available new questions"))}: <b>13</b></div>
            <label class="ps2-check">
              <input type="checkbox" data-repeat />
              <span>${esc(tr("Повторять уже закрытые вопросы", "Yopilgan savollarni ham qaytarish", "Repeat already closed questions"))}</span>
            </label>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">${esc(tr("Сложность", "Qiyinlik", "Difficulty"))}</div>
            <div class="ps2-pills" data-filter="difficulty">
              <span class="is-on" data-value="Mixed">Mixed</span>
              <span data-value="easy">Easy</span>
              <span data-value="medium">Medium</span>
              <span data-value="hard">Hard</span>
            </div>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">${esc(tr("Количество", "Soni", "Count"))}</div>
            <div class="ps2-pills" data-filter="count">
              <span data-value="5">5</span>
              <span class="is-on" data-value="10">10</span>
              <span data-value="20">20</span>
              <span data-value="30">30</span>
            </div>
          </div>
        </div>

        <div class="ps2-hint">${esc(tr("Запустится привычная практика по предмету.", "Fan bo‘yicha odatiy amaliyot boshlanadi.", "The usual subject practice will start."))}</div>

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="start-practice">${esc(tr("Начать обычную практику", "Oddiy amaliyotni boshlash", "Start regular practice"))}</button>
        </div>
      </div>
    `);

    updatePracticeModal();
  }

  function updatePracticeModal() {
    const modal = document.querySelector(".ps2-modal[data-practice-subject]");
    if (!modal) return;

    const mode = modal.dataset.mode || "regular";
    const start = modal.querySelector('[data-ps2-action="start-practice"]');
    const hint = modal.querySelector(".ps2-hint");
    const builder = modal.querySelector(".ps2-builder");
    const key = modal.dataset.practiceSubject || "economics";
    const tour = modal.querySelector('[data-filter="tour"] .is-on')?.dataset.value || modal.dataset.practiceTour || "7";
    const scope = modal.dataset.practiceScope || "direct";

    modal.querySelectorAll(".ps2-mode").forEach(x => {
      x.classList.toggle("is-selected", x.dataset.mode === mode);
    });

    if (builder) {
      const shouldOpenBuilder = mode === "custom" || mode === "weak";
      builder.classList.toggle("is-open", shouldOpenBuilder);
      builder.classList.toggle("is-study-mode", mode === "weak");
      builder.classList.toggle("is-custom-mode", mode === "custom");
    }

    updateTopicsForTour(modal, key, tour);

    if (mode === "weak") {
      if (start) start.textContent = tr("Начать изучение", "O‘rganishni boshlash", "Start studying");
      if (hint) hint.textContent = tr(
        "Выберите тур и темы, которые нужно изучить или закрепить.",
        "O‘rganish yoki mustahkamlash kerak bo‘lgan tur va mavzularni tanlang.",
        "Choose the tour and topics you need to study or reinforce."
      );
    } else if (mode === "custom") {
      if (start) start.textContent = tr("Собрать практику", "Amaliyotni yig‘ish", "Build practice");
      if (hint) hint.textContent = tr(
        "Настройте практику по туру, темам, сложности и количеству вопросов.",
        "Amaliyotni tur, mavzu, qiyinlik va savollar soni bo‘yicha sozlang.",
        "Build practice by tour, topics, difficulty and count."
      );
    } else {
      if (start) start.textContent = tr("Начать обычную практику", "Oddiy amaliyotni boshlash", "Start regular practice");
      if (hint) hint.textContent = tr(
        "Быстрый запуск привычной практики по предмету.",
        "Fan bo‘yicha odatiy amaliyotni tez boshlash.",
        "Quick start for the usual subject practice."
      );
    }

    updateAvailability();
  }

  function updateTopicsForTour(modal, key, tour) {
    const list = modal.querySelector(".ps2-topic-list");
    if (!list) return;

    const mode = modal.dataset.mode || "regular";
    const scope = modal.dataset.practiceScope || "direct";
    const currentSignature = `${key}|${tour}|${mode}|${scope}`;

    if (list.dataset.signature === currentSignature) return;

    list.dataset.signature = currentSignature;
    list.innerHTML = practiceTopicRows(key, tour, mode, scope);
  }

  function updateAvailability() {
    const modal = document.querySelector(".ps2-modal[data-practice-subject]");
    if (!modal) return;

    const includeAll = !!modal.querySelector("[data-repeat]")?.checked;
    const topics = Array.from(modal.querySelectorAll(".ps2-topic.is-on"));
    const available = topics.reduce((sum, t) => {
      return sum + Number(includeAll ? t.dataset.total : t.dataset.available || 0);
    }, 0);

    const count = modal.querySelector(".ps2-available b");
    if (count) count.textContent = String(available || 0);

    modal.querySelectorAll('[data-filter="count"] span').forEach(pill => {
      const n = Number(pill.dataset.value || 0);
      const disabled = n > available;
      pill.classList.toggle("is-disabled", disabled);
      if (disabled) pill.classList.remove("is-on");
    });

    if (!modal.querySelector('[data-filter="count"] span.is-on:not(.is-disabled)')) {
      const first = modal.querySelector('[data-filter="count"] span:not(.is-disabled)');
      if (first) first.classList.add("is-on");
    }
  }

  function showPracticePreview() {
    const modal = document.querySelector(".ps2-modal[data-practice-subject]");
    if (!modal) return;

    const key = modal.dataset.practiceSubject;
    const d = DATA[key] || DATA.economics;
    const mode = modal.dataset.mode || "regular";
    const selectedTour = modal.querySelector('[data-filter="tour"] .is-on')?.dataset.value || modal.dataset.practiceTour || "";

    window.__ps2LastPracticeContext = {
      key,
      scope: modal.dataset.practiceScope || "",
      tour: selectedTour,
      mode
    };

    const modeText =
      mode === "weak" ? "Темы для изучения" :
      mode === "custom" ? "Собранная практика" :
      "Обычная практика";

    const topics = Array.from(modal.querySelectorAll(".ps2-topic.is-on"))
      .map(x => x.dataset.topic)
      .filter(Boolean);

    const count = modal.querySelector('[data-filter="count"] .is-on')?.dataset.value || "10";
    const diff = modal.querySelector('[data-filter="difficulty"] .is-on')?.dataset.value || "Mixed";

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="practice" data-subject="${esc(key)}" data-scope="${esc(window.__ps2LastPracticeContext?.scope || "")}" data-tour="${esc(window.__ps2LastPracticeContext?.tour || "")}" data-mode="${esc(window.__ps2LastPracticeContext?.mode || "regular")}">←</button>
          <div>
            <div class="ps2-kicker">ПРАКТИКА СОБРАНА</div>
            <div class="ps2-modal-title">${esc(d.title)}</div>
            <div class="ps2-muted">${esc(modeText)} · ${esc(count)} вопросов · ${esc(diff)}</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Фокус практики</div>
          <div class="ps2-chip-row">
            ${(topics.length ? topics : d.weakList).slice(0, 4).map(x => `<span class="warn">${esc(x)}</span>`).join("")}
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Как это должно работать в main</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Загружаются вопросы из выбранного пула.</span></div>
            <div><b>2</b><span>Пользователь отвечает в привычном quiz-экране.</span></div>
            <div><b>3</b><span>Ответы сохраняются после каждого вопроса.</span></div>
            <div><b>4</b><span>После завершения открываются результат, ошибки и рекомендации.</span></div>
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Preview</div>
          <div class="ps2-muted">В рабочем app эта кнопка должна открывать обычный Practice Quiz с выбранными вопросами.</div>
        </div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="practice" data-subject="${esc(key)}" data-scope="${esc(window.__ps2LastPracticeContext?.scope || "")}" data-tour="${esc(window.__ps2LastPracticeContext?.tour || "")}" data-mode="${esc(window.__ps2LastPracticeContext?.mode || "regular")}">Изменить практику</button>
          <button type="button" class="btn" data-ps2-action="close">Закрыть</button>
        </div>
      </div>
    `);
  }

  function bind(root = document) {
    if (!root) return;
    if (root.__ps2Bound === true) return;
    root.__ps2Bound = true;

    root.addEventListener("click", function (ev) {
      const backdrop = ev.target.closest(".ps2-backdrop");
      if (backdrop && ev.target === backdrop) {
        ev.preventDefault();
        closeModal();
        return;
      }

      const actionBtn = ev.target.closest("[data-ps2-action]");
      const modeBtn = ev.target.closest(".ps2-mode");
      const pill = ev.target.closest(".ps2-pills span");
      const topic = ev.target.closest(".ps2-topic");
      const repeat = ev.target.closest("[data-repeat]");

      if (repeat) {
        updateAvailability();
        return;
      }

      if (modeBtn) {
        ev.preventDefault();
        ev.stopPropagation();

        const modal = modeBtn.closest(".ps2-modal");
        if (modal) {
          modal.dataset.mode = modeBtn.dataset.mode || "regular";

          const currentTour = modal.querySelector('[data-filter="tour"] .is-on')?.dataset.value || modal.dataset.practiceTour || "";
          window.__ps2LastPracticeContext = {
            key: modal.dataset.practiceSubject || "economics",
            scope: modal.dataset.practiceScope || "",
            tour: currentTour,
            mode: modal.dataset.mode || "regular"
          };

          const topicList = modal.querySelector(".ps2-topic-list");
          if (topicList) topicList.dataset.signature = "";

          updatePracticeModal();
        }
        return;
      }

      if (pill) {
        ev.preventDefault();
        ev.stopPropagation();

        if (pill.classList.contains("is-disabled")) return;

        const group = pill.closest(".ps2-pills");
        group?.querySelectorAll("span").forEach(x => x.classList.remove("is-on"));
        pill.classList.add("is-on");

        const modal = pill.closest(".ps2-modal");
        if (modal && group?.dataset.filter === "tour") {
          const topicList = modal.querySelector(".ps2-topic-list");
          if (topicList) topicList.dataset.signature = "";

          window.__ps2LastPracticeContext = {
            key: modal.dataset.practiceSubject || "economics",
            scope: modal.dataset.practiceScope || "",
            tour: pill.dataset.value || "7",
            mode: modal.dataset.mode || "regular"
          };

          updateTopicsForTour(modal, modal.dataset.practiceSubject, pill.dataset.value || "7");
        }

        updateAvailability();
        return;
      }

      if (topic) {
        ev.preventDefault();
        ev.stopPropagation();

        topic.classList.toggle("is-on");
        updateAvailability();
        return;
      }

      if (!actionBtn) return;

      ev.preventDefault();
      ev.stopPropagation();

      const action = actionBtn.dataset.ps2Action;
      const key = actionBtn.dataset.subject || "economics";

      if (action === "plan") {
        showPlan();
        return;
      }

      if (action === "grand-state") {
        setGrandState(actionBtn.dataset.state || "scheduled");
        closeModal();
        renderHome();
        return;
      }

      if (action === "grand-select") {
        showGrandSubjectSelect();
        return;
      }

      if (action === "grand-confirm") {
        showGrandConfirm(key || getGrandSubject());
        return;
      }

      if (action === "grand-start" || action === "grand-continue") {
        showGrandInProgress(key || getGrandSubject());
        return;
      }

      if (action === "grand-submit") {
        showGrandSubmitted(key || getGrandSubject());
        return;
      }

      if (action === "grand-submitted") {
        showGrandSubmitted(key || getGrandSubject());
        return;
      }

      if (action === "grand-finalizing") {
        showGrandFinalizing();
        return;
      }

      if (action === "grand-result") {
        setGrandState("results_ready");
        renderHome();
        showGrandResult(key || getGrandSubject());
        return;
      }

      if (action === "grand-ranking") {
        showGrandRanking(key || getGrandSubject(), GRAND_FINAL_TOUR_VALUE);
        return;
      }

      if (action === "grand-ranking-tab") {
        showGrandRanking(key || getGrandSubject(), actionBtn.dataset.rankingTab || GRAND_FINAL_TOUR_VALUE);
        return;
      }

      if (action === "grand-certificate") {
        showGrandCertificate(key || getGrandSubject());
        return;
      }

      if (action === "report") {
        showReport(key, actionBtn.dataset.scope || "season");
        return;
      }

      if (action === "detailed-report") {
        showDetailedReport(key, {
          scope: actionBtn.dataset.scope || "season",
          tour: actionBtn.dataset.tour || ""
        });
        return;
      }

      if (action === "practice") {
        showPractice(key, {
          scope: actionBtn.dataset.scope || "",
          tour: actionBtn.dataset.tour || "",
          mode: actionBtn.dataset.mode || "regular"
        });
        return;
      }

      if (action === "close") {
        closeModal();
        return;
      }

      if (action === "to-summaries") {
        closeModal();
        setTimeout(() => {
          const target = document.querySelector(".ps2-section");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
        return;
      }

      if (action === "start-practice") {
        showPracticePreview();
        return;
      }
    });
  }

  function injectStyles() {
    if (document.getElementById("ps2-style")) return;

    const style = document.createElement("style");
    style.id = "ps2-style";
    style.textContent = `
      #ps2-postseason-home { display:grid; gap:14px; margin:10px 0 16px; }
      .ps2-grand, .ps2-section, .ps2-modal, .ps2-panel, .ps2-plan-subject {
        background:#fff; border:1px solid var(--border); border-radius:18px; box-shadow:var(--shadow-sm);
      }
      .ps2-grand { padding:14px; border-color:rgba(245,158,11,.32); }
      .ps2-kicker { font-size:10px; font-weight:950; letter-spacing:.08em; color:var(--primary); text-transform:uppercase; margin-bottom:5px; }
      .ps2-grand-title, .ps2-modal-title { font-size:20px; font-weight:950; line-height:1.15; color:var(--text); }
      .ps2-grand-sub, .ps2-muted, .ps2-grand-note { color:rgba(15,23,42,.64); font-size:12px; line-height:1.35; }
      .ps2-grand-stats, .ps2-report-grid, .ps2-metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:7px; margin-top:11px; }
      .ps2-report-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .ps2-grand-stats div, .ps2-report-grid div, .ps2-metrics div {
        background:rgba(248,250,252,.95); border:1px solid rgba(226,232,240,.92); border-radius:13px; padding:8px 6px; text-align:center;
      }
      .ps2-grand-stats b, .ps2-report-grid b, .ps2-metrics b { display:block; color:var(--primary); font-size:15px; font-weight:950; line-height:1.05; }
      .ps2-grand-stats span, .ps2-report-grid span, .ps2-metrics span { display:block; margin-top:3px; color:rgba(15,23,42,.58); font-size:10px; font-weight:850; }
      .ps2-grand-note { border-top:1px solid rgba(226,232,240,.9); margin-top:10px; padding-top:9px; }
      .ps2-full-btn { width:100%; margin-top:12px; }
      .ps2-section { border:none; box-shadow:none; background:transparent; }
      .ps2-section h2 { margin:0; font-size:17px; line-height:1.2; font-weight:950; }
      .ps2-section p { margin:6px 0 11px; color:rgba(15,23,42,.62); font-size:12px; line-height:1.35; }
      .ps2-subject-list { display:grid; gap:12px; }
      .ps2-subject-card .home-competitive-hero { margin-bottom:0; }
      .ps2-weak { display:inline-flex; margin-top:9px; border-radius:999px; padding:7px 9px; background:rgba(245,158,11,.13); color:#b45309; font-size:11px; font-weight:900; }
      .ps2-weak.mini { margin-top:0; }
      .ps2-actions { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-top:11px; }
      .ps2-actions .btn { min-height:40px; padding-left:8px; padding-right:8px; }
      html.ps2-modal-open, body.ps2-modal-open { overscroll-behavior:none; }
      .ps2-backdrop { overscroll-behavior:none; touch-action:none; }
      .ps2-modal { overscroll-behavior:contain; touch-action:auto; }
      .ps2-backdrop { position:fixed; inset:0; z-index:10000; background:#f3f6fb; display:flex; align-items:stretch; justify-content:center; }
      .ps2-modal { width:min(390px, 100vw); height:100dvh; max-height:100dvh; overflow:auto; padding:14px; margin:0; border-radius:0; box-shadow:none; }
      .ps2-modal-top { display:flex; gap:12px; align-items:flex-start; margin-bottom:12px; }
      .ps2-back { width:36px; height:36px; border-radius:13px; border:1px solid var(--border); background:#fff; font-size:18px; font-weight:950; }
      .ps2-panel { padding:12px; margin-top:10px; }
      .ps2-panel.soft { background:rgba(248,250,252,.82); }
      .ps2-panel-title { font-size:11px; font-weight:950; color:rgba(15,23,42,.58); text-transform:uppercase; letter-spacing:.04em; margin-bottom:8px; }
      .ps2-steps { display:grid; gap:9px; }
      .ps2-steps div { display:grid; grid-template-columns:26px 1fr; gap:9px; align-items:start; }
      .ps2-steps b { width:24px; height:24px; border-radius:999px; display:grid; place-items:center; background:rgba(37,99,235,.1); color:#2563eb; font-size:12px; }
      .ps2-steps span { color:rgba(15,23,42,.72); font-size:13px; line-height:1.35; }
      .ps2-plan-list, .ps2-mode-list, .ps2-builder { display:grid; gap:10px; }
      .ps2-plan-subject { padding:12px; }
      .ps2-plan-title { font-size:15px; font-weight:950; color:var(--text); }
      .ps2-mode, .ps2-topic {
        width:100%; border:1px solid var(--border); border-radius:15px; background:#fff; padding:12px; text-align:left;
      }
      .ps2-mode b { display:block; font-size:15px; color:var(--text); }
      .ps2-mode span { display:block; margin-top:4px; color:rgba(15,23,42,.62); font-size:12px; line-height:1.35; }
      .ps2-mode.is-selected, .ps2-topic.is-on { border-color:rgba(37,99,235,.42); background:rgba(37,99,235,.055); }
      .ps2-builder { display:none; margin-top:10px; }
      .ps2-builder.is-open { display:grid; }
      .ps2-filter { border:1px solid var(--border); border-radius:15px; padding:10px; background:rgba(248,250,252,.78); }
      .ps2-pills { display:flex; flex-wrap:wrap; gap:7px; }
      .ps2-pills span { border:1px solid rgba(226,232,240,.95); border-radius:999px; background:#fff; padding:7px 9px; font-size:11px; font-weight:900; color:rgba(15,23,42,.7); }
      .ps2-pills .is-on { background:rgba(37,99,235,.12); border-color:rgba(37,99,235,.24); color:#2563eb; }
      .ps2-pills .is-disabled { opacity:.4; pointer-events:none; }
      .ps2-topic-list { display:grid; gap:7px; }
      .ps2-topic { display:flex; justify-content:space-between; align-items:center; padding:8px 9px; }
      .ps2-topic span { font-size:12px; font-weight:850; color:rgba(15,23,42,.76); }
      .ps2-topic small { border-radius:999px; padding:4px 7px; background:rgba(37,99,235,.09); color:#2563eb; font-size:10px; font-weight:900; }
      .ps2-available, .ps2-check, .ps2-hint { margin-top:8px; font-size:12px; color:rgba(15,23,42,.64); line-height:1.35; font-weight:750; }
      .ps2-check { display:flex; align-items:center; gap:8px; }
      .ps2-chip-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
      .ps2-chip-row span { border-radius:999px; padding:7px 9px; font-size:11px; font-weight:900; }
      .ps2-chip-row .good { background:rgba(34,197,94,.12); color:#15803d; }
      .ps2-chip-row .warn { background:rgba(245,158,11,.13); color:#b45309; }
      .ps2-scope-tabs { display:flex; gap:7px; overflow-x:auto; padding:2px 0 10px; margin-top:-2px; scrollbar-width:none; }
      .ps2-scope-tabs::-webkit-scrollbar { display:none; }
      .ps2-scope-tabs button {
        flex:0 0 auto; border:1px solid rgba(226,232,240,.95); background:#fff; color:rgba(15,23,42,.68);
        border-radius:999px; padding:8px 10px; font-size:11px; font-weight:900;
      }
      .ps2-scope-tabs button.is-on {
        background:rgba(37,99,235,.12); border-color:rgba(37,99,235,.24); color:#2563eb;
      }
      .ps2-readiness { border-color:rgba(37,99,235,.20); background:linear-gradient(135deg, rgba(37,99,235,.07), #fff); }
      .ps2-readiness-main { font-size:15px; line-height:1.25; font-weight:950; color:var(--text); margin-bottom:5px; }
      .ps2-next-action { font-size:15px; line-height:1.25; font-weight:950; color:var(--text); margin-bottom:10px; }
      .ps2-steps.mini { gap:7px; }
      .ps2-report-btn { width:100%; margin-top:10px; min-height:40px; }
      .ps2-weak-panel {
        border-color:rgba(245,158,11,.24);
        background:linear-gradient(135deg, rgba(245,158,11,.055), #fff);
      }
      .ps2-weak-practice-btn {
        width:100%;
        margin-top:12px;
        min-height:42px;
      }
      .ps2-single-action {
        grid-template-columns:1fr;
      }
      .ps2-academic-note {
        margin-top:-2px;
        margin-bottom:8px;
      }
      .ps2-chip-row span {
        max-width:100%;
        white-space:normal;
        line-height:1.25;
      }
      .ps2-scope-tabs {
        position:sticky; top:-14px; z-index:5;
        background:#f3f6fb; padding:8px 0 10px;
        display:flex; gap:7px; overflow-x:auto; scrollbar-width:none;
        border-bottom:1px solid rgba(226,232,240,.85);
        margin:0 -2px 10px;
      }
      .ps2-scope-tabs::-webkit-scrollbar { display:none; }
      .ps2-scope-tabs button {
        flex:0 0 auto;
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        color:rgba(15,23,42,.68);
        border-radius:999px;
        padding:8px 10px;
        font-size:11px;
        font-weight:900;
      }
      .ps2-scope-tabs button.is-on {
        background:rgba(37,99,235,.12);
        border-color:rgba(37,99,235,.24);
        color:#2563eb;
      }


      .ps2-study-panel {
        border-color:rgba(245,158,11,.24);
        background:linear-gradient(135deg, rgba(245,158,11,.055), #fff);
      }
      .ps2-study-btn {
        width:100%;
        margin-top:12px;
        min-height:42px;
      }
      .ps2-single-action {
        grid-template-columns:1fr;
      }
      .ps2-empty-note {
        border-radius:14px;
        padding:10px 11px;
        background:rgba(248,250,252,.95);
        color:rgba(15,23,42,.62);
        font-size:12px;
        line-height:1.35;
        font-weight:750;
      }
      .ps2-readiness-bar {
        height:8px;
        border-radius:999px;
        background:rgba(226,232,240,.92);
        overflow:hidden;
        margin:8px 0 8px;
      }
      .ps2-readiness-bar span {
        display:block;
        height:100%;
        border-radius:999px;
        background:linear-gradient(90deg, #2563eb, #22c55e);
      }
      .ps2-scope-tabs button.is-done {
        border-color:rgba(34,197,94,.34);
        background:rgba(34,197,94,.10);
        color:#15803d;
      }
      .ps2-scope-tabs button.is-missed {
        border-color:rgba(239,68,68,.30);
        background:rgba(239,68,68,.08);
        color:#b91c1c;
      }
      .ps2-scope-tabs button.is-on {
        background:rgba(37,99,235,.14) !important;
        border-color:rgba(37,99,235,.34) !important;
        color:#2563eb !important;
        box-shadow:inset 0 0 0 1px rgba(37,99,235,.12);
      }


      .ps2-study-panel {
        border-color:rgba(245,158,11,.24);
        background:linear-gradient(135deg, rgba(245,158,11,.055), #fff);
      }
      .ps2-study-btn {
        width:100%;
        margin-top:12px;
        min-height:42px;
      }
      .ps2-single-action {
        grid-template-columns:1fr;
      }
      .ps2-empty-note {
        border-radius:14px;
        padding:10px 11px;
        background:rgba(248,250,252,.95);
        color:rgba(15,23,42,.62);
        font-size:12px;
        line-height:1.35;
        font-weight:750;
      }
      .ps2-readiness-bar {
        height:8px;
        border-radius:999px;
        background:rgba(226,232,240,.92);
        overflow:hidden;
        margin:8px 0 8px;
      }
      .ps2-readiness-bar span {
        display:block;
        height:100%;
        border-radius:999px;
        background:linear-gradient(90deg, #2563eb, #22c55e);
      }
      .ps2-practice-summary {
        border-color:rgba(37,99,235,.20);
        background:linear-gradient(135deg, rgba(37,99,235,.055), #fff);
      }
      .ps2-practice-grid {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:7px;
        margin-top:8px;
      }
      .ps2-practice-grid div {
        background:rgba(248,250,252,.95);
        border:1px solid rgba(226,232,240,.92);
        border-radius:13px;
        padding:8px 6px;
        text-align:center;
      }
      .ps2-practice-grid b {
        display:block;
        color:var(--primary);
        font-size:15px;
        font-weight:950;
        line-height:1.05;
      }
      .ps2-practice-grid span {
        display:block;
        margin-top:3px;
        color:rgba(15,23,42,.58);
        font-size:10px;
        font-weight:850;
      }
      .ps2-scope-tabs button.is-done {
        border-color:rgba(34,197,94,.34);
        background:rgba(34,197,94,.10);
        color:#15803d;
      }
      .ps2-scope-tabs button.is-missed {
        border-color:rgba(239,68,68,.30);
        background:rgba(239,68,68,.08);
        color:#b91c1c;
      }
      .ps2-scope-tabs button.is-done.is-on {
        background:rgba(34,197,94,.16) !important;
        border-color:rgba(34,197,94,.42) !important;
        color:#15803d !important;
        box-shadow:inset 0 0 0 1px rgba(34,197,94,.16);
      }
      .ps2-scope-tabs button.is-missed.is-on {
        background:rgba(239,68,68,.13) !important;
        border-color:rgba(239,68,68,.40) !important;
        color:#b91c1c !important;
        box-shadow:inset 0 0 0 1px rgba(239,68,68,.14);
      }
      .ps2-scope-tabs button:not(.is-done):not(.is-missed).is-on {
        background:rgba(37,99,235,.14) !important;
        border-color:rgba(37,99,235,.34) !important;
        color:#2563eb !important;
      }


      .ps2-builder.is-study-mode {
        border:1px solid rgba(245,158,11,.22);
        border-radius:16px;
        padding:10px;
        background:linear-gradient(135deg, rgba(245,158,11,.055), rgba(255,255,255,.92));
      }
      .ps2-builder.is-study-mode .ps2-filter {
        background:#fff;
      }
      .ps2-builder.is-study-mode .ps2-topic.is-on {
        border-color:rgba(245,158,11,.38);
        background:rgba(245,158,11,.09);
      }
      .ps2-builder.is-study-mode .ps2-topic small {
        background:rgba(245,158,11,.14);
        color:#b45309;
      }


      [data-ps2-force-hidden="1"],
      [data-ps2-hidden-academic-season-review="1"] {
        display:none !important;
      }


      .ps2-grand-dev {
        margin-top:12px;
        padding-top:10px;
        border-top:1px solid rgba(255,255,255,.32);
      }
      .ps2-grand-switch {
        display:flex;
        gap:6px;
        overflow-x:auto;
        padding:6px 0 0;
        scrollbar-width:none;
      }
      .ps2-grand-switch::-webkit-scrollbar { display:none; }
      .ps2-grand-switch button {
        flex:0 0 auto;
        border:1px solid rgba(255,255,255,.30);
        background:rgba(255,255,255,.11);
        color:#fff;
        border-radius:999px;
        padding:7px 9px;
        font-size:10px;
        font-weight:900;
      }
      .ps2-grand-switch button.is-on {
        background:#fff;
        color:#2563eb;
      }
      .ps2-grand-state-open,
      .ps2-grand-state-results_ready {
        background:linear-gradient(135deg, #1d4ed8, #16a34a);
      }
      .ps2-grand-state-in_progress {
        background:linear-gradient(135deg, #0f172a, #2563eb);
      }
      .ps2-grand-state-submitted,
      .ps2-grand-state-finalizing {
        background:linear-gradient(135deg, #334155, #2563eb);
      }
      .ps2-final-badge {
        display:inline-flex;
        width:max-content;
        border-radius:999px;
        padding:5px 9px;
        background:rgba(37,99,235,.10);
        color:#2563eb;
        font-size:10px;
        font-weight:950;
      }
      .ps2-final-question-text {
        margin-top:8px;
        font-size:15px;
        line-height:1.35;
        color:var(--text);
        font-weight:850;
      }
      .ps2-final-options {
        display:grid;
        gap:8px;
        margin-top:12px;
      }
      .ps2-final-options button {
        border:1px solid rgba(226,232,240,.95);
        background:#fff;
        color:var(--text);
        border-radius:14px;
        padding:11px;
        text-align:left;
        font-weight:800;
      }
      .ps2-final-options button.is-picked {
        border-color:rgba(37,99,235,.34);
        background:rgba(37,99,235,.08);
        color:#2563eb;
      }
      .ps2-ranking-tabs button.is-final {
        border-color:rgba(245,158,11,.35);
        background:rgba(245,158,11,.10);
        color:#b45309;
      }
      .ps2-ranking-tabs button.is-final.is-on {
        background:rgba(245,158,11,.18) !important;
        border-color:rgba(245,158,11,.45) !important;
        color:#92400e !important;
      }
      .ps2-leaderboard-mini {
        display:grid;
        gap:8px;
        margin-top:8px;
      }
      .ps2-lb-mini-row {
        display:grid;
        grid-template-columns:42px 1fr;
        gap:7px;
        align-items:center;
        border:1px solid rgba(226,232,240,.92);
        background:#fff;
        border-radius:14px;
        padding:9px;
      }
      .ps2-lb-mini-row b {
        color:#2563eb;
        font-size:14px;
      }
      .ps2-lb-mini-row span {
        color:var(--text);
        font-size:13px;
        font-weight:950;
      }
      .ps2-lb-mini-row small {
        grid-column:2;
        color:rgba(15,23,42,.58);
        font-size:11px;
        font-weight:750;
      }
      .ps2-lb-mini-row.is-me {
        border-color:rgba(37,99,235,.30);
        background:rgba(37,99,235,.06);
      }
      .ps2-certificate-card {
        border-radius:22px;
        padding:18px;
        background:linear-gradient(135deg, #fff, rgba(37,99,235,.08));
        border:1px solid rgba(37,99,235,.18);
        box-shadow:0 16px 35px rgba(15,23,42,.10);
        text-align:center;
      }
      .ps2-cert-logo {
        color:#2563eb;
        font-weight:950;
        letter-spacing:.04em;
      }
      .ps2-cert-title {
        margin-top:10px;
        color:var(--text);
        font-size:20px;
        font-weight:950;
      }
      .ps2-cert-name {
        margin-top:12px;
        color:var(--text);
        font-size:17px;
        font-weight:900;
      }
      .ps2-cert-meta {
        margin-top:6px;
        color:rgba(15,23,42,.65);
        font-size:12px;
        font-weight:800;
      }
      .ps2-cert-code {
        margin-top:14px;
        color:rgba(15,23,42,.48);
        font-size:10px;
        font-weight:850;
        word-break:break-all;
      }
      .ps2-certificate-link {
        margin-top:8px;
        background:rgba(255,255,255,.16);
        color:#fff;
        border-color:rgba(255,255,255,.28);
      }


      .ps2-grand-dev {
        margin-top:12px;
        padding:10px;
        border:1px solid rgba(37,99,235,.14);
        border-radius:16px;
        background:rgba(37,99,235,.055);
      }
      .ps2-grand-switch-title {
        color:rgba(15,23,42,.78);
        font-size:11px;
        line-height:1.2;
        font-weight:950;
        text-transform:uppercase;
        letter-spacing:.04em;
      }
      .ps2-grand-switch-hint {
        margin-top:3px;
        color:rgba(15,23,42,.58);
        font-size:11px;
        line-height:1.3;
        font-weight:750;
      }
      .ps2-grand-switch {
        display:flex;
        gap:6px;
        overflow-x:auto;
        padding:8px 0 1px;
        scrollbar-width:none;
      }
      .ps2-grand-switch::-webkit-scrollbar { display:none; }
      .ps2-grand-switch button {
        flex:0 0 auto;
        border:1px solid rgba(226,232,240,.96);
        background:#fff;
        color:rgba(15,23,42,.68);
        border-radius:999px;
        padding:7px 9px;
        font-size:10px;
        font-weight:900;
      }
      .ps2-grand-switch button.is-on {
        background:rgba(37,99,235,.12);
        color:#2563eb;
        border-color:rgba(37,99,235,.32);
      }

    `;
    document.head.appendChild(style);
  }

  function ps2Text(el) {
    return String(el?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function ps2DirectText(el) {
    if (!el) return "";
    return String(Array.from(el.childNodes || [])
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent || "")
      .join(" "))
      .replace(/\s+/g, " ")
      .trim();
  }

  function ps2ForceHide(el) {
    if (!el) return;
    el.dataset.ps2ForceHidden = "1";
    el.style.setProperty("display", "none", "important");
  }

  function ps2IsUnsafeContainer(el) {
    if (!el) return true;

    const tag = String(el.tagName || "").toLowerCase();
    const id = String(el.id || "");
    const cls = String(el.className || "");

    return (
      tag === "body" ||
      tag === "html" ||
      tag === "main" ||
      id === "view-profile" ||
      id === "app" ||
      cls.includes("view-profile") ||
      cls.includes("profile-view") ||
      cls.includes("content") ||
      cls.includes("screen")
    );
  }

  function ps2StartsNextProfileSection(text) {
    const t = String(text || "").replace(/\s+/g, " ").trim();

    return (
      t === "Обзор результатов" ||
      t.startsWith("Обзор результатов") ||
      t.startsWith("Слоты соревновательного режима") ||
      t.startsWith("Достижения") ||
      t.startsWith("Мои сертификаты") ||
      t.startsWith("Мои рекомендации") ||
      t.startsWith("Поддержка")
    );
  }

  function ps2ContainsNextProfileSection(text) {
    const t = String(text || "").replace(/\s+/g, " ").trim();

    return (
      t.includes("Обзор результатов") ||
      t.includes("Слоты соревновательного режима") ||
      t.includes("Достижения") ||
      t.includes("Мои сертификаты") ||
      t.includes("Мои рекомендации") ||
      t.includes("Поддержка")
    );
  }

  function ps2LooksLikeOnlyAcademicReview(text) {
    const t = String(text || "").replace(/\s+/g, " ").trim();

    if (!t) return false;
    if (ps2ContainsNextProfileSection(t)) return false;

    return (
      t.includes("Academic Season Review") ||
      (
        t.includes("Practice Mastery") &&
        t.includes("Error-Driven Learner") &&
        t.includes("Fair Play")
      ) ||
      (
        t.includes("Открыть отчёт") &&
        t.includes("Практика") &&
        t.includes("Practice Mastery")
      )
    );
  }

  function ps2FindAcademicReviewTitle(root) {
    const all = Array.from(root.querySelectorAll("*"));

    const exact = all.find(el => {
      const direct = ps2DirectText(el);
      const total = ps2Text(el);
      return direct === "Academic Season Review" || total === "Academic Season Review";
    });

    if (exact) return exact;

    // fallback: smallest element containing the title only, not the whole profile
    return all
      .map(el => ({ el, text: ps2Text(el) }))
      .filter(item => {
        if (!item.text.includes("Academic Season Review")) return false;
        if (item.text.length > 900) return false;
        if (ps2ContainsNextProfileSection(item.text)) return false;
        if (ps2IsUnsafeContainer(item.el)) return false;
        return true;
      })
      .sort((a, b) => a.text.length - b.text.length)[0]?.el || null;
  }

  function ps2FindAcademicReviewCardAfterTitle(titleEl) {
    if (!titleEl) return null;

    const titleBlock =
      titleEl.closest("h1, h2, h3, .section-title, .block-title") ||
      titleEl;

    let next = titleBlock.nextElementSibling;

    while (next) {
      const text = ps2Text(next);

      if (!text) {
        next = next.nextElementSibling;
        continue;
      }

      if (ps2StartsNextProfileSection(text)) return null;

      if (
        text.includes("Practice Mastery") ||
        text.includes("Error-Driven Learner") ||
        text.includes("Fair Play") ||
        text.includes("Открыть отчёт") ||
        text.includes("Практика") ||
        text.includes("Экономика")
      ) {
        return next;
      }

      // If title and card are separated by a wrapper, inspect small children only.
      const child = Array.from(next.querySelectorAll("*"))
        .map(el => ({ el, text: ps2Text(el) }))
        .filter(item => {
          if (item.text.length > 1400) return false;
          if (ps2ContainsNextProfileSection(item.text)) return false;
          if (ps2IsUnsafeContainer(item.el)) return false;
          return ps2LooksLikeOnlyAcademicReview(item.text);
        })
        .sort((a, b) => a.text.length - b.text.length)[0]?.el;

      if (child) return child;

      break;
    }

    return null;
  }

  function hideProfileAcademicSeasonReview() {
    const profileRoot =
      document.querySelector("#view-profile") ||
      document.querySelector("[data-view='profile']") ||
      document.querySelector(".view-profile") ||
      document.querySelector(".profile-view") ||
      document.body;

    if (!profileRoot) return;

    const titleEl = ps2FindAcademicReviewTitle(profileRoot);

    if (titleEl) {
      const titleBlock =
        titleEl.closest("h1, h2, h3, .section-title, .block-title") ||
        titleEl;

      if (!ps2IsUnsafeContainer(titleBlock)) {
        ps2ForceHide(titleBlock);
      }

      const card = ps2FindAcademicReviewCardAfterTitle(titleEl);
      if (card && !ps2IsUnsafeContainer(card)) {
        ps2ForceHide(card);
      }

      return;
    }

    // Last fallback: hide only the smallest isolated review card.
    const isolatedCard = Array.from(profileRoot.querySelectorAll(".card, .panel-card, section, .home-block, .profile-section, div"))
      .map(el => ({ el, text: ps2Text(el) }))
      .filter(item => {
        if (item.text.length > 1400) return false;
        if (ps2IsUnsafeContainer(item.el)) return false;
        return ps2LooksLikeOnlyAcademicReview(item.text);
      })
      .sort((a, b) => a.text.length - b.text.length)[0]?.el;

    if (isolatedCard) {
      ps2ForceHide(isolatedCard);
    }
  }

  function startProfileAcademicReviewHider() {
    if (window.__ps2ProfileReviewHiderStarted) return;
    window.__ps2ProfileReviewHiderStarted = true;

    window.hideProfileAcademicSeasonReview = hideProfileAcademicSeasonReview;

    const run = () => {
      try { hideProfileAcademicSeasonReview(); } catch {}
    };

    run();
    setTimeout(run, 100);
    setTimeout(run, 350);
    setTimeout(run, 900);
    setTimeout(run, 1800);
    setTimeout(run, 3000);

    document.addEventListener("click", () => {
      setTimeout(run, 80);
      setTimeout(run, 350);
      setTimeout(run, 900);
    }, true);

    try {
      const observer = new MutationObserver(run);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      window.__ps2ProfileReviewObserver = observer;
    } catch {}

    setInterval(run, 1000);
  }

  function decoratePreviewRatingScreen() {
    const bodyText = String(document.body?.innerText || "");
    const isRatingView =
      bodyText.includes("Рейтинг") &&
      (
        document.querySelector('[data-tab="rating"].active, [data-view="rating"], #rating-view, .rating-view') ||
        Array.from(document.querySelectorAll(".bottom-nav a, .bottom-nav button, nav a, nav button"))
          .some(el => String(el.textContent || "").trim() === "Рейтинг" && el.className.includes("active"))
      );

    if (!isRatingView) return;

    const existing = document.getElementById("ps2-rating-final-hint");
    if (existing) return;

    const target =
      document.querySelector("#rating-view, .rating-view, [data-view='rating']") ||
      Array.from(document.querySelectorAll("main, .app-screen, .screen, .page, body"))
        .find(el => String(el.innerText || "").includes("Рейтинг")) ||
      document.body;

    if (!target) return;

    const box = document.createElement("div");
    box.id = "ps2-rating-final-hint";
    box.className = "ps2-rating-final-hint";
    box.innerHTML = `
      <div class="ps2-kicker">РЕЙТИНГ</div>
      <div class="ps2-rating-final-title">Финал будет отдельным пунктом</div>
      <div class="ps2-rating-final-tabs">
        <span>Все 7 туров</span>
        <span>Тур 1</span>
        <span>...</span>
        <span>Тур 7</span>
        <b>Финал</b>
      </div>
      <div class="ps2-muted">В main это подключится к текущему рейтингу как tour_no = ${GRAND_FINAL_TOUR_NO}. Финал не входит в “Все 7 туров”.</div>
    `;

    if (target === document.body) {
      box.style.margin = "12px";
      document.body.prepend(box);
    } else {
      target.prepend(box);
    }
  }

  function startRatingPreviewDecorator() {
    if (window.__ps2RatingPreviewDecoratorStarted) return;
    window.__ps2RatingPreviewDecoratorStarted = true;

    const run = () => {
      try { decoratePreviewRatingScreen(); } catch {}
    };

    document.addEventListener("click", () => {
      setTimeout(run, 80);
      setTimeout(run, 350);
    }, true);

    setTimeout(run, 300);
    setInterval(run, 1200);
  }

  function startGrandActionFallback() {
    if (window.__ps2GrandActionFallbackStarted) return;
    window.__ps2GrandActionFallbackStarted = true;

    document.addEventListener("click", (event) => {
      const btn = event.target?.closest?.("[data-ps2-action]");
      if (!btn) return;

      const action = String(btn.dataset.ps2Action || "");
      if (!action.startsWith("grand-")) return;

      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();

      const key = btn.dataset.subject || getGrandSubject();

      if (action === "grand-state") {
        setGrandState(btn.dataset.state || "scheduled");
        closeModal();
        renderHome();
        return;
      }

      if (action === "grand-select") {
        showGrandSubjectSelect();
        return;
      }

      if (action === "grand-confirm") {
        showGrandConfirm(key);
        return;
      }

      if (action === "grand-start" || action === "grand-continue") {
        showGrandInProgress(key);
        return;
      }

      if (action === "grand-submit" || action === "grand-submitted") {
        showGrandSubmitted(key);
        return;
      }

      if (action === "grand-finalizing") {
        showGrandFinalizing();
        return;
      }

      if (action === "grand-result") {
        setGrandState("results_ready");
        renderHome();
        showGrandResult(key);
        return;
      }

      if (action === "grand-ranking") {
        setGrandState("results_ready");
        renderHome();
        showGrandRanking(key, GRAND_FINAL_TOUR_VALUE);
        return;
      }

      if (action === "grand-ranking-tab") {
        showGrandRanking(key, btn.dataset.rankingTab || GRAND_FINAL_TOUR_VALUE);
        return;
      }

      if (action === "grand-certificate") {
        setGrandState("results_ready");
        renderHome();
        showGrandCertificate(key);
        return;
      }
    }, true);
  }

  function schedule() {
    startRatingPreviewDecorator();
    startGrandActionFallback();
    startProfileAcademicReviewHider();
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      injectStyles();
      renderHome();
      hideProfileAcademicSeasonReview();
      if (tries >= 30) clearInterval(timer);
    }, 180);

    injectStyles();
    renderHome();
    setTimeout(renderHome, 500);
    setTimeout(renderHome, 1200);
  }

  document.addEventListener("DOMContentLoaded", schedule);
  window.addEventListener("load", schedule);
  applyGrandStateFromUrl();
  setTimeout(schedule, 100);
  setTimeout(startGrandActionFallback, 100);
  setTimeout(startGrandActionFallback, 800);
  setTimeout(startProfileAcademicReviewHider, 100);
  setTimeout(startProfileAcademicReviewHider, 800);
  setTimeout(startProfileAcademicReviewHider, 1800);
  setTimeout(hideProfileAcademicSeasonReview, 500);
  setTimeout(hideProfileAcademicSeasonReview, 1500);
  setInterval(hideProfileAcademicSeasonReview, 1200);
})();
