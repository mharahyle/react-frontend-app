import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import NotFoundPage from './pages/NotFoundPage';
import ItemPage, { itemLoader } from './pages/ItemPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';

const App = () => {
  // Add New Item
  const addItem = async (newItem) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    return;
  };

  // Delete Item
  const deleteItem = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts//api/items/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Item
  const updateItem = async (item) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/items' element={<ItemsPage />} />
        <Route path='/add-item' element={<AddItemPage addItemSubmit={addItem} />} />
        <Route
          path='/edit-item/:id'
          element={<EditItemPage updateItemSubmit={updateItem} />}
          loader={itemLoader}
        />
        <Route
          path='/items/:id'
          element={<ItemPage deleteItem={deleteItem} />}
          loader={itemLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
