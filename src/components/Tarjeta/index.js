import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Tarjeta(props) {
  return (
    <Card style={{ }}>
      <Card.Body>
        <Card.Title>{props.description}</Card.Title>
        <Card.Text>
          Likes: {props.likes}
        </Card.Text>
        <Button variant="primary">Agregar comentario</Button>
        <ul>
          {props.comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;
