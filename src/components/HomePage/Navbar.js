import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const userSignOut = () =>{
    signOut(auth)
  }
  return (
<div class="navbar justify-between">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Home</a></li>
        <li><a>DashBord</a></li>
        <li><a>DashBord</a></li>
        <li><a>DashBord</a></li>
        <li><a>DashBord</a></li>
      </ul>
    </div>
    <h1 class="text-2xl font-bold">Car Home</h1>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0 mx-10">
      <li><Link to='/'>Home</Link></li>
      {user && <li><Link to='/purchaes/itemId'>Purchase</Link></li>}
      {
        user && <li><Link to='/dashbord'>Dashbord</Link></li>
      }
      <li><Link to='/blogs'>Blogs</Link></li>
  
      {/* <li><Link to='/dashbord'>My Protfolio</Link></li> */}
      {
        user?
        <button className='btn btn-accent btn-circle' onClick={userSignOut}>sign out</button>
        :
        <li><Link to='/login'>Login</Link></li>
        }
    </ul>
  </div>
</div>
  );
};

export default Navbar;