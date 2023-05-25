import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios'
import abeja from "../imagenes/abeja.png"

class Vehiculo extends Component {
  state = {
    data: [],
    form: {
      capacidad: '',
      color: '',
      placa: '',
      year: '',
      marca_vehiculo_id: '',
      id: ''
    },
    modalInsertar: false,
    vehiculoSeleccionado: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    axios.get('https://ambrosia-385623.rj.r.appspot.com/vehiculos/listar')
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'Error al cargar los datos',
          loading: false
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
    const vehiculoSeleccionado = this.state.vehiculoSeleccionado;
    this.setState({
      form: {
        capacidad: '',
        color: '',
        placa: '',
        year: '',
        marca_vehiculo_id: '',
        id: ''
      },
      modalInsertar: true
    });
  }

  ocultarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
      form: {
        capacidad: '',
        color: '',
        placa: '',
        year: '',
        marca_vehiculo_id: '',
        id: ''
      },
      vehiculoSeleccionado: null,
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
              <span style={{ marginRight: 'auto' }}>Lista de vehículos</span>
              <img src={abeja} alt="abeja" style={{ width: '6%', height: '6%', marginRight: '5px' }} />
              <Button color="success" onClick={() => this.mostrarModalInsertar()} style={{ marginRight: '10px' }}>
                Registrar vehículo
              </Button>
            </div>
          </h1>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Id</th>
                <th style={{ padding: 10 }}>Capacidad</th>
                <th style={{ padding: 10 }}>Color</th>
                <th style={{ padding: 10 }}>Placa</th>
                <th style={{ padding: 10 }}>Año</th>
                <th style={{ padding: 10 }}>Marca</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((vehiculo) => (
                <tr key={vehiculo.id}>
                  <td style={{ padding: 10 }}>{vehiculo.id}</td>
                  <td style={{ padding: 10 }}>{vehiculo.capacidad}</td>
                  <td style={{ padding: 10 }}>{vehiculo.color}</td>
                  <td style={{ padding: 10 }}>{vehiculo.placa}</td>
                  <td style={{ padding: 10 }}>{vehiculo.year}</td>
                  <td style={{ padding: 10 }}>{vehiculo.marca_vehiculo_id}</td>
                  <td>
                    <Button color="primary" onClick={() => this.editarVehiculo(vehiculo)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminarVehiculo(vehiculo.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar} toggle={this.ocultarModalInsertar}>
          <ModalHeader toggle={this.ocultarModalInsertar}>Registrar vehículo</ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input type="text" className="form-control" name="id" value={this.state.form.id} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Capacidad:</label>
              <input type="text" className="form-control" name="capacidad" value={this.state.form.capacidad} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Color:</label>
              <input type="text" className="form-control" name="color" value={this.state.form.color} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Placa:</label>
              <input type="text" className="form-control" name="placa" value={this.state.form.placa} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Año:</label>
              <input type="text" className="form-control" name="year" value={this.state.form.year} onChange={this.handleChange} required />
            </FormGroup>

            <FormGroup>
              <label>Marca:</label>
              <input type="text" className="form-control" name="marca_vehiculo_id" value={this.state.form.marca_vehiculo_id} onChange={this.handleChange} required />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>Registrar</Button>
            <Button color="danger" onClick={this.ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Vehiculo;
