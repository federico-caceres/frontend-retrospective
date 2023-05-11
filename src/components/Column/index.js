import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Tarjeta from '../Tarjeta';
import { FaThumbsUp } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { CgColorPicker } from 'react-icons/cg';
import './styles.css'

function Column(props) {
  return (
    <Col className="columna" style={{ margin: 10 }}>
      <h2>{props.name}<CgColorPicker/></h2>
      
      <Container style={{ maxHeight: '100vh' }}>
        <Button variant="primary">Agregar tarjeta</Button>
        {props.tarjetas.map(tarjeta => (
          <Card key={tarjeta._id} style={{ margin: '10px 0', backgroundColor: props.color }}>
            <Card.Body>
              <Card.Title>{tarjeta.description}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> 
                <Row>
                  <Col>
                    <FaThumbsUp />{tarjeta.likes}
                  </Col>
                  <Col>
                    <BiCommentDetail/>{tarjeta.comments.length}
                  </Col>
                </Row>
              </Card.Subtitle>
              {tarjeta.comments.length > 0 &&
                <>
                  <hr />
                  <Card.Text><strong>Comentarios:</strong></Card.Text>
                  <ul>
                    {tarjeta.comments.map((comment, i) => (
                      <li key={comment._id}>{comment.text}</li>
                    ))}
                  </ul>
                </>
              }
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Col>
  );
}

export default Column;
