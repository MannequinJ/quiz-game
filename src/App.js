import React from "react";
import Question from "./Components/Question";
import { nanoid } from "nanoid";
import HomeScreen from "./Components/HomeScreen";
import Game from "./Components/Game";
import Spinner from "./Components/Spinner";
import AddAnswersArrToData from "./Components/UI/AddAnswersArrToData";
const axios = require("axios").default;

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);
  const [answersData, setAnswersData] = React.useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const [gameIsEnded, setGameIsEnded] = React.useState(false);
  const [isDataLoading, setIsDataLoading] = React.useState(false);

  React.useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    setIsDataLoading(true);
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const arr = AddAnswersArrToData(res.data.results);
    setQuizData(arr);
    setAnswersData(
      arr.map((el) => ({
        id: nanoid(),
        answers: el.answers,
      }))
    );
    setIsDataLoading(false);
  };

  React.useEffect(() => {
    setQuizData((prevQuizData) =>
      prevQuizData.map((el, i) => ({ ...el, answers: answersData[i] }))
    );
  }, [answersData]);

  const handleClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const setIsHeld = (data, id) => {
    const editedArr = data.answers.map((el) =>
      el.id === id ? { ...el, isHeld: !el.isHeld } : { ...el, isHeld: false }
    );
    const finalObj = { ...data, answers: editedArr };
    let indexOfObj;
    setAnswersData((prevAnswersData) => {
      prevAnswersData.forEach((el, i) => el.id === data.id && (indexOfObj = i));
      const arr = [...prevAnswersData];
      arr.splice(indexOfObj, 1, finalObj);
      return arr;
    });
  };

  const checkAnswers = () => {
    let count = 0;
    const correctAnswersArr = quizData.map((el) => el.correct_answer);
    const choosenByUserAnswers = [];
    answersData
      .map((el) => el.answers)
      .map((el) =>
        el.map((el) => el.isHeld && choosenByUserAnswers.push(el.answer))
      );
    choosenByUserAnswers.forEach((el, i) => {
      el === correctAnswersArr[i] && count++;
    });
    setCorrectAnswersCount(count);
    setGameIsEnded(true);
    // setIsPlaying(false);
  };

  const playAgain = () => {
    setCorrectAnswersCount(0);
    setGameIsEnded(false);
    getFetchData();
  };

  const questionElements = quizData.map((quizEl) => (
    <Question
      key={nanoid()}
      data={quizEl}
      setIsHeld={setIsHeld}
      gameIsEnded={gameIsEnded}
    />
  ));
  return (
    <div className="main">
      {!isPlaying ? (
        <HomeScreen handleClick={handleClick} />
      ) : isDataLoading ? (
        <Spinner />
      ) : (
        <Game
          questionElements={questionElements}
          correctAnswersCountIsShown={gameIsEnded}
          checkAnswers={checkAnswers}
          playAgain={playAgain}
          correctAnswersCount={correctAnswersCount}
        />
      )}
    </div>
  );
}
