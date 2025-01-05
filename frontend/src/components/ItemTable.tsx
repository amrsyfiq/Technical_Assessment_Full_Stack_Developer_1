import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hook';
import { deleteItemById } from '../features/items/item.thunk';
import { Item } from '../features/items/item.type';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';


interface ItemTableProps {
  items: Item[];
  onEdit: (id: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, onEdit }) => {
  const dispatch = useAppDispatch();
  const datatableRef = useRef<DataTable | null>(null);

  useEffect(() => {
    const tableDOM = document.getElementById("items-table");

    if (items.length > 0 && tableDOM) {
      if (!datatableRef.current){
        datatableRef.current = new DataTable("#items-table", {
          paging: true,
          perPage: 5,
          searchable: true,
          sortable: true,
        });
      } else {
        datatableRef.current.refresh();
      }
    }
  }, [items]);

  const handleDelete = (id: number) => {
    console.log('masuk');
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItemById(id));
        new DataTable("#items-table", {
          searchable: true,
          sortable: true,
        });
        Swal.fire({
          title: "Item Deleted Successfully!",
          text: "The item has been removed from the list.",
          icon: "info",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 2000,
          showConfirmButton: true,
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto p-1">
      <table id="items-table" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 rounded-l-lg">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No entries available</td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' data-index={index}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4 gap-2 flex">
                  <button onClick={() => onEdit(item.id)}
                    className="px-4 z-30 py-2 bg-blue-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-600 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="px-4 z-30 py-2 bg-red-500 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-red-600 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
