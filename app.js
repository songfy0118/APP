const STORAGE_KEY = "jinwan_bushui_records_v1";
const SESSION_KEY = "jinwan_bushui_session_v1";
const config = window.NIGHT_APP_CONFIG;

const state = {
  records: loadRecords(),
  session: loadSession(),
  mood: config.defaultMood,
  roomSeed: 0,
};

const $ = (selector) => document.querySelector(selector);
const currentTime = $("#currentTime");
const elapsedTime = $("#elapsedTime");
const sessionBadge = $("#sessionBadge");
const statusLine = $("#statusLine");
const companionLine = $("#companionLine");
const startNight = $("#startNight");
const endNight = $("#endNight");
const nightNote = $("#nightNote");
const moodGrid = $("#moodGrid");
const recordList = $("#recordList");
const recordCount = $("#recordCount");
const weekNights = $("#weekNights");
const avgDuration = $("#avgDuration");
const latestEnd = $("#latestEnd");
const heatmap = $("#heatmap");
const barChart = $("#barChart");
const radarChart = $("#radarChart");
const personaName = $("#personaName");
const reportTitle = $("#reportTitle");
const reportBody = $("#reportBody");
const roomList = $("#roomList");
const toast = $("#toast");
const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".app-screen");
const watchActions = $("#watchActions");
const watchFace = $("#watchFace");
const watchMood = $("#watchMood");
const watchReply = $("#watchReply");
const watchWeekCount = $("#watchWeekCount");
const watchTopMood = $("#watchTopMood");
const watchLatestTime = $("#watchLatestTime");
const watchTimeline = $("#watchTimeline");

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedRecords();
  } catch {
    return seedRecords();
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

function saveSession() {
  if (state.session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(state.session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function seedRecords() {
  const now = new Date();
  return [1, 3, 5, 8, 11].map((daysAgo, index) => {
    const start = new Date(now);
    start.setDate(now.getDate() - daysAgo);
    start.setHours(23 + (index % 2), 18 + index * 4, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 2 + (index % 3), 20 + index * 3);
    return {
      id: crypto.randomUUID(),
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      mood: ["脑子停不下来", "舍不得今天结束", "焦虑", "有点空", "还很清醒"][index],
      note: ["明天还有一堆事。", "舍不得今天就这么没了。", "脑子里像有很多窗口。", "只是突然不想睡。", "夜里反而更清醒。"][index],
      reply: "你把这一晚记下来了，它就不算完全白白溜走。",
      savedOnly: false,
    };
  });
}

function formatClock(date) {
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDate(date) {
  return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit", weekday: "short" });
}

function formatDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationShort(ms) {
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h${m}m` : `${h}h`;
}

function currentElapsed() {
  if (!state.session) return 0;
  return Date.now() - new Date(state.session.startAt).getTime();
}

function chooseReply(mood, note = "") {
  const bank = config.companionLines[mood] || config.companionLines[config.defaultMood];
  const base = bank[Math.floor(Math.random() * bank.length)];
  const keywordMatch = config.keywordReplies.find((item) => item.keywords.some((keyword) => note.includes(keyword)));
  if (keywordMatch) return keywordMatch.reply;
  return base;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateClock() {
  const now = new Date();
  currentTime.textContent = formatClock(now);

  if (state.session) {
    elapsedTime.textContent = formatDuration(currentElapsed());
    sessionBadge.textContent = `从 ${formatClock(new Date(state.session.startAt))} 开始`;
    statusLine.textContent = "今晚正在被记录。";
    startNight.disabled = true;
    endNight.disabled = false;
  } else {
    elapsedTime.textContent = "00:00:00";
    sessionBadge.textContent = "还没有开始记录";
    statusLine.textContent = "你还没开始今晚的档案。";
    startNight.disabled = false;
    endNight.disabled = true;
  }
}

function startSession() {
  state.session = {
    id: crypto.randomUUID(),
    startAt: new Date().toISOString(),
    mood: state.mood,
    note: "",
    reply: "",
  };
  saveSession();
  companionLine.textContent = chooseReply(state.mood);
  showToast("今晚开始记录了");
  updateClock();
}

function endSession() {
  if (!state.session) return;
  const note = nightNote.value.trim();
  const reply = companionLine.textContent || chooseReply(state.mood, note);
  const record = {
    id: state.session.id,
    startAt: state.session.startAt,
    endAt: new Date().toISOString(),
    mood: state.mood,
    note,
    reply,
    savedOnly: false,
  };
  state.records.unshift(record);
  state.session = null;
  nightNote.value = "";
  saveRecords();
  saveSession();
  companionLine.textContent = "今晚已经收进档案。困了就走，不用证明什么。";
  showToast("本晚档案已保存");
  renderAll();
}

function saveMoment() {
  const note = nightNote.value.trim();
  if (!note) {
    showToast("先写一句，再保存片刻");
    return;
  }
  const now = new Date();
  const record = {
    id: crypto.randomUUID(),
    startAt: state.session?.startAt || now.toISOString(),
    endAt: now.toISOString(),
    mood: state.mood,
    note,
    reply: chooseReply(state.mood, note),
    savedOnly: true,
  };
  state.records.unshift(record);
  nightNote.value = "";
  companionLine.textContent = record.reply;
  saveRecords();
  showToast("这一刻已保存");
  renderAll();
}

function saveWatchMoment(item) {
  const now = new Date();
  const record = {
    id: crypto.randomUUID(),
    startAt: now.toISOString(),
    endAt: now.toISOString(),
    mood: item.mood,
    note: `Apple Watch 10 秒缓冲：${item.mood}`,
    reply: item.reply,
    savedOnly: true,
    source: "watch",
  };
  state.records.unshift(record);
  saveRecords();
  renderAll();
}

function getDuration(record) {
  return new Date(record.endAt).getTime() - new Date(record.startAt).getTime();
}

function isThisWeek(date) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
}

function renderStats() {
  recordCount.textContent = `${state.records.length} 晚`;
  const week = state.records.filter((record) => isThisWeek(record.endAt));
  weekNights.textContent = week.length;

  const completed = state.records.filter((record) => !record.savedOnly);
  const avg = completed.length ? completed.reduce((sum, record) => sum + getDuration(record), 0) / completed.length : 0;
  avgDuration.textContent = formatDurationShort(avg);

  const latest = completed.reduce((winner, record) => {
    if (!winner) return record;
    const current = new Date(record.endAt);
    const best = new Date(winner.endAt);
    return current.getHours() * 60 + current.getMinutes() > best.getHours() * 60 + best.getMinutes() ? record : winner;
  }, null);
  latestEnd.textContent = latest ? formatClock(new Date(latest.endAt)) : "--:--";
}

function getWatchRecords() {
  return state.records.filter((record) => record.source === "watch");
}

function renderHeatmap() {
  heatmap.innerHTML = "";
  const byDay = new Map();
  state.records.forEach((record) => {
    const key = new Date(record.endAt).toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) || 0) + getDuration(record));
  });

  for (let i = 34; i >= 0; i -= 1) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const key = day.toISOString().slice(0, 10);
    const hours = (byDay.get(key) || 0) / 3600000;
    const level = hours > 4 ? 3 : hours > 2 ? 2 : hours > 0 ? 1 : 0;
    const cell = document.createElement("div");
    cell.className = "heat-cell";
    cell.dataset.level = String(level);
    cell.title = `${formatDate(day)} · ${hours ? hours.toFixed(1) : 0} 小时`;
    heatmap.appendChild(cell);
  }
}

function renderBars() {
  barChart.innerHTML = "";
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const key = day.toISOString().slice(0, 10);
    const total = state.records
      .filter((record) => new Date(record.endAt).toISOString().slice(0, 10) === key)
      .reduce((sum, record) => sum + getDuration(record), 0);
    days.push({ day, total });
  }
  const max = Math.max(...days.map((item) => item.total), 1);

  days.forEach(({ day, total }) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.max(8, (total / max) * 96)}px`;
    const label = document.createElement("span");
    label.textContent = day.toLocaleDateString("zh-CN", { weekday: "short" }).replace("周", "");
    wrap.append(bar, label);
    barChart.appendChild(wrap);
  });
}

function getPersonaScores() {
  const records = state.records;
  const completed = records.filter((record) => !record.savedOnly);
  const lateCount = completed.filter((record) => new Date(record.endAt).getHours() >= 2 || new Date(record.endAt).getHours() < 7).length;
  const anxious = records.filter((record) => ["脑子停不下来", "焦虑"].includes(record.mood)).length;
  const social = records.filter((record) => record.mood === "想找人说话").length;
  const repair = records.filter((record) => record.note.length > 8 || record.savedOnly).length;
  const avgHours = completed.length ? completed.reduce((sum, record) => sum + getDuration(record), 0) / completed.length / 3600000 : 0;

  return [
    Math.min(95, 35 + avgHours * 14),
    Math.min(95, 28 + anxious * 13),
    Math.min(95, 30 + records.length * 7),
    Math.min(95, 34 + repair * 10),
    Math.min(95, 28 + social * 18),
    Math.min(95, 34 + lateCount * 11),
  ].map(Math.round);
}

function getPersonaName(scores) {
  const max = Math.max(...scores);
  const index = scores.indexOf(max);
  return config.persona.names[index];
}

function renderRadar() {
  const labels = config.persona.labels;
  const scores = getPersonaScores();
  personaName.textContent = getPersonaName(scores);
  const cx = 150;
  const cy = 128;
  const radius = 82;
  const points = scores.map((score, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / scores.length;
    const r = (score / 100) * radius;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  });
  const rings = [0.25, 0.5, 0.75, 1]
    .map((scale) => {
      const p = labels.map((_, i) => {
        const angle = -Math.PI / 2 + (i * Math.PI * 2) / labels.length;
        return `${cx + Math.cos(angle) * radius * scale},${cy + Math.sin(angle) * radius * scale}`;
      });
      return `<polygon points="${p.join(" ")}" fill="none" stroke="rgba(238,243,255,.12)" stroke-width="1" />`;
    })
    .join("");
  const axes = labels
    .map((label, i) => {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / labels.length;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const lx = cx + Math.cos(angle) * (radius + 25);
      const ly = cy + Math.sin(angle) * (radius + 22);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(238,243,255,.12)" /><text x="${lx}" y="${ly}" fill="#99a4c2" font-size="10" text-anchor="middle">${label}</text>`;
    })
    .join("");
  radarChart.innerHTML = `
    ${rings}
    ${axes}
    <polygon points="${points.join(" ")}" fill="rgba(110,141,255,.32)" stroke="#6e8dff" stroke-width="3" />
    <circle cx="${cx}" cy="${cy}" r="3" fill="#f4ca67" />
  `;
}

function renderRecords() {
  recordList.innerHTML = "";
  const records = state.records.slice(0, 6);
  if (!records.length) {
    recordList.innerHTML = `<div class="record"><div><strong>还没有档案</strong><small>今晚开始记录后会出现在这里。</small></div></div>`;
    return;
  }

  records.forEach((record) => {
    const start = new Date(record.startAt);
    const end = new Date(record.endAt);
    const item = document.createElement("article");
    item.className = "record";
    item.innerHTML = `
      <div>
        <strong>${formatDate(end)} · ${formatClock(start)} - ${formatClock(end)}</strong>
        <small>${record.mood} · ${record.savedOnly ? "片刻记录" : formatDurationShort(getDuration(record))}</small>
        <p>${escapeHtml(record.note || record.reply || "这一晚没有留下文字。")}</p>
      </div>
      <span class="record-tag">${record.savedOnly ? "片刻" : "档案"}</span>
    `;
    recordList.appendChild(item);
  });
}

function renderReport() {
  const week = state.records.filter((record) => isThisWeek(record.endAt));
  if (!week.length) {
    reportTitle.textContent = config.reportCopy.emptyTitle;
    reportBody.textContent = config.reportCopy.emptyBody;
    return;
  }
  const completed = week.filter((record) => !record.savedOnly);
  const latest = completed.reduce((winner, record) => {
    if (!winner) return record;
    return new Date(record.endAt) > new Date(winner.endAt) ? record : winner;
  }, null);
  const persona = getPersonaName(getPersonaScores());
  const mood = mostCommon(week.map((record) => record.mood));
  const watchCount = week.filter((record) => record.source === "watch").length;
  const watchLine = watchCount ? `腕上缓冲触发了 ${watchCount} 次。` : "";
  reportTitle.textContent = `本周人格：${persona}`;
  reportBody.textContent = `你这周留下了 ${week.length} 条深夜记录，最常出现的状态是“${mood}”。${latest ? `最晚一次停在 ${formatClock(new Date(latest.endAt))}。` : ""}${watchLine} ${config.reportCopy.advice}`;
}

function mostCommon(values) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "还很清醒";
}

function renderRoom() {
  roomList.innerHTML = "";
  const members = config.roomMembers;
  const rotated = members.map((item, index) => members[(index + state.roomSeed) % members.length]);
  rotated.slice(0, 4).forEach(({ name, status, awake }) => {
    const row = document.createElement("div");
    row.className = "room-member";
    row.innerHTML = `
      <div>
        <strong>${name}</strong>
        <span>${status}</span>
      </div>
      <div class="room-dot${awake ? "" : " dim"}" aria-hidden="true"></div>
    `;
    roomList.appendChild(row);
  });
}

function renderWatchActions() {
  watchActions.innerHTML = "";
  config.watchMoods.forEach((item) => {
    const button = document.createElement("button");
    button.className = "watch-action";
    button.type = "button";
    button.textContent = item.mood;
    button.addEventListener("click", () => {
      watchFace.textContent = item.face;
      watchMood.textContent = item.mood;
      watchReply.textContent = item.prompt || item.reply;
      saveWatchMoment(item);
      showToast("已记录一次腕上缓冲");
    });
    watchActions.appendChild(button);
  });
}

function renderWatchSummary() {
  const watchRecords = getWatchRecords();
  const week = watchRecords.filter((record) => isThisWeek(record.endAt));
  const latest = watchRecords[0];
  watchWeekCount.textContent = String(week.length);
  watchTopMood.textContent = week.length ? mostCommon(week.map((record) => record.mood)) : "--";
  watchLatestTime.textContent = latest ? formatClock(new Date(latest.endAt)) : "--:--";

  watchTimeline.innerHTML = "";
  if (!watchRecords.length) {
    watchTimeline.innerHTML = `<div class="watch-empty">点一次手表状态后，这里会出现最近的腕上缓冲。</div>`;
    return;
  }

  watchRecords.slice(0, 3).forEach((record) => {
    const item = document.createElement("article");
    item.className = "watch-log";
    item.innerHTML = `
      <span>${record.mood}</span>
      <div>
        <strong>${formatClock(new Date(record.endAt))}</strong>
        <p>${escapeHtml(record.reply)}</p>
      </div>
    `;
    watchTimeline.appendChild(item);
  });
}

function renderAll() {
  updateClock();
  renderStats();
  renderHeatmap();
  renderBars();
  renderRadar();
  renderRecords();
  renderReport();
  renderRoom();
  renderWatchActions();
  renderWatchSummary();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

moodGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".mood");
  if (!button) return;
  document.querySelectorAll(".mood").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  state.mood = button.dataset.mood;
  if (state.session) {
    state.session.mood = state.mood;
    saveSession();
  }
});

startNight.addEventListener("click", startSession);
endNight.addEventListener("click", endSession);

$("#askMoon").addEventListener("click", () => {
  companionLine.textContent = chooseReply(state.mood, nightNote.value.trim());
});

$("#saveMoment").addEventListener("click", saveMoment);

$("#refreshRoom").addEventListener("click", () => {
  state.roomSeed = (state.roomSeed + 1) % config.roomMembers.length;
  renderRoom();
  showToast("同伴状态已刷新");
});

$("#copyReport").addEventListener("click", async () => {
  const text = `${reportTitle.textContent}\n${reportBody.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("报告文案已复制");
  } catch {
    showToast(text);
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === target));
  });
});

window.setInterval(updateClock, 1000);
renderAll();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
