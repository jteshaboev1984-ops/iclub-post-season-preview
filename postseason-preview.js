(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  const BUILD = "grand-final-v74-certificate-button-bridge-20260609";
  window.ICLUB_POSTSEASON_PREVIEW_BUILD = BUILD;
  console.info("[iClub Preview] build:", BUILD);

  const FINAL_QUESTIONS_COUNT = 4;
  const QUESTION_SECONDS = 25;

  const LS = {
    phase: "iclub_preview_phase_v33",
    subject: "iclub_preview_subject_v33",
    quizPrefix: "iclub_preview_quiz_v33_"
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
          q: "Какой вариант лучше всего показывает применение экономической идеи, а не простое запоминание определения?",
          options: [
            ["A", "Повторить только определение"],
            ["B", "Применить идею к новой ситуации"],
            ["C", "Выбрать ответ по одному ключевому слову"],
            ["D", "Не учитывать контекст вопроса"]
          ],
          correct: "B"
        },
        {
          q: "Какая мера лучше всего подходит, если дефицит платёжного баланса вызван слабой конкурентоспособностью экспорта?",
          options: [
            ["A", "Повысить производительность и качество продукции"],
            ["B", "Навсегда запретить весь импорт"],
            ["C", "Увеличить потребление без роста выпуска"],
            ["D", "Игнорировать влияние обменного курса"]
          ],
          correct: "A"
        },
        {
          q: "Сильный оценочный абзац в Economics должен прежде всего показывать:",
          options: [
            ["A", "Только одно выученное определение"],
            ["B", "Обоснованное суждение с условиями и ограничениями"],
            ["C", "Более длинное вступление"],
            ["D", "Повторение формулировки вопроса"]
          ],
          correct: "B"
        },
        {
          q: "Если спрос эластичен по цене, снижение цены, скорее всего, приведёт к:",
          options: [
            ["A", "Снижению общей выручки"],
            ["B", "Неизменной общей выручке"],
            ["C", "Росту общей выручки"],
            ["D", "Полностью неэластичному спросу"]
          ],
          correct: "C"
        }
      ]
    },

    mathematics: {
      title: "Математика",
      tours: "5/7",
      avg: "68%",
      rank: "#18",
      weak: 4,
      strong: ["Quadratics", "Graphs", "Coordinate geometry"],
      study: ["Trigonometric identities", "Binomial coefficients", "Inequalities"],
      questions: [
        {
          q: "Какой первый шаг наиболее надёжен при решении сложного алгебраического выражения?",
          options: [
            ["A", "Сразу подставить случайные числа"],
            ["B", "Сначала определить структуру выражения"],
            ["C", "Округлить до начала решения"],
            ["D", "Использовать самую длинную формулу"]
          ],
          correct: "B"
        },
        {
          q: "Перед решением тригонометрического тождества лучше всего:",
          options: [
            ["A", "Преобразовать выражение через известные тождества"],
            ["B", "Угадать угол"],
            ["C", "Игнорировать область допустимых значений"],
            ["D", "Всегда дифференцировать обе части"]
          ],
          correct: "A"
        },
        {
          q: "Дискриминант квадратного уравнения помогает определить:",
          options: [
            ["A", "Количество и тип корней"],
            ["B", "Только точку пересечения с осью y"],
            ["C", "Градиент прямой"],
            ["D", "Площадь под графиком"]
          ],
          correct: "A"
        },
        {
          q: "В биномиальном разложении коэффициент члена находится с помощью:",
          options: [
            ["A", "Только подстановки"],
            ["B", "Биномиальных коэффициентов и степеней"],
            ["C", "Случайной оценки"],
            ["D", "Выделения полного квадрата"]
          ],
          correct: "B"
        }
      ]
    },

    biology: {
      title: "Биология",
      tours: "6/7",
      avg: "71%",
      rank: "#15",
      weak: 3,
      strong: ["Homeostasis", "Inheritance", "Photosynthesis"],
      study: ["Genetic technology", "Respiration", "Selection"],
      questions: [
        {
          q: "Что лучше всего показывает понимание homeostasis?",
          options: [
            ["A", "Запомнить только название органа"],
            ["B", "Объяснить механизм отрицательной обратной связи"],
            ["C", "Перечислить несвязанные термины"],
            ["D", "Игнорировать изменение внутренней среды"]
          ],
          correct: "B"
        },
        {
          q: "Почему ферменты чувствительны к высокой температуре?",
          options: [
            ["A", "Меняется форма активного центра"],
            ["B", "Ферменты становятся элементами"],
            ["C", "Субстрат исчезает всегда"],
            ["D", "Температура не влияет на белки"]
          ],
          correct: "A"
        },
        {
          q: "В наследовании phenotype зависит от:",
          options: [
            ["A", "Только цвета клетки"],
            ["B", "Генотипа и влияния среды"],
            ["C", "Только размера организма"],
            ["D", "Случайного выбора хромосомы"]
          ],
          correct: "B"
        },
        {
          q: "Главная роль chlorophyll в photosynthesis:",
          options: [
            ["A", "Поглощать световую энергию"],
            ["B", "Разрушать глюкозу"],
            ["C", "Выделять азот"],
            ["D", "Останавливать диффузию"]
          ],
          correct: "A"
        }
      ]
    },

    chemistry: {
      title: "Химия",
      tours: "5/7",
      avg: "69%",
      rank: "#17",
      weak: 4,
      strong: ["Equilibria", "Kinetics", "Organic reactions"],
      study: ["Electrochemistry", "Born-Haber cycles", "Entropy"],
      questions: [
        {
          q: "Что произойдёт с равновесием, если увеличить концентрацию реагента?",
          options: [
            ["A", "Система сместится, чтобы уменьшить это изменение"],
            ["B", "Равновесие всегда исчезает"],
            ["C", "Скорость всех реакций станет нулевой"],
            ["D", "Концентрация продуктов не может измениться"]
          ],
          correct: "A"
        },
        {
          q: "Почему катализатор увеличивает скорость реакции?",
          options: [
            ["A", "Повышает температуру кипения"],
            ["B", "Даёт альтернативный путь с меньшей энергией активации"],
            ["C", "Меняет массу атомов"],
            ["D", "Полностью расходуется в реакции"]
          ],
          correct: "B"
        },
        {
          q: "В electrochemistry окисление означает:",
          options: [
            ["A", "Получение электронов"],
            ["B", "Потерю электронов"],
            ["C", "Исчезновение ионов"],
            ["D", "Образование только воды"]
          ],
          correct: "B"
        },
        {
          q: "Для различения органических соединений важнее всего:",
          options: [
            ["A", "Функциональная группа и условия реакции"],
            ["B", "Только цвет пробирки"],
            ["C", "Длина названия вещества"],
            ["D", "Порядок букв в формуле"]
          ],
          correct: "A"
        }
      ]
    },

    informatics: {
      title: "Информатика",
      tours: "6/7",
      avg: "76%",
      rank: "#10",
      weak: 3,
      strong: ["Algorithms", "Networks", "Data representation"],
      study: ["Cybersecurity", "Databases", "Boolean logic"],
      questions: [
        {
          q: "Что лучше всего показывает понимание алгоритма?",
          options: [
            ["A", "Запомнить название команды"],
            ["B", "Проследить шаги и результат выполнения"],
            ["C", "Выбрать самый длинный код"],
            ["D", "Игнорировать входные данные"]
          ],
          correct: "B"
        },
        {
          q: "Почему validation важна при вводе данных?",
          options: [
            ["A", "Она проверяет, подходят ли данные заданным правилам"],
            ["B", "Она всегда исправляет смысловую ошибку"],
            ["C", "Она удаляет все данные"],
            ["D", "Она заменяет базу данных"]
          ],
          correct: "A"
        },
        {
          q: "В сети protocol нужен для:",
          options: [
            ["A", "Украшения интерфейса"],
            ["B", "Единых правил передачи данных"],
            ["C", "Увеличения размера файла"],
            ["D", "Отключения адресов"]
          ],
          correct: "B"
        },
        {
          q: "Boolean expression используется для:",
          options: [
            ["A", "Работы с условиями true/false"],
            ["B", "Хранения только изображений"],
            ["C", "Удаления всех переменных"],
            ["D", "Измерения скорости интернета"]
          ],
          correct: "A"
        }
      ]
    }
  };

  const esc = (v) => String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  function getLang() {
    try {
      const raw = localStorage.getItem("iclub_profile_v1") || localStorage.getItem("profile") || "";
      const p = raw ? JSON.parse(raw) : null;
      const value = String(p?.language || p?.language_code || document.documentElement.lang || "ru").toLowerCase();
      if (value.startsWith("uz")) return "uz";
      if (value.startsWith("en")) return "en";
      return "ru";
    } catch {
      return "ru";
    }
  }

  function tr(ru, uz, en) {
    const l = getLang();
    if (l === "uz") return uz || ru;
    if (l === "en") return en || ru;
    return ru;
  }

  function getPhase() {
    const raw = localStorage.getItem(LS.phase) || "auto";
    return PHASES.some(([k]) => k === raw) ? raw : "auto";
  }

  function setPhase(phase) {
    const next = PHASES.some(([k]) => k === phase) ? phase : "auto";
    localStorage.setItem(LS.phase, next);
    syncPhaseSelect();
    return next;
  }

  function getSubjectKeys() {
    const list = document.getElementById("home-competitive-list");
    const keys = list
      ? Array.from(list.querySelectorAll(".home-competitive-card"))
          .map((card) => String(card.dataset.subject || "").trim())
          .filter(Boolean)
      : [];

    const unique = Array.from(new Set(keys)).filter((k) => DATA[k]);
    return unique.length ? unique.slice(0, 2) : ["economics", "mathematics"];
  }

  function getSubject() {
    const raw = localStorage.getItem(LS.subject);
    return raw && DATA[raw] ? raw : getSubjectKeys()[0] || "economics";
  }

  function setSubject(key) {
    const next = DATA[key] ? key : "economics";
    localStorage.setItem(LS.subject, next);
    return next;
  }

  function quizKey(key) {
    return LS.quizPrefix + (key || getSubject());
  }

  function freshQuizState() {
    return {
      q: 1,
      selected: "",
      answers: {},
      questionStartedAt: Date.now(),
      attemptStartedAt: Date.now(),
      finished: false,
      finishReason: ""
    };
  }

  function resetQuiz(key) {
    const state = freshQuizState();
    localStorage.setItem(quizKey(key), JSON.stringify(state));
    return state;
  }

  function getQuiz(key) {
    try {
      const raw = localStorage.getItem(quizKey(key));
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") return resetQuiz(key);

      return {
        q: Math.max(1, Math.min(FINAL_QUESTIONS_COUNT, Number(parsed.q || 1))),
        selected: ["A", "B", "C", "D"].includes(parsed.selected) ? parsed.selected : "",
        answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
        questionStartedAt: Number(parsed.questionStartedAt || Date.now()),
        attemptStartedAt: Number(parsed.attemptStartedAt || Date.now()),
        finished: !!parsed.finished,
        finishReason: String(parsed.finishReason || "")
      };
    } catch {
      return resetQuiz(key);
    }
  }

  function saveQuiz(key, state) {
    localStorage.setItem(quizKey(key), JSON.stringify(state));
    return state;
  }

  function questionLeft(state) {
    const elapsed = Math.floor((Date.now() - Number(state.questionStartedAt || Date.now())) / 1000);
    return Math.max(0, QUESTION_SECONDS - elapsed);
  }

  function fmt(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function currentQuestion(key, state) {
    const d = DATA[key] || DATA.economics;
    return d.questions[(state.q || 1) - 1] || d.questions[0];
  }

  function resultFor(key) {
    const d = DATA[key] || DATA.economics;
    const state = getQuiz(key);
    let score = 0;

    d.questions.slice(0, FINAL_QUESTIONS_COUNT).forEach((q, i) => {
      const answer = state.answers[String(i + 1)] || "";
      if (answer === q.correct) score += 1;
    });

    const elapsed = Math.max(0, Math.floor((Date.now() - Number(state.attemptStartedAt || Date.now())) / 1000));

    return {
      score,
      total: FINAL_QUESTIONS_COUNT,
      percent: Math.round((score / FINAL_QUESTIONS_COUNT) * 100),
      time: fmt(elapsed),
      regionRank: score >= 3 ? 8 : 18,
      overallRank: score >= 3 ? 31 : 76
    };
  }

  let questionTimer = null;

  function stopQuestionTimer() {
    if (questionTimer) clearInterval(questionTimer);
    questionTimer = null;
  }

  function startQuestionTimer(key) {
    stopQuestionTimer();

    const tick = () => {
      const state = getQuiz(key);
      const left = questionLeft(state);
      const el = document.getElementById("psp-final-timer");

      if (el) {
        el.textContent = fmt(left);
        el.classList.toggle("is-danger", left <= 10);
      }

      if (left <= 0 && !state.finished) {
        stopQuestionTimer();
        timeoutQuestion(key);
      }
    };

    tick();
    questionTimer = setInterval(tick, 300);
  }

  function pickAnswer(key, option) {
    const state = getQuiz(key);
    state.selected = ["A", "B", "C", "D"].includes(option) ? option : "";
    saveQuiz(key, state);
    renderFinalQuestion(key);
  }

  function answerQuestion(key) {
    const state = getQuiz(key);
    if (!state.selected) return;

    state.answers[String(state.q)] = state.selected;
    state.timeSpent = state.timeSpent && typeof state.timeSpent === "object" ? state.timeSpent : {};
    state.timeSpent[String(state.q)] = currentPracticeElapsed(state);
    state.selected = "";

    if (state.q >= FINAL_QUESTIONS_COUNT) {
      state.finished = true;
      state.finishReason = "submitted";
      saveQuiz(key, state);
      return finishFinal(key, "submitted");
    }

    state.q += 1;
    state.questionStartedAt = Date.now();
    saveQuiz(key, state);
    renderFinalQuestion(key);
  }

  function timeoutQuestion(key) {
    const state = getQuiz(key);

    state.answers[String(state.q)] = state.selected || "";
    state.selected = "";

    if (state.q >= FINAL_QUESTIONS_COUNT) {
      state.finished = true;
      state.finishReason = "time_expired";
      saveQuiz(key, state);
      return finishFinal(key, "time_expired");
    }

    state.q += 1;
    state.questionStartedAt = Date.now();
    saveQuiz(key, state);
    renderFinalQuestion(key);
  }

  function finishEarly(key) {
    const state = getQuiz(key);
    state.answers[String(state.q)] = state.selected || state.answers[String(state.q)] || "";
    state.selected = "";
    state.finished = true;
    state.finishReason = "early_finish";
    saveQuiz(key, state);
    finishFinal(key, "early_finish");
  }

  function finishFinal(key, reason) {
    stopQuestionTimer();
    closeFinalScreen();

    setSubject(key);
    setPhase("grand_submitted");
    renderHomeRouter();
    showSubmitted(key, reason);
  }

  function closeFinalScreen() {
    stopQuestionTimer();
    document.getElementById("psp-final-screen")?.remove();
    document.documentElement.classList.remove("psp-final-open");
    document.body.classList.remove("psp-final-open");
  }

  function openFinalScreen(html) {
    closeSheet();
    closeFinalScreen();

    const screen = document.createElement("div");
    screen.id = "psp-final-screen";
    screen.innerHTML = html;

    document.body.appendChild(screen);
    document.documentElement.classList.add("psp-final-open");
    document.body.classList.add("psp-final-open");
  }

  function isFullscreenSheet(html) {
    const text = String(html || "").toLowerCase();

    return (
      text.includes("grand olympiad") &&
      (
        text.includes("формат финала") ||
        text.includes("final formati") ||
        text.includes("final format")
      )
    );
  }

  function openSheet(html) {
    closeSheet();

    const root = document.createElement("div");
    root.id = "psp-sheet";
    root.className = "psp-sheet-fullscreen";
    root.innerHTML = `<div class="psp-backdrop">${html}</div>`;

    document.body.appendChild(root);
    document.documentElement.classList.add("psp-sheet-open");
    document.body.classList.add("psp-sheet-open");
  }

  function closeSheet() {
    document.getElementById("psp-sheet")?.remove();
    document.documentElement.classList.remove("psp-sheet-open");
    document.documentElement.classList.remove("psp-sheet-fullscreen-open");
    document.body.classList.remove("psp-sheet-open");
  }

  function sheet(kicker, title, sub, body, backAction = "sheet-close", backAttrs = "") {
    return `
      <div class="psp-sheet-card">
        <div class="psp-sheet-top">
          <button type="button" class="psp-back" data-psp-action="${esc(backAction)}" ${backAttrs}>←</button>
          <div>
            <div class="psp-kicker">${esc(kicker)}</div>
            <div class="psp-sheet-title">${esc(title)}</div>
            ${sub ? `<div class="psp-muted">${esc(sub)}</div>` : ""}
          </div>
        </div>
        ${body}
      </div>
    `;
  }

  function getCompetitiveBlock() {
    const list = document.getElementById("home-competitive-list");
    return list ? (list.closest(".home-block") || list.parentElement) : null;
  }

  function isHomeActive() {
    return !!document.getElementById("view-home")?.classList.contains("is-active");
  }

  function hasActiveRegularTour() {
    const block = getCompetitiveBlock();
    const text = String(block?.textContent || "").toLowerCase();

    return (
      text.includes("тур активен") ||
      text.includes("tour active") ||
      text.includes("tur aktiv") ||
      text.includes("участвуйте в текущем туре")
    );
  }

  function effectivePhase() {
    const phase = getPhase();
    if (phase !== "auto") return phase;
    return hasActiveRegularTour() ? "regular_active" : "postseason";
  }

  function heroHTML(key) {
    const old = document.querySelector(`.home-competitive-card[data-subject="${CSS.escape(key)}"] .home-competitive-hero`);
    return old ? old.outerHTML : `<div class="home-competitive-hero"><div class="home-competitive-hero-img"></div></div>`;
  }

  function grandStatsHTML() {
    return `
      <div class="psp-stat-row">
        <div><b>20</b><span>${tr("вопросов", "savol", "questions")}</span></div>
        <div><b>1</b><span>${tr("попытка", "urinish", "attempt")}</span></div>
        <div><b>${tr("балл", "ball", "score")}</b><span>+ ${tr("время", "vaqt", "time")}</span></div>
      </div>
    `;
  }

  function grandCardHTML() {
    const phase = effectivePhase();
    const key = getSubject();
    const d = DATA[key] || DATA.economics;
    const r = resultFor(key);
    const stats = grandStatsHTML();

    if (phase === "grand_open") {
      return `
        <section class="psp-grand-card">
          <div class="psp-kicker">${tr("ФИНАЛ ОТКРЫТ", "FINAL OCHIQ", "FINAL OPEN")}</div>
          <div class="psp-grand-title">Grand Olympiad</div>
          <div class="psp-muted">${tr("Выберите предмет и начните финальную попытку.", "Fanni tanlang va final urinishini boshlang.", "Choose a subject and start the final attempt.")}</div>
          ${stats}
          <div class="psp-muted">${tr("Результат, рейтинг и сертификат откроются после закрытия финала.", "Natija, reyting va sertifikat final yopilgandan keyin ochiladi.", "Result, ranking and certificate open after the final closes.")}</div>
          <div class="psp-actions">
            <button type="button" class="btn primary" data-psp-action="grand-select">${tr("Начать финал", "Finalni boshlash", "Start final")}</button>
            <button type="button" class="btn" data-psp-action="plan">${tr("Правила", "Qoidalar", "Rules")}</button>
          </div>
        </section>
      `;
    }

    if (phase === "grand_in_progress") {
      return `
        <section class="psp-grand-card">
          <div class="psp-kicker">${tr("ФИНАЛ НАЧАТ", "FINAL BOSHLANDI", "FINAL STARTED")}</div>
          <div class="psp-grand-title">${esc(d.title)} · Grand Final</div>
          <div class="psp-muted">${tr("Финальная попытка в процессе.", "Final urinishi davom etmoqda.", "Final attempt is in progress.")}</div>
          ${stats}
          <button type="button" class="btn primary psp-full" data-psp-action="grand-continue" data-subject="${esc(key)}">${tr("Вернуться к попытке", "Urinishga qaytish", "Return to attempt")}</button>
        </section>
      `;
    }

    if (phase === "grand_submitted") {
      return `
        <section class="psp-grand-card">
          <div class="psp-kicker">${tr("ОТВЕТЫ ПРИНЯТЫ", "JAVOBLAR QABUL QILINDI", "ANSWERS RECEIVED")}</div>
          <div class="psp-grand-title">${esc(d.title)} · Grand Final</div>
          <div class="psp-muted">${tr("Ответы сохранены. Результат откроется после расчёта рейтинга.", "Javoblar saqlandi. Natija reyting hisoblangandan keyin ochiladi.", "Answers saved. Result opens after ranking calculation.")}</div>
          ${stats}
          <button type="button" class="btn primary psp-full" data-psp-action="grand-status" data-subject="${esc(key)}">${tr("Статус финала", "Final holati", "Final status")}</button>
        </section>
      `;
    }

    if (phase === "grand_finalizing") {
      return `
        <section class="psp-grand-card">
          <div class="psp-kicker">${tr("РАСЧЁТ ИТОГОВ", "YAKUNLAR HISOBLANMOQDA", "CALCULATING RESULTS")}</div>
          <div class="psp-grand-title">Grand Olympiad</div>
          <div class="psp-muted">${tr("Рейтинг и сертификаты рассчитываются.", "Reyting va sertifikatlar hisoblanmoqda.", "Ranking and certificates are being calculated.")}</div>
          ${stats}
          <button type="button" class="btn primary psp-full" data-psp-action="finalizing">${tr("Как идёт расчёт", "Hisoblash jarayoni", "Calculation status")}</button>
        </section>
      `;
    }

    if (phase === "grand_ready") {
      return `
        <section class="psp-grand-card">
          <div class="psp-kicker">${tr("РЕЗУЛЬТАТ ГОТОВ", "NATIJA TAYYOR", "RESULT READY")}</div>
          <div class="psp-grand-title">${esc(d.title)} · ${r.score}/${r.total}</div>
          <div class="psp-muted">#${r.regionRank} ${tr("в регионе", "hududda", "region")} · #${r.overallRank} ${tr("общий рейтинг", "umumiy reyting", "overall")}</div>
          ${stats}
          <div class="psp-actions">
            <button type="button" class="btn primary" data-psp-action="grand-result" data-subject="${esc(key)}">${tr("Открыть результат", "Natijani ochish", "Open result")}</button>
            <button type="button" class="btn" data-psp-action="grand-certificate" data-subject="${esc(key)}">${tr("Сертификат", "Sertifikat", "Certificate")}</button>
          </div>
        </section>
      `;
    }

    return `
      <section class="psp-grand-card">
        <div class="psp-kicker">${tr("ФИНАЛ СЕЗОНА", "MAVSUM FINALI", "SEASON FINAL")}</div>
        <div class="psp-grand-title">Grand Olympiad</div>
        <div class="psp-muted">${tr("Финальный этап после 7 туров.", "7 turdan keyingi final bosqich.", "Final stage after 7 tours.")}</div>
        ${stats}
        <div class="psp-muted">${tr("Пока финал закрыт. Готовьтесь через итоги по предметам и практику.", "Final hozir yopiq. Fan yakunlari va amaliyot orqali tayyorlaning.", "Final is closed. Prepare through subject summaries and practice.")}</div>
        <button type="button" class="btn primary psp-full" data-psp-action="plan">${tr("Подробнее", "Batafsil", "Details")}</button>
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

          <div class="psp-stat-row">
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

  function renderHomeRouter() {
    if (!isHomeActive()) return;

    const block = getCompetitiveBlock();
    if (!block || !block.parentNode) return;

    const old = document.getElementById("psp-home");

    if (effectivePhase() === "regular_active") {
      old?.remove();
      block.style.display = "";
      return;
    }

    block.style.display = "none";

    let root = old;
    if (!root) {
      root = document.createElement("div");
      root.id = "psp-home";
      block.parentNode.insertBefore(root, block);
    }

    root.innerHTML = `
      ${grandCardHTML()}
      <section class="psp-section">
        <h2>${tr("Итоги по предметам", "Fanlar bo‘yicha yakunlar", "Subject summaries")}</h2>
        <p>${tr("Откройте итог и начните изучение нужных тем.", "Yakunlarni oching va kerakli mavzularni o‘rganishni boshlang.", "Open the summary and start studying needed topics.")}</p>
        <div class="psp-subject-list">
          ${getSubjectKeys().map(subjectCardHTML).join("")}
        </div>
      </section>
    `;
  }

  function showPlan() {
    openSheet(sheet(
      tr("ФИНАЛ СЕЗОНА", "MAVSUM FINALI", "SEASON FINAL"),
      "Grand Olympiad",
      tr("Финальный этап после 7 туров.", "7 turdan keyingi final bosqich.", "Final stage after 7 tours."),
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Формат финала", "Final formati", "Final format")}</div>
          ${grandStatsHTML()}
          <div class="psp-muted">${tr("В preview для проверки используется 4 вопроса и таймер 25 секунд на каждый вопрос.", "Preview’da tekshiruv uchun 4 savol va har savolga 25 soniya ishlatiladi.", "Preview uses 4 questions and a 25-second timer per question.")}</div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что будет оцениваться", "Nima baholanadi", "What is assessed")}</div>
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Точность ответов.", "Javoblar aniqligi.", "Answer accuracy.")}</span></div>
            <div><b>2</b><span>${tr("Умение применять темы из разных туров.", "Turli turlardagi mavzularni qo‘llash.", "Using topics across tours.")}</span></div>
            <div><b>3</b><span>${tr("Время влияет только при равных результатах.", "Vaqt faqat teng natijada ta’sir qiladi.", "Time matters only for tied scores.")}</span></div>
          </div>
        </div>
      `
    ));
  }

  function showGrandSelect() {
    const cards = getSubjectKeys().map((key) => {
      const d = DATA[key] || DATA.economics;

      return `
        <div class="psp-choice">
          <div>
            <div class="psp-choice-title">${esc(d.title)}</div>
            <div class="psp-muted">20 ${tr("вопросов", "savol", "questions")} · Mixed · 1 ${tr("попытка", "urinish", "attempt")}</div>
          </div>
          <button type="button" class="btn primary" data-psp-action="grand-start" data-subject="${esc(key)}">${tr("Начать", "Boshlash", "Start")}</button>
        </div>
      `;
    }).join("");

    openSheet(sheet(
      "GRAND OLYMPIAD",
      tr("Выберите предмет финала", "Final fanini tanlang", "Choose final subject"),
      tr("После выбора сразу откроется финальная попытка.", "Tanlagandan keyin final urinish darhol ochiladi.", "After choosing, the final attempt opens immediately."),
      `<div class="psp-choice-list">${cards}</div>`
    ));
  }

  function renderFinalQuestion(key) {
    const d = DATA[key] || DATA.economics;
    const state = getQuiz(key);
    const q = currentQuestion(key, state);
    const left = questionLeft(state);

    openFinalScreen(`
      <div class="psp-final-shell psp-main-quiz-shell">
        <div class="psp-main-quiz-top">
          <div class="psp-main-quiz-progress">${state.q}/${FINAL_QUESTIONS_COUNT}</div>
          <div id="psp-final-timer" class="psp-timer ${left <= 10 ? "is-danger" : ""}">${fmt(left)}</div>
        </div>

        <div class="psp-main-quiz-sub">${esc(d.title)} · Grand Final</div>

        <div class="psp-question-card">
          <div class="psp-panel-title">${tr("Финальный вопрос", "Final savoli", "Final question")}</div>
          <div class="psp-question-text">${esc(q.q)}</div>

          <div class="psp-option-list">
            ${q.options.map(([letter, text]) => `
              <button type="button"
                class="${state.selected === letter ? "is-picked" : ""}"
                data-psp-action="pick"
                data-subject="${esc(key)}"
                data-option="${esc(letter)}">
                <span>${esc(letter)}</span>
                <b>${esc(text)}</b>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="psp-main-quiz-actions psp-main-quiz-actions-two">
          <button type="button"
            class="btn primary"
            data-psp-action="answer"
            data-subject="${esc(key)}"
            ${state.selected ? "" : "disabled"}>
            ${state.q >= FINAL_QUESTIONS_COUNT ? tr("Завершить финал", "Finalni yakunlash", "Finish final") : tr("Ответить", "Javob berish", "Answer")}
          </button>

          <button type="button"
            class="btn"
            data-psp-action="finish-early"
            data-subject="${esc(key)}">
            ${tr("Завершить досрочно", "Muddatidan oldin yakunlash", "Finish early")}
          </button>
        </div>
      </div>
    `);

    startQuestionTimer(key);
  }

  function showSubmitted(key, reason) {
    const d = DATA[key] || DATA.economics;

    const sub = reason === "time_expired"
      ? tr("Время последнего вопроса истекло. Ответы сохранены.", "Oxirgi savol vaqti tugadi. Javoblar saqlandi.", "Last question time expired. Answers saved.")
      : tr("Финальная попытка завершена. Ответы сохранены.", "Final urinishi yakunlandi. Javoblar saqlandi.", "Final attempt finished. Answers saved.");

    openSheet(sheet(
      tr("ОТВЕТЫ ПРИНЯТЫ", "JAVOBLAR QABUL QILINDI", "ANSWERS RECEIVED"),
      `${d.title} · Grand Final`,
      sub,
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что дальше", "Keyingi qadam", "Next")}</div>
          <div class="psp-muted">${tr("Результат, рейтинг и сертификат откроются после расчёта финала.", "Natija, reyting va sertifikat final hisoblangandan keyin ochiladi.", "Result, ranking and certificate open after final calculation.")}</div>
        </div>

        <button type="button" class="btn primary psp-full" data-psp-action="sheet-close">${tr("На главную", "Bosh sahifaga", "Home")}</button>
      `
    ));
  }

  function showFinalizing() {
    openSheet(sheet(
      tr("РАСЧЁТ ИТОГОВ", "YAKUNLAR HISOBLANMOQDA", "CALCULATING RESULTS"),
      tr("Результаты готовятся", "Natijalar tayyorlanmoqda", "Results are being prepared"),
      tr("Рейтинг и сертификаты скоро откроются.", "Reyting va sertifikatlar tez orada ochiladi.", "Ranking and certificates will open soon."),
      `
        <div class="psp-panel">
          <div class="psp-steps">
            <div><b>1</b><span>${tr("Завершаются открытые попытки.", "Ochiq urinishlar yakunlanadi.", "Open attempts are closed.")}</span></div>
            <div><b>2</b><span>${tr("Считается рейтинг: сначала балл, затем время.", "Reyting hisoblanadi: avval ball, keyin vaqt.", "Ranking: score first, then time.")}</span></div>
            <div><b>3</b><span>${tr("Готовятся сертификаты финала.", "Final sertifikatlari tayyorlanadi.", "Final certificates are prepared.")}</span></div>
          </div>
        </div>
      `
    ));
  }

  function showResult(key) {
    const d = DATA[key] || DATA.economics;
    const r = resultFor(key);

    openSheet(sheet(
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
        </div>

        <button type="button" class="btn primary psp-full" data-psp-action="grand-certificate" data-subject="${esc(key)}">${tr("Сертификат", "Sertifikat", "Certificate")}</button>
      `
    ));
  }




  function getCertificateById(id) {
    return getPreviewCertificates().find((cert) => cert.id === id) || getPreviewCertificates()[0];
  }

  function getGrandCertificateForSubject(key) {
    const subjectKey = key || getSubject();
    const existing = getPreviewCertificates().find((cert) => cert.type === "grand" && cert.subjectKey === subjectKey);
    if (existing) return existing;

    const d = DATA[subjectKey] || DATA.economics;
    const r = resultFor(subjectKey);

    return {
      id: `preview-${subjectKey}-grand`,
      bucket: "current",
      season: "season_1",
      seasonLabel: "Season 1 · 2026",
      subjectKey,
      subjectTitle: d.title,
      type: "grand",
      filter: "grand",
      tourNo: 8,
      title: `${d.title} · Grand Final`,
      certificateType: "Grand Final Certificate",
      score: `${r.score}/${r.total}`,
      percent: `${r.percent}%`,
      rank: `#${r.regionRank}`,
      rankLabel: tr("регион", "hudud", "region"),
      date: "03.06.2026",
      number: `ICL-2026-S1-${String(subjectKey).toUpperCase()}-GF-PREVIEW`,
      status: "issued"
    };
  }

  function filterCertificates(bucket = "current", season = "season_1", filter = "all") {
    return getPreviewCertificates().filter((cert) => {
      if (cert.bucket !== bucket) return false;
      if (bucket === "past" && season && cert.season !== season) return false;
      if (filter === "all") return true;
      return cert.filter === filter;
    });
  }

  function renderCertificateFilterButton(label, filter, currentFilter) {
    return `
      <button type="button"
        class="${currentFilter === filter ? "is-on" : ""}"
        data-psp-action="cert-filter"
        data-filter="${esc(filter)}">
        ${esc(label)}
      </button>
    `;
  }




  function certificateVisualHTML(cert) {
    return `
      <div class="psp-official-cert">
        <div class="psp-official-cert-head">
          <div class="psp-official-logo">iClub</div>
          <div>
            <div class="psp-official-type">${esc(cert.certificateType)}</div>
            <div class="psp-muted">${esc(cert.seasonLabel)}</div>
          </div>
        </div>

        <div class="psp-official-body">
          <div class="psp-official-label">${tr("Выдан участнику", "Ishtirokchiga berildi", "Awarded to")}</div>
          <div class="psp-official-name">Preview Student</div>

          <div class="psp-official-subject">${esc(cert.title)}</div>

          <div class="psp-report-grid">
            <div><b>${esc(cert.score)}</b><span>${tr("Ответы", "Javoblar", "Answers")}</span></div>
            <div><b>${esc(cert.percent)}</b><span>${tr("Результат", "Natija", "Result")}</span></div>
            <div><b>${esc(cert.rank)}</b><span>${esc(cert.rankLabel)}</span></div>
            <div><b>${esc(cert.date)}</b><span>${tr("Дата", "Sana", "Date")}</span></div>
          </div>

          <div class="psp-official-note">
            ${cert.type === "grand"
              ? tr("Сертификат подтверждает результат финального этапа сезона.", "Sertifikat mavsum final bosqichi natijasini tasdiqlaydi.", "This certificate confirms the season final result.")
              : tr("Сертификат подтверждает результат соревновательного тура.", "Sertifikat musobaqa turi natijasini tasdiqlaydi.", "This certificate confirms the competitive tour result.")}
          </div>
        </div>

        <div class="psp-official-footer">
          <span>${tr("Номер сертификата", "Sertifikat raqami", "Certificate number")}</span>
          <b>${esc(cert.number)}</b>
        </div>
      </div>
    `;
  }



























  function getSeasonCompletedToursCount(key) {
    const d = DATA[key] || DATA.economics;
    const first = String(d.tours || "0/7").split("/")[0];
    const n = Number(first);
    return Number.isFinite(n) ? Math.max(0, Math.min(7, n)) : 0;
  }

  function getSeasonScopeTabs(key, selectedScope = "all") {
    const completed = getSeasonCompletedToursCount(key);

    const tabs = [
      {
        scope: "all",
        label: tr("Все 7", "7 tur", "All 7"),
        status: "all"
      },
      ...[1,2,3,4,5,6,7].map((no) => ({
        scope: String(no),
        label: `${tr("Тур", "Tur", "Tour")} ${no}`,
        status: no <= completed ? "done" : "missed"
      }))
    ];

    return `
      <div class="psp-season-scope-row" aria-label="Season review scope">
        ${tabs.map((tab) => `
          <button type="button"
            class="${selectedScope === tab.scope ? "is-on" : ""} is-${tab.status}"
            data-psp-action="season-review-scope"
            data-subject="${esc(key)}"
            data-scope="${esc(tab.scope)}">
            ${esc(tab.label)}
          </button>
        `).join("")}
      </div>
    `;
  }

  function getTopicEvidence(topic, index, tone = "mastered") {
    if (tone === "study") {
      const errors = [7, 5, 4, 3, 2][index % 5];
      const questions = [18, 14, 12, 10, 8][index % 5];

      return {
        topic,
        meta: tr(`${errors} ошибок`, `${errors} ta xato`, `${errors} mistakes`),
        detail: `${errors}/${questions}`,
        value: errors
      };
    }

    const percent = [86, 82, 79, 88, 84][index % 5];
    const questions = [24, 19, 21, 16, 14][index % 5];

    return {
      topic,
      meta: `${percent}% / ${questions}q`,
      detail: `${percent}%`,
      value: percent
    };
  }

  function getSeasonScopeReviewData(key, scope = "all") {
    const d = DATA[key] || DATA.economics;
    const completed = getSeasonCompletedToursCount(key);
    const isAll = scope === "all";
    const tourNo = Number(scope || 0);
    const participated = isAll || (tourNo > 0 && tourNo <= completed);

    if (isAll) {
      return {
        scope,
        participated: true,
        title: tr("Итог сезона", "Mavsum yakuni", "Season review"),
        subtitle: tr("Общий итог сезона по предмету.", "Fan bo‘yicha mavsum yakuni.", "Overall subject season review."),
        stats: [
          [d.tours, tr("Туры", "Turlar", "Tours")],
          [d.avg, tr("Средний", "O‘rtacha", "Average")],
          [d.rank, tr("Регион", "Hudud", "Region")],
          ["18", tr("Практики", "Amaliyotlar", "Practices")]
        ],
        mastered: (d.strong || []).slice(0, 3).map((topic, index) => getTopicEvidence(topic, index, "mastered")),
        study: (d.study || []).slice(0, 3).map((topic, index) => getTopicEvidence(topic, index, "study")),
        reportText: tr(
          "Скачайте расширенный итог по активности, динамике, темам и обезличенному сравнению.",
          "Faollik, dinamika, mavzular va anonim taqqoslash bo‘yicha kengaytirilgan yakunni yuklab oling.",
          "Download a detailed review of activity, progress, topics and anonymized comparison."
        ),
        studyCta: tr("Начать изучение", "O‘rganishni boshlash", "Start studying"),
        studyModeTour: "recommended"
      };
    }

    const topics = getPracticeTopics(key, String(tourNo));
    const tourMastered = topics.slice(0, participated ? 2 : 0);
    const tourStudy = topics.slice(participated ? 2 : 0, participated ? 5 : 3);

    if (!participated) {
      return {
        scope,
        participated: false,
        title: `${tr("Тур", "Tur", "Tour")} ${tourNo}`,
        subtitle: tr(
          "Тур не пройден. Темы доступны для изучения через практику.",
          "Tur topshirilmagan. Mavzularni amaliyot orqali o‘rganish mumkin.",
          "Tour not completed. Topics are available for study through practice."
        ),
        stats: [],
        mastered: [],
        study: tourStudy.map((topic, index) => getTopicEvidence(topic, index, "study")),
        reportText: tr(
          `Отчёт по Тур ${tourNo}: статус участия, темы тура и план изучения без личного результата.`,
          `${tourNo}-tur hisoboti: qatnashish holati, tur mavzulari va shaxsiy natijasiz o‘rganish rejasi.`,
          `Tour ${tourNo} report: participation status, tour topics and study plan without personal result.`
        ),
        studyCta: tr("Начать изучение", "O‘rganishni boshlash", "Start studying"),
        studyModeTour: String(tourNo)
      };
    }

    const result = [84, 76, 85, 72, 78, 69, 81][(tourNo - 1) % 7];
    const errors = Math.max(1, Math.round((100 - result) / 7));
    const time = ["12:45", "14:10", "11:58", "15:20", "13:35", "16:05", "12:30"][(tourNo - 1) % 7];

    return {
      scope,
      participated: true,
      title: `${tr("Тур", "Tur", "Tour")} ${tourNo}`,
      subtitle: tr(
        `Итог выбранного тура: результат, темы и следующий шаг.`,
        `Tanlangan tur yakuni: natija, mavzular va keyingi qadam.`,
        `Selected tour review: result, topics and next step.`
      ),
      stats: [
        [`${result}%`, tr("Результат", "Natija", "Result")],
        [`#${12 + tourNo}`, tr("Регион", "Hudud", "Region")],
        [String(errors), tr("Ошибки", "Xatolar", "Mistakes")],
        [time, tr("Время", "Vaqt", "Time")]
      ],
      mastered: tourMastered.map((topic, index) => getTopicEvidence(topic, index, "mastered")),
      study: tourStudy.map((topic, index) => getTopicEvidence(topic, index, "study")),
      reportText: tr(
        `Скачайте подробный итог по Тур ${tourNo}: результат, время, темы и сравнение.`,
        `${tourNo}-tur bo‘yicha batafsil yakunni yuklab oling: natija, vaqt, mavzular va taqqoslash.`,
        `Download a detailed Tour ${tourNo} review: result, time, topics and comparison.`
      ),
      studyCta: tr(`Начать изучение Тур ${tourNo}`, `${tourNo}-turni o‘rganish`, `Study Tour ${tourNo}`),
      studyModeTour: String(tourNo)
    };
  }

  function renderSeasonTopicPanel(title, subtitle, items, tone, emptyText, key, scope) {
    const isStudy = tone === "study";

    return `
      <div class="psp-panel ${isStudy ? "psp-study-panel" : "psp-mastered-panel"}">
        <div class="psp-panel-title">${esc(title)}</div>
        <div class="psp-muted psp-topic-panel-note">${esc(subtitle)}</div>

        ${items.length ? `
          <div class="psp-topic-evidence-list">
            ${items.map((item) => `
              <span class="psp-topic-evidence is-${tone}">
                <b>${esc(item.topic)}</b>
                <small>${esc(item.meta)}</small>
              </span>
            `).join("")}
          </div>
        ` : `
          <div class="psp-empty-topic-note">${esc(emptyText)}</div>
        `}

        ${isStudy && items.length ? `
          <button type="button"
            class="btn primary psp-study-cta"
            data-psp-action="season-review-study"
            data-subject="${esc(key)}"
            data-scope="${esc(scope)}">
            ${tr("Начать изучение", "O‘rganishni boshlash", "Start studying")}
          </button>
        ` : ""}
      </div>
    `;
  }

  function showEnhancedSeasonReview(key, scope = "all") {
    const d = DATA[key] || DATA.economics;
    const review = getSeasonScopeReviewData(key, scope);

    openSheet(sheet(
      scope === "all" ? tr("ИТОГ СЕЗОНА", "MAVSUM YAKUNI", "SEASON REVIEW") : tr("ИТОГ ТУРА", "TUR YAKUNI", "TOUR REVIEW"),
      `${d.title}${scope === "all" ? "" : ` · ${review.title}`}`,
      review.subtitle,
      `
        ${getSeasonScopeTabs(key, scope)}

        ${review.stats.length ? `
          <div class="psp-report-grid">
            ${review.stats.map(([value, label]) => `
              <div><b>${esc(value)}</b><span>${esc(label)}</span></div>
            `).join("")}
          </div>
        ` : `
          <div class="psp-panel psp-tour-not-done-panel">
            <div class="psp-panel-title">${tr("Тур не пройден", "Tur topshirilmagan", "Tour not completed")}</div>
            <div class="psp-muted">${tr("Личного результата нет, но темы тура доступны для изучения.", "Shaxsiy natija yo‘q, ammo tur mavzulari o‘rganish uchun ochiq.", "No personal result, but tour topics are available for study.")}</div>
          </div>
        `}

        ${renderSeasonTopicPanel(
          tr("Освоенные темы", "O‘zlashtirilgan mavzular", "Mastered topics"),
          tr("Показаны темы с высокой точностью и достаточным числом ответов.", "Yuqori aniqlik va yetarli javoblar soni bo‘lgan mavzular ko‘rsatiladi.", "Topics shown have high accuracy and enough answers."),
          review.mastered,
          "mastered",
          tr("Пока нет тем с достаточным подтверждением.", "Hozircha yetarli tasdiqlangan mavzular yo‘q.", "No topics have enough evidence yet."),
          key,
          scope
        )}

        ${renderSeasonTopicPanel(
          tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study"),
          tr("Приоритет — повторяющиеся ошибки, низкая точность и важность для Grand Olympiad.", "Ustuvorlik — takroriy xatolar, past aniqlik va Grand Olympiad uchun muhim mavzular.", "Priority is based on repeated mistakes, low accuracy and Grand Olympiad relevance."),
          review.study,
          "study",
          tr("Темы для изучения пока не определены.", "O‘rganish mavzulari hali aniqlanmadi.", "No study topics identified yet."),
          key,
          scope
        )}

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Подробный итог", "Batafsil yakun", "Detailed review")}</div>
          <div class="psp-muted">${esc(review.reportText)}</div>
          <button type="button"
            class="btn primary psp-report-download"
            data-psp-action="download-report"
            data-subject="${esc(key)}"
            data-scope="${esc(scope)}">
            ${scope === "all"
              ? tr("Скачать подробный итог", "Batafsil yakunni yuklab olish", "Download detailed review")
              : tr(`Скачать итог ${review.title}`, `${review.title} yakunini yuklab olish`, `Download ${review.title} review`)}
          </button>
        </div>
      `,
      "season-review",
      `data-subject="${esc(key)}" data-scope="${esc(scope)}"`
    ));
  }

  function showReport(key) {
    const reviewKey = arguments[0] || getSubject();
    const scope = arguments[1] || "all";
    return showEnhancedSeasonReview(reviewKey, scope);
  }




  function getPracticeConfigKey(key) {
    return "iclub_preview_practice_config_v46_" + (key || getSubject());
  }

  function getPracticeStateKey(key) {
    return "iclub_preview_practice_state_v46_" + (key || getSubject());
  }

  function getPracticeTopics(key, tour) {
    const d = DATA[key] || DATA.economics;

    const base = {
      economics: {
        recommended: d.study || [],
        "1-7": ["Demand & Supply", "Elasticity", "Market intervention", "Evaluation paragraphs", "Exchange rates", "Balance of payments"],
        "1": ["Demand & Supply", "Elasticity", "Market intervention"],
        "2": ["Income elasticity", "Cross elasticity", "Market failure"],
        "3": ["Macroeconomic objectives", "Inflation", "Unemployment"],
        "4": ["Fiscal policy", "Monetary policy", "Supply-side policy"],
        "5": ["International trade", "Protectionism", "Exchange rates"],
        "6": ["Economic growth", "Money and banking", "Policy effectiveness"],
        "7": ["Balance of payments", "Development economics", "Globalisation"]
      },
      mathematics: {
        recommended: d.study || [],
        "1-7": ["Quadratics", "Graphs", "Coordinate geometry", "Trigonometric identities", "Binomial coefficients", "Inequalities"],
        "1": ["Quadratics", "Graphs", "Coordinate geometry"],
        "2": ["Functions", "Transformations", "Sequences"],
        "3": ["Differentiation", "Tangents", "Stationary points"],
        "4": ["Integration", "Area", "Kinematics"],
        "5": ["Vectors", "Trigonometry", "Radians"],
        "6": ["Addition formulae", "Double angle", "Trigonometric equations"],
        "7": ["Inequalities", "Binomial coefficients", "Series"]
      },
      biology: {
        recommended: d.study || [],
        "1-7": ["Homeostasis", "Inheritance", "Photosynthesis", "Genetic technology", "Respiration", "Selection"],
        "1": ["Cell structure", "Biological molecules", "Enzymes"],
        "2": ["Transport", "Gas exchange", "Immunity"],
        "3": ["DNA", "Protein synthesis", "Cell division"],
        "4": ["Plant transport", "Mammalian transport", "Disease"],
        "5": ["Control", "Inheritance", "Biodiversity"],
        "6": ["Respiration", "Photosynthesis", "Homeostasis"],
        "7": ["Genetic technology", "Selection", "Conservation"]
      },
      chemistry: {
        recommended: d.study || [],
        "1-7": ["Equilibria", "Kinetics", "Organic reactions", "Electrochemistry", "Born-Haber cycles", "Entropy"],
        "1": ["Atomic structure", "Bonding", "Stoichiometry"],
        "2": ["Energetics", "Redox", "Equilibria"],
        "3": ["Periodicity", "Group chemistry", "Organic basics"],
        "4": ["Alcohols", "Carbonyls", "Carboxylic acids"],
        "5": ["Arenes", "Nitrogen compounds", "Analysis"],
        "6": ["Electrochemistry", "Lattice energy", "Entropy"],
        "7": ["Synthetic routes", "Mechanisms", "Organic analysis"]
      },
      informatics: {
        recommended: d.study || [],
        "1-7": ["Algorithms", "Networks", "Data representation", "Cybersecurity", "Databases", "Boolean logic"],
        "1": ["Algorithms", "Pseudocode", "Flowcharts"],
        "2": ["Data representation", "Binary", "Hexadecimal"],
        "3": ["Programming", "Arrays", "Validation"],
        "4": ["Databases", "Files", "Testing"],
        "5": ["Searching", "Sorting", "Trace tables"],
        "6": ["Networks", "Protocols", "Cybersecurity"],
        "7": ["Boolean logic", "Systems", "Ethics"]
      }
    };

    const subjectTopics = base[key] || {};
    return subjectTopics[String(tour)] || subjectTopics.recommended || d.study || [];
  }

  function getPracticeConfig(key, mode) {
    try {
      const raw = localStorage.getItem(getPracticeConfigKey(key));
      const parsed = raw ? JSON.parse(raw) : null;

      if (parsed && typeof parsed === "object") {
        return {
          mode: parsed.mode || mode || "regular",
          tour: parsed.tour || (mode === "study" ? "recommended" : "1-7"),
          topics: Array.isArray(parsed.topics) ? parsed.topics : [],
          difficulty: parsed.difficulty || "mixed",
          count: parsed.count === "all" ? "all" : Number(parsed.count || 10),
          repeatSolved: !!parsed.repeatSolved
        };
      }
    } catch {}

    const tour = mode === "study" ? "recommended" : "1-7";
    const topics = getPracticeTopics(key, tour).slice(0, 3);

    return {
      mode: mode || "regular",
      tour,
      topics,
      difficulty: "mixed",
      count: 10,
      repeatSolved: false
    };
  }

  function savePracticeConfig(key, config) {
    localStorage.setItem(getPracticeConfigKey(key), JSON.stringify(config));
    return config;
  }

  function updatePracticeConfig(key, patch) {
    const current = getPracticeConfig(key, patch.mode || undefined);
    const next = { ...current, ...patch };

    if (patch.tour && patch.tour !== current.tour) {
      next.topics = getPracticeTopics(key, patch.tour).slice(0, 3);
    }

    savePracticeConfig(key, next);
    return next;
  }

  function getActivePracticeState(key) {
    try {
      const raw = localStorage.getItem(getPracticeStateKey(key));
      const parsed = raw ? JSON.parse(raw) : null;

      if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.questions) &&
        parsed.questions.length &&
        !parsed.finished
      ) {
        return parsed;
      }
    } catch {}

    return null;
  }

  function clearPracticeState(key) {
    try { localStorage.removeItem(getPracticeStateKey(key)); } catch {}
  }

  function getPracticeAvailability(key, config) {
    const topics = config.topics && config.topics.length
      ? config.topics
      : getPracticeTopics(key, config.tour);

    if (!topics.length) {
      return {
        availableCount: 0,
        totalCount: 0,
        solvedExcluded: 0
      };
    }

    const scopeBase =
      config.tour === "1-7" ? 140 :
      config.tour === "recommended" ? Math.max(18, topics.length * 8) :
      70;

    const topicLimitedBase = Math.min(scopeBase, Math.max(1, topics.length) * 12);

    const difficultyFactor =
      config.difficulty === "easy" ? 0.45 :
      config.difficulty === "medium" ? 0.60 :
      config.difficulty === "hard" ? 0.35 :
      1;

    const totalCount = Math.max(1, Math.floor(topicLimitedBase * difficultyFactor));
    const solvedCorrectCount = Math.floor(totalCount * 0.35);
    const solvedExcluded = config.repeatSolved ? 0 : solvedCorrectCount;
    const availableCount = Math.max(0, totalCount - solvedExcluded);

    return {
      availableCount,
      totalCount,
      solvedExcluded,
      solvedCorrectCount
    };
  }

  function getPracticeCountOptions(availableCount) {
    if (!availableCount || availableCount <= 0) return [];

    const options = [{ value: "all", label: `${tr("Все", "Hammasi", "All")}: ${availableCount}` }];

    [5, 10, 20, 30].forEach((count) => {
      if (count <= availableCount) {
        options.push({ value: count, label: String(count) });
      }
    });

    return options;
  }

  function normalizePracticeCount(value, availableCount) {
    if (!availableCount || availableCount <= 0) return "all";
    if (value === "all") return "all";

    const numeric = Number(value || 10);
    if (!Number.isFinite(numeric) || numeric <= 0) return "all";
    if (numeric > availableCount) return "all";

    return numeric;
  }

  function buildPracticeQuestions(key, config) {
    const d = DATA[key] || DATA.economics;
    const availability = getPracticeAvailability(key, config);
    const availableCount = availability.availableCount;

    if (availableCount <= 0) return [];

    const requested = config.count === "all"
      ? availableCount
      : Math.min(Number(config.count || 10), availableCount);

    const finalCount = Math.max(1, requested);
    const topics = config.topics && config.topics.length ? config.topics : getPracticeTopics(key, config.tour);
    const baseQuestions = d.questions && d.questions.length ? d.questions : DATA.economics.questions;

    return Array.from({ length: finalCount }).map((_, index) => {
      const q = baseQuestions[index % baseQuestions.length];

      return {
        ...q,
        sourceTopic: topics[index % Math.max(1, topics.length)] || "Practice"
      };
    });
  }

  function showPractice(key) {
    const d = DATA[key] || DATA.economics;
    const active = getActivePracticeState(key);

    const activeBlock = active ? `
      <div class="psp-panel psp-active-practice-panel">
        <div class="psp-panel-title">${tr("Начатая практика", "Boshlangan amaliyot", "Started practice")}</div>
        <div class="psp-muted">${tr("Можно продолжить с текущего вопроса или начать заново.", "Joriy savoldan davom etish yoki qaytadan boshlash mumkin.", "Continue from the current question or restart.")}</div>

        <div class="psp-report-grid">
          <div><b>${Math.max(1, Number(active.q || 1))}/${active.questions.length}</b><span>${tr("Вопрос", "Savol", "Question")}</span></div>
          <div><b>${Object.keys(active.answers || {}).length}</b><span>${tr("Ответы", "Javoblar", "Answers")}</span></div>
          <div><b>${active.mode === "study" ? "Study" : active.mode === "build" ? "Custom" : "Regular"}</b><span>${tr("Формат", "Format", "Mode")}</span></div>
          <div><b>${fmt(getPracticeAttemptElapsed(active))}</b><span>${tr("Время", "Vaqt", "Time")}</span></div>
        </div>

        <div class="psp-actions">
          <button type="button" class="btn" data-psp-action="practice-restart" data-subject="${esc(key)}" data-mode="${esc(active.mode || "regular")}">${tr("Начать заново", "Qaytadan boshlash", "Restart")}</button>
          <button type="button" class="btn primary" data-psp-action="practice-continue" data-subject="${esc(key)}">${tr("Продолжить", "Davom etish", "Continue")}</button>
        </div>
      </div>
    ` : "";

    openSheet(sheet(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      tr("Выберите формат", "Formatni tanlang", "Choose format"),
      d.title,
      `
        ${activeBlock}

        <div class="psp-choice-list">
          <button type="button" class="psp-choice psp-choice-button" data-psp-action="practice-regular" data-subject="${esc(key)}">
            <div class="psp-choice-title">${tr("Обычная практика", "Oddiy amaliyot", "Regular practice")}</div>
            <div class="psp-muted">${tr("Быстрый запуск привычной практики по предмету.", "Fan bo‘yicha odatiy amaliyotni tez boshlash.", "Quick start for usual practice.")}</div>
          </button>

          <button type="button" class="psp-choice psp-choice-button" data-psp-action="practice-study" data-subject="${esc(key)}">
            <div class="psp-choice-title">${tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")}</div>
            <div class="psp-muted">${tr("Практика по темам из рекомендаций сезона.", "Mavsum tavsiyalaridagi mavzular bo‘yicha amaliyot.", "Practice topics from season recommendations.")}</div>
          </button>

          <button type="button" class="psp-choice psp-choice-button" data-psp-action="practice-build" data-subject="${esc(key)}">
            <div class="psp-choice-title">${tr("Собрать практику", "Amaliyot yig‘ish", "Build practice")}</div>
            <div class="psp-muted">${tr("Выберите тур, темы, сложность и количество вопросов.", "Tur, mavzu, qiyinlik va savollar sonini tanlang.", "Choose tour, topics, difficulty and number of questions.")}</div>
          </button>
        </div>
      `
    ));
  }

  function showPracticeBuilder(key, mode) {
    const d = DATA[key] || DATA.economics;
    const current = getPracticeConfig(key, mode);

    const config = {
      ...current,
      mode,
      tour: mode === "study" && !current.tour ? "recommended" : current.tour
    };

    if (mode === "study" && config.tour !== "recommended" && !config.topics.length) {
      config.topics = getPracticeTopics(key, "recommended").slice(0, 3);
    }

    if (mode === "study" && config.tour === "1-7") {
      config.tour = "recommended";
      config.topics = getPracticeTopics(key, "recommended").slice(0, 3);
    }

    if (!config.topics.length) config.topics = getPracticeTopics(key, config.tour).slice(0, 3);
    savePracticeConfig(key, config);

    const topics = getPracticeTopics(key, config.tour);
    const availability = getPracticeAvailability(key, config);
    const countOptions = getPracticeCountOptions(availability.availableCount);
    config.count = normalizePracticeCount(config.count, availability.availableCount);
    savePracticeConfig(key, config);

    const title = mode === "study"
      ? tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")
      : tr("Собрать практику", "Amaliyot yig‘ish", "Build practice");

    const subtitle = mode === "study"
      ? tr("По умолчанию выбраны темы из ваших рекомендаций.", "Avval tavsiyalardagi mavzular tanlangan.", "Recommended topics are selected by default.")
      : tr("Настройте практику под свою цель.", "Amaliyotni maqsadingizga moslang.", "Customize practice for your goal.");

    const tourButtons = mode === "study"
      ? ["recommended", "1", "2", "3", "4", "5", "6", "7"]
      : ["1-7", "1", "2", "3", "4", "5", "6", "7"];

    openSheet(sheet(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      title,
      `${d.title} · ${subtitle}`,
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${mode === "study" ? tr("Источник тем", "Mavzular manbasi", "Topic source") : tr("Тур", "Tur", "Tour")}</div>
          <div class="psp-filter-row">
            ${tourButtons.map((tour) => `
              <button type="button"
                class="${config.tour === tour ? "is-on" : ""}"
                data-psp-action="practice-set"
                data-subject="${esc(key)}"
                data-mode="${esc(mode)}"
                data-field="tour"
                data-value="${esc(tour)}">
                ${tour === "recommended" ? tr("Рекомендации", "Tavsiyalar", "Recommended") : tour === "1-7" ? tr("Все 7", "7 tur", "All 7") : `${tr("Тур", "Tur", "Tour")} ${tour}`}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="psp-panel ${mode === "study" ? "study" : ""}">
          <div class="psp-panel-title">${mode === "study" ? tr("Темы для изучения", "O‘rganish mavzulari", "Topics to study") : tr("Темы", "Mavzular", "Topics")}</div>
          <div class="psp-topic-list">
            ${topics.map((topic) => `
              <button type="button"
                class="${config.topics.includes(topic) ? "is-on" : ""}"
                data-psp-action="practice-topic"
                data-subject="${esc(key)}"
                data-mode="${esc(mode)}"
                data-topic="${esc(topic)}">
                ${esc(topic)}
              </button>
            `).join("")}
          </div>
          <div class="psp-muted psp-mini-note">
            ${mode === "study"
              ? tr("Эти темы взяты из итога сезона. В main они будут считаться по ошибкам, точности и незакрытым вопросам.", "Bu mavzular mavsum yakunidan olingan. Main’da ular xatolar, aniqlik va yopilmagan savollar bo‘yicha hisoblanadi.", "These topics come from the season summary. In main they are calculated from mistakes, accuracy and unclosed questions.")
              : tr("Выбранные темы попадут в практику. В main список будет приходить из базы вопросов.", "Tanlangan mavzular amaliyotga kiradi. Main’da ro‘yxat savollar bazasidan olinadi.", "Selected topics go into practice. In main, the list comes from the question bank.")}
          </div>
        </div>

        ${mode === "build" ? `
          <div class="psp-panel">
            <div class="psp-panel-title">${tr("Сложность", "Qiyinlik", "Difficulty")}</div>
            <div class="psp-filter-row">
              ${[
                ["mixed", "Mixed"],
                ["easy", "Easy"],
                ["medium", "Medium"],
                ["hard", "Hard"]
              ].map(([value, label]) => `
                <button type="button"
                  class="${config.difficulty === value ? "is-on" : ""}"
                  data-psp-action="practice-set"
                  data-subject="${esc(key)}"
                  data-mode="${esc(mode)}"
                  data-field="difficulty"
                  data-value="${esc(value)}">
                  ${esc(label)}
                </button>
              `).join("")}
            </div>
          </div>

          <div class="psp-panel ${availability.availableCount <= 0 ? "is-empty" : ""}">
            <div class="psp-panel-title">${tr("Сколько вопросов?", "Nechta savol?", "How many questions?")}</div>

            ${availability.availableCount > 0 ? `
              <div class="psp-filter-row">
                ${countOptions.map((option) => `
                  <button type="button"
                    class="${String(config.count) === String(option.value) ? "is-on" : ""}"
                    data-psp-action="practice-set"
                    data-subject="${esc(key)}"
                    data-mode="${esc(mode)}"
                    data-field="count"
                    data-value="${esc(option.value)}">
                    ${esc(option.label)}
                  </button>
                `).join("")}
              </div>

              <div class="psp-availability-note">
                <b>
                  ${config.repeatSolved
                    ? tr(`Доступно ${availability.totalCount} из ${availability.totalCount} вопросов`, `${availability.totalCount} / ${availability.totalCount} savol mavjud`, `${availability.totalCount} of ${availability.totalCount} questions available`)
                    : tr(`Доступно ${availability.availableCount} из ${availability.totalCount} вопросов`, `${availability.availableCount} / ${availability.totalCount} savol mavjud`, `${availability.availableCount} of ${availability.totalCount} questions available`)}
                </b>

                <span>
                  ${availability.solvedCorrectCount > 0
                    ? config.repeatSolved
                      ? tr(`${availability.solvedCorrectCount} уже закрыты правильным ответом и включены в повтор.`, `${availability.solvedCorrectCount} ta savol to‘g‘ri javob bilan yopilgan va takrorlashga kiritilgan.`, `${availability.solvedCorrectCount} already solved correctly and included for repeat.`)
                      : tr(`${availability.solvedCorrectCount} уже закрыты правильным ответом.`, `${availability.solvedCorrectCount} ta savol to‘g‘ri javob bilan yopilgan.`, `${availability.solvedCorrectCount} already solved correctly.`)
                    : tr("Закрытых правильным ответом вопросов по этим фильтрам пока нет.", "Bu filtrlar bo‘yicha to‘g‘ri yopilgan savollar hali yo‘q.", "No correctly solved questions for these filters yet.")}
                </span>
              </div>
            ` : `
              <div class="psp-empty-builder">
                <b>${tr("Нет доступных вопросов", "Mavjud savollar yo‘q", "No available questions")}</b>
                <span>${tr("Измените темы, сложность или включите повтор уже решённых вопросов.", "Mavzularni, qiyinlikni o‘zgartiring yoki yechilgan savollarni takrorlashni yoqing.", "Change topics, difficulty, or enable repeating solved questions.")}</span>
              </div>
            `}
          </div>

          <div class="psp-panel">
            <button type="button"
              class="psp-repeat-row ${config.repeatSolved ? "is-on" : ""}"
              data-psp-action="practice-repeat"
              data-subject="${esc(key)}"
              data-mode="${esc(mode)}">
              <span>${tr("Повторять уже решённые", "Yechilganlarni ham takrorlash", "Repeat solved questions")}</span>
              <b>${config.repeatSolved ? "ON" : "OFF"}</b>
            </button>
          </div>
        ` : ""}

        <div class="psp-actions">
          <button type="button" class="btn" data-psp-action="practice" data-subject="${esc(key)}">${tr("Назад", "Orqaga", "Back")}</button>
          <button type="button"
            class="btn primary"
            data-psp-action="practice-start"
            data-subject="${esc(key)}"
            data-mode="${esc(mode)}"
            ${mode === "build" && availability.availableCount <= 0 ? "disabled" : ""}>
            ${mode === "study" ? tr("Начать изучение", "O‘rganishni boshlash", "Start studying") : tr("Начать практику", "Amaliyotni boshlash", "Start practice")}
          </button>
        </div>
      `,
      "practice",
      `data-subject="${esc(key)}"`
    ));
  }

  function startPreviewPractice(key, mode, restart = true) {
    if (restart) clearPracticeState(key);

    const config = mode === "regular"
      ? {
          mode: "regular",
          tour: "1-7",
          topics: getPracticeTopics(key, "1-7").slice(0, 3),
          difficulty: "mixed",
          count: 10,
          repeatSolved: false
        }
      : getPracticeConfig(key, mode);

    const availability = getPracticeAvailability(key, config);

    if (config.mode === "build" && availability.availableCount <= 0) {
      savePracticeConfig(key, config);
      return showPracticeBuilder(key, "build");
    }

    const questions = buildPracticeQuestions(key, config);

    const state = {
      subject: key,
      mode: config.mode,
      config,
      q: 1,
      selected: "",
      answers: {},
      questions,
      startedAt: Date.now(),
      attemptElapsed: 0,
      questionStartedAt: Date.now(),
      questionElapsed: 0,
      timeSpent: {},
      finished: false
    };

    localStorage.setItem(getPracticeStateKey(key), JSON.stringify(state));
    closeSheet();
    renderPracticeQuestion(key);
  }

  function getPracticeState(key) {
    const active = getActivePracticeState(key);
    if (active) return active;

    startPreviewPractice(key, "regular", true);
    return JSON.parse(localStorage.getItem(getPracticeStateKey(key)));
  }

  function savePracticeState(key, state) {
    localStorage.setItem(getPracticeStateKey(key), JSON.stringify(state));
    return state;
  }

  function getPracticeAttemptElapsed(state) {
    const base = Number(state.attemptElapsed || 0);
    if (!state.startedAt) return base;
    return base + Math.max(0, Math.floor((Date.now() - Number(state.startedAt || Date.now())) / 1000));
  }

  function getPracticeQuestionElapsed(state) {
    const base = Number(state.questionElapsed || 0);
    if (!state.questionStartedAt) return base;
    return base + Math.max(0, Math.floor((Date.now() - Number(state.questionStartedAt || Date.now())) / 1000));
  }

  let practiceTimer = null;

  function stopPracticeTimer() {
    if (practiceTimer) clearInterval(practiceTimer);
    practiceTimer = null;
  }

  function startPracticeTimer(key) {
    stopPracticeTimer();

    const tick = () => {
      const state = getPracticeState(key);
      const el = document.getElementById("psp-practice-timer");
      if (el) el.textContent = fmt(getPracticeQuestionElapsed(state));
    };

    tick();
    practiceTimer = setInterval(tick, 1000);
  }

  function pausePractice(key) {
    const state = getPracticeState(key);

    state.attemptElapsed = getPracticeAttemptElapsed(state);
    state.questionElapsed = getPracticeQuestionElapsed(state);
    state.startedAt = null;
    state.questionStartedAt = null;

    savePracticeState(key, state);
    closePracticeScreen();
    showPractice(key);
  }

  function resumePractice(key) {
    const state = getActivePracticeState(key);
    if (!state) return showPractice(key);

    state.startedAt = Date.now();
    state.questionStartedAt = Date.now();

    savePracticeState(key, state);
    closeSheet();
    renderPracticeQuestion(key);
  }

  function openPracticeScreen(html) {
    closeSheet();
    closePracticeScreen();

    const screen = document.createElement("div");
    screen.id = "psp-practice-screen";
    screen.innerHTML = html;

    document.body.appendChild(screen);
    document.documentElement.classList.add("psp-practice-open");
    document.body.classList.add("psp-practice-open");
  }

  function closePracticeScreen() {
    stopPracticeTimer();
    document.getElementById("psp-practice-screen")?.remove();
    document.documentElement.classList.remove("psp-practice-open");
    document.body.classList.remove("psp-practice-open");
  }

  function renderPracticeQuestion(key) {
    const d = DATA[key] || DATA.economics;
    const state = getPracticeState(key);
    const total = state.questions.length;
    const question = state.questions[Math.max(0, Math.min(total - 1, state.q - 1))];

    if (!state.startedAt) state.startedAt = Date.now();
    if (!state.questionStartedAt) state.questionStartedAt = Date.now();
    savePracticeState(key, state);

    openPracticeScreen(`
      <div class="psp-practice-shell psp-main-quiz-shell">
        <div class="psp-main-quiz-top">
          <div class="psp-main-quiz-progress">${state.q}/${total}</div>
          <div id="psp-practice-timer" class="psp-practice-timer">${fmt(getPracticeQuestionElapsed(state))}</div>
          <button type="button" class="psp-main-quiz-stop" data-psp-action="practice-stop" data-subject="${esc(key)}">
            ${tr("Остановить", "To‘xtatish", "Stop")}
          </button>
        </div>

        <div class="psp-main-quiz-sub">${esc(d.title)} · ${esc(question.sourceTopic || "Practice")}</div>

        <div class="psp-question-card">
          <div class="psp-panel-title">${tr("Вопрос практики", "Amaliyot savoli", "Practice question")}</div>
          <div class="psp-question-text">${esc(question.q)}</div>

          <div class="psp-option-list">
            ${question.options.map(([letter, text]) => `
              <button type="button"
                class="${state.selected === letter ? "is-picked" : ""}"
                data-psp-action="practice-pick"
                data-subject="${esc(key)}"
                data-option="${esc(letter)}">
                <span>${esc(letter)}</span>
                <b>${esc(text)}</b>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="psp-main-quiz-actions">
          <button type="button"
            class="btn primary"
            data-psp-action="practice-answer"
            data-subject="${esc(key)}"
            ${state.selected ? "" : "disabled"}>
            ${state.q >= total ? tr("Завершить практику", "Amaliyotni yakunlash", "Finish practice") : tr("Ответить", "Javob berish", "Answer")}
          </button>
        </div>
      </div>
    `);

    startPracticeTimer(key);
  }

  function pickPracticeAnswer(key, option) {
    const state = getPracticeState(key);
    state.selected = ["A", "B", "C", "D"].includes(option) ? option : "";
    savePracticeState(key, state);
    renderPracticeQuestion(key);
  }

  function answerPracticeQuestion(key) {
    const state = getPracticeState(key);
    if (!state.selected) return;

    state.answers[String(state.q)] = state.selected;
    state.timeSpent = state.timeSpent && typeof state.timeSpent === "object" ? state.timeSpent : {};
    state.timeSpent[String(state.q)] = getPracticeQuestionElapsed(state);
    state.selected = "";
    state.questionElapsed = 0;

    if (state.q >= state.questions.length) {
      state.finished = true;
      state.attemptElapsed = getPracticeAttemptElapsed(state);
      state.startedAt = null;
      state.questionStartedAt = null;
      savePracticeState(key, state);
      return finishPractice(key);
    }

    state.q += 1;
    state.questionStartedAt = Date.now();
    savePracticeState(key, state);
    renderPracticeQuestion(key);
  }

  function finishPractice(key) {
    closePracticeScreen();

    const d = DATA[key] || DATA.economics;
    const state = JSON.parse(localStorage.getItem(getPracticeStateKey(key)) || "{}");
    const total = Array.isArray(state.questions) ? state.questions.length : 0;

    let correct = 0;
    (state.questions || []).forEach((question, index) => {
      if ((state.answers || {})[String(index + 1)] === question.correct) correct += 1;
    });

    const mistakes = Math.max(0, total - correct);
    const percent = Math.round((correct / Math.max(1, total)) * 100);
    const totalTime = Number(state.attemptElapsed || 0);

    openSheet(sheet(
      tr("РЕЗУЛЬТАТ ПРАКТИКИ", "AMALIYOT NATIJASI", "PRACTICE RESULT"),
      d.title,
      `${correct}/${total} · ${percent}%`,
      `
        <div class="psp-report-grid">
          <div><b>${correct}/${total}</b><span>${tr("Ответы", "Javoblar", "Answers")}</span></div>
          <div><b>${percent}%</b><span>${tr("Результат", "Natija", "Result")}</span></div>
          <div><b>${mistakes}</b><span>${tr("Ошибки", "Xatolar", "Mistakes")}</span></div>
          <div><b>${fmt(totalTime)}</b><span>${tr("Время", "Vaqt", "Time")}</span></div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Что дальше", "Keyingi qadam", "Next")}</div>
          <div class="psp-muted">${mistakes ? tr("Откройте темы для изучения и повторите вопросы по слабым местам.", "O‘rganish mavzularini oching va zaif joylar bo‘yicha savollarni takrorlang.", "Open study topics and repeat weak areas.") : tr("Хороший результат. Можно собрать практику сложнее.", "Yaxshi natija. Qiyinroq amaliyot yig‘ish mumkin.", "Good result. You can build a harder practice.")}</div>
        </div>

        <div class="psp-result-actions">
          <button type="button" class="btn" data-psp-action="practice" data-subject="${esc(key)}">${tr("Назад", "Orqaga", "Back")}</button>
          <button type="button" class="btn primary" data-psp-action="practice-restart" data-subject="${esc(key)}" data-mode="${esc(state.mode || "regular")}">${tr("Пройти снова", "Yana o‘tish", "Try again")}</button>
        </div>
      `,
      "practice",
      `data-subject="${esc(key)}"`
    ));
  }

  function decorateRatingTab() {
    const view = document.querySelector("#view-rating.is-active, [data-view='rating'].is-active, .rating-view.is-active");
    if (!view || document.getElementById("psp-rating-final-hint")) return;

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
      <div class="psp-muted">${tr("Финал не входит в “Все 7 туров”.", "Final “7 tur” ichiga kirmaydi.", "Final is not included in all 7 tours.")}</div>
    `;

    (view.querySelector(".content") || view).prepend(box);
  }

  function installPhaseSelect() {
    const right = document.querySelector("#topbar .topbar-right") || document.querySelector(".topbar-right");
    if (!right) return;

    let wrap = document.getElementById("psp-phase-select-wrap");

    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "psp-phase-select-wrap";
      wrap.innerHTML = `
        <select id="psp-phase-select" aria-label="Preview state">
          ${PHASES.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join("")}
        </select>
      `;

      const bell = document.getElementById("topbar-notifications") || right.firstElementChild;
      right.insertBefore(wrap, bell || null);

      wrap.querySelector("select").addEventListener("change", (event) => {
        setPhase(event.target.value || "auto");
        closeSheet();
        closeFinalScreen();
        renderHomeRouter();
      });
    }

    syncPhaseSelect();
    wrap.style.display = isHomeActive() ? "block" : "none";
  }

  function syncPhaseSelect() {
    const select = document.getElementById("psp-phase-select");
    if (select && select.value !== getPhase()) select.value = getPhase();
  }

  function neutralizePreviewBadge(event) {
    const target = event?.target || null;
    const direct = target?.closest?.("a,button,div,span");
    const text = String(direct?.textContent || "").toLowerCase();

    if (text.includes("preview") && text.includes("db off")) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      return true;
    }

    return false;
  }

  function neutralizeAllPreviewBadges() {
    Array.from(document.querySelectorAll("a,button,div,span")).forEach((el) => {
      const text = String(el.textContent || "").toLowerCase();
      if (!text.includes("preview") || !text.includes("db off")) return;

      if (el.tagName === "A") {
        el.setAttribute("href", "javascript:void(0)");
        el.removeAttribute("target");
      }

      el.onclick = null;
      el.style.pointerEvents = "none";
    });
  }

  function bind() {
    if (window.__pspV33Bound) return;
    window.__pspV33Bound = true;

    document.addEventListener("pointerdown", neutralizePreviewBadge, true);
    document.addEventListener("click", (event) => {
      if (neutralizePreviewBadge(event)) return;

      const btn = event.target.closest("[data-psp-action]");
      if (!btn) return;

      event.preventDefault();
      event.stopPropagation();

      const action = btn.dataset.pspAction;
      const key = btn.dataset.subject || getSubject();

      if (action === "sheet-close") return closeSheet();
      if (action === "plan") return showPlan();
      if (action === "grand-select") return showGrandSelect();

      if (action === "grand-start") {
        setSubject(key);
        setPhase("grand_in_progress");
        resetQuiz(key);
        renderHomeRouter();
        return renderFinalQuestion(key);
      }

      if (action === "grand-continue") return renderFinalQuestion(key);
      if (action === "pick") return pickAnswer(key, btn.dataset.option || "");
      if (action === "answer") return answerQuestion(key);
      if (action === "finish-early") return finishEarly(key);

      if (action === "grand-status") return showSubmitted(key, "submitted");
      if (action === "finalizing") return showFinalizing();
      if (action === "grand-result") return showResult(key);
      if (action === "grand-certificate") return showCertificate(key);

      if (action === "certificates") {
        const profileRoot = getActiveProfileRoot();

        if (!btn.closest("#psp-sheet") && !(profileRoot && profileRoot.contains(btn))) {
          cleanupCertificateActionsOutsideProfile(profileRoot);
          return;
        }

        const root = document.getElementById("psp-sheet");
        const bucket = btn.dataset.bucket || root?.dataset?.certBucket || "current";
        const season = btn.dataset.season || root?.dataset?.certSeason || "season_1";
        const filter = btn.dataset.filter || root?.dataset?.certFilter || "all";
        return showCertificatesArchive(bucket, season, filter);
      }

      if (action === "cert-bucket") {
        const bucket = btn.dataset.bucket || "current";
        return showCertificatesArchive(bucket, bucket === "past" ? "season_0" : "season_1", "all");
      }

      if (action === "cert-season") {
        const root = document.getElementById("psp-sheet");
        return showCertificatesArchive("past", btn.dataset.season || "season_0", root?.dataset?.certFilter || "all");
      }

      if (action === "cert-filter") {
        const root = document.getElementById("psp-sheet");
        return showCertificatesArchive(
          root?.dataset?.certBucket || "current",
          root?.dataset?.certSeason || "season_1",
          btn.dataset.filter || "all"
        );
      }

      if (action === "certificate-open") {
        return showCertificateById(
          btn.dataset.certId || "",
          btn.dataset.bucket || "current",
          btn.dataset.season || "season_1",
          btn.dataset.filter || "all"
        );
      }

      if (action === "certificate-download") {
        const cert = btn.dataset.certId
          ? getCertificateById(btn.dataset.certId)
          : getGrandCertificateForSubject(btn.dataset.subject || getSubject());
        return downloadCertificate(cert);
      }

      if (action === "report") return showReport(key);
      if (action === "season-review") {
        return closeSeasonReviewSheet();
      }

      if (action === "season-review-scope") {
        return showEnhancedSeasonReview(key, btn.dataset.scope || "all");
      }

      if (action === "season-review-study") {
        const scope = btn.dataset.scope || "all";
        const review = getSeasonScopeReviewData(key, scope);
        const topics = (review.study || []).map((item) => item.topic).filter(Boolean).slice(0, 3);
        const config = getPracticeConfig(key, "study");

        config.mode = "study";
        config.tour = review.studyModeTour || (scope === "all" ? "recommended" : scope);
        config.topics = topics.length ? topics : getPracticeTopics(key, config.tour).slice(0, 3);
        config.difficulty = "mixed";
        config.count = "all";
        config.repeatSolved = false;

        savePracticeConfig(key, config);
        return showPracticeBuilder(key, "study");
      }

      if (action === "download-report") {
        const root = document.getElementById("psp-sheet");
        const scope = btn.dataset.scope || root?.dataset?.scope || "all";
        return downloadDetailedReport(key, scope);
      }
      if (action === "practice") return showPractice(key);

      if (action === "practice-regular") return startPreviewPractice(key, "regular", true);
      if (action === "practice-study") return showPracticeBuilder(key, "study");
      if (action === "practice-build") return showPracticeBuilder(key, "build");

      if (action === "practice-set") {
        const field = btn.dataset.field || "";
        const value = btn.dataset.value || "";
        const mode = btn.dataset.mode || "build";
        const patch = { mode };
        patch[field] = field === "count" ? (value === "all" ? "all" : Number(value || 10)) : value;
        updatePracticeConfig(key, patch);
        return showPracticeBuilder(key, mode);
      }

      if (action === "practice-topic") {
        const mode = btn.dataset.mode || "study";
        const topic = btn.dataset.topic || "";
        const config = getPracticeConfig(key, mode);
        const has = config.topics.includes(topic);
        config.topics = has ? config.topics.filter((x) => x !== topic) : [...config.topics, topic];
        if (!config.topics.length) config.topics = [topic].filter(Boolean);
        savePracticeConfig(key, config);
        return showPracticeBuilder(key, mode);
      }

      if (action === "practice-repeat") {
        const mode = btn.dataset.mode || "build";
        const config = getPracticeConfig(key, mode);
        config.repeatSolved = !config.repeatSolved;
        savePracticeConfig(key, config);
        return showPracticeBuilder(key, mode);
      }

      if (action === "practice-start") return startPreviewPractice(key, btn.dataset.mode || "regular", true);
      if (action === "practice-restart") return startPreviewPractice(key, btn.dataset.mode || "regular", true);
      if (action === "practice-continue") return resumePractice(key);
      if (action === "practice-stop") return pausePractice(key);

      if (action === "practice-pick") return pickPracticeAnswer(key, btn.dataset.option || "");
      if (action === "practice-answer") return answerPracticeQuestion(key);
    }, true);
  }

  function injectStyles() {
    if (document.getElementById("psp-v33-styles")) return;

    const style = document.createElement("style");
    style.id = "psp-v33-styles";
    style.textContent = `
      #psp-home {
        display: grid;
        gap: 12px;
      }

      .psp-grand-card,
      .psp-subject-card,
      .psp-panel,
      .psp-choice,
      .psp-sheet-card,
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
      .psp-sheet-title {
        margin-top: 5px;
        color: #0f172a;
        font-size: 19px;
        line-height: 1.12;
        font-weight: 950;
      }

      .psp-muted {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.42;
        font-weight: 650;
      }

      .psp-stat-row,
      .psp-report-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
        margin: 12px 0;
      }

      .psp-report-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .psp-stat-row div,
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

      .psp-stat-row b,
      .psp-report-grid b {
        color: #2563eb;
        font-size: 15px;
        font-weight: 950;
      }

      .psp-stat-row span,
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

      #psp-sheet {
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

      .psp-sheet-card {
        width: min(100%, 430px);
        max-height: 92vh;
        overflow: auto;
        border-radius: 22px 22px 0 0;
        padding: 14px;
        box-shadow: 0 -18px 45px rgba(15,23,42,.22);
      }

      .psp-sheet-top {
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

      .psp-choice-list {
        display: grid;
        gap: 10px;
      }

      .psp-choice {
        padding: 12px;
        display: grid;
        gap: 10px;
      }

      .psp-choice-title {
        color: #0f172a;
        font-size: 15px;
        line-height: 1.2;
        font-weight: 950;
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

      html.psp-final-open,
      body.psp-final-open {
        overflow: hidden !important;
        height: 100% !important;
      }

      #psp-final-screen {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        background: #f8fafc !important;
        display: flex !important;
        justify-content: center !important;
        align-items: stretch !important;
        overflow-y: auto !important;
      }

      .psp-final-shell {
        width: 100%;
    max-width: none;
        min-height: 100dvh;
        background: #f8fafc;
        box-sizing: border-box;
        padding: 10px 14px calc(14px + env(safe-area-inset-bottom));
        display: flex;
        flex-direction: column;
      }

      .psp-final-top {
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

      .psp-progress {
        color: #0f172a;
        font-size: 16px;
        font-weight: 950;
      }

      .psp-timer {
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

      .psp-timer.is-danger {
        color: #dc2626;
        border-color: rgba(220,38,38,.30);
        background: rgba(254,226,226,.75);
      }

      .psp-final-subject {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.25;
        font-weight: 800;
        margin-bottom: 12px;
      }

      .psp-question-card {
        background: #fff;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      .psp-question-text {
        color: #0f172a;
        font-size: 15px;
        line-height: 1.38;
        font-weight: 850;
      }

      .psp-option-list {
        display: grid;
        gap: 8px;
        margin-top: 12px;
      }

      .psp-option-list button {
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        border-radius: 14px;
        padding: 11px;
        text-align: left;
        display: grid;
        grid-template-columns: 28px 1fr;
        gap: 8px;
        align-items: center;
        color: #0f172a;
      }

      .psp-option-list button.is-picked {
        border-color: rgba(37,99,235,.34);
        background: rgba(37,99,235,.08);
        color: #2563eb;
      }

      .psp-option-list span {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: rgba(15,23,42,.055);
        font-size: 11px;
        font-weight: 950;
      }

      .psp-option-list b {
        font-size: 13px;
        line-height: 1.3;
        color: inherit;
      }

      .psp-final-actions {
        margin-top: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        padding-top: 14px;
      }

      .psp-final-actions .btn[disabled] {
        opacity: .45;
        pointer-events: none;
      }

      .psp-cert {
        border-radius: 22px;
        padding: 18px;
        background: linear-gradient(135deg, #fff, rgba(37,99,235,.07));
        border: 1px solid rgba(37,99,235,.18);
        text-align: center;
      }

      .psp-cert-logo {
        color: #2563eb;
        font-weight: 950;
      }

      .psp-cert-type {
        margin-top: 6px;
        color: #0f172a;
        font-size: 18px;
        font-weight: 950;
      }

      .psp-cert-name {
        margin-top: 16px;
        color: #0f172a;
        font-size: 19px;
        font-weight: 950;
      }

      .psp-cert-line,
      .psp-cert-code {
        margin-top: 8px;
        color: rgba(15,23,42,.58);
        font-size: 11px;
        line-height: 1.35;
        font-weight: 800;
        word-break: break-word;
      }

      .psp-rating-hint {
        padding: 12px;
        margin-bottom: 12px;
      }

      .psp-rating-title {
        margin-top: 5px;
        color: #0f172a;
        font-size: 16px;
        font-weight: 950;
      }

      .psp-rating-tabs {
        display: flex;
        gap: 7px;
        overflow-x: auto;
        padding: 10px 0;
      }

      .psp-rating-tabs span,
      .psp-rating-tabs b {
        white-space: nowrap;
        border-radius: 999px;
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        padding: 7px 10px;
        font-size: 11px;
        font-weight: 900;
      }

      .psp-rating-tabs b {
        color: #2563eb;
        border-color: rgba(37,99,235,.30);
        background: rgba(37,99,235,.08);
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


  function injectSheetFullscreenFix() {
    if (document.getElementById("psp-v36-sheet-fullscreen-fix")) return;

    const style = document.createElement("style");
    style.id = "psp-v36-sheet-fullscreen-fix";
    style.textContent = `
      /* PSP_FORCE_FULLSCREEN_SHEET_V36 */
      html.psp-sheet-open,
      body.psp-sheet-open {
        overflow: hidden !important;
        height: 100% !important;
        overscroll-behavior: none !important;
      }

      #psp-sheet.psp-sheet-fullscreen {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100dvh !important;
        z-index: 2147483646 !important;
        background: #f8fafc !important;
        overflow: hidden !important;
      }

      #psp-sheet.psp-sheet-fullscreen .psp-backdrop {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: #f8fafc !important;
        display: flex !important;
        align-items: stretch !important;
        justify-content: center !important;
        overflow-y: auto !important;
        padding: 0 !important;
      }

      #psp-sheet.psp-sheet-fullscreen .psp-sheet-card {
        width: min(100%, 430px) !important;
        height: 100dvh !important;
        min-height: 100dvh !important;
        max-height: none !important;
        overflow-y: auto !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        background: #f8fafc !important;
        padding: 10px 14px calc(14px + env(safe-area-inset-bottom)) !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-sheet-fullscreen .psp-sheet-top {
        position: sticky !important;
        top: 0 !important;
        z-index: 3 !important;
        background: #f8fafc !important;
        padding: 4px 0 10px !important;
        margin-bottom: 12px !important;
      }

      #psp-sheet.psp-sheet-fullscreen .psp-panel,
      #psp-sheet.psp-sheet-fullscreen .psp-choice,
      #psp-sheet.psp-sheet-fullscreen .psp-cert {
        background: #fff !important;
      }
    `;

    document.head.appendChild(style);
  }


  function injectPracticeFullscreenStyles() {
    if (document.getElementById("psp-v37-practice-styles")) return;

    const style = document.createElement("style");
    style.id = "psp-v37-practice-styles";
    style.textContent = `
      /* PSP_PRACTICE_FLOW_V37 */
      html.psp-practice-open,
      body.psp-practice-open {
        overflow: hidden !important;
        height: 100% !important;
        overscroll-behavior: none !important;
      }

      #psp-practice-screen {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        background: #f8fafc !important;
        display: flex !important;
        justify-content: center !important;
        align-items: stretch !important;
        overflow-y: auto !important;
      }

      .psp-practice-shell {
        width: 100%;
    max-width: none;
        min-height: 100dvh;
        background: #f8fafc;
        box-sizing: border-box;
        padding: 10px 14px calc(14px + env(safe-area-inset-bottom));
        display: flex;
        flex-direction: column;
      }

      .psp-practice-top {
        display: grid;
        grid-template-columns: 38px 1fr;
        gap: 10px;
        align-items: start;
        position: sticky;
        top: 0;
        z-index: 3;
        background: #f8fafc;
        padding: 4px 0 10px;
        margin-bottom: 12px;
      }

      .psp-practice-title {
        margin-top: 5px;
        color: #0f172a;
        font-size: 19px;
        line-height: 1.12;
        font-weight: 950;
      }

      .psp-practice-actions {
        margin-top: auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 9px;
        padding-top: 14px;
      }

      .psp-practice-actions .btn[disabled] {
        opacity: .45;
        pointer-events: none;
      }

      .psp-choice-button {
        width: 100%;
        text-align: left;
        appearance: none;
        -webkit-appearance: none;
      }

      .psp-filter-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .psp-filter-row button,
      .psp-topic-list button {
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 999px;
        background: #fff;
        color: rgba(15,23,42,.72);
        padding: 8px 11px;
        font-size: 11px;
        line-height: 1;
        font-weight: 900;
      }

      .psp-filter-row button.is-on,
      .psp-topic-list button.is-on {
        color: #2563eb;
        border-color: rgba(37,99,235,.30);
        background: rgba(37,99,235,.08);
      }

      .psp-topic-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .psp-mini-note {
        margin-top: 10px;
      }

      .psp-repeat-row {
        width: 100%;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 15px;
        background: #fff;
        padding: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(15,23,42,.72);
        font-size: 12px;
        font-weight: 850;
      }

      .psp-repeat-row b {
        color: #64748b;
        font-size: 11px;
        font-weight: 950;
      }

      .psp-repeat-row.is-on {
        border-color: rgba(37,99,235,.30);
        background: rgba(37,99,235,.08);
        color: #2563eb;
      }

      .psp-repeat-row.is-on b {
        color: #2563eb;
      }
    `;

    document.head.appendChild(style);
  }


  function injectPracticeUXPolishStyles() {
    if (document.getElementById("psp-v38-practice-ux")) return;

    const style = document.createElement("style");
    style.id = "psp-v38-practice-ux";
    style.textContent = `
      /* PSP_PRACTICE_UX_V38 */
      .psp-practice-top {
        grid-template-columns: 38px 1fr auto !important;
        align-items: center !important;
      }

      .psp-practice-timer {
        min-width: 58px;
        height: 32px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        color: #0f172a;
        font-size: 12px;
        font-weight: 950;
      }

      .psp-result-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        margin-top: 12px;
      }

      #psp-sheet .psp-result-actions {
        margin-bottom: 0 !important;
      }

      .psp-result-actions .btn {
        min-height: 44px;
      }
    `;

    document.head.appendChild(style);
  }


  function injectMainLikeQuizStyles() {
    if (document.getElementById("psp-v39-main-like-quiz")) return;

    const style = document.createElement("style");
    style.id = "psp-v39-main-like-quiz";
    style.textContent = `
      /* PSP_MAIN_LIKE_QUIZ_V39 */
      .psp-main-quiz-shell {
        justify-content: flex-start !important;
      }

      .psp-main-quiz-top {
        display: grid !important;
        grid-template-columns: auto auto 1fr !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 4px 0 12px !important;
        margin: 0 !important;
        background: #f8fafc !important;
      }

      #psp-final-screen .psp-main-quiz-top {
        grid-template-columns: 1fr auto !important;
      }

      .psp-main-quiz-progress {
        color: #0f172a;
        font-size: 15px;
        line-height: 1;
        font-weight: 950;
      }

      .psp-main-quiz-sub {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.25;
        font-weight: 800;
        margin: 8px 0 10px;
      }

      .psp-main-quiz-stop {
        justify-self: end;
        min-width: 82px;
        height: 34px;
        border-radius: 14px;
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        color: #0f172a;
        font-size: 12px;
        font-weight: 950;
      }

      .psp-main-quiz-actions {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 9px !important;
        margin-top: 14px !important;
        padding-top: 0 !important;
      }

      .psp-main-quiz-actions-two {
        grid-template-columns: 1fr 1fr !important;
      }

      .psp-main-quiz-actions .btn[disabled] {
        opacity: .45;
        pointer-events: none;
      }

      .psp-practice-actions,
      .psp-final-actions {
        margin-top: 14px !important;
        padding-top: 0 !important;
      }

      #psp-practice-screen .psp-question-card,
      #psp-final-screen .psp-question-card {
        margin-top: 0 !important;
      }

      #psp-practice-screen .psp-practice-timer,
      #psp-final-screen .psp-timer {
        min-width: 58px;
        height: 32px;
      }
    `;

    document.head.appendChild(style);
  }


  function injectPracticeBuilderScrollStyles() {
    if (document.getElementById("psp-v40-practice-builder-scroll")) return;

    const style = document.createElement("style");
    style.id = "psp-v40-practice-builder-scroll";
    style.textContent = `
      /* PSP_PRACTICE_BUILDER_SCROLL_V40 */
      #psp-sheet .psp-filter-row,
      #psp-sheet .psp-topic-list {
        display: flex !important;
        flex-wrap: nowrap !important;
        gap: 8px !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        scroll-snap-type: x proximity !important;
        padding: 2px 2px 8px !important;
        margin: 0 -2px !important;
      }

      #psp-sheet .psp-filter-row::-webkit-scrollbar,
      #psp-sheet .psp-topic-list::-webkit-scrollbar {
        display: none !important;
      }

      #psp-sheet .psp-filter-row,
      #psp-sheet .psp-topic-list {
        scrollbar-width: none !important;
      }

      #psp-sheet .psp-filter-row button,
      #psp-sheet .psp-topic-list button {
        flex: 0 0 auto !important;
        scroll-snap-align: start !important;
        min-height: 34px !important;
        padding: 9px 13px !important;
        border-radius: 999px !important;
        white-space: nowrap !important;
        box-shadow: 0 4px 12px rgba(15,23,42,.035) !important;
      }

      #psp-sheet .psp-filter-row button.is-on,
      #psp-sheet .psp-topic-list button.is-on {
        border-color: rgba(37,99,235,.38) !important;
        background: rgba(37,99,235,.10) !important;
        color: #2563eb !important;
      }

      #psp-sheet .psp-panel {
        position: relative !important;
      }

      #psp-sheet .psp-panel::after {
        content: "" !important;
        position: absolute !important;
        top: 38px !important;
        right: 0 !important;
        width: 28px !important;
        height: 46px !important;
        pointer-events: none !important;
        border-radius: 0 18px 18px 0 !important;
        background: linear-gradient(90deg, rgba(255,255,255,0), #fff 78%) !important;
      }

      #psp-sheet .psp-panel.study::after {
        background: linear-gradient(90deg, rgba(255,255,255,0), #fff 78%) !important;
      }

      #psp-sheet .psp-panel-title {
        margin-bottom: 10px !important;
      }

      #psp-sheet .psp-mini-note {
        margin-top: 8px !important;
        line-height: 1.35 !important;
      }

      #psp-sheet .psp-actions {
        position: sticky !important;
        bottom: 0 !important;
        z-index: 4 !important;
        background: linear-gradient(180deg, rgba(248,250,252,0), #f8fafc 28%) !important;
        padding-top: 16px !important;
        padding-bottom: 2px !important;
        margin-top: 12px !important;
      }

      #psp-sheet .psp-actions .btn {
        min-height: 46px !important;
      }
    `;

    document.head.appendChild(style);
  }


  function injectReportDownloadStyles() {
    if (document.getElementById("psp-v41-report-download")) return;

    const style = document.createElement("style");
    style.id = "psp-v41-report-download";
    style.textContent = `
      /* PSP_REPORT_DOWNLOAD_V41 */
      #psp-sheet .psp-panel .psp-full {
        min-height: 46px;
      }

      #psp-sheet .psp-panel .psp-muted + .psp-full {
        margin-top: 12px;
      }
    `;

    document.head.appendChild(style);
  }




  function injectPracticeStateMachineStyles() {
    if (document.getElementById("psp-v46-practice-state-machine")) return;

    const style = document.createElement("style");
    style.id = "psp-v46-practice-state-machine";
    style.textContent = `
      /* PSP_PRACTICE_STATE_MACHINE_V46 */
      #psp-sheet .psp-active-practice-panel {
        border-color: rgba(37,99,235,.22);
        background: linear-gradient(135deg, rgba(37,99,235,.055), #fff);
      }

      #psp-sheet .psp-choice-button {
        width: 100%;
        text-align: left;
        appearance: none;
        -webkit-appearance: none;
      }

      #psp-sheet .psp-topic-list button,
      #psp-sheet .psp-filter-row button {
        cursor: pointer;
      }

      #psp-practice-screen .psp-main-quiz-stop {
        cursor: pointer;
      }

      #psp-practice-screen .psp-main-quiz-actions {
        margin-top: 14px !important;
      }
    `;

    document.head.appendChild(style);
  }


  function injectPracticeDynamicCountStyles() {
    if (document.getElementById("psp-v47-practice-dynamic-count")) return;

    const style = document.createElement("style");
    style.id = "psp-v47-practice-dynamic-count";
    style.textContent = `
      /* PSP_PRACTICE_DYNAMIC_COUNT_V47 */
      #psp-sheet .psp-panel.is-empty {
        border-color: rgba(245,158,11,.28);
        background: linear-gradient(135deg, rgba(245,158,11,.06), #fff);
      }

      #psp-sheet .psp-empty-builder {
        border-radius: 14px;
        border: 1px dashed rgba(245,158,11,.42);
        background: rgba(255,255,255,.72);
        padding: 12px;
        display: grid;
        gap: 5px;
      }

      #psp-sheet .psp-empty-builder b {
        color: #b45309;
        font-size: 13px;
        font-weight: 950;
      }

      #psp-sheet .psp-empty-builder span {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }

      #psp-sheet .psp-actions .btn[disabled] {
        opacity: .45;
        pointer-events: none;
      }
    `;

    document.head.appendChild(style);
  }


  function injectPracticeAvailabilityTextStyles() {
    if (document.getElementById("psp-v48-practice-availability-text")) return;

    const style = document.createElement("style");
    style.id = "psp-v48-practice-availability-text";
    style.textContent = `
      /* PSP_PRACTICE_AVAILABILITY_TEXT_V48 */
      #psp-sheet .psp-availability-note {
        margin-top: 8px;
        display: grid;
        gap: 4px;
      }

      #psp-sheet .psp-availability-note b {
        color: #0f172a;
        font-size: 12px;
        line-height: 1.3;
        font-weight: 900;
      }

      #psp-sheet .psp-availability-note span {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }
    `;

    document.head.appendChild(style);
  }


  function injectCertificateArchiveStyles() {
    if (document.getElementById("psp-v49-certificate-archive")) return;

    const style = document.createElement("style");
    style.id = "psp-v49-certificate-archive";
    style.textContent = `
      /* PSP_CERTIFICATE_ARCHIVE_V49 */
      #psp-sheet .psp-cert-tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 10px 0;
      }

      #psp-sheet .psp-cert-tabs button {
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        border-radius: 14px;
        min-height: 42px;
        color: rgba(15,23,42,.68);
        font-size: 12px;
        font-weight: 950;
      }

      #psp-sheet .psp-cert-tabs button.is-on {
        color: #2563eb;
        border-color: rgba(37,99,235,.30);
        background: rgba(37,99,235,.08);
      }

      #psp-sheet .psp-season-note {
        background: #fff;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 16px;
        padding: 12px;
        display: grid;
        gap: 4px;
        box-shadow: 0 8px 22px rgba(15,23,42,.05);
      }

      #psp-sheet .psp-season-note b {
        color: #0f172a;
        font-size: 13px;
        font-weight: 950;
      }

      #psp-sheet .psp-season-note span {
        color: rgba(15,23,42,.62);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }

      #psp-sheet .psp-cert-list {
        display: grid;
        gap: 10px;
        margin-top: 10px;
      }

      #psp-sheet .psp-cert-card {
        background: #fff;
        border: 1px solid rgba(226,232,240,.95);
        border-radius: 17px;
        padding: 12px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        align-items: center;
        box-shadow: 0 8px 22px rgba(15,23,42,.05);
      }

      #psp-sheet .psp-cert-card-kicker {
        color: #2563eb;
        font-size: 10px;
        line-height: 1.1;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
      }

      #psp-sheet .psp-cert-card-title {
        margin-top: 4px;
        color: #0f172a;
        font-size: 15px;
        line-height: 1.2;
        font-weight: 950;
      }

      #psp-sheet .psp-cert-card .btn {
        min-width: 88px;
        min-height: 38px;
      }

      #psp-sheet .psp-official-cert {
        background:
          linear-gradient(#fff, #fff) padding-box,
          linear-gradient(135deg, rgba(37,99,235,.55), rgba(245,158,11,.50)) border-box;
        border: 2px solid transparent;
        border-radius: 24px;
        padding: 16px;
        color: #0f172a;
        box-shadow: 0 16px 38px rgba(15,23,42,.10);
      }

      #psp-sheet .psp-official-cert-head {
        display: grid;
        grid-template-columns: 58px 1fr;
        gap: 12px;
        align-items: center;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(226,232,240,.95);
      }

      #psp-sheet .psp-official-logo {
        width: 54px;
        height: 54px;
        border-radius: 18px;
        background: linear-gradient(135deg, #2563eb, #60a5fa);
        color: #fff;
        display: grid;
        place-items: center;
        font-size: 16px;
        font-weight: 950;
      }

      #psp-sheet .psp-official-type {
        color: #0f172a;
        font-size: 17px;
        line-height: 1.15;
        font-weight: 950;
      }

      #psp-sheet .psp-official-body {
        padding: 18px 0 12px;
        text-align: center;
      }

      #psp-sheet .psp-official-label {
        color: rgba(15,23,42,.55);
        font-size: 11px;
        font-weight: 850;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

      #psp-sheet .psp-official-name {
        margin-top: 6px;
        color: #0f172a;
        font-size: 22px;
        line-height: 1.15;
        font-weight: 950;
      }

      #psp-sheet .psp-official-subject {
        margin-top: 10px;
        color: rgba(15,23,42,.78);
        font-size: 14px;
        line-height: 1.35;
        font-weight: 850;
      }

      #psp-sheet .psp-official-note {
        color: rgba(15,23,42,.60);
        font-size: 12px;
        line-height: 1.38;
        font-weight: 650;
        margin-top: 12px;
      }

      #psp-sheet .psp-official-footer {
        border-top: 1px solid rgba(226,232,240,.95);
        padding-top: 12px;
        display: grid;
        gap: 3px;
        text-align: center;
      }

      #psp-sheet .psp-official-footer span {
        color: rgba(15,23,42,.50);
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

      #psp-sheet .psp-official-footer b {
        color: #0f172a;
        font-size: 12px;
        font-weight: 950;
        word-break: break-word;
      }
    `;

    document.head.appendChild(style);
  }

  function injectProfileCleanupStyles() {
    if (document.getElementById("psp-v50-profile-cleanup")) return;

    const style = document.createElement("style");
    style.id = "psp-v50-profile-cleanup";
    style.textContent = `
      /* PSP_PROFILE_CLEANUP_V50 */
      [data-psp-hidden-academic-review="true"] {
        display: none !important;
      }
    `;

    document.head.appendChild(style);
  }


  function injectProfileCertRepairStyles() {
    if (document.getElementById("psp-v51-profile-cert-repair")) return;

    const style = document.createElement("style");
    style.id = "psp-v51-profile-cert-repair";
    style.textContent = `
      /* PSP_PROFILE_CERT_REPAIR_V51 */
      @media (max-width: 600px) {
        #psp-sheet.psp-sheet-fullscreen .psp-backdrop {
          justify-content: stretch !important;
        }

        #psp-sheet.psp-sheet-fullscreen .psp-sheet-card {
          width: 100vw !important;
          max-width: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function injectSeasonReviewTopicScopeStyles() {
    if (document.getElementById("psp-v56-season-review-topic-scope")) return;

    const style = document.createElement("style");
    style.id = "psp-v56-season-review-topic-scope";
    style.textContent = `
      /* PSP_SEASON_REVIEW_TOPIC_SCOPE_V56 */
      #psp-sheet .psp-season-scope-row {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 2px 10px;
        margin: 2px -2px 10px;
        scrollbar-width: none;
      }

      #psp-sheet .psp-season-scope-row::-webkit-scrollbar {
        display: none;
      }

      #psp-sheet .psp-season-scope-row button {
        border: 1px solid rgba(226,232,240,.95);
        background: #fff;
        color: rgba(15,23,42,.72);
        border-radius: 999px;
        padding: 9px 13px;
        font-size: 12px;
        line-height: 1;
        font-weight: 950;
        white-space: nowrap;
        flex: 0 0 auto;
      }

      #psp-sheet .psp-season-scope-row button.is-done:not(.is-on) {
        border-color: rgba(22,163,74,.22);
        background: rgba(22,163,74,.055);
        color: #166534;
      }

      #psp-sheet .psp-season-scope-row button.is-missed:not(.is-on) {
        border-color: rgba(239,68,68,.18);
        background: rgba(239,68,68,.045);
        color: #991b1b;
      }

      #psp-sheet .psp-season-scope-row button.is-on {
        border-color: rgba(37,99,235,.35);
        background: rgba(37,99,235,.10);
        color: #2563eb;
        box-shadow: inset 0 0 0 1px rgba(37,99,235,.10);
      }

      #psp-sheet .psp-topic-panel-note {
        margin-bottom: 10px;
      }

      #psp-sheet .psp-topic-evidence-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      #psp-sheet .psp-topic-evidence {
        display: inline-grid;
        grid-template-columns: auto;
        gap: 2px;
        border-radius: 999px;
        padding: 8px 10px;
        max-width: 100%;
      }

      #psp-sheet .psp-topic-evidence b {
        font-size: 12px;
        line-height: 1.1;
        font-weight: 950;
      }

      #psp-sheet .psp-topic-evidence small {
        font-size: 10px;
        line-height: 1.1;
        font-weight: 900;
        opacity: .78;
      }

      #psp-sheet .psp-topic-evidence.is-mastered {
        color: #166534;
        background: rgba(22,163,74,.10);
      }

      #psp-sheet .psp-topic-evidence.is-study {
        color: #b45309;
        background: rgba(245,158,11,.14);
      }

      #psp-sheet .psp-study-cta,
      #psp-sheet .psp-report-download {
        width: 100%;
        margin-top: 12px;
      }

      #psp-sheet .psp-empty-topic-note {
        border-radius: 14px;
        padding: 11px 12px;
        color: rgba(15,23,42,.58);
        background: rgba(248,250,252,.9);
        font-size: 12px;
        line-height: 1.35;
        font-weight: 750;
      }

      #psp-sheet .psp-tour-not-done-panel {
        border-color: rgba(37,99,235,.18);
        background: rgba(37,99,235,.045);
      }
    `;

    document.head.appendChild(style);
  }



  function closeSeasonReviewSheet() {
    try {
      if (typeof closeSheet === "function") {
        closeSheet();
        return;
      }
    } catch {}

    const root = document.getElementById("psp-sheet");
    if (root) root.remove();

    document.body.classList.remove("psp-sheet-open", "psp-lock-scroll", "modal-open");
  }

  function downloadDetailedReport(key, scope = "all") {
    const d = DATA[key] || DATA.economics;
    const review = typeof getSeasonScopeReviewData === "function"
      ? getSeasonScopeReviewData(key, scope)
      : null;

    const mastered = (review?.mastered || []).map((item) => `- ${item.topic}: ${item.meta}`);
    const study = (review?.study || []).map((item) => `- ${item.topic}: ${item.meta}`);

    const lines = [
      "iClub detailed review",
      "",
      `${d.title} · ${review?.title || "Season review"}`,
      "",
      "Summary",
      `Tours: ${d.tours || "—"}`,
      `Average: ${d.avg || "—"}`,
      `Region rank: ${d.rank || "—"}`,
      "",
      "Mastered topics",
      ...(mastered.length ? mastered : ["- No topics with enough evidence yet."]),
      "",
      "Topics to study",
      ...(study.length ? study : ["- No study topics identified yet."]),
      "",
      "What this report will include in production",
      "- activity by day",
      "- practice vs tour dynamics",
      "- repeated mistakes by topic",
      "- anonymized comparison by class, district and region",
      "- recommended study plan"
    ];

    const blob = new Blob([lines.join("\\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `iclub-${String(key || "subject")}-${String(scope || "all")}-review.txt`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  }



  function isBlockingPreviewAssessmentSheet(root) {
    if (!root) return false;

    const text = String(root.innerText || root.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const hasAnswerAction = !!root.querySelector(
      '[data-psp-action="practice-answer"],' +
      '[data-psp-action="final-answer"],' +
      '[data-psp-action="quiz-answer"],' +
      '[data-psp-action="answer"],' +
      '[data-psp-action="submit-answer"]'
    );

    if (hasAnswerAction) return true;

    return (
      text.includes("финальный вопрос") ||
      text.includes("вопрос практики") ||
      text.includes("final question") ||
      text.includes("practice question") ||
      text.includes("yakuniy savol") ||
      text.includes("amaliyot savoli")
    );
  }

  function applyPreviewSheetTabbarMode() {
    const root = document.getElementById("psp-sheet");
    if (!root) return;

    const blocking = isBlockingPreviewAssessmentSheet(root);

    root.classList.toggle("psp-keep-bottom-tabbar", !blocking);
    root.classList.toggle("psp-blocking-assessment", blocking);
  }

  function closePreviewSheetForBottomNav() {
    const root = document.getElementById("psp-sheet");
    if (!root || !root.classList.contains("psp-keep-bottom-tabbar")) return;

    try {
      if (typeof closeSheet === "function") {
        closeSheet();
      } else {
        root.remove();
      }
    } catch {
      root.remove();
    }

    document.body.classList.remove(
      "psp-sheet-open",
      "psp-lock-scroll",
      "modal-open",
      "sheet-open",
      "no-scroll"
    );
  }

  function bindPreviewBottomNavPassthrough() {
    if (window.__pspBottomNavPassthroughBound) return;
    window.__pspBottomNavPassthroughBound = true;

    document.addEventListener("click", (event) => {
      const navTarget = event.target?.closest?.(
        "#bottom-nav," +
        ".bottom-nav," +
        ".app-bottom-nav," +
        ".tabbar," +
        ".bottom-tabbar," +
        ".nav-item," +
        ".tab-button," +
        "[data-tab]," +
        "[data-nav]"
      );

      if (!navTarget) return;

      closePreviewSheetForBottomNav();
    }, true);
  }

  function observePreviewSheetTabbarMode() {
    if (window.__pspSheetTabbarObserverBound) {
      applyPreviewSheetTabbarMode();
      return;
    }

    window.__pspSheetTabbarObserverBound = true;

    const observer = new MutationObserver(() => {
      applyPreviewSheetTabbarMode();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-context", "data-view"]
    });

    applyPreviewSheetTabbarMode();
  }

  function injectPreviewBottomTabbarSheetStyles() {
    if (document.getElementById("psp-v58-keep-bottom-tabbar")) return;

    const style = document.createElement("style");
    style.id = "psp-v58-keep-bottom-tabbar";
    style.textContent = `
      /* PSP_KEEP_BOTTOM_TABBAR_V58 */
      :root {
        --psp-bottom-tabbar-space: calc(64px + env(safe-area-inset-bottom, 0px));
      }

      #psp-sheet.psp-keep-bottom-tabbar {
        position: fixed !important;
        inset: 0 0 var(--psp-bottom-tabbar-space) 0 !important;
        height: auto !important;
        pointer-events: none !important;
        z-index: 999 !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-backdrop {
        position: absolute !important;
        inset: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        padding: 0 !important;
        pointer-events: none !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card {
        pointer-events: auto !important;
        width: 100% !important;
        max-width: 430px !important;
        min-height: 100% !important;
        max-height: 100% !important;
        overflow: auto !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 auto !important;
        padding-bottom: 18px !important;
        -webkit-overflow-scrolling: touch;
      }

      #psp-sheet.psp-keep-bottom-tabbar.psp-sheet-fullscreen .psp-sheet-card {
        width: 100% !important;
        max-width: 430px !important;
        max-height: 100% !important;
      }

      #psp-sheet.psp-blocking-assessment {
        z-index: 1100 !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-backdrop {
        pointer-events: auto !important;
      }

      @media (max-width: 600px) {
        #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card {
          max-width: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function injectSafeSheetMainWidthStyles() {
    if (document.getElementById("psp-v59-safe-sheet-main-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v59-safe-sheet-main-width";
    style.textContent = `
      /* PSP_SAFE_SHEET_MAIN_WIDTH_V59 */
      #psp-sheet.psp-keep-bottom-tabbar {
        left: 0 !important;
        right: auto !important;
        top: 0 !important;
        bottom: var(--psp-bottom-tabbar-space) !important;
        width: 100% !important;
        max-width: 430px !important;
        margin: 0 !important;
        transform: none !important;
        overflow: hidden !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-backdrop {
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        display: block !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card {
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card,
      #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card * {
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar .psp-report-grid,
      #psp-sheet.psp-keep-bottom-tabbar .psp-panel,
      #psp-sheet.psp-keep-bottom-tabbar .psp-cert-tabs,
      #psp-sheet.psp-keep-bottom-tabbar .psp-cert-list,
      #psp-sheet.psp-keep-bottom-tabbar .psp-season-scope-row {
        max-width: none !important;
      }

      @media (max-width: 600px) {
        #psp-sheet.psp-keep-bottom-tabbar {
          width: 100vw !important;
          max-width: none !important;
        }

        #psp-sheet.psp-keep-bottom-tabbar .psp-sheet-card {
          width: 100vw !important;
          max-width: none !important;
        }
      }

      @media (min-width: 431px) {
        #psp-sheet.psp-keep-bottom-tabbar {
          width: 430px !important;
          max-width: 430px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function enforceSafeSheetFullWidth() {
    const root = document.getElementById("psp-sheet");
    if (!root || !root.classList.contains("psp-keep-bottom-tabbar")) return;
    if (root.classList.contains("psp-blocking-assessment")) return;

    const backdrop = root.querySelector(".psp-backdrop");
    const card = root.querySelector(".psp-sheet-card");

    Object.assign(root.style, {
      position: "fixed",
      left: "0",
      right: "auto",
      top: "0",
      bottom: "var(--psp-bottom-tabbar-space)",
      width: "100vw",
      minWidth: "100vw",
      maxWidth: "none",
      margin: "0",
      transform: "none",
      overflow: "hidden",
      background: "#f8fafc",
      pointerEvents: "none"
    });

    if (backdrop) {
      Object.assign(backdrop.style, {
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        width: "100%",
        minWidth: "100%",
        maxWidth: "none",
        margin: "0",
        padding: "0",
        transform: "none",
        display: "block",
        background: "#f8fafc",
        pointerEvents: "none"
      });
    }

    if (card) {
      Object.assign(card.style, {
        width: "100%",
        minWidth: "100%",
        maxWidth: "none",
        height: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        margin: "0",
        borderRadius: "0",
        boxShadow: "none",
        overflowY: "auto",
        overflowX: "hidden",
        pointerEvents: "auto",
        boxSizing: "border-box"
      });
    }
  }

  function observeSafeSheetFullWidth() {
    if (window.__pspSafeSheetFullWidthObserverBound) {
      enforceSafeSheetFullWidth();
      return;
    }

    window.__pspSafeSheetFullWidthObserverBound = true;

    const run = () => {
      enforceSafeSheetFullWidth();
      requestAnimationFrame(enforceSafeSheetFullWidth);
      setTimeout(enforceSafeSheetFullWidth, 60);
    };

    new MutationObserver(run).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    run();
  }

  function injectSafeSheetNoSideGapStyles() {
    if (document.getElementById("psp-v60-safe-sheet-no-side-gap")) return;

    const style = document.createElement("style");
    style.id = "psp-v60-safe-sheet-no-side-gap";
    style.textContent = `
      /* PSP_SAFE_SHEET_NO_SIDE_GAP_V60 */
      #psp-sheet.psp-keep-bottom-tabbar:not(.psp-blocking-assessment) {
        position: fixed !important;
        left: 0 !important;
        right: auto !important;
        top: 0 !important;
        bottom: var(--psp-bottom-tabbar-space) !important;
        width: 100vw !important;
        min-width: 100vw !important;
        max-width: none !important;
        margin: 0 !important;
        transform: none !important;
        overflow: hidden !important;
        background: #f8fafc !important;
        pointer-events: none !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar:not(.psp-blocking-assessment) .psp-backdrop {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        display: block !important;
        background: #f8fafc !important;
        pointer-events: none !important;
      }

      #psp-sheet.psp-keep-bottom-tabbar:not(.psp-blocking-assessment) .psp-sheet-card {
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        pointer-events: auto !important;
        box-sizing: border-box !important;
      }
    `;

    document.head.appendChild(style);
  }



  function enforceAssessmentFullWidth() {
    const root = document.getElementById("psp-sheet");
    if (!root) return;

    const isAssessment =
      root.classList.contains("psp-blocking-assessment") ||
      (
        root.classList.contains("psp-sheet-fullscreen") &&
        !root.classList.contains("psp-keep-bottom-tabbar")
      );

    if (!isAssessment) return;

    const backdrop = root.querySelector(".psp-backdrop");
    const card = root.querySelector(".psp-sheet-card");

    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      minWidth: "100vw",
      maxWidth: "none",
      height: "100dvh",
      minHeight: "100dvh",
      maxHeight: "100dvh",
      margin: "0",
      transform: "none",
      overflow: "hidden",
      background: "#f8fafc",
      zIndex: "1200"
    });

    if (backdrop) {
      Object.assign(backdrop.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        minWidth: "100%",
        maxWidth: "none",
        height: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        margin: "0",
        padding: "0",
        transform: "none",
        display: "block",
        background: "#f8fafc"
      });
    }

    if (card) {
      Object.assign(card.style, {
        width: "100%",
        minWidth: "100%",
        maxWidth: "none",
        height: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        margin: "0",
        borderRadius: "0",
        boxShadow: "none",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        background: "#f8fafc"
      });
    }
  }

  function observeAssessmentFullWidth() {
    if (window.__pspAssessmentFullWidthObserverBound) {
      enforceAssessmentFullWidth();
      return;
    }

    window.__pspAssessmentFullWidthObserverBound = true;

    const run = () => {
      enforceAssessmentFullWidth();
      requestAnimationFrame(enforceAssessmentFullWidth);
      setTimeout(enforceAssessmentFullWidth, 80);
    };

    new MutationObserver(run).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    window.addEventListener("resize", run);
    run();
  }

  function injectAssessmentFullWidthStyles() {
    if (document.getElementById("psp-v61-assessment-full-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v61-assessment-full-width";
    style.textContent = `
      /* PSP_ASSESSMENT_FULL_WIDTH_V61 */
      #psp-sheet.psp-blocking-assessment,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        min-width: 100vw !important;
        max-width: none !important;
        height: 100dvh !important;
        min-height: 100dvh !important;
        max-height: 100dvh !important;
        margin: 0 !important;
        transform: none !important;
        overflow: hidden !important;
        background: #f8fafc !important;
        z-index: 1200 !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-backdrop,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-backdrop {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
        transform: none !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-sheet-card,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card {
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        box-sizing: border-box !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-sheet-card *,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card * {
        box-sizing: border-box !important;
      }
    `;

    document.head.appendChild(style);
  }



  function injectAssessmentContentMainWidthStyles() {
    if (document.getElementById("psp-v62-assessment-content-main-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v62-assessment-content-main-width";
    style.textContent = `
      /* PSP_ASSESSMENT_CONTENT_MAIN_WIDTH_V62 */

      #psp-sheet.psp-blocking-assessment .psp-sheet-card,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card {
        padding: 14px 16px 22px !important;
        width: 100% !important;
        max-width: none !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-sheet-card > *,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card > * {
        width: 100% !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-sheet-card > * > *,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card > * > * {
        max-width: none !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-blocking-assessment :is(
        .psp-panel,
        .psp-card,
        .panel-card,
        .card,
        .psp-question-card,
        .psp-question-panel,
        .psp-option-list,
        .psp-options,
        .psp-actions,
        .psp-quiz-actions
      ),
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) :is(
        .psp-panel,
        .psp-card,
        .panel-card,
        .card,
        .psp-question-card,
        .psp-question-panel,
        .psp-option-list,
        .psp-options,
        .psp-actions,
        .psp-quiz-actions
      ) {
        width: 100% !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-blocking-assessment :is(
        button,
        .btn,
        .psp-option,
        .answer-option,
        [role="button"]
      ),
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) :is(
        button,
        .btn,
        .psp-option,
        .answer-option,
        [role="button"]
      ) {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      #psp-sheet.psp-blocking-assessment .psp-sheet-card .btn.primary,
      #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card .btn.primary {
        width: 100% !important;
      }

      @media (max-width: 600px) {
        #psp-sheet.psp-blocking-assessment .psp-sheet-card,
        #psp-sheet.psp-sheet-fullscreen:not(.psp-keep-bottom-tabbar) .psp-sheet-card {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function isPreviewQuestionScreenV63(root) {
    if (!root) return false;

    const text = String(root.innerText || root.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return (
      text.includes("вопрос практики") ||
      text.includes("финальный вопрос") ||
      text.includes("practice question") ||
      text.includes("final question") ||
      text.includes("amaliyot savoli") ||
      text.includes("yakuniy savol")
    );
  }

  function findQuestionCardV63(root) {
    const candidates = Array.from(root.querySelectorAll("div,section,article,form"));

    const label = candidates.find((el) => {
      const text = String(el.innerText || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      return (
        text === "вопрос практики" ||
        text === "финальный вопрос" ||
        text === "practice question" ||
        text === "final question" ||
        text === "amaliyot savoli" ||
        text === "yakuniy savol"
      );
    });

    if (!label) return null;

    let cur = label;
    let best = null;
    let guard = 0;

    while (cur && cur !== root && guard < 8) {
      const buttons = cur.querySelectorAll("button,[role='button']");
      const text = String(cur.innerText || cur.textContent || "").toLowerCase();
      const rect = cur.getBoundingClientRect();

      if (
        buttons.length >= 4 &&
        rect.width >= 220 &&
        text.includes(label.textContent.trim().toLowerCase())
      ) {
        best = cur;
      }

      cur = cur.parentElement;
      guard += 1;
    }

    return best;
  }

  function forceQuestionCardMainWidthV63() {
    const root = document.getElementById("psp-sheet");
    if (!root || !isPreviewQuestionScreenV63(root)) return;

    root.classList.add("psp-question-main-width-v63");

    const sheetCard = root.querySelector(".psp-sheet-card") || root;
    const questionCard = findQuestionCardV63(root);

    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      minWidth: "100vw",
      maxWidth: "none",
      height: "100dvh",
      minHeight: "100dvh",
      maxHeight: "100dvh",
      margin: "0",
      overflow: "hidden",
      background: "#f8fafc"
    });

    Object.assign(sheetCard.style, {
      width: "100%",
      minWidth: "100%",
      maxWidth: "none",
      height: "100%",
      minHeight: "100%",
      maxHeight: "100%",
      margin: "0",
      padding: "10px 12px 22px",
      borderRadius: "0",
      boxShadow: "none",
      overflowY: "auto",
      overflowX: "hidden",
      boxSizing: "border-box",
      background: "#f8fafc"
    });

    if (questionCard) {
      Object.assign(questionCard.style, {
        width: "100%",
        minWidth: "0",
        maxWidth: "none",
        marginLeft: "0",
        marginRight: "0",
        boxSizing: "border-box"
      });

      Array.from(questionCard.querySelectorAll("button,[role='button']")).forEach((btn) => {
        Object.assign(btn.style, {
          width: "100%",
          maxWidth: "none",
          boxSizing: "border-box"
        });
      });
    }

    Array.from(root.querySelectorAll("button,[role='button']")).forEach((btn) => {
      const text = String(btn.innerText || btn.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      if (
        text === "ответить" ||
        text === "answer" ||
        text === "javob berish" ||
        text === "javob"
      ) {
        Object.assign(btn.style, {
          width: "100%",
          maxWidth: "none",
          boxSizing: "border-box"
        });

        if (btn.parentElement && btn.parentElement !== sheetCard) {
          Object.assign(btn.parentElement.style, {
            width: "100%",
            maxWidth: "none",
            marginLeft: "0",
            marginRight: "0",
            boxSizing: "border-box"
          });
        }
      }
    });
  }

  function observeQuestionCardMainWidthV63() {
    if (window.__pspQuestionCardMainWidthV63Bound) {
      forceQuestionCardMainWidthV63();
      return;
    }

    window.__pspQuestionCardMainWidthV63Bound = true;

    const run = () => {
      forceQuestionCardMainWidthV63();
      requestAnimationFrame(forceQuestionCardMainWidthV63);
      setTimeout(forceQuestionCardMainWidthV63, 80);
      setTimeout(forceQuestionCardMainWidthV63, 180);
    };

    new MutationObserver(run).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    window.addEventListener("resize", run);
    run();
  }

  function injectQuestionCardMainWidthV63Styles() {
    if (document.getElementById("psp-v63-question-card-main-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v63-question-card-main-width";
    style.textContent = `
      /* PSP_QUESTION_CARD_MAIN_WIDTH_V63 */
      #psp-sheet.psp-question-main-width-v63 {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        min-width: 100vw !important;
        max-width: none !important;
        height: 100dvh !important;
        min-height: 100dvh !important;
        max-height: 100dvh !important;
        margin: 0 !important;
        overflow: hidden !important;
        background: #f8fafc !important;
      }

      #psp-sheet.psp-question-main-width-v63 .psp-sheet-card {
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        padding: 10px 12px 22px !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        background: #f8fafc !important;
        box-sizing: border-box !important;
      }
    `;

    document.head.appendChild(style);
  }



  function isVisibleQuizNodeV65(el) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle ? window.getComputedStyle(el) : null;

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style?.display !== "none" &&
      style?.visibility !== "hidden" &&
      style?.opacity !== "0"
    );
  }

  function getVisibleQuizContextV65() {
    const question =
      Array.from(document.querySelectorAll("#practice-question,#tour-question,.question-text"))
        .find((el) => {
          if (!isVisibleQuizNodeV65(el)) return false;

          const text = String(el.innerText || el.textContent || "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

          return text && !text.includes("вопрос тура…") && !text.includes("вопрос практики…");
        });

    if (!question) return null;

    const screen =
      question.closest("#courses-practice-quiz,#courses-tour-quiz,.stack-screen[data-screen='practice-quiz'],.stack-screen[data-screen='tour-quiz']") ||
      question.closest(".stack-screen") ||
      question.closest("#psp-sheet");

    if (!screen || !isVisibleQuizNodeV65(screen)) return null;

    const options =
      screen.querySelector("#practice-options,#tour-options,.options") ||
      question.parentElement?.querySelector?.(".options");

    const submit =
      screen.querySelector("#practice-submit-btn,#tour-next-btn,[data-action='practice-submit'],[data-action='tour-next']");

    const card =
      question.closest(".card,.panel-card,.psp-panel,.psp-card,.psp-question-card") ||
      options?.closest?.(".card,.panel-card,.psp-panel,.psp-card,.psp-question-card");

    return { screen, question, options, submit, card };
  }

  function setWideBoxV65(el) {
    if (!el) return;

    Object.assign(el.style, {
      width: "100%",
      minWidth: "0",
      maxWidth: "none",
      marginLeft: "0",
      marginRight: "0",
      boxSizing: "border-box"
    });
  }

  function forceVisibleQuizDomWidthV65() {
    const ctx = getVisibleQuizContextV65();
    if (!ctx) return;

    const { screen, question, options, submit, card } = ctx;

    screen.classList.add("psp-visible-quiz-width-v65");

    setWideBoxV65(screen);

    const top =
      screen.querySelector(".quiz-top,.tour-head") ||
      screen.firstElementChild;

    setWideBoxV65(top);
    setWideBoxV65(card);
    setWideBoxV65(question);
    setWideBoxV65(options);

    // The real cause: a parent wrapper/card can keep old max-width.
    // Walk from the question card up to the active quiz screen and force only that chain.
    let current = card || question.parentElement;
    let guard = 0;

    while (current && current !== screen && guard < 12) {
      setWideBoxV65(current);
      current = current.parentElement;
      guard += 1;
    }

    if (options) {
      Object.assign(options.style, {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "10px"
      });

      Array.from(options.children || []).forEach(setWideBoxV65);
      Array.from(options.querySelectorAll("button,[role='button'],.option,.option-btn,.answer-option")).forEach(setWideBoxV65);
    }

    const actions =
      submit?.closest?.(".actions-row") ||
      screen.querySelector(".actions-row");

    setWideBoxV65(actions);
    setWideBoxV65(submit);

    if (actions) {
      Object.assign(actions.style, {
        display: "flex"
      });

      Array.from(actions.children || []).forEach((child) => {
        setWideBoxV65(child);
        child.style.flex = "1 1 auto";
      });
    }
  }

  function observeVisibleQuizDomWidthV65() {
    if (window.__pspVisibleQuizDomWidthV65Bound) {
      forceVisibleQuizDomWidthV65();
      return;
    }

    window.__pspVisibleQuizDomWidthV65Bound = true;

    const run = () => {
      forceVisibleQuizDomWidthV65();
      requestAnimationFrame(forceVisibleQuizDomWidthV65);
      setTimeout(forceVisibleQuizDomWidthV65, 80);
      setTimeout(forceVisibleQuizDomWidthV65, 220);
    };

    new MutationObserver(run).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"]
    });

    document.addEventListener("click", run, true);
    window.addEventListener("resize", run);
    run();
  }

  function injectVisibleQuizDomWidthV65Styles() {
    if (document.getElementById("psp-v65-visible-quiz-dom-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v65-visible-quiz-dom-width";
    style.textContent = `
      /* PSP_VISIBLE_QUIZ_DOM_WIDTH_V65 */
      .psp-visible-quiz-width-v65,
      .psp-visible-quiz-width-v65 .quiz-top,
      .psp-visible-quiz-width-v65 .tour-head,
      .psp-visible-quiz-width-v65 > .card,
      .psp-visible-quiz-width-v65 .card,
      .psp-visible-quiz-width-v65 .question-text,
      .psp-visible-quiz-width-v65 .options,
      .psp-visible-quiz-width-v65 .actions-row {
        width: 100% !important;
        min-width: 0 !important;
        max-width: none !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
      }

      .psp-visible-quiz-width-v65 .options {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
      }

      .psp-visible-quiz-width-v65 .options > *,
      .psp-visible-quiz-width-v65 .options button,
      .psp-visible-quiz-width-v65 .options [role="button"],
      .psp-visible-quiz-width-v65 .option,
      .psp-visible-quiz-width-v65 .option-btn,
      .psp-visible-quiz-width-v65 .answer-option,
      #practice-submit-btn,
      #tour-next-btn {
        width: 100% !important;
        min-width: 0 !important;
        max-width: none !important;
        box-sizing: border-box !important;
      }

      .psp-visible-quiz-width-v65 > .actions-row,
      .psp-visible-quiz-width-v65 .actions-row {
        display: flex !important;
      }

      .psp-visible-quiz-width-v65 > .actions-row > *,
      .psp-visible-quiz-width-v65 .actions-row > * {
        flex: 1 1 auto !important;
      }
    `;

    document.head.appendChild(style);
  }



  function injectPreviewAssessmentShellWidthFix() {
    if (document.getElementById("psp-v66-preview-shell-full-width")) return;

    const style = document.createElement("style");
    style.id = "psp-v66-preview-shell-full-width";
    style.textContent = `
      /* PSP_PREVIEW_SHELL_FULL_WIDTH_V66 */
      #psp-practice-screen,
      #psp-final-screen {
        justify-content: stretch !important;
        align-items: stretch !important;
      }

      #psp-practice-screen .psp-practice-shell,
      #psp-final-screen .psp-final-shell {
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
      }

      #psp-practice-screen .psp-practice-shell > *,
      #psp-final-screen .psp-final-shell > * {
        box-sizing: border-box !important;
      }
    `;

    document.head.appendChild(style);
  }



  function pspGrandRatingSubjectV69() {
    const select = document.getElementById("ratings-subject");
    const value = String(select?.value || "").trim().toLowerCase();
    const label = String(select?.selectedOptions?.[0]?.textContent || "").trim().toLowerCase();
    const known = Object.keys(DATA || {});

    if (known.includes(value)) return value;

    const combined = `${value} ${label}`;
    if (combined.includes("econom") || combined.includes("эконом")) return "economics";
    if (combined.includes("math") || combined.includes("мат")) return "mathematics";
    if (combined.includes("bio") || combined.includes("био")) return "biology";
    if (combined.includes("chem") || combined.includes("хим")) return "chemistry";
    if (combined.includes("inform") || combined.includes("информ")) return "informatics";

    return getSubject();
  }

  function pspGrandRatingScopeV69() {
    const active = document.querySelector("#view-ratings .seg-btn.is-active");
    return String(active?.dataset?.scope || "district").trim() || "district";
  }

  function pspEnsureGrandFinalOptionV69() {
    const select = document.getElementById("ratings-tour");
    if (!select) return;

    let option = select.querySelector('option[value="grand_final"]');
    if (!option) {
      option = document.createElement("option");
      option.value = "grand_final";
      option.dataset.pspGrandFinal = "true";
      select.appendChild(option);
    }

    option.textContent = "Grand Final";
  }

  function pspIsGrandFinalSelectedV69() {
    return String(document.getElementById("ratings-tour")?.value || "") === "grand_final";
  }

  function pspGrandFinalPublishedV69() {
    const phase = typeof getPhase === "function" ? getPhase() : "auto";
    return phase === "auto" || phase === "grand_ready";
  }

  function pspGrandFinalRowsV69(subjectKey, scope) {
    const d = DATA[subjectKey] || DATA.economics;
    const title = d?.title || "Subject";
    const offset = scope === "country" ? 0 : scope === "region" ? 2 : 4;

    const rows = [
      ["Azizbek Karimov", "Presidential School · 10", 19, "11:42"],
      ["Madina Rustamova", "Specialized School · 11", 18, "12:10"],
      ["Sardorbek Aliyev", "School 21 · 10", 18, "12:38"],
      ["YOU", "iClub participant", 17, "13:04"],
      ["Nigina Sobirova", "School 7 · 9", 16, "12:55"],
      ["Javohir Ismoilov", "Academic Lyceum · 11", 15, "14:21"],
      ["Malika Tursunova", "School 12 · 10", 14, "13:47"],
      ["Bekzod Nazarov", "Specialized School · 9", 13, "15:08"]
    ];

    return rows.map(([name, meta, score, time], index) => ({
      rank: index + 1 + offset,
      name,
      meta: `${title} · ${meta}`,
      score,
      percent: Math.round((Number(score) / 20) * 100),
      time,
      isMe: name === "YOU"
    }));
  }

  function pspRenderGrandFinalRatingsV69() {
    pspEnsureGrandFinalOptionV69();

    if (!pspIsGrandFinalSelectedV69()) return;

    const list = document.getElementById("ratings-list");
    if (!list) return;

    const hint = document.getElementById("ratings-viewer-hint");
    const mybar = document.getElementById("ratings-mybar");
    const subjectKey = pspGrandRatingSubjectV69();
    const scope = pspGrandRatingScopeV69();
    const d = DATA[subjectKey] || DATA.economics;

    if (!pspGrandFinalPublishedV69()) {
      if (hint) {
        hint.style.display = "";
        hint.textContent = tr(
          "Финальный рейтинг появится после завершения финала и расчёта результатов.",
          "Final reyting final yakunlanib, natijalar hisoblangandan keyin ochiladi.",
          "Grand Final rating will appear after the final ends and results are calculated."
        );
      }

      list.innerHTML = `
        <div class="empty muted psp-grand-rating-empty-v69">
          <b>${esc(d.title || "")} · Grand Final</b>
          <span>${esc(tr(
            "Результаты ещё не опубликованы.",
            "Natijalar hali e’lon qilinmagan.",
            "Results are not published yet."
          ))}</span>
        </div>
      `;

      if (mybar) mybar.style.display = "none";
      return;
    }

    const rows = pspGrandFinalRowsV69(subjectKey, scope);
    const me = rows.find((row) => row.isMe);

    if (hint) {
      hint.style.display = "";
      hint.textContent = tr(
        `${d.title} · Grand Final. Финальный рейтинг после 7 туров.`,
        `${d.title} · Grand Final. 7 turdan keyingi final reyting.`,
        `${d.title} · Grand Final. Final rating after 7 tours.`
      );
    }

    list.innerHTML = rows.map((row) => `
      <div class="psp-grand-rating-row-v69 ${row.isMe ? "is-me" : ""}">
        <div class="psp-grand-rank-v69">#${esc(row.rank)}</div>
        <div class="psp-grand-student-v69">
          <b>${esc(row.isMe ? tr("Вы", "Siz", "You") : row.name)}</b>
          <span>${esc(row.meta)}</span>
        </div>
        <div class="psp-grand-score-v69">
          <b>${esc(row.score)}/20</b>
          <span>${esc(row.percent)}%</span>
        </div>
        <div class="psp-grand-time-v69">${esc(row.time)}</div>
      </div>
    `).join("");

    if (mybar && me) {
      mybar.style.display = "";

      const rankEl = document.getElementById("ratings-mybar-rank");
      const totalEl = document.getElementById("ratings-mybar-total");
      const scoreEl = document.getElementById("ratings-mybar-score");
      const timeEl = document.getElementById("ratings-mybar-time");

      if (rankEl) rankEl.textContent = `#${me.rank}`;
      if (totalEl) totalEl.textContent = tr(
        "Grand Final · финальный рейтинг",
        "Grand Final · final reyting",
        "Grand Final · final rating"
      );
      if (scoreEl) scoreEl.textContent = `${me.score}/20`;
      if (timeEl) timeEl.textContent = me.time;
    }
  }

  function pspScheduleGrandFinalRatingsV69() {
    setTimeout(() => {
      pspEnsureGrandFinalOptionV69();
      pspRenderGrandFinalRatingsV69();
    }, 0);

    setTimeout(() => {
      pspEnsureGrandFinalOptionV69();
      pspRenderGrandFinalRatingsV69();
    }, 160);
  }

  function pspBindGrandFinalRatingsV69() {
    if (window.__pspGrandFinalRatingsV69Bound) return;
    window.__pspGrandFinalRatingsV69Bound = true;

    document.addEventListener("change", (event) => {
      const id = event.target?.id || "";
      if (id === "ratings-tour" || id === "ratings-subject") {
        pspScheduleGrandFinalRatingsV69();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.target?.closest?.('[data-tab="ratings"]') ||
        event.target?.closest?.("#view-ratings .seg-btn")
      ) {
        pspScheduleGrandFinalRatingsV69();
      }
    });

    pspScheduleGrandFinalRatingsV69();
  }

  function pspInjectGrandFinalRatingsStylesV69() {
    if (document.getElementById("psp-grand-final-ratings-v69")) return;

    const style = document.createElement("style");
    style.id = "psp-grand-final-ratings-v69";
    style.textContent = `
      /* PSP_GRAND_FINAL_RATINGS_V69 */
      #view-ratings .psp-grand-rating-row-v69 {
        display: grid;
        grid-template-columns: 46px minmax(0, 1fr) 72px 58px;
        align-items: center;
        gap: 10px;
        padding: 12px 10px;
        border-radius: 16px;
        background: #fff;
        border: 1px solid rgba(15,23,42,.08);
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-grand-rating-row-v69 + .psp-grand-rating-row-v69 {
        margin-top: 10px;
      }

      #view-ratings .psp-grand-rating-row-v69.is-me {
        border-color: rgba(47,111,214,.34);
        background: linear-gradient(180deg, rgba(47,111,214,.08), rgba(255,255,255,.98));
        box-shadow: 0 0 0 1px rgba(47,111,214,.06) inset, 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-grand-rank-v69 {
        font-size: 14px;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-grand-student-v69 {
        min-width: 0;
        display: grid;
        gap: 3px;
      }

      #view-ratings .psp-grand-student-v69 b,
      #view-ratings .psp-grand-student-v69 span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #view-ratings .psp-grand-student-v69 b {
        font-size: 13px;
        line-height: 1.15;
        color: #0f172a;
      }

      #view-ratings .psp-grand-student-v69 span {
        font-size: 11px;
        line-height: 1.15;
        font-weight: 700;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-grand-score-v69 {
        text-align: right;
        display: grid;
        gap: 2px;
      }

      #view-ratings .psp-grand-score-v69 b {
        font-size: 13px;
        line-height: 1.1;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-grand-score-v69 span {
        font-size: 11px;
        line-height: 1.1;
        font-weight: 850;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-grand-time-v69 {
        text-align: right;
        font-size: 12px;
        font-weight: 900;
        color: rgba(15,23,42,.72);
        white-space: nowrap;
      }

      #view-ratings .psp-grand-rating-empty-v69 {
        display: grid;
        gap: 6px;
      }

      @media (max-width: 360px) {
        #view-ratings .psp-grand-rating-row-v69 {
          grid-template-columns: 38px minmax(0, 1fr) 62px 52px;
          gap: 8px;
          padding: 11px 9px;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function pspRatingsSubjectsV70() {
    return ["economics", "mathematics", "biology", "chemistry", "informatics"]
      .filter((key) => DATA[key]);
  }

  function pspEnsureRatingsSubjectOptionsV70() {
    const select = document.getElementById("ratings-subject");
    if (!select) return;

    const subjects = pspRatingsSubjectsV70();
    const current = String(select.value || "").trim();
    const currentKnown = subjects.includes(current);
    const knownOptions = Array.from(select.options || [])
      .filter((option) => subjects.includes(String(option.value || "").trim()))
      .length;

    if (knownOptions >= subjects.length) return;

    const nextValue = currentKnown ? current : (subjects.includes(getSubject()) ? getSubject() : subjects[0]);

    select.innerHTML = subjects.map((key) => {
      const d = DATA[key] || {};
      return `<option value="${esc(key)}">${esc(d.title || key)}</option>`;
    }).join("");

    if (nextValue) select.value = nextValue;
  }

  function pspEnsureRatingsStageOptionsV70() {
    const select = document.getElementById("ratings-tour");
    if (!select) return;

    const current = String(select.value || "").trim();

    const stages = [
      ["season_total", tr("Все 7 туров", "Barcha 7 tur", "All 7 tours")],
      ["1", tr("Тур 1", "1-tur", "Tour 1")],
      ["2", tr("Тур 2", "2-tur", "Tour 2")],
      ["3", tr("Тур 3", "3-tur", "Tour 3")],
      ["4", tr("Тур 4", "4-tur", "Tour 4")],
      ["5", tr("Тур 5", "5-tur", "Tour 5")],
      ["6", tr("Тур 6", "6-tur", "Tour 6")],
      ["7", tr("Тур 7", "7-tur", "Tour 7")],
      ["grand_final", "Grand Final"]
    ];

    const values = stages.map(([value]) => value);
    const hasAllStages = values.every((value) =>
      Array.from(select.options || []).some((option) => String(option.value || "") === value)
    );

    if (!hasAllStages) {
      select.innerHTML = stages.map(([value, label]) =>
        `<option value="${esc(value)}">${esc(label)}</option>`
      ).join("");
    }

    if (values.includes(current)) {
      select.value = current;
    } else {
      select.value = "grand_final";
    }
  }

  function pspRatingsSubjectKeyV70() {
    pspEnsureRatingsSubjectOptionsV70();

    const select = document.getElementById("ratings-subject");
    const value = String(select?.value || "").trim().toLowerCase();

    if (DATA[value]) return value;
    return getSubject();
  }

  function pspRatingsStageV70() {
    pspEnsureRatingsStageOptionsV70();
    return String(document.getElementById("ratings-tour")?.value || "grand_final").trim();
  }

  function pspRatingsScopeV70() {
    const active = document.querySelector("#view-ratings .seg-btn.is-active");
    return String(active?.dataset?.scope || "district").trim() || "district";
  }

  function pspRatingsStageLabelV70(stage) {
    if (stage === "grand_final") return "Grand Final";
    if (stage === "season_total") return tr("Все 7 туров", "Barcha 7 tur", "All 7 tours");
    return tr(`Тур ${stage}`, `${stage}-tur`, `Tour ${stage}`);
  }

  function pspRatingsPublishedV70(stage) {
    const phase = typeof getPhase === "function" ? getPhase() : "auto";

    if (stage === "grand_final") {
      return phase === "auto" || phase === "grand_ready";
    }

    return true;
  }

  function pspRatingsRowsV70(subjectKey, stage, scope) {
    const d = DATA[subjectKey] || DATA.economics;
    const title = d?.title || "Subject";
    const offset = scope === "country" ? 0 : scope === "region" ? 2 : 4;

    const base = [
      ["Azizbek Karimov", "Presidential School · 10"],
      ["Madina Rustamova", "Specialized School · 11"],
      ["Sardorbek Aliyev", "School 21 · 10"],
      ["YOU", "iClub participant"],
      ["Nigina Sobirova", "School 7 · 9"],
      ["Javohir Ismoilov", "Academic Lyceum · 11"],
      ["Malika Tursunova", "School 12 · 10"],
      ["Bekzod Nazarov", "Specialized School · 9"]
    ];

    let scores;
    let maxScore;
    let times;

    if (stage === "season_total") {
      maxScore = 140;
      scores = [128, 124, 119, 116, 111, 107, 101, 96];
      times = ["1:18:42", "1:21:10", "1:22:38", "1:26:04", "1:27:55", "1:31:21", "1:33:47", "1:35:08"];
    } else if (stage === "grand_final") {
      maxScore = 20;
      scores = [19, 18, 18, 17, 16, 15, 14, 13];
      times = ["11:42", "12:10", "12:38", "13:04", "12:55", "14:21", "13:47", "15:08"];
    } else {
      const tourNo = Number(stage) || 1;
      maxScore = 20;
      scores = [
        Math.max(12, 20 - Math.floor(tourNo / 3)),
        Math.max(12, 19 - Math.floor(tourNo / 4)),
        18,
        Math.max(12, 17 - (tourNo >= 6 ? 1 : 0)),
        16,
        15,
        14,
        13
      ];
      times = ["09:58", "10:24", "10:51", "11:16", "11:42", "12:05", "12:44", "13:19"];
    }

    return base.map(([name, meta], index) => {
      const score = Number(scores[index] || 0);
      const percent = Math.round((score / maxScore) * 100);

      return {
        rank: index + 1 + offset,
        name,
        meta: `${title} · ${meta}`,
        score,
        maxScore,
        percent,
        time: times[index],
        isMe: name === "YOU"
      };
    });
  }

  function pspRenderRatingsStageV70() {
    pspEnsureRatingsSubjectOptionsV70();
    pspEnsureRatingsStageOptionsV70();

    const list = document.getElementById("ratings-list");
    if (!list) return;

    const subjectKey = pspRatingsSubjectKeyV70();
    const stage = pspRatingsStageV70();
    const scope = pspRatingsScopeV70();
    const d = DATA[subjectKey] || DATA.economics;
    const hint = document.getElementById("ratings-viewer-hint");
    const mybar = document.getElementById("ratings-mybar");
    const stageLabel = pspRatingsStageLabelV70(stage);

    if (!pspRatingsPublishedV70(stage)) {
      if (hint) {
        hint.style.display = "";
        hint.textContent = tr(
          "Финальный рейтинг появится после завершения финала и расчёта результатов.",
          "Final reyting final yakunlanib, natijalar hisoblangandan keyin ochiladi.",
          "Grand Final rating will appear after the final ends and results are calculated."
        );
      }

      list.innerHTML = `
        <div class="empty muted psp-rating-empty-v70">
          <b>${esc(d.title || "")} · ${esc(stageLabel)}</b>
          <span>${esc(tr(
            "Результаты ещё не опубликованы.",
            "Natijalar hali e’lon qilinmagan.",
            "Results are not published yet."
          ))}</span>
        </div>
      `;

      if (mybar) mybar.style.display = "none";
      return;
    }

    const rows = pspRatingsRowsV70(subjectKey, stage, scope);
    const me = rows.find((row) => row.isMe);

    if (hint) {
      hint.style.display = "";
      hint.textContent =
        stage === "grand_final"
          ? tr(
              `${d.title} · Grand Final. Финальный рейтинг после 7 туров.`,
              `${d.title} · Grand Final. 7 turdan keyingi final reyting.`,
              `${d.title} · Grand Final. Final rating after 7 tours.`
            )
          : stage === "season_total"
            ? tr(
                `${d.title} · суммарный рейтинг 7 туров сезона.`,
                `${d.title} · mavsumdagi 7 turning umumiy reytingi.`,
                `${d.title} · combined rating for all 7 tours.`
              )
            : tr(
                `${d.title} · рейтинг официального тура ${stage}.`,
                `${d.title} · ${stage}-tur rasmiy reytingi.`,
                `${d.title} · official Tour ${stage} rating.`
              );
    }

    list.innerHTML = rows.map((row) => `
      <div class="psp-rating-row-v70 ${row.isMe ? "is-me" : ""}">
        <div class="psp-rating-rank-v70">#${esc(row.rank)}</div>
        <div class="psp-rating-student-v70">
          <b>${esc(row.isMe ? tr("Вы", "Siz", "You") : row.name)}</b>
          <span>${esc(row.meta)}</span>
        </div>
        <div class="psp-rating-score-v70">
          <b>${esc(row.score)}/${esc(row.maxScore)}</b>
          <span>${esc(row.percent)}%</span>
        </div>
        <div class="psp-rating-time-v70">${esc(row.time)}</div>
      </div>
    `).join("");

    if (mybar && me) {
      mybar.style.display = "";

      const rankEl = document.getElementById("ratings-mybar-rank");
      const totalEl = document.getElementById("ratings-mybar-total");
      const scoreEl = document.getElementById("ratings-mybar-score");
      const timeEl = document.getElementById("ratings-mybar-time");

      if (rankEl) rankEl.textContent = `#${me.rank}`;
      if (totalEl) totalEl.textContent = `${stageLabel} · ${tr("рейтинг", "reyting", "rating")}`;
      if (scoreEl) scoreEl.textContent = `${me.score}/${me.maxScore}`;
      if (timeEl) timeEl.textContent = me.time;
    }
  }

  function pspScheduleRatingsStageV70() {
    setTimeout(pspRenderRatingsStageV70, 0);
    setTimeout(pspRenderRatingsStageV70, 140);
    setTimeout(pspRenderRatingsStageV70, 420);
  }

  function pspBindRatingsStagesV70() {
    if (window.__pspRatingsStagesV70Bound) return;
    window.__pspRatingsStagesV70Bound = true;

    document.addEventListener("change", (event) => {
      const id = event.target?.id || "";
      if (id === "ratings-subject" || id === "ratings-tour") {
        pspScheduleRatingsStageV70();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.target?.closest?.('[data-tab="ratings"]') ||
        event.target?.closest?.("#view-ratings .seg-btn")
      ) {
        pspScheduleRatingsStageV70();
      }
    });

    pspScheduleRatingsStageV70();
  }

  function pspInjectRatingsStagesStylesV70() {
    if (document.getElementById("psp-ratings-stages-v70")) return;

    const style = document.createElement("style");
    style.id = "psp-ratings-stages-v70";
    style.textContent = `
      /* PSP_RATINGS_STAGES_V70 */
      #view-ratings .psp-rating-row-v70 {
        display: grid;
        grid-template-columns: 46px minmax(0, 1fr) 72px 58px;
        align-items: center;
        gap: 10px;
        padding: 12px 10px;
        border-radius: 16px;
        background: #fff;
        border: 1px solid rgba(15,23,42,.08);
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-rating-row-v70 + .psp-rating-row-v70 {
        margin-top: 10px;
      }

      #view-ratings .psp-rating-row-v70.is-me {
        border-color: rgba(47,111,214,.34);
        background: linear-gradient(180deg, rgba(47,111,214,.08), rgba(255,255,255,.98));
        box-shadow: 0 0 0 1px rgba(47,111,214,.06) inset, 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-rating-rank-v70 {
        font-size: 14px;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-rating-student-v70 {
        min-width: 0;
        display: grid;
        gap: 3px;
      }

      #view-ratings .psp-rating-student-v70 b,
      #view-ratings .psp-rating-student-v70 span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #view-ratings .psp-rating-student-v70 b {
        font-size: 13px;
        line-height: 1.15;
        color: #0f172a;
      }

      #view-ratings .psp-rating-student-v70 span {
        font-size: 11px;
        line-height: 1.15;
        font-weight: 700;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-rating-score-v70 {
        text-align: right;
        display: grid;
        gap: 2px;
      }

      #view-ratings .psp-rating-score-v70 b {
        font-size: 13px;
        line-height: 1.1;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-rating-score-v70 span {
        font-size: 11px;
        line-height: 1.1;
        font-weight: 850;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-rating-time-v70 {
        text-align: right;
        font-size: 12px;
        font-weight: 900;
        color: rgba(15,23,42,.72);
        white-space: nowrap;
      }

      #view-ratings .psp-rating-empty-v70 {
        display: grid;
        gap: 6px;
      }

      @media (max-width: 360px) {
        #view-ratings .psp-rating-row-v70 {
          grid-template-columns: 38px minmax(0, 1fr) 62px 52px;
          gap: 8px;
          padding: 11px 9px;
        }
      }
    `;

    document.head.appendChild(style);
  }



  const PSP_RATING_SEASONS_V71 = [
    {
      id: "season_2_current",
      titleRu: "Текущий",
      titleUz: "Joriy",
      titleEn: "Current",
      status: "current",
      openStages: ["1"],
      defaultStage: "1"
    },
    {
      id: "season_1_archive",
      titleRu: "Сезон 1",
      titleUz: "1-mavsum",
      titleEn: "Season 1",
      status: "archive",
      openStages: ["season_total", "1", "2", "3", "4", "5", "6", "7", "grand_final"],
      defaultStage: "grand_final"
    }
  ];

  function pspSeasonLabelV71(season) {
    return tr(season.titleRu, season.titleUz, season.titleEn);
  }

  function pspRatingsSubjectsV71() {
    return ["economics", "mathematics", "biology", "chemistry", "informatics"]
      .filter((key) => DATA[key]);
  }

  function pspEnsureRatingsSeasonFilterV71() {
    const filters = document.querySelector("#view-ratings .lb-filters");
    if (!filters) return null;

    let select = document.getElementById("ratings-season");
    if (select) return select;

    const subjectSelect = document.getElementById("ratings-subject");
    const subjectLabel = subjectSelect?.closest?.(".lb-filter") || null;

    const wrap = document.createElement("label");
    wrap.className = "lb-filter psp-ratings-season-filter-v71";
    wrap.innerHTML = `
      <div class="lb-filter-label">${esc(tr("Сезон", "Mavsum", "Season"))}</div>
      <select id="ratings-season" class="lb-select" aria-label="Season"></select>
    `;

    filters.insertBefore(wrap, subjectLabel || filters.firstChild);
    return wrap.querySelector("#ratings-season");
  }

  function pspEnsureRatingsSeasonOptionsV71() {
    const select = pspEnsureRatingsSeasonFilterV71();
    if (!select) return;

    const current = String(select.value || "").trim();
    const values = PSP_RATING_SEASONS_V71.map((season) => season.id);

    if (select.options.length !== PSP_RATING_SEASONS_V71.length) {
      select.innerHTML = PSP_RATING_SEASONS_V71.map((season) =>
        `<option value="${esc(season.id)}">${esc(pspSeasonLabelV71(season))}</option>`
      ).join("");
    }

    select.value = values.includes(current) ? current : "season_2_current";
  }

  function pspCurrentRatingsSeasonV71() {
    pspEnsureRatingsSeasonOptionsV71();

    const value = String(document.getElementById("ratings-season")?.value || "season_2_current");
    return PSP_RATING_SEASONS_V71.find((season) => season.id === value) || PSP_RATING_SEASONS_V71[0];
  }

  function pspEnsureRatingsSubjectOptionsV71() {
    const select = document.getElementById("ratings-subject");
    if (!select) return;

    const subjects = pspRatingsSubjectsV71();
    const current = String(select.value || "").trim();
    const currentKnown = subjects.includes(current);

    select.innerHTML = subjects.map((key) => {
      const d = DATA[key] || {};
      return `<option value="${esc(key)}">${esc(d.title || key)}</option>`;
    }).join("");

    select.value = currentKnown ? current : (subjects.includes(getSubject()) ? getSubject() : subjects[0]);
  }

  function pspStageLabelV71(stage, locked = false) {
    let label;

    if (stage === "season_total") {
      label = tr("Все 7 туров", "Barcha 7 tur", "All 7 tours");
    } else if (stage === "grand_final") {
      label = "Grand Final";
    } else {
      label = tr(`Тур ${stage}`, `${stage}-tur`, `Tour ${stage}`);
    }

    if (!locked) return label;

    return `${label} · ${tr("позже", "keyinroq", "later")}`;
  }

  function pspEnsureRatingsStageOptionsV71() {
    const select = document.getElementById("ratings-tour");
    if (!select) return;

    const season = pspCurrentRatingsSeasonV71();
    const current = String(select.value || "").trim();

    const stages = ["season_total", "1", "2", "3", "4", "5", "6", "7", "grand_final"];

    select.innerHTML = stages.map((stage) => {
      const isOpen = season.openStages.includes(stage);
      return `
        <option value="${esc(stage)}" ${isOpen ? "" : "disabled"}>
          ${esc(pspStageLabelV71(stage, !isOpen))}
        </option>
      `;
    }).join("");

    if (season.openStages.includes(current)) {
      select.value = current;
    } else {
      select.value = season.defaultStage || season.openStages[0] || "1";
    }
  }

  function pspRatingsSubjectKeyV71() {
    pspEnsureRatingsSubjectOptionsV71();

    const value = String(document.getElementById("ratings-subject")?.value || "").trim().toLowerCase();
    return DATA[value] ? value : getSubject();
  }

  function pspRatingsStageV71() {
    pspEnsureRatingsStageOptionsV71();
    return String(document.getElementById("ratings-tour")?.value || "1").trim();
  }

  function pspRatingsScopeV71() {
    const active = document.querySelector("#view-ratings .seg-btn.is-active");
    return String(active?.dataset?.scope || "district").trim() || "district";
  }

  function pspRatingsRowsV71(subjectKey, stage, scope, season) {
    const d = DATA[subjectKey] || DATA.economics;
    const title = d?.title || "Subject";

    const baseOffset = scope === "country" ? 0 : scope === "region" ? 2 : 4;
    const seasonOffset = season.status === "archive" ? 0 : 1;

    const students = [
      ["Azizbek Karimov", "Presidential School · 10"],
      ["Madina Rustamova", "Specialized School · 11"],
      ["Sardorbek Aliyev", "School 21 · 10"],
      ["YOU", "iClub participant"],
      ["Nigina Sobirova", "School 7 · 9"],
      ["Javohir Ismoilov", "Academic Lyceum · 11"],
      ["Malika Tursunova", "School 12 · 10"],
      ["Bekzod Nazarov", "Specialized School · 9"]
    ];

    let maxScore;
    let scores;
    let times;

    if (stage === "season_total") {
      maxScore = 140;
      scores = season.status === "archive"
        ? [128, 124, 119, 116, 111, 107, 101, 96]
        : [18, 17, 16, 15, 14, 13, 12, 11];
      times = season.status === "archive"
        ? ["1:18:42", "1:21:10", "1:22:38", "1:26:04", "1:27:55", "1:31:21", "1:33:47", "1:35:08"]
        : ["09:58", "10:24", "10:51", "11:16", "11:42", "12:05", "12:44", "13:19"];
    } else if (stage === "grand_final") {
      maxScore = 20;
      scores = [19, 18, 18, 17, 16, 15, 14, 13];
      times = ["11:42", "12:10", "12:38", "13:04", "12:55", "14:21", "13:47", "15:08"];
    } else {
      const tourNo = Number(stage) || 1;
      maxScore = 20;
      scores = season.status === "archive"
        ? [
            Math.max(12, 20 - Math.floor(tourNo / 3)),
            Math.max(12, 19 - Math.floor(tourNo / 4)),
            18,
            Math.max(12, 17 - (tourNo >= 6 ? 1 : 0)),
            16,
            15,
            14,
            13
          ]
        : [18, 17, 16, 15, 14, 13, 12, 11];

      times = ["09:58", "10:24", "10:51", "11:16", "11:42", "12:05", "12:44", "13:19"];
    }

    return students.map(([name, meta], index) => {
      const score = Number(scores[index] || 0);
      return {
        rank: index + 1 + baseOffset + seasonOffset,
        name,
        meta: `${title} · ${meta}`,
        score,
        maxScore,
        percent: Math.round((score / maxScore) * 100),
        time: times[index],
        isMe: name === "YOU"
      };
    });
  }

  function pspRenderRatingsV71() {
    pspEnsureRatingsSeasonOptionsV71();
    pspEnsureRatingsSubjectOptionsV71();
    pspEnsureRatingsStageOptionsV71();

    const list = document.getElementById("ratings-list");
    if (!list) return;

    const season = pspCurrentRatingsSeasonV71();
    const subjectKey = pspRatingsSubjectKeyV71();
    const stage = pspRatingsStageV71();
    const scope = pspRatingsScopeV71();
    const d = DATA[subjectKey] || DATA.economics;
    const hint = document.getElementById("ratings-viewer-hint");
    const mybar = document.getElementById("ratings-mybar");

    const seasonLabel = pspSeasonLabelV71(season);
    const stageLabel = pspStageLabelV71(stage);

    const rows = pspRatingsRowsV71(subjectKey, stage, scope, season);
    const me = rows.find((row) => row.isMe);

    if (hint) {
      hint.style.display = "";
      hint.textContent =
        stage === "grand_final"
          ? `${seasonLabel} · ${d.title} · Grand Final. ${tr("Финальный рейтинг сезона.", "Mavsum final reytingi.", "Season final rating.")}`
          : stage === "season_total"
            ? `${seasonLabel} · ${d.title}. ${tr("Суммарный рейтинг 7 туров.", "7 turning umumiy reytingi.", "Combined rating for 7 tours.")}`
            : `${seasonLabel} · ${d.title}. ${tr(`Рейтинг тура ${stage}.`, `${stage}-tur reytingi.`, `Tour ${stage} rating.`)}`;
    }

    list.innerHTML = rows.map((row) => `
      <div class="psp-rating-row-v71 ${row.isMe ? "is-me" : ""}">
        <div class="psp-rating-rank-v71">#${esc(row.rank)}</div>
        <div class="psp-rating-student-v71">
          <b>${esc(row.isMe ? tr("Вы", "Siz", "You") : row.name)}</b>
          <span>${esc(row.meta)}</span>
        </div>
        <div class="psp-rating-score-v71">
          <b>${esc(row.score)}/${esc(row.maxScore)}</b>
          <span>${esc(row.percent)}%</span>
        </div>
        <div class="psp-rating-time-v71">${esc(row.time)}</div>
      </div>
    `).join("");

    if (mybar && me) {
      mybar.style.display = "";

      const rankEl = document.getElementById("ratings-mybar-rank");
      const totalEl = document.getElementById("ratings-mybar-total");
      const scoreEl = document.getElementById("ratings-mybar-score");
      const timeEl = document.getElementById("ratings-mybar-time");

      if (rankEl) rankEl.textContent = `#${me.rank}`;
      if (totalEl) totalEl.textContent = `${seasonLabel} · ${stageLabel}`;
      if (scoreEl) scoreEl.textContent = `${me.score}/${me.maxScore}`;
      if (timeEl) timeEl.textContent = me.time;
    }
  }

  function pspScheduleRatingsV71() {
    setTimeout(pspRenderRatingsV71, 0);
    setTimeout(pspRenderRatingsV71, 160);
    setTimeout(pspRenderRatingsV71, 420);
  }

  function pspBindRatingsV71() {
    if (window.__pspRatingsV71Bound) return;
    window.__pspRatingsV71Bound = true;

    document.addEventListener("change", (event) => {
      const id = event.target?.id || "";
      if (id === "ratings-season" || id === "ratings-subject" || id === "ratings-tour") {
        pspScheduleRatingsV71();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.target?.closest?.('[data-tab="ratings"]') ||
        event.target?.closest?.("#view-ratings .seg-btn")
      ) {
        pspScheduleRatingsV71();
      }
    });

    pspScheduleRatingsV71();
  }

  function pspInjectRatingsStylesV71() {
    if (document.getElementById("psp-ratings-seasons-v71")) return;

    const style = document.createElement("style");
    style.id = "psp-ratings-seasons-v71";
    style.textContent = `
      /* PSP_RATINGS_SEASONS_V71 */
      #view-ratings .psp-ratings-season-filter-v71 {
        grid-column: 1 / -1;
      }

      #view-ratings .psp-rating-row-v71 {
        display: grid;
        grid-template-columns: 46px minmax(0, 1fr) 72px 58px;
        align-items: center;
        gap: 10px;
        padding: 12px 10px;
        border-radius: 16px;
        background: #fff;
        border: 1px solid rgba(15,23,42,.08);
        box-shadow: 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-rating-row-v71 + .psp-rating-row-v71 {
        margin-top: 10px;
      }

      #view-ratings .psp-rating-row-v71.is-me {
        border-color: rgba(47,111,214,.34);
        background: linear-gradient(180deg, rgba(47,111,214,.08), rgba(255,255,255,.98));
        box-shadow: 0 0 0 1px rgba(47,111,214,.06) inset, 0 8px 22px rgba(15,23,42,.06);
      }

      #view-ratings .psp-rating-rank-v71 {
        font-size: 14px;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-rating-student-v71 {
        min-width: 0;
        display: grid;
        gap: 3px;
      }

      #view-ratings .psp-rating-student-v71 b,
      #view-ratings .psp-rating-student-v71 span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #view-ratings .psp-rating-student-v71 b {
        font-size: 13px;
        line-height: 1.15;
        color: #0f172a;
      }

      #view-ratings .psp-rating-student-v71 span {
        font-size: 11px;
        line-height: 1.15;
        font-weight: 700;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-rating-score-v71 {
        text-align: right;
        display: grid;
        gap: 2px;
      }

      #view-ratings .psp-rating-score-v71 b {
        font-size: 13px;
        line-height: 1.1;
        font-weight: 950;
        color: #0f172a;
      }

      #view-ratings .psp-rating-score-v71 span {
        font-size: 11px;
        line-height: 1.1;
        font-weight: 850;
        color: rgba(100,116,139,.95);
      }

      #view-ratings .psp-rating-time-v71 {
        text-align: right;
        font-size: 12px;
        font-weight: 900;
        color: rgba(15,23,42,.72);
        white-space: nowrap;
      }

      @media (max-width: 360px) {
        #view-ratings .psp-rating-row-v71 {
          grid-template-columns: 38px minmax(0, 1fr) 62px 52px;
          gap: 8px;
          padding: 11px 9px;
        }
      }
    `;

    document.head.appendChild(style);
  }



  function bindRealGrandFinalCertificateButtonV74() {
    window.showCertificate = async function showCertificateBridgeV74() {
      try {
        if (typeof window.openPreviewGrandFinalCertificate === "function") {
          const ok = await window.openPreviewGrandFinalCertificate();
          if (ok) return;
        }

        const btn =
          document.querySelector('[data-action="profile-certificates"]') ||
          document.querySelector('[data-action="open-certificates"]');

        if (btn) {
          btn.click();
          return;
        }

        console.warn("[iClub Preview] Certificate viewer is not ready yet.");
      } catch (e) {
        console.warn("[iClub Preview] Certificate bridge failed", e);
      }
    };
  }


  function boot() {
    injectStyles();
    injectSheetFullscreenFix();
    injectPracticeFullscreenStyles();
    injectPracticeUXPolishStyles();
    injectMainLikeQuizStyles();
    injectPracticeBuilderScrollStyles();
    injectReportDownloadStyles();
    injectPracticeStateMachineStyles();
    injectPracticeDynamicCountStyles();
    injectPracticeAvailabilityTextStyles();
    injectCertificateArchiveStyles();
    injectProfileCertRepairStyles();
injectProfileCleanupStyles();
    injectSeasonReviewTopicScopeStyles();
    injectPreviewBottomTabbarSheetStyles();
    bindPreviewBottomNavPassthrough();
    observePreviewSheetTabbarMode();
    injectSafeSheetMainWidthStyles();
    injectSafeSheetNoSideGapStyles();
    observeSafeSheetFullWidth();
    injectAssessmentFullWidthStyles();
    observeAssessmentFullWidth();
    injectAssessmentContentMainWidthStyles();
    injectQuestionCardMainWidthV63Styles();
    observeQuestionCardMainWidthV63();
    injectVisibleQuizDomWidthV65Styles();
    observeVisibleQuizDomWidthV65();
    injectPreviewAssessmentShellWidthFix();
    pspInjectRatingsStylesV71();
    pspBindRatingsV71();
    bindRealGrandFinalCertificateButtonV74();
    bind();
    installPhaseSelect();

    const tick = () => {
      try { neutralizeAllPreviewBadges(); } catch {}
      try { installPhaseSelect(); } catch {}
      try { renderHomeRouter(); } catch {}
      try { decorateRatingTab(); } catch {}
      try { decorateProfileCertificates(); } catch {}
    };

    setTimeout(tick, 100);
    setTimeout(tick, 400);
    setTimeout(tick, 1000);
    setInterval(tick, 1500);
  }

  boot();
})();
