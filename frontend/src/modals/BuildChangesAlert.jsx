/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";

function BuildChangesAlert(props) {
  return (
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
          Keep Chages in build product
        </div>

        <button className="btn btn-bg" onClick={() => props.handleDelete(true)}>
          Yes
        </button>
        <button
          className="btn btn-bg mx-2"
          onClick={() => props.handleDelete(false)}
        >
          No
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default BuildChangesAlert;
