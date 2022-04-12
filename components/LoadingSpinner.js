import React from 'react';

export default function LoadingSpinner({ className }) {
  return (
    <span className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={`animate-spin ${className} mx-1`}
      >
        <circle cx="12" cy="20" r="2"></circle>
        <circle cx="12" cy="4" r="2"></circle>
        <circle cx="6.343" cy="17.657" r="2"></circle>
        <circle cx="17.657" cy="6.343" r="2"></circle>
        <circle cx="4" cy="12" r="2.001"></circle>
        <circle cx="20" cy="12" r="2"></circle>
        <circle cx="6.343" cy="6.344" r="2"></circle>
        <circle cx="17.657" cy="17.658" r="2"></circle>
      </svg>{' '}
    </span>
  );
}
