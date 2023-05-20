import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios'
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formControlClass = "form-control";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (username === 'samuel' && password === '12345') {
      // Inicio de sesión exitoso a nivel local
      onLogin(true);
      setErrorMessage('');
    } else {
      try {
        // Realizar la llamada al backend para verificar las credenciales
        const response = await axios.post('/api/login', {
          username,
          password,
        });
  
        if (response.data.success) {
          // Inicio de sesión exitoso a través del backend
          onLogin(true);
          setErrorMessage('');
        } else {
          // Credenciales incorrectas
          setErrorMessage('Nombre de usuario o contraseña incorrectos');
          onLogin(false);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud al backend:', error);
        setErrorMessage('Error al realizar la solicitud al backend');
        onLogin(false);
      }
    }
  
    // Resetear los valores del formulario
    setUsername('');
    setPassword('');
  };
  

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Inicio de sesión</h2>
        <div className="form-group">
          <label htmlFor="usernameInput" className="small-label">Usuario</label>
          <input type="text" className={formControlClass} id="usernameInput" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="small-label">Contraseña</label>
          <input type="password" className="form-control" id="passwordInput" value={password} onChange={handlePasswordChange} />
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <></>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
