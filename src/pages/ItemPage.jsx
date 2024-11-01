import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ItemPage = ({ deleteItem }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useLoaderData();

  const onDeleteClick =async (itemId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
    );

    if (!confirm) return;
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete the item.');
      }
  
      toast.success('Item deleted successfully');
      navigate('/items'); // Navigate to item listings page
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete the item. Please try again.');
    }
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/items'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Item Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                
                <h1 className='text-3xl font-bold mb-4'>{item.title}</h1>
             
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Item Description
                </h3>

                <p className='mb-4'>{item.body}</p>

              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
         

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Item</h3>
                <Link
                  to={`/edit-item/${item.id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Update Item
                </Link>
                <button
                  onClick={() => onDeleteClick(item.id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Item
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const itemLoader = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const data = await res.json();
  return data;
};

export { ItemPage as default, itemLoader };
