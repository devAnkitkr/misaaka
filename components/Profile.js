import React, { useState } from 'react';
import EditProfile from './EditProfile';
import ProfileCard from './ProfileCard';

export default function Profile() {
  const [isEditProfile, setisEditProfile] = useState(false);

  const handleEditProfile = () => {
    setisEditProfile(!isEditProfile);
  };
  return (
    <div className="w-full flex flex-col justify-start items-center min-h-[400px] mb-4">
      <h1 className="w-full text-center my-6 bg-rose-300 text-white p-4 mt-0">
        Profile
      </h1>
      {isEditProfile ? (
        <EditProfile setisEditProfile={setisEditProfile} />
      ) : (
        <ProfileCard setisEditProfile={setisEditProfile} />
      )}
    </div>
  );
}
