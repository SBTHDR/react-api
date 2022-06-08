import React, { useState } from "react";

export const User = ({ name, email, id, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
    onDelete(id);
  };

  const handleOnEditSubmit = (e) => {
    e.preventDefault();

    onEdit(id, e.target.name.value, e.target.email.value);
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <div className='flex items-center justify-between w-full'>
            <input placeholder="Name" name="name" defaultValue={name} className='border-2 border-indigo-500 rounded-md w-full p-3' />
            <input placeholder="Email" name="email" defaultValue={email} className='border-2 border-indigo-500 rounded-md ml-2 w-full p-3' />

            <button onSubmit={handleOnEditSubmit} className='bg-purple-500 text-white px-4 py-3 rounded-md ml-2 w-1/2'>Update</button>
            <button onClick={() => setIsEdit(false)} className='bg-gray-700 text-white px-4 py-3 rounded-md ml-2 w-1/2'>cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between mb-2 border-b p-2">
          <span className="text-lg">{name}</span>
          <span className="text-lg">{email}</span>
          <div className=" space-x-2">
            <button onClick={handleEdit} className='bg-purple-500 text-white px-4 py-3 rounded-md'>Edit</button>
            <button onClick={handleDelete} className='bg-red-400 text-white px-4 py-3 rounded-md'>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
