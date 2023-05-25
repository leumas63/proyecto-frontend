import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios';
import abeja from "../imagenes/abeja.png";

class Empleado extends Component {
  state = {
    data: [], // Almacenará los datos de los empleados
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
    modalInsertar: false, // Indica si el modal de registro de empleado está visible o no
    empleadoSeleccionado: null, // Almacena la información del empleado seleccionado para editar
    loading: true, // Indica si los datos se están cargando o no
    error: null // Almacena cualquier error que pueda ocurrir durante la carga de datos
  };

  componentDidMount() {
    // Se realiza una solicitud HTTP GET para obtener los datos de empleados desde la URL proporcionada
    axios.get('https://ambrosia-385623.rj.r.appspot.com/empleados/listar')
      .then(res => {
        console.log(res.data); // Verifica que los datos se reciben correctamente
        this.setState({
          data: res.data, // Almacena los datos de los empleados en el estado 'data'
          loading: false // Indicar que se han cargado los datos correctamente
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'Error al cargar los datos', // Almacena el mensaje de error en el estado 'error'
          loading: false // Indicar que se ha producido un error al cargar los datos
        });
      });
  }

  handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    this.setState({
      form: {
        ...this.state.form, // Copia el estado actual del formulario
        [e.target.name]: e.target.value, // Actualiza el valor del campo modificado en el estado del formulario
      }
    });
  }

  mostrarModalInsertar = () => {
    // Muestra el modal de registro de empleado
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
    // Oculta el modal de registro de empleado y limpia el formulario y el estado del empleado seleccionado
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
    // Prepara el formulario para editar un empleado existente
    this.setState({
      form: {
        id: empleado.id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        cedula: empleado.cedula,
        correo: empleado.correo,
        direccion: empleado.direccion,
        sexo: empleado.sexo,
        ciudad_id: empleado.ciudad_id,
        estado: empleado.estado,
        fecha_ingreso: empleado.fecha_ingreso,
        fecha_retiro: empleado.fecha_retiro,
        lugar_graduacion: empleado.lugar_graduacion,
        profesion: empleado.profesion,
        cargo_id: empleado.cargo_id
      },
      modalInsertar: true
    }, () => {
      // Cambiar el texto del botón "Registrar" por "Actualizar" en el modal
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

    // Renderiza el componente de acuerdo al estado de carga y los datos
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
              <span style={{ marginRight: 'auto' }}>Lista de empleados</span>
              <img src={abeja} alt="abeja" style={{ width: '6%', height: '6%', marginRight: '5px' }} />
              <Button color="success" onClick={() => this.mostrarModalInsertar()} style={{ marginRight: '10px' }}>
                Registrar empleado
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
                <th style={{ padding: 10 }}>Apellido</th>
                <th style={{ padding: 10 }}>Cédula</th>
                <th style={{ padding: 10 }}>Correo</th>
                <th style={{ padding: 10 }}>Dirección</th>
                <th style={{ padding: 10 }}>Sexo</th>
                <th style={{ padding: 10 }}>Ciudad</th>
                <th style={{ padding: 10 }}>Estado</th>
                <th style={{ padding: 10 }}>Fecha Ingreso</th>
                <th style={{ padding: 10 }}>Fecha Retiro</th>
                <th style={{ padding: 10 }}>Lugar Graduación</th>
                <th style={{ padding: 10 }}>Profesión</th>
                <th style={{ padding: 10 }}>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapea los datos de los empleados y muestra una fila por cada empleado */}
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td style={{ padding: 10 }}>{elemento.id}</td>
                  <td style={{ padding: 10 }}>{elemento.nombre}</td>
                  <td style={{ padding: 10 }}>{elemento.apellido}</td>
                  <td style={{ padding: 10 }}>{elemento.cedula}</td>
                  <td style={{ padding: 10 }}>{elemento.correo}</td>
                  <td style={{ padding: 10 }}>{elemento.direccion}</td>
                  <td style={{ padding: 10 }}>{elemento.sexo}</td>
                  <td style={{ padding: 10 }}>{elemento.ciudad_id}</td>
                  <td style={{ padding: 10 }}>{elemento.estado}</td>
                  <td style={{ padding: 10 }}>{elemento.fecha_ingreso}</td>
                  <td style={{ padding: 10 }}>{elemento.fecha_retiro}</td>
                  <td style={{ padding: 10 }}>{elemento.lugar_graduacion}</td>
                  <td style={{ padding: 10 }}>{elemento.profesion}</td>
                  <td style={{ padding: 10 }}>{elemento.cargo_id}</td>
                  <td>
                    {/* Botones para editar y eliminar un empleado */}
                    <Button color="primary" onClick={() => this.editarEmpleado(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminarEmpleado(elemento.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal de registro de empleado */}
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
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Ciudad:</label>
              <input type="text" className="form-control" name="ciudad_id" value={this.state.form.ciudad_id} onChange={this.handleChange} required />
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
              <input type="text" className="form-control" name="fecha_ingreso" value={this.state.form.fecha_ingreso} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Fecha Retiro:</label>
              <input type="text" className="form-control" name="fecha_retiro" value={this.state.form.fecha_retiro} onChange={this.handleChange} required />
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
              <input type="text" className="form-control" name="cargo_id" value={this.state.form.cargo_id} onChange={this.handleChange} required />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.registrarEmpleado}>Registrar</Button>{" "}
            <Button color="secondary" onClick={this.ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Empleado;
