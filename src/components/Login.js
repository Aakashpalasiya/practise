import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
    organizationUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://122.170.12.63:90/api/auth/login', formdata);

      if (response.data.success) {
        alert("Login successful");
        localStorage.setItem('token', JSON.stringify(response.data.auth_token));
        navigate('/organizationList');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setError(error)
    }
  };

  return (
    
  





<div className="flex mt-10 items-center justify-center">
<form onSubmit={submitData}>
    <div className="flex gap-2">
        <div className="flex flex-col items-end gap-2">
            <span>Email</span>
            <span>Password</span>
            <span>Organization Url</span>
        </div>
        <div className="flex flex-col gap-2">
            <input
                className="border border-black"
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
            />
            <input
                className="border border-black"
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="***********"
                required
            />
            <input
                className="border border-black"
                type="text"
                name="organizationUrl"
                value={formdata.organizationUrl}
                onChange={handleChange}
                placeholder="https://c/e9-4d/"
                required
            />
            <button className="mt-4 w-1/2 bg-gray-500 text-xs font-bold py-3 px-4 hover:bg-gray-400" type="submit">Login</button>
        </div>
    </div>
    {error && <div className="text-red-500">{error}</div>}
</form>
</div>



  );
};

export default Login;
