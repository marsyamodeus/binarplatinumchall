import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Modal, Button } from "react-bootstrap";
import cardel from '../assets/cardel.png'

export default function Popup({ show, closeButton, deleteButton, modalId }) {
  return (
    <Modal
      show={show}
      onHide={closeButton}
      centered
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        backdropFilter: "blur(1px)",
      }}
    >
      <Modal.Body className="text-center">
        <Image src={cardel} />
        <h3>Menghapus Data Mobil{modalId}</h3>
        <p style={{ fontSize: "18px" }}>
          Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
          menghapus?
        </p>
        <div className="justify-content-around">
          <Button
            className="mx-2"
            style={{ width: "6vw" }}
            variant="outline-danger"
            onClick={closeButton}
          >
            Tidak
          </Button>
          <Button
            className="mx-2"
            style={{ width: "6vw" }}
            variant="danger"
            onClick={deleteButton}
          >
            Ya
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
