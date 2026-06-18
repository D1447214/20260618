const companions = [
  {
    id: "nora",
    name: "Nora",
    category: "rank",
    categoryLabel: "排位上分",
    games: ["APEX", "Valorant"],
    rank: "鑽石射手",
    style: "節奏清楚、報位乾淨，擅長把混亂會戰拆成可以執行的小目標。",
    rating: 4.9,
    reviews: 328,
    price: 520,
    online: true,
    tags: ["控槍", "報位", "上分"],
  },
  {
    id: "kai",
    name: "Kai",
    category: "rank",
    categoryLabel: "排位上分",
    games: ["LOL"],
    rank: "大師打野",
    style: "重視兵線與資源交換，會邊打邊說明每波決策的原因。",
    rating: 4.8,
    reviews: 241,
    price: 480,
    online: true,
    tags: ["觀念", "打野", "營運"],
  },
  {
    id: "mika",
    name: "Mika",
    category: "practice",
    categoryLabel: "技巧練習",
    games: ["Valorant", "APEX"],
    rank: "不朽教練",
    style: "用短回合訓練準星、身位與道具，適合想穩定進步的玩家。",
    rating: 4.9,
    reviews: 189,
    price: 420,
    online: false,
    tags: ["準星", "身位", "復盤"],
  },
  {
    id: "rio",
    name: "Rio",
    category: "practice",
    categoryLabel: "技巧練習",
    games: ["Genshin", "LOL"],
    rank: "深淵滿星",
    style: "擅長角色養成、隊伍配置與路線規劃，語氣溫和但重點很準。",
    rating: 4.7,
    reviews: 156,
    price: 360,
    online: true,
    tags: ["養成", "配隊", "路線"],
  },
  {
    id: "yuna",
    name: "Yuna",
    category: "fun",
    categoryLabel: "輕鬆娛樂",
    games: ["Minecraft", "Genshin"],
    rank: "氣氛擔當",
    style: "聊天自然、反應快，適合想放鬆、探索地圖或一起完成日常。",
    rating: 5.0,
    reviews: 402,
    price: 300,
    online: true,
    tags: ["聊天", "探索", "日常"],
  },
  {
    id: "sora",
    name: "Sora",
    category: "fun",
    categoryLabel: "輕鬆娛樂",
    games: ["LOL", "Minecraft", "APEX"],
    rank: "全能開黑",
    style: "可以認真也可以玩梗，最擅長把隊伍氣氛保持在剛剛好的狀態。",
    rating: 4.8,
    reviews: 277,
    price: 320,
    online: false,
    tags: ["開黑", "語音", "娛樂"],
  },
  {
    id: "ren",
    name: "Ren",
    category: "rank",
    categoryLabel: "排位上分",
    games: ["Valorant"],
    rank: "輻能指揮",
    style: "擅長開局部署與轉點判斷，會用簡短口令帶隊伍穩住每一回合。",
    rating: 4.9,
    reviews: 214,
    price: 560,
    online: true,
    tags: ["指揮", "轉點", "控圖"],
  },
  {
    id: "luna",
    name: "Luna",
    category: "rank",
    categoryLabel: "排位上分",
    games: ["LOL", "APEX"],
    rank: "宗師輔助",
    style: "擅長視野節奏與團戰保排，適合想把積分打得更穩的玩家。",
    rating: 4.8,
    reviews: 193,
    price: 500,
    online: false,
    tags: ["視野", "團戰", "節奏"],
  },
  {
    id: "ace",
    name: "Ace",
    category: "practice",
    categoryLabel: "技巧練習",
    games: ["APEX", "Valorant"],
    rank: "職業陪練",
    style: "用 1 對 1 練槍與情境演練找出失誤，適合短時間密集提升。",
    rating: 4.9,
    reviews: 267,
    price: 460,
    online: true,
    tags: ["練槍", "對槍", "反應"],
  },
  {
    id: "hana",
    name: "Hana",
    category: "practice",
    categoryLabel: "技巧練習",
    games: ["LOL", "Genshin"],
    rank: "系統教學",
    style: "會把角色理解、出裝與練習目標整理成清單，陪你一項一項補強。",
    rating: 4.7,
    reviews: 142,
    price: 380,
    online: true,
    tags: ["教學", "角色", "清單"],
  },
  {
    id: "mochi",
    name: "Mochi",
    category: "fun",
    categoryLabel: "輕鬆娛樂",
    games: ["Minecraft", "LOL"],
    rank: "派對主持",
    style: "很會接話與帶活動，適合多人開黑、建築企劃或下班後放鬆場。",
    rating: 5.0,
    reviews: 356,
    price: 310,
    online: true,
    tags: ["多人", "活動", "放鬆"],
  },
  {
    id: "zero",
    name: "Zero",
    category: "fun",
    categoryLabel: "輕鬆娛樂",
    games: ["APEX", "Valorant", "Minecraft"],
    rank: "深夜開黑",
    style: "聲線沉穩、節奏不催，適合想邊玩邊聊或慢慢解任務的夜貓玩家。",
    rating: 4.8,
    reviews: 228,
    price: 340,
    online: false,
    tags: ["深夜", "聊天", "任務"],
  },
];

