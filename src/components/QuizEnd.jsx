import finishedImg from '../assets/quiz-complete.png';
import QUESTIONS from '../utility/questions';

export default function QuizEnd({ userAnswers }) {
  return (
    <div className='flex text-2xl w-full h-full justify-center items-center'>
      <div className='flex flex-col text-stone-300 gap-7 my-48 w-[600px] bg-purple-900 items-center justify-center p-7 rounded-2xl'>
        <img src={finishedImg} className='w-[120px]' alt='finish' />
        <h2>کوییز به پایان رسید</h2>
        {QUESTIONS.map((question, index) => {
          return (
            <div
              className='w-full text-lg font-Dana flex flex-col gap-5'
              key={question.id}
            >
              <hr className='pt-3' />
              <p>
                سوال {index + 1}: {question.text}
              </p>
              <p>پاسخ شما: {userAnswers[index] ?? 'بدون پاسخ'}</p>
              <p>پاسخ درست: {question.answers[0]}</p>
              <p>
                {question.answers[0] === userAnswers[index]
                  ? 'تبریک پاسخ شما صحیح بود 🥳🟢'
                  : 'پاسخ شما به این سوال اشتباه بود 😥🔴'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
