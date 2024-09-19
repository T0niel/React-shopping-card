import { useCallback, useEffect, useState } from 'react';
import fetchProductData from '../js/fetchProductData';
import fetchCategories from '../js/fetchCategories';
import CustomInput from './CustomInput';
import Detail from './Detail';
import CustomButton from './CustomButton';
import PropTypes from 'prop-types';

async function getCategories() {
  const categories = await fetchCategories();
  return categories.map((category) => ({ category, selected: true }));
}

const viewAmount = 30;
export default function Settings({
  setProducts,
  products,
  from,
  to,
  setLoading,
}) {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    min: 0,
    max: Infinity,
    search: '',
    loading: false,
    allProductsDisplayed: false,
  });

  const fetchProducts = useCallback(() => {
    async function getProducts() {
      const data = await fetchProductData(
        from,
        to,
        settings.search,
        settings.min,
        settings.max,
        categories
      );
      if (data) {
        setLoading(false);
        setProducts(() => [...data.products]);
      }
    }

    getProducts();
    setLoading(true);
  }, [
    categories,
    settings.min,
    settings.max,
    settings.search,
    setProducts,
    from,
    to,
    setLoading,
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
    from,
    to,
    categories,
    fetchProducts,
  ]);

  useEffect(() => {
    updateField('from', 0);
    updateField('to', viewAmount);
  }, [categories]);
  return (
    <div className="bg-gray-200 h-min rounded">
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
              setProducts(tmp.sort((a, b) => (a.price > b.price ? 1 : -1)));
            }}
            text="Lowest to highest"
          />
          <CustomButton
            onClick={() => {
              const tmp = [...products];
              setProducts(tmp.sort((a, b) => (a.price < b.price ? 1 : -1)));
            }}
            text="Highest to lowest"
          />
          <CustomButton
            text="Relevance"
            onClick={() => {
              fetchProducts();
            }}
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
              <div className="flex gap-2">
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
  );
}

Settings.propTypes = {
  setProducts: PropTypes.func,
  setLoading: PropTypes.func,
  products: PropTypes.array,
  from: PropTypes.number,
  to: PropTypes.number,
};