const plans = [
  {
    id: "free",
    name: "Free",
    price: "NT$0",
    note: "基本搜尋與預約功能",
    features: ["瀏覽陪玩名單", "建立預約單", "基礎影片摘要"],
  },
  {
    id: "plus",
    name: "Plus",
    price: "NT$199 / 月",
    note: "更快找到適合的陪玩",
    features: ["優先媒合", "每月 1 次進階覆盤", "收藏常用陪玩", "預約提醒"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "NT$499 / 月",
    note: "給重視進步與效率的玩家",
    features: ["最高媒合優先權", "每月 4 次進階覆盤", "陪玩表現紀錄", "專屬訓練建議"],
  },
];

const categoryCopy = {
  rank: {
    hint: "已切換到排位上分，優先顯示擅長指揮與穩定勝率的陪玩。",
  },
  practice: {
    hint: "已切換到技巧練習，適合找教練陪你拆解問題。",
  },
  fun: {
    hint: "已切換到輕鬆娛樂，適合開黑、探索與放鬆。",
  },
};

const keywordAnalysisCopy = {
  diagnosis: {
    title: "精準診斷分析",
    summary: "先找出問題來源，再決定要練什麼，避免把時間花在無效重複操作。",
    points: [
      "先看死亡回合與失誤來源，釐清是站位、視野、操作還是溝通問題。",
      "把每次失誤拆成可量化指標，讓你知道該先修哪個環節。",
      "適合想快速抓出瓶頸、但不想盲練的玩家。",
    ],
    preset: "我想先找出自己最常失誤的來源，請幫我做精準診斷。",
  },
  review: {
    title: "實戰覆盤分析",
    summary: "把比賽過程拆開回看，從關鍵回合找出可立即修正的決策。",
    points: [
      "聚焦會戰開啟、撤退時機與資源交換的選擇是否合理。",
      "回看影片時，優先檢查死亡前 10 秒的資訊量與站位。",
      "適合已經有實戰經驗，但想把檢討變成下一場策略的玩家。",
    ],
    preset: "我想看實戰覆盤，請幫我分析站位、決策和會戰時機。",
  },
  "win-rate": {
    title: "勝率優化分析",
    summary: "把目標直接對準排位上分，從角色、節奏到執行逐步拉高勝率。",
    points: [
      "先找出最容易輸分的局面，優先改善最影響結果的選擇。",
      "把角色池、開局節奏與團戰執行整理成固定策略。",
      "適合目標明確、想直接提升排名的玩家。",
    ],
    preset: "我想提升勝率，請直接幫我分析排位上分的優化方向。",
  },
  data: {
    title: "數據化提升分析",
    summary: "用可追蹤的方式看進步，不靠感覺，讓訓練更有依據。",
    points: [
      "把 KDA、擊殺參與、死亡時間或資源交換整理成可追蹤指標。",
      "用數據比較訓練前後的差異，確認哪個環節真的有效。",
      "適合想穩定進步、重視客觀驗證的玩家。",
    ],
    preset: "我想用數據化方式分析進步，請幫我找出可追蹤的指標。",
  },
  custom: {
    title: "客製化指導分析",
    summary: "針對你目前最卡的地方，直接給出最貼合的練習方案。",
    points: [
      "先辨識你的弱點，再把訓練拆成短期可執行的步驟。",
      "讓建議對應你的遊戲習慣，而不是套用同一份通用模板。",
      "適合希望有人一對一帶練、解決個人瓶頸的玩家。",
    ],
    preset: "我需要客製化指導，請根據我的弱點給我分析與建議。",
  },
};

const keywordCoachMap = {
  diagnosis: {
    label: "精準診斷",
    categories: ["practice", "rank"],
    terms: ["復盤", "教學", "清單", "觀念", "準星", "身位"],
    reason: "適合找能幫你快速拆問題、把失誤轉成訓練項目的教練。",
  },
  review: {
    label: "實戰覆盤",
    categories: ["rank", "practice"],
    terms: ["復盤", "決策", "節奏", "視野", "資源交換", "會戰"],
    reason: "適合找擅長看回放、整理決策與會戰節奏的教練。",
  },
  "win-rate": {
    label: "勝率優化",
    categories: ["rank"],
    terms: ["上分", "指揮", "控圖", "團戰", "節奏", "營運"],
    reason: "適合找以排位上分、節奏控制和穩定勝率為主的教練。",
  },
  data: {
    label: "數據化提升",
    categories: ["practice", "rank"],
    terms: ["清單", "紀錄", "教學", "觀念", "分析", "路線"],
    reason: "適合找能把進步拆成指標、讓訓練更可追蹤的教練。",
  },
  custom: {
    label: "客製化指導",
    categories: ["practice"],
    terms: ["教學", "清單", "復盤", "練槍", "配隊", "路線"],
    reason: "適合找能依照你個人弱點，直接設計補強方案的教練。",
  },
};

const state = {
  category: localStorage.getItem("playmate:category") || "rank",
  game: localStorage.getItem("playmate:gameFilter") || "all",
  query: "",
  selectedCompanion: localStorage.getItem("playmate:selectedCompanion") || "",
  plan: localStorage.getItem("playmate:plan") || "free",
  analysisFocus: localStorage.getItem("playmate:analysisFocus") || "",
};

const FREE_PLAN_VIDEO_URL = "https://www.youtube.com/embed/8ZM-IlFQvQ4?autoplay=1&mute=1&playsinline=1&rel=0";
const FREE_PLAN_VIDEO_INTERVAL = 20 * 1000;
let freePlanVideoTimer = null;

const elements = {
  categoryButtons: document.querySelector("#categoryButtons"),
  searchInput: document.querySelector("#searchInput"),
  gameSelect: document.querySelector("#gameSelect"),
  quickBookButton: document.querySelector("#quickBookButton"),
  positioningPanel: document.querySelector("#value"),
  keywordAnalysisPanel: document.querySelector("#keywordAnalysisPanel"),
  keywordRecommendationPanel: document.querySelector("#keywordRecommendationPanel"),
  companionGrid: document.querySelector("#companionGrid"),
  resultMeta: document.querySelector("#resultMeta"),
  bookingStatus: document.querySelector("#bookingStatus"),
  bookingSummary: document.querySelector("#bookingSummary"),
  bookingForm: document.querySelector("#bookingForm"),
  durationSelect: document.querySelector("#durationSelect"),
  bookingNotes: document.querySelector("#bookingNotes"),
  videoForm: document.querySelector("#videoForm"),
  videoUrl: document.querySelector("#videoUrl"),
  videoNotes: document.querySelector("#videoNotes"),
  analysisResult: document.querySelector("#analysisResult"),
  planGrid: document.querySelector("#planGrid"),
  currentPlan: document.querySelector("#currentPlan"),
  currentPlanNote: document.querySelector("#currentPlanNote"),
  videoPlanPill: document.querySelector("#videoPlanPill"),
  adModal: document.querySelector("#adModal"),
  adVideoSlot: document.querySelector("#adVideoSlot"),
  adCloseButton: document.querySelector("#adCloseButton"),
  toast: document.querySelector("#toast"),
};

function saveState() {
  localStorage.setItem("playmate:category", state.category);
  localStorage.setItem("playmate:gameFilter", state.game);
  localStorage.setItem("playmate:selectedCompanion", state.selectedCompanion);
  localStorage.setItem("playmate:plan", state.plan);
  localStorage.setItem("playmate:analysisFocus", state.analysisFocus);
}

function activePlan() {
  return plans.find((plan) => plan.id === state.plan) || plans[0];
}

function selectedCompanion() {
  return companions.find((companion) => companion.id === state.selectedCompanion) || null;
}

function renderKeywordPreview(keywordId) {
  const keyword = keywordAnalysisCopy[keywordId];
  if (!keyword || !elements.keywordAnalysisPanel) return;

  const previewTerms = [
    keyword.title,
    ...keyword.points.slice(0, 2),
  ];

  elements.keywordAnalysisPanel.innerHTML = `
    <div class="analysis-header">
      <div>
        <p class="eyebrow">KEYWORD PREVIEW</p>
        <h3 class="keyword-analysis-title">${escapeHTML(keyword.title)}</h3>
      </div>
      <span class="analysis-badge">即時分析詞</span>
    </div>
    <p class="keyword-analysis-summary">${escapeHTML(keyword.summary)}</p>
    <div class="keyword-analysis-tags">
      ${previewTerms.map((term) => `<span>${escapeHTML(term)}</span>`).join("")}
    </div>
  `;
}

function scoreCompanionForKeyword(companion, keywordId) {
  const rule = keywordCoachMap[keywordId];
  if (!rule) return 0;

  const text = [
    companion.name,
    companion.categoryLabel,
    companion.rank,
    companion.style,
    ...companion.games,
    ...companion.tags,
  ].join(" ").toLowerCase();

  let score = 0;
  if (rule.categories.includes(companion.category)) score += 25;
  if (companion.online) score += 8;
  score += Math.min(12, companion.rating * 2);
  score += Math.min(8, Math.floor(companion.reviews / 80));
  for (const term of rule.terms) {
    if (text.includes(term.toLowerCase())) score += 14;
  }
  if (keywordId === "win-rate" && companion.price >= 480) score += 4;
  if (keywordId === "custom" && companion.category === "practice") score += 6;
  return score;
}

function getKeywordRecommendations(keywordId, sourceList) {
  const rule = keywordCoachMap[keywordId];
  const list = Array.isArray(sourceList) ? [...sourceList] : [];
  if (!rule) return list;

  return list
    .map((companion) => ({
      companion,
      score: scoreCompanionForKeyword(companion, keywordId),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
      recommended: index < 3 && item.score > 0,
    }));
}

function renderKeywordRecommendations(keywordId, sourceList = filteredCompanions()) {
  if (!elements.keywordRecommendationPanel) return;

  const rule = keywordCoachMap[keywordId];
  if (!rule) {
    elements.keywordRecommendationPanel.innerHTML = `
      <div class="keyword-analysis-empty">選擇關鍵字後，這裡會直接列出最適合的教練推薦。</div>
    `;
    return;
  }

  const items = getKeywordRecommendations(keywordId, sourceList).filter((item) => item.score > 0);
  const topItems = items.slice(0, 3);

  if (!topItems.length) {
    elements.keywordRecommendationPanel.innerHTML = `
      <div class="keyword-analysis-empty">目前沒有符合這個關鍵字的教練，請切換遊戲或服務類型再試一次。</div>
    `;
    return;
  }

  elements.keywordRecommendationPanel.innerHTML = `
    <div class="recommendation-head">
      <div>
        <p class="eyebrow">COACH MATCH</p>
        <h3 class="keyword-analysis-title">推薦教練</h3>
        <p class="keyword-analysis-summary">${escapeHTML(rule.reason)}</p>
      </div>
      <span class="analysis-badge">Top ${topItems.length}</span>
    </div>
    <div class="recommendation-list">
      ${topItems.map(({ companion, score, rank }) => `
        <article class="recommendation-card">
          <div class="recommendation-rank">#${rank}</div>
          <div>
            <h4>${escapeHTML(companion.name)} <span class="recommendation-badge">${escapeHTML(companion.categoryLabel)}</span></h4>
            <p>${escapeHTML(companion.style)}</p>
            <div class="recommendation-meta">
              <span>${escapeHTML(companion.games.join(" / "))}</span>
              <span>評分 ${escapeHTML(companion.rating)}</span>
              <span>${escapeHTML(companion.online ? "線上可約" : "稍後回覆")}</span>
              <span>匹配分數 ${score}</span>
            </div>
          </div>
          <button class="primary-button" type="button" data-select="${companion.id}">選擇</button>
        </article>
      `).join("")}
    </div>
  `;
}

function applyKeywordAnalysis(keywordId, button) {
  const keyword = keywordAnalysisCopy[keywordId];
  if (!keyword) return;

  state.analysisFocus = keywordId;
  saveState();
  elements.videoNotes.value = keyword.preset;
  renderKeywordPreview(keywordId);
  renderCompanions();

  document.querySelectorAll("[data-keyword-analysis]").forEach((otherButton) => {
    otherButton.classList.toggle("is-active", otherButton === button);
  });

  runAnalysis(
    {
      mode: "keyword",
      keywordId,
      keywordTitle: keyword.title,
      notes: elements.videoNotes.value.trim(),
    },
    `分析 ${keyword.title}`,
  ).catch(() => {
    showToast("關鍵字分析失敗，請確認後端是否已啟動。");
  });

  showToast(`已帶入 ${keyword.title}，可以直接繼續分析。`);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeAnalysisList(items) {
  return (items || []).filter(Boolean).map((item) => escapeHTML(item));
}

function renderAnalysisCard(result) {
  const metaItems = normalizeAnalysisList(result.meta || []);
  const highlights = normalizeAnalysisList(result.highlights || []);
  const actions = normalizeAnalysisList(result.actions || []);
  const guidance = normalizeAnalysisList(result.guidance || []);
  const followUp = normalizeAnalysisList(result.followUp || []);
  const analysisTerms = normalizeAnalysisList(result.analysisTerms || []);
  const timeline = Array.isArray(result.timeline) ? result.timeline : [];

  return `
    <div class="analysis-header">
      <div>
        <p class="eyebrow">AI ANALYSIS</p>
        <h3>${escapeHTML(result.title || "分析結果")}</h3>
        <p class="analysis-subtitle">${escapeHTML(result.subtitle || "")}</p>
      </div>
      <span class="analysis-badge">${escapeHTML(result.badge || "後端分析")}</span>
    </div>
    <div class="analysis-meta">
      ${metaItems.map((item) => `<span>${item}</span>`).join("")}
    </div>
    ${analysisTerms.length ? `
      <div class="keyword-analysis-tags">
        ${analysisTerms.map((item) => `<span>${item}</span>`).join("")}
      </div>
    ` : ""}
    <div class="analysis-block">
      <h4>總結</h4>
      <p>${escapeHTML(result.summary || "後端尚未回傳分析摘要。")}</p>
    </div>
    ${timeline.length ? `
      <div class="analysis-block">
        <h4>時間軸</h4>
        <div class="analysis-timeline">
          ${timeline.map((item) => `
            <article class="timeline-item">
              <div class="timeline-head">
                <span class="timeline-time">${escapeHTML(item.time || "N/A")}</span>
                <strong>${escapeHTML(item.label || "時間點")}</strong>
              </div>
              <p>${escapeHTML(item.analysis || "")}</p>
              <small>${escapeHTML(item.suggestion || "")}</small>
            </article>
          `).join("")}
        </div>
      </div>
    ` : ""}
    <div class="analysis-grid">
      <div class="analysis-block">
        <h4>關鍵判斷</h4>
        <ul>
          ${highlights.length ? highlights.map((item) => `<li>${item}</li>`).join("") : "<li>尚無關鍵判斷。</li>"}
        </ul>
      </div>
      <div class="analysis-block">
        <h4>立即行動</h4>
        <ul>
          ${actions.length ? actions.map((item) => `<li>${item}</li>`).join("") : "<li>尚無可立即執行的動作。</li>"}
        </ul>
      </div>
    </div>
    <div class="analysis-callout">
      <strong>下一步建議</strong>
      <p>${escapeHTML(guidance[0] || result.guidanceText || "先把這份分析當成練習起點，再補上影片或更多重點。")}</p>
    </div>
    <div class="analysis-footnote">
      ${followUp.length ? `<span>${followUp.join("</span><span>")}</span>` : "<span>後端已接上，後續可以直接透過影片連結產生分析。</span>"}
    </div>
  `;
}

function setAnalysisLoading(message) {
  elements.analysisResult.classList.add("analysis-loading");
  elements.analysisResult.innerHTML = `
    <div class="analysis-header">
      <div>
        <p class="eyebrow">AI ANALYSIS</p>
        <h3>${escapeHTML(message || "分析中")}</h3>
      </div>
      <span class="analysis-badge">處理中</span>
    </div>
    <p class="analysis-subtitle">後端正在整理重點，請稍候一下。</p>
  `;
}

async function requestAnalysis(payload) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `分析失敗（HTTP ${response.status}）`;
    try {
      const errorData = await response.json();
      if (errorData?.error) errorMessage = errorData.error;
    } catch (error) {
      // Ignore JSON parse errors and keep the generic message.
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

function filteredCompanions() {
  const query = state.query.trim().toLowerCase();
  const list = companions.filter((companion) => {
    const matchCategory = companion.category === state.category;
    const matchGame = state.game === "all" || companion.games.includes(state.game);
    const text = [
      companion.name,
      companion.categoryLabel,
      companion.rank,
      companion.style,
      ...companion.games,
      ...companion.tags,
    ].join(" ").toLowerCase();
    return matchCategory && matchGame && (!query || text.includes(query));
  });

  if (state.analysisFocus && keywordCoachMap[state.analysisFocus]) {
    return getKeywordRecommendations(state.analysisFocus, list).map((item) => item.companion);
  }

  return list;
}

function renderCompanions() {
  const list = filteredCompanions();
  const ranked = state.analysisFocus && keywordCoachMap[state.analysisFocus]
    ? getKeywordRecommendations(state.analysisFocus, list)
    : list.map((companion, index) => ({
        companion,
        score: 0,
        rank: index + 1,
        recommended: false,
      }));

  elements.resultMeta.textContent = state.analysisFocus && keywordCoachMap[state.analysisFocus]
    ? `${list.length} 位陪玩，已依關鍵字排序`
    : `${list.length} 位陪玩`;

  elements.companionGrid.innerHTML = ranked.length
    ? ranked.map(({ companion, score, rank, recommended }) => renderCompanionCard(companion, {
        recommendationScore: score,
        recommendationRank: rank,
        recommended,
      })).join("")
    : '<div class="empty-state">目前沒有符合條件的陪玩，試著切換服務類型或遊戲。</div>';

  if (state.analysisFocus && keywordCoachMap[state.analysisFocus]) {
    renderKeywordRecommendations(state.analysisFocus, list);
  } else if (elements.keywordRecommendationPanel) {
    elements.keywordRecommendationPanel.innerHTML = `
      <div class="keyword-analysis-empty">選擇關鍵字後，這裡會直接列出最適合的教練推薦。</div>
    `;
  }
}

function renderCompanionCard(companion, recommendation = {}) {
  const selected = companion.id === state.selectedCompanion ? "active" : "";
  const recommended = recommendation.recommended ? "keyword-recommended" : "";
  const rankLabel = recommendation.recommendationRank ? `第 ${recommendation.recommendationRank} 推薦` : "";
  return `
    <article class="companion-card ${selected} ${recommended}">
      ${renderCoachPhoto(companion)}
      <div class="profile-head">
        <div>
          <p class="eyebrow">${companion.categoryLabel}</p>
          <h3>${companion.name}</h3>
          <span class="${companion.online ? "online" : "offline"}">
            ${companion.online ? "線上可約" : "稍後回覆"}
          </span>
          ${rankLabel ? `<span class="recommendation-badge">${rankLabel}</span>` : ""}
        </div>
      </div>
      <p class="card-copy">${companion.style}</p>
      ${recommendation.recommendationScore ? `<p class="card-copy">關鍵字匹配分數：${recommendation.recommendationScore}</p>` : ""}
      <div class="tag-row">
        ${companion.games.map((game) => `<span>${game}</span>`).join("")}
        ${companion.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <div class="meta-grid">
        <span><strong>${companion.rank}</strong>段位</span>
        <span><strong>${companion.rating}</strong>評分</span>
        <span><strong>${companion.reviews}</strong>評價</span>
        <span><strong>NT$${companion.price}</strong>每小時</span>
      </div>
      <button class="primary-button" type="button" data-select="${companion.id}">選擇陪玩</button>
    </article>
  `;
}

function hashText(text) {
  return [...text].reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) % 9973;
  }, 17);
}

