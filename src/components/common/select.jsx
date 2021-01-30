import React from 'react';

const Select = ({name, label, error, options, capitalize, ...rest}) => {
    return (
    <div className="input_wrapper">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" id={name} name={name} {...rest}>
            {options.map((o) => {
                return <option className={capitalize ? "upper_letter" : ""} key={o.id} value={o.value ? o.value : o.id}>{o.name}</option>
            })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
    );
}
 
export default Select;