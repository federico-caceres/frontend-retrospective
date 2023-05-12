import React from 'react';
import { getCategories, getCards, createCard, deleteCard, updateCard, likeCard, updateCategory } from './services'
import Column from './components/Column';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() 
{
  const [categories, setCategories] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const socket = io.connect(process.env.REACT_APP_API_URL);

  useEffect(() => {
    try{
      async function fetchData() 
      {
        await updateAllData();  
        
        socket.on('connect', () => {
          console.log('Conexión exitosa con el servidor de socket');
        });       
        
        // escuchamos el evento 'updateServer' para saber si hay que actualizar los datos
        socket.on('updateServer', handleUpdate);
      }
      fetchData();
    }catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateCard = async (categoryId, description) => {
    try {
      await createCard(categoryId, description);
      await updateAllData();
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      await updateAllData();
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };

  const handleUpdateCard = async (cardId, description) => {
    try {
      await updateCard(cardId, description);
      await updateAllData();
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
    }
  };

  const handleLikeCard = async (cardId) => {
    try {
      const response = await likeCard(cardId);
      if(response.success)
      {
        await updateAllData();
        socket.emit('updateClient', true);
      }else{
        alert(response.message);
      }
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
    }
  };

  const handleUpdate = async (data) => {
    if(data){
      try {
          await updateAllData();
      } catch (error) {
        console.error('Error al actualizar la datos:', error);
      }
    }
  };

  const handleUpdateCategory = async (categoryId, color) => {
    try {
      await updateCategory(categoryId, color);
      await updateAllData();
      socket.emit('updateClient', true);
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };

  const updateAllData = async () => {
    try {
      const cardsData = await getCards();
      setTarjetas(cardsData);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error al actualizar la datos:', error);
    }
  };

  
  return (
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
                meGustaTarjeta={handleLikeCard}
                actualizarCategoria={handleUpdateCategory}
                className="col"
                />;
        })}
      </div>
    </div>
  );
}


export default App;  