function renderCoachPhoto(companion) {
  const seed = hashText(`${companion.id}-${companion.name}`);
  const hue = seed % 360;
  const accent = (hue + 82) % 360;
  const shirt = (hue + 190) % 360;
  const hair = seed % 3 === 0 ? "#201713" : seed % 3 === 1 ? "#30231c" : "#15191f";
  const skin = seed % 4 === 0 ? "#f1c7a7" : seed % 4 === 1 ? "#d9a47e" : seed % 4 === 2 ? "#c88765" : "#f0b990";
  const initials = companion.name.slice(0, 2).toUpperCase();

  return `
    <div
      class="coach-photo"
      style="
        --photo-hue: ${hue};
        --photo-accent: ${accent};
        --photo-shirt: ${shirt};
        --photo-hair: ${hair};
        --photo-skin: ${skin};
      "
      aria-label="${companion.name} 的生成教練照片"
      role="img"
    >
      <span class="photo-light"></span>
      <span class="photo-backdrop"></span>
      <span class="photo-neck"></span>
      <span class="photo-face"></span>
      <span class="photo-hair"></span>
      <span class="photo-bangs"></span>
      <span class="photo-eye left"></span>
      <span class="photo-eye right"></span>
      <span class="photo-smile"></span>
      <span class="photo-shirt"></span>
      <span class="photo-badge">${initials}</span>
    </div>
  `;
}

