import { ShoppingBag, ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

const links = [
  {
    to: '/',
    name: 'Home',
    id: uuid4(),
  },
  {
    to: 'shop',
    name: 'Shop',
    id: uuid4(),
  },
];

export default function Navigation({ shoppingOnClick }) {
  return (
    <nav className="h-16 pr-12 pl-12 pt-4 pb-4 font-sans flex">
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
        <button aria-label="shopping card">
          <ShoppingBasket ></ShoppingBasket>
        </button>
        <p className="font-mono text-gray-500 text-[18px]">2</p>
      </div>
    </nav>
  );
}
