import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Position } from '../types/types';
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

// Custom hook to access satellite data context
export const useSatelliteData = () => {
  return useContext(satelliteDataContext);
};

const issSatelliteService = new ISSSatelliteService();

export const SatelliteDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Store ISS position history in a Map with timestamp as key
  const [ISSPositionsHistoryMap, setISSPositionsHistoryMap] = useState<
    Map<number, Position>
  >(new Map());

  // Fetch and store the latest ISS position
  const fetchLatestISSPosition = useCallback(async () => {
    const position = await issSatelliteService.getNowPosition();
    const normalizedPosition = {
      lat: position.latitude,
      lng: position.longitude,
      timestamp: position.timestamp,
    };
    if (ISSPositionsHistoryMap.has(normalizedPosition.timestamp)) {
      return normalizedPosition;
    }
    setISSPositionsHistoryMap(prev => {
      const newMap = new Map(prev);
      newMap.set(normalizedPosition.timestamp, normalizedPosition);
      return newMap;
    });
    return normalizedPosition;
  }, []);

  // Convert position history map to sorted array
  const ISSPositionsHistory = useMemo(() => {
    return [...ISSPositionsHistoryMap.entries()]
      .sort(([timestamp1], [timestamp2]) => timestamp1 - timestamp2)
      .map(([, position]) => position);
  }, [ISSPositionsHistoryMap]);

  return (
    <satelliteDataContext.Provider
      value={{
        ISSPositionsHistory: ISSPositionsHistory,
        fetchLatestISSPosition,
      }}
    >
      {children}
    </satelliteDataContext.Provider>
  );
};
