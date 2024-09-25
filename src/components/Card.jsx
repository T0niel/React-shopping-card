import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ name, imgUrl, price, category, productId }) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  return (
    <div
      className="relative font-sans p-2 rounded opacity-95 hover:opacity-100 transition ease-in-out delay-100 bg-gray-50 shadow-sm shadow-slate-200 cursor-pointer animate-pop"
      onClick={() => {
        navigate(`/product/${productId}`, { replace: true });
      }}
    >
      {loading && (
        <div className="loader absolute top-0 left-0 right-0 bottom-0 -z-10 flex justify-center items-center m-[auto]"></div>
      )}
      <img
        src={imgUrl}
        alt={category + ' ' + name}
        className={`w-[100%] mb-4 h-48 object-cover rounded animate-pop ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}
        onLoad={() => {
          setLoading(false);
        }}
      ></img>
      <div className="flex">
        <p className="font-bold font-mono text-xl">{price}</p>€
      </div>
      <p className="text-gray-700">{category}</p>
      <p className="font-medium">{name}</p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  productId: PropTypes.number,
};
