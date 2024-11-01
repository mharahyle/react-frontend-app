import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddItemPage = ({ addItemSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newItem = {
      title,
      body,
      userId,
    };

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST', // Use PATCH if you want partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
  
      if (!res.ok) {
        throw new Error('Failed to create the item.');
      }
  
      toast.success('Item created Successfully');
      navigate(`/items`); // Navigate to the updated item's details page
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update the item. Please try again.');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Item</h2>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
               Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Body
              </label>
              <textarea
                id='body'
                name='body'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='A description of the Title'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
User Id              </label>
              <input
                type='text'
                id='userId'
                name='userId'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='User Id'
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddItemPage;
