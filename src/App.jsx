import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    // Aquí nos conectamos a TU servidor (el cerebro que dejaste corriendo)
    fetch('https://cucei-food-api.onrender.com/api/restaurantes')
      .then(res => res.json())
      .then(data => setRestaurantes(data))
      .catch(err => console.error("Error cargando datos:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>CUCEI Food 🍔</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {restaurantes.map(rest => (
          <div key={rest.id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={rest.imagen_url} alt={rest.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{rest.nombre}</h2>
              <p style={{ color: '#666', fontSize: '0.9em' }}>{rest.descripcion}</p>
              <div style={{ background: '#fff3e0', padding: '10px', marginTop: '10px', borderRadius: '5px', fontSize: '0.9em' }}>
                <strong style={{color: '#e65100'}}>Menú:</strong> <br/>
                {rest.menu}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default App