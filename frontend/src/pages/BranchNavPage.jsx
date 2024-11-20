import { useEffect } from "react";
import { Link } from "react-router-dom";

function BranchNavPage() {
  //  window.location.reload()
  return (
    <div className="branch-container  ">
      <div className="d-flex ">
        <div className="branch-link">
          <img src="/images/Alizba_logo.png" alt="" />
          <br />
          <h3>Alizba Wood Furnitures</h3>
          <Link
            className="btn btn-bg w-50 w-100 mt-2"
            to={`/dashboard/branch-1`}
          >
            Continue
          </Link>
        </div>
        <div className="branch-link">
          <img src="/images/logo2.png" alt="" />
          <br />
          <h3>KSN Furniture</h3>
          <Link className="btn btn-bg w-100  mt-2" to={`/dashboard/branch-2`}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BranchNavPage;
