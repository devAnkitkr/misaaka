import React from 'react';
import moment from 'moment';

export default function Playground() {
  const name = 'ankit';
  console.log(name.split('').reverse().join(''));

  return <div className="w-screen-lg mx-auto p-4">Playground</div>;
}
