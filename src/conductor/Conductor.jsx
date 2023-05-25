import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import abeja from "../imagenes/abeja.png"

class Conductor extends Component {
  state = {
    data: [
      { id: 1, nombre: 'John', apellidos: 'Doe', cedula: '1234567890', correo: 'john@example.com', direccion: 'Calle 123', sexo: 'M', ciudad_id: '1' },
      { id: 2, nombre: 'Jane', apellidos: 'Smith', cedula: '0987654321', correo: 'jane@example.com', direccion: 'Avenida 456', sexo: 'F', ciudad_id: '2' },
      { id: 3, nombre: 'David', apellidos: 'Johnson', cedula: '5678901234', correo: 'david@example.com', direccion: 'Plaza 789', sexo: 'M', ciudad_id: '3' },
      { id: 4, nombre: 'Emily', apellidos: 'Brown', cedula: '4321098765', correo: 'emily@example.com', direccion: 'Calle 456', sexo: 'F', ciudad_id: '1' },
      { id: 5, nombre: 'Michael', apellidos: 'Miller', cedula: '9876543210', correo: 'michael@example.com', direccion: 'Avenida 789', sexo: 'M', ciudad_id: '2' },
      { id: 6, nombre: 'Olivia', apellidos: 'Davis', cedula: '6543210987', correo: 'olivia@example.com', direccion: 'Plaza 123', sexo: 'F', ciudad_id: '3' },
      { id: 7, nombre: 'William', apellidos: 'Wilson', cedula: '3456789012', correo: 'william@example.com', direccion: 'Calle 789', sexo: 'M', ciudad_id: '1' },
      { id: 8, nombre: 'Sophia', apellidos: 'Taylor', cedula: '2109876543', correo: 'sophia@example.com', direccion: 'Avenida 123', sexo: 'F', ciudad_id: '2' },
      { id: 9, nombre: 'James', apellidos: 'Anderson', cedula: '8765432109', correo: 'james@example.com', direccion: 'Plaza 456', sexo: 'M', ciudad_id: '3' },
      { id: 10, nombre: 'Emma', apellidos: 'Moore', cedula: '1098765432', correo: 'emma@example.com', direccion: 'Calle 123', sexo: 'F', ciudad_id: '1' },
    ],
    form: {
      nombre: '',
      apellidos: '',
      cedula: '',
      correo: '',
      direccion: '',
      sexo: '',
      ciudad_id: '',
      id: '',
    },
    modalInsertar: false,
    conductorSeleccionado: null,
    loading: false,
    error: null
  };

