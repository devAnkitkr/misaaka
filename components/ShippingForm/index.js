import React, { useState, useContext, useRef } from 'react';
import { ShopContext } from '../../utils/shopContext';
import SnackBar from '../SnackBar';
import CustomInput from './customInput';

export default function ShippingForm() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    mobile: '',
    pinCode: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
  });

  const { dispatch } = useContext(ShopContext);
  const snackBarRef = useRef(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: form });
    snackBarRef.current.show();
  };
  return (
    <div>
      <SnackBar ref={snackBarRef} message="Address saved!" type="SUCCESS" />
      <form onSubmit={handleFormSubmit}>
        <h2 className="text-heading text-sm">Contact Details</h2>
        <div className="w-full">
          <CustomInput
            type="email"
            name="email"
            label="Email*"
            placeholder=""
            value={form.email}
            handleInputChange={handleInputChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required={true}
          />
        </div>
        <div>
          <CustomInput
            type="name"
            name="name"
            label="Name*"
            placeholder=""
            value={form.name}
            handleInputChange={handleInputChange}
            required={true}
          />
        </div>
        <div>
          <CustomInput
            type="text"
            name="mobile"
            label="Mobile*"
            placeholder=""
            value={form.mobile}
            handleInputChange={handleInputChange}
            required={true}
          />
        </div>
        <h2 className="text-heading text-sm">Address</h2>
        <div>
          <CustomInput
            type="text"
            name="pinCode"
            label="Pin Code*"
            placeholder=""
            value={form.pinCode}
            handleInputChange={handleInputChange}
            required={true}
            minlength="6"
          />
        </div>
        <div>
          <CustomInput
            type="text"
            name="address"
            label="Address (House No, Building, Street, Area)**"
            placeholder=""
            value={form.address}
            handleInputChange={handleInputChange}
            minlength="6"
          />
        </div>
        <div>
          <CustomInput
            type="text"
            name="city"
            label="City"
            placeholder=""
            value={form.city}
            handleInputChange={handleInputChange}
            minlength="3"
          />
        </div>
        <div>
          <CustomInput
            type="text"
            name="state"
            label="State"
            placeholder=""
            value={form.state}
            handleInputChange={handleInputChange}
          />

          <CustomInput
            type="text"
            name="country"
            label="Country"
            placeholder=""
            value={form.country}
            handleInputChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          className="w-max rounded bg-rose-400 px-10 py-2 my-4 text-white font-bold hover:bg-rose-500 transition-[bg-color] ease-in duration-150"
          value=" SAVE / EDIT"
          // onClick={(e) => handleFormSubmit(e)}
        />
      </form>
    </div>
  );
}
