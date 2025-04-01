import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="./chatlist" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chatlist"
          element={isAuthenticated() ? <ChatList /> : <Navigate to="./login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
