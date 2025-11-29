import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);

  useEffect(() => {
    // 👇 TU LINK DE RENDER (Verifica que sea el correcto)
    fetch('https://cucei-food-api.onrender.com/api/restaurantes')
      .then(res => res.json())
      .then(data => setRestaurantes(data))
      .catch(err => console.error("Error cargando datos:", err));
  }, []);

  const verMenu = (restaurante) => {
    setRestauranteSeleccionado(restaurante);
  };

  const cerrarMenu = () => {
    setRestauranteSeleccionado(null);
  };

  // --- FUNCIÓN MÁGICA: DETECTOR INTELIGENTE DE MENÚ ---
  const renderizarMenu = (textoMenu) => {
    if (!textoMenu) return null;

    // Dividimos el texto línea por línea
    const lineas = textoMenu.split('\n');

    return lineas.map((linea, index) => {
      const lineaLimpia = linea.trim();
      
      if (!lineaLimpia) return null; // Ignorar líneas vacías

      // SI empieza con guion (-) o punto (•), es un PLATILLO
      if (lineaLimpia.startsWith('-') || lineaLimpia.startsWith('•')) {
        return (
          <div key={index} className="menu-item">
            {lineaLimpia}
          </div>
        );
      } 
      // SI NO, asumimos que es un TÍTULO DE CATEGORÍA (Ej: BEBIDAS)
      else {
        return (
          <h3 key={index} className="menu-category">
            {lineaLimpia}
          </h3>
        );
      }
    });
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
                Ver Menú 📜
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {restauranteSeleccionado && (
        <div className="modal-overlay" onClick={cerrarMenu}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={cerrarMenu}>✖</button>
            
            <div className="modal-header">
              <h2>{restauranteSeleccionado.nombre}</h2>
              <img src={restauranteSeleccionado.imagen_url} alt="Portada" className="modal-img"/>
            </div>
            
            <div className="menu-scroll">
              {/* Aquí usamos la función mágica en lugar de mostrar texto plano */}
              <div className="menu-formatted">
                {renderizarMenu(restauranteSeleccionado.menu)}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default App