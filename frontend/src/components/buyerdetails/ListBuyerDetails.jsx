/* eslint-disable react/prop-types */
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useState } from "react";
import moment from "moment";
// eslint-disable-next-line react/prop-types
function ListBuyerDetails({
  title,
  data,
  isLoading,
  setShowModal,
  setEditModal,
  setProductId,
  setDeleteModal,
  singleBuildProduct,
  path,
}) {
  const { branch } = useParams();

  const handleProductDetails = (show, id) => {
    setShowModal(show);
    singleBuildProduct({
      branch,
      id,
    });
  };

  const handleEditProduct = (show, id) => {
    setEditModal(show);
    singleBuildProduct({
      branch,
      id,
    });
  };

  const handleDeleteProduct = (show, id) => {
    setDeleteModal(show);
    setProductId(id);
  };

  const [serachValue, setSearchValue] = useState("");

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="product-heading">
          <h1 className="fs-4">{title}</h1>
        </div>
        <div className="my-3  d-flex justify-content-between ">
          <div className="w-25">
            <label htmlFor="name" className="form-label">
              Search by name
            </label>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Search ..."
            />
          </div>
          <Link type="button" className="btn btn-bg align-self-end " to={path}>
            Add Buyer
          </Link>
        </div>
        <div>
          {/* Adils Code Starts here */}
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Address</th>
                <th>State</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.buyers
                .filter((item) =>
                  item.name?.toLowerCase().includes(serachValue?.toLowerCase())
                )
                ?.map((item, index) => (
                  <tr key={item._id} className="product-list-row">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{moment(item.date).format("ll")}</td>
                    <td>
                      <span
                        className="btn btn-success mx-1"
                        onClick={() => handleProductDetails(true, item._id)}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </span>
                      <span
                        className="btn btn-primary"
                        onClick={() => handleEditProduct(true, item._id)}
                      >
                        <BorderColorOutlinedIcon />
                      </span>
                      <span
                        className="btn btn-danger  mx-1"
                        onClick={() => handleDeleteProduct(true, item._id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Adils Code ends here */}

          {isLoading && (
            <div className="d-flex justify-content-center">
              <Spinner size="lg" className="text-center" />
            </div>
          )}
          {data?.buyers.length < 1 && (
            <div className="text-center">No Data</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListBuyerDetails;
