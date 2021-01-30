import React, { useState } from "react";
import {ToastContainer} from "react-toastify";

import questionService from "./services/questionService";
import FlashcardList from "./components/FlashcardList";
import Loader from "./components/Loader";
import QuizForm from "./components/QuizForm";
import {decodeString} from "./utils/utils";
import LoadAnim from "./image/loading.gif";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const createQuestionObject = data => {
    return data.map((item, index) => {
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
  }
  const handleQuestionQuery = async (data) => {
    if (isLoading) return;

    const {qAmount, category, difficulty} = data;
  
    setLoading(true);
    
    const query = `amount=${qAmount}&category=${category}&difficulty=${difficulty}`;
    const result = await questionService.getQuestions(query);
    setQuestions(createQuestionObject(result.data.results));

    setLoading(false);
  }

  return (
    <>
      <ToastContainer/>
      <QuizForm onSubmit={handleQuestionQuery}/>
      <div className="container">
        <Loader visible={isLoading} LoadAnim={LoadAnim}/>
        <FlashcardList questions={questions} />
      </div>
    </>
  );
}

export default App;
