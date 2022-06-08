import React from "react";

export const AddUser = ({ onAdd }) => {

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onAdd(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit} className='border border-indigo-500 p-5 rounded-md'>
      <div className='flex items-center justify-between w-full'>
        <input className="border-2 border-indigo-500 rounded-md w-full p-3" placeholder="Name" name="name" required/>
        <input className="border-2 border-indigo-500 rounded-md ml-2 w-full p-3" placeholder="Email" name="email" required/>
        
        <button className='bg-purple-500 text-white px-4 py-3 rounded-md ml-2 w-1/2' onSubmit={handleOnSubmit}>Add user</button>
      </div>
    </form>
  );
};
