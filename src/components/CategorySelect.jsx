import { useLocation, useNavigate } from "react-router-dom";

function CategorySelect() {
  const location = useLocation();
  const navigate = useNavigate();

  // 推し選択画面から渡された推しの情報を取得
  const oshi = location.state?.oshi;

  const handleSelectCategory = (category) => {
    // 選択した推しとカテゴリの情報を持ってスケジュール一覧画面へ
    navigate("/schedule-list", { state: { oshi, category } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{oshi ? `${oshi.name} の管理メニュー` : "カテゴリ選択"}</h2>
      <p>表示・管理したいメニューを選択してください。</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "300px",
          margin: "20px 0",
        }}
      >
        <button
          type="button"
          onClick={() => handleSelectCategory("ライブ・イベント")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          🎤 ライブ・イベント
        </button>

        <button
          type="button"
          onClick={() => handleSelectCategory("メディア出演")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          📺 メディア出演（TV・ラジオ等）
        </button>

        <button
          type="button"
          onClick={() => handleSelectCategory("グッズ・発売日")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          🛍️ グッズ・リリース情報
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate("/oshi-select")}
        style={{ padding: "8px 16px" }}
      >
        推し選択に戻る
      </button>
    </div>
  );
}

export default CategorySelect;
