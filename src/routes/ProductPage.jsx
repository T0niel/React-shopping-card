import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import navigationLinks from '../navigationLinks';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      });
  }, [productId]);

  return (
    <div>
      <Navigation
        shoppingOnClick={() => {}}
        cartAmount={0}
        links={navigationLinks}
      ></Navigation>
      <div>
        {product ? (
          <div>
            <h1>{product.title}</h1>
          </div>
        ) : (
          <div className='flex items-center justify-center min-h-[100vh] font-bold text-2xl text-slate-500'>
            <span className='loader'></span>
          </div>
        )}
      </div>
    </div>
  );
}
