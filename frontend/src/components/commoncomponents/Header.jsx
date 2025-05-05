import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useParams } from "react-router-dom";

function Header() {
  const { branch } = useParams();

  return (
    <div className="header-container  w-100  p-3 d-flex justify-content-between ">
      {branch == "" || branch == null ? (
        <></>
      ) : (
        <>
          <Link
            className="bg-dark p-2 border rounded-pill text-white px-4"
            to={"/branch-nav"}
          >
            {branch?.toUpperCase() == "BRANCH-1"
              ? "Alizba Wood Furniture"
              : "KSN Furniture"}
          </Link>
          {/* <div>
            <AccountCircleIcon className=" fs-2" />
          </div> */}
        </>
      )}
    </div>
  );
}

export default Header;
