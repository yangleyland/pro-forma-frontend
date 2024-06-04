import React, { useState, useEffect } from "react";
// import supabase from '../supabaseClient';
// import useUserStore from '../store/useUserStore';
import useAuthStore from "../store/useAuthStore";
import LoginForm from "../components/LoginForm";

function Login() {
  const { login, getUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginstatus = await login(email, password);
      const loggedInUser = getUser();
      if (loginstatus) {
        setMessage("User logged in successfully!");
      } else {
        setMessage("Error logging in");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full flex">
      <div className="bg-black flex-1"></div>
      <div className="bg-white flex-1 flex justify-center items-center">
        <div className="w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
