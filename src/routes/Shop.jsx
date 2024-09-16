import { useCallback, useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';
import Card from '../components/Card';
import Detail from '../components/Detail';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import fetchProductData from '../js/fetchProductData';
import fetchCategories from '../js/fetchCategories';
import { setupMain } from '@testing-library/user-event/dist/cjs/setup/setup.js';

async function getCategories() {
  const categories = await fetchCategories();
  return categories.map((category) => ({ category, selected: true }));
}

const viewAmount = 30;
export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const moreBtn = useRef(null);
  const [settings, setSettings] = useState({
    min: 0,
    max: Infinity,
    search: '',
    from: 0,
    to: viewAmount,
    loading: false,
    allProductsDisplayed: false,
  });

  const fetchProducts = useCallback(() => {
    async function getProducts() {
      const data = await fetchProductData(
        settings.from,
        settings.to,
        settings.search,
        settings.min,
        settings.max,
        categories
      );
      if (data) {
        setProducts(() => [...data.products]);
      }
    }

    getProducts();
  }, [
    categories,
    settings.from,
    settings.to,
    settings.min,
    settings.max,
    settings.search,
  ]);

  useEffect(() => {
    let stop = false;
    const fetchCategoriesAsync = async () => {
      const categories = await getCategories();
      if (!stop) {
        setCategories(categories);
      }
    };

    fetchCategoriesAsync();

    return () => {
      stop = true;
    };
  }, []);

  const updateField = (field, value) => {
    setSettings((prevState) => ({ ...prevState, [field]: value }));
  };

  useEffect(() => {
    fetchProducts();
  }, [
    settings.search,
    settings.min,
    settings.max,
    settings.from,
    settings.to,
    categories,
    fetchProducts,
  ]);

  useEffect(() => {
    updateField('from', 0);
    updateField('to', viewAmount);
  }, [categories]);

  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <div className="max-w-[1700px] m-auto">
        <Navigation
          shoppingOnClick={() => {}}
          cartAmount={0}
          links={navigationLinks}
        ></Navigation>

        <div className="p-2 mobile:pr-12 mobile:pl-12 pr-5 pl-5">
          <div className="flex flex-col desktop:flex-row gap-5">
            <div className="flex-1 bg-gray-200 h-min rounded">
              <Detail text="Search">
                <div className="p-2">
                  <CustomInput
                    placeholder="Search"
                    type="text"
                    onChange={(value) => {
                      setProducts([]);
                      updateField('search', value);
                    }}
                  />
                </div>
              </Detail>
              <Detail text="Sort">
                <div className="flex flex-col gap-1 p-2 font-semibold font-sans">
                  <CustomButton
                    onClick={() => {
                      const tmp = [...products];
                      setProducts(
                        tmp.sort((a, b) => (a.price > b.price ? 1 : -1))
                      );
                    }}
                    text="Lowest to highest"
                  />
                  <CustomButton
                    onClick={() => {
                      const tmp = [...products];
                      setProducts(
                        tmp.sort((a, b) => (a.price < b.price ? 1 : -1))
                      );
                    }}
                    text="Highest to lowest"
                  />
                </div>
              </Detail>
              <Detail text="Price">
                <div className="flex gap-2 p-2">
                  <CustomInput
                    placeholder="Min"
                    type="text"
                    onChange={(value) => {
                      setProducts([]);
                      updateField('min', Number(value));
                    }}
                  />
                  <CustomInput
                    placeholder="Max"
                    type="text"
                    onChange={(value) => {
                      setProducts([]);
                      if (value === '') {
                        updateField('max', Infinity);
                        return;
                      }
                      
                      updateField('max', Number(value));
                    }}
                  />
                </div>
              </Detail>
              <Detail text="Category" maxHeightPixels={1600}>
                <div className="border-t-2 border-gray-300 flex flex-col">
                  {categories.map((currCategory) => (
                    <div
                      key={currCategory.category}
                      className="w-[100%] border-[1px] p-2 font-semibold text-center  "
                    >
                      <div className="flex gap-2 m-[auto] w-[70%]">
                        <input
                          id={currCategory.category}
                          type="checkbox"
                          checked={currCategory.selected}
                          onChange={() => {
                            const tmp = [...categories];
                            setCategories(
                              tmp.map((item) => {
                                if (item.category === currCategory.category) {
                                  return {
                                    ...item,
                                    selected: !item.selected,
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        ></input>
                        <label htmlFor={currCategory.category}>
                          {currCategory.category}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </Detail>
            </div>
            <div className="flex-[4]">
              <div className="flex gap-1 justify-center pb-3">
                <button
                  aria-label="previous products"
                  className="text-black pl-4 pr-4 pt-2 pb-2 border-2 border-gray-600 rounded font-semibold opacity-70 hover:opacity-100"
                  onClick={() => {
                    updateField(
                      'from',
                      Math.max(settings.from - viewAmount, 0)
                    );
                    updateField('to', Math.max(settings.from, viewAmount));
                  }}
                >
                  Prev
                </button>
                <button
                  aria-label="next products"
                  className="text-black pl-4 pr-4 pt-2 pb-2 border-2 border-gray-600 rounded font-semibold opacity-70 hover:opacity-100"
                  ref={moreBtn}
                  onClick={() => {
                    if (products.length) {
                      updateField('from', settings.to);
                      updateField('to', settings.to + viewAmount);
                    }
                  }}
                >
                  Next
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
                  />
                ))}
              </div>

              {products.length === 0 && (
                <div className="flex justify-center items-center min-h-[60vh] text-3xl">
                  <h1 className="font-bold">
                    Could not find any more products
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
