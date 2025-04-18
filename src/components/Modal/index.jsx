import "./style.css";

const Modal = ({ message, closeFnc, showBtn = true }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        {showBtn && <button onClick={closeFnc}>확인</button>}
      </div>
    </div>
  );
};

export default Modal;
