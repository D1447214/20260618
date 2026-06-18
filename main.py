import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib import error, request
from urllib.parse import urlparse


OPENAI_API_URL = "https://api.openai.com/v1/responses"
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.5").strip() or "gpt-5.5"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()


KEYWORDS = {
    "diagnosis": {
        "label": "精準診斷",
        "summary": "先找出問題來源，再決定要練什麼，避免把時間花在無效重複操作。",
        "highlights": [
            "優先檢查失誤來源，先分辨是站位、視野、操作還是溝通問題。",
            "把問題拆成可觀察的行為，讓每次訓練都有明確目標。",
        ],
        "actions": [
            "先挑 1 場最常輸掉的局，標出失分點。",
            "把失誤原因整理成 2 到 3 個固定類型，避免每次都從零開始猜。",
            "下一步只練最影響結果的那一項。",
        ],
        "guidance": "如果你想更快改善，建議先從死亡回合和最常犯的重複失誤開始。",
    },
    "review": {
        "label": "實戰覆盤",
        "summary": "把比賽過程拆開回看，從關鍵回合找出可立即修正的決策。",
        "highlights": [
            "會戰前的站位與資訊量，通常比最後一波操作更值得檢查。",
            "先看回放再下結論，能避免只記得結果、忽略真正原因。",
        ],
        "actions": [
            "鎖定 3 個關鍵時間點，逐段看決策是否合理。",
            "檢查死亡前 10 秒，確認是否有過度前壓或資訊不足。",
            "把每次覆盤結論寫成一句可執行建議。",
        ],
        "guidance": "如果你有影片片段，補上時間點會讓覆盤更準。",
    },
    "win-rate": {
        "label": "勝率優化",
        "summary": "把目標直接對準排位上分，從角色、節奏到執行逐步拉高勝率。",
        "highlights": [
            "先找出最容易輸分的局面，優先改善最影響結果的選擇。",
            "角色池、節奏與團戰執行要盡量固定，避免每場都臨時變動。",
        ],
        "actions": [
            "先整理最常輸掉的三種對局，針對它們做對策。",
            "固定開局節奏與中期目標，減少不必要的猶豫。",
            "把勝率提升拆成可追蹤的小步驟。",
        ],
        "guidance": "如果你正在衝分，先從最常掉分的局面開始修正，收益最大。",
    },
    "data": {
        "label": "數據化提升",
        "summary": "用可追蹤的方式看進步，不靠感覺，讓訓練更有依據。",
        "highlights": [
            "數據能幫你看見趨勢，但要搭配回放一起看才會準。",
            "先挑少量指標持續追蹤，比蒐集太多資料更有用。",
        ],
        "actions": [
            "選 2 到 3 個核心指標持續觀察，例如死亡次數、參與率或資源交換。",
            "比較訓練前後的差異，確認哪個環節真的有改善。",
            "把數據結論轉成下一次訓練重點。",
        ],
        "guidance": "如果你有固定目標，數據化追蹤會比單純手感回饋更可靠。",
    },
    "custom": {
        "label": "客製化指導",
        "summary": "針對你目前最卡的地方，直接給出最貼合的練習方案。",
        "highlights": [
            "每個人的卡點不同，通用建議不一定適合你。",
            "把弱點拆成短期可執行的練習項目，會比較容易真正改善。",
        ],
        "actions": [
            "先說明你最常卡住的情境與目標。",
            "把訓練拆成 1 到 2 個最優先的補強項目。",
            "每次練習後回頭檢查是否真的有變化。",
        ],
        "guidance": "如果你願意提供更多背景，後端可以根據你的弱點給更精準的建議。",
    },
}


PLAN_LABELS = {
    "free": "Free",
    "plus": "Plus",
    "pro": "Pro",
}


