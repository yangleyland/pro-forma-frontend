import React, { useState, useEffect } from 'react';
// import supabase from '../supabaseClient';
// import useUserStore from '../store/useUserStore';
import useAuthStore from '../store/useAuthStore';


function Login() {
  const {  login, getUser } = useAuthStore();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const loggedInUser = getUser();
      if (loggedInUser) {
        setMessage('User logged in successfully!');
      } else {
        setMessage('Error logging in');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Welcome to the Login Page!</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
