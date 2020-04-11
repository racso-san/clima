import React,{Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  const [busqueda,guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  const [consultar,guardarConsultar] = useState(false);
  const [resultado,guardarResultado] = useState({});

  const {ciudad,pais} = busqueda;

  useEffect (() => {
    const consultarAPI = async () => {
    
      if(consultar){ // Solo muestra si consulta es true
        const appId = '0107175d88b41900705d98cb99caa9cc';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        guardarResultado(resultado);
        guardarConsultar(false);
      }  

    }
    consultarAPI();
  },[consultar]); // Cuando "consultar" pasa a "true" , hace la consulta 

  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className0="row">
            <div className="col m5 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              <Clima
                resultado={resultado}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
