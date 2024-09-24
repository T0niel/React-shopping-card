import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';
import { useContext, useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import PropTypes from 'prop-types';
import { ShoppingCart } from '../App';

export default function ProductPage() {
  const { cart, setCart } = useContext(ShoppingCart);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(0);
  const [savedItem, setSavedItem] = useState(null);

  useEffect(() => {
    setAmount(savedItem ? savedItem.amount : 0);
  }, [savedItem]);

  const addProduct = (amount) => {
    if(amount > 1){
      setCart(cart.map(item => {
        if(item.id === product.id){
          return {id: item.id, amount}
        }

        return item;
      }));
    }

    if(amount === 1){
      setCart([...cart, {id: product.id, amount}])
    }
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSavedItem(cart.find((item) => item.id === product.id));
    }
  }, [cart, productId, product]);

  return (
    <div className="bg-gray-50">
      <div className="min-h-[100vh] max-w-[1700px] m-auto">
        <Navigation
          shoppingOnClick={() => {}}
          links={navigationLinks}
        ></Navigation>
        <div>
          {product ? (
            <>
              <div className="desktop:flex pl-10 pr-10">
                <div className="mr-auto flex-1 flex justify-center items-center">
                  <div className="desktop:w-[50%] tablet:w-[60%] w-[100%] aspect-square">
                    <h1 className="text-center mb-2 text-2xl font-medium text-slate-600">
                      {product.title}
                    </h1>
                    <ImageCarousel
                      imgs={product.images.map((img) => ({
                        src: img,
                        alt: 'product image',
                      }))}
                    ></ImageCarousel>
                  </div>
                </div>

                <div className="desktop:w-[420px] tablet:w-[70%] mobile:m-auto mobile:mt-4">
                  <div className="bg-gray-100 shadow-sm h-[100%] pt-2 pb-2 pr-4 pl-4 rounded mb-5">
                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field data={product.price} title={'Price'} />
                    </div>
                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field
                        data={product.stock}
                        title={'Stock'}
                        extraDataStyleTailwind={
                          product.stock ? 'text-green-600' : 'text-red-600'
                        }
                      />
                    </div>
                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field
                        data={product.warrantyInformation}
                        title={'Warranty information'}
                      />
                    </div>
                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field
                        data={product.shippingInformation}
                        title={'Shipping information'}
                      />
                    </div>
                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field
                        data={product.returnPolicy}
                        title={'Return policy'}
                      />
                    </div>

                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field data={product.dimensions.width} title={'Width'} />
                    </div>

                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field
                        data={product.dimensions.height}
                        title={'Height'}
                      />
                    </div>

                    <div className="border-b-[1px] pb-2 border-slate-200">
                      <Field data={product.dimensions.depth} title={'Depth'} />
                    </div>

                    {product.stock - amount > 0 ? (
                      <button
                        onClick={() => {
                          let newAmount = amount + 1;
                          setAmount(newAmount);
                          addProduct(newAmount);
                        }}
                        className="block bg-green-400 p-2 font-serif font-bold mt-2 text-white rounded opacity-80 hover:opacity-100 transition-opacity ease-in-out delay-100"
                      >
                        Add one item to cart
                      </button>
                    ) : product.stock < 0 ? (
                      <div className="mt-2 text-md font-bold text-red-500">
                        No available stock
                      </div>
                    ) : (
                      <div className="mt-2 text-md font-bold text-green-500 text-center">
                        You have ordered all we had in stock. Await our
                        confirmation
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[100vh] font-bold text-2xl text-slate-500">
              <span className="loader"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Field = ({ title, data, extraDataStyleTailwind }) => {
  return (
    <div className="flex text-md p-1">
      <p>{title}: </p>
      <p className={`ml-auto ${extraDataStyleTailwind}`}>{data}</p>
    </div>
  );
};

Field.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
  extraDataStyleTailwind: PropTypes.string,
};
