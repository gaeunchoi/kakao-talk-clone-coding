import { useState, useEffect, useCallback } from "react";
import "./Signup.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/emailValidation";
import { isValidPassword } from "../../utils/pwValidation";
import Modal from "../../components/Modal";

const Signup = () => {
  // 아이디, 비밀번호, 비밀번호 확인, 이름, 휴대전화번호를 위한 상태감지
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // 아이디, 비밀번호, 비밀번호 확인, 휴대전화번호 에러메시지를 위한 상태감지
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [confirmPwErrorMessage, setConfirmPwErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  // 회원가입 완료 버튼 비활성화를 위한 상태감지
  const [isFormValid, setIsFormValid] = useState(false);

  // 회원가입 완료시 모달을 위한 상태감지
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 에러시 모달을 위한 상태감지
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  // 버튼 비활성화 감지
  const checkFormValid = useCallback(() => {
    const isValid =
      id &&
      pw &&
      confirmPw &&
      name &&
      phoneNumber &&
      !idErrorMessage &&
      !pwErrorMessage &&
      !confirmPwErrorMessage &&
      !phoneNumberErrorMessage;

    setIsFormValid(isValid);
  }, [
    id,
    pw,
    confirmPw,
    name,
    phoneNumber,
    idErrorMessage,
    pwErrorMessage,
    confirmPwErrorMessage,
    phoneNumberErrorMessage,
  ]);

  // useState를 호출할 때가 아니라 state가 변경될 때 버튼 비활성화
  useEffect(() => {
    checkFormValid();
  }, [
    id,
    pw,
    confirmPw,
    name,
    phoneNumber,
    idErrorMessage,
    pwErrorMessage,
    confirmPwErrorMessage,
    phoneNumberErrorMessage,
    checkFormValid,
  ]);

  // 성공 모달 열기 닫기
  const openSuccessModal = () => setIsModalOpen(true);
  const closeSuccessModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // 에러 모달 열기 닫기
  const openErrorModal = (message) => {
    setErrorModalMessage(message);
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorModalMessage("");
    setIsErrorModalOpen(false);
  };

  // 아이디 필드
  const handleIdChanged = (e) => {
    setId(e.target.value);
    if (!isValidEmail(id)) {
      setIdErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
    } else {
      setIdErrorMessage("");
    }
    checkFormValid();
  };

  // 비밀번호 필드
  const handlePwChanged = (e) => {
    setPw(e.target.value);
    const result = isValidPassword(e.target.value, id);
    if (!result.valid) {
      setPwErrorMessage(result.message);
    } else {
      setPwErrorMessage("");
    }
    checkFormValid();
  };

  // 비밀번호 확인 필드
  const handleConfirmPwChanged = (e) => {
    setConfirmPw(e.target.value);

    // API 붙이기 전 TEST
    if (pw !== e.target.value) {
      setConfirmPwErrorMessage("입력하신 비밀번호와 일치하지 않습니다.");
    } else {
      setConfirmPwErrorMessage("");
    }
    checkFormValid();
  };

  // 이름 필드
  const handleNameChanged = (e) => {
    setName(e.target.value);
    checkFormValid();
  };

  // 휴대전화번호 필드
  const handlePhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value);
    if (e.target.value.includes("-")) {
      setPhoneNumberErrorMessage("-를 제외하고 입력해주세요");
    } else {
      setPhoneNumberErrorMessage("");
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://goorm-kakaotalk-api.vercel.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: id,
            password: pw,
            name,
            phoneNumber,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        // 중복 이메일/휴대폰번호 400에러 퉤
        if (res.status === 400) {
          openErrorModal(data.message);
          return;
        }
        openErrorModal(data.message);
        return;
      }

      localStorage.setItem("token", data.accessToken);
      openSuccessModal();
    } catch (e) {
      console.log(e);
      openErrorModal("에러가 발생했습니다. 잠시 후 다시 시도해주세요");
    }
  };

  return (
    <div className="signup-container">
      <div className="title">
        <img src={logo} className="logo" alt="Kakaotalk logo" />
        <p>회원가입</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-field">
          <div className="info">
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
          {idErrorMessage && (
            <div className="signup-error-message">{idErrorMessage}</div>
          )}
        </div>
        <div className="signup-form-field">
          <div className="info">
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
          {pwErrorMessage && (
            <div className="signup-error-message">{pwErrorMessage}</div>
          )}
        </div>
        <div className="signup-form-field">
          <div className="info">
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
          {confirmPwErrorMessage && (
            <div className="signup-error-message">{confirmPwErrorMessage}</div>
          )}
        </div>
        <div className="signup-form-field">
          <div className="info">
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
        </div>
        <div className="signup-form-field">
          <div className="info">
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
          {phoneNumberErrorMessage && (
            <div className="signup-error-message">
              {phoneNumberErrorMessage}
            </div>
          )}
        </div>
        <div className="signup-form-field">
          <button type="submit" disabled={!isFormValid}>
            회원가입 완료
          </button>
        </div>
        <div className="signup-form-field">
          <p onClick={() => navigate("/")}> ← 로그인 화면으로 돌아가기</p>
        </div>
      </form>

      {/* 회원가입 완료 모달 */}
      {isModalOpen && (
        <Modal
          message="회원가입이 완료되었습니다!"
          closeFnc={closeSuccessModal}
        />
      )}

      {/* 에러 모달 */}
      {isErrorModalOpen && (
        <Modal message={errorModalMessage} closeFnc={closeErrorModal} />
      )}
    </div>
  );
};

export default Signup;
