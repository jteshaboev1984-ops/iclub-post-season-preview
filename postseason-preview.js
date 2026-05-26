(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  window.ICLUB_POSTSEASON_PREVIEW_BUILD = "report-final-v11-20260526";
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
        <p>Откройте итог, посмотрите темы для изучения и выберите практику.</p>
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
          <div class="ps2-panel-title">Формат финала</div>
          <div class="ps2-grand-stats inside">
            <div><b>20</b><span>вопросов</span></div>
            <div><b>Mixed</b><span>сложность</span></div>
            <div><b>1</b><span>попытка</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Что будет оцениваться</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Точность ответов.</span></div>
            <div><b>2</b><span>Работа со смешанными темами, а не с одним разделом.</span></div>
            <div><b>3</b><span>Умение не повторять ошибки из 7 туров.</span></div>
            <div><b>4</b><span>Время прохождения при равных результатах.</span></div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Как готовиться</div>
          <div class="ps2-steps">
            <div><b>1</b><span>Откройте итог сезона по каждому предмету.</span></div>
            <div><b>2</b><span>Посмотрите темы для усиления.</span></div>
            <div><b>3</b><span>Соберите практику по нужным турам и темам.</span></div>
            <div><b>4</b><span>Повторите уже закрытые вопросы только если хотите закрепить материал.</span></div>
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Важно</div>
          <div class="ps2-muted">Grand Olympiad — это отдельный финальный этап сезона, а не ещё один обычный тур.</div>
        </div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="to-summaries">К итогам по предметам</button>
          <button type="button" class="btn" data-ps2-action="close">Закрыть</button>
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

  function reportScopeTabs(key, activeScope) {
    const chips = [
      ["season", "Итог сезона"],
      ["tour1", "Тур 1"],
      ["tour2", "Тур 2"],
      ["tour3", "Тур 3"],
      ["tour4", "Тур 4"],
      ["tour5", "Тур 5"],
      ["tour6", "Тур 6"],
      ["tour7", "Тур 7"]
    ];

    return `
      <div class="ps2-scope-tabs">
        ${chips.map(([scope, label]) => {
          const isTour = scope.startsWith("tour");
          const tourNo = isTour ? Number(scope.replace("tour", "")) : null;
          const statusClass = isTour
            ? hasParticipatedInTour(key, tourNo) ? "is-done" : "is-missed"
            : "";

          return `
            <button type="button"
              class="${scope === activeScope ? "is-on" : ""} ${statusClass}"
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
    const readiness = getSeasonReadiness(key);

    const title = isTour ? `${d.title} · Тур ${tourNo}` : d.title;
    const subtitle = isTour
      ? participated
        ? "Итог выбранного тура."
        : "Тур не пройден. Можно изучить темы этого тура."
      : "Общий итог сезона по предмету.";

    const metrics = isTour
      ? participated
        ? `
          <div><b>${t.result}%</b><span>Результат</span></div>
          <div><b>#${t.rank}</b><span>Регион</span></div>
          <div><b>${t.mistakes}</b><span>Ошибки</span></div>
          <div><b>${t.time}</b><span>Время</span></div>
        `
        : `
          <div><b>—</b><span>Результат</span></div>
          <div><b>—</b><span>Регион</span></div>
          <div><b>0</b><span>Ответов</span></div>
          <div><b>—</b><span>Время</span></div>
        `
      : `
        <div><b>${esc(d.tours)}</b><span>Туры</span></div>
        <div><b>${esc(d.avg)}</b><span>Средний результат</span></div>
        <div><b>${esc(d.rank)}</b><span>Место в регионе</span></div>
        <div><b>18</b><span>Практики</span></div>
      `;

    const mastered = isTour
      ? participated
        ? t.strong
        : []
      : basis.seasonStrong;

    const studyTopics = isTour
      ? participated
        ? t.weak
        : getTourStudyTopics(key, tourNo)
      : basis.seasonWeak;

    const analysisTitle = isTour
      ? participated ? "Итог тура" : "Тур не пройден"
      : "Готовность к Grand Olympiad";

    const analysisMain = isTour
      ? participated
        ? `Тур ${tourNo}: ${t.mistakes} ошибки требуют изучения`
        : "Нет попытки — результат не рассчитан"
      : `${readiness.level} готовность · ${readiness.score}%`;

    const analysisText = isTour
      ? participated
        ? `Фокус этого тура — ${studyTopics.map(x => x.name).slice(0, 2).join(" и ")}.`
        : "По этому туру нет личного результата, но темы доступны для изучения через практику."
      : `После изучения ${readiness.toStudy} тем готовность должна обновиться. Сейчас часть тем ещё нестабильна.`;

    const detailedButton = isTour
      ? `Сформировать отчёт по Тур ${tourNo}`
      : "Сформировать общий отчёт";

    const planTitle = isTour
      ? participated ? `План после Тур ${tourNo}` : `План изучения Тур ${tourNo}`
      : "Рекомендованный план";

    const planRows = isTour
      ? participated
        ? [
            "Изучите темы, где были ошибки.",
            "Пройдите практику по темам этого тура.",
            "Вернитесь к итогу и проверьте прогресс."
          ]
        : [
            "Изучите темы тура без рейтинговой попытки.",
            "Соберите практику по темам этого тура.",
            "После практики вернитесь к общему итогу сезона."
          ]
      : [
          "Начните с тем для изучения.",
          "Сделайте mixed practice перед финалом.",
          "После практики проверьте обновлённую готовность."
        ];

    const masteredHTML = mastered.length
      ? `<div class="ps2-chip-row">${mastered.map(x => `<span class="good">${esc(formatStrongTopic(x))}</span>`).join("")}</div>`
      : `<div class="ps2-empty-note">Нет данных: тур не пройден.</div>`;

    openModal(`
      <div class="ps2-modal">
        <div class="ps2-modal-top">
          <button type="button" class="ps2-back" data-ps2-action="close">←</button>
          <div>
            <div class="ps2-kicker">${isTour ? "ИТОГ ТУРА" : "ИТОГ СЕЗОНА"}</div>
            <div class="ps2-modal-title">${esc(title)}</div>
            <div class="ps2-muted">${esc(subtitle)}</div>
          </div>
        </div>

        ${reportScopeTabs(key, activeScope)}

        <div class="ps2-report-grid">
          ${metrics}
        </div>

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

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Подробный отчёт</div>
          <div class="ps2-muted">${isTour
            ? participated
              ? `Отдельный отчёт по Тур ${tourNo}: результат, время, темы, ошибки и обезличенное сравнение с группой.`
              : `Отчёт по Тур ${tourNo}: статус участия, темы тура и план изучения без личного результата.`
            : "Общий отчёт за сезон: активность, динамика, темы для изучения и обезличенное сравнение по классу, району и региону."}</div>
          <button type="button"
            class="btn ps2-report-btn"
            data-ps2-action="detailed-report"
            data-subject="${esc(key)}"
            data-scope="${esc(activeScope)}"
            data-tour="${esc(tourNo || "")}">${esc(detailedButton)}</button>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Освоенные темы</div>
          <div class="ps2-muted ps2-academic-note">Показаны темы с высокой точностью и достаточным числом ответов.</div>
          ${masteredHTML}
        </div>

        <div class="ps2-panel ps2-study-panel">
          <div class="ps2-panel-title">Темы для изучения</div>
          <div class="ps2-chip-row">${studyTopics.map(x => `<span class="warn">${esc(formatStudyTopic(x))}</span>`).join("")}</div>
          <button type="button"
            class="btn primary ps2-study-btn"
            data-ps2-action="practice"
            data-subject="${esc(key)}"
            data-scope="${esc(activeScope)}"
            data-tour="${esc(tourNo || "")}"
            data-mode="weak">Начать изучение</button>
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

    const title = isTour
      ? `${d.title} · Отчёт по Тур ${tourNo}`
      : `${d.title} · Общий отчёт`;

    const rows = isTour
      ? participated
        ? [
            "Результат, время и место в рейтинге выбранного тура.",
            "Освоенные темы и темы для изучения по этому туру.",
            "Обезличенное сравнение с похожими участниками.",
            "Что изучить перед Grand Olympiad."
          ]
        : [
            "Статус: пользователь не участвовал в этом туре.",
            "Темы тура, которые всё равно доступны для изучения.",
            "Практика по темам тура без рейтингового результата.",
            "Как закрыть пробел перед Grand Olympiad."
          ]
      : [
          "Активные дни и регулярность занятий за сезон.",
          "Динамика по всем турам и практике.",
          "Темы, которые ещё требуют изучения.",
          "Обезличенное сравнение по классу, району и региону."
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
            <div class="ps2-kicker">ПОДРОБНЫЙ ОТЧЁТ</div>
            <div class="ps2-modal-title">${esc(title)}</div>
            <div class="ps2-muted">${isTour ? "Preview отчёта по выбранному туру." : "Preview общего отчёта за сезон."}</div>
          </div>
        </div>

        <div class="ps2-panel">
          <div class="ps2-panel-title">Что войдёт</div>
          <div class="ps2-steps">
            ${rows.map((text, i) => `<div><b>${i + 1}</b><span>${esc(text)}</span></div>`).join("")}
          </div>
        </div>

        <div class="ps2-panel soft">
          <div class="ps2-panel-title">Логика расчёта</div>
          <div class="ps2-muted">${isTour
            ? participated
              ? "Отчёт по туру считается по попытке этого тура, времени, ошибкам и темам тура."
              : "Если тура нет, отчёт показывает отсутствие попытки и доступный план изучения."
            : "Общий отчёт считается по всем турам, практике, активности и повторяющимся ошибкам."}</div>
        </div>

        <div class="ps2-actions ps2-single-action">
          <button type="button"
            class="btn primary"
            data-ps2-action="report"
            data-subject="${esc(key)}"
            data-scope="${esc(scope)}">Вернуться к итогу</button>
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

  function showPractice(key, context = {}) {
    const d = DATA[key] || DATA.economics;
    const scope = String(context.scope || "");
    const tourFromContext = Number(context.tour || 0);
    const defaultTour = tourFromContext || 7;
    const initialMode = String(context.mode || "regular");
    const cameFromReport = !!scope;

    const sourceText = scope.startsWith("tour")
      ? `Источник: Тур ${defaultTour}`
      : scope === "season"
        ? "Источник: итог сезона"
        : "Источник: предмет";

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
            <div class="ps2-kicker">ПРАКТИКА</div>
            <div class="ps2-modal-title">Выберите формат</div>
            <div class="ps2-muted">${esc(d.title)} · ${esc(sourceText)}</div>
          </div>
        </div>

        <div class="ps2-mode-list">
          <button type="button" class="ps2-mode ${initialMode === "regular" ? "is-selected" : ""}" data-mode="regular">
            <b>Обычная практика</b>
            <span>Продолжайте привычную практику по предмету.</span>
          </button>
          <button type="button" class="ps2-mode ${initialMode === "weak" ? "is-selected" : ""}" data-mode="weak">
            <b>Изучить темы</b>
            <span>Фокус на темах, которые требуют изучения или закрепления.</span>
          </button>
          <button type="button" class="ps2-mode ${initialMode === "custom" ? "is-selected" : ""}" data-mode="custom">
            <b>Собрать практику</b>
            <span>Выберите тур, темы, сложность и количество вопросов.</span>
          </button>
        </div>

        <div class="ps2-builder">
          <div class="ps2-filter">
            <div class="ps2-panel-title">Тур</div>
            <div class="ps2-pills" data-filter="tour">
              <span class="${defaultTour === 5 ? "is-on" : ""}" data-value="5">5</span>
              <span class="${defaultTour === 6 ? "is-on" : ""}" data-value="6">6</span>
              <span class="${defaultTour === 7 ? "is-on" : ""}" data-value="7">7</span>
            </div>
          </div>

          <div class="ps2-filter">
            <div class="ps2-panel-title">Темы тура</div>
            <div class="ps2-topic-list">${topicRows(key, defaultTour)}</div>
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

        <div class="ps2-actions ps2-single-action">
          <button type="button" class="btn primary" data-ps2-action="start-practice">Начать обычную практику</button>
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
      if (start) start.textContent = "Тренировать темы для изучения";
      if (hint) hint.textContent = "Фокус — темы, которые нужно изучить или закрепить.";
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

    const modeText =
      mode === "weak" ? "Темы для изучения" :
      mode === "custom" ? "Собранная практика" :
      "Обычная практика";

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
            <div class="ps2-kicker">ПРАКТИКА ГОТОВА</div>
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
          <div class="ps2-muted">Здесь показана логика сборки. В рабочем app этот запуск должен открывать обычный Practice Quiz, а не отдельную заглушку.</div>
        </div>

        <div class="ps2-actions">
          <button type="button" class="btn primary" data-ps2-action="practice" data-subject="${esc(key)}">Изменить практику</button>
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

    `;
    document.head.appendChild(style);
  }

  function hideProfileAcademicSeasonReview() {
    const nodes = Array.from(document.querySelectorAll("h1, h2, h3, .section-title, .block-title, .card-title, div"));
    const title = nodes.find(el => String(el.textContent || "").trim() === "Academic Season Review");
    if (!title) return;

    const block =
      title.closest(".home-block") ||
      title.closest(".profile-section") ||
      title.closest("section") ||
      title.closest(".card") ||
      title.parentElement;

    if (block) {
      block.style.display = "none";
      block.dataset.ps2HiddenAcademicSeasonReview = "1";
    }
  }

  function schedule() {
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
  setTimeout(schedule, 100);
})();
