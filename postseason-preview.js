(function () {
  "use strict";

  if (!window.ICLUB_PREVIEW_MODE) return;

  const BUILD = "grand-final-v38-practice-timer-labels-20260531";
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

  function sheet(kicker, title, sub, body) {
    return `
      <div class="psp-sheet-card">
        <div class="psp-sheet-top">
          <button type="button" class="psp-back" data-psp-action="sheet-close">←</button>
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
      <div class="psp-final-shell">
        <div class="psp-final-top">
          <div class="psp-progress">${state.q}/${FINAL_QUESTIONS_COUNT}</div>
          <div id="psp-final-timer" class="psp-timer ${left <= 10 ? "is-danger" : ""}">${fmt(left)}</div>
        </div>

        <div class="psp-final-subject">${esc(d.title)} · Grand Final</div>

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

        <div class="psp-final-actions">
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

  function showCertificate(key) {
    const d = DATA[key] || DATA.economics;
    const r = resultFor(key);

    openSheet(sheet(
      tr("СЕРТИФИКАТ", "SERTIFIKAT", "CERTIFICATE"),
      "Grand Final Certificate",
      `${d.title} · Grand Final`,
      `
        <div class="psp-cert">
          <div class="psp-cert-logo">iClub</div>
          <div class="psp-cert-type">Grand Final Certificate</div>
          <div class="psp-cert-name">Preview Student</div>
          <div class="psp-cert-line">${esc(d.title)} · ${r.score}/${r.total} · ${r.percent}%</div>

          <div class="psp-report-grid">
            <div><b>#${r.regionRank}</b><span>${tr("Регион", "Hudud", "Region")}</span></div>
            <div><b>#${r.overallRank}</b><span>${tr("Общий", "Umumiy", "Overall")}</span></div>
            <div><b>${r.time}</b><span>${tr("Время", "Vaqt", "Time")}</span></div>
            <div><b>GF</b><span>${tr("Финал", "Final", "Final")}</span></div>
          </div>

          <div class="psp-cert-code">ICL-202606-GF-${esc(String(key).toUpperCase())}-PREVIEW</div>
        </div>
      `
    ));
  }

  function showReport(key) {
    const d = DATA[key] || DATA.economics;

    openSheet(sheet(
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
        </div>
      `
    ));
  }


  function getPracticeConfigKey(key) {
    return "iclub_preview_practice_config_v37_" + (key || getSubject());
  }

  function getPracticeStateKey(key) {
    return "iclub_preview_practice_state_v37_" + (key || getSubject());
  }

  function getPracticeTopics(key, tour) {
    const d = DATA[key] || DATA.economics;
    const base = {
      economics: {
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
    return subjectTopics[String(tour)] || subjectTopics["1-7"] || d.study || [];
  }

  function getPracticeConfig(key, mode) {
    try {
      const raw = localStorage.getItem(getPracticeConfigKey(key));
      const parsed = raw ? JSON.parse(raw) : null;

      if (parsed && typeof parsed === "object") {
        return {
          mode: parsed.mode || mode || "regular",
          tour: parsed.tour || "1-7",
          topics: Array.isArray(parsed.topics) ? parsed.topics : [],
          difficulty: parsed.difficulty || "mixed",
          count: Number(parsed.count || 10),
          repeatSolved: !!parsed.repeatSolved
        };
      }
    } catch {}

    const tour = mode === "regular" ? "1-7" : "1-7";
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

  function buildPracticeQuestions(key, config) {
    const d = DATA[key] || DATA.economics;
    const questions = d.questions.slice(0, Math.min(3, d.questions.length));

    return questions.map((q, index) => ({
      ...q,
      sourceTopic: (config.topics && config.topics[index % Math.max(1, config.topics.length)]) || d.study[index % Math.max(1, d.study.length)] || "Practice"
    }));
  }

  function showPractice(key) {
    const d = DATA[key] || DATA.economics;

    openSheet(sheet(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      tr("Выберите формат", "Formatni tanlang", "Choose format"),
      d.title,
      `
        <div class="psp-choice-list">
          <button type="button" class="psp-choice psp-choice-button" data-psp-action="practice-regular" data-subject="${esc(key)}">
            <div class="psp-choice-title">${tr("Обычная практика", "Oddiy amaliyot", "Regular practice")}</div>
            <div class="psp-muted">${tr("Быстрый запуск привычной практики по предмету.", "Fan bo‘yicha odatiy amaliyotni tez boshlash.", "Quick start for usual practice.")}</div>
          </button>

          <button type="button" class="psp-choice psp-choice-button" data-psp-action="practice-study" data-subject="${esc(key)}">
            <div class="psp-choice-title">${tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")}</div>
            <div class="psp-muted">${tr("Выберите тур и темы, которые нужно изучить или закрепить.", "O‘rganish yoki mustahkamlash kerak bo‘lgan tur va mavzularni tanlang.", "Choose tour and topics to study or reinforce.")}</div>
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
    const config = getPracticeConfig(key, mode);
    config.mode = mode;
    savePracticeConfig(key, config);

    const topics = getPracticeTopics(key, config.tour);
    const title = mode === "study"
      ? tr("Изучить темы", "Mavzularni o‘rganish", "Study topics")
      : tr("Собрать практику", "Amaliyot yig‘ish", "Build practice");

    const subtitle = mode === "study"
      ? tr("Фокус на темах, которые требуют изучения или закрепления.", "O‘rganish yoki mustahkamlash kerak bo‘lgan mavzular.", "Focus on topics that need study or reinforcement.")
      : tr("Настройте практику под свою цель.", "Amaliyotni maqsadingizga moslang.", "Customize practice for your goal.");

    openSheet(sheet(
      tr("ПРАКТИКА", "AMALIYOT", "PRACTICE"),
      title,
      `${d.title} · ${subtitle}`,
      `
        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Тур", "Tur", "Tour")}</div>
          <div class="psp-filter-row">
            ${["1-7","1","2","3","4","5","6","7"].map((tour) => `
              <button type="button"
                class="${config.tour === tour ? "is-on" : ""}"
                data-psp-action="practice-set"
                data-subject="${esc(key)}"
                data-mode="${esc(mode)}"
                data-field="tour"
                data-value="${esc(tour)}">
                ${tour === "1-7" ? tr("Все 7", "7 tur", "All 7") : `${tr("Тур", "Tur", "Tour")} ${tour}`}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="psp-panel">
          <div class="psp-panel-title">${tr("Темы", "Mavzular", "Topics")}</div>
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
          <div class="psp-muted psp-mini-note">${tr("Выбранные темы попадут в практику. В main список будет приходить из базы вопросов.", "Tanlangan mavzular amaliyotga kiradi. Main’da ro‘yxat savollar bazasidan olinadi.", "Selected topics go into practice. In main, the list comes from the question bank.")}</div>
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

          <div class="psp-panel">
            <div class="psp-panel-title">${tr("Количество", "Soni", "Count")}</div>
            <div class="psp-filter-row">
              ${[5,10,20,30].map((count) => `
                <button type="button"
                  class="${config.count === count ? "is-on" : ""}"
                  data-psp-action="practice-set"
                  data-subject="${esc(key)}"
                  data-mode="${esc(mode)}"
                  data-field="count"
                  data-value="${count}">
                  ${count}
                </button>
              `).join("")}
            </div>
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
          <button type="button" class="btn primary" data-psp-action="practice-start" data-subject="${esc(key)}" data-mode="${esc(mode)}">
            ${mode === "study" ? tr("Начать изучение", "O‘rganishni boshlash", "Start studying") : tr("Начать практику", "Amaliyotni boshlash", "Start practice")}
          </button>
        </div>
      `
    ));
  }

  function startPreviewPractice(key, mode) {
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

    const questions = buildPracticeQuestions(key, config);

    const state = {
      subject: key,
      mode: config.mode,
      q: 1,
      selected: "",
      answers: {},
      questions,
      startedAt: Date.now(),
      questionStartedAt: Date.now(),
      timeSpent: {},
      finished: false
    };

    localStorage.setItem(getPracticeStateKey(key), JSON.stringify(state));
    closeSheet();
    renderPracticeQuestion(key);
  }

  function getPracticeState(key) {
    try {
      const raw = localStorage.getItem(getPracticeStateKey(key));
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.questions) && parsed.questions.length) {
        return parsed;
      }
    } catch {}

    startPreviewPractice(key, "regular");
    return JSON.parse(localStorage.getItem(getPracticeStateKey(key)));
  }

  function savePracticeState(key, state) {
    localStorage.setItem(getPracticeStateKey(key), JSON.stringify(state));
    return state;
  }

  let practiceTimer = null;

  function stopPracticeTimer() {
    if (practiceTimer) clearInterval(practiceTimer);
    practiceTimer = null;
  }

  function currentPracticeElapsed(state) {
    const started = Number(state.questionStartedAt || Date.now());
    return Math.max(0, Math.floor((Date.now() - started) / 1000));
  }

  function startPracticeTimer(key) {
    stopPracticeTimer();

    const tick = () => {
      const state = getPracticeState(key);
      const el = document.getElementById("psp-practice-timer");
      if (el) el.textContent = fmt(currentPracticeElapsed(state));
    };

    tick();
    practiceTimer = setInterval(tick, 1000);
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

    openPracticeScreen(`
      <div class="psp-practice-shell">
        <div class="psp-practice-top">
          <button type="button" class="psp-back" data-psp-action="practice-finish" data-subject="${esc(key)}">←</button>
          <div>
            <div class="psp-kicker">${tr("ПРАКТИКА", "AMALIYOT", "PRACTICE")}</div>
            <div class="psp-practice-title">${esc(d.title)}</div>
            <div class="psp-muted">${state.q}/${total} · ${esc(question.sourceTopic || "Practice")}</div>
          </div>
          <div id="psp-practice-timer" class="psp-practice-timer">00:00</div>
        </div>

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

        <div class="psp-practice-actions">
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
    state.selected = "";

    if (state.q >= state.questions.length) {
      state.finished = true;
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
    const state = getPracticeState(key);
    const total = state.questions.length;

    let correct = 0;
    state.questions.forEach((question, index) => {
      if ((state.answers[String(index + 1)] || "") === question.correct) correct += 1;
    });

    const mistakes = Math.max(0, total - correct);
    const percent = Math.round((correct / Math.max(1, total)) * 100);
    const totalTime = Object.values(state.timeSpent || {}).reduce((sum, value) => sum + Number(value || 0), 0);

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
          <button type="button" class="btn" data-psp-action="practice" data-subject="${esc(key)}">${tr("Изменить формат", "Formatni o‘zgartirish", "Change format")}</button>
          <button type="button" class="btn primary" data-psp-action="practice-start" data-subject="${esc(key)}" data-mode="${esc(state.mode || "regular")}">${tr("Пройти ещё раз", "Yana bir marta o‘tish", "Try again")}</button>
        </div>
      `
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

      if (action === "report") return showReport(key);
      if (action === "practice") return showPractice(key);

      if (action === "practice-regular") return startPreviewPractice(key, "regular");
      if (action === "practice-study") return showPracticeBuilder(key, "study");
      if (action === "practice-build") return showPracticeBuilder(key, "build");

      if (action === "practice-set") {
        const field = btn.dataset.field || "";
        const value = btn.dataset.value || "";
        const mode = btn.dataset.mode || "build";
        const patch = { mode };
        patch[field] = field === "count" ? Number(value || 10) : value;
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

      if (action === "practice-start") return startPreviewPractice(key, btn.dataset.mode || "regular");
      if (action === "practice-pick") return pickPracticeAnswer(key, btn.dataset.option || "");
      if (action === "practice-answer") return answerPracticeQuestion(key);
      if (action === "practice-finish") return finishPractice(key);
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
        width: min(100%, 430px);
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
        width: min(100%, 430px);
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

  function boot() {
    injectStyles();
    injectSheetFullscreenFix();
    injectPracticeFullscreenStyles();
    injectPracticeUXPolishStyles();
    bind();
    installPhaseSelect();

    const tick = () => {
      try { neutralizeAllPreviewBadges(); } catch {}
      try { installPhaseSelect(); } catch {}
      try { renderHomeRouter(); } catch {}
      try { decorateRatingTab(); } catch {}
    };

    setTimeout(tick, 100);
    setTimeout(tick, 400);
    setTimeout(tick, 1000);
    setInterval(tick, 1500);
  }

  boot();
})();
