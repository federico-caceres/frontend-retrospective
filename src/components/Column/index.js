import React from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import Tarjeta from '../Tarjeta';
import { CgColorPicker } from 'react-icons/cg';
import './styles.css';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

function Column(props) {
  const [descripcion, setDescripcion] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(props.color);

  const handleCrearTarjeta = () => {
    if (descripcion) {
      props.crearTarjeta(props.id, descripcion);
      setDescripcion('');
    }else{
      alert('Ingrese la descripción de la tarjeta');
    }
  };

  const handleShowPicker = () => {
    setShowColorPicker(true);
  };

  const handleUpdateCategory = (color) => {
    console.log(color);
    props.actualizarCategoria(props.id, color);
    setShowColorPicker(false);
  };

  return (
    <Col className="columna" style={{ margin: 10 }}>
      <h2>
        {props.name}
        <CgColorPicker onClick={handleShowPicker} />
        <div style={{width: '20px', height: '20px', backgroundColor: selectedColor, marginLeft: '10px'}}></div>
      </h2>

      <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione un color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChromePicker
            color={selectedColor}
            onChangeComplete={(color) => setSelectedColor(color.hex)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowColorPicker(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleUpdateCategory(selectedColor)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>


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
            meGustaTarjeta={props.meGustaTarjeta}
          />
        ))}
      </Container>
    </Col>
  );
}

export default Column;
