import React from 'react'
import Joi from "joi-browser";

import categoryService from '../services/categoryService';
import Form from "./common/form";

const defaultCategory = {id: 0, name: "Any", value:""};

export default class QuizForm extends Form {
    BASE_DIFFICULTIES = [
        {id: 0, name: "random", value: ""},
        {id: 1, name: "easy", value: "easy"},
        {id: 2, name: "medium", value: "medium"},
        {id: 3, name: "hard", value: "hard"},
    ];

    state = {
        data: {
            qAmount: 10,
            category: defaultCategory.value,
            difficulty: this.BASE_DIFFICULTIES[0].value,
        },
        errors: {},
        inputs: [
            {path: "qAmount", name: "qAmount", type: "number", label: "Number of questions"}
        ],
        selects: [
            {
                path: "category", name: "category", label: "Category", type: "", options: []
            },
            {
                path: "difficulty", name: "difficulty", label: "Difficulty", type: "", capitalize: true, options: this.BASE_DIFFICULTIES
            }
        ]
    }

    schema = {
        qAmount: Joi.number().min(1).max(50).required().label("Number of questions"),
        category: Joi.string().allow(null),
        difficulty: Joi.string().allow(null),
    }

    async componentDidMount() {
        const insertDefaultCategory = categories => [defaultCategory, ...categories];

        const {data} = await categoryService.getCategories();

        const newState = {...this.state};
        newState.selects[0].options = insertDefaultCategory(data.trivia_categories);

        this.setState(newState)
    }

    doSubmit() {
        this.props.onSubmit(this.state.data);
    }

    render() {
        const {selects, inputs} = this.state;

        return (
            <form className="header" onSubmit={this.handleSubmit}>
                <h1>Quizer 3000</h1>
                {selects.map(sel => this.renderSelect(sel))}
                {inputs.map(i => this.renderInput(i))}
                {this.renderButton("Generate!")}
            </form>
        )
    }
}
