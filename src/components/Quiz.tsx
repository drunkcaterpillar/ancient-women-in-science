// src/components/Quiz.tsx
import React, { useState } from "react";
import { useModal } from "../context/ModalContext";

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { openModal } = useModal();

  const handleAnswerOptionClick = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
      openModal(
        <div className="vintage-modal">
          <h2>Quiz Completed</h2>
          <p>
            Your score: {score}/{questions.length}
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      {showScore ? (
        <div>Your score: {score}</div>
      ) : (
        <div>
          <div>{questions[currentQuestionIndex].question}</div>
          <div>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
