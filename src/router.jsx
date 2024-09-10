import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import Shop from './routes/Shop';
import Error from './routes/Error'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path: '/shop',
        element: <Shop/>
    }
])

export default router;