'use client';

import React, { useState } from 'react';

type LocationInputProps = {
  onAddressSelect: (address: string) => void;
};

const LocationInput = ({ onAddressSelect }: LocationInputProps) => {
  const [address, setAddress] = useState('');

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await res.json();
          if (data.results.length > 0) {
            const fetchedAddress = data.results[0].formatted_address;
            setAddress(fetchedAddress);
            onAddressSelect(fetchedAddress);
          } else {
            alert('Could not fetch address. Please try typing manually.');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          alert('Could not fetch address. Please try typing manually.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get location.');
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    onAddressSelect(e.target.value);
  };

  return (
    <div className='flex flex-col sm:flex-row items-stretch gap-3 w-full'>
      <input
        type='text'
        placeholder='Enter your address...'
        value={address}
        onChange={handleChange}
        className='flex-1 border border-gray-300 rounded-md px-4 py-3 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary'
      />
      <button
        type='button'
        onClick={handleUseCurrentLocation}
        className='bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-3 rounded-md transition whitespace-nowrap'
      >
        📍 Use Current Location
      </button>
    </div>
  );
};

export default LocationInput;
