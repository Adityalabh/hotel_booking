import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  
  const [userName ,setuserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect ,setRedirect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      await axios.post('/register', { userName, email, password });
      alert("Registration successful");
      setuserName('');
      setEmail('');
      setPassword('');
    }catch(e){
      alert("registration failed");
    }
    setRedirect(true);
  };

  if(redirect){
    return <Navigate to={'/account/places'}/>
  }
  
  return (
    <div className="mt-4   flex justify-center min-h-screen ">
      <div className="mt-10">
        <h1 className="text-4xl text-center mb-5">Register</h1>
        <form className="max-w-md h-auto mb-11" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="userName"
            value={userName}
            onChange={e => setuserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />  
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary">Register</button>

          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black ml-2" to={`/Login`}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
