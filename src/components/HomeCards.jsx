import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card>
            <h2 className='text-2xl font-bold'>For Existing Items</h2>
            <p className='mt-2 mb-4'>
              Browse ourItem Catalog
            </p>
            <Link
              to='/items'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Browse Items
            </Link>
          </Card>
          <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>For New Item</h2>
            <p className='mt-2 mb-4'>
              Create a new item and enjoy our platform
            </p>
            <Link
              to='/add-item'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Add Item
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
