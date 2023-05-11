import React from 'react';
import { getCategories, getCards } from './services'
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
  
  return (
    <div style={{ backgroundColor: '#F7F7F7' }}>
      <div className="container-fluid pt-3 principalContainer">
        <div className="row">
          {categories.map(category => {
            const cardsForCategory = tarjetas.filter(card => card.category === category._id);
            return <Column key={category._id} id={category._id} name={category.name} color={category.color} tarjetas={cardsForCategory} />;
          })}
        </div>
      </div>
    </div>
  );
}


export default App;  