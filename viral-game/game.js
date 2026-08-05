(function () {
  const size = 6;
  const totalCells = size * size;
  const roundSeconds = 30;
  const maxLives = 3;
  const bestKey = "viralSpotGameBest";
  const streakKey = "viralSpotGameStreak";
  const dailyKey = "viralSpotGameDaily";

  const levels = [
    {
      theme: "凌晨办公室",
      title: "找出右图里 5 个不对劲",
      badge: "入门局",
      hook: "只有 8% 的人能在 30 秒内找全。",
      pool: ["💻", "☕", "📄", "🪴", "📎", "🧃", "🕯️", "🌙"],
      swaps: [
        [2, "🎮"],
        [9, "🍜"],
        [16, "💸"],
        [24, "🌵"],
        [31, "🧲"]
      ]
    },
    {
      theme: "夜宵摊",
      title: "这桌夜宵哪里怪怪的",
      badge: "上头局",
      hook: "这一关很适合发给朋友互相挑战。",
      pool: ["🍢", "🥤", "🥟", "🌶️", "🥬", "🍜", "🧄", "🔥"],
      swaps: [
        [4, "🪥"],
        [13, "🧪"],
        [18, "🧊"],
        [27, "🧯"],
        [34, "🧶"]
      ]
    },
    {
      theme: "通勤地铁",
      title: "右图混进了 5 个离谱物品",
      badge: "传播局",
      hook: "截图发群里，通常会有人不服。",
      pool: ["🎧", "📱", "🎒", "🧢", "🚇", "📚", "🥪", "🪪"],
      swaps: [
        [1, "📣"],
        [8, "🧱"],
        [20, "🧳"],
        [25, "🚀"],
        [35, "🃏"]
      ]
    },
    {
      theme: "睡前房间",
      title: "困了也要找完这 5 个",
      badge: "留存局",
      hook: "过关后很容易想再点下一关。",
      pool: ["🛏️", "📚", "🧸", "🧦", "💡", "📱", "🌙", "🪞"],
      swaps: [
        [6, "🛸"],
        [12, "🍔"],
        [17, "🗿"],
        [23, "🌞"],
        [30, "🍳"]
      ]
    }
  ];

  const state = {
    levelIndex: 0,
    found: new Set(),
    lives: maxLives,
    score: 0,
    timeLeft: roundSeconds,
    timer: null,
    finished: false,
    dailyStatus: "未完成"
  };

  const els = {
    leftBoard: document.querySelector("#leftBoard"),
    rightBoard: document.querySelector("#rightBoard"),
    timeLeft: document.querySelector("#timeLeft"),
    foundCount: document.querySelector("#foundCount"),
    targetCount: document.querySelector("#targetCount"),
    livesText: document.querySelector("#livesText"),
    scoreText: document.querySelector("#scoreText"),
    bestInlineText: document.querySelector("#bestInlineText"),
    streakText: document.querySelector("#streakText"),
    dailyLabel: document.querySelector("#dailyLabel"),
    levelKicker: document.querySelector("#levelKicker"),
    levelTitle: document.querySelector("#levelTitle"),
    difficultyBadge: document.querySelector("#difficultyBadge"),
    hookText: document.querySelector("#hookText"),
    hintBtn: document.querySelector("#hintBtn"),
    shareBtn: document.querySelector("#shareBtn"),
    nextBtn: document.querySelector("#nextBtn"),
    restartBtn: document.querySelector("#restartBtn"),
    resultDialog: document.querySelector("#resultDialog"),
    resultKicker: document.querySelector("#resultKicker"),
    resultTitle: document.querySelector("#resultTitle"),
    resultBody: document.querySelector("#resultBody"),
    finalScore: document.querySelector("#finalScore"),
    bestScore: document.querySelector("#bestScore"),
    dailyResult: document.querySelector("#dailyResult"),
    streakResult: document.querySelector("#streakResult"),
    dialogShareBtn: document.querySelector("#dialogShareBtn"),
    dialogNextBtn: document.querySelector("#dialogNextBtn")
  };

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function dailyLevelIndex() {
    return [...todayKey()].reduce((sum, char) => sum + char.charCodeAt(0), 0) % levels.length;
  }

  function getStreak() {
    try {
      return JSON.parse(localStorage.getItem(streakKey)) || { count: 0, lastWin: "" };
    } catch {
      return { count: 0, lastWin: "" };
    }
  }

  function setStreak(record) {
    localStorage.setItem(streakKey, JSON.stringify(record));
  }

  function updateDailyStatus(won) {
    const date = todayKey();
    const record = JSON.parse(localStorage.getItem(dailyKey) || "{}");
    if (won) {
      record[date] = "done";
      localStorage.setItem(dailyKey, JSON.stringify(record));
    }
    state.dailyStatus = record[date] === "done" ? "已完成" : "未完成";
  }

  function buildBaseGrid(level) {
    return Array.from({ length: totalCells }, (_, index) => level.pool[index % level.pool.length]);
  }

  function buildRightGrid(level, baseGrid) {
    const grid = [...baseGrid];
    level.swaps.forEach(([index, to]) => {
      grid[index] = to;
    });
    return grid;
  }

  function renderBoard(board, grid, clickable) {
    board.innerHTML = "";
    grid.forEach((emoji, index) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.type = "button";
      cell.textContent = emoji;
      cell.dataset.index = String(index);
      cell.setAttribute("aria-label", clickable ? `右图第 ${index + 1} 格` : `原图第 ${index + 1} 格`);
      if (!clickable) {
        cell.disabled = true;
      }
      board.appendChild(cell);
    });
  }

  function currentLevel() {
    return levels[state.levelIndex % levels.length];
  }

  function resetRound(nextLevel) {
    if (typeof nextLevel === "number") {
      state.levelIndex = nextLevel;
    }
    state.found = new Set();
    state.lives = maxLives;
    state.score = 0;
    state.timeLeft = roundSeconds;
    state.finished = false;
    clearInterval(state.timer);
    updateDailyStatus(false);

    const level = currentLevel();
    const baseGrid = buildBaseGrid(level);
    const rightGrid = buildRightGrid(level, baseGrid);

    els.dailyLabel.textContent = state.levelIndex === dailyLevelIndex() ? `今日挑战 ${todayKey()}` : "练习关卡";
    els.levelKicker.textContent = level.theme;
    els.levelTitle.textContent = level.title;
    els.difficultyBadge.textContent = level.badge;
    els.hookText.textContent = level.hook;
    els.targetCount.textContent = String(level.swaps.length);
    renderBoard(els.leftBoard, baseGrid, false);
    renderBoard(els.rightBoard, rightGrid, true);
    updateStats();
    startTimer();
  }

  function startTimer() {
    state.timer = setInterval(() => {
      state.timeLeft -= 1;
      updateStats();
      if (state.timeLeft <= 0) {
        finishRound(false, "时间到了", "你已经很接近了，下一局先扫边角。");
      }
    }, 1000);
  }

  function updateStats() {
    const streak = getStreak();
    els.timeLeft.textContent = String(Math.max(0, state.timeLeft));
    els.foundCount.textContent = String(state.found.size);
    els.livesText.textContent = "❤".repeat(state.lives) + "♡".repeat(maxLives - state.lives);
    els.scoreText.textContent = String(state.score);
    els.bestInlineText.textContent = String(Number(localStorage.getItem(bestKey) || 0));
    els.streakText.textContent = String(streak.count || 0);
  }

  function isDiffIndex(index) {
    return currentLevel().swaps.some(([swapIndex]) => swapIndex === index);
  }

  function handleCellClick(event) {
    const cell = event.target.closest(".cell");
    if (!cell || state.finished) {
      return;
    }

    const index = Number(cell.dataset.index);
    if (state.found.has(index)) {
      return;
    }

    if (isDiffIndex(index)) {
      state.found.add(index);
      cell.classList.add("found");
      cell.classList.remove("hint");
      state.score += 120 + state.timeLeft * 2;
      if (state.found.size === currentLevel().swaps.length) {
        finishRound(true, "找全了", "这局可以发出去炫一下。");
      }
    } else {
      state.lives -= 1;
      state.score = Math.max(0, state.score - 60);
      cell.classList.add("wrong");
      window.setTimeout(() => cell.classList.remove("wrong"), 520);
      if (state.lives <= 0) {
        finishRound(false, "三次点错", "这种关卡就该让朋友也来试一下。");
      }
    }
    updateStats();
  }

  function showHint() {
    if (state.finished) {
      return;
    }
    const remaining = currentLevel().swaps
      .map(([index]) => index)
      .filter((index) => !state.found.has(index));
    const index = remaining[0];
    if (typeof index !== "number") {
      return;
    }
    const cell = els.rightBoard.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.classList.add("hint");
      state.score = Math.max(0, state.score - 80);
      updateStats();
    }
  }

  function updateWinStreak(won) {
    const record = getStreak();
    const date = todayKey();
    if (!won) {
      return record;
    }
    if (record.lastWin === date) {
      return record;
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);
    const nextRecord = {
      count: record.lastWin === yesterdayKey ? (record.count || 0) + 1 : 1,
      lastWin: date
    };
    setStreak(nextRecord);
    return nextRecord;
  }

  function finishRound(won, title, body) {
    if (state.finished) {
      return;
    }
    state.finished = true;
    clearInterval(state.timer);
    if (won) {
      state.score += state.timeLeft * 10 + state.lives * 100;
      updateDailyStatus(true);
    }
    const streak = updateWinStreak(won);
    const best = Math.max(Number(localStorage.getItem(bestKey) || 0), state.score);
    localStorage.setItem(bestKey, String(best));
    updateStats();

    els.resultKicker.textContent = won ? "挑战成功" : "本局结束";
    els.resultTitle.textContent = title;
    els.resultBody.textContent = body;
    els.finalScore.textContent = String(state.score);
    els.bestScore.textContent = String(best);
    els.dailyResult.textContent = state.dailyStatus;
    els.streakResult.textContent = String(streak.count || 0);
    if (!els.resultDialog.open) {
      els.resultDialog.showModal();
    }
  }

  async function copyShareText() {
    const level = currentLevel();
    const streak = getStreak();
    const text = `我在《离谱找茬局》${level.theme}拿了 ${state.score} 分，今日挑战${state.dailyStatus}，连胜 ${streak.count || 0} 天。30 秒找 5 个不对劲，你敢试吗？`;
    try {
      await navigator.clipboard.writeText(text);
      els.hookText.textContent = "战绩已复制，可以直接发群里。";
    } catch {
      els.hookText.textContent = text;
    }
  }

  function nextRound() {
    if (els.resultDialog.open) {
      els.resultDialog.close();
    }
    resetRound((state.levelIndex + 1) % levels.length);
  }

  els.rightBoard.addEventListener("click", handleCellClick);
  els.hintBtn.addEventListener("click", showHint);
  els.shareBtn.addEventListener("click", copyShareText);
  els.dialogShareBtn.addEventListener("click", copyShareText);
  els.nextBtn.addEventListener("click", nextRound);
  els.dialogNextBtn.addEventListener("click", nextRound);
  els.restartBtn.addEventListener("click", () => resetRound(state.levelIndex));

  resetRound(dailyLevelIndex());
})();
