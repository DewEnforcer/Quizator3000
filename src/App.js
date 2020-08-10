import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import FlashcardList from "./FlashcardList";
import Loader from "./image/loading.gif";
const BASE_DIFFICULTIES = ["random", "easy", "medium", "hard"];

function App() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const categoryEl = useRef();
  const amountEl = useRef();
  const difficultyEl = useRef();
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        const newCategories = [
          { id: 0, name: "Any" },
          ...data.trivia_categories,
        ];
        setCategories(newCategories);
      });
  }, []);

  function decodeString(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.innerHTML;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const difficultyQuery =
      difficultyEl.current.value === "random"
        ? ""
        : "&difficulty=" + difficultyEl.current.value;
    const query = `amount=${amountEl.current.value}&category=${
      categoryEl.current.value + difficultyQuery
    }`;
    fetch(`https://opentdb.com/api.php?${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(
          data.results.map((item, index) => {
            const answer = decodeString(item.correct_answer);
            const options = [
              ...item.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(item.question),
              answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
        setLoading(false);
      });
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <h1>Quizer 3000</h1>
        <div className="input_wrapper" id="category_wrapper">
          <label htmlFor="category">Category:</label>
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
        <div className="input_wrapper" id="amount_wrapper">
          <label htmlFor="amountQuest">Number of questions:</label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>
        <div className="input_wrapper" id="difficulty_wrapper">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            className="upper_letter"
            id="difficulty"
            ref={difficultyEl}
            defaultValue={BASE_DIFFICULTIES[0]}
          >
            {BASE_DIFFICULTIES.map((diff, index) => {
              return (
                <option className="upper_letter" key={index} value={diff}>
                  {diff}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Generate!</button>
      </form>
      <div className="container">
        {isLoading && <img src={Loader} alt="Loading..." className="loader" />}
        <FlashcardList questions={questions} />
      </div>
    </>
  );
}

export default App;
