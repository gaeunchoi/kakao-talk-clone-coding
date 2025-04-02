import { useState } from "react";
import "./Signup.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleIdChanged = (e) => {
    setId(e.target.value);
  };

  const handlePwChanged = (e) => {
    setPw(e.target.value);
  };

  const handleConfirmPwChanged = (e) => {
    setConfirmPw(e.target.value);
  };

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container">
      <div className="title">
        <img src={logo} className="logo" alt="Kakaotalk logo" />
        <p>회원가입</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-field">
          <label htmlFor="id">아이디(E-mail)</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디를 이메일 형식으로 입력하세요"
            value={id}
            onChange={handleIdChanged}
          />
        </div>
        <div className="signup-form-field">
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            id="pw"
            name="pw"
            placeholder="비밀번호를 8자 이상 입력하세요"
            value={pw}
            onChange={handlePwChanged}
          />
        </div>
        <div className="signup-form-field">
          <label htmlFor="confirmPw">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPw"
            name="confirmPw"
            placeholder="위 비밀번호와 동일한 값을 입력하세요"
            value={confirmPw}
            onChange={handleConfirmPwChanged}
          />
        </div>
        <div className="signup-form-field">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handleNameChanged}
          />
        </div>
        <div className="signup-form-field">
          <label htmlFor="phoneNumber">휴대전화번호</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="휴대전화번호를 입력하세요(- 제외)"
            value={phoneNumber}
            onChange={handlePhoneNumberChanged}
          />
        </div>
        <div className="signup-form-field">
          <button type="submit">회원가입 완료</button>
        </div>
        <div className="signup-form-field">
          <p onClick={() => navigate("/Login")}> ← 로그인 화면으로 돌아가기</p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
