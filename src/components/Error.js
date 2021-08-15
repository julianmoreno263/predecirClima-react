import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ mensaje }) => {
	return <p className="red darken-4 error">{mensaje}</p>;
};

//documentacion con prop types
Error.propTypes = {
	mensaje: PropTypes.string.isRequired,
};

export default Error;
