import { useGetDashboardQuery } from "../../api/productApi";
import { useParams } from "react-router-dom";
import BuildProduct from "../../../public/images/build_product.png";
import RawMaterial from "../../../public/images/raw_materials.png";
import SoldProducts from "../../../public/images/sold_product.png";
import Invoice from "../../../public/images/invoice.png";
import TotalSales from "../../../public/images/total_sales.png";
import TotalExpenses from "../../../public/images/total_expenses.png";

// eslint-disable-next-line react/prop-types
function DashBoard({ title }) {
  const { branch } = useParams();
  const { data } = useGetDashboardQuery(branch);

  const total_sales_amount = data?.billing
    ?.map((items) => items.products)
    ?.flat(2)
    .reduce((acc, curr) => (acc += curr.price * curr.qty), 0);
   
  const total_expense_amount = data?.rowMaterials?.reduce(
    (acc, curr) =>
      (acc +=
        curr.price * curr.qty == null || curr.qty == undefined || curr.qty == ""
          ? 1
          : curr.qty),
    0
  );

  return (
    <div className="main-content-container list-container">
      <div className="main-content">
        <div className="product-heading">
          <h1 className="fs-3">{title}</h1>
        </div>

        <div className="d-flex flex-wrap justify-content-between  mt-4">
          {/* #1 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex flex-wrap align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={BuildProduct} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Build Products</div>
                <div className="fw-bold fs-3 ">
                  {data?.build_product_counts}
                </div>
              </div>
            </div>
          </div>

          {/* #2 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex flex-wrap align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={SoldProducts} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Sold Products</div>
                <div className="fw-bold fs-3 ">{data?.sold_product_counts}</div>
              </div>
            </div>
          </div>

          {/* #3 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={RawMaterial} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Raw Materials</div>
                <div className="fw-bold fs-3 ">
                  {data?.raw_materials_counts}
                </div>
              </div>
            </div>
          </div>

          {/* #4 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={Invoice} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Sales Invoice</div>
                <div className="fw-bold fs-3 ">{data?.invoice_counts}</div>
              </div>
            </div>
          </div>

          {/* #5 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={TotalSales} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Total Sales Amount</div>
                <div className="fw-bold fs-3 ">₹ {total_sales_amount}</div>
              </div>
            </div>
          </div>

          {/* #6 */}

          <div className=" dashboard-card build-card py-3 px-2 w-25">
            <div className="d-flex align-items-center dashboard-text build-card py-3 px-4">
              <img className="w-50" src={TotalExpenses} alt="" />
              <div className="ps-3">
                <div className="fw-bold fs-5 ">Total Expense Amount</div>
                <div className="fw-bold fs-3 ">₹ {total_expense_amount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
