import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScheduleEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const oshi = location.state?.oshi;
  const category = location.state?.category;
  const schedule = location.state?.schedule;

  const [title, setTitle] = useState(schedule?.title || "");
  const [eventDate, setEventDate] = useState(schedule?.eventDate || "");
  const [eventLocation, setEventLocation] = useState(
    schedule?.eventLocation || "",
  );
  const [memo, setMemo] = useState(schedule?.memo || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSchedule = {
      ...schedule,
      title,
      eventDate,
      eventLocation,
      memo,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/schedules/${schedule.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSchedule),
        },
      );

      if (response.ok) {
        alert("スケジュールを更新しました！");
        navigate("/schedule-list", { state: { oshi, category } });
      } else {
        alert("更新に失敗しました。");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>スケジュール編集</h2>
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
            更新
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

export default ScheduleEdit;
