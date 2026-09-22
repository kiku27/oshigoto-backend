import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OshiForm() {
  const [oshiName, setOshiName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Spring Bootの推し登録API (/api/oshis) を呼出
      const response = await fetch("http://localhost:8080/api/oshis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: oshiName, // エンティティのprivate String nameに合わせて「name」で送信！
        }),
      });

      if (response.ok) {
        // 登録成功時、推し選択画面に戻る
        navigate("/oshi-select");
      } else {
        setErrorMessage("推しの登録に失敗しました。");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      setErrorMessage("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>新規推し登録</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="oshiName"
            style={{ display: "block", marginBottom: "5px" }}
          >
            推しの名前:
          </label>
          <input
            id="oshiName"
            type="text"
            value={oshiName}
            onChange={(e) => setOshiName(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "8px 16px" }}>
            登録
          </button>
          <button
            type="button"
            onClick={() => navigate("/oshi-select")}
            style={{ padding: "8px 16px" }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}

export default OshiForm;
