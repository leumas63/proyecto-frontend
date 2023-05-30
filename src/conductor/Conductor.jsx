// Este componente lo modifique para se entendieran como deveria estar funcionando los otros componentes 
// con las llamadas de las apps, como no se trabajo en backend las llamadas a el mismo no traen nada 

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import abeja from "../imagenes/abeja.png"

class Conductor extends Component {
  state = {
    data: [],
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
    error: null,
    mostrarAlerta: false,
    conductorAEliminar: null,
  };

  componentDidMount() {
    const storedData = localStorage.getItem('conductorData');

    if (storedData) {
      this.setState({
        data: JSON.parse(storedData),
      });
    }
  }

  componentDidUpdate() {
    const { data } = this.state;
    localStorage.setItem('conductorData', JSON.stringify(data));
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  ocultarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
    });
  };

  mostrarModalEditar = (conductor) => {
    this.setState({
      form: conductor,
      modalInsertar: true,
    });
  };

  insertarConductor = () => {
    const { data, form } = this.state;
    const campos = ['nombre', 'apellidos', 'cedula', 'correo', 'direccion', 'sexo', 'ciudad_id'];

    if (campos.some((campo) => !form[campo])) {
      this.setState({ mostrarAlertaCamposVacios: true });
      return;
    }

    const newConductor = {
      ...form,
      id: data.length + 1,
    };
    const newData = [...data, newConductor];
    this.setState(
      {
        data: newData,
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
        mostrarAlertaCamposVacios: false,
      },
      () => {
        localStorage.setItem('conductorData', JSON.stringify(newData));
      }
    );
  };

  editarConductor = () => {
    const { data, form } = this.state;
    const newData = data.map((conductor) => {
      if (conductor.id === form.id) {
        return form;
      }
      return conductor;
    });
    this.setState(
      {
        data: newData,
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
      },
      () => {
        localStorage.setItem('conductorData', JSON.stringify(newData));
      }
    );
  };

  mostrarModalEliminar = (conductor) => {
    this.setState({
      conductorAEliminar: conductor,
      mostrarAlerta: true,
    });
  };

  ocultarModalEliminar = () => {
    this.setState({
      conductorAEliminar: null,
      mostrarAlerta: false,
    });
  };

  eliminarConductor = () => {
    const { data, conductorAEliminar } = this.state;
    const newData = data.filter((conductor) => conductor.id !== conductorAEliminar.id);
    this.setState(
      {
        data: newData,
        mostrarAlerta: false,
      },
      () => {
        localStorage.setItem('conductorData', JSON.stringify(newData));
      }
    );
  };

  render() {
    const { data, form, modalInsertar, mostrarAlerta, conductorAEliminar } = this.state;

    return (
      <Container>
        <br />
        <h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 'auto' }}>Lista de conductores</span>
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Sexo</th>
              <th>Ciudad ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((conductor) => (
              <tr key={conductor.id}>
                <td>{conductor.id}</td>
                <td>{conductor.nombre}</td>
                <td>{conductor.apellidos}</td>
                <td>{conductor.cedula}</td>
                <td>{conductor.correo}</td>
                <td>{conductor.direccion}</td>
                <td>{conductor.sexo}</td>
                <td>{conductor.ciudad_id}</td>
                <td>
                  <Button color="primary" onClick={() => this.mostrarModalEditar(conductor)}>Actulizar</Button>{' '}
                  <Button color="danger" onClick={() => this.mostrarModalEliminar(conductor)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agregar Conductor</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos:</label>
              <input
                className="form-control"
                type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Cédula:</label>
              <input
                className="form-control"
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                type="email"
                name="correo"
                value={form.correo}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Dirección:</label>
              <input
                className="form-control"
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Sexo:</label>
              <select
                className="form-control"
                name="sexo"
                value={form.sexo}
                onChange={this.handleChange}
              >
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
            {this.state.mostrarAlertaCamposVacios && (
              <div className="alert alert-warning" role="alert">
                Por favor complete todos los campos.
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            {form.id ? (
              <Button color="primary" onClick={this.editarConductor}>
                Actulizar
              </Button>
            ) : (
              <Button color="primary" onClick={this.insertarConductor}>
                Insertar
              </Button>
            )}
            {' '}
            <Button color="danger" onClick={this.ocultarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={mostrarAlerta}>
          <ModalHeader>
            <div>
              <h3>Eliminar Conductor</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            ¿Está seguro de que desea eliminar al conductor {conductorAEliminar?.nombre}?

          </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={this.eliminarConductor}>
              Eliminar
            </Button>
            {' '}
            <Button color="secondary" onClick={this.ocultarModalEliminar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Conductor;
