import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuarios from './usuarios/Usuarios';
import Navbar from './navegacion/Navbar';
import Conductor from './conductor/Conductor';
import Empleado from './empleado/Empleado';
import Vehiculo from './vehiculo/Vehiculo';
import PaginaPrincipal from './componentes/PaginaPrincipal';
import Loging from './componentes/Loging';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Maneja el estado de inicio de sesión
  const handleLogin = (isSuccessful) => {
    setIsLoggedIn(isSuccessful);
  };

  if (isLoggedIn) {
    // Si el usuario ha iniciado sesión, muestra la aplicación principal
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PaginaPrincipal />} />
          <Route exact path="/usuario" element={<Usuarios />} />
          <Route exact path="/empleado" element={<Empleado />} />
          <Route exact path="/conductor" element={<Conductor />} />
          <Route exact path="/vehiculo" element={<Vehiculo />} />
        </Routes>
      </Router>
    );
  } else {
    // Si el usuario no ha iniciado sesión, muestra el componente de inicio de sesión
    return <Loging onLogin={handleLogin} />;
  }
}

export default App;