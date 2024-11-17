import React, { useState } from 'react';
import { getUsers, saveUsers } from '../storage.js';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (users.some((user) => user.username === username)) {
      alert('Username already exists');
      return;
    }
    users.push({ username, password });
    saveUsers(users);
    alert('Registration successful');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
