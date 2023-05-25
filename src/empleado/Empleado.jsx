import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

class Empleado extends Component {
  state = {
    data: [
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
    ],
    form: {
      id: '',
      nombre: '',
      apellido: '',
      cedula: '',
      correo: '',
      direccion: '',
      sexo: '',
      ciudad_id: '',
      estado: '',
      fecha_ingreso: '',
      fecha_retiro: '',
      lugar_graduacion: '',
      profesion: '',
      cargo_id: ''
    },
    modalInsertar: false,
    empleadoSeleccionado: null,
    loading: false,
    error: null
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
    const empleadoSeleccionado = this.state.empleadoSeleccionado;
    this.setState({
      form: {
        id: '',
        nombre: '',
        apellido: '',
        cedula: '',
        correo: '',
        direccion: '',
        sexo: '',
        ciudad_id: '',
        estado: '',
        fecha_ingreso: '',
        fecha_retiro: '',
        lugar_graduacion: '',
        profesion: '',
        cargo_id: ''
      },
      modalInsertar: true
    });
  }

  ocultarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
      form: {
        id: '',
        nombre: '',
        apellido: '',
        cedula: '',
        correo: '',
        direccion: '',
        sexo: '',
        ciudad_id: '',
        estado: '',
        fecha_ingreso: '',
        fecha_retiro: '',
        lugar_graduacion: '',
        profesion: '',
        cargo_id: ''
      },
      empleadoSeleccionado: null,
    });
  }

  editarEmpleado = (empleado) => {
    const { id, nombre, apellido, cedula, correo, direccion, sexo, ciudad_id, estado, fecha_ingreso, fecha_retiro, lugar_graduacion, profesion, cargo_id } = empleado;
    this.setState({
      form: {
        id,
        nombre,
        apellido,
        cedula,
        correo,
        direccion,
        sexo,
        ciudad_id,
        estado,
        fecha_ingreso,
        fecha_retiro,
        lugar_graduacion,
        profesion,
        cargo_id
      },
      modalInsertar: true
    });
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <h1>
            Lista de empleados
            <Button color="success" onClick={() => this.mostrarModalInsertar()} style={{ marginLeft: '10px' }}>
              Registrar empleado
            </Button>
          </h1>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Id</th>
                <th style={{ padding: 10 }}>Nombre</th>
                <th style={{ padding: 10 }}>Apellido</th>
                <th style={{ padding: 10 }}>Cédula</th>
                <th style={{ padding: 10 }}>Correo</th>
                <th style={{ padding: 10 }}>Dirección</th>
                <th style={{ padding: 10 }}>Sexo</th>
                <th style={{ padding: 10 }}>Estado</th>
                <th style={{ padding: 10 }}>Fecha Ingreso</th>
                <th style={{ padding: 10 }}>Fecha Retiro</th>
                <th style={{ padding: 10 }}>Lugar Graduación</th>
                <th style={{ padding: 10 }}>Profesión</th>
                <th style={{ padding: 10 }}>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td style={{ padding: 10 }}>{elemento.id}</td>
                  <td style={{ padding: 10 }}>{elemento.nombre}</td>
                  <td style={{ padding: 10 }}>{elemento.apellido}</td>
                  <td style={{ padding: 10 }}>{elemento.cedula}</td>
                  <td style={{ padding: 10 }}>{elemento.correo}</td>
                  <td style={{ padding: 10 }}>{elemento.direccion}</td>
                  <td style={{ padding: 10 }}>{elemento.sexo}</td>
                  <td style={{ padding: 10 }}>{elemento.estado}</td>
                  <td style={{ padding: 10 }}>{elemento.fecha_ingreso}</td>
                  <td style={{ padding: 10 }}>{elemento.fecha_retiro}</td>
                  <td style={{ padding: 10 }}>{elemento.lugar_graduacion}</td>
                  <td style={{ padding: 10 }}>{elemento.profesion}</td>
                  <td style={{ padding: 10 }}>{elemento.cargo_id}</td>
                  <td>
                    <Button color="primary" onClick={() => this.editarEmpleado(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminarEmpleado(elemento.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar} toggle={this.ocultarModalInsertar}>
          <ModalHeader toggle={this.ocultarModalInsertar}>Registrar empleado</ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input type="text" className="form-control" name="id" value={this.state.form.id} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input type="text" className="form-control" name="nombre" value={this.state.form.nombre} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <input type="text" className="form-control" name="apellido" value={this.state.form.apellido} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Cédula:</label>
              <input type="text" className="form-control" name="cedula" value={this.state.form.cedula} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input type="email" className="form-control" name="correo" value={this.state.form.correo} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Dirección:</label>
              <input type="text" className="form-control" name="direccion" value={this.state.form.direccion} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Sexo:</label>
              <select className="form-control" name="sexo" value={this.state.form.sexo} onChange={this.handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" name="estado" value={this.state.form.estado} onChange={this.handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Fecha Ingreso:</label>
              <input type="date" className="form-control" name="fecha_ingreso" value={this.state.form.fecha_ingreso} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Fecha Retiro:</label>
              <input type="date" className="form-control" name="fecha_retiro" value={this.state.form.fecha_retiro} onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Lugar Graduación:</label>
              <input type="text" className="form-control" name="lugar_graduacion" value={this.state.form.lugar_graduacion} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Profesión:</label>
              <input type="text" className="form-control" name="profesion" value={this.state.form.profesion} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Cargo:</label>
              <select className="form-control" name="cargo_id" value={this.state.form.cargo_id} onChange={this.handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="1">Cargo 1</option>
                <option value="2">Cargo 2</option>
              </select>
            </FormGroup>

            {this.state.form.id && this.state.form.nombre && this.state.form.apellido && this.state.form.cedula && this.state.form.correo && this.state.form.direccion && this.state.form.sexo && this.state.form.estado && this.state.form.fecha_ingreso && this.state.form.lugar_graduacion && this.state.form.profesion && this.state.form.cargo_id ? null : <div className="alert alert-warning" role="alert">Por favor complete todos los campos.</div>}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertarEmpleado}>Registrar</Button>
            <Button color="danger" onClick={this.ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Empleado;
