// src/Signup.js
import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useDropzone } from "react-dropzone";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    setCsvFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("User created successfully!");
      if (csvFile) {
        uploadCSVFile(data.user.id);
      }
    }
  };

  const uploadCSVFile = async (userId) => {
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:3002/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessage(`${result.message}`);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSignup}>
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
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {csvFile ? (
            <p>{csvFile.name}</p>
          ) : (
            <p>Drag 'n' drop a CSV file here, or click to select one</p>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;
