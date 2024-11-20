/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import BuildChangesAlert from "./BuildChangesAlert";

function DeleteAlertModal(props) {
  
  const handleDelete = async () => {
    try {
      await props.deleteBuildProduct(props.productId);
    } catch (error) {
      // console.log(error);
    }
  };

  const [buidChangesAlert, setBuildChangesAlert] = useState(false);
  const handleDeleteSoldProduct = async (buildChanges) => {
    try {
      await props.deleteBuildProduct({ id: props.productId, buildChanges });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (props.isSuccess) {
      toast.success(props.data?.message);
      props.setShow(false);
      setBuildChangesAlert(false);
    } else if (props.isError) {
      toast.error(props.error?.data.message);
    }
  }, [props.isSuccess, props.isError, props.data?.message]);

  return (
    <>
      <BuildChangesAlert
        show={buidChangesAlert}
        onHide={() => setBuildChangesAlert(false)}
        handleDelete={handleDeleteSoldProduct}
      />
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center my-4  fs-5">
            Are you sure want to delete
          </div>

          {props.heading?.includes("Sold") ? (
            <button
              className="btn btn-bg"
              onClick={() => setBuildChangesAlert(true)}
            >
              Yes
            </button>
          ) : (
            <button className="btn btn-bg" onClick={handleDelete}>
              Yes
            </button>
          )}

          <button
            className="btn btn-bg mx-2"
            onClick={() => props.setShow(false)}
          >
            No
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteAlertModal;
