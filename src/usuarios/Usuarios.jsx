import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios'
import abeja from "../imagenes/abeja.png"

class Usuario extends Component {
  state = {
    data: [],
    form: {
      estado: '',
      password: '',
      rol: '',
      username: '',
      id: ''
    },
    modalInsertar: false,
    usuarioSeleccionado: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    axios.get('https://ambrosia-385623.rj.r.appspot.com/usuarios/listar')
      .then(res => {
        console.log(res.data); // Verifica que los datos se reciben correctamente
        this.setState({
          data: res.data,
          loading: false // Indicar que se han cargado los datos correctamente
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'Error al cargar los datos',
          loading: false // Indicar que se ha producido un error al cargar los datos
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar = () => {
    const usuarioSeleccionado = this.state.usuarioSeleccionado;
    const rol = usuarioSeleccionado ? usuarioSeleccionado.rol : 1;
    const estado = usuarioSeleccionado ? usuarioSeleccionado.estado : true;
    this.setState({
      form: {
        username: '',
        password: '',
        rol: rol,
        estado: estado
      },
      modalInsertar: true
    });
  }


  ocultarModalInsertar = () => {
    // Limpiamos el formulario y el estado de usuario seleccionado al cerrar el modal
    this.setState({
      modalInsertar: false,
      form: {
        estado: '',
        password: '',
        rol: '',
        username: '',
        id: ''
      },
      usuarioSeleccionado: null,
    });
  }

  editarUsuario = (usuario) => {
    // Actualizar el estado del formulario con los datos del usuario a editar
    const { id, username, rol, password, estado } = usuario; // desestructura el objeto usuario para obtener los valores
    this.setState({
      form: {
        id,
        username,
        rol,
        password,
        estado
      },
      modalInsertar: true
    }, () => {
      // Cambiar el texto del botón "Guardar" por "Actualizar"
      setTimeout(() => {
        const btnGuardar = document.querySelector('.modal-footer > .btn-primary');
        if (btnGuardar) {
          btnGuardar.textContent = 'Actualizar';
        }
      }, 0);
    });
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <>
        <Container>
          <br />
          <h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 'auto' }}>Lista de usuarios</span>
              <img src={abeja} alt="abeja" style={{ width: '6%', height: '6%', marginRight: '5px' }} />
              <Button color="success" onClick={() => this.mostrarModalInsertar()} style={{ marginRight: '10px' }}>
                Registrar usuario
              </Button>
            </div>
          </h1>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Id</th>
                <th style={{ padding: 10 }}>Username</th>
                <th style={{ padding: 10 }}>Rol</th>
                <th style={{ padding: 10 }}>Password</th>
                <th style={{ padding: 10 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td style={{ padding: 10 }}>{elemento.id}</td>
                  <td style={{ padding: 10 }}>{elemento.username}</td>
                  <td style={{ padding: 10 }}>
                    {elemento.rol === 1 ? "Administrador" : "Área de Calidad"}
                  </td>
                  <td style={{ padding: 10 }}>{elemento.password.replace(/./g, "*")}</td>
                  <td style={{ padding: 10 }}>{elemento.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button color="primary" onClick={() => this.editarUsuario(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminarUsuario(elemento.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Container >
        <Modal isOpen={this.state.modalInsertar} toggle={this.ocultarModalInsertar}>
  <ModalHeader toggle={this.ocultarModalInsertar}>Registrar usuario</ModalHeader>
  <ModalBody>
    <FormGroup>
      <label>Id:</label>
      <input type="text" className="form-control" name="id" value={this.state.form.id} onChange={this.handleChange} required />
    </FormGroup>

    <FormGroup>
      <label>Username:</label>
      <input type="text" className="form-control" name="username" value={this.state.form.username} onChange={this.handleChange} required />
    </FormGroup>

    <FormGroup>
      <label>Password:</label>
      <input type="password" className="form-control" name="password" value={this.state.form.password} onChange={this.handleChange} required />
    </FormGroup>

    <FormGroup>
      <label>Rol:</label>
      <select className="form-control" name="rol" value={this.state.form.rol} onChange={this.handleChange} required>
        <option value="">Seleccionar...</option>
        <option value="administrador">Administrador</option>
        <option value="area de calidad"> área de calidad</option>
      </select>
    </FormGroup>

    <FormGroup>
      <label>Estado:</label>
      <select className="form-control" name="estado" value={this.state.form.estado} onChange={this.handleChange} required>
        <option value="">Seleccionar...</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
    </FormGroup> 

    {this.state.form.id && this.state.form.username && this.state.form.password && this.state.form.rol && this.state.form.estado ? null : <div className="alert alert-warning" role="alert">Por favor complete todos los campos.</div>}
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.insertar}>Registrar</Button>
    <Button color="danger" onClick={this.ocultarModalInsertar}>Cancelar</Button>
  </ModalFooter>
</Modal>

      </>);
  }
}

export default Usuario;


/*
seleccionarUsuario = (usuario) => {
    // Guardamos el usuario seleccionado y cambiamos el texto del botón a "Actualizar"
    this.setState({ usuarioSeleccionado: usuario });
    this.mostrarModalInsertar();
  }

  guardarUsuario = () => {
    axios.post('https://ambrosia-385623.rj.r.appspot.com/usuarios/guardar', this.state.form)
      .then(res => {
        console.log(res.data); // Verifica que se guardaron los datos correctamente
        this.setState({
          data: [...this.state.data, res.data], // Agrega el nuevo usuario a la lista
          form: { // Resetea el formulario
            estado: '',
            password: '',
            rol: '',
            username: '',
            id: ''
          },
          modalInsertar: false // Cierra el modal
        });
      })
      .catch(err => console.log(err));
  }

  eliminarUsuario = (id) => {
    axios.delete('https://ambrosia-385623.rj.r.appspot.com/usuarios/eliminar/${id}')
      .then(res => {
        console.log(res);
        this.cargarUsuarios();
      })
      .catch(err => console.log(err));
  }

*/