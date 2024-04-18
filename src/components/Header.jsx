import logoImg from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header className='fixed right-0 top-0 left-0 w-[200px] mx-auto mt-10'>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <img className='w-16 h-16' src={logoImg} alt='Quiz logo' />
        <h1 className=' bg-gradient-to-br from-[#e781fb] to-[#8e76fa] text-transparent text-3xl bg-clip-text'>
          کوییز روز
        </h1>
      </div>
    </header>
  );
}