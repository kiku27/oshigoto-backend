import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: loginId,
          password: password,
        }),
      });

      if (response.ok) {
        // ログイン成功状態をセッションに保存
        sessionStorage.setItem("isLoggedIn", "true");
        // 推し選択画面へ遷移
        navigate("/oshi-select");
      } else {
        setErrorMessage("ログインIDまたはパスワードが正しくありません。");
      }
    } catch (error) {
      console.error("ログイン処理中にエラーが発生しました:", error);
      setErrorMessage("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>ログイン</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="loginId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            ログインID:
          </label>
          <input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            パスワード:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
            required
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px", width: "100%" }}>
          ログイン
        </button>
      </form>

      {/* 先生・評価者向けの案内表示 */}
      <div
        style={{
          marginTop: "30px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
          【動作確認用アカウント】
        </p>
        <p style={{ margin: "2px 0" }}>
          ログインID: <code>admin</code>
        </p>
        <p style={{ margin: "2px 0" }}>
          パスワード: <code>password123</code>
        </p>
      </div>
    </div>
  );
}

export default Login;
