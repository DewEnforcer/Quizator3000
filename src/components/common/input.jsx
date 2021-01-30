import React from 'react';

const Input = ({name, label, error, ...rest}) => {
    return (
    <div className="input_wrapper">
        <label htmlFor={name}>{label}</label>
        <input {...rest} className="form-control" name={name} id={name}/>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
    );
}
 
export default Input;