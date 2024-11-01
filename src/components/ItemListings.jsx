import { useState, useEffect } from 'react';
import ItemListing from './ItemListing';
import Spinner from './Spinner';

const ItemListings = ({ isHome = false }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page

  useEffect(() => {
    const fetchItems = async () => {
      const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Logic for pagination: Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Limit to first 3 items if on the homepage, otherwise use pagination
  const displayedItems = isHome ? items.slice(0, 3) : currentItems;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Items' : 'Browse Items'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {displayedItems.map((item) => (
                <ItemListing key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination Controls (only when not on the homepage) */}
            {!isHome && (
              <div className='flex justify-center mt-6 space-x-4'>
                <button
                  className='px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50'
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className='text-indigo-700 font-medium'>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className='px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50'
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemListings;
