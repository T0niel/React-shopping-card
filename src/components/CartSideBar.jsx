import { useContext, useEffect, useState } from 'react';
import { ShoppingCart } from '../App';
import { CreditCard, Trash, X } from 'lucide-react';
import PropTypes from 'prop-types';

const iconLight = '#475569';
const iconDark = '#0f172a';

export default function CartSideBar({ setSideBarDisplay }) {
  const { cart, setCart } = useContext(ShoppingCart);
  const [products, setProducts] = useState([]);
  const [err, setError] = useState(undefined);
  const [exitBtnClr, setExitBtnClr] = useState(iconLight);
  const [loading, setLoading] = useState(true);

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setProducts([]);
    setLoading(true);
    const productsPromises = cart.map((item) => {
      return fetch(`https://dummyjson.com/products/${item.id}`);
    });

    Promise.all(productsPromises)
      .then(async (products) => {
        const productsData = await Promise.all(
          products.map((item) => item.json())
        );
        return productsData;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, [cart]);

  function displayProducts() {
    if (products.length === 0) {
      return (
        <div className='h-full flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-red-600'>Cart is empty</h1>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-2">
        {products.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-gray-100 shadow-sm rounded relative m-2"
              >
                <div className="flex gap-2 p-2">
                  <img
                    src={item.thumbnail}
                    className="w-28 h-28 z-10 border-r-2"
                    alt="product"
                  />
                  <div>
                    <h1 className="font-bold w-[90%] text-gray-700">{item.title}</h1>
                    <p className="text-sm mt-5 text-gray-500">
                      Amount: {cart.find((curr) => item.id === curr.id).amount}
                    </p>
                    <p className="text-md font-semibold text-gray-500">
                      Price:{' '}
                      {cart.find((curr) => item.id === curr.id).amount *
                        item.price}
                    </p>
                  </div>
                  <div>
                    <button
                      className="absolute top-0 right-0 p-2 w-10 h-10"
                      aria-label={`remove from cart ${item.title}`}
                      onClick={() => {
                        removeFromCart(item.id);
                        setLoading(true);
                      }}
                    >
                      <Trash
                        stroke={iconLight}
                        width={20}
                        height={20}
                        strokeWidth={3}
                      ></Trash>
                    </button>
                  </div>
                </div>
              </div>
            );
          
        })}
      </div>
    );
  }

  return (
    <aside className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(57,49,49,0.5)] z-10">
      <div className="flex flex-col absolute right-0 h-full tablet:w-96 w-[100%] bg-gray-200 z-10 p-2">
        <button
          aria-label="exit"
          onMouseEnter={() => setExitBtnClr(iconDark)}
          onMouseLeave={() => setExitBtnClr(iconLight)}
          className="w-min p-2"
          onClick={() => setSideBarDisplay(false)}
        >
          <X stroke={exitBtnClr} />
        </button>
        <div className="flex-1 overflow-auto">
          {!err ? (
            !loading ? (
              displayProducts()
            ) : (
              <div className="loader m-auto"></div>
            )
          ) : (
            <p>error: {err.message}</p>
          )}
        </div>
        {!loading && (
          <div className="h-24 mt-2 border-2 border-gray-100 p-2">
            <p>
              Total:{' '}
              {cart.reduce((sum, item) => {
                console.log({ products });
                const product = products.find(
                  (product) => product.id === item.id
                );
                return product.price * item.amount + sum;
              }, 0)}
            </p>
            <button className="bg-green-500 w-[100%] flex p-2 text-gray-200 font-bold mt-2 rounded opacity-90 hover:opacity-100 transition-opacity ease-in-out delay-100">
              <p>Go to checkout</p>
              <div className="ml-auto">
                <CreditCard></CreditCard>
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

CartSideBar.propTypes = {
  setSideBarDisplay: PropTypes.func,
};
