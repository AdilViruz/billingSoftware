/* eslint-disable react/prop-types */

import Spinner from "react-bootstrap/esm/Spinner";
import { useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
// eslint-disable-next-line react/prop-types
function PurchasePaymentHistory({
  title,
  data,
  isLoading,
  path,
  editpath,
  setDeleteModal,
  setId,
}) {
  const navigate = useNavigate();

  const [serachValue, setSearchValue] = useState("");

  const handleEdit = (id) => {
    navigate(editpath, { state: { id } });
  };

  const handleDelete = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="product-heading">
          <h1 className="fs-4">{title}</h1>
        </div>
        <div className="my-3  d-flex justify-content-between ">
          <div className="w-25">
            <label htmlFor="name" className="form-label">
              Search history by buyer name
            </label>
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Search buyer name"
            />
          </div>
          <Link type="button" className="btn btn-bg align-self-end " to={path}>
            Add Payment
          </Link>
        </div>
        <div>
          {/* Adils Code Starts here */}
          <table className="table table-hover ">
            <thead>
              <tr>
                {/* <th>Sr No.</th> */}
                <th>Name</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Balance Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="payment-last-row">
                <td colSpan={3} className="fw-bold">
                  Total Balance Amount
                </td>

               
               
                <td className="fw-bold">
                  {data?.products
                    ?.filter((item) =>
                      item.name
                        ?.toLowerCase()
                        .includes(serachValue?.toLowerCase())
                    )
                    ?.reduce((acc, curr) => (acc += curr.total_amount), 0) -
                    data?.products
                      ?.filter((item) =>
                        item.name
                          ?.toLowerCase()
                          .includes(serachValue?.toLowerCase())
                      )
                      ?.reduce(
                        (acc, curr) => (acc += curr.paid_amount),
                        0
                      )}{" "}
                  Rs
                </td>
                <td></td>
                 <td></td>
              </tr>
              {data?.products
                ?.filter((item) =>
                  item.name?.toLowerCase().includes(serachValue?.toLowerCase())
                )
                ?.map((item, index) => (
                  <tr key={item._id} className="product-list-row">
                    {/* <td>{index + 1}</td> */}
                    <td>{item.name}</td>
                    {item?.products[0]?.product_name == "no_product" ?<td className="text-success">Balance Paid</td> : <td> {item?.total_amount} Rs</td>}
                    <td>{item?.paid_amount} Rs</td>
                    <td>{item?.products[0]?.product_name == "no_product" ? `- ${item.paid_amount}` :  item?.total_amount - item.paid_amount} Rs</td>
                    <td>{moment(item.date).format("ll")}</td>
                    <td>
                      <span
                        className="btn btn-primary"
                        onClick={() => handleEdit(item._id)}
                      >
                        <BorderColorOutlinedIcon />
                      </span>
                      <span
                        className="btn btn-danger  mx-1"
                        onClick={() => handleDelete(item._id)}
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
          {data?.invoiceDetails?.length < 1 && (
            <div className="text-center">No Data</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchasePaymentHistory;
