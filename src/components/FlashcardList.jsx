import React from "react";

import Flashcard from "./Flashcard";

export default function FlashcardList({ questions }) {
  return (
    <div className="card_box">
      {questions.map(q => <Flashcard key={q.id} flashcard={q}/>)}
    </div>
  );
}
