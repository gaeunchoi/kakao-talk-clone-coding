import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kakaotalk-logo.png";
import { isValidEmail } from "../../utils/emailValidation";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMesasge, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleIdChanged = (e) => {
    setId(e.target.value);

    // ID 이메일 형식 체크
    if (!isValidEmail(id)) {
      setErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
      return;
    }
    setErrorMessage("");
  };

  const handlePwChanged = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === "admin@test.com" && pw === "admin") {
      navigate("/chatlist");
    } else {
      setErrorMessage("로그인 정보가 올바르지 않습니다");
      return;
    }
  };

  const isBtnDisabled = id === "" || pw === "" || !isValidEmail(id);

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
        <button type="submit" disabled={isBtnDisabled}>
          로그인
        </button>
        <p onClick={() => navigate("/Signup")}>이메일로 회원가입</p>
        {errorMesasge && <div className="error-message">{errorMesasge}</div>}
      </form>
    </div>
  );
};

export default Login;
