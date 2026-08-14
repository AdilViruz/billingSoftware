/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
function InvoiceList({
  heading,
  path,
  data,
  isLoading,
  setShow,
  singleBilling,
  setId,
  setDeleteModal,
  editpath,
}) {
  const { branch } = useParams();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(editpath, { state: { id } });
  };

  const handleView = (id) => {
    setShow(true);
    setId(id);
    singleBilling({ branch, id });
  };
  const handleDelete = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  const [serachValue, setSearchValue] = useState("");

  return (
    <div className="main-content-container">
      <div className="main-content">
        <div className="product-heading">
          <h1 className="fs-4">{heading}</h1>
        </div>
        <div className="my-3  d-flex justify-content-between ">
          <div className="w-25">
            <label htmlFor="name" className="form-label">
              {pathname.includes("quotation") ? "Search by name" : "Search by name or invoice no."}
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
            {pathname.includes("quotation") ? "Add Quotation" : "Add Invoice"}
          </Link>
        </div>
        <div>
          {pathname.includes("quotation") ? (
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Buyer Name</th>
                  <th>State</th>
                  <th>Date</th>
                  {/* <th>Amount</th> */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.QuotationDetails?.filter((item) =>
                  item.name?.toLowerCase().includes(serachValue?.toLowerCase())
                )?.map((item, index) => (
                  <tr key={item._id} className="product-list-row">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.state}</td>
                    <td>{moment(item.date).format("L")}</td>
                    {/* <td>7854Rs</td> */}
                    <td>
                      <span
                        className="btn btn-success mx-1"
                        onClick={() => handleView(item._id)}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </span>
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
          ) : (
            <table className="table table-hover ">
              <thead>
                <tr>
                  {/* <th>Sr No.</th> */}
                  <th>Buyer Name</th>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  {/* <th>Amount</th> */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.invoiceDetails
                  ?.filter((item) =>
                    pathname.includes("plain")
                      ? item.gst_number == "" &&
                      item.ure_number == "" &&
                      !item.isGenerated
                      : item.isGstRegistered | (item.gst_number != "")
                  )
                  ?.filter((item) =>
                    item.name?.toLowerCase().includes(serachValue?.toLowerCase()) ||
                    item.invoice_number?.toString().toLowerCase().includes(serachValue?.toLowerCase())
                  )
                  ?.map((item, index) =>
                    item.show_invoice ? (
                      <>
                        <tr key={item._id} className="product-list-row">
                          {/* <td>{index + 1}</td> */}
                          <td>{item.name}</td>
                          <td>INV-{item.invoice_number}</td>
                          <td>{moment(item.date).format("ll")}</td>
                          {/* <td>7854Rs</td> */}
                          <td>
                            <span
                              className="btn btn-success mx-1"
                              onClick={() => handleView(item._id)}
                            >
                              <RemoveRedEyeOutlinedIcon />
                            </span>
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
                      </>
                    ) : (
                      <></>
                    )
                  )}
              </tbody>
            </table>
          )}

          {isLoading && (
            <div className="d-flex justify-content-center">
              <Spinner size="lg" className="text-center" />
            </div>
          )}
          {data?.invoiceDetails?.filter((item) =>
            pathname.includes("plain")
              ? item.gst_number == "" && item.ure_number == ""
              : item.isGstRegistered | (item.gst_number != "")
          )?.length < 1 && <div className="text-center">No Data</div>}
          {pathname.includes("quotation") &&
            data?.QuotationDetails?.length == 0 ? (
            <div className="text-center">No Data</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
