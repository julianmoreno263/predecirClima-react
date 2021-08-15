import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
	//state para manejar el error y ayudar a validar
	const [error, guardarError] = useState(false);

	//aplicamos destructuring del state busqueda
	const { ciudad, pais } = busqueda;

	//funcion que actualizara el state
	const handleChange = (e) => {
		guardarBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		});
	};

	//funcion que hace el submit del formulario
	const handleSubmit = (e) => {
		e.preventDefault();

		//validacion del formulario
		if (ciudad.trim() === '' || pais.trim() === '') {
			guardarError(true);
			return;
		}

		guardarError(false);

		//indica que se han enviado datos desde el formulario
		guardarConsultar(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<div className="input-field col s12">
				<input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange} />
				<label htmlFor="ciudad">Ciudad: </label>
			</div>

			<div className="input-field col s12">
				<select name="pais" id="pais" value={pais} onChange={handleChange}>
					<option value="">--Seleccione un país--</option>
					<option value="US">Estados Unidos</option>
					<option value="MX">México</option>
					<option value="AR">Argentina</option>
					<option value="CO">Colombia</option>
					<option value="CR">Costa Rica</option>
					<option value="ES">España</option>
					<option value="PE">Perú</option>
				</select>
				<label htmlFor="pais">País: </label>
			</div>

			<div className="input-field col s12">
				<input
					type="submit"
					value="Buscar Clima"
					className="waves-effect waves-light btn-large btn-block yellow accent-4"
				/>
			</div>
		</form>
	);
};

//documentacion con prop types
Formulario.propTypes = {
	busqueda: PropTypes.object.isRequired,
	guardarBusqueda: PropTypes.func.isRequired,
	guardarConsultar: PropTypes.func.isRequired,
};

export default Formulario;
