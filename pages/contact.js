import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import { SvgIcons } from '../utils/svgIcons';

export default function Contact() {
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = ({ name, email, message }) => {
    if (name == '' || email == '' || message == '') {
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    setError('');
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate({ ...state }) === true) {
      const { email, name, message } = state;

      const websiteUrl = 'https://www.misaaka.in';

      var templateParams = {
        subject: 'www.misaaka.in',
        user_name: name,
        user_email: email,
        message: message,
      };
      setLoading(true);

      emailjs
        .send(
          process.env.EMAIL_JS_SERVICE_ID,
          process.env.EMAIL_JS_TEMPLATE_ID,
          templateParams
        )
        .then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text);
            setState({
              name: '',
              email: '',
              message: '',
            });
            setSuccess('Message sent');
            setLoading(false);
          },
          function (error) {
            console.log('FAILED...', error);
            setLoading(false);
            setError('Message not sent');
          }
        );
    } else {
      setError('one of the field is missing*');
    }
    setInterval(() => setSuccess(''), 6000);
  };
  return (
    <div className="max-w-screen-xl p-4">
      <h1 className="text-heading text-xl border-b my-4">Contact</h1>
      <div className="w-full flex flex-col items-center justify-between my-20">
        <div className="w-full flex flex-col w-full lg:items-center lg:flex-row lg:justify-between">
          <div className="w-[100%] h-[800px] md:w-[100%] md:h-[650px] lg:w-[60%] relative">
            <Image
              src="/static/about/contactus.jpg"
              layout="fill"
              className="w-max object-cover md:object-contain lg:object-cover"
            />
          </div>
          <div className="w-[100%] md:w-[100%] lg:w-[100%] flex flex-col lg:flex-row lg:items-center justify-center items-start p-4 lg:p-10 bg-rose-50 ml-0 -mt-[200px] lg:mt-0  lg:-ml-10 z-10 lg:rounded-lg lg:drop-shadow-xl">
            <div className="pl-4 lg:p-0">
              <div className="flex items-center mb-5">
                <span className="fill-rose-400">{SvgIcons.CallMeIcon}</span>
                <span className="flex flex-col items-start justify-center pl-2">
                  <h2 className="text-lg text-heading">Call me</h2>
                  <p className="text-caption">+919599719227</p>
                </span>
              </div>
              <div className="flex items-center mb-5">
                <span>{SvgIcons.EmailIcon}</span>
                <span className="flex flex-col pl-2">
                  <h2 className="text-lg text-heading">Email</h2>
                  <p className="text-caption">akanshaniranjan19@gmail.com</p>
                </span>
              </div>
              <div className="flex items-center mb-5">
                <span>{SvgIcons.LocationIcon}</span>
                <span className="flex flex-col pl-2">
                  <h2 className="text-lg text-heading">Location</h2>
                  <p className="text-caption">
                    Amrapali platinam sector 119,
                    <br /> Noida, India
                  </p>
                </span>
              </div>
            </div>
            <div className="w-full lg:w-[350px] p-4 m-0 mt-4 lg:m-4 lg:ml-8 rounded">
              <form className="w-auto">
                <div className="border rounded bg-rose-300 flex flex-col px-3 py-2 mb-5">
                  <label className="text-dark">Name</label>
                  <input
                    type="name"
                    name="name"
                    required
                    value={state.name}
                    onChange={handleChange}
                    className="bg-inherit text-dark focus:text-dark"
                  />
                </div>
                <div className="border rounded bg-rose-300 flex flex-col text-caption px-3 py-2 mb-5">
                  <label className="text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={state.email}
                    onChange={handleChange}
                    className="bg-inherit text-dark focus:text-dark"
                  />
                </div>
                <div className="border rounded   bg-rose-300 flex flex-col px-3 py-2 mb-5">
                  <label htmlFor="message" className="text-dark">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    cols="50"
                    className="bg-inherit text-dark focus:text-dark"
                    value={state.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  className={`w-full bg-rose-400 text-white font-bold flex justify-center py-3 my-4 px-4 rounded ease-in duration-150 hover:bg-rose-500  ${
                    loading ? 'pointer-events-none' : 'pointer-events-auto'
                  }`}
                  onClick={handleSubmit}
                >
                  Send Message
                  {loading ? (
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
              {error !== '' && (
                <span className="text-red-500 bg-white p-0  px-2 border-l-2 border-red-500">
                  {error}
                </span>
              )}
              {success !== '' && (
                <span className="text-green-00 bg-white py-1 px-2 border-l-2 border-green-500">
                  {success}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
