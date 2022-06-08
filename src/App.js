import React, { useEffect, useState } from "react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Get Users
  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  // Store User
  const onAdd = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        data.id = users.length + 1
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  // Edit User
  const onEdit = async (id, name, email) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
          }

          return user;
        });

        setUsers((users) => updatedUsers);
        console.log(users);
      })
      .catch((error) => console.log(error));
  };

  // Delete User
  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App container mx-auto">

      <div className='border border-indigo-500 p-3 rounded-md mt-5'>
        <h1 className="text-indigo-500 text-xl mb-2">Add User</h1>
        <AddUser onAdd={onAdd} />
      </div>

      <div className='border border-indigo-500 p-3 rounded-md mt-5'>
        <h1 className="text-indigo-500 text-xl mb-2">Users List</h1>
        <div className="flex justify-between items-center text-lg text-indigo-300 border border-indigo-500 rounded-md p-3 mb-2">
          <p>Name</p>
          <p>Email</p>
          <p>Action</p>
        </div>
        {users.map((user) => (
          <User
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

    </div>
  );
}
