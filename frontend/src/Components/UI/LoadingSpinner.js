import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingSpinner({ size = 32, color = '#3b82f6', text = 'Loading...', className = '', fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'} ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        <ClipLoader size={size} color={color} />
        {text ? <p className="text-gray-500">{text}</p> : null}
      </div>
    </div>
  );
}
export default LoadingSpinner;