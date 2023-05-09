import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="nav-link" to="/">PaginaPrincipal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link" to="/usuario">Usuario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/conductor">Conductor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/empleado">Empleado</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehiculo">Vehiculo</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar