import { ShoppingBasket } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ShoppingCart } from '../App';
import CartSideBar from './CartSideBar';

const Navigation = ({ links = [] }) => {
  const [shopIconColor, setShopIconColor] = useState('black');
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const { cart } = useContext(ShoppingCart);

  return (
    <nav className="h-16 mobile:pr-12 mobile:pl-12 pr-5 pl-5 pt-4 pb-4 font-sans flex">
      <ul className="flex gap-2 text-gray-700 font-medium">
        {links.map(({ id, to, name }) => (
          <li key={id}>
            <Link
              to={to}
              className="hover:text-green-400 transition ease-in-out duration-300"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex gap-2 items-center">
        <button
          aria-label="shopping card"
          onClick={() => {
            setDisplaySideBar(true);
          }}
          onMouseEnter={() => setShopIconColor('green')}
          onMouseLeave={() => setShopIconColor('black')}
        >
          <ShoppingBasket stroke={shopIconColor}></ShoppingBasket>
        </button>
        <p className="font-mono text-gray-600 text-[18px]">
          {cart.reduce((acc, item) => {
            return acc + item.amount;
          }, 0)}
        </p>
      </div>
      {displaySideBar && <CartSideBar setSideBarDisplay={setDisplaySideBar} />}
    </nav>
  );
};

Navigation.propTypes = {
  shoppingOnClick: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navigation;
