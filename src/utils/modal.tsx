import type { ModalProps } from "../interfaces/IModalProps";

function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          maxHeight: "80vh",
          overflowY: "auto",
          minWidth: "300px"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;