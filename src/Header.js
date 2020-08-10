import React, { useRef } from "react";

export default function Header({ handleSubmit, categories }) {
  export const categoryEl = useRef();
  export const amountEl = useRef();

  return (
    <form className="header" onSubmit={handleSubmit}>
      <div className="input_wrapper">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map((categ) => {
            return (
              <option key={categ.id} value={categ.id}>
                {categ.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input_wrapper">
        <label htmlFor="amountQuest">Number of questions</label>
        <input
          type="number"
          min="1"
          step="1"
          defaultValue={10}
          ref={amountEl}
        ></input>
      </div>
      <div className="input_wrapper">
        <button type="submit">Generate!</button>
      </div>
    </form>
  );
}
