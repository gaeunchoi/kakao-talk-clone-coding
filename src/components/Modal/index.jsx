import CustomBtn from "../CustomBtn";
import "./style.css";
import { createPortal } from "react-dom";

const Modal = ({ message, onClose }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        {onClose && (
          <CustomBtn className="modal-btn" onClick={onClose}>
            확인
          </CustomBtn>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
