import axios from 'axios';
import React, { useState, useRef, useContext, useEffect } from 'react';
import Link from 'next/link';
import SnackBar from '../components/SnackBar';
import { ShopContext } from '../utils/shopContext';
import { SvgIcons } from '../utils/svgIcons';
import { useRouter } from 'next/router';

export default function Register() {
  const [formInfo, setFormInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { state, dispatch } = useContext(ShopContext);
  const snackBarRef = useRef(null);
  const passWordRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    state.user !== null && router.push('/');
  }, []);

  // input change handlers
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormInfo({ ...formInfo, [name]: value });
    // setError('');
    setisLoading(false);
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const { password, confirmPassword } = formInfo;
    if (password == confirmPassword) {
      const { data } = await axios.post('/api/register', { ...formInfo });
      console.log('response', data);
      if (!data.token) {
        setErrorMsg(data);
        snackBarRef.current.show();
      } else {
        dispatch({ type: 'SIGN IN', payload: data });
        router.push('/');
      }
    } else {
      setErrorMsg('Passwords not matching');
      passWordRef.current.show();
    }
    return setisLoading(false);
  };

  return (
    <div className="max-w-screen-xl p-4 flex flex-col justify-center items-center ">
      <SnackBar ref={snackBarRef} message={errorMsg} type="ERROR" />
      <SnackBar ref={passWordRef} message={errorMsg} type="ERROR" />
      <div className="w-full max-w-[450px] m-4 mt-20 py-6 px-4 rounded mx-auto bg-rose-50 drop-shadow-xl">
        <form className="w-full ">
          <h1 className="text-heading text-xl my-4 mt-0 text-center font-bold">
            SIGN UP
          </h1>
          <div className="border rounded bg-rose-300 flex flex-col px-3 py-2 mb-5">
            <label className="text-dark">Name</label>
            <input
              type="name"
              name="name"
              pattern="[A-Za-z]+"
              minLength={3}
              maxLength={8}
              required
              value={formInfo.name}
              onChange={handleChange}
              className="bg-inherit text-dark focus:text-dark"
            />
          </div>
          <div className="border rounded bg-rose-300 flex flex-col text-caption px-3 py-2 mb-5">
            <label className="text-dark">Email</label>
            <input
              type="email"
              name="email"
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
              required
              value={formInfo.email}
              onChange={handleChange}
              className="bg-inherit text-dark focus:text-dark"
            />
          </div>
          <div className="border rounded   bg-rose-300 flex flex-col px-3 py-2 mb-5">
            <label className="text-dark">Password</label>
            <input
              type="password"
              name="password"
              minLength={6}
              maxLength={20}
              required
              value={formInfo.password}
              onChange={handleChange}
              className="bg-inherit text-dark focus:textFdark"
            />
          </div>
          <div className="border rounded   bg-rose-300 flex flex-col px-3 py-2 mb-5">
            <label className="text-dark">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              minLength={6}
              maxLength={20}
              required
              value={formInfo.confirmPassword}
              onChange={handleChange}
              className="bg-inherit text-dark focus:text-dark"
            />
          </div>
          <button
            className={`w-full bg-rose-400 text-white font-bold flex justify-center py-3 my-4 px-4 rounded ease-in duration-150 hover:bg-rose-500  ${
              isLoading ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
            onClick={handleSubmit}
          >
            Sign up
            {isLoading ? (
              <span className="ml-2 animate-spin text-white">
                {SvgIcons.LoaderIcon}
              </span>
            ) : (
              <span className="ml-2 origin-center rotate-90 text-white">
                {SvgIcons.SendButtonIcon}
              </span>
            )}
          </button>
          <div className="text-caption text-sm text-center">
            Already a user then{' '}
            <Link href="/login">
              <a className="text-blue-400">Sign in</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
