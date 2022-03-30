import React from 'react';
import moment from 'moment';

export default function Playground() {
  const Now = moment('2022-03-22T10:41:16.687+00:00').format('ll');
  console.log('now', Now);
  const myArr = ['Ankit', 'kumar', 'chandra'];
  const yourArr = ['Rajesh', 'kumar', 'sharma'];
  console.log(
    'every array',
    myArr.every((item, index) => item + index)
  );
  return <div>adfas</div>;
}
