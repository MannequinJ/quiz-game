import React from "react";

export default function AnswerOption(props) {
  // console.log(props.elData);
  function showErrors() {
    let style;
    if (props.answer === props.correct_answer) {
      style = {
        backgroundColor: "green",
      };
    } else if (props.elData.isHeld && props.answer !== props.correct_answer) {
      style = {
        backgroundColor: "red",
      };
    }
    return style;
  }

  const styles = {
    backgroundColor: props.elData.isHeld ? "#293264" : "",
    color: props.elData.isHeld ? "white" : "",
  };
  return (
    <button
      className="answer-option"
      onClick={() => props.setIsHeld(props.data, props.id)}
      disabled={props.gameIsEnded}
      style={props.gameIsEnded ? showErrors() : styles}
    >
      <p>
        {props.answer
          .replace(/&quot;/g, "")
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, "&")}
      </p>
    </button>
  );
}
