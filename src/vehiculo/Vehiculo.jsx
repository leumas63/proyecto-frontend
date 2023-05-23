import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const data = [
  { capacidad: 1500.00, color: "balnco", placa: "DER774", year: 2000, marca_vehiculo_id: 1, id: 1 }
];

class Vehiculo extends React.Component {
  state = {
    data: data,
    form: {
      capacidad: '',
      color: '',
      placa: '',
      year: '',
      marca_vehiculo_id: '',
      id: ''
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
          <Button color="success" onClick={() => this.mostrarModalInsertar()}> Registrar vehiculo </Button>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th style={{ padding: 10}}>Id</th>
                <th style={{ padding: 10}}>Placa</th>
                <th style={{ padding: 10}}>Color</th>
                <th style={{ padding: 10}}>Year</th>
                <th style={{ padding: 10}}>Marca_vehiculo_id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td style={{ padding: 5}}>{elemento.id}</td>
                  <td style={{ padding: 10}}>{elemento.placa}</td>
                  <td style={{ padding: 10}}>{elemento.color}</td>
                  <td style={{ padding: 10}}>{elemento.year}</td>
                  <td style={{ padding: 10}}>{elemento.marca_vehiculo_id}</td>
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
              <label>placa:</label>
              <input type="text" className="form-control" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Color:</label>
              <input type="password" className="form-control" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Marca_vehiculo_id:</label>
              <input type="password" className="form-control" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Year:</label>
              <select className="form-control">
                <option value="">Seleccionar...</option>
                {Array.from({ length: 54 }, (_, i) => i + 1970).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
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

export default Vehiculo;