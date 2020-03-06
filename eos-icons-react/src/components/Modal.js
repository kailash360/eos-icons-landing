import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = props => {
  // const { children } = props;
  const { children, cancelText, okText, onCancel, onOk, showButtons } = props;
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal-card">
        <div className="close" onClick={onCancel} />
        <div className="flex flex-row modal-content">{children}</div>
        {showButtons && (
          <div className="flex flex-row">
            <div
              className="flex-content modal-btn modal-btn-cancel"
              align="center"
              onClick={onCancel}
            >
              {cancelText ? cancelText : 'Cancel'}
            </div>
            <div
              className="flex-content modal-btn modal-btn-accept"
              align="center"
              onClick={onOk}
            >
              {okText ? okText : 'Accept'}
            </div>
          </div>
        )}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;

/* Used as follows */

// const handleCancel = () => {
//   showModal(!modal);
// };

// const handleOk = () => {
//   console.log('onOk called');
// };

// {
//   modal ? (
//     <Modal
//       showButtons={true}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       cancelText="Nope"
//       okText="Yup"
//     >
//       <p>Are you sure you want to delete this element?</p>
//     </Modal>
//   ) : null;
// }