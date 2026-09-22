import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScheduleForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const oshi = location.state?.oshi;
  const category = location.state?.category;

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSchedule = {
      oshiId: oshi?.id,
      category,
      title,
      eventDate,
      eventLocation,
      memo,
    };

    try {
      const response = await fetch("http://localhost:8080/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchedule),
      });

      if (response.ok) {
        alert("スケジュールを登録しました！");
        navigate("/schedule-list", { state: { oshi, category } });
      } else {
        alert("登録に失敗しました。");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>新規スケジュール登録</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        対象: <strong>{oshi ? oshi.name : "未選択"}</strong> （
        {category || "全般"}）
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            タイトル / イベント名:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="eventDate"
            style={{ display: "block", marginBottom: "5px" }}
          >
            日付:
          </label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="eventLocation"
            style={{ display: "block", marginBottom: "5px" }}
          >
            場所 / URL:
          </label>
          <input
            id="eventLocation"
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="memo"
            style={{ display: "block", marginBottom: "5px" }}
          >
            メモ:
          </label>
          <textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={{ padding: "8px", width: "100%", height: "80px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "8px 16px" }}>
            登録
          </button>
          <button
            type="button"
            onClick={() =>
              navigate("/schedule-list", { state: { oshi, category } })
            }
            style={{ padding: "8px 16px" }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleForm;
