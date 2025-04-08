import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "../reset.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ChatList from "./pages/ChatList/ChatList";
import UserProfile from "./pages/UserProfile/UserProfile";
import MyChatRoom from "./pages/MyChatRoom/MyChatRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/mychatroom" element={<MyChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
