(function () {
  const size = 6;
  const totalCells = size * size;
  const roundSeconds = 30;
  const maxLives = 3;
  const bestKey = "viralSpotGameBest";
  const streakKey = "viralSpotGameStreak";
  const dailyKey = "viralSpotGameDaily";
  const playerNameKey = "viralSpotGamePlayerName";
  const leaderboardKey = "viralSpotGameLeaderboard";

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
    },
    {
      theme: "奶茶店",
      title: "右图里有 5 个奇怪小料",
      badge: "女生局",
      hook: "奶茶主题适合做短视频封面，点击率更稳。",
      pool: ["🧋", "🥤", "🧊", "🍓", "🥭", "🍪", "🫘", "🍮"],
      swaps: [
        [3, "🧼"],
        [10, "🧯"],
        [15, "🍜"],
        [26, "🧲"],
        [33, "💎"]
      ]
    },
    {
      theme: "直播间",
      title: "主播桌上混进了 5 个怪东西",
      badge: "抖音局",
      hook: "直播间场景天然适合抖音小游戏素材。",
      pool: ["🎤", "💄", "📷", "💡", "🎁", "📦", "💬", "🛍️"],
      swaps: [
        [0, "📢"],
        [7, "🧱"],
        [19, "🧪"],
        [28, "🪤"],
        [32, "🧯"]
      ]
    },
    {
      theme: "超市货架",
      title: "找出货架上 5 个不该出现的",
      badge: "家庭局",
      hook: "货架密集图适合做高留存关卡。",
      pool: ["🥫", "🍞", "🥛", "🍎", "🧻", "🧴", "🍪", "🥚"],
      swaps: [
        [5, "🎲"],
        [11, "🧱"],
        [22, "🧯"],
        [29, "🪩"],
        [35, "🔔"]
      ]
    },
    {
      theme: "宿舍桌面",
      title: "这张宿舍桌哪里离谱",
      badge: "学生局",
      hook: "学生群体愿意互相挑战，适合群传播。",
      pool: ["📚", "💻", "🖊️", "🍜", "🎧", "🧃", "🧻", "🛏️"],
      swaps: [
        [4, "🧨"],
        [14, "🦷"],
        [21, "🧲"],
        [27, "🧪"],
        [30, "🪙"]
      ]
    },
    {
      theme: "婚礼酒桌",
      title: "酒桌上有 5 个穿帮物品",
      badge: "话题局",
      hook: "婚礼和饭局题材容易引发评论区讨论。",
      pool: ["🥂", "🍽️", "🌹", "🎂", "🍇", "🍤", "🧧", "💐"],
      swaps: [
        [2, "🪓"],
        [12, "🧪"],
        [18, "🎮"],
        [25, "🧱"],
        [34, "📣"]
      ]
    },
    {
      theme: "猫咖角落",
      title: "猫咖里有 5 个不对劲",
      badge: "治愈局",
      hook: "可爱场景能降低进入门槛，适合女性用户。",
      pool: ["🐱", "☕", "🧶", "🛋️", "🐾", "🍰", "🪴", "📷"],
      swaps: [
        [1, "🦁"],
        [8, "🧲"],
        [20, "🪤"],
        [24, "🧪"],
        [31, "🚀"]
      ]
    },
    {
      theme: "露营现场",
      title: "帐篷旁边混进了 5 个离谱物",
      badge: "户外局",
      hook: "露营题材视觉明确，适合做主题包。",
      pool: ["⛺", "🔥", "🥾", "🎒", "🌲", "🥫", "🔦", "🌙"],
      swaps: [
        [6, "💡"],
        [13, "🛒"],
        [17, "🧊"],
        [27, "🛸"],
        [33, "📺"]
      ]
    },
    {
      theme: "健身房",
      title: "健身房里 5 个东西很不健身",
      badge: "反差局",
      hook: "反差越明显，短视频评论越容易起来。",
      pool: ["🏋️", "🥤", "👟", "🧘", "💪", "🎧", "⏱️", "🧼"],
      swaps: [
        [3, "🍔"],
        [9, "🛏️"],
        [16, "🎂"],
        [23, "🧸"],
        [30, "🍟"]
      ]
    },
    {
      theme: "考试现场",
      title: "考场里有 5 个离谱小动作",
      badge: "共鸣局",
      hook: "考试题材容易共鸣，适合学生转发。",
      pool: ["📝", "📚", "⌚", "🖊️", "📄", "🪪", "🧠", "💧"],
      swaps: [
        [0, "🎮"],
        [11, "📱"],
        [18, "🍜"],
        [26, "📣"],
        [34, "💤"]
      ]
    },
    {
      theme: "火锅桌",
      title: "这锅里有 5 个不该煮的",
      badge: "美食局",
      hook: "美食类主题更容易被停留观看。",
      pool: ["🍲", "🥩", "🥬", "🍄", "🌶️", "🥢", "🧄", "🥤"],
      swaps: [
        [5, "🧼"],
        [12, "🔑"],
        [19, "🧊"],
        [28, "🧲"],
        [35, "🧶"]
      ]
    },
    {
      theme: "办公室摸鱼",
      title: "老板来之前找出 5 个摸鱼证据",
      badge: "打工局",
      hook: "打工人题材适合做挑战文案。",
      pool: ["💻", "📊", "☕", "📎", "🪑", "📱", "📝", "🧃"],
      swaps: [
        [1, "🎮"],
        [10, "🍿"],
        [17, "🎬"],
        [25, "🛌"],
        [32, "🃏"]
      ]
    },
    {
      theme: "厨房台面",
      title: "厨房里有 5 个危险信号",
      badge: "家庭局",
      hook: "安全/生活类题材适合中老年和家庭用户。",
      pool: ["🍳", "🥣", "🔪", "🥬", "🧽", "🧂", "🍅", "🔥"],
      swaps: [
        [4, "🧨"],
        [13, "🧪"],
        [20, "🧱"],
        [27, "🔌"],
        [34, "💣"]
      ]
    },
    {
      theme: "旅行箱",
      title: "行李箱里有 5 个不能带的",
      badge: "出行局",
      hook: "出行题材规则感强，适合做系列挑战。",
      pool: ["🧳", "👕", "🧦", "📷", "🪥", "🧴", "🎧", "📘"],
      swaps: [
        [2, "🧱"],
        [9, "🔥"],
        [16, "🪓"],
        [24, "🧲"],
        [31, "🥫"]
      ]
    },
    {
      theme: "宠物医院",
      title: "诊室里混进 5 个不专业物品",
      badge: "萌宠局",
      hook: "萌宠场景利于做账号矩阵切片。",
      pool: ["🐶", "🐱", "🩺", "💊", "🧴", "📋", "🦴", "🧸"],
      swaps: [
        [3, "🍕"],
        [10, "🎮"],
        [18, "📣"],
        [26, "🚀"],
        [33, "🧱"]
      ]
    },
    {
      theme: "电影院",
      title: "电影开场前找出 5 个出戏点",
      badge: "娱乐局",
      hook: "娱乐消费场景适合年轻用户。",
      pool: ["🎬", "🍿", "🥤", "🎟️", "🪑", "🎧", "📱", "⭐"],
      swaps: [
        [6, "🔦"],
        [12, "🍜"],
        [21, "📣"],
        [29, "🧱"],
        [35, "🛏️"]
      ]
    },
    {
      theme: "理发店",
      title: "Tony 桌上有 5 个离谱工具",
      badge: "段子局",
      hook: "职业梗容易做评论区互动。",
      pool: ["✂️", "💈", "🧴", "🪞", "💺", "🧼", "📷", "☕"],
      swaps: [
        [4, "🔨"],
        [11, "🍳"],
        [18, "🧲"],
        [25, "🎮"],
        [32, "🧪"]
      ]
    },
    {
      theme: "便利店",
      title: "深夜便利店哪里怪怪的",
      badge: "深夜局",
      hook: "深夜场景可以和原来的陪伴 App 方向联动。",
      pool: ["🥪", "🥤", "🍙", "🍫", "🧾", "🧊", "🌙", "🛒"],
      swaps: [
        [0, "🛸"],
        [8, "🧲"],
        [15, "🧪"],
        [27, "🧱"],
        [34, "📣"]
      ]
    },
    {
      theme: "办公室年会",
      title: "年会现场有 5 个社死点",
      badge: "社交局",
      hook: "社死题材适合群聊传播。",
      pool: ["🎤", "🎁", "🍰", "🥂", "🎈", "📷", "🧧", "⭐"],
      swaps: [
        [5, "🧻"],
        [12, "🍜"],
        [19, "🛌"],
        [26, "📣"],
        [31, "🃏"]
      ]
    },
    {
      theme: "书店角落",
      title: "安静书店里有 5 个不安静",
      badge: "轻松局",
      hook: "安静和离谱的反差容易让玩家停一下。",
      pool: ["📚", "☕", "🪑", "🪴", "📖", "🖊️", "🕯️", "🎧"],
      swaps: [
        [1, "📣"],
        [9, "🔥"],
        [14, "🎮"],
        [23, "🍜"],
        [30, "🧱"]
      ]
    },
    {
      theme: "周末菜场",
      title: "菜场摊位里有 5 个奇怪东西",
      badge: "下沉局",
      hook: "生活化题材适合更广用户。",
      pool: ["🥬", "🥕", "🥔", "🍅", "🐟", "🥚", "🛍️", "💰"],
      swaps: [
        [4, "🎮"],
        [13, "🧱"],
        [20, "📣"],
        [27, "🧲"],
        [34, "🚀"]
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
    dialogNextBtn: document.querySelector("#dialogNextBtn"),
    adDialog: document.querySelector("#adDialog"),
    adCountdown: document.querySelector("#adCountdown"),
    watchAdBtn: document.querySelector("#watchAdBtn"),
    skipAdBtn: document.querySelector("#skipAdBtn"),
    challengeTitle: document.querySelector("#challengeTitle"),
    challengeCode: document.querySelector("#challengeCode"),
    copyChallengeBtn: document.querySelector("#copyChallengeBtn"),
    leaderboardList: document.querySelector("#leaderboardList"),
    rankTag: document.querySelector("#rankTag")
  };

  const botNames = ["小林", "阿圆", "今天早睡", "打工魂", "奶茶续命", "不服再来"];

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function dailyLevelIndex() {
    return [...todayKey()].reduce((sum, char) => sum + char.charCodeAt(0), 0) % levels.length;
  }

  function getPlayerName() {
    const saved = localStorage.getItem(playerNameKey);
    if (saved) {
      return saved;
    }
    const generated = `玩家${Math.floor(100 + Math.random() * 900)}`;
    localStorage.setItem(playerNameKey, generated);
    return generated;
  }

  function challengeCode() {
    return `LP-${todayKey().replaceAll("-", "")}-${String(state.levelIndex + 1).padStart(2, "0")}`;
  }

  function getLeaderboardRecord() {
    try {
      return JSON.parse(localStorage.getItem(leaderboardKey)) || {};
    } catch {
      return {};
    }
  }

  function setLeaderboardRecord(record) {
    localStorage.setItem(leaderboardKey, JSON.stringify(record));
  }

  function seededScore(seed, index) {
    const base = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return 580 + ((base * (index + 7)) % 620) + index * 36;
  }

  function leaderboardRows() {
    const date = todayKey();
    const record = getLeaderboardRecord();
    const savedScore = record[date] || 0;
    const rows = botNames.map((name, index) => ({
      name,
      score: seededScore(date, index)
    }));
    if (savedScore > 0) {
      rows.push({ name: getPlayerName(), score: savedScore, mine: true });
    }
    return rows.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  function renderLeaderboard() {
    const rows = leaderboardRows();
    els.rankTag.textContent = localStorage.getItem(leaderboardKey) ? "今日榜" : "模拟榜";
    els.leaderboardList.innerHTML = rows
      .map((row, index) => `<li><span>#${index + 1}</span><b>${row.mine ? "我" : row.name}</b><strong>${row.score}</strong></li>`)
      .join("");
  }

  function updateLeaderboard(score) {
    const date = todayKey();
    const record = getLeaderboardRecord();
    record[date] = Math.max(record[date] || 0, score);
    setLeaderboardRecord(record);
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
    els.challengeTitle.textContent = `${level.theme}：30 秒找 5 个不对劲`;
    els.challengeCode.textContent = `${challengeCode()}｜${level.badge}`;
    els.targetCount.textContent = String(level.swaps.length);
    renderBoard(els.leftBoard, baseGrid, false);
    renderBoard(els.rightBoard, rightGrid, true);
    updateStats();
    renderLeaderboard();
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

  function revealHint() {
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

  function showHint() {
    if (state.finished || els.adDialog.open) {
      return;
    }
    clearInterval(state.timer);
    let countdown = 3;
    els.adCountdown.textContent = String(countdown);
    els.adDialog.showModal();
    const countdownTimer = setInterval(() => {
      countdown -= 1;
      els.adCountdown.textContent = String(Math.max(0, countdown));
      if (countdown <= 0) {
        clearInterval(countdownTimer);
      }
    }, 1000);
    els.watchAdBtn.onclick = () => {
      clearInterval(countdownTimer);
      if (els.adDialog.open) {
        els.adDialog.close();
      }
      revealHint();
      startTimer();
    };
    els.skipAdBtn.onclick = () => {
      clearInterval(countdownTimer);
      if (els.adDialog.open) {
        els.adDialog.close();
      }
      startTimer();
    };
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
      updateLeaderboard(state.score);
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
    renderLeaderboard();
    if (!els.resultDialog.open) {
      els.resultDialog.showModal();
    }
  }

  async function copyText(text, successText) {
    try {
      await navigator.clipboard.writeText(text);
      els.hookText.textContent = successText;
    } catch {
      els.hookText.textContent = text;
    }
  }

  function shareText() {
    const level = currentLevel();
    const streak = getStreak();
    return `我在《离谱找茬局》${level.theme}拿了 ${state.score} 分，今日挑战${state.dailyStatus}，连胜 ${streak.count || 0} 天。挑战码 ${challengeCode()}，30 秒找 5 个不对劲，你敢试吗？`;
  }

  async function copyShareText() {
    await copyText(shareText(), "战绩已复制，可以直接发群里。");
  }

  async function copyChallengeText() {
    const level = currentLevel();
    const text = `今天这关你能 30 秒找完吗？《离谱找茬局》${level.theme}，挑战码 ${challengeCode()}。`;
    await copyText(text, "好友挑战已复制，发给朋友试试。");
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
  els.copyChallengeBtn.addEventListener("click", copyChallengeText);
  els.dialogShareBtn.addEventListener("click", copyShareText);
  els.nextBtn.addEventListener("click", nextRound);
  els.dialogNextBtn.addEventListener("click", nextRound);
  els.restartBtn.addEventListener("click", () => resetRound(state.levelIndex));

  resetRound(dailyLevelIndex());
})();
