import React from 'react';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

function GlobalLoaderOverlay() {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <LoadingSpinner fullScreen text="Please wait..." />
    </div>
  );
}

export default GlobalLoaderOverlay;


