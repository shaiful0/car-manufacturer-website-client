import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({user}) => {
  const {email ,role} = user;
  const makeAdmin =() =>{
    fetch(`https://afternoon-hamlet-58806.herokuapp.com/user/admin/${email}`,{
      method: 'PUT',
      headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      
      toast.success('successfully made an admin')
    })
  }
  return (
    <tr>
    <th>1</th>
    <td>{email}</td>
    <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}</td>
    <td><button className="btn btn-xs">Remove user</button></td>
  </tr>
  );
};

export default UserRow;