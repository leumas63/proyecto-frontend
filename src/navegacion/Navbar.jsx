import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    // Barra de navegación
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
      <div className="container-fluid">
        {/* Enlace al inicio */}
        <Link className="navbar-brand" to="/">
          PaginaPrincipal
        </Link>

        {/* Botón para desplegar el menú en dispositivos móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor de los enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Enlace a la página de usuarios */}
            <li className="nav-item">
              <Link className="nav-link" to="/usuario">
                Usuario
              </Link>
            </li>

            {/* Enlace a la página de conductores */}
            <li className="nav-item">
              <Link className="nav-link" to="/conductor">
                Conductor
              </Link>
            </li>

            {/* Enlace a la página de empleados */}
            <li className="nav-item">
              <Link className="nav-link" to="/empleado">
                Empleado
              </Link>
            </li>

            {/* Enlace a la página de vehículos */}
            <li className="nav-item">
              <Link className="nav-link" to="/vehiculo">
                Vehiculo
              </Link>

            </li>

            {/* Botón para recargar la página */}
            <button className="btn btn-light" onClick={handleReloadPage}>
              cerrar sesion
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
