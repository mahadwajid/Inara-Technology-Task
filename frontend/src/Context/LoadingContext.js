import React, { createContext, useContext, useState, useMemo } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({
    isLoading,
    showLoader: () => setIsLoading(true),
    hideLoader: () => setIsLoading(false),
  }), [isLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);


