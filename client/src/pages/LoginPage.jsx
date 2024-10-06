import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContextProvider";

const LoginPage = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  //it is setup so it will redirect to root page after login
  let [redirect, setRedirect] = useState(false);

  //grabbing the setUser from UserContextProvider
  const { setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/login", { email, password });

      //now here we passing the user data to usercontext provider
      setUser(userInfo.data);
      alert("login success");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
      console.log(e.message);
    }
  }

  //if redirect state is true then it will redirect to root page
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4  grow flex  justify-center min-h-screen">
      <div className="mb-11">
        <h1 className="text-4xl text-center mb-5">Login</h1>
        <form className="max-w-md h-auto mb-11" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary">Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black ml-1" to={`/register`}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
