(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

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

          <div class="ps2-weak">${esc(d.weak)} темы усилить</div>

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
      <section class="ps2-grand">
        <div class="ps2-kicker">ФИНАЛ СЕЗОНА</div>
        <div class="ps2-grand-title">Grand Olympiad</div>
        <div class="ps2-grand-sub">Финальный этап после 7 туров.</div>

        <div class="ps2-grand-stats">
          <div><b>20</b><span>вопросов</span></div>
          <div><b>Mixed</b><span>сложность</span></div>
          <div><b>точность</b><span>+ время</span></div>
        </div>

        <div class="ps2-grand-note">Откроется через 5 дней. Подготовка идёт через итоги предметов и практику.</div>

        <button type="button" class="btn primary ps2-full-btn" data-ps2-action="plan">План финала</button>
      </section>

      <section class="ps2-section">
        <h2>Итоги по предметам</h2>
        <p>Откройте итог, посмотрите слабые темы и выберите практику.</p>
        <div class="ps2-subject-list">
          ${keys.map(cardHTML).join("")}
        </div>
      </section>
    `;

    bind(wrap);
  }

  function openModal(html) {
    const root = document.getElementById("modal-root");
    if (!root) return;

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

  function showPlan() {
    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ФИНАЛ СЕЗОНА</div>
            <div class="ps2-modal-title">Grand Olympiad</div>
            <div class="ps2-muted">Откроется через 5 дней</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Формат</div>
          <div class="ps2-grand-stats inside">
            <div><b>20</b><span>вопросов</span></div>
            <div><b>Mixed</b><span>сложность</span></div>
            <div><b>точность</b><span>+ время</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Как подготовиться</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Выберите предмет ниже.</span></div>
            <div><b>2</b><span>Откройте итог и посмотрите слабые темы.</span></div>
            <div><b>3</b><span>Соберите практику по нужным турам и темам.</span></div>
            <div><b>4</b><span>Закройте слабые темы до финала.</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Выберите предмет</div>
          <div class="ps2-plan-list">${subjectChoiceCards()}</div>
        </div>
      </div>
    `);
  }

  function showReport(key) {
    const d = DATA[key] || DATA.economics;

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ИТОГ СЕЗОНА</div>
            <div class="ps2-modal-title">${esc(d.title)}</div>
            <div class="ps2-muted">Краткий итог сезона по предмету.</div>
          </div>
        </div>

        <div class="ps2-report-grid">
          <div><b>${esc(d.tours)}</b><span>Туры</span></div>
          <div><b>${esc(d.avg)}</b><span>Средний результат</span></div>
          <div><b>${esc(d.rank)}</b><span>Место в регионе</span></div>
          <div><b>18</b><span>Практики</span></div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Сильные темы</div>
          <div class="ps2-chip-row">${d.strong.map(x => `<span class="good">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Темы для усиления</div>
          <div class="ps2-chip-row">${d.weakList.map(x => `<span class="warn">${esc(x)}</span>`).join("")}</div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Подробный отчёт</div>
          <div class="ps2-muted">Позже здесь можно дать расширенный отчёт по запросу: активность, динамика, слабые темы и обезличенное сравнение по классу, району и региону.</div>
        </div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="practice" data-subject="${esc(key)}">Практика</button>
          <button type="button" class="btn" data-ps2-action="close">Закрыть</button>
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

  function showPractice(key) {
    const d = DATA[key] || DATA.economics;

    openModal(`
      <div class="ps2-modal" data-practice-subject="${esc(key)}" data-mode="regular">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">ПРАКТИКА</div>
            <div class="ps2-modal-title">Выберите практику</div>
            <div class="ps2-muted">${esc(d.title)} · подготовка к финалу</div>
          </div>
        </div>

        <div class="ps2-mode-list">
          <button type="button" class="ps2-mode is-selected" data-mode="regular">
            <b>Обычная практика</b>
            <span>Продолжайте привычную практику по предмету.</span>
          </button>
          <button type="button" class="ps2-mode" data-mode="weak">
            <b>Слабые темы</b>
            <span>${esc(d.weak)} темы для усиления по итогам сезона.</span>
          </button>
          <button type="button" class="ps2-mode" data-mode="custom">
            <b>Собрать практику</b>
            <span>Выберите тур, темы, сложность и количество вопросов.</span>
          </button>
        </div>

        <div class="ps2-builder">
          <div class="ps2-filter">
            <div class="ps2-panel-title">Тур</div>
            <div class="ps2-pills" data-filter="tour">
              <span data-value="5">5</span>
              <span data-value="6">6</span>
              <span class="is-on" data-value="7">7</span>
            </div>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">Темы тура</div>
            <div class="ps2-topic-list">${topicRows(key, 7)}</div>
            <div class="ps2-available">Доступно новых вопросов: <b>13</b></div>
            <label class="ps2-check">
              <input type="checkbox" data-repeat />
              <span>Повторять уже закрытые вопросы</span>
            </label>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">Сложность</div>
            <div class="ps2-pills" data-filter="difficulty">
              <span class="is-on" data-value="mixed">Mixed</span>
              <span data-value="easy">Easy</span>
              <span data-value="medium">Medium</span>
              <span data-value="hard">Hard</span>
            </div>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">Количество</div>
            <div class="ps2-pills" data-filter="count">
              <span data-value="5">5</span>
              <span class="is-on" data-value="10">10</span>
              <span data-value="20">20</span>
              <span data-value="30">30</span>
            </div>
          </div>
        </div>

        <div class="ps2-hint">Запустится привычная практика по предмету.</div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="start-practice">Начать обычную практику</button>
          <button type="button" class="btn" data-ps2-action="report" data-subject="${esc(key)}">Итог сезона</button>
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

    modal.querySelectorAll(".ps2-mode").forEach(x => {
      x.classList.toggle("is-selected", x.dataset.mode === mode);
    });

    if (builder) builder.classList.toggle("is-open", mode === "custom");

    if (mode === "weak") {
      if (start) start.textContent = "Тренировать слабые темы";
      if (hint) hint.textContent = "Фокус — темы, где чаще были ошибки.";
    } else if (mode === "custom") {
      if (start) start.textContent = "Собрать практику";
      if (hint) hint.textContent = "Практика будет собрана по выбранному туру, темам и сложности.";
    } else {
      if (start) start.textContent = "Начать обычную практику";
      if (hint) hint.textContent = "Запустится привычная практика по предмету.";
    }

    updateAvailability();
  }

  function updateTopicsForTour(modal, key, tour) {
    const list = modal.querySelector(".ps2-topic-list");
    if (!list) return;
    list.innerHTML = topicRows(key, tour);
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
    const modeText = mode === "weak" ? "Слабые темы" : mode === "custom" ? "Собранная практика" : "Обычная практика";

    const topics = Array.from(modal.querySelectorAll(".ps2-topic.is-on"))
      .map(x => x.dataset.topic)
      .filter(Boolean);

    const count = modal.querySelector('[data-filter="count"] .is-on')?.dataset.value || "10";
    const diff = modal.querySelector('[data-filter="difficulty"] .is-on')?.dataset.value || "mixed";

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="practice" data-subject="${esc(key)}">←</button>
          <div>
            <div class="ps2-kicker">ПРАКТИКА СОБРАНА</div>
            <div class="ps2-modal-title">${esc(d.title)}</div>
            <div class="ps2-muted">${esc(modeText)} · ${esc(count)} вопросов · ${esc(diff)}</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Фокус</div>
          <div class="ps2-chip-row">
            ${(topics.length ? topics : d.weakList).slice(0, 4).map(x => `<span class="warn">${esc(x)}</span>`).join("")}
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Preview</div>
          <div class="ps2-muted">Здесь показана логика сборки. В main этот запуск будет открывать обычный экран Practice Quiz с вопросами из реального банка.</div>
        </div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="practice" data-subject="${esc(key)}">Изменить практику</button>
          <button type="button" class="btn" data-ps2-action="close">Закрыть</button>
        </div>
      </div>
    `);
  }

  function bind(root = document) {
    root.querySelectorAll("[data-ps2-bound]").forEach(() => {});

    root.addEventListener("click", function (ev) {
      const actionBtn = ev.target.closest("[data-ps2-action]");
      const modeBtn = ev.target.closest(".ps2-mode");
      const pill = ev.target.closest(".ps2-pills span");
      const topic = ev.target.closest(".ps2-topic");

      if (modeBtn) {
        ev.preventDefault();
        const modal = modeBtn.closest(".ps2-modal");
        if (modal) {
          modal.dataset.mode = modeBtn.dataset.mode || "regular";
          updatePracticeModal();
        }
        return;
      }

      if (pill) {
        ev.preventDefault();
        if (pill.classList.contains("is-disabled")) return;

        const group = pill.closest(".ps2-pills");
        group?.querySelectorAll("span").forEach(x => x.classList.remove("is-on"));
        pill.classList.add("is-on");

        const modal = pill.closest(".ps2-modal");
        if (modal && group?.dataset.filter === "tour") {
          updateTopicsForTour(modal, modal.dataset.practiceSubject, pill.dataset.value || "7");
        }
        updateAvailability();
        return;
      }

      if (topic) {
        ev.preventDefault();
        topic.classList.toggle("is-on");
        updateAvailability();
        return;
      }

      if (!actionBtn) return;

      ev.preventDefault();
      const action = actionBtn.dataset.ps2Action;
      const key = actionBtn.dataset.subject || "economics";

      if (action === "plan") showPlan();
      if (action === "report") showReport(key);
      if (action === "practice") showPractice(key);
      if (action === "close") closeModal();
      if (action === "start-practice") showPracticePreview();
    }, { once: true });
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
      .ps2-backdrop { position:fixed; inset:0; z-index:10000; background:rgba(15,23,42,.58); display:flex; align-items:flex-end; justify-content:center; }
      .ps2-modal { width:min(390px, calc(100vw - 16px)); max-height:calc(100vh - 28px); overflow:auto; padding:14px; margin-bottom:8px; }
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
    `;
    document.head.appendChild(style);
  }

  function schedule() {
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      injectStyles();
      renderHome();
      if (tries >= 30) clearInterval(timer);
    }, 180);

    injectStyles();
    renderHome();
    setTimeout(renderHome, 500);
    setTimeout(renderHome, 1200);
  }

  document.addEventListener("DOMContentLoaded", schedule);
  window.addEventListener("load", schedule);
  setTimeout(schedule, 100);
})();
