import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScheduleList() {
  const location = useLocation();
  const navigate = useNavigate();

  const oshi = location.state?.oshi;
  const category = location.state?.category;

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!oshi || !category) {
      return;
    }

    fetch(
      `http://localhost:8080/api/schedules?oshiId=${oshi.id}&category=${encodeURIComponent(category)}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("データ取得失敗");
        return res.json();
      })
      .then((data) => {
        setSchedules(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [oshi, category]);

  // 削除処理
  const handleDelete = async (id) => {
    if (!window.confirm("このスケジュールを削除してもよろしいですか？")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/schedules/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setSchedules(schedules.filter((item) => item.id !== id));
        alert("削除しました。");
      } else {
        alert("削除に失敗しました。");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {oshi ? oshi.name : "推し"} - {category || "スケジュール一覧"}
      </h2>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div style={{ margin: "20px 0" }}>
          {schedules.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {schedules.map((item) => (
                <li
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    maxWidth: "400px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <strong style={{ fontSize: "18px" }}>{item.title}</strong>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/schedule-edit", {
                            state: { oshi, category, schedule: item },
                          })
                        }
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#1890ff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        編集
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#ff4d4f",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                    📅 {item.eventDate}{" "}
                    {item.eventLocation && `📍 ${item.eventLocation}`}
                  </p>
                  {item.memo && (
                    <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                      📝 {item.memo}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>登録されているスケジュールはありません。</p>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={() =>
            navigate("/schedule-form", { state: { oshi, category } })
          }
          style={{ padding: "8px 16px" }}
        >
          新規スケジュール登録
        </button>
        <button
          type="button"
          onClick={() => navigate("/category-select", { state: { oshi } })}
          style={{ padding: "8px 16px" }}
        >
          カテゴリ選択に戻る
        </button>
      </div>
    </div>
  );
}

export default ScheduleList;