function renderBooking() {
  const companion = selectedCompanion();
  if (!companion) {
    elements.bookingStatus.textContent = "尚未選擇";
    elements.bookingSummary.innerHTML = "<p>選擇陪玩後，這裡會即時計算時數與總金額。</p>";
    return;
  }

  const hours = Number(elements.durationSelect.value || 1);
  elements.bookingStatus.textContent = `${companion.name} / ${companion.categoryLabel}`;
  elements.bookingSummary.innerHTML = `
    <div class="booking-line">
      <span>陪玩</span>
      <strong>${companion.name}</strong>
    </div>
    <div class="booking-line">
      <span>類型</span>
      <strong>${companion.categoryLabel}</strong>
    </div>
    <div class="booking-line">
      <span>遊戲</span>
      <strong>${companion.games.join(" / ")}</strong>
    </div>
    <div class="booking-line total">
      <span>總金額</span>
      <strong>NT$${companion.price * hours}</strong>
    </div>
  `;
}

function renderPlans() {
  elements.planGrid.innerHTML = plans.map((plan) => {
    const active = plan.id === state.plan ? "active" : "";
    const buttonLabel = plan.id === state.plan ? "目前方案" : "選擇方案";
    return `
      <article class="plan-card ${active}">
        <div>
          <p class="eyebrow">${plan.id.toUpperCase()}</p>
          <h3>${plan.name}</h3>
          <strong class="plan-price">${plan.price}</strong>
          <p>${plan.note}</p>
        </div>
        <ul>${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <button class="${active ? "secondary-button" : "primary-button"}" type="button" data-plan="${plan.id}">
          ${buttonLabel}
        </button>
      </article>
    `;
  }).join("");
}

