import { v1 as uuid} from 'uuid';

export default [
  {
    id: uuid(),
    to: '/',
    name: 'Home',
  },
  {
    id: uuid(),
    to: '/shop',
    name: 'Shop',
  },
];