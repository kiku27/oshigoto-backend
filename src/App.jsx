import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import OshiSelect from "./components/OshiSelect";
import OshiForm from "./components/OshiForm";
import CategorySelect from "./components/CategorySelect";
import ScheduleList from "./components/ScheduleList";
import ScheduleForm from "./components/ScheduleForm";
import ScheduleEdit from "./components/ScheduleEdit";

// 未ログインの場合にログイン画面へ強制リダイレクトするガードコンポーネント
const PrivateRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "sans-serif",
        }}
      >
        <Routes>
          {/* 初期表示はログイン画面へリダイレクト */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* 各画面のルーティング設定（ログイン必須ガードを適用） */}
          <Route
            path="/oshi-select"
            element={
              <PrivateRoute>
                <OshiSelect />
              </PrivateRoute>
            }
          />
          <Route
            path="/oshi-form"
            element={
              <PrivateRoute>
                <OshiForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/category-select"
            element={
              <PrivateRoute>
                <CategorySelect />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-list"
            element={
              <PrivateRoute>
                <ScheduleList />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-form"
            element={
              <PrivateRoute>
                <ScheduleForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-edit"
            element={
              <PrivateRoute>
                <ScheduleEdit />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