function renderPlanState() {
  const plan = activePlan();
  elements.currentPlan.textContent = plan.name;
  elements.currentPlanNote.textContent = plan.note;
  elements.videoPlanPill.textContent = plan.id === "free"
    ? "Free：基礎摘要"
    : plan.id === "plus"
      ? "Plus：進階覆盤"
      : "Pro：完整訓練建議";
  updateFreePlanVideoTimer();
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  saveState();
  renderCompanions();
  showToast(categoryCopy[category].hint);
}

function quickMatch() {
  const list = filteredCompanions();
  if (!list.length) {
    showToast("目前沒有可配對的陪玩，請調整篩選條件。");
    return;
  }

  const online = list.find((companion) => companion.online);
  state.selectedCompanion = (online || list[0]).id;
  saveState();
  renderCompanions();
  renderBooking();
  document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
  showToast("已為你選出目前最適合的陪玩。");
}

async function runAnalysis(payload, loadingMessage) {
  setAnalysisLoading(loadingMessage);
  try {
    const result = await requestAnalysis(payload);
    elements.analysisResult.classList.remove("analysis-loading");
    elements.analysisResult.innerHTML = renderAnalysisCard(result);
    return result;
  } catch (error) {
    elements.analysisResult.classList.remove("analysis-loading");
    elements.analysisResult.innerHTML = `
      <div class="analysis-header">
        <div>
          <p class="eyebrow">AI ANALYSIS</p>
          <h3>分析失敗</h3>
        </div>
        <span class="analysis-badge analysis-badge-error">錯誤</span>
      </div>
      <p class="analysis-subtitle">${escapeHTML(error.message || "後端分析暫時無法完成。")}</p>
      <div class="analysis-callout">
        <strong>建議</strong>
        <p>請確認本機伺服器有啟動，並重新送出一次影片連結或關鍵字分析。</p>
      </div>
    `;
    throw error;
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 1800);
}

