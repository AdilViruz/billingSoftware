import { NavLink } from "react-router-dom";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HandymanIcon from "@mui/icons-material/Handyman";
import SellIcon from "@mui/icons-material/Sell";
import ShapeLineIcon from "@mui/icons-material/ShapeLine";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useLogoutMutation } from "../../api/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../../public/images/Alizba_logo.png";
import { clearToken } from "../../utils/localStorage";

function SideNavbar() {
  const { branch } = useParams();

  const navigate = useNavigate();

  const [logout, { data, error, isError, isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/", { replace: true });
    } else if (isError) {
      toast.error(error?.data.message);
    }
  }, [isSuccess, isError, data?.message, error?.data.message]);

  const handleLogout = () => {
    logout();
    clearToken();
  };

  return (
    <div className="nav-container">
      <div className="border">
        {branch == "branch-1" ? (
          <img className="w-75 " src={Logo} alt="" />
        ) : (
          <img style={{ width: "90%" }} src="/images/logo2.png" alt="" />
        )}
      </div>
      <ul className="navbar-link">
        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/dashboard/${branch}`}
          >
            <DashboardCustomizeIcon />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/quotation/${branch}`}
          >
            <DescriptionIcon />
            Quotation
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/purchase-details/${branch}`}
          >
            <LocalMallIcon />
            Purchase Details
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/raw-materials/${branch}`}
          >
            <ShapeLineIcon />
            Raw Material
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/purchase-payment/${branch}`}
          >
            <HistoryIcon />
            Purchase History
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/buyer-details/${branch}`}
          >
            <LocalMallIcon />
            Buyer Details
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/build-products/${branch}`}
          >
            <HandymanIcon />
            Build Products
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/sold-products/${branch}`}
          >
            <SellIcon />
            Sold Products
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/plain-invoice/${branch}`}
          >
            <ListAltIcon />
            Local
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/plain-payment-history/${branch}`}
          >
            <HistoryIcon />
            Local Sales History
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/gst-invoice/${branch}`}
          >
            <ReceiptIcon />
            GST Invoice
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/payment-history/${branch}`}
          >
            <HistoryIcon />
            GST Sales History
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/generate-invoice/${branch}`}
          >
            <ReceiptLongOutlinedIcon />
            Generate Invoice
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => isActive && "active-link"}
            to={`/change-password/${branch}`}
          >
            <LockResetIcon />
            Change Password
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleLogout}>
            <LogoutIcon />
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNavbar;
