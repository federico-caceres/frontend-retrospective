import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { BiEditAlt, BiX } from "react-icons/bi";

function Tarjeta(props) 
{

  const [editandoDescripcion, setEditandoDescripcion] = useState(false);
  const [descripcionCard, setDescripcionCard] = useState(props.tarjeta.description);

  const handleEditarDescripcion = () => {
    setEditandoDescripcion(true);
  };

  const handleCancelarEditarDescripcion = () => {
    setEditandoDescripcion(false);
  };

  const handleGuardarDescripcion = () => {
    props.actualizarTarjeta(props.tarjeta._id, descripcionCard);
    setEditandoDescripcion(false);
  };

  const handleInputChange = (event) => {
    setDescripcionCard(event.target.value);
  };

  const handleEliminarTarjeta = (cardId) => {
    props.eliminarTarjeta(cardId);
  };

  return (
    <div>
        <Card key={props.tarjeta._id} style={{ margin: '10px 0', backgroundColor: props.color }}>
          <Card.Body>

          {editandoDescripcion ? (
            <Form>
              <Form.Group>
                <Form.Control type="text" value={descripcionCard} onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" onClick={handleGuardarDescripcion}>Guardar</Button>
              <Button variant="secondary" onClick={handleCancelarEditarDescripcion}>Cancelar</Button>
            </Form>
          ) : (
            <>
              <Card.Title>{props.tarjeta.description}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> 
                <Row>
                  <Col>
                    <FaThumbsUp className='mx-2' />{props.tarjeta.likes}
                  </Col>
                  <Col>
                    <BiCommentDetail className='mx-2'/>{props.tarjeta.comments.length}
                  </Col>
                  <Col>
                  <BiEditAlt onClick={handleEditarDescripcion} />
                  </Col>
                  <Col>
                    <BiX onClick={() => handleEliminarTarjeta(props.tarjeta._id)}/>
                  </Col>
                </Row>
              </Card.Subtitle>
              {props.tarjeta.comments.length > 0 &&
                <>
                  <hr />
                  <Card.Text><strong>Comentarios:</strong></Card.Text>
                  <ul>
                    {props.tarjeta.comments.map((comment, i) => (
                      <li key={comment._id}>{comment.text}</li>
                    ))}
                  </ul>
                </>
              }
            
            </>
          )}

          </Card.Body>
        </Card>
    </div>
  );
}

export default Tarjeta;
