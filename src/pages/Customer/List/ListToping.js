import { React } from "react";
import { Card } from "react-bootstrap";

const ListToping = ({ ...props }) => {
  const { id, name, image } = props.topping;
  return (
    <Card border="white" className="my-1">
      <Card.Body>
        <label className="block-check">
          <img
            src={image}
            alt={name}
            className="img-topping"
            style={{ height: "85px", widht: "75px" }}
          />
          <input
            type="checkbox"
            id={id}
            className="form-check-input rounded-pill me-1 position-absolute absolute"
            onChange={props.onChange}
            checked={props.checked}
          />
          <span className="checkmark"></span>
        </label>
      </Card.Body>
      <Card.Text
        className="fw-normal text-center text-nowrap text-overide"
        style={{ fontSize: ".9rem" }}
      >
        <span>{name}</span>
      </Card.Text>
    </Card>
  );
};

export default ListToping;
