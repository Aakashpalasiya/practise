import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import OrganizationList from "./components/OrganizationList";
import AddOrganization from "./components/AddOrganization";


const Auth = ({ element }) => {
  let token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
    return <Login/>
    
  }
  return <>{element}</>;
};


const AppRouter = createBrowserRouter([{ path: "/", element: <Login /> },
{ path: "/organizationList", element: <Auth element={<OrganizationList />}/> },
{ path: "/addOrganization", element: <Auth element={<AddOrganization />}/> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
};

export default App;
