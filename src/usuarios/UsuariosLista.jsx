import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsuariosLista() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/h/ya')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>
            {user.nombre} - {user.email}
          </li>
        ))}
      </ul>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            <th>Password</th>
            <th>Rol</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.estado}</td>
              <td>{user.password}</td>
              <td>{user.rol}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosLista;
