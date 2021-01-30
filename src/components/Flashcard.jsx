import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState("initial");
  const [selected, setSelected] = useState();
  const { question, answer, options } = flashcard;

  const frontC = useRef();
  const backC = useRef();

  function setMaxHeight() {
    const frontHeight = frontC.current.getBoundingClientRect().height;
    const backHeight = backC.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  function handleToggle(e) {
    const value = Number(e.target.value);
    setSelected(value);
  }

  useEffect(() => {
    setMaxHeight();
  }, [question, answer, options]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => {
      window.removeEventListener("resize", setMaxHeight);
    };
  }, []);

  return (
    <div
      className={`card ${
        flipped
          ? options[selected] === answer
            ? "flip correct"
            : "flip incorrect"
          : ""
      }`}
      onDoubleClick={() => setFlipped(!flipped)}
      style={{ height }}
    >
      <div className="front" ref={frontC}>
        {question}
        <div className="options">
          {options.map((item, index) => {
            return (
              <div className="option" key={index}>
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  value={index}
                  checked={selected === index ? true : false}
                  className="check_option"
                ></input>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backC}>
        {answer}
      </div>
    </div>
  );
}
