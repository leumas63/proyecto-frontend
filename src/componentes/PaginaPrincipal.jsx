import React from 'react';
import logo from '../imagenes/logo-1.png'
function PaginaPrincipal() {
    return (

        <div className="container mt-5">
            <img src={logo} alt="logo de la empresa" style={{ width: '70%', height: '70%', display: 'block', margin: 'auto' }} />
        
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1 className="mb-4">Misión</h1>
                    <p>
                        En nuestra empresa nos enfocamos en cosechar y comercializar los productos e insumos apícolas,
                        siempre con la más alta calidad e inocuidad, con el fin de garantizar productos 100% confiables
                        para la satisfacción de nuestro consumidor.
                    </p>
                </div>
                <div className="col-12 col-md-6">
                    <h1 className="mb-4">Visión nuevo valor</h1>
                    <p>
                        En el año 2025, nuestra empresa será la más reconocida en el sector a nivel nacional gracias a
                        su innovación y capacidad de generar productos 100% naturales y saludables. Aspiramos a mantener
                        nuestro crecimiento y estabilidad financiera para seguir brindando lo mejor a nuestros clientes.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaginaPrincipal;