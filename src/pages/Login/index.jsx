import "./style.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { login } from "../../apis/auth";
import { getMyInfo } from "../../apis/users";
import CustomBtn from "../../components/CustomBtn";
import useTokenStore from "../../stores/token";
import useLoginUserStore from "../../stores/loginUser";
import { isValidEmail } from "../../utils/validation";

const Login = () => {
  // ============================ State ============================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // ============================ State 끝 ============================

  const navigate = useNavigate();
  const { setToken } = useTokenStore();
  const { setUser } = useLoginUserStore();

  // ============================ Modal ============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "로그인 성공!") navigate("/chatlist");
  };
  // ============================ Modal 끝 ============================

  // ID 이메일 형식 체크
  useEffect(() => {
    if (email && !isValidEmail(email))
      setErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
    else setErrorMessage("");
  }, [email]);

  // 로그인 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 로그인 시도 및 토큰 전역관리
      const data = await login({ email, password });
      setToken(data.accessToken);

      // 로그인 성공하면 내 정보 가져오기 및 유저정보 전역관리
      const userData = await getMyInfo();
      setUser(userData);

      setModalMessage("로그인 성공!");
      openModal();
    } catch (e) {
      console.log("🚨 에러 발생: ", e);

      const message =
        e.response?.data?.message ||
        "에러가 발생했습니다. 잠시 후 다시 시도해주세요.";

      if (message.includes("비밀번호")) {
        setErrorMessage(message);
      } else {
        setModalMessage(message);
        openModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isBtnDisabled = email === "" || password === "" || !isValidEmail(email);

  return (
    <div className="login-container">
      <img src={logo} className="logo" alt="Kakaotalk Logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디(E-mail)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomBtn type="submit" disabled={isBtnDisabled || isLoading}>
          {isLoading ? "로그인 진행중" : "로그인"}
        </CustomBtn>
        <Link to="/signup" className="signup-link">
          이메일로 회원가입
        </Link>

        {/* ID, PW 필드 에러메시지 */}
        <div className="login-error-message">{errorMessage || "\u00A0"}</div>
      </form>

      {/* 모달 */}
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Login;
