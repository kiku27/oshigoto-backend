import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OshiSelect() {
  const [oshiList, setOshiList] = useState([]);
  const navigate = useNavigate();

  // 推し一覧を取得する関数
  const fetchOshiList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/oshis");
      if (response.ok) {
        const data = await response.json();
        setOshiList(data);
      }
    } catch (error) {
      console.error("推し一覧の取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchOshiList();
    };
    loadData();
  }, []);

  // 削除ボタンが押された時の処理
  const handleDelete = async (id, name, e) => {
    // 推し選択（画面遷移）イベントが同時に動かないように止める
    e.stopPropagation();

    // 削除前の確認ダイアログ
    if (!window.confirm(`「${name}」を削除してもよろしいですか？`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/oshis/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // 削除成功したら一覧を再取得して画面を更新
        fetchOshiList();
      } else {
        alert("削除に失敗しました。");
      }
    } catch (error) {
      console.error("削除処理中にエラーが発生しました:", error);
      alert("通信エラーが発生しました。");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>推しを選択</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {oshiList.map((oshi) => (
          <div
            key={oshi.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* 推しの名前（クリックでカテゴリー選択へ） */}
            <span
              onClick={() =>
                navigate("/category-select", { state: { oshiId: oshi.id } })
              }
              style={{ cursor: "pointer", fontWeight: "bold", flexGrow: 1 }}
            >
              {oshi.name}
            </span>

            {/* 削除ボタン */}
            <button
              onClick={(e) => handleDelete(oshi.id, oshi.name, e)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/oshi-form")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        新しい推しを登録
      </button>
    </div>
  );
}

export default OshiSelect;
