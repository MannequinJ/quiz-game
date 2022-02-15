import React from "react";
import AnswerOption from "./AnswerOption";
import { nanoid } from "nanoid";
export default function Question(props) {
  // console.log(props.data);
  const answerOptionElements = props.data.answers.answers.map((el) => {
    return (
      <AnswerOption
        key={nanoid()}
        answer={el.answer}
        data={props.data.answers}
        elData={el}
        gameIsEnded={props.gameIsEnded}
        id={el.id}
        correct_answer={props.data.correct_answer}
        setIsHeld={props.setIsHeld}
      />
    );
  });

  return (
    <div className="block-question">
      <h1>
        {props.data.question
          .replace(/&quot;/g, "")
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, "&")}
      </h1>
      <div className="block--answer-options">{answerOptionElements}</div>
    </div>
  );
}
