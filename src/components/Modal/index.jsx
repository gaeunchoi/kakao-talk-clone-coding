import CustomBtn from "../CustomBtn";
import "./style.css";

const Modal = ({ message, closeFnc, showBtn = true }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        {showBtn && (
          <CustomBtn className="modal-btn" onClick={closeFnc}>
            확인
          </CustomBtn>
        )}
      </div>
    </div>
  );
};

export default Modal;
