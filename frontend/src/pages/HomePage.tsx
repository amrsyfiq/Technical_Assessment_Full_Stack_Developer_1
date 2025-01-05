import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hook';
import { useSelector } from 'react-redux';
import { fetchItems } from '../features/items/item.thunk';
import { RootState } from '../app/store';
import ItemTable from '../components/ItemTable';
import ItemForm from '../components/ItemForm';
import { Item } from '../features/items/item.type';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleEdit = (itemId: number) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      setEditingItem(item); // Pre-fill form with item data
      setShowForm(true); // Show form in edit mode
    }
  };
  
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className='w-full h-full flex items-center min-h-screen overflow-y-auto bg-gray-50'>
      <div className='max-w-7xl w-full mx-auto p-4'>
        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow rounded-lg mb-4 w-full p-8">
          <div className='grid grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-0'>
            <div className='flex col-span-2'>
              <span className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Our products
                  <p className="mt-1 text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of items designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
              </span>
            </div>
            <div className='flex justify-end items-center'>
            <button onClick={() => {
                setShowForm(!showForm); // Toggle form
                setEditingItem(null); // Reset form
              }}
              className="px-4 z-30 py-2 bg-blue-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-600 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700">
              <i className={`fas ${showForm ? 'fa-close rotate-90' : 'fa-add rotate-0'} transition-transform duration-1000`}></i>
            </button>
            </div>
          </div>
          {showForm && (
            <div className="mb-4">
              <ItemForm
                initialData={editingItem}
                onComplete={() => {
                  setShowForm(false); // Close form
                  setEditingItem(null); // Reset form
                  dispatch(fetchItems()); // Refresh the item list
                }}
              />
            </div>
          )}
          <ItemTable items={items} onEdit={handleEdit}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;