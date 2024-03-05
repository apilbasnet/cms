'use client';
import { Spinner } from '@/components/icons/icons';
import { Loading } from '@/components/loading';
import { useUser } from '@/lib/context/UserContext';
import Image from 'next/image';
import React from 'react';
import SwastikIcon from '@/components/icons/Swastik.png';
import { cn } from '@edge-ui/react';

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col min-w-[30%]">
        <div className="flex items-start bg-rose-600 px-8 py-4 rounded-t-lg gap-8">
          <Image src={SwastikIcon} alt="Swastik" className="invert h-22 w-28" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">SWASTIK COLLEGE</h1>
            <p className="text-sm text-white">Chardobato, Bhaktapur</p>
          </div>
        </div>
        <div className="bg-gray-200">
          <div className="my-2 bg-green-500 w-max mx-auto text-center uppercase text-black font-extrabold text-lg py-2 px-4">
            Identity Card
          </div>
          <div className="flex justify-between px-4 py-2">
            <div>
              <Field label="Name" value={user.name} />
              <Field label="Address" value={user.address} />
              <Field label="Email" value={user.email} />
              <Field label="Contact" value={user.contact} />
              <Field label="Role" value={user.role} />
            </div>
            <div className="h-24 w-24 bg-slate-500 text-white flex items-center justify-center">
              PHOTO
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-b-lg">
          <h1 className="text-white text-sm px-2 py-1">
            Ph: 0123456789, Email: contact@swastikcollege.edu.np, Website:
            swastikcollege.edu.np
          </h1>
        </div>
      </div>
    </div>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <h1 className="text-base">
      {label}:{' '}
      <span className={cn(`font-bold`, label === 'Name' && 'text-pink-700')}>
        {value}
      </span>
    </h1>
  );
}

export default ProfilePage;
