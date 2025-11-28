import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);

  useEffect(() => {
    // 👇 TU LINK DE RENDER AQUÍ (Asegúrate que sea el correcto)
    fetch('https://cucei-food-api.onrender.com/api/restaurantes')
      .then(res => res.json())
      .then(data => setRestaurantes(data))
      .catch(err => console.error("Error cargando datos:", err));
  }, []);

  // Función para abrir el menú
  const verMenu = (restaurante) => {
    setRestauranteSeleccionado(restaurante);
  };

  // Función para cerrar el menú
  const cerrarMenu = () => {
    setRestauranteSeleccionado(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>CUCEI Food 🍔</h1>
        <p>Explora los mejores sabores del campus</p>
      </header>
      
      {restaurantes.length === 0 && <p className="loading">Cargando restaurantes...</p>}

      <div className="grid-restaurantes">
        {restaurantes.map(rest => (
          <div key={rest.id} className="card">
            <div className="card-image-container">
               <img 
                 src={rest.imagen_url} 
                 alt={rest.nombre} 
                 onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Sin+Foto'} 
               />
            </div>
            <div className="card-content">
              <h2>{rest.nombre}</h2>
              <p className="desc">{rest.descripcion}</p>
              <button className="btn-menu" onClick={() => verMenu(rest)}>
                Ver Menú Completo 📜
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VENTANA FLOTANTE (MODAL) */}
      {restauranteSeleccionado && (
        <div className="modal-overlay" onClick={cerrarMenu}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Botón de cerrar (X) */}
            <button className="btn-close" onClick={cerrarMenu}>✖</button>
            
            <h2>{restauranteSeleccionado.nombre}</h2>
            <img src={restauranteSeleccionado.imagen_url} alt="Portada" className="modal-img"/>
            
            <div className="menu-scroll">
              <h3>Menú:</h3>
              <div className="menu-text">
                {restauranteSeleccionado.menu}
              </div>
            </div>
            
            {/* AQUÍ ANTES ESTABA EL BOTÓN VERDE, YA LO QUITAMOS */}

          </div>
        </div>
      )}

    </div>
  )
}

export default App