import React, { useState, useContext, useRef } from 'react';
import { ShopContext } from '../utils/shopContext';
import { SvgIcons } from '../utils/svgIcons';
import axios from 'axios';
import SnackBar from './SnackBar';

export default function EditProfile({ setisEditProfile }) {
  const {
    state: { user },
    dispatch,
  } = useContext(ShopContext);
  const [formInfo, setFormInfo] = useState({ ...user });
  const [isLoading, setisLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const snackBarRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setisLoading(true);
    console.table('formInfo', formInfo);
    const { data } = await axios.put(
      '/api/update-profile',
      { ...formInfo },
      { headers: { authorization: `Bearer ${user.token}` } }
    );
    if (!data.token) {
      setMsg(data);
      snackBarRef.current.show();
    } else {
      dispatch({ type: 'UPDATE USER', payload: data });
      setisEditProfile(false);
    }

    return setisLoading(false);
  };
  return (
    <div className="bg-rose-100 min-w-[350px] mb-6 rounded-lg">
      <SnackBar ref={snackBarRef} message={msg} type="ERROR" />
      <form
        className="w-full p-4 flex flex-col justify-center items-center"
        onSubmit={handleEditProfile}
      >
        <h1 className="text-heading font-semibold text-xl my-4 mt-0 text-center">
          Edit Profile
        </h1>
        <div className="w-full border rounded bg-rose-300 flex flex-col text-caption px-3 py-2 mb-5">
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
        <div className="w-full border rounded bg-rose-300 flex flex-col text-caption px-3 py-2 mb-5">
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
        <div className="w-full border rounded   bg-rose-300 flex flex-col px-3 py-2 mb-5">
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
        <button
          className={`w-full bg-rose-400 text-white font-bold flex justify-center py-3 my-4 px-4 rounded ease-in duration-150 hover:bg-rose-500  ${
            isLoading ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
          type="submit"
        >
          Update
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
      </form>
    </div>
  );
}
