/* eslint-disable react/prop-types */

import Modal from "react-bootstrap/Modal";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { ToWords } from "to-words";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Spinner from "react-bootstrap/esm/Spinner";
import moment from "moment";

function InvoiceModal(props) {
  const { branch } = useParams();

  const toWords = new ToWords();

  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef(null);

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "@page { size: auto; margin: 15mm 10mm 10mm 10mm; }",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const billDetails = props?.data?.bill[0];
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(props?.path, { state: { id: props.id } });
  };

  const emptyRowArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Generate the PDF from the element
  const generatePdf = async () => {
    const element = printRef.current;

    // Capture the HTML element as a canvas
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // Create a new jsPDF instance
    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to the PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Output the PDF as a Blob
    const pdfBlob = pdf.output("blob");
    let pdfFile = new File([pdfBlob], "Invoice.pdf", { type: pdfBlob.type });
    console.log(pdfFile);

    return pdfFile;
  };

  const handleShare = async () => {
    const pdfFile = await generatePdf();

    if (!pdfFile) {
      alert("No PDF file selected");
      return;
    }

    // Check if the Web Share API is available
    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: "Share PDF",
          text: "Check out this PDF!",
        });
        console.log("File shared successfully");
      } catch (error) {
        console.error("Error sharing file:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={printRef} className="invoice-container p-4 pt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="align-self-center w-25 text-center">
                {branch == "branch-1" ? (
                  <img className="invoice-logo" src="/images/Alizba_logo.png" alt="Logo" />
                ) : (
                  <img className="invoice-logo" src="/images/logo2.png" alt="Logo" />
                )}
              </div>
              <div className="text-center seller-info w-50">
                <div>{props.heading}</div>
                <div className="fw-bold fs-4">
                  {branch == "branch-1"
                    ? "ALIZBA WOOD FURNITURE"
                    : "KSN FURNITURE"}
                </div>
                <div style={{ fontSize: 14 }}>
                  H.NO.2465/D/1 EKTA NAGAR, SHIV NAGAR WANJRA LAYOUT,
                  PILINADI, NAGPUR-440026
                </div>
                <div className="fw-bold">GSTIN/UIN: 27CJDPM0861R1ZN</div>
              </div>
              <div className="align-self-center w-25 text-center">
                {branch == "branch-1" ? (
                  <img className="invoice-logo" src="/images/Alizba_logo.png" alt="Logo" />
                ) : (
                  <img className="invoice-logo" src="/images/logo2.png" alt="Logo" />
                )}
              </div>
            </div>
            <table
              className={` ${branch == "branch-2"
                ? "invoice-table invoice-ksn w-100 mt-3"
                : "invoice-table w-100 mt-3"
                }  `}
            >
              <thead>
                {branch == "branch-1" ? (
                  <></>
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center  fw-bold bg-primary"
                    >
                      MAHARASHTRA
                    </td>
                  </tr>
                )}

                {branch == "branch-1" ? (
                  <tr>
                    <td colSpan={2}>
                      <div className="fw-bold">
                        Bill to: <br /> {billDetails?.name}
                      </div>
                      <div>{billDetails?.address}</div>
                      <div>{billDetails?.state}</div>

                      <div className="fw-bold">
                        {billDetails?.ure_number &&
                          `URP/PAN No.: ${billDetails?.ure_number}`}
                      </div>
                    </td>
                    <td colSpan={2}>
                      <div className="fw-bold">
                        Place of Supply: <br /> {billDetails?.name}
                      </div>
                      <div>{billDetails?.address}</div>
                    </td>
                    {props.heading.includes("INVOICE") && (
                      <td>
                        <div className="fw-bold">Invoice No:</div>
                        <div className="fw-bold">Date : </div>
                      </td>


                    )}

                    {props.heading.includes("INVOICE") && (
                      <td>
                        <div className="fw-bold">
                          INV-{billDetails?.invoice_number}
                        </div>
                        <div className="fw-bold">
                          {moment(billDetails?.date).format("ll")}
                        </div>
                      </td>
                    )}

                    <td colSpan={3} className="">


                      {billDetails?.transporter_name && (
                        <div className="fw-bold">Transporter: {billDetails?.transporter_name}</div>
                      )}
                      {billDetails?.vehicle_number && (
                        <div className="fw-bold">Vehicle No: {billDetails?.vehicle_number}</div>
                      )}

                      {/* <div>Mode of Payment: Credit</div> */}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="fw-bold">{`Customer's Details`}</div>
                      <div className="fw-bold">NAME: {billDetails?.name}</div>
                      <div className="fw-bold">
                        ADDRESS: {billDetails?.address}
                      </div>
                      <div className="fw-bold">
                        STATE: {billDetails?.state}
                      </div>
                      <div className="fw-bold">
                        {billDetails?.gst_number &&
                          `GSTIN: ${billDetails?.gst_number}`}
                      </div>
                      <div className="fw-bold">
                        {billDetails?.ure_number &&
                          `URP/PAN No.: ${billDetails?.ure_number}`}
                      </div>
                    </td>
                    <td colSpan={4} className="">
                      <div className="fw-bold">
                        Invoice No.: INV-{billDetails?.invoice_number}
                      </div>
                      <div className="fw-bold">
                        Date: {moment(billDetails?.date).format("ll")}
                      </div>

                      {billDetails?.transporter_name && (
                        <div className="fw-bold">Transporter: {billDetails?.transporter_name}</div>
                      )}
                      {billDetails?.vehicle_number && (
                        <div className="fw-bold">Vehicle No: {billDetails?.vehicle_number}</div>
                      )}
                      <div className="fw-bold">
                        Payment Mode: {billDetails?.payment_mode}
                      </div>

                      {/* <div>Mode of Payment: Credit</div> */}
                    </td>
                  </tr>
                )}

                {branch == "branch-1" ? (
                  <tr>
                    <td>
                      <div className="fw-bold">
                        {billDetails?.gst_number && `GSTIN:`}
                      </div>
                    </td>
                    <div className="fw-bold">
                      {billDetails?.gst_number && billDetails?.gst_number}
                    </div>
                    <td>
                      <div className="fw-bold">Payment Mode:</div>
                    </td>
                    <td>
                      <div className="fw-bold">
                        {billDetails?.payment_mode}
                      </div>
                    </td>

                    {props.heading.includes("INVOICE") ? (
                      <td colSpan={2}>
                        <div className="fw-bold">Sales Type :</div>
                      </td>
                    ) : (
                      <td colSpan={2}></td>
                    )}

                    {props.heading.includes("INVOICE") && (
                      <td colSpan={2}>
                        <div className="fw-bold">State Sale</div>
                      </td>
                    )}
                  </tr>
                ) : (
                  <></>
                )}
                <tr className={branch != "branch-1" ? "bg-primary" : ""}>
                  <th>Sr No.</th>
                  <th>Item Description</th>
                  {props.heading.includes("INVOICE") && <th>HSN Code</th>}
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Units</th>
                  {billDetails?.gst_number || billDetails?.ure_number ? (
                    <th>Tax Rate</th>
                  ) : null}
                  <th>Gross Amount</th>
                </tr>
              </thead>
              <tbody>
                {billDetails?.products?.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.product_name}</td>
                    {props.heading.includes("INVOICE") && (
                      <td>{item.hsn_code}</td>
                    )}
                    <td className="text-end">{item.qty} pcs</td>
                    <td className="text-end">{item.price}</td>
                    <td className="text-end">pcs</td>
                    {billDetails?.gst_number || billDetails?.ure_number ? (
                      <td className="text-end">18%</td>
                    ) : null}
                    <td className="text-end">
                      {billDetails?.gst_number || billDetails?.ure_number
                        ? ((item.qty * item.price) / 1.18).toFixed(2)
                        : item.qty * item.price}
                    </td>
                  </tr>
                ))}

                {emptyRowArr
                  .slice(billDetails?.products?.length)
                  .map((item) => (
                    <tr key={item} height={"25px"}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                      {props.heading.includes("INVOICE") && <td></td>}

                      {billDetails?.gst_number || billDetails?.ure_number ? (
                        <td></td>
                      ) : null}
                    </tr>
                  ))}

                {branch == "branch-1" ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="fw-bold ">TOTAL :</div>
                    </td>

                    <td colSpan={4}>
                      <div className="text-end fw-bold">
                        {billDetails?.products
                          ?.reduce(
                            (acc, curr) =>
                            (acc +=
                              billDetails?.gst_number || billDetails?.ure_number
                                ? (curr.qty * curr.price) / 1.18
                                : curr.qty * curr.price),
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                {branch == "branch-1" ? (
                  <tr>
                    <td colSpan={4}>
                      <dl>
                        <dt>Terms & Condition:</dt>
                        <dd>
                          INTREST WILL BE CHARGED AT 24% ANNUM IF THE BILL IS
                          NOT PAID <br />
                          WHITHIN 15 DAYS. <br />
                          WE DECLARE THAT THIS INVOICE SHOWS THE ACTUAL PRICE
                          OF THE <br />
                          GOODS DESCRIBED AND THAT PARTICULARS ARE TRUE AND
                          CORRECT <br />
                          Subject to NAGPUR Juridiction
                        </dd>
                      </dl>
                    </td>
                    <td colSpan={5} className="align-text-top m-0">
                      {billDetails?.gst_number || billDetails?.ure_number ? (
                        <div>
                          <div className="d-flex justify-content-between ">
                            <div className="fw-bold">
                              TOTAL AMOUNT BEFORE TAX
                            </div>
                            <div className="fw-bold ">
                              {billDetails?.products
                                ?.reduce(
                                  (acc, curr) =>
                                    (acc += (curr.qty * curr.price) / 1.18),
                                  0
                                )
                                .toFixed(2)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="fw-bold">CGST</div>
                            <div className="fw-bold">
                              {billDetails?.state == "Maharashtra" &&
                                billDetails?.products
                                  ?.reduce(
                                    (acc, curr) =>
                                      (acc += ((curr.qty * curr.price) / 1.18) * 0.09),
                                    0
                                  )
                                  .toFixed(2)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="fw-bold">SGST</div>
                            <div className="fw-bold">
                              {billDetails?.state == "Maharashtra" &&
                                billDetails?.products
                                  ?.reduce(
                                    (acc, curr) =>
                                      (acc += ((curr.qty * curr.price) / 1.18) * 0.09),
                                    0
                                  )
                                  .toFixed(2)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="fw-bold">IGST</div>
                            <div className="fw-bold">
                              {billDetails?.state != "Maharashtra" &&
                                billDetails?.products
                                  ?.reduce(
                                    (acc, curr) =>
                                      (acc += ((curr.qty * curr.price) / 1.18) * 0.18),
                                    0
                                  )
                                  .toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="d-flex justify-content-between border border-dark ">
                        <div className="fw-bold">TOTAL TAX AMOUNT</div>
                        <div className="fw-bold ">
                          {billDetails?.gst_number || billDetails?.ure_number
                            ? billDetails?.products
                              ?.reduce(
                                (acc, curr) =>
                                  (acc += ((curr.qty * curr.price) / 1.18) * 0.18),
                                0
                              )
                              .toFixed(2)
                            : "0.00"}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between border border-dark ">
                        <div className="fw-bold">TOTAL AMOUNT AFTER TAX</div>
                        <div className="fw-bold ">
                          {billDetails?.products
                            ?.reduce(
                              (acc, curr) => (acc += curr.qty * curr.price),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      {/* {props.heading?.includes("INVOICE") && (
                          <div>
                            <div className="d-flex justify-content-between border border-dark ">
                              <div className="fw-bold">PAID AMOUNT</div>
                              <div className="fw-bold ">
                                {billDetails?.paid_amount}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between border border-dark">
                              <div className="fw-bold">BALANCE AMOUNT</div>
                              <div className="fw-bold ">
                                {billDetails?.products?.reduce(
                                  (acc, curr) => (acc += curr.qty * curr.price * 0.82 * 1.18),
                                  0
                                ) - billDetails?.paid_amount}
                              </div>
                            </div>
                          </div>
                        */}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="fw-bold ">Amount in Words:</div>
                      <div className="text-center fw-bold">
                        {billDetails &&
                          toWords.convert(
                            Math.round(
                              billDetails?.products?.reduce(
                                (acc, curr) => (acc += curr.qty * curr.price),
                                0
                              ) || 0
                            )
                          )}
                      </div>
                    </td>
                    <td colSpan={4} rowSpan={2} className="align-text-top">
                      {billDetails?.gst_number || billDetails?.ure_number ? (
                        <div>
                          {/* Amount Before Tax = sum of gross amounts (each = qty × rate / 1.18) */}
                      <div className="d-flex justify-content-between ">
                        <div className="fw-bold">AMOUNT BEFORE TAX</div>
                        <div className="fw-bold ">
                          {billDetails?.products
                            ?.reduce(
                              (acc, curr) =>
                                (acc += (curr.qty * curr.price) / 1.18),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      {/* CGST @ 9% applied on Amount Before Tax (Maharashtra only) */}
                      <div className="d-flex justify-content-between">
                        <div className="fw-bold">CGST @ 9%</div>
                        <div className="fw-bold">
                          {billDetails?.state == "Maharashtra" &&
                            billDetails?.products
                              ?.reduce(
                                (acc, curr) =>
                                  (acc += ((curr.qty * curr.price) / 1.18) * 0.09),
                                0
                              )
                              .toFixed(2)}
                        </div>
                      </div>
                      {/* SGST @ 9% applied on Amount Before Tax (Maharashtra only) */}
                      <div className="d-flex justify-content-between">
                        <div className="fw-bold">SGST @ 9%</div>
                        <div className="fw-bold">
                          {billDetails?.state == "Maharashtra" &&
                            billDetails?.products
                              ?.reduce(
                                (acc, curr) =>
                                  (acc += ((curr.qty * curr.price) / 1.18) * 0.09),
                                0
                              )
                              .toFixed(2)}
                        </div>
                      </div>
                      {/* IGST @ 18% applied on Amount Before Tax (non-Maharashtra only) */}
                      <div className="d-flex justify-content-between">
                        <div className="fw-bold">IGST @ 18%</div>
                        <div className="fw-bold">
                          {billDetails?.state != "Maharashtra" &&
                            billDetails?.products
                              ?.reduce(
                                (acc, curr) =>
                                  (acc += ((curr.qty * curr.price) / 1.18) * 0.18),
                                0
                              )
                              .toFixed(2)}
                        </div>
                      </div>
                    </div>
                      ) : null}
                    {/* Grand Total = Amount Before Tax + CGST + SGST = sum(qty * price) */}
                    <div className="d-flex justify-content-between border border-dark  bg-primary">
                      <div className="fw-bold">GRAND TOTAL</div>
                      <div className="fw-bold ">
                        {billDetails?.products
                          ?.reduce(
                            (acc, curr) => (acc += curr.qty * curr.price),
                            0
                          )
                          .toFixed(2)}
                      </div>
                    </div>
                    {props.heading?.includes("INVOICE") && (
                      <div>
                        <div className="d-flex justify-content-between border border-dark">
                          <div className="fw-bold">PAID AMOUNT</div>
                          <div className="fw-bold ">
                            {billDetails?.paid_amount}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border border-dark ">
                          <div className="fw-bold">BALANCE AMOUNT</div>
                          <div className="fw-bold ">
                            {(
                              billDetails?.products?.reduce(
                                (acc, curr) => (acc += curr.qty * curr.price),
                                0
                              ) - billDetails?.paid_amount
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  </tr>
                )}

              {branch == "branch-1" ? (
                <tr>
                  <td colSpan={4}>
                    <div className="fw-bold">BANK DETAILS:</div>
                    <div className="fw-bold">
                      NAME OF BANK :{" "}
                      {branch === "branch-1"
                        ? "CANARA BANK"
                        : "BANK OF BARODA"}
                    </div>
                    <div className="fw-bold">
                      A/C NUMBER :{" "}
                      {branch === "branch-1"
                        ? "125002249656"
                        : "76420500000608"}
                    </div>
                    <div className="fw-bold">
                      IFSC CODE :{" "}
                      {branch === "branch-1"
                        ? "CNRB0015267"
                        : "BARB0VJNAMN"}
                    </div>
                    <div className="fw-bold">
                      {branch === "branch-1"
                        ? "BRANCH : KAMPTEE"
                        : "BANK DETAILS: MOHAN NAGER"}
                    </div>
                  </td>
                  <td
                    colSpan={5}
                    className="align-bottom text-center fw-bold"
                  >
                    <div className="display-6">Alizba Wood Furniture</div>
                    <div className="display-6">Authorised Signatory</div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="fw-bold">BANK DETAILS:</div>
                    <div className="fw-bold">
                      NAME OF BANK :{" "}
                      {branch === "branch-1"
                        ? "CANARA BANK"
                        : "BANK OF BARODA"}
                    </div>
                    <div className="fw-bold">
                      A/C NUMBER :{" "}
                      {branch === "branch-1"
                        ? "125002249656"
                        : "76420500000608"}
                    </div>
                    <div className="fw-bold">
                      IFSC CODE :{" "}
                      {branch === "branch-1"
                        ? "CNRB0015267"
                        : "BARB0VJNAMN"}
                    </div>
                    <div className="fw-bold">
                      {branch === "branch-1"
                        ? "BRANCH : KAMPTEE"
                        : "BANK DETAILS: MOHAN NAGER"}
                    </div>
                  </td>
                </tr>
              )}

              {branch == "branch-1" ? (
                <></>
              ) : (
                <tr>
                  <td colSpan={4}>
                    <dl>
                      <dt>Terms & Condition:</dt>
                      <dd>
                        INTREST WILL BE CHARGED AT 24% ANNUM IF THE BILL IS
                        NOT PAID <br />
                        WHITHIN 15 DAYS. <br />
                        WE DECLARE THAT THIS INVOICE SHOWS THE ACTUAL PRICE
                        OF THE <br />
                        GOODS DESCRIBED AND THAT PARTICULARS ARE TRUE AND
                        CORRECT <br />
                        Subject to NAGPUR Juridiction
                      </dd>
                    </dl>
                  </td>
                  <td
                    colSpan={4}
                    className="align-bottom text-center fw-bold"
                  >
                    Authorised Signature
                  </td>
                </tr>
              )}

              {branch == "branch-1" ? (
                <tr>
                  <td colSpan={8}>
                    <div className="text-center fw-bold">
                      Amount in Words:{" "}
                      {billDetails &&
                        toWords.convert(
                          Math.round(
                            billDetails?.products?.reduce(
                              (acc, curr) => (acc += curr.qty * curr.price),
                              0
                            ) || 0
                          )
                        )}
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    {" "}
                    <div>This is computer generated invoice</div>
                  </td>
                </tr>
              )}

              {/* =======
                  {emptyRowArr.slice(billDetails?.products?.length).map((item)=>
                  <tr key={item} height={"25px"}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {billDetails?.gst_number || billDetails?.ure_number ?
                    <td></td>:null}
                      {props.heading.includes('INVOICE') &&
                      <td></td>
                      }
                  </tr>)}
              
                
                 <tr>
                   <td colSpan={4}>
                     <div className="fw-bold ">Amount in Words:</div>
                     <div className="text-center fw-bold">
                     {billDetails &&
                       toWords.convert(
                         billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price,0)
                       )}
                     </div>
                   </td>
                   <td colSpan={5} rowSpan={2} className="align-text-top" >
                     {billDetails?.gst_number || billDetails?.ure_number ?
                     <div>
                     <div className="d-flex justify-content-between ">
                     <div className="fw-bold">AMOUNT BEFORE TAX</div>
                     <div className="fw-bold ">{billDetails?.products?.reduce((acc,curr)=>acc+= curr.qty*curr.price-curr.qty*curr.price*0.18,0)}</div>
                     </div>
                     <div className="d-flex justify-content-between">
                     <div className="fw-bold">CGST</div>
                     <div className="fw-bold">{billDetails?.state=='Maharashtra' && billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price*0.09,0)}</div>
                     </div>
                     <div className="d-flex justify-content-between">
                     <div className="fw-bold">SGST</div>
                     <div className="fw-bold">{billDetails?.state=='Maharashtra' && billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price*0.09,0)}</div>
                     </div>
                     <div className="d-flex justify-content-between">
                     <div className="fw-bold">IGST</div>
                     <div className="fw-bold">{billDetails?.state!='Maharashtra' && billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price*0.18,0)}</div>
                     </div>
                     </div>:null
                     }
                     <div className="d-flex justify-content-between border border-dark ">
                     <div className="fw-bold">GRAND TOTAL</div>
                     <div className="fw-bold ">{billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price,0)}</div>
                     </div>
                     {props.heading?.includes('INVOICE') && <div>
                     <div className="d-flex justify-content-between border border-dark bg-success">
                     <div className="fw-bold">PAID AMOUNT</div>
                     <div className="fw-bold ">{billDetails?.paid_amount}</div>
                     </div>
                     <div className="d-flex justify-content-between border border-dark bg-warning">
                     <div className="fw-bold">BALANCE AMOUNT</div>
                     <div className="fw-bold ">{billDetails?.products?.reduce((acc,curr)=>acc+=curr.qty*curr.price,0)-billDetails?.paid_amount}</div>
                     </div>
                     </div> }
                   </td>
                 </tr>
                 <tr>
                   <td colSpan={4}>
                     <div className="fw-bold">BANK DETAILS:</div>
                     <div className="fw-bold">
                       NAME OF BANK : BANK OF BARODA{" "}
                     </div>
                     <div className="fw-bold">
                       A/C NUMBER : 76420500000608{" "}
                     </div>
                     <div className="fw-bold">IFSC CODE : BARB0VJNAMN</div>
                     <div className="fw-bold">BANK DETAILS:MOHAN NAGER</div>
                   </td>
               
                 </tr>
                 <tr>
                   <td colSpan={ 5}>
                     <dl>
                       <dt>Terms & Condition:</dt>
                       <dd>
                         INTREST WILL BE CHARGED AT 24% ANNUM IF THE BILL IS
                         NOT PAID <br />
                         WHITHIN 15 DAYS. <br />
                         WE DECLARE THAT THIS INVOICE SHOWS THE ACTUAL PRICE OF
                         THE <br />
                         GOODS DESCRIBED AND THAT PARTICULARS ARE TRUE AND
                         CORRECT <br />
                         Subject to NAGPUR Juridiction
                       </dd>
                     </dl>
                   </td>
                   <td colSpan={4} className="align-bottom text-center fw-bold">Authorised Signature</td>
                 </tr>
                 <tr>
                  
                   <td colSpan={8} className="text-center"> <div>This is computer generated invoice</div></td>
                 </tr>
             */}

              {/* <tr>
                    <td></td>
                    <td className="text-center">Total</td>
                    <td className="text-end">
                      {billDetails?.products?.reduce(
                        (acc, curr) => (acc += curr.qty),
                        0
                      )}{" "}
                      pcs
                    </td>
                    <td className="text-end"></td>
                    <td className="text-end">
                      {billDetails?.products?.reduce(
                        (acc, curr) => (acc += curr.qty * curr.price),
                        0
                      )}
                    </td>
                  </tr> */}
            </tbody>
          </table>

          {/* <table className="invoice-table-footer w-100">
                <tfoot>
                  <tr>
                    <td rowSpan={2}>Taxble value</td>
                    <td colSpan={2} className="text-center">
                      Central Tax
                    </td>
                    <td colSpan={2} className="text-center">
                      {" "}
                      Sate Tax
                    </td>
                    <td rowSpan={2}>Total Tax Amount</td>
                    <td rowSpan={billDetails?.products?.length + 3}>
                      <tr>Total Amount Before Tax</tr>
                      <tr>CGST</tr>
                      <tr>SGST</tr>
                    </td>
                    <td rowSpan={billDetails?.products?.length + 3}>
                      <tr className="text-end">
                        {billDetails?.products?.reduce(
                          (acc, curr) => (acc += curr.qty * curr.price),
                          0
                        )}
                      </tr>
                      <tr className="text-end">
                        {" "}
                        {billDetails?.products?.reduce(
                          (acc, curr) =>
                            (acc += (curr.qty * curr.price * 2.5) / 100),
                          0
                        )}
                      </tr>
                      <tr className="text-end">
                        {" "}
                        {billDetails?.products?.reduce(
                          (acc, curr) =>
                            (acc += (curr.qty * curr.price * 2.5) / 100),
                          0
                        )}
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td>Rate</td>
                    <td>Amount</td>
                    <td>Rate</td>
                    <td>Amount</td>
                  </tr>
                  {billDetails?.products?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.qty * item.price}</td>
                      <td>2.50%</td>
                      <td>{(item.qty * item.price * 2.5) / 100}</td>
                      <td>2.50%</td>
                      <td>{(item.qty * item.price * 2.5) / 100}</td>
                      <td>{(2 * (item.qty * item.price * 2.5)) / 100}</td>
                    </tr>
                  ))}

                  <tr>
                    <td className="">
                      {billDetails?.products?.reduce(
                        (acc, curr) => (acc += curr.qty * curr.price),
                        0
                      )}
                    </td>
                    <td></td>
                    <td>
                      {billDetails?.products?.reduce(
                        (acc, curr) =>
                          (acc += (curr.qty * curr.price * 2.5) / 100),
                        0
                      )}
                    </td>
                    <td></td>
                    <td>
                      {billDetails?.products?.reduce(
                        (acc, curr) =>
                          (acc += (curr.qty * curr.price * 2.5) / 100),
                        0
                      )}
                    </td>
                    <td>
                      {billDetails?.products?.reduce(
                        (acc, curr) =>
                          (acc += (2 * (curr.qty * curr.price * 2.5)) / 100),
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="fw-bold">
                      Amount In Words :
                      {billDetails &&
                        toWords.convert(
                          billDetails?.products?.reduce(
                            (acc, curr) =>
                              (acc +=
                                (2 * (curr.qty * curr.price * 2.5)) / 100),
                            0
                          ) +
                            billDetails?.products?.reduce(
                              (acc, curr) => (acc += curr.qty * curr.price),
                              0
                            )
                        )}
                    </td>
                    <td className="fw-bold text-end">Invoice Total</td>
                    <td className="fw-bold text-end">
                      {billDetails?.products?.reduce(
                        (acc, curr) =>
                          (acc += (2 * (curr.qty * curr.price * 2.5)) / 100),
                        0
                      ) +
                        billDetails?.products?.reduce(
                          (acc, curr) => (acc += curr.qty * curr.price),
                          0
                        )}
                    </td>
                  </tr>
                </tfoot>
              </table> */}
        </div>
        <button className="btn btn-bg mx-2" onClick={handlePrint}>
          {isPrinting ? <Spinner size="sm" /> : "Print"}
        </button>
        <button className="btn btn-bg mx-2" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-bg mx-2" onClick={handleShare}>
          Share
        </button>
      </Modal.Body>
    </Modal >
    </>
  );
}

export default InvoiceModal;
