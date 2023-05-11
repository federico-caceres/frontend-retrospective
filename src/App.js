import React from 'react';
import { getCategories, getCards, createCard, deleteCard, updateCard } from './services'
import Column from './components/Column';
import Tarjeta from './components/Tarjeta';
import { Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() 
{
  const [categories, setCategories] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    try{
      async function fetchData() {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const cardsData = await getCards();
        setTarjetas(cardsData);        
      }
      fetchData();
    }catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateCard = async (categoryId, description) => {
    try {
      const newCard = await createCard(categoryId, description);
      setTarjetas([...tarjetas, newCard]);
      console.log('Nueva tarjeta creada:', newCard);
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      const cardsData = await getCards();
      setTarjetas(cardsData);
      console.log('Tarjeta eliminada:', cardId);
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };

  const handleUpdateCard = async (cardId, description) => {
    try {
      const card = await updateCard(cardId, description);
      const cardsData = await getCards();
      setTarjetas(cardsData);
      console.log('Tarjeta actualizada:', card);
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
    }
  };
  
  return (
    <div style={{ backgroundColor: '#F7F7F7' }}>
      <div className="container-fluid pt-3 principalContainer">
        <div className="row">
          {categories.map(category => {
            const cardsForCategory = tarjetas.filter(card => card.category === category._id);
            return <Column 
                  key={category._id} 
                  id={category._id} 
                  name={category.name} 
                  color={category.color} 
                  tarjetas={cardsForCategory} 
                  crearTarjeta={handleCreateCard} 
                  eliminarTarjeta={handleDeleteCard}
                  actualizarTarjeta={handleUpdateCard}
                  />;
          })}
        </div>
      </div>
    </div>
  );
}


export default App;  