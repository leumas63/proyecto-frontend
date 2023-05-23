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

  const handleLogin = (isSuccessful) => {
    setIsLoggedIn(isSuccessful);
  };

  if (isLoggedIn) {
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
    return <Loging onLogin={handleLogin} />;
  }
}

export default App;


/*
return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<PaginaPrincipal />} />
        <Route exact path='/usuario' element={<Usuarios />} />
        <Route exact path='/empleado' element={<Empleado />} />
        <Route exact path='/conductor' element={<Conductor />} />
        <Route exact path='/vehiculo' element={<Vehiculo />} />
      </Routes>
    </Router>
  )
*/


// chicos me lo tire?????