import React from 'react';
import moment from 'moment';

export default function Playground() {
  const Now = moment('2022-03-22T10:41:16.687+00:00').format('ll');
  console.log('now', Now);
  return <div>adfas</div>;
}
