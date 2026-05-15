(function () {
  "use strict";

  window.ICLUB_PREVIEW_MODE = true;
  window.ICLUB_DB_OFF = true;

  const LS = {
    state: "iclub_state_v1",
    profile: "iclub_profile_v1",
    pendingOps: "iclub_pending_ops_v1",
    botLinked: "iclub_bot_linked_v1"
  };

  const mockProfile = {
    id: "00000000-0000-4000-8000-000000000001",
    created_at: new Date().toISOString(),
    full_name: "iClub Preview Student",
    language: "ru",
    uiLanguage: "ru",
    is_school_student: true,
    region_id: 1,
    district_id: 1,
    region: "Toshkent",
    district: "Preview district",
    region_tr: {
      ru: "Ташкент",
      uz: "Toshkent",
      en: "Tashkent"
    },
    district_tr: {
      ru: "Preview district",
      uz: "Preview district",
      en: "Preview district"
    },
    school: "Preview School",
    class: "10",
    telegram: {
      id: "999000111",
      username: "preview_student",
      first_name: "Preview",
      last_name: "Student",
      photo_url: null
    },
    subjects: [
      { key: "economics", mode: "competitive", pinned: true },
      { key: "mathematics", mode: "competitive", pinned: true },
      { key: "biology", mode: "study", pinned: true },
      { key: "chemistry", mode: "study", pinned: true },
      { key: "informatics", mode: "study", pinned: true }
    ]
  };

  const mockState = {
    tab: "home",
    prevTab: "home",
    viewStack: ["home"],
    courses: {
      stack: ["all-subjects"],
      subjectKey: null,
      lessonId: null,
      entryTab: "home",
      lastTourAttemptId: null,
      lastTourCertificateId: null
    },
    profile: {
      stack: ["main"]
    },
    certificates: {
      selectedId: null,
      lastIssuedId: null
    },
    about: {
      tab: "project",
      teamScreen: "overview",
      teamPrevScreen: "overview",
      teamMemberKey: null,
      teamEntry: null
    },
    quizLock: null
  };

  try {
    localStorage.setItem(LS.profile, JSON.stringify(mockProfile));
    localStorage.setItem(LS.state, JSON.stringify(mockState));
    localStorage.setItem(LS.pendingOps, JSON.stringify([]));
    localStorage.setItem(LS.botLinked, "1");
  } catch {}

  window.addEventListener("DOMContentLoaded", function () {
    try {
      const badge = document.createElement("div");
      badge.textContent = "Preview · DB off";
      badge.style.position = "fixed";
      badge.style.left = "12px";
      badge.style.bottom = "74px";
      badge.style.zIndex = "9999";
      badge.style.padding = "7px 10px";
      badge.style.borderRadius = "999px";
      badge.style.background = "rgba(21, 94, 239, 0.92)";
      badge.style.color = "#fff";
      badge.style.fontSize = "11px";
      badge.style.fontWeight = "800";
      badge.style.boxShadow = "0 10px 24px rgba(15,23,42,.18)";
      document.body.appendChild(badge);
    } catch {}
  });
})();
