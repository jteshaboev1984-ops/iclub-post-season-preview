const data = window.ICLUB_POST_SEASON_MOCK;

const i18n = {
  ru: {
    preview_label: "Post-season preview · база отключена",
    nav_home: "Home",
    nav_review: "Review",
    nav_exam: "Exam Prep",
    nav_grand: "Grand",
    nav_profile: "Profile",

    home_title: "Новый этап после 7 туров",
    home_subtitle: "Season Review превращает результаты сезона в понятный учебный путь.",
    season_review: "Season Review",
    review_ready_title: "Ваш итог сезона готов",
    review_ready_text: "Посмотрите сильные темы, слабые зоны и следующий шаг.",
    open_review: "Open Review",
    continue_path: "Continue your path",
    continue_path_text: "Следующий этап открыт: Exam Prep и подготовка к Grand Olympiad.",
    start_exam_prep: "Start Exam Prep",
    view_review: "View Review",
    seven_tours: "7 Tours",
    review: "Review",
    exam_prep: "Exam Prep",
    grand_olympiad: "Grand Olympiad",

    review_title: "Season Review",
    review_subtitle: "Итоги 7 туров и следующий учебный шаг",
    season_summary: "Season Summary",
    tours_completed: "Tours completed",
    average_result: "Average result",
    practice_attempts: "Practice attempts",
    active_days: "Active days",
    best_performance: "Best Performance",
    best_tour: "Лучший тур",
    result: "Result",
    strong_area: "Сильная зона",
    strengths: "Strengths",
    areas_to_improve: "Areas to Improve",
    weak_note: "Эти темы требуют дополнительной работы перед следующим этапом.",
    learning_activity: "Learning Activity",
    recommended_next_step: "Recommended Next Step",
    start_diagnostic: "Start Diagnostic",
    close_weak_first: "Close weak topics first",
    readiness_disclaimer: "Readiness Score показывает текущую готовность. Это не официальный прогноз оценки.",

    exam_title: "Exam Prep",
    exam_subtitle: "Подготовка к реальным A Level papers на основе ваших результатов",
    choose_exam_goal: "Choose Exam Goal",
    paper_diagnostic: "Paper Diagnostic",
    paper_diagnostic_text: "Short check to understand your current readiness.",
    not_started: "Not started",
    weekly_mission: "This week’s mission",
    focus: "Focus",
    completed: "completed",
    command_trainer: "Command Word Trainer",
    command_trainer_text: "Train how to answer: explain, analyse, assess, evaluate.",
    open_trainer: "Open Trainer",
    readiness_title: "Economics Paper 2 Readiness",
    readiness_based: "Based on topic mastery, timed practice and mistake closure.",
    repair_weak_topics: "Repair weak topics",

    repair_title: "Repair Week",
    repair_subtitle: "Закройте слабые темы перед Grand Olympiad",
    weak_topics_to_close: "Weak topics to close",
    suggested_actions: "Suggested actions",
    progress: "Progress",
    weak_closed: "Weak topics closed",
    start_weak_practice: "Start weak-topic practice",

    grand_title: "Grand Olympiad",
    grand_subtitle: "Финальный этап сезона после 7 туров и подготовки",
    prepare: "Prepare",
    start: "Start",
    view_results: "View results",
    grand_info: "Grand Olympiad проверяет связное понимание предмета. Это отдельный финальный этап сезона, не обычный тур.",

    profile_title: "Profile",
    profile_subtitle: "Academic progress and next steps",
    academic_review: "Academic Season Review",
    season_ready: "Season Review ready",
    practice_mastery: "Practice mastery",
    good: "Good",
    error_driven: "Error-driven learner",
    active: "Active",
    next_step: "Next step",
    credentials: "Your Learning Credentials",

    notification_title: "Season Review готов",
    notification_body: "Внутри: итоги 7 туров, сильные темы, слабые зоны, рекомендации и следующий шаг подготовки.",

    mock_modal_title: "Preview action",
    mock_modal_text: "Это визуальная пустышка. В реальном app эта кнопка откроет следующий учебный шаг.",
    close: "Close"
  },

  uz: {
    preview_label: "Post-season preview · baza o‘chiq",
    nav_home: "Home",
    nav_review: "Review",
    nav_exam: "Exam Prep",
    nav_grand: "Grand",
    nav_profile: "Profile",

    home_title: "7 turdan keyingi yangi bosqich",
    home_subtitle: "Season Review mavsum natijalarini aniq o‘quv yo‘liga aylantiradi.",
    season_review: "Season Review",
    review_ready_title: "Mavsum yakuni tayyor",
    review_ready_text: "Kuchli mavzular, zaif joylar va keyingi qadamni ko‘ring.",
    open_review: "Reviewni ochish",
    continue_path: "Yo‘lni davom ettiring",
    continue_path_text: "Exam Prep va Grand Olympiadga tayyorgarlik ochildi.",
    start_exam_prep: "Exam Prepni boshlash",
    view_review: "Reviewni ko‘rish",
    seven_tours: "7 tur",
    review: "Review",
    exam_prep: "Exam Prep",
    grand_olympiad: "Grand Olympiad",

    review_title: "Season Review",
    review_subtitle: "7 tur yakuni va keyingi o‘quv qadami",
    season_summary: "Mavsum yakuni",
    tours_completed: "Tugallangan turlar",
    average_result: "O‘rtacha natija",
    practice_attempts: "Amaliyotlar",
    active_days: "Faol kunlar",
    best_performance: "Eng yaxshi natija",
    best_tour: "Eng yaxshi tur",
    result: "Natija",
    strong_area: "Kuchli yo‘nalish",
    strengths: "Kuchli mavzular",
    areas_to_improve: "Ko‘proq e’tibor kerak",
    weak_note: "Keyingi bosqichdan oldin bu mavzularga ko‘proq e’tibor kerak.",
    learning_activity: "O‘quv faolligi",
    recommended_next_step: "Tavsiya qilingan keyingi qadam",
    start_diagnostic: "Diagnostikani boshlash",
    close_weak_first: "Avval zaif mavzularni yopish",
    readiness_disclaimer: "Readiness Score tayyorgarlik darajasini ko‘rsatadi. Bu rasmiy baho prognozi emas.",

    exam_title: "Exam Prep",
    exam_subtitle: "Natijalaringiz asosida haqiqiy A Level papersga tayyorgarlik",
    choose_exam_goal: "Exam goal tanlash",
    paper_diagnostic: "Paper Diagnostic",
    paper_diagnostic_text: "Hozirgi tayyorgarlikni aniqlash uchun qisqa tekshiruv.",
    not_started: "Boshlanmagan",
    weekly_mission: "Haftalik vazifa",
    focus: "Fokus",
    completed: "bajarildi",
    command_trainer: "Command Word Trainer",
    command_trainer_text: "Explain, analyse, assess, evaluate kabi savollarga javob berishni mashq qiling.",
    open_trainer: "Trainerni ochish",
    readiness_title: "Economics Paper 2 tayyorgarligi",
    readiness_based: "Mavzular, vaqtli mashq va xatolarni yopish asosida.",
    repair_weak_topics: "Zaif mavzularni mustahkamlash",

    repair_title: "Repair Week",
    repair_subtitle: "Grand Olympiaddan oldin zaif mavzularni yoping",
    weak_topics_to_close: "Yopilishi kerak bo‘lgan mavzular",
    suggested_actions: "Tavsiya qilingan harakatlar",
    progress: "Progress",
    weak_closed: "Yopilgan zaif mavzular",
    start_weak_practice: "Zaif mavzu amaliyotini boshlash",

    grand_title: "Grand Olympiad",
    grand_subtitle: "7 tur va tayyorgarlikdan keyingi final bosqich",
    prepare: "Tayyorlanish",
    start: "Boshlash",
    view_results: "Natijalarni ko‘rish",
    grand_info: "Grand Olympiad predmetni bog‘liq tushunishni tekshiradi. Bu oddiy tur emas, alohida final bosqich.",

    profile_title: "Profile",
    profile_subtitle: "Akademik progress va keyingi qadamlar",
    academic_review: "Academic Season Review",
    season_ready: "Season Review tayyor",
    practice_mastery: "Practice mastery",
    good: "Yaxshi",
    error_driven: "Xatolar bilan ishlash",
    active: "Faol",
    next_step: "Keyingi qadam",
    credentials: "Learning Credentials",

    notification_title: "Season Review tayyor",
    notification_body: "Ichida: 7 tur natijalari, kuchli mavzular, zaif joylar, tavsiyalar va keyingi qadam.",

    mock_modal_title: "Preview action",
    mock_modal_text: "Bu vizual preview. Haqiqiy appda bu tugma keyingi o‘quv qadamini ochadi.",
    close: "Yopish"
  },

  en: {
    preview_label: "Post-season preview · DB off",
    nav_home: "Home",
    nav_review: "Review",
    nav_exam: "Exam Prep",
    nav_grand: "Grand",
    nav_profile: "Profile",

    home_title: "New stage after 7 tours",
    home_subtitle: "Season Review turns season results into a clear learning path.",
    season_review: "Season Review",
    review_ready_title: "Your season summary is ready",
    review_ready_text: "See your strengths, weak areas and recommended next step.",
    open_review: "Open Review",
    continue_path: "Continue your path",
    continue_path_text: "Exam Prep is now open. Prepare for Grand Olympiad.",
    start_exam_prep: "Start Exam Prep",
    view_review: "View Review",
    seven_tours: "7 Tours",
    review: "Review",
    exam_prep: "Exam Prep",
    grand_olympiad: "Grand Olympiad",

    review_title: "Season Review",
    review_subtitle: "Your 7-tour summary and next learning step",
    season_summary: "Season Summary",
    tours_completed: "Tours completed",
    average_result: "Average result",
    practice_attempts: "Practice attempts",
    active_days: "Active days",
    best_performance: "Best Performance",
    best_tour: "Best tour",
    result: "Result",
    strong_area: "Strong area",
    strengths: "Strengths",
    areas_to_improve: "Areas to Improve",
    weak_note: "These topics need more attention before the next stage.",
    learning_activity: "Learning Activity",
    recommended_next_step: "Recommended Next Step",
    start_diagnostic: "Start Diagnostic",
    close_weak_first: "Close weak topics first",
    readiness_disclaimer: "Readiness Score is a preparation indicator. It is not an official predicted grade.",

    exam_title: "Exam Prep",
    exam_subtitle: "Prepare for real A Level papers based on your results",
    choose_exam_goal: "Choose Exam Goal",
    paper_diagnostic: "Paper Diagnostic",
    paper_diagnostic_text: "Short check to understand your current readiness.",
    not_started: "Not started",
    weekly_mission: "This week’s mission",
    focus: "Focus",
    completed: "completed",
    command_trainer: "Command Word Trainer",
    command_trainer_text: "Train how to answer: explain, analyse, assess, evaluate.",
    open_trainer: "Open Trainer",
    readiness_title: "Economics Paper 2 Readiness",
    readiness_based: "Based on topic mastery, timed practice and mistake closure.",
    repair_weak_topics: "Repair weak topics",

    repair_title: "Repair Week",
    repair_subtitle: "Close weak topics before Grand Olympiad",
    weak_topics_to_close: "Weak topics to close",
    suggested_actions: "Suggested actions",
    progress: "Progress",
    weak_closed: "Weak topics closed",
    start_weak_practice: "Start weak-topic practice",

    grand_title: "Grand Olympiad",
    grand_subtitle: "Final season challenge after 7 tours and preparation",
    prepare: "Prepare",
    start: "Start",
    view_results: "View results",
    grand_info: "Grand Olympiad checks connected understanding of the subject. It is a separate final stage, not a regular tour.",

    profile_title: "Profile",
    profile_subtitle: "Academic progress and next steps",
    academic_review: "Academic Season Review",
    season_ready: "Season Review ready",
    practice_mastery: "Practice mastery",
    good: "Good",
    error_driven: "Error-driven learner",
    active: "Active",
    next_step: "Next step",
    credentials: "Your Learning Credentials",

    notification_title: "Season Review is ready",
    notification_body: "Inside: 7-tour summary, strongest topics, weak areas, recommendations and next preparation step.",

    mock_modal_title: "Preview action",
    mock_modal_text: "This is a visual preview. In the real app this button will open the next learning step.",
    close: "Close"
  }
};

