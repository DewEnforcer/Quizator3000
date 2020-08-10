import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ questions }) {
  return (
    <div className="card_box">
      {questions.map((question) => {
        return <Flashcard key={question.id} flashcard={question} />;
      })}
    </div>
  );
}
