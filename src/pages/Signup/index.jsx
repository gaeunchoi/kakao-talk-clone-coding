import "./style.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../apis/auth";
import Modal from "../../components/Modal";
import SignupInput from "./components/SignupInput";
import CustomBtn from "../../components/CustomBtn";
import { isValidEmail, isValidPassword } from "../../utils/validation";

const Signup = () => {
  // ============================ Hook ============================
  const navigate = useNavigate();

  // ============================ State ============================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [pwErrorMessage, setPwErrorMessage] = useState(null);
  const [confirmPwErrorMessage, setConfirmPwErrorMessage] = useState(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  // ============================ Memo ============================
  const isFormValid = useMemo(() => {
    return (
      email &&
      password &&
      confirmPw &&
      name &&
      phoneNumber &&
      !emailErrorMessage &&
      !pwErrorMessage &&
      !confirmPwErrorMessage &&
      !phoneNumberErrorMessage
    );
  }, [
    email,
    password,
    confirmPw,
    name,
    phoneNumber,
    emailErrorMessage,
    pwErrorMessage,
    confirmPwErrorMessage,
    phoneNumberErrorMessage,
  ]);

  // ============================ function ============================
  const openSuccessModal = () => {
    setModalState({
      isOpen: true,
      type: "success",
      message: "회원가입이 완료되었습니다!",
    });
  };

  const openErrorModal = (message) => {
    setModalState({
      isOpen: true,
      type: "error",
      message,
    });
  };

  const closeModal = () => {
    const isModalSuccess = modalState.type === "success";
    setModalState({
      isOpen: false,
      type: "",
      message: "",
    });
    if (isModalSuccess) navigate("/");
  };

  // 이메일
  const handleEmailChanged = (e) => {
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setEmailErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
      return;
    }
    setEmailErrorMessage(null);
  };

  // 비밀번호
  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
    const result = isValidPassword(e.target.value, email);
    if (!result.valid) {
      setPwErrorMessage(result.message);
      return;
    }
    setPwErrorMessage(null);
  };

  // 비밀번호 확인
  const handleConfirmPwChanged = (e) => {
    setConfirmPw(e.target.value);

    if (password !== e.target.value) {
      setConfirmPwErrorMessage("입력하신 비밀번호와 일치하지 않습니다.");
      return;
    }
    setConfirmPwErrorMessage(null);
  };

  // 휴대전화번호
  const handlePhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value);

    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(e.target.value)) {
      setPhoneNumberErrorMessage("숫자만 11자리를 입력해주세요.");
      return;
    }
    setPhoneNumberErrorMessage(null);
  };

  // 가입완료버튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup({
        email,
        password,
        name,
        phoneNumber,
      });

      openSuccessModal();
    } catch (e) {
      console.error("🚨 에러발생: ", e);
      openErrorModal(e.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="title">
        <img src={logo} className="logo" alt="Kakaotalk logo" />
        <p>회원가입</p>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <SignupInput
          label="아이디(E-mail)"
          id="email"
          name="email"
          placeholder="아이디를 이메일 형식으로 입력하세요"
          value={email}
          onChange={handleEmailChanged}
          errorMessage={emailErrorMessage}
        />

        <SignupInput
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 8자 이상 입력하세요"
          value={password}
          onChange={handlePasswordChanged}
          errorMessage={pwErrorMessage}
        />

        <SignupInput
          label="비밀번호 확인"
          id="confirmPw"
          name="confirmPw"
          type="password"
          placeholder="위 비밀번호와 동일한 값을 입력하세요"
          value={confirmPw}
          onChange={handleConfirmPwChanged}
          errorMessage={confirmPwErrorMessage}
        />

        <SignupInput
          label="이름"
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <SignupInput
          label="휴대전화번호"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="휴대전화번호를 입력하세요(숫자만)"
          value={phoneNumber}
          maxLength={11}
          onChange={handlePhoneNumberChanged}
          errorMessage={phoneNumberErrorMessage}
        />

        <div className="signup-form-field">
          <CustomBtn type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "회원가입 진행중" : "회원가입 완료"}
          </CustomBtn>
        </div>
        <div className="signup-form-field">
          <Link to="/" className="login-link">
            로그인 화면으로 돌아가기
          </Link>
        </div>
      </form>

      {/* Modal */}
      {modalState.isOpen && (
        <Modal message={modalState.message} onClose={closeModal} />
      )}
    </div>
  );
};

export default Signup;
