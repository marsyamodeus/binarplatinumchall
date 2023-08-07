import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Image, Nav, Card } from "react-bootstrap";
import { BiUser, BiTimeFive, BiTrashAlt, BiSolidEdit } from "react-icons/bi";
import "./carscard.css";

export default function Carscard({
  carname,
  carsize,
  carimage,
  carprice,
  cardetail,
  carupdate,
  caredit,
  cardelete,
}) {
  let sizeConvert;

  return (
    <>
      <Card className="cardcont">
        <div className="cardimgcont">
          <Card.Img className="cardimg" variant="top" src={carimage} />
        </div>
        <Card.Body>
          <Card.Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            {carname}
          </Card.Text>
          <Card.Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            Rp {carprice.toLocaleString("id-ID")} /hari
          </Card.Text>
          <Card.Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            <BiUser size={14} />{" "}
            {(() => {
              if (carsize === "small") {
                return " 2-4 people";
              } else if (carsize === "medium") {
                return " 4-6 people";
              } else if (carsize === "large") {
                return " 6-8 people";
              }
            })()}
          </Card.Text>
          <Card.Text
            style={{
              color: "#000",
              fontFamily: "Arial",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            <BiTimeFive size={14} /> Updated At{" "}
            {Date(carupdate).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Card.Text>
          <Row>
            <div className="d-flex justify-content-between">
              <Button
                className="delbutt"
                variant="outline-danger"
                onClick={cardelete}
              >
                <BiTrashAlt size={14} />
                Delete
              </Button>

              <Button className="editbutt" onClick={caredit}>
                <BiSolidEdit size={14} />
                Edit
              </Button>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
