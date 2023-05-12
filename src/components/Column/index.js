import React from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import Tarjeta from '../Tarjeta';
import { CgColorPicker } from 'react-icons/cg';
import { FaFolderPlus } from 'react-icons/fa';
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

      <Container>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h2 style={{marginRight: '10px'}}>
            {props.name}
          </h2>
          <div onClick={handleShowPicker} style={{width: '25px', height: '25px', backgroundColor: selectedColor}}></div>
          <CgColorPicker onClick={handleShowPicker} style={{fontSize: '30px', marginRight: '5px'}} />
        </div>
      </Container>

      <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione un color</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalContent'>
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

      <Container>
        <Row>
          <Form style={{ width: '90%' }}>
            <Form.Group controlId="formDescripcion">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la descripción de la tarjeta"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  style={{ marginRight: '10px'}}
                />
                <FaFolderPlus 
                  variant="primary" 
                  onClick={handleCrearTarjeta}> 
                  size={80}
                  style={{ fontSize: '60px', marginLeft: '10px' }}
                </FaFolderPlus>
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Container>
      
      <Container style={{ maxHeight: '90vh' }}>
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
