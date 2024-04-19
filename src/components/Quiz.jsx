import { useState, useCallback, useEffect, useRef } from 'react';
import QUESTIONS from '../utility/questions';

import QuestionTimer from './QuestionTimer';
import QuizEnd from './QuizEnd';

const timeout = 10000;

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState('');
  const [timerKey, setTimerKey] = useState(false);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const isQuizEnded = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(answer) {
      if (answerState) {
        return;
      }
      setAnswerState('answered!');

      setUserAnswers((prev) => {
        return [...prev, answer];
      });

      setTimeout(() => {
        if (QUESTIONS[activeQuestionIndex].answers[0] === answer) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          shuffledAnswers.current = null;
          setAnswerState('');
          setTimerKey((prev) => !prev);
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex, answerState]
  );

  const skipQuestion = useCallback(() => {
    setUserAnswers((prev) => {
      return [...prev, 'null'];
    });
    shuffledAnswers.current = null;
    if (answerState === '') {
      setTimerKey((prev) => !prev);
    }
  }, [answerState]);

  if (isQuizEnded) {
    return <QuizEnd />;
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers].sort(
      () => Math.random() - 0.5
    );
  }

  return (
    <div className='w-[550px] mx-auto text-2xl flex flex-col gap-7 bg-gradient-to-br from-[#3e2a60] to-[#321061] p-10 rounded-2xl mt-14'>
      <p className='text-stone-300'>
        {activeQuestionIndex + 1}: {QUESTIONS[activeQuestionIndex].text}
      </p>
      <ul className='text-[19px] flex flex-col gap-4 '>
        {shuffledAnswers.current.map((answer, index) => {
          const isSelected = answer === userAnswers[userAnswers.length - 1];
          let cssClass = '';
          if (answerState === 'answered!' && isSelected) {
            cssClass = 'bg-[#f5a76c]';
          }

          if (answerState === 'correct' && isSelected) {
            cssClass = 'bg-[#5af59d]';
          }

          if (answerState === 'wrong' && isSelected) {
            cssClass = 'bg-[#f55a98]';
          }
          return (
            <li key={index}>
              <button
                className={`bg-[#6cb7f5] hover:bg-[#9d5af5] transition-colors duration-300 py-1.5 px-4 w-full text-right rounded-2xl ${cssClass} `}
                onClick={() => handleSelectedAnswer(answer)}
              >
                {index + 1}: {answer}
              </button>
            </li>
          );
        })}
      </ul>
      <QuestionTimer
        key={timerKey}
        timeout={timeout}
        handleTimeout={skipQuestion}
      />
    </div>
  );
}
