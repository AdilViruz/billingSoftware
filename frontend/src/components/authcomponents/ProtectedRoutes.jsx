import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import SideNavbar from "../commoncomponents/SideNavbar";
import Header from "../commoncomponents/Header";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/localStorage";

// eslint-disable-next-line react/prop-types
function ProtectedRoutes({ children }) {
  const { branch } = useParams();

  const allowedBranchs = "branch-1,branch-2";

  // const is_auth = Cookies.get("is_auth");
  const is_auth = getToken()
  


  if (is_auth) {
    return (
      <div className="d-flex align-self-end">
        {!allowedBranchs.includes(branch) && <Navigate to="/branch-nav" />}
        {branch && <SideNavbar />}
        <div className="vw-100">
          <Header />
          {children}
        </div>
      </div>
    );
  }
  return <Navigate to="/" />;
}

export default ProtectedRoutes;
