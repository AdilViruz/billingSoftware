/* eslint-disable react/prop-types */

import Spinner from "react-bootstrap/esm/Spinner";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function PlainPaymentHistory({ title, data, path, isLoading }) {
  const [serachValue, setSearchValue] = useState("");
  const { pathname } = useLocation();

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
            Add Buyers Payment
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
              </tr>
            </thead>

            <tbody>
              <tr className="payment-last-row">
                <td colSpan={2} className="fw-bold">
                  Total Balance Amount
                </td>

                <td></td>

                <td className="fw-bold">
                  {data?.invoiceDetails
                    ?.filter((item) =>
                      item.name
                        ?.toLowerCase()
                        .includes(serachValue?.toLowerCase())
                    )
                    .filter(
                      (item) => item.gst_number == "" && item.ure_number == ""
                    )
                    ?.map((item) => item.products)

                    ?.flat(1)
                    ?.reduce((acc, curr) => (acc += curr.qty * curr.price), 0) -
                    data?.invoiceDetails
                      ?.filter((item) =>
                        item.name
                          ?.toLowerCase()
                          .includes(serachValue?.toLowerCase())
                      )
                      .filter(
                        (item) => item.gst_number == "" && item.ure_number == ""
                      )
                      ?.reduce((acc, curr) => (acc += curr.paid_amount), 0) -
                    data?.invoiceDetails
                      ?.filter((item) =>
                        item.name
                          ?.toLowerCase()
                          .includes(serachValue?.toLowerCase())
                      )
                      .filter(
                        (item) => item.gst_number == "" && item.ure_number == ""
                      )
                      ?.map((item) => item.products)
                      ?.flat(1)
                      ?.filter((item) => item.product_name == "no_product")
                      .length}{" "}
                  Rs
                </td>
                <td></td>
              </tr>
              {data?.invoiceDetails
                ?.filter((item) =>
                  item.name?.toLowerCase().includes(serachValue?.toLowerCase())
                )
                ?.map((item, index) =>
                  item.gst_number == "" && item.ure_number == "" ? (
                    <tr key={item._id} className="product-list-row">
                      {/* <td>{index + 1}</td> */}
                      <td>{item.name}</td>
                      {item?.products?.reduce(
                        (acc, curr) => (acc += curr.qty * curr.price),
                        0
                      ) == 1 ? (
                        <td className="text-success">Balance Paid</td>
                      ) : (
                        <td>
                          {item?.products?.reduce(
                            (acc, curr) => (acc += curr.qty * curr.price),
                            0
                          )}{" "}
                          Rs
                        </td>
                      )}
                      <td>{item.paid_amount} Rs</td>
                      {item?.products?.reduce(
                        (acc, curr) => (acc += curr.qty * curr.price),
                        0
                      ) == 1 ? (
                        <td>
                          {item?.products?.reduce(
                            (acc, curr) => (acc += curr.qty * curr.price),
                            0
                          ) -
                            item.paid_amount -
                            1}{" "}
                          Rs
                        </td>
                      ) : (
                        <td>
                          {item?.products?.reduce(
                            (acc, curr) => (acc += curr.qty * curr.price),
                            0
                          ) - item.paid_amount}{" "}
                          Rs
                        </td>
                      )}
                      <td>{moment(item.date).format("ll")}</td>
                    </tr>
                  ) : (
                    <></>
                  )
                )}
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

export default PlainPaymentHistory;
