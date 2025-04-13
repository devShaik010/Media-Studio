import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home';
import Article from '@pages/Article';
import CategoryPage from '@pages/CategoryPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:slug",
    element: <Article />,
  },
  {
    path: "/category/:categoryId",
    element: <CategoryPage />,
  }
]);