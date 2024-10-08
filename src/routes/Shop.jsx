import { useState } from 'react';
import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';
import Card from '../components/Card';
import Settings from '../components/Settings';
import { X } from 'lucide-react';

const viewAmount = 30;
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //This is for pagination
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(viewAmount);

  const [displayMobileSetting, setDisplayMobileSetting] = useState(false);

  return (
    <div className="bg-gray-100 min-h-[100vh] font-sans">
      <div className="max-w-[1700px] m-auto">
        <Navigation
          shoppingOnClick={() => {}}
          links={navigationLinks}
        ></Navigation>

        {/*This is for the mobile settings*/}
        {displayMobileSetting && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(57,49,49,0.5)] z-10">
            <div className="fixed overflow-auto bg-gray-100 p-2 border-2 bottom-0 top-28 rounded-md left-0 right-0 z-10">
              <X
                className="ml-auto mr-2 cursor-pointer mb-2"
                stroke="#303030"
                onClick={() => {
                  setDisplayMobileSetting(!displayMobileSetting);
                }}
              ></X>
              <div className="max-w-[1000px] m-auto">
                <Settings
                  setProducts={setProducts}
                  products={products}
                  from={from}
                  to={to}
                  setLoading={setLoading}
                ></Settings>
              </div>
            </div>
          </div>
        )}

        <div className="p-2 mobile:pr-12 mobile:pl-12 pr-5 pl-5">
          <div className="flex flex-col desktop:flex-row gap-5">
            <button
              className="w-20 m-[auto] desktop:hidden p-1 rounded border-2 border-green-300  text-gray-700"
              onClick={() => {
                setDisplayMobileSetting(!displayMobileSetting);
              }}
            >
              Filter
            </button>

            <div className="hidden desktop:block flex-1">
              <Settings
                setProducts={setProducts}
                products={products}
                from={from}
                to={to}
                setLoading={setLoading}
              ></Settings>
            </div>

            <div className="flex-[4]">
              <div className="flex gap-4 justify-center pb-3">
                <button
                  aria-label="previous products"
                  className="text-black text-3xl font-semibold opacity-70 hover:opacity-100 hover:text-green-400"
                  onClick={() => {
                    setFrom(Math.max(from - viewAmount, 0));
                    setTo(Math.max(from, viewAmount));
                  }}
                >
                  {'<'}
                </button>
                <button
                  aria-label="next products"
                  className="text-black text-3xl font-semibold opacity-70 hover:opacity-100 hover:text-green-400"
                  onClick={() => {
                    if (products.length) {
                      setFrom(to);
                      setTo(to + viewAmount);
                    }
                  }}
                >
                  {'>'}
                </button>
              </div>

              <div className="grid grid-cols-auto-fit">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    name={product.title}
                    imgUrl={product.thumbnail}
                    price={product.price}
                    category={product.category}
                    productId={product.id}
                  />
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                  <span className="loader"></span>
                </div>
              ) : (
                products.length === 0 && (
                  <div className="flex justify-center items-center min-h-[60vh] text-3xl">
                    <h1 className="font-bold text-center">
                      Could not find any more products
                    </h1>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
