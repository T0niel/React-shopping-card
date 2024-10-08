import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-[100vh] bg-gradient-to-br from-slate-100 to-gray-300 font-sans">
      <div className="max-w-[1700px] m-auto">
        <Navigation
          shoppingOnClick={() => {}}
          links={navigationLinks}
        ></Navigation>
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
          <h1 className="text-2xl tablet:text-4xl text-center font-bold animate-popBounce">
            Welcome to a fake shopping page
          </h1>
          <button
            className="text-sm tablet:text-xl mt-6 opacity-90 hover:opacity-100 bg-green-500 tablet:p-2 p-1 text-white rounded shadow-sm hover:scale-105 transition ease-in-out delay-50"
            onClick={() => {
              navigate('/shop');
            }}
          >
            Start buying now
          </button>
        </div>
      </div>
    </div>
  );
}
