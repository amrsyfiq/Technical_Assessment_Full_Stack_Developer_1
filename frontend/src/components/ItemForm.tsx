import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hook';
import { createItem, updateItemById } from '../features/items/item.thunk';
import { Item } from '../features/items/item.type';

interface ItemFormProps {
  initialData?: Item | null;
  onComplete?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ initialData, onComplete }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setPrice(initialData.price ?? 0);
    } else {
      setName('');
      setDescription('');
      setPrice(0);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const item = { name, description, price };

    if (initialData) {
      dispatch(updateItemById({ ...initialData, ...item }));
    } else {
      dispatch(createItem(item));
    }

    onComplete?.();
  };

  return (
<form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter price"
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter description (optional)"
        />       
      </div>
      <div className='flex justify-end mt-4'>
        <button type="submit" className="inline-flex items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest rounded-md transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 border border-transparent focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          {initialData ? 'Update Item' : 'Create Item'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
