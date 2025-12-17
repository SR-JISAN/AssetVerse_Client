import { Building2, Logs, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [menu,setMenu]= useState(false)
   const link = (
     <>
       <NavLink to="/home">
         <li>Home</li>
       </NavLink>
       <NavLink to="/employee-Login">
         <li>Join as Employee</li>
       </NavLink>
       <NavLink to="/HR-Manager-Login">
         <li>Join as HR Manager</li>
       </NavLink>
     </>
   );
   

    return (
      <div className="shadow-sm">
        <div className="navbar mw">
          <div className="navbar-start">
            <div
              onClick={() => setMenu(!menu)}
              className="mr-2 relative lg:hidden"
            >
              {menu ? (
                <>
                  <X size={25} color="#3508d9" />
                  <ul className="menu top-10 flex flex-col gap-5 absolute menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {link}
                  </ul>
                </>
              ) : (
                <Logs size={25} color="#3508d9" />
              )}
            </div>
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <Building2 color="#251268" />
              <h1>
                Asset<span className="text-blue-950">Verse</span>
              </h1>
            </Link>
          </div>
          <div className="navbar-center hidden  lg:flex">
            <ul className="menu menu-horizontal flex gap-4 px-1">{link}</ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Navbar;