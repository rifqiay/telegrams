import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editUserName } from "../../config/actions/UpdateAction";
import { useDispatch } from "react-redux";

function EditUsername({ children, username, idUser, setEdit }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    shortname: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(editUserName(idUser, data, setEdit, handleClose, setLoading));
  };

  return (
    <>
      <h6 onClick={handleShow}>{children}</h6>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            name="shortname"
            defaultValue={username}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <div className="w-25 text-center">
              <Button variant="primary w-100" onClick={handleSubmit}>
                <span
                  className="spinner-border text-light spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            </div>
          ) : (
            <div className="w-25 text-center">
              <Button variant="primary w-100" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUsername;
