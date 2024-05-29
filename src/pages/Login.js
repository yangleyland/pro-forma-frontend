import React, { useState, useEffect } from 'react';
// import supabase from '../supabaseClient';
// import useUserStore from '../store/useUserStore';
import useAuthStore from '../store/useAuthStore';


function Login() {
  const {  login, getUser, initializeAuth } = useAuthStore();
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const setUser = useUserStore((state) => state.setUser);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data: { user }, error } = await supabase.auth.getUser();
  //     if (error) {
  //       console.error('Error fetching user:', error);
  //     } else {
  //       setUser(user);
  //     }
  //   };

  //   fetchUser();
  // }, [setUser]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  //   if (error) {
  //     setMessage(`Error: ${error.message}`);
  //   } else {
  //     setMessage('User logged in successfully!');
  //     setUser(data.user);
  //   }
  // };
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