function openFreePlanVideo() {
  if (state.plan !== "free") return;
  elements.adVideoSlot.innerHTML = `
    <iframe
      src="${FREE_PLAN_VIDEO_URL}"
      title="免費方案影片"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
  elements.adModal.classList.add("show");
  elements.adModal.setAttribute("aria-hidden", "false");
}

function closeFreePlanVideo() {
  elements.adModal.classList.remove("show");
  elements.adModal.setAttribute("aria-hidden", "true");
  elements.adVideoSlot.innerHTML = "";
}

function updateFreePlanVideoTimer() {
  window.clearInterval(freePlanVideoTimer);
  freePlanVideoTimer = null;
  closeFreePlanVideo();

  if (state.plan === "free") {
    freePlanVideoTimer = window.setInterval(openFreePlanVideo, FREE_PLAN_VIDEO_INTERVAL);
  }
}

elements.categoryButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  setCategory(button.dataset.category);
});

document.querySelectorAll("[data-jump-category]").forEach((button) => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.jumpCategory);
    document.querySelector("#companions").scrollIntoView({ behavior: "smooth" });
  });
});

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCompanions();
});

elements.gameSelect.addEventListener("change", (event) => {
  state.game = event.target.value;
  saveState();
  renderCompanions();
});

elements.quickBookButton.addEventListener("click", quickMatch);

elements.companionGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select]");
  if (!button) return;
  state.selectedCompanion = button.dataset.select;
  saveState();
  renderCompanions();
  renderBooking();
  showToast("已加入預約單。");
});

if (elements.keywordRecommendationPanel) {
  elements.keywordRecommendationPanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select]");
    if (!button) return;
    state.selectedCompanion = button.dataset.select;
    saveState();
    renderCompanions();
    renderBooking();
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    showToast("已從關鍵字推薦中選入預約單。");
  });
}

elements.durationSelect.addEventListener("change", renderBooking);

document.querySelectorAll('li[role="button"][data-keyword-analysis]').forEach((button) => {
  const runKeyword = () => applyKeywordAnalysis(button.dataset.keywordAnalysis, button);
  button.addEventListener("click", runKeyword);
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      runKeyword();
    }
  });
});

elements.bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const companion = selectedCompanion();
  if (!companion) {
    showToast("請先選擇一位陪玩。");
    return;
  }

  const hours = Number(elements.durationSelect.value);
  const notes = elements.bookingNotes.value.trim() || "無備註";
  const order = {
    companion: companion.name,
    category: companion.categoryLabel,
    hours,
    total: companion.price * hours,
    notes,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("playmate:lastBooking", JSON.stringify(order));
  showToast(`預約已送出：${companion.name}，${hours} 小時。`);
});

elements.videoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.videoUrl.value.trim() && !elements.videoNotes.value.trim()) {
    showToast("請填入影片連結或想看的重點。");
    return;
  }
  runAnalysis(
    {
      mode: "video",
      videoUrl: elements.videoUrl.value.trim(),
      notes: elements.videoNotes.value.trim(),
      keywordId: state.analysisFocus || "",
      plan: state.plan,
    },
    "正在分析影片",
  ).then(() => {
    showToast("覆盤摘要已產生。");
  }).catch(() => {
    showToast("分析失敗，請稍後再試。");
  });
});

elements.planGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-plan]");
  if (!button) return;
  state.plan = button.dataset.plan;
  saveState();
  renderPlans();
  renderPlanState();
  showToast(`已切換為 ${activePlan().name}。`);
});

elements.adCloseButton.addEventListener("click", closeFreePlanVideo);

elements.adModal.addEventListener("click", (event) => {
  if (event.target === elements.adModal) {
    closeFreePlanVideo();
  }
});

elements.gameSelect.value = state.game;
setCategory(state.category);
renderPlans();
renderPlanState();
renderBooking();
if (state.analysisFocus) {
  renderKeywordPreview(state.analysisFocus);
  renderKeywordRecommendations(state.analysisFocus);
}
