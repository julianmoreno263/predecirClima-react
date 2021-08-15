import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
	//state que guarda los datos del formulario
	const [busqueda, guardarBusqueda] = useState({
		ciudad: '',
		pais: '',
	});

	//state para indicarle a useEffect que se ha realizado un envio de datos
	const [consultar, guardarConsultar] = useState(false);

	//state para guardar el resultado de la consulta a la API
	const [resultado, guardarResultado] = useState({});

	//state para el error
	const [error, guardarError] = useState(false);

	//aplicamos destructuring del state busqueda
	const { ciudad, pais } = busqueda;

	//useEffect que llamara a la funcion que consultara a la API
	useEffect(() => {
		//creo la funcion que consulta a la API
		const consultarAPI = async () => {
			if (consultar) {
				const appId = '4868bbeccbf0457a3fedf2c8444b776f';
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				guardarResultado(resultado);
				//reiniciamos de nuevo el formulario para poder ejecutar otra consulta sin recargar
				guardarConsultar(false);

				//evalua si la consulta se ejecuto bien y hubo resultados correctos
				if (resultado.cod === '404') {
					guardarError(true);
				} else {
					guardarError(false);
				}
			}
		};

		//AQUI LLAMO A LA FUNCION QUE CONSULTA A LA API PARA QUE SE EJECUTE
		consultarAPI();
		//eslint-disable-next-line
	}, [consultar]);

	//carga condicional de componentes si la consulta se ejecuta bien o no.
	let componente;
	if (error) {
		componente = <Error mensaje="No hay resultados" />;
	} else {
		componente = <Clima resultado={resultado} />;
	}

	return (
		<Fragment>
			<Header titulo="Create React App" />
			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className=" col m6 s12">
							<Formulario
								busqueda={busqueda}
								guardarBusqueda={guardarBusqueda}
								guardarConsultar={guardarConsultar}
							/>
						</div>
						<div className=" col m6 s12">{componente}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