class Utf8HTTPRequestHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
    }

    def guess_type(self, path):
        content_type = super().guess_type(path)
        if path.endswith((".html", ".css", ".js")) and "charset=" not in content_type:
            return f"{content_type}; charset=utf-8"
        return content_type

    def do_POST(self):
        if urlparse(self.path).path != "/api/analyze":
            self.send_error(404, "Not Found")
            return

        content_length = int(self.headers.get("Content-Length", "0") or "0")
        raw_body = self.rfile.read(content_length).decode("utf-8") if content_length else "{}"

        try:
            payload = json.loads(raw_body)
        except json.JSONDecodeError:
            self.send_json(400, {"error": "請提供合法的 JSON 請求內容。"})
            return

        try:
            response = self.build_analysis_response(payload)
        except ValueError as error_message:
            self.send_json(400, {"error": str(error_message)})
            return

        self.send_json(200, response)

    def send_json(self, status_code, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def build_analysis_response(self, payload):
        mode = str(payload.get("mode", "")).strip()
        if mode == "keyword":
            return self.build_openai_or_local_analysis(payload, mode)
        if mode == "video":
            return self.build_openai_or_local_analysis(payload, mode)
        raise ValueError("不支援的分析模式，請使用 keyword 或 video。")

    def build_openai_or_local_analysis(self, payload, mode):
        if OPENAI_API_KEY:
            try:
                return self.build_openai_analysis(payload, mode)
            except Exception as exc:
                fallback = self.build_local_analysis(payload, mode, openai_error=str(exc))
                fallback["badge"] = "OpenAI 失敗，已切備援"
                fallback["source"] = "local-fallback"
                return fallback

        fallback = self.build_local_analysis(payload, mode)
        fallback["badge"] = "本機備援分析"
        fallback["source"] = "local"
        return fallback

    def build_openai_analysis(self, payload, mode):
        schema = self.get_schema(mode)
        prompt = self.build_prompt(payload, mode)
        body = json.dumps(
            {
                "model": OPENAI_MODEL,
                "input": prompt,
                "temperature": 0.4,
                "max_output_tokens": 1200,
                "text": {
                    "format": {
                        "type": "json_schema",
                        "name": f"playmate_{mode}_analysis",
                        "strict": True,
                        "schema": schema,
                    }
                },
            },
            ensure_ascii=False,
        ).encode("utf-8")

        req = request.Request(
            OPENAI_API_URL,
            data=body,
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json",
                "User-Agent": "PlayMate/1.0",
            },
            method="POST",
        )

        try:
            with request.urlopen(req, timeout=45) as response:
                response_body = response.read().decode("utf-8")
        except error.HTTPError as exc:
            details = exc.read().decode("utf-8", errors="ignore") if exc.fp else ""
            raise ValueError(self.describe_http_error(exc.code, details)) from exc
        except error.URLError as exc:
            raise ValueError(f"無法連線到 OpenAI API：{exc.reason}") from exc

        try:
            response_json = json.loads(response_body)
        except json.JSONDecodeError as exc:
            raise ValueError("OpenAI 回傳了無法解析的內容。") from exc

        raw_text = self.extract_response_text(response_json)
        if not raw_text:
            raise ValueError("OpenAI 回應缺少文字內容。")

        try:
            parsed = json.loads(raw_text)
        except json.JSONDecodeError as exc:
            raise ValueError("OpenAI 回傳的 JSON 無法解析。") from exc

        normalized = self.normalize_ai_response(parsed, payload, mode)
        normalized["source"] = "openai"
        normalized["model"] = OPENAI_MODEL
        normalized["badge"] = f"OpenAI {OPENAI_MODEL}"
        return normalized

    def build_local_analysis(self, payload, mode, openai_error=None):
        if mode == "keyword":
            result = self.build_local_keyword_analysis(payload)
        else:
            result = self.build_local_video_analysis(payload)
        result["source"] = "local"
        result["model"] = "heuristic-fallback"
        result["badge"] = "本機備援分析"
        if openai_error:
            result["followUp"] = [
                f"OpenAI 呼叫失敗，已切換到本機備援：{self.summarize_text(openai_error, 72)}",
                *result.get("followUp", []),
            ]
        return result

    def build_local_keyword_analysis(self, payload):
        keyword_id = str(payload.get("keywordId", "")).strip()
        keyword = KEYWORDS.get(keyword_id)
        if not keyword:
            raise ValueError("找不到對應的關鍵字分析項目。")

        notes = str(payload.get("notes", "")).strip()
        plan = PLAN_LABELS.get(str(payload.get("plan", "free")).strip(), "Free")
        title = f"{keyword['label']}分析"
        subtitle = "以服務定位為主軸，先把可執行的重點拆出來。"
        if notes:
            subtitle = "根據你輸入的重點，先把這個方向整理成可執行策略。"

        meta = [
            f"焦點：{keyword['label']}",
            "模式：關鍵字分析",
            f"方案：{plan}",
            "來源：本機規則",
        ]
        if notes:
            meta.append(f"備註：{self.summarize_text(notes, 24)}")

        highlights = list(keyword["highlights"])
        if notes:
            highlights.insert(0, f"你目前補充的重點是「{self.summarize_text(notes, 32)}」。")

        actions = list(keyword["actions"])
        if notes:
            actions.insert(0, "先把你寫下的重點轉成一個最小可執行練習。")

        return {
            "title": title,
            "subtitle": subtitle,
            "meta": meta,
            "summary": keyword["summary"],
            "analysisTerms": [
                keyword["label"],
                "問題定位",
                "可執行練習",
                "精準優化",
            ],
            "timeline": [],
            "highlights": highlights,
            "actions": actions,
            "guidance": [keyword["guidance"]],
            "followUp": [
                "如果你想往下做，我可以再根據影片或實戰內容接續分析。",
                "你也可以直接把影片連結貼上來，讓後端延伸成完整覆盤。",
            ],
            "source": "local",
            "model": "heuristic-fallback",
            "badge": "本機備援分析",
        }

    def build_local_video_analysis(self, payload):
        video_url = str(payload.get("videoUrl", "")).strip()
        notes = str(payload.get("notes", "")).strip()
        keyword_id = str(payload.get("keywordId", "")).strip()
        plan = str(payload.get("plan", "free")).strip()
        plan_label = PLAN_LABELS.get(plan, "Free")

        if not video_url and not notes:
            raise ValueError("請提供影片連結或分析重點。")

        platform = self.detect_platform(video_url)
        timestamps = self.extract_timestamps(notes)
        topics = self.extract_topics(notes)
        keyword = KEYWORDS.get(keyword_id)
        keyword_label = keyword["label"] if keyword else "未指定焦點"

        timeline = self.build_local_timeline(timestamps, topics, keyword)

        summary_parts = [
            f"已根據 {platform} 連結與使用者提供的重點，先把覆盤焦點放在「{keyword_label}」。",
        ]
        if timestamps:
            summary_parts.append(f"你提供了 {len(timestamps)} 個時間點，這些片段會是優先檢查區段。")
        if topics:
            summary_parts.append(f"目前偵測到的關鍵主題包括：{self.join_list(topics)}。")
        summary_parts.append("這份分析屬於結構化覆盤，適合拿來當下一輪練習或影片檢討的起點。")

        meta = [
            f"來源：{platform}",
            "模式：影片覆盤",
            f"焦點：{keyword_label}",
            f"方案：{plan_label}",
            "來源類型：本機規則",
        ]
        if timestamps:
            meta.append(f"時標：{self.join_list(timestamps)}")
        if notes:
            meta.append(f"重點：{self.summarize_text(notes, 28)}")

        highlights = []
        if timestamps:
            first = timestamps[0]
            second = timestamps[1] if len(timestamps) > 1 else None
            if second:
                highlights.append(f"先回看 {first} 和 {second}，通常最容易找到節奏斷點與決策失誤。")
            else:
                highlights.append(f"先回看 {first}，把這段前後 20 秒的變化一起看。")
        else:
            highlights.append("沒有偵測到明確時間點，建議補上 1 到 2 個關鍵片段。")

        if topics:
            highlights.append(f"你提到的主題偏向 {self.join_list(topics)}，這些地方最值得先檢查。")
        else:
            highlights.append("目前沒有明確主題詞，先以站位、決策與節奏作為通用檢查方向。")

        if keyword:
            highlights.append(keyword["highlights"][0])
        else:
            highlights.append("如果之後補上關鍵字焦點，分析會更聚焦。")

        actions = [
            "先看死亡前 10 秒的站位、資訊量與資源交換是否合理。",
            "把每個時間點的問題拆成一個可執行修正點。",
            "下一場直接測試同一個改動，確認是否真的有效。",
        ]
        if topics:
            actions.insert(0, f"優先針對 {self.join_list(topics[:2])} 做修正。")
        if timestamps:
            actions.insert(0, f"把 {timestamps[0]} 當成第一個回放節點，逐段往前後延伸。")

        guidance = [
            "如果你再補更長的片段或更明確的目標，覆盤會更精準。",
        ]
        if plan == "free":
            guidance.append("升級方案後可以幫你整理更完整的覆盤脈絡。")
        elif plan == "plus":
            guidance.append("Plus 適合拿來做進階覆盤與重點追蹤。")
        else:
            guidance.append("Pro 能把這份分析延伸成更完整的訓練規劃。")

        return {
            "title": "影片 AI 覆盤",
            "subtitle": f"來源平台：{platform}，焦點：{keyword_label}",
            "meta": meta,
            "summary": " ".join(summary_parts),
            "analysisTerms": [
                platform,
                keyword_label,
                "時間軸檢查",
                "站位決策",
                "行動建議",
            ],
            "timeline": timeline,
            "highlights": highlights,
            "actions": actions,
            "guidance": guidance,
            "followUp": [
                "如果你要，我可以再加上更細的時間軸拆解。",
                "你也可以改成貼一段更短的精華片段，分析會更集中。",
            ],
            "source": "local",
            "model": "heuristic-fallback",
            "badge": "本機備援分析",
        }

    def build_local_timeline(self, timestamps, topics, keyword):
        timeline = []
        if timestamps:
            for index, timestamp in enumerate(timestamps[:5], start=1):
                topic_hint = topics[min(index - 1, len(topics) - 1)] if topics else "站位與決策"
                analysis = f"先看 {timestamp} 前後 15 秒的 {topic_hint}，確認是否有提前暴露或節奏斷層。"
                suggestion = "把這段拆成一個可重複練習的修正點。"
                timeline.append(
                    {
                        "time": timestamp,
                        "label": f"時間點 {index}",
                        "analysis": analysis,
                        "suggestion": suggestion,
                    }
                )
        if not timeline:
            timeline = [
                {
                    "time": "0:00",
                    "label": "開局檢查",
                    "analysis": "先確認開局思路與站位是否和目標一致。",
                    "suggestion": "把開局步驟固定成一個簡單清單。",
                },
                {
                    "time": "中期",
                    "label": "節奏檢查",
                    "analysis": "觀察資源交換與團隊決策是否開始失真。",
                    "suggestion": "優先修正會影響勝率的核心習慣。",
                },
            ]
        if keyword:
            timeline.append(
                {
                    "time": "焦點",
                    "label": keyword["label"],
                    "analysis": keyword["summary"],
                    "suggestion": keyword["guidance"],
                }
            )
        return timeline[:5]

    def build_prompt(self, payload, mode):
        common = {
            "mode": mode,
            "plan": PLAN_LABELS.get(str(payload.get("plan", "free")).strip(), "Free"),
            "keywordId": str(payload.get("keywordId", "")).strip(),
            "keywordTitle": str(payload.get("keywordTitle", "")).strip(),
            "notes": str(payload.get("notes", "")).strip(),
        }
        if mode == "video":
            common["videoUrl"] = str(payload.get("videoUrl", "")).strip()
            common["platform"] = self.detect_platform(common["videoUrl"])

        if mode == "keyword":
            schema_hint = (
                "輸出 JSON，欄位要包含 title, subtitle, meta, summary, analysisTerms, timeline, "
                "highlights, actions, guidance, followUp。內容要像專業陪練顧問，繁體中文、精準、可執行。"
            )
        else:
            schema_hint = (
                "輸出 JSON，欄位要包含 title, subtitle, meta, summary, analysisTerms, timeline, "
                "highlights, actions, guidance, followUp。timeline 至少 3 個項目，若使用者有時間點就優先對應。"
            )

        return (
            "你是 PlayMate 的資深陪練分析員。"
            "請只根據使用者提供的資料分析，不要假裝已經實際觀看影片畫面。"
            "如果只有影片連結與文字備註，請清楚表示這是根據連結、備註與時間點做的結構化覆盤。"
            "請保持語氣專業、直接、鼓勵性強，像 AI 顧問產出，但不要使用 Markdown。"
            f"{schema_hint}\n"
            f"使用者資料：{json.dumps(common, ensure_ascii=False)}"
        )

    def get_schema(self, mode):
        common_properties = {
            "title": {"type": "string"},
            "subtitle": {"type": "string"},
            "meta": {"type": "array", "items": {"type": "string"}},
            "summary": {"type": "string"},
            "analysisTerms": {"type": "array", "items": {"type": "string"}},
            "timeline": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["time", "label", "analysis", "suggestion"],
                    "properties": {
                        "time": {"type": "string"},
                        "label": {"type": "string"},
                        "analysis": {"type": "string"},
                        "suggestion": {"type": "string"},
                    },
                },
            },
            "highlights": {"type": "array", "items": {"type": "string"}},
            "actions": {"type": "array", "items": {"type": "string"}},
            "guidance": {"type": "array", "items": {"type": "string"}},
            "followUp": {"type": "array", "items": {"type": "string"}},
        }

        if mode == "keyword":
            properties = {
                **common_properties,
                "badge": {"type": "string"},
            }
        else:
            properties = {
                **common_properties,
                "badge": {"type": "string"},
            }

        return {
            "type": "object",
            "additionalProperties": False,
            "required": [
                "title",
                "subtitle",
                "meta",
                "summary",
                "analysisTerms",
                "timeline",
                "highlights",
                "actions",
                "guidance",
                "followUp",
                "badge",
            ],
            "properties": properties,
        }

    def extract_response_text(self, response_json):
        if isinstance(response_json.get("output_text"), str):
            return response_json["output_text"].strip()

        output = response_json.get("output") or []
        fragments = []
        for item in output:
            if not isinstance(item, dict):
                continue
            if isinstance(item.get("text"), str):
                fragments.append(item["text"])
            content = item.get("content") or []
            for entry in content:
                if not isinstance(entry, dict):
                    continue
                if isinstance(entry.get("text"), str):
                    fragments.append(entry["text"])
        return "".join(fragments).strip()

    def normalize_ai_response(self, parsed, payload, mode):
        if mode == "keyword":
            keyword_id = str(payload.get("keywordId", "")).strip()
            keyword = KEYWORDS.get(keyword_id, {})
            default_badge = "OpenAI 分析"
            default_title = f"{keyword.get('label', '關鍵字')}分析"
            default_summary = keyword.get("summary", "已完成關鍵字分析。")
        else:
            default_badge = "OpenAI 覆盤"
            default_title = "影片 AI 覆盤"
            default_summary = "已完成影片覆盤。"

        normalized = {
            "title": str(parsed.get("title") or default_title),
            "subtitle": str(parsed.get("subtitle") or ""),
            "meta": self.ensure_string_list(parsed.get("meta")),
            "summary": str(parsed.get("summary") or default_summary),
            "analysisTerms": self.ensure_string_list(parsed.get("analysisTerms")),
            "timeline": self.normalize_timeline(parsed.get("timeline")),
            "highlights": self.ensure_string_list(parsed.get("highlights")),
            "actions": self.ensure_string_list(parsed.get("actions")),
            "guidance": self.ensure_string_list(parsed.get("guidance")),
            "followUp": self.ensure_string_list(parsed.get("followUp")),
            "badge": str(parsed.get("badge") or default_badge),
        }

        if not normalized["meta"]:
            normalized["meta"] = ["來源：OpenAI", f"模型：{OPENAI_MODEL}"]
        if not normalized["analysisTerms"]:
            normalized["analysisTerms"] = [default_title]
        if not normalized["timeline"] and mode == "video":
            normalized["timeline"] = self.build_local_timeline(
                self.extract_timestamps(str(payload.get("notes", ""))),
                self.extract_topics(str(payload.get("notes", ""))),
                KEYWORDS.get(str(payload.get("keywordId", "")).strip()),
            )
        return normalized

    def ensure_string_list(self, value):
        if not isinstance(value, list):
            return []
        return [str(item).strip() for item in value if str(item).strip()]

    def normalize_timeline(self, value):
        if not isinstance(value, list):
            return []

        timeline = []
        for item in value:
            if not isinstance(item, dict):
                continue
            time_value = str(item.get("time", "")).strip()
            label = str(item.get("label", "")).strip()
            analysis = str(item.get("analysis", "")).strip()
            suggestion = str(item.get("suggestion", "")).strip()
            if not (time_value or label or analysis or suggestion):
                continue
            timeline.append(
                {
                    "time": time_value or "N/A",
                    "label": label or "時間點",
                    "analysis": analysis or "無分析內容。",
                    "suggestion": suggestion or "無建議。",
                }
            )
        return timeline

    def detect_platform(self, video_url):
        if not video_url:
            return "未提供連結"

        parsed = urlparse(video_url)
        host = parsed.netloc.lower()
        if "youtu" in host:
            return "YouTube"
        if "twitch" in host:
            return "Twitch"
        if host:
            return host.split(":")[0]
        return "未辨識的平台"

    def extract_timestamps(self, text):
        return re.findall(r"\b\d{1,2}:\d{2}(?::\d{2})?\b", text or "")

    def extract_topics(self, text):
        topic_rules = [
            ("站位", "站位"),
            ("走位", "走位"),
            ("技能", "技能使用"),
            ("冷卻", "冷卻管理"),
            ("會戰", "會戰節奏"),
            ("團戰", "團戰決策"),
            ("地圖", "地圖意識"),
            ("視野", "視野控制"),
            ("經濟", "資源交換"),
            ("兵線", "兵線處理"),
            ("轉點", "轉點判斷"),
            ("配合", "隊伍配合"),
            ("控圖", "地圖控制"),
            ("開局", "開局節奏"),
        ]
        found = []
        for keyword, label in topic_rules:
            if keyword in (text or "") and label not in found:
                found.append(label)
        return found[:4]

    def summarize_text(self, text, limit):
        cleaned = re.sub(r"\s+", " ", (text or "").strip())
        if len(cleaned) <= limit:
            return cleaned
        return cleaned[: max(0, limit - 1)].rstrip() + "…"

    def join_list(self, items):
        return "、".join(items)

    def describe_http_error(self, status_code, details):
        details = details.strip()
        if details:
            return f"OpenAI API 回傳 HTTP {status_code}：{self.summarize_text(details, 180)}"
        return f"OpenAI API 回傳 HTTP {status_code}。"


def main():
    host = "127.0.0.1"
    port = 8000
    server = ThreadingHTTPServer((host, port), Utf8HTTPRequestHandler)
    print(f"Game platform running at http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
