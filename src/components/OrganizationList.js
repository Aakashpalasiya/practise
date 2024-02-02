import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrganizationList = () => {
  const [orgdata, setOrgdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from local storage
        const token = JSON.parse(localStorage.getItem("token"));

        // Make a GET request with Axios, including token in headers
        const response = await axios.get(
          "http://122.170.12.63:90/api/Organization/getAllOrganization",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrgdata(response.data.data);
      } catch (error) {
        // Handle error
        console.error("There was a problem fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end items-end">
          <button
            onClick={() => navigate("/addOrganization")}
            className="border-2 rounded-2xl bg-blue-400 hover:bg-blue-300 text-sm font-semibold py-4 px-5"
          >
            Add Organization
          </button>
          <button
            onClick={logout}
            className="border-2 rounded-2xl bg-blue-400 hover:bg-blue-300 text-sm font-semibold py-4 px-5"
          >
            LOGOUT
          </button>
        </div>
        <div>
          <table className="min-w-fit items-center justify-center text-center bg-white border border-black shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-400 text-white text-xs">
                <th className="py-4 px-4 border border-black min-w-36">
                  Organization Name
                </th>
                <th className="py-4 px-4 border border-black min-w-36">
                  Short Name
                </th>
                <th className="py-4 px-4 border border-black min-w-36">URL</th>
                <th className="py-4 px-4 border border-black min-w-36">Logo</th>
              </tr>
            </thead>
            <tbody>
              {orgdata?.slice(1, 4)?.map((data, index) => (
                <tr key={index} className="bg-gray-100 text-xs">
                  <td className="py-4 px-4 border border-black whitespace-normal">
                    {data.organizationName}
                  </td>
                  <td className="py-4 px-4 border border-black whitespace-normal">
                    {data.organizationShortName}
                  </td>
                  <td className="py-4 px-4 border border-black whitespace-normal">
                    {data.organizationURL}
                  </td>
                  <td className="py-4 px-4 border border-black whitespace-normal">
                    {data.organizationLOGO}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationList;
