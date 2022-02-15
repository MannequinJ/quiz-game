import React from "react";

export default function Game(props) {
  return (
    <div className="game">
      {props.questionElements}

      {props.correctAnswersCountIsShown ? (
        <div className="footer">
          <div>You scored {props.correctAnswersCount}/5 correct answers</div>
          <button className="button-big" onClick={props.playAgain}>
            Play again
          </button>
        </div>
      ) : (
        <button className="button-big" onClick={props.checkAnswers}>
          Check answers
        </button>
      )}
    </div>
  );
}
