import "./Modal.css";

const Modal = ({ message, closeFnc }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={closeFnc}>확인</button>
      </div>
    </div>
  );
};

export default Modal;
