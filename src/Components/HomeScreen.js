import React from "react";
export default function HomeScreen(props) {
  return (
    <div className="home-screen">
      <h1>Quizzical</h1>
      <p>Try to score 5/5 correct answers!</p>
      <button className="button-big" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}
