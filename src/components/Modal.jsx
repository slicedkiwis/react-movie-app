import { useEffect } from "react";
import "./modal.css";
const Modal = (props) => {
  return (
    <div
      className={props.toggleModal ? "Modal-shown" : "Modal-hidden"}
      onClick={() => {
        props.setToggleModal(false);
      }}
    >
      {props.children}
    </div>
  );
};

export default Modal;
