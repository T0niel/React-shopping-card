import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  if (error.status === 404) {
    error.message = 'This page does not exist';
  }

  return (
    <div className="bg-stone-800 min-h-[100vh] text-slate-100 flex flex-col justify-center items-center font-sans">
      <div className="w-100 text-center">
        <h1 className="text-[30px] p-2 text-red-500">Error</h1>
        <div className="text-xl flex justify-center">
          <p className="border-r-2 p-2">{error.message}</p>
          <p className="p-2">{error.status}</p>
        </div>
      </div>
    </div>
  );
}