  handleChange = (e) => {
    // Actualiza el valor de los campos del formulario en el estado
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar = () => {
    // Muestra el modal de registro de conductor y establece los valores en el formulario
    this.setState({
      form: {
        nombre: '',
        apellidos: '',
        cedula: '',
        correo: '',
        direccion: '',
        sexo: '',
        ciudad_id: '',
        id: ''
      },
      modalInsertar: true
    });
  }

  ocultarModalInsertar = () => {
    // Oculta el modal de registro de conductor y reinicia los valores del formulario
    this.setState({
      modalInsertar: false,
      form: {
        nombre: '',
        apellidos: '',
        cedula: '',
        correo: '',
        direccion: '',
        sexo: '',
        ciudad_id: '',
        id: ''
      },
      conductorSeleccionado: null,
    });
  }

  eliminarConductor = (id) => {
    // Elimina el conductor con el id especificado de la lista de conductores
    const { data } = this.state;
    const newData = data.filter(conductor => conductor.id !== id);
    this.setState({ data: newData });
  }

  editarConductor = (conductor) => {
    // Establece el conductor seleccionado en el estado y muestra el modal de registro de conductor
    this.setState({ conductorSeleccionado: conductor }, () => {
      this.mostrarModalInsertar();
    });
  }

  insertar = () => {
    // Inserta un nuevo conductor en la lista de conductores
    const { form, data } = this.state;
    const newConductor = {
      id: form.id,
      nombre: form.nombre,
      apellidos: form.apellidos,
      cedula: form.cedula,
      correo: form.correo,
      direccion: form.direccion,
      sexo: form.sexo,
      ciudad_id: form.ciudad_id,
    };
    const newData = [...data, newConductor];
    this.setState({ data: newData, modalInsertar: false });
  }

  actualizar = () => {
    // Actualiza los datos del conductor seleccionado en la lista de conductores
    const { form, data } = this.state;
    const updatedConductor = {
      id: form.id,
      nombre: form.nombre,
      apellidos: form.apellidos,
      cedula: form.cedula,
      correo: form.correo,
      direccion: form.direccion,
      sexo: form.sexo,
      ciudad_id: form.ciudad_id,
    };
    const newData = data.map(conductor => {
      if (conductor.id === form.id) {
        return updatedConductor;
      }
      return conductor;
    });
    this.setState({ data: newData, modalInsertar: false });
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 'auto' }}>Lista de usuarios</span>
              <img src={abeja} alt="abeja" style={{ width: '6%', height: '6%', marginRight: '5px' }} />
              <Button color="success" onClick={() => this.mostrarModalInsertar()} style={{ marginRight: '10px' }}>
                Registrar conductor
              </Button>
            </div>
          </h1>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Id</th>
                <th style={{ padding: 10 }}>Nombre</th>
                <th style={{ padding: 10 }}>Apellidos</th>
                <th style={{ padding: 10 }}>Cédula</th>
                <th style={{ padding: 10 }}>Correo</th>
                <th style={{ padding: 10 }}>Dirección</th>
                <th style={{ padding: 10 }}>Sexo</th>
                <th style={{ padding: 10 }}>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((conductor) => (
                <tr key={conductor.id}>
                  <td style={{ padding: 10 }}>{conductor.id}</td>
                  <td style={{ padding: 10 }}>{conductor.nombre}</td>
                  <td style={{ padding: 10 }}>{conductor.apellidos}</td>
                  <td style={{ padding: 10 }}>{conductor.cedula}</td>
                  <td style={{ padding: 10 }}>{conductor.correo}</td>
                  <td style={{ padding: 10 }}>{conductor.direccion}</td>
                  <td style={{ padding: 10 }}>{conductor.sexo}</td>
                  <td style={{ padding: 10 }}>{conductor.ciudad_id}</td>
                  <td>
                    <Button color="primary" onClick={() => this.editarConductor(conductor)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminarConductor(conductor.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar} toggle={this.ocultarModalInsertar}>
          <ModalHeader toggle={this.ocultarModalInsertar}>Registrar conductor</ModalHeader>
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
              <label>Apellidos:</label>
              <input type="text" className="form-control" name="apellidos" value={this.state.form.apellidos} onChange={this.handleChange} required />
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
                <option value="">Seleccione...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Ciudad:</label>
              <select className="form-control" name="ciudad_id" value={this.state.form.ciudad_id} onChange={this.handleChange} required>
                <option value="">Seleccione...</option>
                <option value="">Seleccione...</option>
                <option value="1">Bogotá</option>
                <option value="2">Medellín</option>
                <option value="3">Cali</option>
                <option value="4">Barranquilla</option>
                <option value="5">Cartagena</option>
                <option value="6">Bucaramanga</option>
                <option value="7">Pereira</option>
                <option value="8">Santa Marta</option>
                <option value="9">Cúcuta</option>
                <option value="10">Ibagué</option>
                <option value="11">Manizales</option>
                <option value="12">Villavicencio</option>
                <option value="13">Pasto</option>
                <option value="14">Montería</option>
                <option value="15">Neiva</option>
                <option value="16">Valledupar</option>
                <option value="17">Armenia</option>
                <option value="18">Sincelejo</option>
                <option value="19">Popayán</option>
                <option value="20">Tunja</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {this.state.conductorSeleccionado ? (
              <Button color="primary" onClick={() => this.actualizar()}>Actualizar</Button>
            ) : (
              <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            )}
            <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Conductor;


