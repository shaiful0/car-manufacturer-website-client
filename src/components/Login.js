import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from './ParchasePage/Loading';
import useToken from './hooks/useToken';


const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user1, error1, 
  ] = useSignInWithEmailAndPassword(auth);
  
  const [token] = useToken(user || user1);
  let signInError;
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (token ) {
    navigate(from, { replace: true });
  }
  if(loading){
    return <Loading></Loading>
  }
  
  if (error || error1) {
    signInError = <small><p className='text-red-500'>{error?.message || error1?.message}</p></small>
  }



  const handleSubmit =  event =>{
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // console.log(email, password);
     signInWithEmailAndPassword(email, password);
     navigate('/')
     navigate(from, { replace: true });
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" ref={emailRef} placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
              <label className="label">
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" ref={passwordRef} placeholder="Your Password" className="input input-bordered w-full max-w-xs" />
              <label className="label">
              </label>
            </div>
            {signInError}
            <input className='btn w-full max-w-xs text-white' type="submit" value='Login' />
          </form>
          
          <p className='text-black'>New to Doctors Portal <Link className='text-secondary' to='/register'>Create New Account</Link></p>
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;