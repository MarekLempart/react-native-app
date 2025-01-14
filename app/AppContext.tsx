import React, { createContext, useContext, useState } from 'react';

interface AppState {
  photo: string | null;
  location: { latitude: number; longitude: number } | null;
  setPhoto: (photo: string | null) => void;
  setLocation: (location: { latitude: number; longitude: number } | null) => void;
  resetData: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const resetData = () => {
    setPhoto(null);
    setLocation(null);
  };

  return (
    <AppContext.Provider value={{ photo, location, setPhoto, setLocation, resetData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
