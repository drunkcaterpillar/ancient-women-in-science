// src/components/Modal.tsximport React from "react";
import "./Modal.css";

interface ModalProps {
  content: JSX.Element | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content}
        <button className="vintage-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