let state = {
  lang: "ru",
  screen: "home",
  history: []
};

function t(key) {
  return i18n[state.lang]?.[key] || i18n.en[key] || key;
}

function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  applyStaticI18n();
  render();
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}

function go(screen, push = true) {
  if (push && state.screen !== screen) {
    state.history.push(state.screen);
  }
  state.screen = screen;
  render();
}

function goBack() {
  const prev = state.history.pop();
  go(prev || "home", false);
}

function setActiveNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === state.screen);
  });
}

function shellHeader(title, subtitle, showBack = true) {
  return `
    <div class="screen-header">
      ${showBack ? `<button class="back-btn" data-action="back" aria-label="Back">←</button>` : ""}
      <div>
        <div class="eyebrow">iClub</div>
        <h1>${title}</h1>
        <p class="subtext">${subtitle}</p>
      </div>
    </div>
  `;
}

function progressPath(current = "review") {
  const items = [
    { key: "tours", label: t("seven_tours") },
    { key: "review", label: t("review") },
    { key: "exam", label: t("exam_prep") },
    { key: "grand", label: t("grand_olympiad") }
  ];

  const order = ["tours", "review", "exam", "grand"];
  const currentIndex = order.indexOf(current);

  return `
    <div class="progress-path">
      ${items.map((item, index) => {
        const cls = index < currentIndex ? "done" : index === currentIndex ? "current" : "pending";
        return `
          <div class="path-item ${cls}">
            <div class="path-dot">${cls === "done" ? "✓" : ""}</div>
            <div class="path-label">${item.label}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderHome() {
  return `
    <section class="screen">
      ${shellHeader(t("home_title"), t("home_subtitle"), false)}

      <article class="card hero-card">
        <div class="hero-row">
          <div class="icon-bubble icon-green">▥</div>
          <div>
            <h2>${t("season_review")}</h2>
            <p class="subtext">${t("review_ready_text")}</p>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary btn-full" data-go="review">${t("open_review")}</button>
        </div>
        ${progressPath("review")}
      </article>

      <article class="card hero-card">
        <div class="hero-row">
          <div class="icon-bubble icon-blue">↗</div>
          <div>
            <h2>${t("continue_path")}</h2>
            <p class="subtext">${t("continue_path_text")}</p>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" data-go="exam">${t("start_exam_prep")}</button>
          <button class="btn btn-secondary" data-go="review">${t("view_review")}</button>
        </div>
        ${progressPath("exam")}
      </article>

      <article class="card">
        <div class="notification-card">
          <div class="icon-bubble icon-blue">i</div>
          <div>
            <h3>${t("notification_title")}</h3>
            <p class="subtext">${t("notification_body")}</p>
            <div class="action-row">
              <button class="btn btn-primary" data-go="review">${t("open_review")}</button>
            </div>
          </div>
        </div>
      </article>
    </section>
  `;
}

function metric(value, label) {
  return `
    <div class="metric-card">
      <div class="metric-value">${value}</div>
      <div class="metric-label">${label}</div>
    </div>
  `;
}

function renderReview() {
  const s = data.season;
  return `
    <section class="screen">
      ${shellHeader(t("review_title"), t("review_subtitle"))}

      <article class="card">
        <h2>${t("season_summary")}</h2>
        <div class="metric-grid" style="margin-top:12px">
          ${metric(`${s.toursCompleted} / ${s.totalTours}`, t("tours_completed"))}
          ${metric(`${s.averageResult}%`, t("average_result"))}
          ${metric(s.practiceAttempts, t("practice_attempts"))}
          ${metric(s.activeDays, t("active_days"))}
        </div>
      </article>

      <article class="card">
        <h2>${t("best_performance")}</h2>
        <div class="info-list">
          <div class="info-row">
            <div class="info-row-main">
              <div class="info-row-title">${t("best_tour")}: ${s.bestTour}</div>
              <div class="info-row-subtitle">${t("strong_area")}: ${s.bestTourStrongArea}</div>
            </div>
            <div class="info-row-value">${s.bestTourResult}%</div>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>${t("strengths")}</h2>
        <div class="chips">
          ${s.strengths.map((x) => `<button class="chip chip-green" data-modal="${x}">${x}</button>`).join("")}
        </div>
      </article>

      <article class="card">
        <h2>${t("areas_to_improve")}</h2>
        <div class="chips">
          ${s.weakAreas.map((x) => `<button class="chip chip-amber" data-go="repair">${x}</button>`).join("")}
        </div>
        <p class="subtext">${t("weak_note")}</p>
      </article>

      <article class="card">
        <h2>${t("learning_activity")}</h2>
        <div class="progress-list">
          ${s.activity.map((item) => `
            <div class="progress-row">
              <div class="progress-label">${item.label}</div>
              <div class="progress-value">${item.value}%</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${item.value}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="card">
        <div class="hero-row">
          <div class="icon-bubble icon-blue">▣</div>
          <div>
            <h2>${t("recommended_next_step")}</h2>
            <p class="subtext"><strong>${s.nextStep}</strong></p>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" data-go="exam">${t("start_diagnostic")}</button>
          <button class="btn btn-secondary" data-go="repair">${t("close_weak_first")}</button>
        </div>
      </article>

      <div class="notice">${t("readiness_disclaimer")}</div>
    </section>
  `;
}

function renderExam() {
  const exam = data.examPrep;
  return `
    <section class="screen">
      ${shellHeader(t("exam_title"), t("exam_subtitle"))}

      <article class="card">
        <h2>${t("choose_exam_goal")}</h2>
        <div class="paper-grid">
          ${exam.papers.map((p) => `
            <button class="paper-card ${p.selected ? "selected" : ""}" data-modal="${p.title}">
              <div class="paper-title">${p.title}</div>
              <div class="paper-subtitle">${p.subtitle}</div>
            </button>
          `).join("")}
        </div>
      </article>

      <article class="card">
        <div class="info-row" style="padding:0;border:0;background:transparent">
          <div>
            <h2>${t("paper_diagnostic")}</h2>
            <p class="subtext">${t("paper_diagnostic_text")}</p>
            <p class="subtext"><strong>${t("not_started")}</strong></p>
          </div>
          <button class="btn btn-secondary small-btn" data-modal="${t("paper_diagnostic")}">${t("start_diagnostic")}</button>
        </div>
      </article>

      <article class="card">
        <h2>${t("weekly_mission")}</h2>
        <p class="subtext">${t("focus")}: <strong>${exam.mission.focus}</strong></p>
        <div class="task-list">
          ${exam.mission.tasks.map((task, index) => `
            <div class="task-item">
              <span class="task-check">${index < exam.mission.progress ? "✓" : "○"}</span>
              <span>${task}</span>
            </div>
          `).join("")}
        </div>
        <div class="progress-list">
          <div class="progress-row">
            <div class="progress-label">${exam.mission.progress} / ${exam.mission.total} ${t("completed")}</div>
            <div class="progress-value">${Math.round((exam.mission.progress / exam.mission.total) * 100)}%</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${(exam.mission.progress / exam.mission.total) * 100}%"></div>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="info-row" style="padding:0;border:0;background:transparent">
          <div>
            <h2>${t("command_trainer")}</h2>
            <p class="subtext">${t("command_trainer_text")}</p>
          </div>
          <button class="btn btn-secondary small-btn" data-modal="${t("command_trainer")}">${t("open_trainer")}</button>
        </div>
      </article>

      <article class="card readiness-card">
        <div class="readiness-ring" style="--value:${exam.readiness}">
          <span>${exam.readiness}%</span>
        </div>
        <div>
          <h2>${t("readiness_title")}</h2>
          <p class="subtext">${t("readiness_based")}</p>
          <p class="subtext"><strong>${t("readiness_disclaimer")}</strong></p>
        </div>
      </article>

      <button class="btn btn-primary btn-full" data-go="repair">${t("repair_weak_topics")}</button>
    </section>
  `;
}

function renderRepair() {
  const r = data.repair;
  return `
    <section class="screen">
      ${shellHeader(t("repair_title"), t("repair_subtitle"))}

      <article class="card">
        <h2>${t("weak_topics_to_close")}</h2>
        <div class="info-list">
          ${r.weakTopics.map((topic) => `
            <div class="info-row">
              <div class="info-row-main">
                <div class="info-row-title">${topic}</div>
              </div>
              <span class="status-badge status-opening">Focus</span>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="card">
        <h2>${t("suggested_actions")}</h2>
        <div class="info-list">
          ${r.actions.map((action) => `
            <div class="info-row">
              <div class="info-row-main">
                <div class="info-row-title">${action}</div>
              </div>
              <button class="btn btn-secondary small-btn" data-modal="${action}">Open</button>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="card">
        <h2>${t("progress")}</h2>
        <p class="subtext">${t("weak_closed")}: <strong>${r.closed} / ${r.total}</strong></p>
        <div class="progress-list">
          <div class="progress-row">
            <div class="progress-label">${r.closed} / ${r.total}</div>
            <div class="progress-value">${Math.round((r.closed / r.total) * 100)}%</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${(r.closed / r.total) * 100}%"></div>
            </div>
          </div>
        </div>
      </article>

      <button class="btn btn-primary btn-full" data-modal="${t("start_weak_practice")}">${t("start_weak_practice")}</button>
    </section>
  `;
}

function renderGrand() {
  return `
    <section class="screen">
      ${shellHeader(t("grand_title"), t("grand_subtitle"))}

      <article class="card">
        <h2>${t("grand_olympiad")}</h2>
        <p class="subtext">${t("grand_info")}</p>
      </article>

      <article class="card">
        ${data.grandOlympiad.map((item) => {
          const statusClass = item.status === "active" ? "status-active" : item.status === "closed" ? "status-closed" : "status-opening";
          const btnText = item.status === "active" ? t("start") : item.status === "closed" ? t("view_results") : t("prepare");
          const target = item.status === "opening" ? "repair" : null;

          return `
            <div class="olympiad-card">
              <div class="icon-bubble ${item.status === "active" ? "icon-green" : item.status === "closed" ? "icon-blue" : "icon-amber"}">◆</div>
              <div>
                <div class="info-row-title">${item.title}</div>
                <div class="info-row-subtitle">${item.description}</div>
                <div style="margin-top:7px">
                  <span class="status-badge ${statusClass}">${item.dateText}</span>
                </div>
              </div>
              <button class="btn ${item.status === "active" ? "btn-primary" : "btn-secondary"} small-btn" ${target ? `data-go="${target}"` : `data-modal="${item.title}"`}>
                ${btnText}
              </button>
            </div>
          `;
        }).join("")}
      </article>
    </section>
  `;
}

function renderProfile() {
  return `
    <section class="screen">
      ${shellHeader(t("profile_title"), t("profile_subtitle"), false)}

      <article class="card">
        <h2>${t("academic_review")}</h2>
        <div class="profile-grid">
          <div class="profile-mini">
            <div class="profile-mini-label">${t("season_ready")}</div>
            <div class="profile-mini-value">Ready</div>
          </div>
          <div class="profile-mini">
            <div class="profile-mini-label">${t("average_result")}</div>
            <div class="profile-mini-value">${data.season.averageResult}%</div>
          </div>
          <div class="profile-mini">
            <div class="profile-mini-label">${t("practice_mastery")}</div>
            <div class="profile-mini-value">${t("good")}</div>
          </div>
          <div class="profile-mini">
            <div class="profile-mini-label">${t("next_step")}</div>
            <div class="profile-mini-value">${t("exam_prep")}</div>
          </div>
        </div>
        <div class="action-row">
          <button class="btn btn-primary" data-go="review">${t("view_review")}</button>
          <button class="btn btn-secondary" data-go="exam">${t("start_exam_prep")}</button>
        </div>
      </article>

      <article class="card">
        <h2>${t("credentials")}</h2>
        <div class="chips">
          ${data.credentials.map((c, index) => {
            const cls = index % 2 === 0 ? "chip-blue" : "chip-green";
            return `<button class="chip ${cls}" data-modal="${c}">${c}</button>`;
          }).join("")}
        </div>
      </article>
    </section>
  `;
}

function showModal(title) {
  const root = document.getElementById("modalRoot");
  root.innerHTML = `
    <div class="modal-card">
      <h2>${title || t("mock_modal_title")}</h2>
      <p class="subtext">${t("mock_modal_text")}</p>
      <div class="modal-actions">
        <button class="btn btn-primary btn-full" data-action="close-modal">${t("close")}</button>
      </div>
    </div>
  `;
  root.classList.remove("hidden");
}

function closeModal() {
  const root = document.getElementById("modalRoot");
  root.classList.add("hidden");
  root.innerHTML = "";
}

function bindEvents() {
  document.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => go(el.dataset.go));
  });

  document.querySelectorAll("[data-modal]").forEach((el) => {
    el.addEventListener("click", () => showModal(el.dataset.modal));
  });

  document.querySelectorAll("[data-action='back']").forEach((el) => {
    el.addEventListener("click", goBack);
  });
}

function render() {
  const app = document.getElementById("app");

  const screens = {
    home: renderHome,
    review: renderReview,
    exam: renderExam,
    repair: renderRepair,
    grand: renderGrand,
    profile: renderProfile
  };

  app.innerHTML = (screens[state.screen] || screens.home)();
  bindEvents();
  setActiveNav();
  applyStaticI18n();
  window.scrollTo({ top: 0, behavior: "instant" });
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => go(btn.dataset.screen));
});

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

document.getElementById("modalRoot").addEventListener("click", (event) => {
  if (event.target.id === "modalRoot" || event.target.dataset.action === "close-modal") {
    closeModal();
  }
});

applyStaticI18n();
render();
