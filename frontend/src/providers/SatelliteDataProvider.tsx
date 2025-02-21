import React, { createContext, useCallback, useContext, useState } from 'react';
import { Position } from '../types';
import { ISSSatelliteService } from '../services/satellites/ISS';

export type SatelliteDataContextType = {
  ISSPositionsHistory: Position[];
  fetchLatestISSPosition: () => Promise<Position>;
};

const satelliteDataContext = createContext<SatelliteDataContextType>({
  ISSPositionsHistory: [],
  fetchLatestISSPosition: () => {
    throw Error('not implemented');
  },
});

export const useSatelliteData = () => {
  return useContext(satelliteDataContext);
};

const issSatelliteService = new ISSSatelliteService();

export const SatelliteDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ISSPositionsHistory, setISSPositionsHistory] = useState<Position[]>(
    []
  );

  const fetchLatestISSPosition = useCallback(async () => {
    const position = await issSatelliteService.getNowPosition();
    const normalizedPosition = {
      lat: position.latitude,
      lng: position.longitude,
      timestamp: position.timestamp,
    };
    setISSPositionsHistory(prev => [...prev, normalizedPosition]);
    return normalizedPosition;
  }, []);

  return (
    <satelliteDataContext.Provider
      value={{ ISSPositionsHistory, fetchLatestISSPosition }}
    >
      {children}
    </satelliteDataContext.Provider>
  );
};
