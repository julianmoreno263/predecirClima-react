import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({ resultado }) => {
	//extraemos las propiedades name y main del state resultado
	const { name, main } = resultado;

	//evaluamos si el usuario ya realizo una consulta y escogio un nombre de ciudad
	if (!name) return null;

	//grados kelvin
	const kelvin = 273.15;

	return (
		<div className="card-panel white col s12">
			<div className="black-text">
				<h2>El clima de {name} es: </h2>
				<p className="temperatura">
					{parseFloat(main.temp - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
				</p>

				<p>
					Temperatura Máxima
					{parseFloat(main.temp_max - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
				</p>

				<p>
					Temperatura Mínima
					{parseFloat(main.temp_min - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
				</p>
			</div>
		</div>
	);
};

//documentacion con prop types
Clima.propTypes = {
	resultado: PropTypes.object.isRequired,
};

export default Clima;
