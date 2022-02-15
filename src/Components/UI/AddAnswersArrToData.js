import { nanoid } from "nanoid";

const AddAnswersArrToData = (data) => {
  const editedFullArr = data.map((el) => {
    const answersArr = [...el.incorrect_answers, el.correct_answer].sort(
      (a, b) => 0.5 - Math.random()
    );
    const answers = answersArr.map((answer) => ({
      answer: answer,
      isHeld: false,
      id: nanoid(),
    }));
    return { ...el, answers };
  });
  return editedFullArr;
};
export default AddAnswersArrToData;
