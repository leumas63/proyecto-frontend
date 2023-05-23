import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const data = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    cedula: "123456789",
    correo: "juan.perez@gmail.com",
    direccion: "Calle 123, Ciudad",
    sexo: "Masculino",
    ciudad_id: 1,
    estado: "Activo",
    fecha_ingreso: "2022-01-01",
    fecha_retiro: null,
    lugar_graduacion: "Universidad Nacional",
    profesion: "Ingeniero de Sistemas",
    cargo_id: 1
  }
];

class Empleado extends React.Component {
  state = {
    data: data,
    form: {
      id: 1,
      nombre: " sam",
      apellido: "Pérez",
      cedula: "123456789",
      correo: "juan.perez@gmail.com",
      direccion: "Calle 123, Ciudad",
      sexo: "Masculino",
      ciudad_id: 1,
      estado: "Activo",
      fecha_ingreso: "2022-01-01",
      fecha_retiro: null,
      lugar_graduacion: "Universidad Nacional",
      profesion: "Ingeniero de Sistemas",
      cargo_id: 1
    },
    modalInsertar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}> Registrar usuario </Button>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th style={{ padding: 10}}>Id</th>
                <th style={{ padding: 10}}>Username</th>
                <th style={{ padding: 10}}>Rol</th>
                <th style={{ padding: 10}}>Password</th>
                <th style={{ padding: 10}}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td style={{ padding: 10}}>{elemento.id}</td>
                  <td style={{ padding: 10}}>{elemento.username}</td>
                  <td style={{ padding: 10}}>{elemento.rol}</td>
                  <td style={{ padding: 10}}>{elemento.password}</td>
                  <td style={{ padding: 10}}>{elemento.estado}</td>
                  <td>
                    <Button color="primary">Editar</Button>{" "}
                    <Button color="danger">Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        <Modal isOpen={this.state.modalInsertar} toggle={this.ocultarModalInsertar}>
          <ModalHeader toggle={this.ocultarModalInsertar}>Registrar usuario</ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input type="text" className="form-control" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Username:</label>
              <input type="text" className="form-control" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Password:</label>
              <input type="password" className="form-control" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <select className="form-control">
                <option value="">Seleccionar...</option>
                <option value="administrador">Administrador</option>
                <option value="usuario">Usuario</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control">
                <option value="">Seleccionar...</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary">Guardar</Button>
            <Button color="secondary" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>);
  }
}

export default Empleado;
