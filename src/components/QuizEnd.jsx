import finishedImg from '../assets/quiz-complete.png';

export default function QuizEnd() {
  return (
    <div className='flex text-2xl w-full h-full justify-center items-center'>
      <div className='flex flex-col text-stone-300 gap-10 mt-16 w-[500px] bg-purple-900 items-center justify-center p-7 rounded-2xl'>
        <img src={finishedImg} className='w-[160px]' alt='finish' />
        <h2>کوییز به پایان رسید</h2>
      </div>
    </div>
  );
}
