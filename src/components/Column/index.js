import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Tarjeta from '../Tarjeta';
import { CgColorPicker } from 'react-icons/cg';
import './styles.css';
import { useState } from 'react';

function Column(props) {
  const [descripcion, setDescripcion] = useState('');

  const handleCrearTarjeta = () => {
    if (descripcion) {
      props.crearTarjeta(props.id, descripcion);
      setDescripcion('');
    }else{
      alert('Ingrese la descripción de la tarjeta');
    }
  };

  return (
    <Col className="columna" style={{ margin: 10 }}>
      <h2>{props.name}<CgColorPicker/></h2>

      <Row style={{ height: '10%' }}>
        <Form style={{ width: '100%' }}>
          <Form.Group controlId="formDescripcion">
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción de la tarjeta"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <Button variant="primary" onClick={handleCrearTarjeta}>
              Crear tarjeta
            </Button>
          </Form.Group>
        </Form>
      </Row>
      
      <Container style={{ maxHeight: '100vh' }}>
        {props.tarjetas.map(tarjeta => (
          <Tarjeta 
            key={tarjeta._id}
            id={tarjeta._id}
            tarjeta={tarjeta} 
            color={props.color} 
            eliminarTarjeta={props.eliminarTarjeta}
            actualizarTarjeta={props.actualizarTarjeta}  
          />
        ))}
      </Container>
    </Col>
  );
}

export default Column;
