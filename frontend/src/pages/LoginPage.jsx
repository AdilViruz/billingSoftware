
import { useState } from "react";
import LoginForm from "../components/authcomponents/LoginForm"
import ForgotPasswordModal from "../modals/ForgotPasswordModal"



function LoginPage() {


  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <LoginForm
      setModalShow={setModalShow}
      />
      <ForgotPasswordModal
       show={modalShow}
       onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default LoginPage
