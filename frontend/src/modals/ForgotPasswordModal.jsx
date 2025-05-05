/* eslint-disable react/prop-types */

import Modal from 'react-bootstrap/Modal';
import ForgotPassword from '../components/authcomponents/ForgotPassword';
function ForgotPasswordModal(props) {
  return (
    <Modal
    {...props}
    size=""
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       Forgot Password
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ForgotPassword/>
    </Modal.Body>
  </Modal>
  )
}

export default ForgotPasswordModal
