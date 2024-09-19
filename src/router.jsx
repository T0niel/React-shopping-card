import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import Shop from './routes/Shop';
import Error from './routes/Error'
import ProductPage from './routes/ProductPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path: '/shop',
        element: <Shop/>
    },
    {
        path: '/product/:productId',
        element: <ProductPage/>
    }
])

export default router;