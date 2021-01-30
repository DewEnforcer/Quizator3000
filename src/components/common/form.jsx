import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    renderInput = ({path, name, label, type}) => {
        const {data, errors} = this.state;
        return <Input key={path} name={name} type={type} label={label} value={data[path]} error={errors[path]} onChange={this.handleChange} />
    }
    renderSelect = ({path, name, label, type, options, capitalize}) => {
        const {data, errors} = this.state;
        return <Select key={path} options={options} name={name} capitalize={capitalize} type={type} label={label} value={data[path]} error={errors[path]} onChange={this.handleChange} />        
    }
    renderButton = (label) => {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
        )
    }
    validate = () => {
        const valOptions = {abortEarly: false, allowUnknown: true};
        const {error} = Joi.validate(this.state.data, this.schema, valOptions);
        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    validatePropery = ({name, value}) => {
        const toValObj = {[name]: value};
        const subSchema = {[name]: this.schema[name]};
        const {error} = Joi.validate(toValObj, subSchema);
        return error ? error.details[0].message : null;
    }
    handleSubmit = (ev) => {
        ev.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return; 
        this.doSubmit();
    }
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validatePropery(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }
}
 
export default Form;