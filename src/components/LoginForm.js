import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useYearOverYear from "../store/useYearOverYear";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const LoginForm = () => {
  const { login, getUser,isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const { controlsData, setControlsData, user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginStatus = await login(email, password);
      if (loginStatus) {
        navigate("/");
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Card className="h-full p-4">
      <CardHeader className="pb-14">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account
        </CardDescription>
        <p className="text-sm text-red-400">{message}</p>

      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Password</Label>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button type="submit">Login</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
