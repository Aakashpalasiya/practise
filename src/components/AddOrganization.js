import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrganization = () => {
    const navigate =useNavigate()
    const [error, setError] = useState('');

  const [formdata, setFormdata] = useState({
    organizationName: "",
    organizationShortName: "",
    organizationURL: "",
    organizationLOGO: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation here (e.g., check character limits)
  
    try {
      // Get token from local storage
      const token = JSON.parse(localStorage.getItem('token'));
  
      // Make a POST request with Axios, including token in headers
      const response = await axios.post('http://122.170.12.63:90//api/Organization/addOrganization', formdata, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        // Store the token in localStorage
        alert(response.data.message);
       console.log(response)
        navigate('/organizationList');
      } else {
        // Handle unsuccessful login (optional)
        setError(error)
        alert(response.data.message);
      }
    } catch (error) {
      // Handle error
      setError(error)
    }
  };
   const cleandata=()=>{
    setFormdata({organizationName: "",
    organizationShortName: "",
    organizationURL: "",
    organizationLOGO: "",})
   }
  return (



<div className="flex mt-10 items-center justify-center">
<form onSubmit={handleSubmit}>
    <div className="flex gap-2">
        <div className="flex flex-col items-end gap-2">
            <span>Organization Name</span>
            <span>Organization Short  Name</span>
            <span>Organization URL</span>
            <span>Logo</span>
        </div>
        <div className="flex flex-col gap-2">
            <input
                className="border border-black"
                type="text"
                name="organizationName"
                value={formdata.organizationName}
                onChange={handleChange}
                placeholder="organization name"
                required
            />
            <input
                className="border border-black"
                type="text"
                name="organizationShortName"
                value={formdata.organizationShortName}
                onChange={handleChange}
                placeholder="abc"
                required
            />
            <input
                className="border border-black"
                type="text"
                name="organizationURL"
                value={formdata.organizationURL}
                onChange={handleChange}
                placeholder="https://wwww.ahx/"
                required
            />
              <input
                className="border border-black"
                type="text"
                name="organizationLOGO"
                value={formdata.organizationLOGO}
                onChange={handleChange}
                placeholder="https;//imges.logo.com"
                required
            />
             <div className='flex justify-between items-center gap-5'>
             <button className="mt-4 w-1/2 bg-gray-500 text-xs font-bold py-3 px-4 hover:bg-gray-400" type="submit">save</button>
            <button onClick={cleandata} className="mt-4 w-1/2 bg-gray-500 text-xs font-bold py-3 px-4 hover:bg-gray-400" type="button">Cancel</button>
             </div>

        </div>
    </div>
    {error && <div className="text-red-500">{error}</div>}
</form>
</div>

  );
};

export default AddOrganization;
