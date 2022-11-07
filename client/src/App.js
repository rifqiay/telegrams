import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useWindowDimensions from "./components/window-size/WindowSize";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ChatList from "./pages/chat/ChatList";
import ListFriends from "./pages/mobile/ListFriends";

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <>
      {width >= 992 ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace="true" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatList />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace="true" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ListFriends />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
