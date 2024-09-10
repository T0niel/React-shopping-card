import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-[100vh] bg-gradient-to-br from-slate-100 to-lime-200">
      <div className="max-w-[1700px] m-auto">
        <Navigation></Navigation>
        <div className="min-h-[70vh] flex justify-center items-center">
          <h1 className="text-4xl text-center font-bold animate-popBounce">
            Welcome to a fake shopping page
          </h1>
        </div>
      </div>
    </div>
  );
}
