import { useState, useEffect, useCallback } from "react";
import "./Signup.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/emailValidation";
import { isValidPassword } from "../../utils/pwValidation";
import Modal from "../../components/Modal/Modal";
import SignupInput from "../../components/SignupInput";

const Signup = () => {
  // ============================ State ============================
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [confirmPwErrorMessage, setConfirmPwErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // ============================ State 끝 ============================

  // ============================ Modal ============================
  // 회원가입 완료 버튼 비활성화를 위한 상태감지
  const [isFormValid, setIsFormValid] = useState(false);

  // 회원가입 완료시 모달을 위한 상태감지
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 에러시 모달을 위한 상태감지
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

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
  // ============================ Modal 끝 ============================

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

  // 상태가 바뀔때만 유효성 검사하기
  useEffect(() => {
    checkFormValid();
  }, [checkFormValid]);

  // 아이디 필드
  const handleIdChanged = (e) => {
    setId(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setIdErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
    } else {
      setIdErrorMessage("");
    }
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
  };

  // 비밀번호 확인 필드
  const handleConfirmPwChanged = (e) => {
    setConfirmPw(e.target.value);

    if (pw !== e.target.value) {
      setConfirmPwErrorMessage("입력하신 비밀번호와 일치하지 않습니다.");
    } else {
      setConfirmPwErrorMessage("");
    }
  };

  // 이름 필드
  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  // 휴대전화번호 필드
  const handlePhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value);

    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(e.target.value)) {
      setPhoneNumberErrorMessage("11자리의 전화번호를 모두 입력해주세요.");
    } else {
      setPhoneNumberErrorMessage("");
    }
  };

  // 로그인 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // API 연동
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
      openSuccessModal();
    } catch (e) {
      console.log(e);
      openErrorModal("에러가 발생했습니다. 잠시 후 다시 시도해주세요");
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
          id="id"
          name="id"
          placeholder="아이디를 이메일 형식으로 입력하세요"
          value={id}
          onChange={handleIdChanged}
          errorMessage={idErrorMessage || "\u00A0"}
        />

        <SignupInput
          label="비밀번호"
          id="pw"
          name="pw"
          type="password"
          placeholder="비밀번호를 8자 이상 입력하세요"
          value={pw}
          onChange={handlePwChanged}
          errorMessage={pwErrorMessage || "\u00A0"}
        />

        <SignupInput
          label="비밀번호 확인"
          id="confirmPw"
          name="confirmPw"
          type="password"
          placeholder="위 비밀번호와 동일한 값을 입력하세요"
          value={confirmPw}
          onChange={handleConfirmPwChanged}
          errorMessage={confirmPwErrorMessage || "\u00A0"}
        />

        <SignupInput
          label="이름"
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={handleNameChanged}
        />

        <SignupInput
          label="휴대전화번호"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="휴대전화번호를 입력하세요(- 제외)"
          value={phoneNumber}
          maxLength={11}
          onChange={handlePhoneNumberChanged}
          errorMessage={phoneNumberErrorMessage || "\u00A0"}
        />

        <div className="signup-form-field">
          <button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "회원가입 진행중" : "회원가입 완료"}
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
        <Modal
          message={errorModalMessage}
          closeFnc={closeErrorModal}
          showBtn={true}
        />
      )}
    </div>
  );
};

export default Signup;
