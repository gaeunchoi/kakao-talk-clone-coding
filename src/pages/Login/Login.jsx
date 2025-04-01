import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kakaotalk-logo.png";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleIdChanged = (e) => {
    setId(e.target.value);
  };

  const handlePwChanged = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ID: ", id, "PW:", pw);

    if (id === "admin@test.com" && pw === "admin") {
      navigate("/chatlist");
    } else {
      alert("로그인 정보가 올바르지 않습니다");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} className="logo" alt="Kakaotalk Logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디(E-mail)"
          value={id}
          onChange={handleIdChanged}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChanged}
        />
        <button type="submit">로그인</button>
        <p onClick={() => navigate("./Signup")}>이메일로 회원가입</p>
      </form>
    </div>
  );
};

export default Login;
