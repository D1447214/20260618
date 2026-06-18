# PlayMate 遊戲陪玩

一個瀏覽器版遊戲陪玩控制台。玩家可以選擇陪玩角色、語氣模式、遊戲類型與目前局勢，透過聊天視窗取得即時陪玩回應、戰術提醒、影片分析與訂閱方案體驗。

## 執行

```powershell
python main.py
```

啟動後開啟：

```text
http://127.0.0.1:8000
```

## OpenAI AI 分析

如果要啟用真正的 AI 分析，先設定環境變數：

```powershell
$env:OPENAI_API_KEY="你的 API key"
```

可選設定模型：

```powershell
$env:OPENAI_MODEL="gpt-5.5"
```

目前後端會優先使用 OpenAI `Responses API`，若沒有設定金鑰，會自動切換成本機備援分析。

## 功能

- 三種陪玩角色：隊長型、朋友型、教練型
- 三種語氣模式：穩定指揮、熱血鼓勵、精準復盤
- 支援 MOBA、FPS、RPG、生存建造、策略經營等遊戲類型
- 即時聊天式互動與快速戰術按鈕
- 影片分析：支援影片連結、影片檔案選擇與片段描述，產生復盤建議
- 訂閱方案：Free、Plus、Pro，並使用 localStorage 保存目前方案
