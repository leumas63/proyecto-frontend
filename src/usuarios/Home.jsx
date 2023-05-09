import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("https://ambrosia-385623.rj.r.appspot.com/usuarios/listar");
    console.log(result);
    setUsers(result.data); // actualiza el estado con los datos recibidos
  };

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {users.map(user => (
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
          {users.map(user => (
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
